import { useCallback, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Clock3,
  QrCode,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { qrAttendanceService } from "../../services/qrAttendance.service";

const formatDate = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

const QRAttendance = () => {
  const [batches, setBatches] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState(10);

  const [activeSession, setActiveSession] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [batchResponse, sessionResponse] = await Promise.all([
        qrAttendanceService.getMentorBatches(),
        qrAttendanceService.getMentorSessions(),
      ]);

      const batchList = batchResponse.data || [];
      const sessionList = sessionResponse.data || [];

      setBatches(batchList);
      setSessions(sessionList);

      setBatchId((current) => {
        if (current && batchList.some((batch) => batch.id === current)) {
          return current;
        }

        return batchList[0]?.id || "";
      });
    } catch (err) {
      setError(getErrorMessage(err, "Could not load mentor attendance data."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!activeSession) return undefined;

    const updateCountdown = () => {
      const seconds = Math.max(
        0,
        Math.ceil(
          (new Date(activeSession.expiresAt).getTime() - Date.now()) / 1000
        )
      );

      setRemainingSeconds(seconds);

      if (seconds <= 0) {
        setActiveSession(null);
        setMessage("QR session expired. Generate a new session if needed.");
      }
    };

    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, [activeSession]);

  const handleCreateSession = async (event) => {
    event.preventDefault();

    if (!batchId || !subject.trim()) {
      setError("Please select a batch and enter the session subject.");
      return;
    }

    setCreating(true);
    setError("");
    setMessage("");

    try {
      const response = await qrAttendanceService.createSession({
        batchId,
        subject: subject.trim(),
        durationMinutes: Number(duration),
      });

      setActiveSession(response.data);
      setMessage("QR session generated successfully.");
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err, "Could not generate QR session."));
    } finally {
      setCreating(false);
    }
  };

  const handleCloseSession = async () => {
    if (!activeSession?.id) return;

    setClosing(true);
    setError("");
    setMessage("");

    try {
      await qrAttendanceService.closeSession(activeSession.id);
      setActiveSession(null);
      setRemainingSeconds(0);
      setMessage("QR session closed successfully.");
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err, "Could not close QR session."));
    } finally {
      setClosing(false);
    }
  };

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Mentor Portal
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          QR Attendance
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Generate a temporary QR code for your assigned batch. Students must
          be logged in and capture a live photo to mark attendance.
        </p>
      </header>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {message && (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
        >
          {message}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={handleCreateSession}
          className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            Generate Attendance QR
          </h2>

          <label className="block text-sm font-medium text-slate-700">
            Assigned Batch

            <select
              required
              value={batchId}
              onChange={(event) => setBatchId(event.target.value)}
              disabled={loading || creating || batches.length === 0}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5"
            >
              <option value="">Select batch</option>

              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                {batch.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Subject / Session Topic

            <input
              required
              type="text"
              maxLength={150}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="e.g. React Fundamentals"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            QR Validity

            <select
              value={duration}
              onChange={(event) => setDuration(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5"
            >
              {[5, 10, 15, 20, 30, 45, 60].map((value) => (
                <option key={value} value={value}>
                  {value} minutes
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            disabled={creating || loading || !batches.length}
            className="w-full rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating ? "Generating..." : "Generate QR Code"}
          </button>

          {!loading && batches.length === 0 && (
            <p className="text-sm text-amber-700">
              No batch is assigned to your mentor account. Please contact
              HR/Admin.
            </p>
          )}
        </form>

        <section className="rounded-2xl border bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Live QR Code
          </h2>

          {activeSession && remainingSeconds > 0 ? (
            <>
              <div id="active-attendance-qr" className="my-5 inline-flex max-w-full rounded-xl border p-3">
                <QRCodeSVG
                  value={activeSession.attendanceUrl}
                  size={240}
                  level="H"
                  includeMargin
                />
              </div>

              <p className="font-semibold text-slate-900">
                {activeSession.subject}
              </p>

              <p className="text-sm text-slate-500">
                {activeSession.batch?.name || "Assigned Batch"}
              </p>

              <div className="my-4 flex items-center justify-center gap-2 text-orange-700">
                <Clock3 size={17} />

                <b className="font-mono text-xl">
                  {minutes}:{seconds}
                </b>

                <span className="text-sm">remaining</span>
              </div>

              <p className="text-xs text-slate-500">
                Expires: {formatDate(activeSession.expiresAt)}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const svg = document.querySelector("#active-attendance-qr svg");
                    if (!svg) return;
                    const blob = new Blob([new XMLSerializer().serializeToString(svg)], {
                      type: "image/svg+xml;charset=utf-8",
                    });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "attendance-qr.svg";
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  Download QR
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(activeSession.attendanceUrl);
                      window.alert("Attendance link copied.");
                    } catch {
                      window.alert("Unable to copy link. Please copy it manually.");
                    }
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Copy Attendance Link
                </button>
              </div>

              <button
                type="button"
                onClick={handleCloseSession}
                disabled={closing}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
              >
                <XCircle size={16} />
                {closing ? "Closing..." : "Close Session"}
              </button>
            </>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center text-slate-400">
              <QrCode size={58} />

              <p className="mt-3 text-sm">
                Generate a session to display its QR code.
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={15} />
            Only assigned batch students can submit attendance.
          </div>
        </section>
      </div>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">
            Recent QR Sessions
          </h2>

          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 disabled:opacity-50"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="text-sm text-slate-500">
            No QR sessions generated yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-slate-500">
                  <th className="py-3">Batch</th>
                  <th>Subject</th>
                  <th>Created</th>
                  <th>Expires</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {sessions.map((session) => {
                  const expired =
                    new Date(session.expiresAt).getTime() <= Date.now();

                  const status = session.closedAt
                    ? "Closed"
                    : expired
                      ? "Expired"
                      : "Active";

                  return (
                    <tr
                      key={session.id}
                      className="border-b last:border-0"
                    >
                      <td className="py-3">
                        {session.batch?.name || "—"}
                      </td>
                      <td>{session.subject}</td>
                      <td>{formatDate(session.createdAt)}</td>
                      <td>{formatDate(session.expiresAt)}</td>
                      <td>{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default QRAttendance;
