import {
  Laptop,
  FileText,
  Code2,
  UserRound,
  CalendarDays,
  Clock3,
  X,
} from "lucide-react";

const ViewProject = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 backdrop-blur-sm p-4">

      {/* MODAL WRAPPER */}
      <div className="relative w-full max-w-5xl max-h-[calc(100vh-32px)] rounded-[28px] overflow-hidden shadow-[0_30px_90px_rgba(15,23,42,0.28)]">

        {/* SOFT GLOW */}
        <div className="absolute -top-24 -right-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* MODAL */}
        <div className="relative bg-white">

          {/* ================= HEADER ================= */}
          <div className="relative overflow-hidden px-8 py-6 bg-gradient-to-r from-blue-50 via-white to-purple-50 border-b border-slate-100">

            <div className="absolute right-[-40px] top-[-80px] w-64 h-64 rounded-full bg-blue-200/25 blur-2xl" />

            <div className="absolute right-[18%] bottom-[-100px] w-48 h-48 rounded-full bg-purple-200/20 blur-2xl" />

            <div className="relative flex items-center justify-between gap-5">

              {/* TITLE */}
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center shadow-sm">

                  <Laptop
                    size={28}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h2 className="text-2xl lg:text-[27px] font-bold text-slate-900">
                    Project Details
                  </h2>

                  <p className="text-base text-slate-500 mt-1">
                    {project.name}
                  </p>

                </div>

              </div>

              {/* CLOSE BUTTON */}
              <button
                type="button"
                onClick={onClose}
                className="relative w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:shadow-md transition-all duration-200 shrink-0"
              >
                <X size={21} />
              </button>

            </div>

          </div>

          {/* ================= CONTENT ================= */}
          <div
            className="
              max-h-[calc(100vh-150px)]
              overflow-y-auto
              px-8 py-7
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >

            {/* ================= DESCRIPTION ================= */}
            <div className="mb-6">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">

                  <FileText
                    size={18}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </h3>

              </div>

              <div className="bg-slate-50/80 border border-slate-100 rounded-2xl px-5 py-4">

                <p className="text-[15px] leading-7 text-slate-600">
                  {project.description}
                </p>

              </div>

            </div>

            {/* ================= INFORMATION GRID ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* TECHNICAL STACK */}
              <div className="group bg-gradient-to-br from-blue-50 to-blue-50/40 border border-blue-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">

                    <Code2
                      size={23}
                      className="text-blue-600"
                    />

                  </div>

                  <div className="min-w-0">

                    <p className="text-sm text-slate-500">
                      Technical Stack
                    </p>

                    <p className="text-[15px] font-semibold text-slate-900 mt-1 leading-6">
                      {project.technology}
                    </p>

                  </div>

                </div>

              </div>

              {/* MENTOR */}
              <div className="group bg-gradient-to-br from-purple-50 to-purple-50/40 border border-purple-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">

                    <UserRound
                      size={23}
                      className="text-purple-600"
                    />

                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      Mentor
                    </p>

                    <p className="text-base font-semibold text-slate-900 mt-1">
                      {project.mentor}
                    </p>

                  </div>

                </div>

              </div>

              {/* START DATE */}
              <div className="group bg-gradient-to-br from-emerald-50 to-emerald-50/40 border border-emerald-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">

                    <CalendarDays
                      size={23}
                      className="text-emerald-500"
                    />

                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      Start Date
                    </p>

                    <p className="text-base font-semibold text-slate-900 mt-1">
                      {project.startDate}
                    </p>

                  </div>

                </div>

              </div>

              {/* DEADLINE */}
              <div className="group bg-gradient-to-br from-orange-50 to-orange-50/40 border border-orange-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">

                    <CalendarDays
                      size={23}
                      className="text-orange-500"
                    />

                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      Deadline
                    </p>

                    <p className="text-base font-semibold text-slate-900 mt-1">
                      {project.deadline}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= PROJECT STATUS ================= */}
            <div className="mt-4 bg-gradient-to-br from-emerald-50 to-emerald-50/40 border border-emerald-100 rounded-2xl p-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">

                  <Clock3
                    size={23}
                    className="text-emerald-500"
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Project Status
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />

                    <span className="text-sm font-semibold text-emerald-600">
                      {project.status}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ViewProject;