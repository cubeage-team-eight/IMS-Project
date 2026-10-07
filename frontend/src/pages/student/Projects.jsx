import { useState } from "react";

import {
  CalendarDays,
  UserRound,
  ArrowRight,
  FolderKanban,
  Sparkles,
} from "lucide-react";

import ViewProject from "../../components/forms/student/ViewProject";

const project = {
  name: "Internship Management System",

  description:
    "A web-based system to manage internships, students, mentors, and related activities efficiently.",

  technology:
    "React.js, Node.js, Express.js, PostgreSQL",

  deadline: "31 October 2026",

  startDate: "01 August 2026",

  mentor: "Rahul Patil",

  students: ["Aarav Patil", "Rahul Patil"],

  status: "IN PROGRESS",
};

const Projects = () => {
  const [showProjectDetails, setShowProjectDetails] = useState(false);

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

          <Sparkles
            size={19}
            className="text-blue-500"
          />

        </div>

        <p className="text-sm text-slate-500 mt-1">
          Your assigned internship project
        </p>

      </div>

      {/* MAIN PROJECT CARD */}
      <div className="relative">

        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-cyan-400/30 rounded-[26px] blur-[2px]" />

        <div className="relative bg-white/95 backdrop-blur-xl rounded-[26px] border border-white shadow-[0_20px_60px_rgba(59,130,246,0.12)] overflow-hidden">

          {/* TOP SECTION */}
          <div className="relative px-7 lg:px-10 pt-8 pb-7 bg-gradient-to-br from-blue-50 via-white to-purple-50">

            <div className="absolute right-[-45px] top-[-70px] w-52 h-52 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/30 blur-2xl" />

            {/* PROJECT BADGE */}
            <div className="relative flex items-center justify-between gap-4">

              <div className="inline-flex items-center gap-2.5 bg-white/80 border border-blue-100 shadow-sm text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">

                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">

                  <FolderKanban
                    size={15}
                    className="text-white"
                  />

                </div>

                ASSIGNED PROJECT

              </div>

              <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 px-3.5 py-1.5 rounded-full text-xs font-semibold">

                <span className="w-2 h-2 bg-emerald-500 rounded-full" />

                ACTIVE

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

                  <CalendarDays
                    size={23}
                    className="text-orange-500"
                  />

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

                  <UserRound
                    size={23}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
                    Mentor
                  </p>

                  <p className="text-base font-bold text-slate-900 mt-1">
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
                onClick={() => setShowProjectDetails(true)}
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

      {/* PROJECT DETAILS POPUP */}
      {showProjectDetails && (
        <ViewProject
          project={project}
          onClose={() => setShowProjectDetails(false)}
        />
      )}

    </div>
  );
};

export default Projects;