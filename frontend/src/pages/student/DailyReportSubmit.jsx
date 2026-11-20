import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

const DailyReportSubmit = () => {
  const [formData, setFormData] = useState({
    title: "",
    technology: "",
    description: "",
    hoursWorked: "",
  });

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/student/daily-reports"
      );

      setReports(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load past reports. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const hours = Number(formData.hoursWorked);

    if (
      !formData.title.trim() ||
      !formData.technology.trim() ||
      !formData.description.trim() ||
      !formData.hoursWorked
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!Number.isFinite(hours) || hours <= 0 || hours > 24) {
      setError("Hours worked must be greater than 0 and at most 24.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await axiosInstance.post(
        "/student/daily-reports",
        {
          ...formData,
          hoursWorked: hours,
        }
      );

      setMessage(
        response.data.message || "Daily report submitted successfully."
      );

      setFormData({
        title: "",
        technology: "",
        description: "",
        hoursWorked: "",
      });

      await fetchReports();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to submit report. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(`${date}`.slice(0, 10) + "T00:00:00")
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "REVIEWED":
        return "bg-emerald-100 text-emerald-600";
      case "REVISION_REQUIRED":
        return "bg-red-100 text-red-600";
      default:
        return "bg-orange-100 text-orange-600";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "REVIEWED":
        return "Reviewed";
      case "REVISION_REQUIRED":
        return "Revision Required";
      default:
        return "Pending";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-semibold">Daily Work Report</h1>
        <p className="text-slate-400 text-sm mt-1">
          Submit your daily work log before 6:00 PM
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Submit Report Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h3 className="font-semibold mb-6">Submit Today's Report</h3>

          {message && (
            <p className="mb-4 text-sm text-emerald-600" role="status">
              {message}
            </p>
          )}

          {error && (
            <p className="mb-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Task Title
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="What did you work on today?"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Technology / Tools Used
              </label>
              <input
                name="technology"
                type="text"
                value={formData.technology}
                onChange={handleChange}
                required
                placeholder="React, Node.js, PostgreSQL..."
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Detailed Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe what you accomplished, challenges faced, and solutions implemented..."
                rows="4"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Hours Worked
              </label>
              <input
                name="hoursWorked"
                type="number"
                min="0.01"
                max="24"
                step="0.25"
                value={formData.hoursWorked}
                onChange={handleChange}
                required
                placeholder="8"
                className="w-24 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-violet-500 hover:bg-violet-600 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition-colors mt-2"
            >
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </div>

        {/* Past Reports */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h3 className="font-semibold mb-6">Past Reports</h3>

          {loading ? (
            <p className="text-sm text-slate-400">Loading reports...</p>
          ) : reports.length === 0 ? (
            <p className="text-sm text-slate-400">
              No daily reports submitted yet.
            </p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-slate-50/50 rounded-xl border border-slate-100"
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-slate-400 text-xs font-mono">
                      {formatDate(report.reportDate)}
                    </span>

                    <span
                      className={`${getStatusStyle(
                        report.status
                      )} text-[10px] font-semibold px-2 py-0.5 rounded`}
                    >
                      {getStatusLabel(report.status)}
                    </span>
                  </div>

                  <h4 className="font-medium text-sm text-slate-800">
                    {report.title}
                  </h4>

                  <p className="text-slate-400 text-xs mt-1">
                    {report.technology} · {report.hoursWorked}h
                  </p>

                  <p className="text-slate-500 text-xs mt-2 whitespace-pre-wrap">
                    {report.description}
                  </p>

                  {report.mentorRemark && (
                    <p className="text-slate-500 text-xs italic mt-3">
                      Mentor: {report.mentorRemark}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyReportSubmit;