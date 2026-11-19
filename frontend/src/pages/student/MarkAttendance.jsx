import { useCallback, useEffect, useRef, useState } from "react";
import { Camera,CheckCircle2,Clock3,Loader2,RefreshCw,ShieldCheck,XCircle,} from "lucide-react";
import { studentService } from "../../services/student.service";
import { qrAttendanceService } from "../../services/qrAttendance.service";

const getTodayDate = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());

const formatTime = (value) => {
  if (!value) return "--";
const date = new Date(value);
if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
};

const formatShortDate = (value) => {
  if (!value) return "--";
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getDuration = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return "--";

  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();

  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) {
    return "--";
  }

  const minutes = Math.floor((end - start) / 60000);

  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

const MarkAttendance = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [token, setToken] = useState(
    () => new URLSearchParams(window.location.search).get("session") || "",
  );

  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoBlob, setPhotoBlob] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [records, setRecords] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  }, []);

  const fetchRecords = useCallback(async () => {
    try {
      setHistoryLoading(true);

      const response = await studentService.getAttendance();
      const data = response?.data;

      setRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Attendance history error:", error);
      setRecords([]);
    } finally {
      setHistoryLoading(false);
    }
  }, []);
  useEffect(() => {
    if (token) return;

    let mounted = true;

    const resolveStudentSession = async () => {
      try {
        setSessionLoading(true);
        setErrorMessage("");

        const response = await qrAttendanceService.getStudentSessions();
        const sessions = Array.isArray(response?.data) ? response.data : [];

        const activeSession = sessions.find((item) => item?.attendanceUrl);

        if (!activeSession) {
          throw new Error(
            "No active QR attendance session found. Please ask your mentor to start an attendance session.",
          );
        }
       const resolvedToken = new URL(
          activeSession.attendanceUrl,
          window.location.origin,
        ).searchParams.get("session");

        if (!resolvedToken) {
          throw new Error("Unable to find the QR session token.");
        }

        if (mounted) {
          setToken(resolvedToken);
        }
      } catch (error) {
        if (!mounted) return;

        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "Unable to find an active QR attendance session.",
        );
        setSessionLoading(false);
      }
    };
 resolveStudentSession();
 return () => {
      mounted = false;
    };
  }, [token]);
  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      fetchRecords();
      if (!token) return;
      try {
        setSessionLoading(true);
        setErrorMessage("");

        const response =
          await qrAttendanceService.validateStudentSession(token);

        if (!mounted) return;

        if (!response?.success || !response?.data) {
          throw new Error("Unable to validate QR session.");
        }

        setSession(response.data);
      } catch (error) {
        if (!mounted) return;

        setSession(null);
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "QR session validation failed.",
        );
      } finally {
        if (mounted) {
          setSessionLoading(false);
        }
      }
    };
    initialize();

    return () => {
      mounted = false;
    };
  }, [token, fetchRecords]);
  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraActive]);
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      setCameraLoading(true);

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera is unavailable. Use HTTPS or localhost and a supported browser.",
        );
      }
 stopCamera();
