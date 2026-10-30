
import React from "react";
import { X } from "lucide-react";

function BatchModal({ batch, onClose }) {
  if (!batch) return null;

  // Backend returns students inside batchStudents
  const students = Array.isArray(batch.batchStudents)
    ? batch.batchStudents
        .map((item) => item.student)
        .filter(Boolean)
    : Array.isArray(batch.students)
      ? batch.students
      : [];

  const mentorName =
    batch.mentor && typeof batch.mentor === "object"
      ? `${batch.mentor.firstName || ""} ${batch.mentor.lastName || ""}`.trim() ||
        "Not assigned"
      : batch.mentor || "Not assigned";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Student List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {batch.designation || batch.name || batch.title || "Batch"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Mentor: {mentorName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close student list"
            className="rounded-md p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {students.length > 0 ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs font-medium uppercase text-slate-400">
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Email</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {students.map((student, index) => (
                  <tr
                    key={student.id || index}
                    className="text-sm text-slate-600 transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {student.firstName || student.lastName
                        ? `${student.firstName || ""} ${student.lastName || ""}`.trim()
                        : student.name || "Unnamed Student"}
                    </td>
                    <td className="px-4 py-3">
                      {student.email || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="font-medium text-slate-700">
              No students assigned
            </p>
            <p className="mt-1 text-sm text-slate-400">
              No student records are available for this batch.
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-100 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BatchModal;
