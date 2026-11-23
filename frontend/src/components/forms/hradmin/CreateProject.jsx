
import React, { useState, useEffect, useRef } from "react";
import {
  UsersRound,
  Code2,
  X,
  FileText,
  FolderKanban,
  Plus,
  CalendarDays,
  ChevronDown,
  Search,
  Check,
} from "lucide-react";
import { hrService } from "../../../services/hr.service";

const statusOptions = [
  { value: "PLANNED", label: "Planned" },
  { value: "ACTIVE", label: "Active" },
  { value: "ON_HOLD", label: "On Hold" },
  { value: "COMPLETED", label: "Completed" },
];

function CreateProject({ onClose, onCreated }) {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [batchStudents, setBatchStudents] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchError, setBatchError] = useState("");

  const [selectedBatchId, setSelectedBatchId] = useState("");
  const batchRequestRef = useRef(0);
  const studentDropdownRef = useRef(null);

  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    type: "web",
    status: "PLANNED",
    description: "",
    startDate: "",
    endDate: "",
    mentorId: "",
  });

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [technologyInput, setTechnologyInput] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);

        const [mentorsRes, studentsRes, batchesRes] = await Promise.all([
          hrService.getAllMentors(),
          hrService.getAllStudents(),
          hrService.getAllBatches(),
        ]);

        setMentors(mentorsRes.data || []);
        setStudents(studentsRes.data || []);
        setBatches(batchesRes.data || []);
      } catch (err) {
        console.error("Load project assignment data error:", err);
        setError("Failed to load mentors, students and batches.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  // Dropdown baher click kelyavar close kara.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        studentDropdownRef.current &&
        !studentDropdownRef.current.contains(event.target)
      ) {
        setStudentDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const toggleStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleBatchChange = async (event) => {
    const batchId = event.target.value;
    const requestId = ++batchRequestRef.current;

    setSelectedBatchId(batchId);
    setSelectedStudents([]);
    setBatchStudents([]);
    setBatchError("");
    setError("");
    setStudentSearch("");
    setStudentDropdownOpen(false);

    setForm((prev) => ({
      ...prev,
      mentorId: "",
    }));

    if (!batchId) {
      setBatchLoading(false);
      return;
    }

    try {
      setBatchLoading(true);

      const response = await hrService.getBatchById(batchId);

      if (requestId !== batchRequestRef.current) return;

      const batch =
        response.data?.data ||
        response.data?.batch ||
        response.data;

      const mentorId = batch?.mentor?.id || batch?.mentorId || "";

      const assignedStudents = Array.isArray(batch?.batchStudents)
        ? batch.batchStudents
            .map((item) => item.student)
            .filter((student) => student && student.id)
        : [];

      setBatchStudents(assignedStudents);

      setForm((prev) => ({
        ...prev,
        mentorId,
      }));

      if (!mentorId) {
        setBatchError("This batch does not have an assigned mentor.");
      }
    } catch (err) {
      if (requestId !== batchRequestRef.current) return;

      console.error("Fetch batch details error:", err);
      setBatchError(
        err.response?.data?.message || "Failed to load batch details."
      );
    } finally {
      if (requestId === batchRequestRef.current) {
        setBatchLoading(false);
      }
    }
  };

  const addTechnology = () => {
    const value = technologyInput.trim();

    if (!value) return;

    if (!technologies.some((item) => item.toLowerCase() === value.toLowerCase())) {
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

  const displayStudents = selectedBatchId ? batchStudents : students;

  const filteredStudents = displayStudents.filter((student) => {
    const name = `${student.firstName || ""} ${student.lastName || ""}`;
    const email = student.email || "";
    const search = studentSearch.trim().toLowerCase();

    return (
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search)
    );
  });

  const selectedStudentDetails = displayStudents.filter((student) =>
    selectedStudents.includes(student.id)
  );

  const handleSubmit = async () => {
    setError("");

    if (!form.title.trim()) {
      setError("Project name is required.");
      return;
    }

    if (batchLoading) {
      setError("Please wait until batch details are loaded.");
      return;
    }

    if (selectedBatchId && batchError && batchStudents.length === 0) {
      setError("Unable to load the selected batch students. Please try again.");
      return;
    }

    const mentorIds = form.mentorId ? [form.mentorId] : [];

    setSubmitting(true);

    try {
      await hrService.createProject({
        title: form.title.trim(),
        description: form.description,
        technology: technologies.join(", "),
        type: form.type,
        status: form.status,
        startDate: form.startDate || null,
        endDate: form.endDate || null,

        batchId: selectedBatchId || null,
        students: selectedStudents,
        mentors: mentorIds,
      });

      onCreated?.();
      onClose();
    } catch (err) {
      console.error("Create project error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create project."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        `}
      </style>

      <div
        className="hide-scrollbar max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-purple-50 px-6 py-5">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100/40" />
          <div className="absolute -bottom-12 right-16 h-24 w-24 rounded-full bg-purple-100/40" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-500 shadow-sm">
                <FolderKanban size={23} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Create Project
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add a new internship project
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white hover:text-slate-600"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-7 p-6">
          {error && (
            <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-500">
              {error}
            </p>
          )}

          {/* PROJECT INFORMATION */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                <FolderKanban size={15} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Project Information
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Project Name
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={set("title")}
                  placeholder="Enter project name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Project Type
                </label>
                <select
                  value={form.type}
                  onChange={set("type")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile Application</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Project Status
                </label>
                <select
                  value={form.status}
                  onChange={set("status")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                >
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Project Description
                </label>
                <div className="relative">
                  <FileText
                    size={17}
                    className="absolute left-3.5 top-3 text-slate-400"
                  />
                  <textarea
                    rows="3"
                    value={form.description}
                    onChange={set("description")}
                    placeholder="Briefly describe the project..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT ASSIGNMENT */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
                <UsersRound size={15} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Project Assignment
              </h3>
            </div>

            {loadingData ? (
              <p className="text-sm text-slate-400">
                Loading mentors, students and batches...
              </p>
            ) : (
              <div className="space-y-4">
                {/* BATCH DROPDOWN */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Select Batch{" "}
                    <span className="font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <p className="mb-2 text-xs text-slate-500">
                    Choose a batch or continue without batch
                  </p>

                  <select
                    value={selectedBatchId}
                    onChange={handleBatchChange}
                    disabled={batchLoading}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-50"
                  >
                    <option value="">All Students (No Batch)</option>

                    {batches.map((batch) => (
                      <option key={batch.id} value={batch.id}>
                        {batch.name}
                        {batch.designation ? ` - ${batch.designation}` : ""}
                      </option>
                    ))}
                  </select>

                  {batchLoading && (
                    <p className="mt-2 text-xs text-blue-500">
                      Loading selected batch details...
                    </p>
                  )}

                  {batchError && (
                    <p className="mt-2 text-xs text-amber-600">
                      {batchError}
                    </p>
                  )}

                  {selectedBatchId && !batchLoading && (
                    <p className="mt-2 text-xs text-blue-600">
                      Only students belonging to this batch will be available.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* MENTOR */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Assign Mentor
                    </label>

                    <select
                      value={form.mentorId}
                      onChange={set("mentorId")}
                      disabled={Boolean(selectedBatchId)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-100 disabled:text-slate-500"
                    >
                      <option value="">
                        {selectedBatchId
                          ? "No mentor assigned to batch"
                          : "No mentor"}
                      </option>

                      {!selectedBatchId &&
                        mentors.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.firstName} {m.lastName || ""}
                          </option>
                        ))}

                      {selectedBatchId &&
                        form.mentorId &&
                        mentors
                          .filter((m) => m.id === form.mentorId)
                          .map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.firstName} {m.lastName || ""}
                            </option>
                          ))}
                    </select>

                    {selectedBatchId && form.mentorId && (
                      <p className="mt-2 text-xs text-green-600">
                        Batch mentor selected automatically.
                      </p>
                    )}
                  </div>

                  {/* STUDENT MULTI-SELECT DROPDOWN */}
                  <div ref={studentDropdownRef} className="relative">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Assign Students
                    </label>

                    <button
                      type="button"
                      onClick={() => setStudentDropdownOpen((prev) => !prev)}
                      disabled={batchLoading || displayStudents.length === 0}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-sm text-slate-600 outline-none transition hover:border-blue-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50"
                    >
                      <span className="truncate">
                        {selectedStudents.length === 0
                          ? "Select Students"
                          : `${selectedStudents.length} Students Selected`}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 text-slate-400 transition-transform ${
                          studentDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* DROPDOWN PANEL */}
                    {studentDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                        {/* SEARCH */}
                        <div className="border-b border-slate-100 p-3">
                          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 focus-within:border-blue-400">
                            <Search size={16} className="text-slate-400" />
                            <input
                              type="text"
                              value={studentSearch}
                              onChange={(event) =>
                                setStudentSearch(event.target.value)
                              }
                              placeholder="Search student name or email..."
                              className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                            />
                            {studentSearch && (
                              <button
                                type="button"
                                onClick={() => setStudentSearch("")}
                                className="text-slate-400 hover:text-slate-700"
                              >
                                <X size={15} />
                              </button>
                            )}
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                              {filteredStudents.length} students found
                            </span>

                            <button
                              type="button"
                              onClick={() => setSelectedStudents([])}
                              className="text-xs font-medium text-blue-600 hover:text-blue-800"
                            >
                              Clear selection
                            </button>
                          </div>
                        </div>

                        {/* STUDENT LIST */}
                        <div className="max-h-56 overflow-y-auto p-2">
                          {filteredStudents.length === 0 ? (
                            <p className="px-3 py-5 text-center text-sm text-slate-400">
                              No students found.
                            </p>
                          ) : (
                            filteredStudents.map((student) => {
                              const isSelected = selectedStudents.includes(
                                student.id
                              );

                              const name =
                                `${student.firstName || ""} ${student.lastName || ""}`.trim();

                              return (
                                <label
                                  key={student.id}
                                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                                    isSelected
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-slate-600 hover:bg-slate-50"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleStudent(student.id)}
                                    className="h-4 w-4 accent-blue-600"
                                  />

                                  <span className="min-w-0 flex-1">
                                    <span className="block truncate font-medium">
                                      {name || student.email}
                                    </span>
                                    {student.email && (
                                      <span className="block truncate text-xs text-slate-400">
                                        {student.email}
                                      </span>
                                    )}
                                  </span>

                                  {isSelected && (
                                    <Check
                                      size={16}
                                      className="flex-shrink-0 text-blue-600"
                                    />
                                  )}
                                </label>
                              );
                            })
                          )}
                        </div>

                        {/* DROPDOWN FOOTER */}
                        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-3 py-2.5">
                          <span className="text-xs font-medium text-slate-600">
                            {selectedStudents.length} selected
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setStudentDropdownOpen(false);
                              setStudentSearch("");
                            }}
                            className="rounded-lg bg-blue-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-600"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}

                    {/* SELECTED STUDENTS PREVIEW */}
                    {selectedStudentDetails.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {selectedStudentDetails.slice(0, 3).map((student) => (
                          <span
                            key={student.id}
                            className="inline-flex max-w-full items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs text-blue-700"
                          >
                            <span className="max-w-28 truncate">
                              {student.firstName} {student.lastName || ""}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleStudent(student.id)}
                              className="flex-shrink-0 hover:text-red-500"
                              aria-label="Remove student"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}

                        {selectedStudentDetails.length > 3 && (
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            +{selectedStudentDetails.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PROJECT DURATION */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <CalendarDays size={15} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Project Duration
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={set("startDate")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  End Date
                </label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={set("endDate")}
                  min={form.startDate || undefined}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>
          </div>

          {/* TECHNICAL STACK */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                <Code2 size={15} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Technical Stack
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Add technologies used in this project
                </p>
              </div>
            </div>

            <div className="flex min-h-[48px] flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-600"
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
                className="min-w-[180px] flex-1 py-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={addTechnology}
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500 transition hover:bg-blue-100"
                title="Add technology"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || loadingData || batchLoading}
            className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-600 hover:shadow-md disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
