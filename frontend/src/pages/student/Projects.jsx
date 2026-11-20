import { useEffect, useState } from "react";

import {
  CalendarDays,
  UserRound,
  ArrowRight,
  FolderKanban,
  Sparkles,
} from "lucide-react";

import ViewProject from "../../components/forms/student/ViewProject";
import { studentService } from "../../services/student.service";

const formatDate = (dateString) => {
  if (!dateString) return "Not available";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatStatus = (status) => {
  const statusMap = {
    PLANNED: "UPCOMING",
    ACTIVE: "IN PROGRESS",
    COMPLETED: "COMPLETED",
    ON_HOLD: "ON HOLD",
  };

  return statusMap[status] || status || "UPCOMING";
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await studentService.getMyProjects();

        const projectList = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : [];

        const formattedProjects = projectList.map((project) => {
          const mentorNames = (project.mentors || [])
            .map((mentor) =>
              `${mentor.firstName || ""} ${mentor.lastName || ""}`.trim()
            )
            .filter(Boolean);

          const students = (project.students || []).map((student) => {
            return (
              `${student.firstName || ""} ${student.lastName || ""}`.trim() ||
              student.email ||
              "Student"
            );
          });

          return {
            id: project.id,
            name: project.title || project.name || "Untitled Project",
            description: project.description || "No description available.",
            technology: project.technology || "Not specified",
            deadline: formatDate(project.endDate || project.deadline),
            startDate: formatDate(project.startDate),
            mentor: mentorNames.join(", ") || "Not assigned",
            students,
            status: formatStatus(project.status),
            type: project.type || "web",
          };
        });

        if (isMounted) {
          setProjects(formattedProjects);
        }
      } catch (err) {
        console.error("Student projects fetch error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load projects. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#EEF3F8] relative overflow-hidden">

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-[-100px] right-[-80px] w-[320px] h-[320px] bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-[-120px] left-[30%] w-[280px] h-[280px] bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* PAGE HEADER */}
      <div className="relative mb-7">

        <div className="flex items-center gap-2">

          <h1 className="text-2xl font-semibold text-slate-900">
            My Project
          </h1>

          <Sparkles size={19} className="text-blue-500" />

        </div>

        <p className="text-sm text-slate-500 mt-1">
          Your assigned internship projects
        </p>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="relative bg-white rounded-[26px] border border-slate-100 shadow-sm p-12 text-center">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-sm font-medium text-slate-600">
            Loading your projects...
          </p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="relative bg-white rounded-[26px] border border-red-100 shadow-sm p-10 text-center">
          <p className="text-red-500 font-medium">
            {error}
          </p>
        </div>
      )}

      {/* NO PROJECTS */}
      {!loading && !error && projects.length === 0 && (
        <div className="relative bg-white rounded-[26px] border border-slate-100 shadow-sm p-12 text-center">

          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <FolderKanban size={30} className="text-blue-500" />
          </div>

          <h2 className="text-lg font-semibold text-slate-800">
            No Projects Assigned Yet
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Your assigned internship projects will appear here.
          </p>

        </div>
      )}

      {/* PROJECT CARDS */}
      {!loading && !error && projects.length > 0 && (
        <div className="relative space-y-6">

          {projects.map((project) => (

            <div key={project.id} className="relative">

              <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-cyan-400/30 rounded-[26px] blur-[2px]" />

              <div className="relative bg-white/95 backdrop-blur-xl rounded-[26px] border border-white shadow-[0_20px_60px_rgba(59,130,246,0.12)] overflow-hidden">

                {/* TOP SECTION */}
                <div className="relative px-7 lg:px-10 pt-8 pb-7 bg-gradient-to-br from-blue-50 via-white to-purple-50">

                  <div className="absolute right-[-45px] top-[-70px] w-52 h-52 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/30 blur-2xl" />

                  {/* PROJECT BADGE */}
                  <div className="relative flex items-center justify-between gap-4">

                    <div className="inline-flex items-center gap-2.5 bg-white/80 border border-blue-100 shadow-sm text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">

                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">

                        <FolderKanban size={15} className="text-white" />

                      </div>

                      ASSIGNED PROJECT

                    </div>

                    <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 px-3.5 py-1.5 rounded-full text-xs font-semibold">

                      <span className="w-2 h-2 bg-emerald-500 rounded-full" />

                      {project.status}

                    </div>

                  </div>

                  {/* PROJECT TITLE */}
                  <div className="relative mt-8">

                    <p className="text-sm font-medium text-blue-600 mb-2">
                      Internship Project
                    </p>

                    <h2 className="text-3xl lg:text-[42px] leading-tight font-bold tracking-tight text-slate-900 max-w-4xl">
                      {project.name}
                    </h2>

                    <p className="mt-4 text-base lg:text-[17px] text-slate-600 max-w-3xl leading-7">
                      {project.description}
                    </p>

                  </div>

                </div>

                {/* PROJECT INFO */}
                <div className="px-7 lg:px-10 py-7">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* DEADLINE */}
                    <div className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-md transition-all duration-200">

                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center">

                        <CalendarDays size={23} className="text-orange-500" />

                      </div>

                      <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-orange-500">
                          Deadline
                        </p>

                        <p className="text-base font-bold text-slate-900 mt-1">
                          {project.deadline}
                        </p>

                      </div>

                    </div>

                    {/* MENTOR */}
                    <div className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-md transition-all duration-200">

                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center">

                        <UserRound size={23} className="text-blue-600" />

                      </div>

                      <div className="min-w-0">

                        <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
                          Mentor
                        </p>

                        <p className="text-base font-bold text-slate-900 mt-1 break-words">
                          {project.mentor}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* DIVIDER */}
                  <div className="my-7 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  {/* ACTION */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                    <div>

                      <p className="text-sm font-semibold text-slate-800">
                        Want to know more about your project?
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        View complete project information and details.
                      </p>

                    </div>

                    {/* VIEW PROJECT DETAILS */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
                    >
                      View Project Details

                      <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition">

                        <ArrowRight
                          size={17}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />

                      </span>

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* PROJECT DETAILS POPUP */}
      {selectedProject && (
        <ViewProject
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
};

export default Projects;