const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "user" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraActive(true);
    } catch (error) {
      console.error("Camera error:", error);

      setErrorMessage(
        error.name === "NotAllowedError"
          ? "Camera permission denied. Please allow camera access."
          : error.message || "Unable to access the camera.",
      );
    } finally {
      setCameraLoading(false);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
      setErrorMessage("Camera is not ready. Please try again.");
      return;
    }
   canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");

    if (!context) {
      setErrorMessage("Unable to capture photo.");
      return;
    }
   context.drawImage(video, 0, 0, canvas.width, canvas.height);
   canvas.toBlob(
      (blob) => {
        if (!blob) {
          setErrorMessage("Photo capture failed. Please try again.");
          return;
        }

        setPhotoBlob(blob);
        setPhotoPreview(URL.createObjectURL(blob));
        setErrorMessage("");
        stopCamera();
      },
      "image/jpeg",
      0.9,
    );
  };

  const retakePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhotoBlob(null);
    setPhotoPreview("");
    startCamera();
  };

  const handleSubmit = async () => {
    if (!token || !session) {
      setErrorMessage("Please scan a valid QR code first.");
      return;
    }

    if (!photoBlob) {
      setErrorMessage("Live photo is mandatory to mark attendance.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await qrAttendanceService.submitStudentAttendance(
        token,
        photoBlob,
      );

      if (!response?.success) {
        throw new Error(response?.message || "Attendance submission failed.");
      }

      setSuccessMessage(response.message || "Attendance marked successfully!");

      setPhotoBlob(null);

      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
        setPhotoPreview("");
      }

      await fetchRecords();
    } catch (error) {
      console.error("QR attendance submission error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to mark attendance.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const today = getTodayDate();

  const todayRecords = records.filter(
    (record) => String(record.date).slice(0, 10) === today,
  );

  const checkedIn = todayRecords.length > 0;

  const presentCount = records.filter(
    (record) => record.status === "PRESENT",
  ).length;

  const absentCount = records.filter(
    (record) => record.status === "ABSENT",
  ).length;

  const halfDayCount = records.filter(
    (record) => record.status === "HALF_DAY",
  ).length;

  const totalDays = records.length;

  const attendancePercentage =
    totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : 0;

  const recentRecords = [...records]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Student Attendance</h1>

        <p className="text-gray-500 mt-1">
          Scan your mentor's QR code and capture a live photo to mark
          attendance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Attendance Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-lg bg-violet-100">
              <QrCodeIcon />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                QR Attendance
              </h2>

              <p className="text-sm text-gray-500">
                Secure session verification
              </p>
            </div>
          </div>

          {sessionLoading ? (
            <div className="py-12 flex flex-col items-center gap-3 text-gray-500">
              <Loader2 className="animate-spin" size={30} />
              <p>Validating QR session...</p>
            </div>
          ) : session ? (
            <div className="space-y-5">
              <div className="rounded-lg bg-violet-50 border border-violet-100 p-4">
                <div className="flex items-center gap-2 text-violet-700 mb-3">
                  <ShieldCheck size={20} />
                  <span className="font-semibold">QR Session Verified</span>
                </div>

                <p className="text-sm text-gray-600">Subject</p>
                <p className="font-semibold text-gray-800">{session.subject}</p>

                <p className="text-sm text-gray-600 mt-3">Batch</p>
                <p className="font-semibold text-gray-800">
                  {session.batch?.name || "--"}
                </p>

                <p className="text-sm text-gray-600 mt-3">Session expires</p>

                <p className="font-medium text-gray-800">
                  {formatTime(session.expiresAt)}
                </p>
              </div>

              {checkedIn && (
                <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 p-3 text-green-700">
                  <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm">
                    You already have an attendance record for today. Check the
                    attendance history below.
                  </p>
                </div>
              )}

              {!photoBlob && (
                <div className="space-y-3">
                  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-5 text-center">
                    <Camera size={36} className="mx-auto text-gray-400 mb-2" />

                    <p className="font-medium text-gray-700">
                      Live photo required
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Use your camera to capture your current photo.
                    </p>
                  </div>

                  {!cameraActive ? (
                    <button
                      type="button"
                      onClick={startCamera}
                      disabled={cameraLoading || submitting}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-medium py-3 transition"
                    >
                      {cameraLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Camera size={20} />
                      )}

                      {cameraLoading ? "Opening camera..." : "Open Camera"}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full rounded-lg bg-black aspect-video object-cover"
                      />

                      <button
                        type="button"
                        onClick={capturePhoto}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium py-3"
                      >
                        <Camera size={20} />
                        Capture Live Photo
                      </button>
                    </div>
                  )}
                </div>
              )}

              {photoBlob && photoPreview && (
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">
                      Captured Photo
                    </p>

                    <img
                      src={photoPreview}
                      alt="Captured live attendance"
                      className="w-full max-h-72 rounded-lg object-contain bg-gray-100"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={retakePhoto}
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 disabled:opacity-60"
                  >
                    <RefreshCw size={18} />
                    Retake Photo
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-medium py-3"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <CheckCircle2 size={20} />
                    )}

                    {submitting
                      ? "Submitting Attendance..."
                      : "Submit Attendance"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center">
              <XCircle size={42} className="mx-auto text-red-400 mb-3" />

              <h3 className="font-semibold text-gray-800">
                QR Session Unavailable
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Scan an active QR code generated by your mentor.
              </p>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          {errorMessage && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-red-700">
              <XCircle size={19} className="shrink-0 mt-0.5" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 p-3 text-green-700">
              <CheckCircle2 size={19} className="shrink-0 mt-0.5" />
              <p className="text-sm">{successMessage}</p>
            </div>
          )}
        </div>

        {/* Attendance Summary */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Attendance Summary
            </h2>

            <button
              type="button"
              onClick={fetchRecords}
              disabled={historyLoading}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              title="Refresh attendance history"
            >
              <RefreshCw
                size={18}
                className={historyLoading ? "animate-spin" : ""}
              />
            </button>
          </div>

          {historyLoading ? (
            <div className="py-10 flex justify-center text-gray-500">
              <Loader2 className="animate-spin" size={28} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-green-700">Present</p>
                  <p className="text-2xl font-bold text-green-800">
                    {presentCount}
                  </p>
                </div>

                <div className="rounded-lg bg-red-50 p-4">
                  <p className="text-sm text-red-700">Absent</p>
                  <p className="text-2xl font-bold text-red-800">
                    {absentCount}
                  </p>
                </div>

                <div className="rounded-lg bg-yellow-50 p-4">
                  <p className="text-sm text-yellow-700">Half Day</p>
                  <p className="text-2xl font-bold text-yellow-800">
                    {halfDayCount}
                  </p>
                </div>

                <div className="rounded-lg bg-violet-50 p-4">
                  <p className="text-sm text-violet-700">Total Records</p>
                  <p className="text-2xl font-bold text-violet-800">
                    {totalDays}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Attendance Percentage
                  </span>

                  <span className="font-bold text-gray-800">
                    {attendancePercentage}%
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-violet-600 transition-all"
                    style={{
                      width: `${attendancePercentage}%`,
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Attendance Records */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <Clock3 size={21} className="text-violet-600" />

          <h2 className="text-lg font-semibold text-gray-800">
            Recent Attendance Records
          </h2>
        </div>

        {historyLoading ? (
          <div className="py-8 flex justify-center text-gray-500">
            <Loader2 className="animate-spin" size={26} />
          </div>
        ) : recentRecords.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No attendance records found.
          </div>
        ) : (
          <div className="space-y-3">
            {recentRecords.map((record) => (
              <div
                key={record.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-gray-100 p-4"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {formatShortDate(record.date)}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    In: {formatTime(record.checkInTime)}
                    {" · "}
                    Out: {formatTime(record.checkOutTime)}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Duration:{" "}
                    {getDuration(record.checkInTime, record.checkOutTime)}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    record.status === "PRESENT"
                      ? "bg-green-100 text-green-700"
                      : record.status === "HALF_DAY"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {record.status || "UNKNOWN"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const QrCodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM21 14v3M14 21h3M21 21v-3" />
  </svg>
);
export default MarkAttendance;