
import { useEffect, useState } from "react";
import dailyReportService from "../../services/dailyReport.service";

const ReviewDailyReports = () => {
  const [reports, setReports] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await dailyReportService.getDailyReports();
      setReports(data);

      setRemarks((previous) => {
        const updated = { ...previous };

        data.forEach((report) => {
          if (updated[report.id] === undefined) {
            updated[report.id] = report.remark || "";
          }
        });

        return updated;
      });
    } catch (err) {
      console.error("Daily reports load error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load daily work reports."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    const search = searchTerm.trim().toLowerCase();

    return (
      (report.name || "").toLowerCase().includes(search) ||
      (report.title || "").toLowerCase().includes(search)
    );
  });

  const handleSave = async (report) => {
    const remark = (remarks[report.id] || "").trim();

    if (!remark) {
      setError("Please enter a remark before saving.");
      setSuccessMessage("");
      return;
    }

    try {
      setSavingId(report.id);
      setError("");
      setSuccessMessage("");

      await dailyReportService.saveRemark(
        report.id,
        remark,
        "COMPLETED"
      );

      setSuccessMessage(`Remark saved for ${report.name}.`);
      await fetchReports();
    } catch (err) {
      console.error("Save remark error:", err);
      setError(
        err.response?.data?.message || "Failed to save remark."
      );
    } finally {
      setSavingId("");
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "—";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-6 text-slate-500">
        Loading daily work reports...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Heading and Search Bar - Same Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Daily Work Reports
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Review and add remarks to intern daily submissions
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name or task..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      {/* Compact Reports Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5">
        <table className="w-full min-w-[850px] table-fixed text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {[
                { label: "Name", width: "12%" },
                { label: "Task Title", width: "19%" },
                { label: "Technique", width: "18%" },
                { label: "Date", width: "12%" },
                { label: "Remark", width: "29%" },
                { label: "Save", width: "10%" },
              ].map((column) => (
                <th
                  key={column.label}
                  style={{ width: column.width }}
                  className="px-2.5 py-3 font-semibold text-slate-800 sm:px-3"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredReports.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-slate-400"
                >
                  {searchTerm
                    ? "No reports match your search."
                    : "No submitted daily work reports found."}
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50">
                  {/* Name */}
                  <td className="break-words px-2.5 py-3 text-slate-800 sm:px-3">
                    {report.name}
                  </td>

                  {/* Task Title */}
                  <td className="break-words px-2.5 py-3 text-slate-800 sm:px-3">
                    {report.title}
                  </td>

                  {/* Technique */}
                  <td className="px-2.5 py-3 sm:px-3">
                    {report.technique ? (
                      <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-600">
                        {report.technique}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-2.5 py-3 text-slate-700 sm:px-3">
                    {formatDate(report.date)}
                  </td>

                  {/* Remark */}
                  <td className="px-2.5 py-3 sm:px-3">
                    {report.remark ? (
                      <div className="break-words rounded-md border border-green-100 bg-green-50 px-2.5 py-2 text-slate-700">
                        {report.remark}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={remarks[report.id] ?? ""}
                        onChange={(event) => {
                          setRemarks((previous) => ({
                            ...previous,
                            [report.id]: event.target.value,
                          }));
                        }}
                        placeholder="Add remark..."
                        disabled={savingId === report.id}
                        className="w-full min-w-0 rounded-md border border-slate-200 bg-white px-2.5 py-2 text-xs outline-none focus:border-orange-400"
                      />
                    )}
                  </td>

                  {/* Save Action */}
                  <td className="px-2.5 py-3 sm:px-3">
                    {report.remark ? (
                      <span className="inline-block rounded-md bg-green-50 px-2 py-2 text-[10px] font-semibold text-green-700">
                        Saved
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSave(report)}
                        disabled={savingId === report.id}
                        className="rounded-md bg-orange-600 px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {savingId === report.id ? "Saving..." : "Save"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewDailyReports;
