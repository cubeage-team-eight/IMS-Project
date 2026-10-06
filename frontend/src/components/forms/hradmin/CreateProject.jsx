import React, { useState, useRef, useEffect } from "react";
import {
  UsersRound,
  Code2,
  X,
  FileText,
  FolderKanban,
  ChevronDown,
  Plus,
  CalendarDays,
} from "lucide-react";

function CreateProject({ onClose }) {
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [technologyInput, setTechnologyInput] = useState("");

  const studentDropdownRef = useRef(null);

  const mentors = [
    {
      name: "Arun Patel",
      students: ["Priyanka Patil", "Aarav Patil"],
    },
    {
      name: "Neha Sharma",
      students: ["Tanmay Chavan", "Aditi Verma"],
    },
    {
      name: "Rahul Deshmukh",
      students: ["Riya Shah", "Omkar Joshi"],
    },
  ];

  const selectedMentorData = mentors.find(
    (mentor) => mentor.name === selectedMentor
  );

  const availableStudents = selectedMentorData
    ? selectedMentorData.students
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        studentDropdownRef.current &&
        !studentDropdownRef.current.contains(event.target)
      ) {
        setShowStudentDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMentorChange = (event) => {
    const mentor = event.target.value;

    setSelectedMentor(mentor);
    setSelectedStudents([]);
    setShowStudentDropdown(false);
  };

  const toggleStudent = (student) => {
    setSelectedStudents((prev) =>
      prev.includes(student)
        ? prev.filter((item) => item !== student)
        : [...prev, student]
    );
  };

  const removeStudent = (student) => {
    setSelectedStudents((prev) =>
      prev.filter((item) => item !== student)
    );
  };

  const addTechnology = () => {
    const value = technologyInput.trim();

    if (!value) return;

    if (!technologies.includes(value)) {
      setTechnologies((prev) => [...prev, value]);
    }

    setTechnologyInput("");
  };

  const handleTechnologyKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTechnology();
    }
  };

  const removeTechnology = (technology) => {
    setTechnologies((prev) =>
      prev.filter((item) => item !== technology)
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        `}
      </style>

      <div
        className="hide-scrollbar w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="relative overflow-hidden px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-purple-50">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-blue-100/40" />
          <div className="absolute right-16 -bottom-12 w-24 h-24 rounded-full bg-purple-100/40" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-blue-100 text-blue-500 flex items-center justify-center">
                <FolderKanban size={23} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Create Project
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add a new internship project
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-600 transition"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-7">

          {/* PROJECT INFORMATION */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                <FolderKanban size={15} />
              </div>

              <h3 className="text-sm font-semibold text-slate-800">
                Project Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* PROJECT NAME */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Project Name
                </label>

                <input
                  type="text"
                  placeholder="Enter project name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                />
              </div>

              {/* PROJECT TYPE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Project Type
                </label>

                <select
                  defaultValue=""
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                >
                  <option value="" disabled>
                    Select project type
                  </option>

                  <option>Web Application</option>
                  <option>Mobile Application</option>
                  <option>Desktop Application</option>
                  <option>Other</option>
                </select>
              </div>

              {/* PROJECT STATUS */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Project Status
                </label>

                <select
                  defaultValue="Upcoming"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                >
                  <option>Upcoming</option>
                  <option>In Progress</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                  <option>Overdue</option>
                  <option>Maintenance</option>
                  <option>Under Review</option>
                  <option>Pending</option>
                  <option>Not Started</option>
                  <option>Testing</option>
                  <option>Deployment</option>
                  <option>Rework Required</option>
                  <option>Archived</option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Project Description
                </label>

                <div className="relative">
                  <FileText
                    size={17}
                    className="absolute left-3.5 top-3 text-slate-400"
                  />

                  <textarea
                    rows="3"
                    placeholder="Briefly describe the project..."
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none resize-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT ASSIGNMENT */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
                <UsersRound size={15} />
              </div>

              <h3 className="text-sm font-semibold text-slate-800">
                Project Assignment
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* MENTOR */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Assign Mentor
                </label>

                <select
                  value={selectedMentor}
                  onChange={handleMentorChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                >
                  <option value="" disabled>
                    Select mentor
                  </option>

                  {mentors.map((mentor) => (
                    <option key={mentor.name} value={mentor.name}>
                      {mentor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* STUDENTS */}
              <div ref={studentDropdownRef} className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Assign Students
                </label>

                <button
                  type="button"
                  onClick={() =>
                    selectedMentor &&
                    setShowStudentDropdown((prev) => !prev)
                  }
                  disabled={!selectedMentor}
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border bg-white text-sm text-left flex items-center justify-between gap-3 transition ${
                    selectedMentor
                      ? "border-slate-200 hover:border-blue-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                      : "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStudents.length === 0 ? (
                      <span>
                        {selectedMentor
                          ? "Select students"
                          : "Select mentor first"}
                      </span>
                    ) : (
                      selectedStudents.map((student) => (
                        <span
                          key={student}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-medium"
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          {student}

                          <X
                            size={12}
                            className="cursor-pointer"
                            onClick={() => removeStudent(student)}
                          />
                        </span>
                      ))
                    )}
                  </div>

                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-slate-400 transition ${
                      showStudentDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showStudentDropdown && selectedMentor && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-20 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                    <div className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/70">
                      <p className="text-xs text-slate-400">
                        Students assigned to {selectedMentor}
                      </p>
                    </div>

                    <div className="max-h-44 overflow-y-auto p-1.5">
                      {availableStudents.length > 0 ? (
                        availableStudents.map((student) => {
                          const isSelected =
                            selectedStudents.includes(student);

                          return (
                            <button
                              key={student}
                              type="button"
                              onClick={() => toggleStudent(student)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition ${
                                isSelected
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <span>{student}</span>

                              {isSelected && (
                                <span className="text-xs font-medium">
                                  Selected
                                </span>
                              )}
                            </button>
                          );
                        })
                      ) : (
                        <p className="px-3 py-3 text-sm text-slate-400">
                          No students assigned to this mentor.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PROJECT DURATION */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                <CalendarDays size={15} />
              </div>

              <h3 className="text-sm font-semibold text-slate-800">
                Project Duration
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* START DATE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Start Date
                </label>

                <input
                  type="date"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                />
              </div>

              {/* END DATE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  End Date
                </label>

                <input
                  type="date"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                />
              </div>
            </div>
          </div>

          {/* TECHNICAL STACK */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <Code2 size={15} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Technical Stack
                </h3>

                <p className="text-xs text-slate-400 mt-0.5">
                  Add technologies used in this project
                </p>
              </div>
            </div>

            <div className="min-h-[48px] flex flex-wrap items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium"
                >
                  {technology}

                  <X
                    size={13}
                    className="cursor-pointer hover:text-blue-800"
                    onClick={() => removeTechnology(technology)}
                  />
                </span>
              ))}

              <input
                type="text"
                value={technologyInput}
                onChange={(event) =>
                  setTechnologyInput(event.target.value)
                }
                onKeyDown={handleTechnologyKeyDown}
                onBlur={addTechnology}
                placeholder={
                  technologies.length === 0
                    ? "Type a technology and press Enter..."
                    : "Add another technology..."
                }
                className="flex-1 min-w-[180px] outline-none text-sm text-slate-700 placeholder:text-slate-400 py-1"
              />

              <button
                type="button"
                onClick={addTechnology}
                className="w-7 h-7 flex-shrink-0 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition"
                title="Add technology"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/60">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 shadow-sm hover:shadow-md transition"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;