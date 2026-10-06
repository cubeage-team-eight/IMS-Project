import React, { useState, useRef } from "react";
import {
  Laptop,
  Smartphone,
  CalendarDays,
  UsersRound,
} from "lucide-react";

import CreateProject from "../../components/forms/hradmin/CreateProject";
import View from "../../components/forms/hradmin/View";

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
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

function ProjectCard({
  name,
  description,
  technology,
  deadline,
  status,
  type,
  students,
  onClick,
  onDeadlineChange,
}) {
  const isMobile = type === "mobile";

  const dateInputRef = useRef(null);

  const currentDeadline = getDateValue(deadline);

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

    // Deadline cannot be reduced.
    // New deadline must be after the existing deadline.
    if (currentDeadline && newDate <= currentDeadline) {
      return;
    }

    onDeadlineChange(newDate);
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-blue-100/70 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-5 w-full cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
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
              : "bg-blue-50 text-blue-600"
          }`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5 align-middle" />
          {status}
        </span>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCalendarClick}
            className="relative w-9 h-9 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition cursor-pointer"
            title="Change deadline"
          >
            <CalendarDays size={17} strokeWidth={1.8} />

            <input
              ref={dateInputRef}
              type="date"
              value={currentDeadline}
              min={(() => {
                if (!currentDeadline) return "";

                const date = new Date(
                  currentDeadline + "T00:00:00"
                );

                date.setDate(date.getDate() + 1);

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(
                  2,
                  "0"
                );
                const day = String(date.getDate()).padStart(2, "0");

                return `${year}-${month}-${day}`;
              })()}
              onChange={handleDeadlineChange}
              onClick={(event) => event.stopPropagation()}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Change project deadline"
            />
          </button>

          <div>
            <p className="text-slate-400 text-xs">Deadline</p>

            <p className="text-slate-800 text-sm font-semibold mt-0.5">
              {formatDate(deadline)}
            </p>
          </div>
        </div>

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
  const [showCreateModal, setShowCreateModal] = useState(false);

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
      mentor: "Arun Patel",
      students: ["Priyanka Patil", "Aarav Patil"],
    },
    {
      id: 2,
      name: "Mobile Application",
      description:
        "Mobile application development internship project",
      technology: "React Native",
      deadline: "2026-11-30",
      status: "UPCOMING",
      type: "mobile",
      mentor: "Neha Sharma",
      students: ["Tanmay Chavan", "Aditi Verma"],
    },
  ]);

  const handleDeadlineChange = (projectId, newDeadline) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              deadline: newDeadline,
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
        deadline: newDeadline,
      };
    });
  };

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

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm hover:bg-blue-600 hover:shadow-md transition-all duration-200"
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
            deadline={project.deadline}
            status={project.status}
            type={project.type}
            students={project.students}
            onClick={() => setSelectedProject(project)}
            onDeadlineChange={(newDeadline) =>
              handleDeadlineChange(project.id, newDeadline)
            }
          />
        ))}
      </div>

      {/* PROJECT DETAILS POPUP */}
      {selectedProject && (
        <View
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* CREATE PROJECT FORM */}
      {showCreateModal && (
        <CreateProject
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}

export default Projects;