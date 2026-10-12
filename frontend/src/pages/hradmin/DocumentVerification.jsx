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

  const handleDecision = async (id, decision) => {
    try {
      const token = localStorage.getItem("token");
      let reviewReason = "";

      if (decision === "REJECTED") {
        reviewReason = window.prompt("Enter rejection reason:");
        if (!reviewReason?.trim()) return;
      }

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
      alert(`Document ${decision.toLowerCase()} successfully`);
    } catch (err) {
      alert(err.message);
    }
  };

  const remaining = documents.length;

  if (loading) return <p className="mt-6">Loading documents...</p>;
  if (error) return <p className="mt-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen w-full mt-4">
      <div className="mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
          <span className="text-xs font-semibold tracking-wider text-slate-400">
            PENDING DOCUMENTS
          </span>
          <span className="rounded-full bg-amber-200/70 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            {remaining} remaining
          </span>
        </div>

        {documents.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            No pending documents.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {documents.map((doc) => {
              const studentName =
                [doc.student?.firstName, doc.student?.lastName]
                  .filter(Boolean)
                  .join(" ") || doc.student?.email || "Student";

              return (
                <div
                  key={doc.id}
                  className="flex flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:gap-4 sm:px-6"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Avatar name={studentName} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {studentName}
                      </p>
                      <p className="truncate text-sm text-slate-400">
                        {doc.student?.college?.name || "College not available"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {doc.originalName}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-md bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                    {doc.documentType}
                  </span>

                  <span className="text-xs text-slate-400 sm:w-24 sm:text-right">
                    {new Date(doc.createdAt).toLocaleDateString("en-IN")}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDecision(doc.id, "VERIFIED")}
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 hover:bg-emerald-100"
                    >
                      <Check size={14} /> Approve
                    </button>

                    <button
                      onClick={() => handleDecision(doc.id, "REJECTED")}
                      className="inline-flex items-center gap-1 rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-100"
                    >
                      <X size={14} /> Reject
                    </button>
                  </div>
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

    <p className="text-[13px] text-slate-400">
      {title}
    </p>

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
          throw new Error(result.message || "Failed to fetch document stats");
        }

        // Adjust these field names if your backend returns a different shape.
        const data = result.data || result;

        setStats({
          pending: data.pending ?? data.pendingCount ?? 0,
          approved: data.approved ?? data.verified ?? data.approvedCount ?? 0,
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
