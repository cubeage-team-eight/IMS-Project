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

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function View({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                project.type === "mobile"
                  ? "bg-purple-50 text-purple-500"
                  : "bg-blue-50 text-blue-500"
              }`}
            >
              {project.type === "mobile" ? (
                <Smartphone size={23} />
              ) : (
                <Laptop size={23} />
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {project.name}
              </h2>

              <p className="text-sm text-slate-400 mt-0.5">
                Project Details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {/* DESCRIPTION */}
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">
              Description
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* PROJECT DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* TECHNICAL STACK */}
            <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white text-blue-500 flex items-center justify-center">
                  <Code2 size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Technical Stack
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {project.technology}
                  </p>
                </div>
              </div>
            </div>

            {/* MENTOR */}
            <div className="rounded-xl bg-purple-50/70 border border-purple-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white text-purple-500 flex items-center justify-center">
                  <UserRound size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Mentor
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {project.mentor}
                  </p>
                </div>
              </div>
            </div>

            {/* STUDENTS */}
            <div className="rounded-xl bg-green-50/70 border border-green-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white text-green-500 flex items-center justify-center">
                  <UsersRound size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Students
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {project.students.length} Students
                  </p>
                </div>
              </div>
            </div>

            {/* DEADLINE */}
            <div className="rounded-xl bg-orange-50/70 border border-orange-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white text-orange-500 flex items-center justify-center">
                  <CalendarDays size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Deadline
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {formatDate(project.deadline)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ASSIGNED STUDENTS */}
          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-3">
              Assigned Students
            </p>

            <div className="flex flex-wrap gap-2">
              {project.students.map((student) => (
                <span
                  key={student}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600"
                >
                  {student}
                </span>
              ))}
            </div>
          </div>

          {/* PROJECT STATUS */}
          <div className="mt-6 flex items-center justify-between pt-5 border-t border-slate-100">
            <span className="text-sm text-slate-400">
              Project Status
            </span>

            <span
              className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                project.status === "COMPLETED"
                  ? "bg-green-50 text-green-600"
                  : project.status === "UPCOMING"
                  ? "bg-yellow-50 text-yellow-600"
                  : project.status === "ON HOLD"
                  ? "bg-orange-50 text-orange-600"
                  : project.status === "CANCELLED"
                  ? "bg-red-50 text-red-600"
                  : project.status === "OVERDUE"
                  ? "bg-purple-50 text-purple-600"
                  : project.status === "MAINTENANCE"
                  ? "bg-blue-50 text-blue-600"
                  : project.status === "UNDER REVIEW"
                  ? "bg-slate-100 text-slate-600"
                  : project.status === "PENDING"
                  ? "bg-orange-50 text-orange-600"
                  : project.status === "NOT STARTED"
                  ? "bg-slate-100 text-slate-600"
                  : project.status === "TESTING"
                  ? "bg-green-50 text-green-600"
                  : project.status === "DEPLOYMENT"
                  ? "bg-blue-50 text-blue-600"
                  : project.status === "REWORK REQUIRED"
                  ? "bg-purple-50 text-purple-600"
                  : project.status === "ARCHIVED"
                  ? "bg-slate-100 text-slate-500"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5 align-middle" />
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;