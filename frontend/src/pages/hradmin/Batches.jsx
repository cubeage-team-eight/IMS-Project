
import React, { useEffect, useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";
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
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewLoading, setViewLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  // View Batch
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

  // Create Batch
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

  // Permanently Delete Batch
  const handleDeleteBatch = async () => {
    if (!deleteTarget?.id) return;

    try {
      setDeleting(true);
      setError("");

      await hrService.deleteBatch(deleteTarget.id);

      // Remove deleted batch from the current list
      setBatches((prev) =>
        prev.filter((batch) => batch.id !== deleteTarget.id)
      );

      // Close View modal if the same batch is open
      if (selectedBatch?.id === deleteTarget.id) {
        setSelectedBatch(null);
      }

      setDeleteTarget(null);

      // Refresh batch list from backend
      await loadBatches();
    } catch (err) {
      console.error("Failed to delete batch:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete batch. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {/* Header */}
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

      {/* Error Message */}
      {error && (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Batch Table */}
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
                <th className="px-5 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-slate-400"
                  >
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

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            type="button"
                            disabled={viewLoading || deleting}
                            onClick={() => handleViewBatch(batch)}
                            className="rounded-md px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
                          >
                            {viewLoading ? "Loading..." : "View"}
                          </button>

                          <button
                            type="button"
                            disabled={deleting}
                            onClick={() => setDeleteTarget(batch)}
                            className="flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {batches.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-10 text-center text-slate-400"
                      >
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

      {/* Create Batch Modal */}
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

      {/* View Batch Modal */}
      {selectedBatch && (
        <BatchModal
          batch={selectedBatch}
          onClose={() => setSelectedBatch(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!deleting) setDeleteTarget(null);
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
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Delete Internship Batch?
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Are you sure you want to permanently delete this batch? This
              action cannot be undone.
            </p>

            <div className="mt-4 rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-400">Batch ID</p>
              <p className="mt-1 font-mono text-sm font-semibold text-slate-700">
                BATCH-
                {String(deleteTarget.id).slice(0, 8).toUpperCase()}
              </p>

              <p className="mt-3 text-xs text-slate-400">
                Internship Designation
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {deleteTarget.designation || deleteTarget.name}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteBatch}
                disabled={deleting}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={15} />
                {deleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Batches;
