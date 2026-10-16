
import React, { useState } from "react";
import CreateBatchForm from "../../components/forms/hradmin/CreateBatchForm.jsx";
import BatchModal from "../../components/forms/hradmin/BatchModal.jsx";

const initialBatches = [
  {
    id: 1,
    title: "Batch 2025-Q1",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    mentor: "Dr. Arun Patel",
    status: "Active",
    enrolled: 45,
    capacity: 50,
    students: [
      { id: 101, name: "Aarav Patil" },
      { id: 102, name: "Varsha Zambare" },
      { id: 103, name: "Komal Kadam" },
    ],
  },
  {
    id: 2,
    title: "Batch 2025-Q2",
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    mentor: "Dr. Arun Patel",
    status: "Active",
    enrolled: 45,
    capacity: 70,
    students: [],
  },
  {
    id: 3,
    title: "Batch 2025-Q3",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    mentor: "Dr. Arun Patel",
    status: "Active",
    enrolled: 20,
    capacity: 50,
    students: [],
  },
  {
    id: 4,
    title: "Batch 2025-Q4",
    startDate: "2026-10-01",
    endDate: "2026-12-31",
    mentor: "Dr. Arun Patel",
    status: "Completed",
    enrolled: 10,
    capacity: 50,
    students: [],
  },
];

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function Batches() {
  const [batches, setBatches] = useState(initialBatches);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleCreate = (form) => {
    const newBatch = {
      id:
        batches.reduce(
          (max, batch) => Math.max(max, batch.id),
          0
        ) + 1,
      title: form.title,
      startDate: form.startDate,
      endDate: form.endDate,
      mentor: form.mentor,
      status: "Upcoming",
      enrolled: 0,
      capacity: Number(form.capacity),
      students: [],
    };

    setBatches((prev) => [...prev, newBatch]);
    setIsCreateOpen(false);
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
              {batches.map((batch) => (
                <tr
                  key={batch.id}
                  className="text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-mono text-slate-500">
                    BATCH-{String(batch.id).padStart(3, "0")}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900">
                    {batch.title}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {formatDate(batch.startDate)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {formatDate(batch.endDate)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {batch.mentor || "Not assigned"}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedBatch(batch)}
                      className="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      View
                    </button>
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
