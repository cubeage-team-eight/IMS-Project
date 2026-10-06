import React, { useState } from "react";
import {
  Laptop,
  Smartphone,
  CalendarDays,
  UsersRound,
} from "lucide-react";

import ViewProject from "../../components/forms/mentor/ViewProject";

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ProjectCard({
  name,
  description,
  technology,
  deadline,
  status,
  type,
  students,
  onClick,
}) {
  const isMobile = type === "mobile";

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-blue-100/70 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-5 w-full cursor-pointer"
    >
      {/* ================= TOP ================= */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* PROJECT ICON */}
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${
              isMobile
                ? "bg-purple-50 text-purple-500"
                : "bg-blue-50 text-blue-500"
            }`}
          >
            {isMobile ? (
              <Smartphone size={25} strokeWidth={1.8} />
            ) : (
              <Laptop size={25} strokeWidth={1.8} />
            )}
          </div>

          {/* PROJECT INFO */}
          <div>
            <h3 className="text-slate-900 font-semibold text-base">
              {name}
            </h3>

            <p className="text-slate-500 text-sm mt-1">
              {description}
            </p>

            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full mt-2 ${
                isMobile
                  ? "bg-purple-50 text-purple-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {technology}
            </span>
          </div>
        </div>

        {/* STATUS */}
        <span
          className={`flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full ${
            status === "COMPLETED"
              ? "bg-green-50 text-green-600"
              : status === "UPCOMING"
              ? "bg-yellow-50 text-yellow-600"
              : status === "ON HOLD"
              ? "bg-orange-50 text-orange-600"
              : status === "CANCELLED"
              ? "bg-red-50 text-red-600"
              : status === "OVERDUE"
              ? "bg-red-50 text-red-600"
              : status === "TESTING"
              ? "bg-purple-50 text-purple-600"
              : status === "DEPLOYMENT"
              ? "bg-indigo-50 text-indigo-600"
              : status === "MAINTENANCE"
              ? "bg-teal-50 text-teal-600"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5 align-middle" />
          {status}
        </span>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        {/* DEADLINE */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <CalendarDays size={17} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-slate-400 text-xs">Deadline</p>

            <p className="text-slate-800 text-sm font-semibold mt-0.5">
              {formatDate(deadline)}
            </p>
          </div>
        </div>

        {/* STUDENTS */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <UsersRound size={17} strokeWidth={1.8} />
          </div>

          <div className="text-right">
            <p className="text-slate-400 text-xs">Students</p>

            <p className="text-slate-800 text-sm font-semibold mt-0.5">
              {students.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  /*
   * Mentor Projects
   *
   * Currently using local sample data.
   * Backend/API connection can be added later.
   */
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Web Development Project",
      description:
        "Internship project for web application development",
      technology: "React, Node.js",
      deadline: "2026-10-15",
      status: "IN PROGRESS",
      type: "web",
      projectType: "Web Application",
      mentor: "Arun Patel",
      startDate: "2026-08-01",
      students: ["Priyanka Patil", "Aarav Patil"],
    },
  ]);

  const handleStatusUpdate = (projectId, newStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              status: newStatus,
            }
          : project
      )
    );

    setSelectedProject((prevProject) => {
      if (!prevProject || prevProject.id !== projectId) {
        return prevProject;
      }

      return {
        ...prevProject,
        status: newStatus,
      };
    });
  };

  return (
    <div className="sm:p-6 min-h-screen bg-gradient-to-br from-[#EEF5FF] via-[#F8FBFF] to-[#F7F3FF]">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          My Projects
        </h1>

        <p className="text-slate-500 mt-1">
          View your assigned internship projects and update project status
        </p>
      </div>

      {/* ================= PROJECT CARDS ================= */}
      <div className="grid grid-cols-1 gap-5 mt-6 md:grid-cols-2">
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center md:col-span-2">
            <p className="text-slate-400 text-sm">
              No projects assigned yet.
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              description={project.description}
              technology={project.technology}
              deadline={project.deadline}
              status={project.status}
              type={project.type}
              students={project.students}
              onClick={() => setSelectedProject(project)}
            />
          ))
        )}
      </div>

      {/* ================= PROJECT DETAILS ================= */}
      {selectedProject && (
        <ViewProject
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}

export default Projects;