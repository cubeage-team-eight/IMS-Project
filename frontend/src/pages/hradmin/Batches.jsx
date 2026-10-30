
import React, { useEffect, useState } from "react";
import CreateBatchForm from "../../components/forms/hradmin/CreateBatchForm.jsx";
import BatchModal from "../../components/forms/hradmin/BatchModal.jsx";
import { hrService } from "../../services/hr.service.js";

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function Batches() {
  const [batches, setBatches] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewLoading, setViewLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBatches = async () => {
    try {
      setError("");
      const response = await hrService.getAllBatches();
      setBatches(response.data || []);
    } catch (err) {
      console.error("Failed to load batches:", err);
      setError("Failed to load batches. Please check the server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  const handleViewBatch = async (batch) => {
    try {
      setError("");
      setViewLoading(true);

      const response = await hrService.getBatchById(batch.id);
      const detailedBatch = response.data?.data || response.data || response;

      setSelectedBatch(detailedBatch);
    } catch (err) {
      console.error("Failed to load batch details:", err);
      setError(
        err.response?.data?.message || "Failed to load batch details."
      );
    } finally {
      setViewLoading(false);
    }
  };

  const handleCreate = async (form) => {
    try {
      setError("");

      await hrService.createBatch({
        name: form.title.trim(),
        designation: form.title.trim(),
        startDate: form.startDate,
        endDate: form.endDate || null,
        mentorId: form.mentorId || null,
        capacity: Number(form.capacity),
      });

      await loadBatches();
      setIsCreateOpen(false);
    } catch (err) {
      console.error("Failed to create batch:", err);
      setError(
        err.response?.data?.message ||
          "Batch create zala nahi. Required fields check kara."
      );
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Internship Batches
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage batch cycles, capacity, and mentor assignments
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Create Batch
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="border-b border-slate-100">
              <tr className="text-xs font-medium uppercase text-slate-400">
                <th className="px-5 py-4">Batch ID</th>
                <th className="px-5 py-4">Internship Designation</th>
                <th className="px-5 py-4">Start Date</th>
                <th className="px-5 py-4">End Date</th>
                <th className="px-5 py-4">Mentor</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                    Loading batches...
                  </td>
                </tr>
              ) : (
                <>
                  {batches.map((batch) => (
                    <tr
                      key={batch.id}
                      className="text-sm text-slate-600 transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-slate-500">
                        BATCH-{String(batch.id).slice(0, 8).toUpperCase()}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900">
                        {batch.designation || batch.name}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        {formatDate(batch.startDate)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        {formatDate(batch.endDate)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        {batch.mentor?.firstName
                          ? `${batch.mentor.firstName} ${batch.mentor.lastName || ""}`.trim()
                          : "Not assigned"}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          disabled={viewLoading}
                          onClick={() => handleViewBatch(batch)}
                          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
                        >
                          {viewLoading ? "Loading..." : "View"}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {batches.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                        No batches available.
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <CreateBatchForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateOpen(false)}
            />
          </div>
        </div>
      )}

      {selectedBatch && (
        <BatchModal
          batch={selectedBatch}
          onClose={() => setSelectedBatch(null)}
        />
      )}
    </div>
  );
}

export default Batches;
