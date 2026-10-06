import React from "react";
import {
  Laptop,
  Smartphone,
  CalendarDays,
  UsersRound,
  UserRound,
  Code2,
  X,
} from "lucide-react";

import UpdateProjectStatus from "./UpdateProjectStatus";

function formatDate(dateString) {
  if (!dateString) return "Not available";

  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ViewProject({ project, onClose, onStatusUpdate }) {
  if (!project) return null;

  const isMobile = project.type === "mobile";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        {/* ================= HEADER ================= */}
        <div className="flex items-start justify-between px-7 py-6 border-b border-slate-100">
          <div className="flex items-start gap-5">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                isMobile
                  ? "bg-purple-50 text-purple-500"
                  : "bg-blue-50 text-blue-500"
              }`}
            >
              {isMobile ? (
                <Smartphone size={28} strokeWidth={1.8} />
              ) : (
                <Laptop size={28} strokeWidth={1.8} />
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {project.name}
              </h2>

              <p className="text-base text-slate-400 mt-1">
                Project Details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition"
          >
            <X size={22} strokeWidth={1.8} />
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="px-7 py-7">
          {/* DESCRIPTION */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-400 uppercase">
              Description
            </p>

            <p className="text-base text-slate-600 mt-3">
              {project.description || "No description available."}
            </p>
          </div>

          {/* ================= INFO CARDS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* TECHNICAL STACK */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-blue-500">
                  <Code2 size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Technical Stack
                  </p>

                  <p className="text-base font-semibold text-slate-800 mt-1">
                    {project.technology || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* MENTOR */}
            <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-purple-500">
                  <UserRound size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Mentor
                  </p>

                  <p className="text-base font-semibold text-slate-800 mt-1">
                    {project.mentor || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* STUDENTS */}
            <div className="rounded-2xl border border-green-100 bg-green-50/50 p-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-green-500">
                  <UsersRound size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Students
                  </p>

                  <p className="text-base font-semibold text-slate-800 mt-1">
                    {project.students?.length || 0} Students
                  </p>
                </div>
              </div>
            </div>

            {/* DEADLINE */}
            <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-orange-500">
                  <CalendarDays size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Deadline
                  </p>

                  <p className="text-base font-semibold text-slate-800 mt-1">
                    {formatDate(project.deadline)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= ASSIGNED STUDENTS ================= */}
          <div className="mt-8">
            <p className="text-sm font-semibold text-slate-400 uppercase">
              Assigned Students
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              {project.students?.length > 0 ? (
                project.students.map((student, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-sm"
                  >
                    {student}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No students assigned.
                </p>
              )}
            </div>
          </div>

          {/* ================= PROJECT STATUS ================= */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <p className="text-base text-slate-400">
              Project Status
            </p>

            <UpdateProjectStatus
              status={project.status}
              onStatusChange={(newStatus) =>
                onStatusUpdate(project.id, newStatus)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProject;