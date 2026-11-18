import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

function Avatar({ name }) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-400">
      {initial}
    </div>
  );
}

function PendingDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedStudents, setExpandedStudents] = useState({});
  const [processingId, setProcessingId] = useState(null);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/hr/documents?status=PENDING",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load documents");
      }

      setDocuments(result.data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const groupedDocuments = documents.reduce((groups, doc) => {
    const studentId = doc.student?.id || doc.studentId;

    if (!groups[studentId]) {
      groups[studentId] = {
        id: studentId,
        name:
          [doc.student?.firstName, doc.student?.lastName]
            .filter(Boolean)
            .join(" ") ||
          doc.student?.email ||
          "Student",
        email: doc.student?.email || "",
        college: doc.student?.college?.name || "College not available",
        enrollmentNumber: doc.student?.enrollmentNumber || "",
        documents: [],
      };
    }

    groups[studentId].documents.push(doc);
    return groups;
  }, {});

  const students = Object.values(groupedDocuments);

  const toggleStudent = (studentId) => {
    setExpandedStudents((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleDecision = async (id, decision) => {
    try {
      let reviewReason = "";

      if (decision === "REJECTED") {
        reviewReason = window.prompt("Enter rejection reason:");

        if (!reviewReason?.trim()) return;
      }

      setProcessingId(id);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/hr/documents/${id}/review`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: decision,
            reviewReason,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Review failed");
      }

      await fetchDocuments();
      alert(
        `Document ${decision === "VERIFIED" ? "approved" : "rejected"} successfully`
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return <p className="mt-6 text-sm text-slate-500">Loading documents...</p>;
  }

  if (error) {
    return <p className="mt-6 text-red-500">{error}</p>;
  }

  return (
    <div className="mt-4 w-full">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-sm font-bold tracking-wide text-slate-800">
                PENDING DOCUMENTS
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Review and verify student documents
              </p>
            </div>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              {documents.length} Pending
            </span>
          </div>

          <span className="text-xs font-medium text-slate-400">
            {students.length} Students
          </span>
        </div>

        {/* Student List */}
        {students.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
              <Check size={26} />
            </div>
            <h3 className="text-sm font-semibold text-slate-700">
              All documents reviewed!
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              There are no pending documents at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-3 bg-slate-50/60 p-4 sm:p-5">
            {students.map((student) => {
              const isExpanded = expandedStudents[student.id] !== false;

              return (
                <div
                  key={student.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Student Header */}
                  <button
                    type="button"
                    onClick={() => toggleStudent(student.id)}
                    className="flex w-full flex-wrap items-center justify-between gap-4 p-4 text-left sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-base font-bold text-indigo-600">
                        {student.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-slate-800">
                          {student.name}
                        </h3>

                        <p className="mt-1 truncate text-xs text-slate-400">
                          {student.college}
                        </p>

                        {student.enrollmentNumber && (
                          <p className="mt-1 text-xs text-slate-400">
                            ID: {student.enrollmentNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                        {student.documents.length} Documents
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <svg
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="m6 9 6 6 6-6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </button>

                  {/* Documents */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 px-4 py-3 sm:px-5">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Uploaded Documents
                        </h4>

                        <span className="text-xs text-slate-400">
                          {student.documents.length} files
                        </span>
                      </div>

                      <div className="space-y-2">
                        {student.documents.map((doc) => {
                          const documentUrl = doc.filePath
                            ? `http://localhost:5000/${doc.filePath
                                .replace(/\\/g, "/")
                                .replace(/^\/+/, "")}`
                            : null;

                          return (
                            <div
                              key={doc.id}
                              className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                                  <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                  >
                                    <path
                                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M14 2v6h6M8 13h8M8 17h8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>

                                <div className="min-w-0">
                                  {documentUrl ? (
                                    <a
                                      href={documentUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm font-semibold text-slate-700 transition hover:text-indigo-600 hover:underline"
                                    >
                                      {doc.documentType}
                                    </a>
                                  ) : (
                                    <p className="text-sm font-semibold text-slate-700">
                                      {doc.documentType}
                                    </p>
                                  )}

                                  <p className="mt-1 text-xs text-slate-400">
                                    {new Date(doc.createdAt).toLocaleDateString(
                                      "en-IN"
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                                {documentUrl ? (
                                  <a
                                    href={documentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
                                  >
                                    <span>View</span>
                                  </a>
                                ) : (
                                  <span className="text-xs text-slate-400">
                                    File unavailable
                                  </span>
                                )}

                                <button
                                  type="button"
                                  disabled={processingId === doc.id}
                                  onClick={() =>
                                    handleDecision(doc.id, "VERIFIED")
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Check size={14} />
                                  {processingId === doc.id
                                    ? "Please wait"
                                    : "Approve"}
                                </button>

                                <button
                                  type="button"
                                  disabled={processingId === doc.id}
                                  onClick={() =>
                                    handleDecision(doc.id, "REJECTED")
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <X size={14} />
                                  Reject
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const StatCard = ({
  title,
  value,
  valueColor = "text-slate-900",
}) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">
    <p className="text-[13px] text-slate-400">{title}</p>

    <h2 className={`text-3xl font-bold mt-3 ${valueColor}`}>
      {value}
    </h2>
  </div>
);

function DocumentVerification() {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/hr/documents/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch document stats"
          );
        }

        const data = result.data || result;

        setStats({
          pending: data.pending ?? data.pendingCount ?? 0,
          approved:
            data.approved ?? data.verified ?? data.approvedCount ?? 0,
          rejected: data.rejected ?? data.rejectedCount ?? 0,
          total: data.total ?? data.totalCount ?? 0,
        });
      } catch (error) {
        console.error("Document stats error:", error.message);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="xl:p-6 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Document Verification</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard
          title="Pending Review"
          value={loadingStats ? "..." : stats.pending}
        />

        <StatCard
          title="Approved"
          value={loadingStats ? "..." : stats.approved}
          valueColor="text-green-500"
        />

        <StatCard
          title="Rejected"
          value={loadingStats ? "..." : stats.rejected}
          valueColor="text-red-400"
        />

        <StatCard
          title="Total docs"
          value={loadingStats ? "..." : stats.total}
        />
      </div>

      <PendingDocuments />
    </div>
  );
}

export default DocumentVerification;
