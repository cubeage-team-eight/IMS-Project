import React, { useEffect, useState } from "react";
import {
  X,
  Save,
  Plus,
  Trash2,
  Users,
  UserRound,
  CalendarDays,
  Code,
  FolderKanban,
  Loader2,
} from "lucide-react";
import { hrService } from "../../../services/hr.service";

const getData = (response) => response?.data?.data ?? response?.data ?? response ?? [];

const getDateValue = (value) => {
  if (!value) return "";
  return String(value).slice(0, 10);
};

const getFullName = (person) =>
  `${person?.firstName || ""} ${person?.lastName || ""}`.trim();

function EditProject({ project, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    type: project?.type || "web",
    status: project?.status || "PLANNED",
    startDate: getDateValue(project?.startDate),
    endDate: getDateValue(project?.endDate),
  });

  const [technologies, setTechnologies] = useState(
    project?.technology
      ? project.technology.split(",").map((item) => item.trim()).filter(Boolean)
      : []
  );

  const [newTechnology, setNewTechnology] = useState("");
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState(
    (project?.students || []).map((student) => student.id)
  );
  const [selectedMentorIds, setSelectedMentorIds] = useState(
    (project?.mentors || []).map((mentor) => mentor.id)
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [studentResponse, mentorResponse] = await Promise.all([
          hrService.getAllStudents(),
          hrService.getAllMentors(),
        ]);

        const allStudents = getData(studentResponse);
        const allMentors = getData(mentorResponse);

        setStudents(Array.isArray(allStudents) ? allStudents : []);
        setMentors(Array.isArray(allMentors) ? allMentors : []);

        let studentOptions = Array.isArray(allStudents) ? allStudents : [];

        // Batch project asel tar fakt tyach batch madhil students dakhva.
        if (project?.batchId) {
          const batchResponse = await hrService.getBatchById(project.batchId);
          const batch = getData(batchResponse);

          const batchStudents = (batch?.batchStudents || [])
            .map((item) => item.student)
            .filter(Boolean);

          const batchStudentIds = new Set(
            batchStudents.map((student) => student.id)
          );

          // Existing assigned students pan list madhye preserve kara.
          const existingStudents = project?.students || [];

          studentOptions = [
            ...batchStudents,
            ...existingStudents.filter(
              (student) => !batchStudentIds.has(student.id)
            ),
          ];
        }

        setAvailableStudents(studentOptions);
      } catch (err) {
        console.error("Edit project load error:", err);
        setError(
          err.response?.data?.message || "Failed to load students and mentors."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [project]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTechnology = () => {
    const value = newTechnology.trim();

    if (!value) return;

    const alreadyExists = technologies.some(
      (item) => item.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      setNewTechnology("");
      return;
    }

    setTechnologies((prev) => [...prev, value]);
    setNewTechnology("");
  };

  const removeTechnology = (technology) => {
    setTechnologies((prev) => prev.filter((item) => item !== technology));
  };

  const toggleStudent = (studentId) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleMentor = (mentorId) => {
    setSelectedMentorIds((prev) =>
      prev.includes(mentorId)
        ? prev.filter((id) => id !== mentorId)
        : [...prev, mentorId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Project title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Project description is required.");
      return;
    }

    if (!technologies.length) {
      setError("Please add at least one technology.");
      return;
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      setError("End date cannot be earlier than start date.");
      return;
    }

    try {
      setSaving(true);

      // Step 1: Update project details.
      await hrService.updateProject(project.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        technology: technologies.join(", "),
        type: formData.type,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate,
        batchId: project.batchId || null,
      });

      // Step 2: Existing and newly selected student IDs compare kara.
      const currentStudentIds = (project.students || []).map(
        (student) => student.id
      );

      const studentsToAdd = selectedStudentIds.filter(
        (id) => !currentStudentIds.includes(id)
      );

      const studentsToRemove = currentStudentIds.filter(
        (id) => !selectedStudentIds.includes(id)
      );

      if (studentsToAdd.length) {
        await hrService.assignToProject(project.id, studentsToAdd, []);
      }

      if (studentsToRemove.length) {
        await hrService.unassignFromProject(project.id, studentsToRemove, []);
      }

      // Step 3: Existing and newly selected mentor IDs compare kara.
      const currentMentorIds = (project.mentors || []).map(
        (mentor) => mentor.id
      );

      const mentorsToAdd = selectedMentorIds.filter(
        (id) => !currentMentorIds.includes(id)
      );

      const mentorsToRemove = currentMentorIds.filter(
        (id) => !selectedMentorIds.includes(id)
      );

      if (mentorsToAdd.length) {
        await hrService.assignToProject(project.id, [], mentorsToAdd);
      }

      if (mentorsToRemove.length) {
        await hrService.unassignFromProject(project.id, [], mentorsToRemove);
      }

      if (onUpdated) {
        await onUpdated();
      }

      onClose();
    } catch (err) {
      console.error("Update project error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update project."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-3 sm:p-5">
      <div className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Edit Project
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update project details and assignments
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-white hover:text-red-500"
          >
            <X size={21} />
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-slate-500">
            <Loader2 className="animate-spin" size={22} />
            Loading project information...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto px-5 py-6 sm:px-7"
          >
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Basic Details */}
            <div className="mb-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
                <FolderKanban size={18} className="text-blue-600" />
                Basic Project Details
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Project Title *
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter project title"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter project description"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Project Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile Application</option>
                    <option value="desktop">Desktop Application</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Project Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="PLANNED">Planned</option>
                    <option value="ACTIVE">Active</option>
                    <option value="ON_HOLD">On Hold</option>
                    <option value="COMPLETED">Completed</option>
                    {formData.status === "CANCELLED" && (
                      <option value="CANCELLED">Cancelled</option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6 border-t border-slate-100 pt-6">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
                <Code size={18} className="text-blue-600" />
                Technical Stack
              </h3>

              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                  >
                    {technology}
                    <button
                      type="button"
                      onClick={() => removeTechnology(technology)}
                      className="text-blue-500 hover:text-red-500"
                      aria-label={`Remove ${technology}`}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}

                {technologies.length === 0 && (
                  <p className="text-sm text-slate-400">
                    No technologies added yet.
                  </p>
                )}
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  value={newTechnology}
                  onChange={(event) => setNewTechnology(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addTechnology();
                    }
                  }}
                  placeholder="Add technology (e.g. React, Node.js)"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                />

                <button
                  type="button"
                  onClick={addTechnology}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Plus size={17} />
                  Add
                </button>
              </div>
            </div>

            {/* Dates */}
            <div className="mb-6 border-t border-slate-100 pt-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
                <CalendarDays size={18} className="text-blue-600" />
                Project Timeline
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    min={formData.startDate || undefined}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>
            </div>

            {/* Batch Information */}
            {project?.batchId && (
              <div className="mb-6 border-t border-slate-100 pt-6">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-slate-800">
                  <Users size={18} className="text-blue-600" />
                  Batch
                </h3>
                <p className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                  Existing batch assignment will be preserved while editing
                  this project.
                </p>
              </div>
            )}

            {/* Mentor Assignment */}
            <div className="mb-6 border-t border-slate-100 pt-6">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
                <UserRound size={18} className="text-blue-600" />
                Assign Mentors
              </h3>

              {mentors.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No mentors available.
                </p>
              ) : (
                <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto rounded-xl border border-slate-100 p-3 sm:grid-cols-2">
                  {mentors.map((mentor) => (
                    <label
                      key={mentor.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-blue-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMentorIds.includes(mentor.id)}
                        onChange={() => toggleMentor(mentor.id)}
                        className="h-4 w-4 accent-blue-600"
                      />
                      <span className="text-sm text-slate-700">
                        {getFullName(mentor) || mentor.email}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Student Assignment */}
            <div className="mb-6 border-t border-slate-100 pt-6">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
                <Users size={18} className="text-blue-600" />
                Assign Students
                <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {selectedStudentIds.length} Selected
                </span>
              </h3>

              {availableStudents.length === 0 ? (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                  No students available for this project.
                </p>
              ) : (
                <div className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto rounded-xl border border-slate-100 p-3 sm:grid-cols-2">
                  {availableStudents.map((student) => (
                    <label
                      key={student.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-blue-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudentIds.includes(student.id)}
                        onChange={() => toggleStudent(student.id)}
                        className="h-4 w-4 accent-blue-600"
                      />

                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-700">
                          {getFullName(student) || student.email}
                        </span>
                        {student.email && (
                          <span className="block truncate text-xs text-slate-400">
                            {student.email}
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving || loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditProject;