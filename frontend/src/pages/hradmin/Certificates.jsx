
import React, { useEffect, useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { hrService } from "../../services/hr.service";

function UploadCertificateModal({
  onClose,
  onSubmit,
  students,
  submitting,
  formError,
}) {
  const [studentId, setStudentId] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(studentId, file, type);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X size={16} />
        </button>

        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Upload Certificate
        </h2>

        {formError && (
          <p className="mb-3 text-sm text-red-500">{formError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Student
            </label>
            <select
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
            >
              <option value="">Select student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName || ""} ({s.enrollmentNumber})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Type
            </label>
            <select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
            >
              <option value="">Select type</option>
              <option value="Certificate">Certificate</option>
              <option value="Internship Letter">Internship Letter</option>
              <option value="Offer Letter">Offer Letter</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Certificate File (PDF/JPG/PNG)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(e) => setFile(e.target.files[0] || null)}
              className="w-full text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-blue-500 py-2.5 font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            {submitting ? "Uploading..." : "Upload Certificate"}
          </button>
        </form>
      </div>
    </div>
  );
}

function StudentCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete states
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [certsRes, studentsRes] = await Promise.all([
        hrService.getAllCertificates(),
        hrService.getAllStudents(),
      ]);

      setCertificates(certsRes.data || []);
      setStudents(studentsRes.data || []);
      setError("");
    } catch (err) {
      console.error("Load certificates error:", err);
      setError("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStudentName = (studentId) => {
    const s = students.find((s) => s.id === studentId);
    return s ? `${s.firstName} ${s.lastName || ""}`.trim() : "Unknown";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleUpload = async (studentId, file, type) => {
    setFormError("");

    if (!studentId || !file || !type) {
      setFormError("Please select a student, certificate type and file");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("type", type);
    formData.append("certificateFile", file);

    try {
      await hrService.uploadCertificate(formData);
      setIsOpen(false);
      await fetchData();
    } catch (err) {
      console.error("Upload certificate error:", err);
      setFormError(
        err.response?.data?.message ||
          err.message ||
          "Failed to upload certificate"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = async (certId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/hr/certificates/${certId}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download certificate");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;

      const contentDisposition = response.headers.get("content-disposition");
      const match = contentDisposition?.match(/filename="?([^"]+)"?/i);
      link.download = match?.[1] || "certificate";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download certificate error:", error);
      alert(error.message || "Failed to download certificate");
    }
  };

  // Permanently delete certificate
  const handleDeleteCertificate = async () => {
    if (!deleteTarget) return;

    try {
      setDeletingId(deleteTarget.id);
      setDeleteError("");

      await hrService.deleteCertificate(deleteTarget.id);

      // Remove deleted certificate from the HR list
      setCertificates((prev) =>
        prev.filter((cert) => cert.id !== deleteTarget.id)
      );

      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete certificate error:", err);

      setDeleteError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete certificate"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading certificates...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen lg:p-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-xl font-medium">Certificate Management</h1>
          <p className="text-slate-400">
            Generate and manage internship completion certificates
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Upload Certificate
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        {certificates.length === 0 ? (
          <p className="p-6 text-sm text-slate-400">
            No certificates issued yet.
          </p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">
                  Student
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">
                  Cert No.
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">
                  Type
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">
                  Source
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">
                  Issue Date
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase text-slate-400">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium  uppercase text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {certificates.map((cert) => (
                <tr
                  key={cert.id}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">
                    {getStudentName(cert.studentId)}
                  </td>

                  <td className="px-4 py-3 font-mono text-sm text-slate-500">
                    {cert.certificateNumber}
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-500">
                    {cert.type || "—"}
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-500">
                    {cert.source}
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-500">
                    {formatDate(cert.issueDate)}
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs text-emerald-700">
                      {cert.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex w-full items-center justify-center gap-4">
                      <button
                        onClick={() => handleDownload(cert.id)}
                        className="text-sm font-medium text-blue-500 hover:text-blue-700"
                      >
                        Download
                      </button>

                      <button
                        onClick={() => {
                          setDeleteTarget(cert);
                          setDeleteError("");
                        }}
                        className="flex items-center gap-1 text-sm font-medium text-red-500 transition-colors hover:text-red-700"
                        title="Delete certificate"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isOpen && (
        <UploadCertificateModal
          onClose={() => {
            setIsOpen(false);
            setFormError("");
          }}
          onSubmit={handleUpload}
          students={students}
          submitting={submitting}
          formError={formError}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!deletingId) {
              setDeleteTarget(null);
              setDeleteError("");
            }
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                <AlertTriangle size={24} />
              </div>

              <button
                onClick={() => {
                  setDeleteTarget(null);
                  setDeleteError("");
                }}
                disabled={!!deletingId}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Delete Certificate?
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Are you sure you want to permanently delete this certificate?
              This action cannot be undone. The certificate will also no
              longer be available on the student's dashboard.
            </p>

            <div className="mt-4 rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-400">Certificate Number</p>
              <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                {deleteTarget.certificateNumber}
              </p>
            </div>

            {deleteError && (
              <p className="mt-3 text-sm text-red-500">{deleteError}</p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteTarget(null);
                  setDeleteError("");
                }}
                disabled={!!deletingId}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteCertificate}
                disabled={!!deletingId}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={15} />
                {deletingId ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCertificates;
