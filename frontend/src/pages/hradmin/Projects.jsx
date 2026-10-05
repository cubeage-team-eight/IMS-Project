import React, { useState } from "react";
import {
  Laptop,
  Smartphone,
  CalendarDays,
  UsersRound,
  UserRound,
  Code2,
  X,
} from "lucide-react";

function ProjectCard({
  name,
  description,
  technology,
  duration,
  status,
  type,
  onClick,
}) {
  const isMobile = type === "mobile";

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-blue-100/70 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-5 w-full cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">

        {/* PROJECT INFO */}
        <div className="flex items-start gap-4">

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
              : "bg-blue-50 text-blue-600"
          }`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5 align-middle" />
          {status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">

        {/* DURATION */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <CalendarDays size={17} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-slate-400 text-xs">
              Duration
            </p>

            <p className="text-slate-800 text-sm font-semibold mt-0.5">
              {duration}
            </p>
          </div>
        </div>

        {/* STUDENTS */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <UsersRound size={17} strokeWidth={1.8} />
          </div>

          <div className="text-right">
            <p className="text-slate-400 text-xs">
              Students
            </p>

            <p className="text-slate-800 text-sm font-semibold mt-0.5">
              {0}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}


function ProjectDetailsModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* MODAL HEADER */}
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


        {/* MODAL CONTENT */}
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


          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* TECH STACK */}
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


            {/* DURATION */}
            <div className="rounded-xl bg-orange-50/70 border border-orange-100 p-4">
              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-white text-orange-500 flex items-center justify-center">
                  <CalendarDays size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Duration
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {project.duration}
                  </p>
                </div>

              </div>
            </div>

          </div>


          {/* STUDENT LIST */}
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


          {/* STATUS */}
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


function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: "Web Development Project",
      description:
        "Internship project for web application development",
      technology: "React, Node.js",
      duration: "3 Months",
      status: "ACTIVE",
      type: "web",
      mentor: "Arun Patel",
      students: [
        "Priyanka Patil",
        "Aarav Patil",
      ],
    },
    {
      id: 2,
      name: "Mobile Application",
      description:
        "Mobile application development internship project",
      technology: "React Native",
      duration: "4 Months",
      status: "ACTIVE",
      type: "mobile",
      mentor: "Neha Sharma",
      students: [
        "Tanmay Chavan",
        "Aditi Verma",
      ],
    },
  ];

  return (
    <div className="sm:p-6 min-h-screen bg-gradient-to-br from-[#EEF5FF] via-[#F8FBFF] to-[#F7F3FF]">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">

        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Project Management
          </h1>

          <p className="text-slate-500 mt-1">
            Manage internship projects and assignments
          </p>
        </div>

        {/* CREATE PROJECT BUTTON */}
        <button
          type="button"
          className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:bg-blue-600 hover:shadow-md transition-all duration-200"
        >
          + Create Project
        </button>

      </div>


      {/* PROJECT CARDS */}
      <div className="grid grid-cols-1 gap-5 mt-6 md:grid-cols-2">

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            name={project.name}
            description={project.description}
            technology={project.technology}
            duration={project.duration}
            status={project.status}
            type={project.type}
            onClick={() => setSelectedProject(project)}
          />
        ))}

      </div>


      {/* PROJECT DETAILS POPUP */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
}

export default Projects;