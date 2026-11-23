import { google } from "googleapis";
import { Op } from "sequelize";
import {
  Attendance,
  AttendanceSyncOutbox,
  Batch,
  QRSession,
  Student,
} from "../models/index.js";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SYNC_INTERVAL_MS = 30_000;
const MAX_ATTEMPTS = 10;
const BATCH_SIZE = 25;

const HEADERS = [
  // "Attendance ID",
  "Date",
  "Check-in Time ",
  "Student Name",
  // "Enrollment Number",
  "Email",
  "Batch",
  "Subject",
  "Status",
  // "Attendance Method",
  "Photo",
];

let sheetsClientPromise;
let workerInterval;
let isSyncing = false;

const getSheetsClient = () => {
  if (!sheetsClientPromise) {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    sheetsClientPromise = auth.getClient().then((client) =>
      google.sheets({ version: "v4", auth: client })
    );
  }

  return sheetsClientPromise;
};

const getBatchSheetTitle = (batch) => {
  const batchIdSuffix = String(batch.id).replace(/-/g, "").slice(-8);
  const safeName = String(batch.name || "Batch")
    .replace(/[\[\]:*?/\\]/g, "-")
    .replace(/^'+|'+$/g, "")
    .trim()
    .slice(0, 90);

  return `${safeName || "Batch"}-${batchIdSuffix}`;
};

const quoteSheetTitle = (title) => `'${title.replace(/'/g, "''")}'`;

const ensureBatchTab = async (sheets, batch) => {
  const title = getBatchSheetTitle(batch);

  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
    fields: "sheets.properties(sheetId,title)",
  });

  const existingSheet = (spreadsheet.data.sheets || []).find(
    (sheet) => sheet.properties?.title === title
  );

  if (!existingSheet) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title } } }],
      },
    });
  }

  const headerResult = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${quoteSheetTitle(title)}!A1:K1`,
  });

  if (!headerResult.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${quoteSheetTitle(title)}!A1:K1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
  }

  return title;
};

const alreadyExistsInSheet = async (sheets, title, attendanceId) => {
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${quoteSheetTitle(title)}!A2:A`,
  });

  return (result.data.values || []).some(
    (row) => String(row[0]) === String(attendanceId)
  );
};

const formatCheckInTime = (value) => {
  if (!value) return "";

  return new Date(value).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const makePhotoCell = (photoUrl) => {
  if (!photoUrl || !String(photoUrl).startsWith("https://")) return "";

  const safeUrl = String(photoUrl).replace(/"/g, '""');
  return `=HYPERLINK("${safeUrl}","View Photo")`;
};

const buildAttendanceRow = (attendance) => {
  const student = attendance.student;
  const session = attendance.qrSession;
  const batch = session?.batch;

  return [
    attendance.id,
    String(attendance.date || ""),
    formatCheckInTime(attendance.checkInTime),
    [student?.firstName, student?.lastName].filter(Boolean).join(" "),
    student?.enrollmentNumber || "",
    student?.email || "",
    batch?.name || "",
    session?.subject || "",
    attendance.status || "",
    attendance.attendanceMethod || "",
    makePhotoCell(attendance.photoUrl),
  ];
};

const markSyncSuccess = async (outbox) => {
  await outbox.update({
    status: "SYNCED",
    syncedAt: new Date(),
    lastError: null,
  });
};

const markSyncFailure = async (outbox, error) => {
  const attempts = Number(outbox.attempts || 0) + 1;
  const permanentlyFailed = attempts >= MAX_ATTEMPTS;
  const delayMs = Math.min(
    60_000 * 2 ** (attempts - 1),
    6 * 60 * 60 * 1000
  );

  await outbox.update({
    attempts,
    status: permanentlyFailed ? "FAILED" : "PENDING",
    nextAttemptAt: permanentlyFailed
      ? outbox.nextAttemptAt
      : new Date(Date.now() + delayMs),
    lastError: String(error?.message || error).slice(0, 4000),
  });

  console.error(
    `Attendance Sheets sync failed: ${outbox.attendanceId}; attempt ${attempts}/${MAX_ATTEMPTS}`,
    error?.message || error
  );
};

const syncOneOutboxRecord = async (sheets, outbox) => {
  const attendance = await Attendance.findByPk(outbox.attendanceId, {
    include: [
      {
        model: Student,
        as: "student",
        attributes: ["firstName", "lastName", "enrollmentNumber", "email"],
      },
      {
        model: QRSession,
        as: "qrSession",
        include: [{ model: Batch, as: "batch", attributes: ["id", "name"] }],
      },
    ],
  });

  if (!attendance) {
    throw new Error("Attendance record not found in PostgreSQL.");
  }

  if (attendance.attendanceMethod !== "QR" || !attendance.qrSessionId) {
    await markSyncSuccess(outbox);
    return;
  }

  const batch = attendance.qrSession?.batch;

  if (!batch) {
    throw new Error("Batch information not found for QR attendance.");
  }

  const title = await ensureBatchTab(sheets, batch);

  if (await alreadyExistsInSheet(sheets, title, attendance.id)) {
    await markSyncSuccess(outbox);
    return;
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${quoteSheetTitle(title)}!A:K`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [buildAttendanceRow(attendance)],
    },
  });

  await markSyncSuccess(outbox);

  console.log(`Attendance synced to "${title}": ${attendance.id}`);
};

export const syncPendingAttendanceToSheets = async () => {
  if (isSyncing) return;
  if (!SPREADSHEET_ID) {
    console.warn("Google Sheets sync skipped: spreadsheet ID is not configured.");
    return;
  }

  isSyncing = true;

  try {
    const sheets = await getSheetsClient();

    const pendingRecords = await AttendanceSyncOutbox.findAll({
      where: {
        status: "PENDING",
        nextAttemptAt: { [Op.lte]: new Date() },
      },
      order: [["createdAt", "ASC"]],
      limit: BATCH_SIZE,
    });

    for (const outbox of pendingRecords) {
      try {
        await syncOneOutboxRecord(sheets, outbox);
      } catch (error) {
        await markSyncFailure(outbox, error);
      }
    }
  } catch (error) {
    console.error("Google Sheets background sync error:", error.message);
  } finally {
    isSyncing = false;
  }
};

export const startAttendanceSheetsSync = () => {
  if (workerInterval) return;

  if (!SPREADSHEET_ID || !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn(
      "Google Sheets sync is disabled: configure GOOGLE_SHEETS_SPREADSHEET_ID and GOOGLE_APPLICATION_CREDENTIALS."
    );
    return;
  }

  console.log("Google Sheets attendance sync worker started.");

  void syncPendingAttendanceToSheets();

  workerInterval = setInterval(() => {
    void syncPendingAttendanceToSheets();
  }, SYNC_INTERVAL_MS);

  workerInterval.unref?.();
};

export const stopAttendanceSheetsSync = () => {
  if (workerInterval) {
    clearInterval(workerInterval);
    workerInterval = null;
  }
};


