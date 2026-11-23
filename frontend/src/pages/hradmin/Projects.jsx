
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Laptop,
  Smartphone,
  CalendarDays,
  UsersRound,
  Pencil,
  Trash2,
  Search,
  FolderKanban,
  CircleCheck,
  Clock3,
  Ban,
  Plus,
  ArrowUpRight,
  ChevronDown,
  X,
} from "lucide-react";

import CreateProject from "../../components/forms/hradmin/CreateProject";
import EditProject from "../../components/forms/hradmin/EditProject";
import View from "../../components/forms/hradmin/View";
import { hrService } from "../../services/hr.service";

function formatDate(dateString) {
  if (!dateString) return "Not scheduled";

  return new Date(dateString + "T00:00:00").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDateValue(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const statusConfig = {
  PLANNED: {
    label: "Planned",
    className: "bg-amber-50/70 text-amber-700 border-amber-100",
    dot: "bg-amber-400",
  },
  ACTIVE: {
    label: "Active",
    className: "bg-blue-50/70 text-blue-700 border-blue-100",
    dot: "bg-blue-400",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50/70 text-emerald-700 border-emerald-100",
    dot: "bg-emerald-400",
  },
  ON_HOLD: {
    label: "On Hold",
    className: "bg-orange-50/70 text-orange-700 border-orange-100",
    dot: "bg-orange-400",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-rose-50/70 text-rose-600 border-rose-100",
    dot: "bg-rose-400",
  },
};

function ProjectCard({
  project,
  onClick,
  onEdit,
  onDelete,
  onDeadlineChange,
}) {
  const dateInputRef = useRef(null);

  const {
    title,
    description,
    technology,
    endDate,
    status,
    type,
    students = [],
  } = project;

  const isCancelled = status === "CANCELLED";
  const isMobile = type === "mobile";
  const currentDeadline = getDateValue(endDate);
  const currentStatus = statusConfig[status] || statusConfig.PLANNED;

  const handleCalendarClick = (event) => {
    event.stopPropagation();

    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const handleDeadlineChange = (event) => {
    event.stopPropagation();

    const newDate = event.target.value;

    if (!newDate) return;
    if (currentDeadline && newDate <= currentDeadline) return;

    onDeadlineChange(newDate);
  };

  return (
    <article
      onClick={onClick}
      className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-[0_3px_10px_rgba(15,23,42,0.09)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.13)]"
    >
      {/* PROJECT HEADER */}
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 text-blue-600">
          {isMobile ? <Smartphone size={20} /> : <Laptop size={20} />}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="min-h-10 break-words text-sm font-bold leading-5 text-slate-800">
            {title}
          </h3>

          <p className="mt-0.5 line-clamp-1 break-all text-xs text-slate-500">
            {description || "No project description available."}
          </p>
        </div>

        <span
          className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-semibold ${currentStatus.className}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${currentStatus.dot}`} />
          {currentStatus.label}
        </span>
      </div>

      {/* TECHNOLOGY */}
      <div className="mt-3 flex min-h-6 flex-wrap items-center gap-1.5">
        {technology ? (
          technology.split(",").map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-700"
            >
              {item.trim()}
            </span>
          ))
        ) : (
          <span className="text-[11px] text-slate-400">
            No technology specified
          </span>
        )}
      </div>

      {/* PROJECT DETAILS */}
      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            disabled={isCancelled}
            onClick={handleCalendarClick}
            title="Change deadline"
            className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-50/70 text-orange-600"
          >
            <CalendarDays size={16} />

            {!isCancelled && (
              <input
                ref={dateInputRef}
                type="date"
                value={currentDeadline}
                min={(() => {
                  if (!currentDeadline) return "";

                  const date = new Date(currentDeadline + "T00:00:00");
                  date.setDate(date.getDate() + 1);

                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const day = String(date.getDate()).padStart(2, "0");

                  return `${year}-${month}-${day}`;
                })()}
                onChange={handleDeadlineChange}
                onClick={(event) => event.stopPropagation()}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Change project deadline"
              />
            )}
          </button>

          <div className="min-w-0">
            <p className="text-[10px] text-slate-400">Deadline</p>
            <p className="mt-0.5 text-xs font-semibold text-slate-700">
              {formatDate(endDate)}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-end gap-2">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 text-indigo-500">
            <UsersRound size={16} />
          </div>

          <div>
            <p className="text-[10px] text-slate-400">Students</p>
            <p className="mt-0.5 text-xs font-semibold text-slate-700">
              {students.length} Assigned
            </p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      {!isCancelled ? (
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50/60"
          >
            <Pencil size={13} />
            Edit
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50/60"
          >
            <Trash2 size={13} />
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-3 border-t border-slate-200 pt-3">
          <p className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-rose-500">
            <Ban size={13} />
            This project has been cancelled
          </p>
        </div>
      )}
    </article>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchProjects = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await hrService.getAllProjects();
      setProjects(res.data || []);
    } catch (err) {
      console.error("Load projects error:", err);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const stats = useMemo(
    () => ({
      total: projects.length,
      active: projects.filter((p) => p.status === "ACTIVE").length,
      planned: projects.filter((p) => p.status === "PLANNED").length,
      cancelled: projects.filter((p) => p.status === "CANCELLED").length,
    }),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !searchValue ||
        project.title?.toLowerCase().includes(searchValue) ||
        project.description?.toLowerCase().includes(searchValue) ||
        project.technology?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const handleDeadlineChange = async (projectId, newDeadline) => {
    try {
      await hrService.updateProject(projectId, {
        endDate: newDeadline,
      });

      await fetchProjects();
    } catch (err) {
      console.error("Update deadline error:", err);
      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to update deadline"
      );
    }
  };

  const handleDeleteProject = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel "${project.title}"? The project will be marked as CANCELLED.`
    );

    if (!confirmed) return;

    try {
      await hrService.deleteProject(project.id);

      if (selectedProject?.id === project.id) {
        setSelectedProject(null);
      }

      await fetchProjects();
      alert("Project cancelled successfully.");
    } catch (err) {
      console.error("Cancel project error:", err);
      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to cancel project"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FD]">
      <div className="mx-auto max-w-[1500px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <FolderKanban size={15} />
              HR Administration
            </div>

            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Project Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage projects, monitor progress and organize student assignments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create New Project
          </button>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-blue-600">
                <FolderKanban size={19} />
              </div>
              <ArrowUpRight size={16} className="text-slate-300" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="mt-1 text-xs text-slate-500">Total Projects</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-emerald-600">
              <CircleCheck size={19} />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-800">{stats.active}</p>
            <p className="mt-1 text-xs text-slate-500">Active Projects</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-amber-600">
              <Clock3 size={19} />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-800">{stats.planned}</p>
            <p className="mt-1 text-xs text-slate-500">Planned Projects</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-rose-500">
              <Ban size={19} />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-800">{stats.cancelled}</p>
            <p className="mt-1 text-xs text-slate-500">Cancelled Projects</p>
          </div>
        </div>

        {/* ALL PROJECTS */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_3px_12px_rgba(15,23,42,0.07)] sm:p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">All Projects</h2>
              <p className="mt-1 text-xs text-slate-500">
                Browse and manage all internship projects
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-blue-300 focus-within:bg-white">
                <Search size={16} className="text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search projects..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:w-48"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-300 sm:w-40"
                >
                  <option value="ALL">All Status</option>
                  <option value="PLANNED">Planned</option>
                  <option value="ACTIVE">Active</option>
                  <option value="ON_HOLD">On Hold</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredProjects.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {projects.length}
              </span>{" "}
              projects
            </p>

            {(search || statusFilter !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("ALL");
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-100 border-t-blue-500" />
                <p className="mt-3 text-sm text-slate-500">
                  Loading projects...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="py-10 text-center">
              <p className="text-sm text-red-500">{error}</p>
              <button
                type="button"
                onClick={fetchProjects}
                className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
              >
                Try Again
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center text-center">
              <FolderKanban size={28} className="text-slate-300" />
              <h3 className="mt-3 font-semibold text-slate-700">
                {projects.length === 0
                  ? "No projects created yet"
                  : "No matching projects found"}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {projects.length === 0
                  ? "Create your first project to get started."
                  : "Try changing your search or status filter."}
              </p>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  onEdit={() => {
                    setSelectedProject(null);
                    setEditingProject(project);
                  }}
                  onDelete={() => handleDeleteProject(project)}
                  onDeadlineChange={(newDeadline) =>
                    handleDeadlineChange(project.id, newDeadline)
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* PROJECT DETAILS */}
      {selectedProject && (
        <View
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* CREATE PROJECT */}
      {showCreateModal && (
        <CreateProject
          onClose={() => setShowCreateModal(false)}
          onCreated={fetchProjects}
        />
      )}

      {/* EDIT PROJECT */}
      {editingProject && (
        <EditProject
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onUpdated={fetchProjects}
        />
      )}
    </div>
  );
}

export default Projects;
