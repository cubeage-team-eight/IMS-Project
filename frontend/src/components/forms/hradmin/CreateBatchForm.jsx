
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { hrService } from "../../../services/hr.service.js";

const initialState = {
  title: "",
  startDate: "",
  endDate: "",
  mentor: "",
  capacity: "",
};

const designations = [
  "MERN Stack Development",
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "AI/ML",
  "Data Science",
  "Data Analytics",
  "Java Development",
  "Python Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Generative AI Development",
  "Software Testing",
  "Database Development",
  "Blockchain Development",
  "Web Development",
];

const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40";

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}

function CreateBatchForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [mentors, setMentors] = useState([]);
  const [mentorError, setMentorError] = useState("");

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const response = await hrService.getAllMentors();
        setMentors(
          Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response)
              ? response
              : []
        );
      } catch (error) {
        console.error("Failed to load mentors:", error);
        setMentorError("Unable to load mentors. Please try again.");
      }
    };

    loadMentors();
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const designation = form.title.trim();

    if (!designation) {
      alert("Please select or enter an internship designation.");
      return;
    }

    if (!form.mentor) {
      alert("Please select a mentor.");
      return;
    }

    if (form.endDate < form.startDate) {
      alert("End date cannot be earlier than start date.");
      return;
    }

    onSubmit({
      ...form,
      title: designation,
      mentorId: form.mentor,
      capacity: Number(form.capacity),
    });

    setForm({ ...initialState });
  };

  const handleClear = () => {
    setForm({ ...initialState });
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Create Batch
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter the internship batch details below.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          aria-label="Close create batch form"
          className="rounded-md p-2 text-slate-400 hover:bg-slate-100"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Internship Designation">
          <input
            required
            type="text"
            list="internship-designations"
            placeholder="Select or type designation"
            value={form.title}
            onChange={handleChange("title")}
            className={inputClasses}
          />
          <datalist id="internship-designations">
            {designations.map((designation) => (
              <option key={designation} value={designation} />
            ))}
          </datalist>
        </Field>

        <Field label="Mentor">
          <select
            required
            value={form.mentor}
            onChange={handleChange("mentor")}
            className={inputClasses}
          >
            <option value="">Select mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor.id} value={mentor.id}>
                {`${mentor.firstName || ""} ${mentor.lastName || ""}`.trim() ||
                  mentor.email}
              </option>
            ))}
          </select>
          {mentorError && (
            <p className="mt-1 text-sm text-red-600">{mentorError}</p>
          )}
        </Field>

        <Field label="Start Date">
          <input
            required
            type="date"
            value={form.startDate}
            onChange={handleChange("startDate")}
            className={inputClasses}
          />
        </Field>

        <Field label="End Date">
          <input
            required
            type="date"
            min={form.startDate || undefined}
            value={form.endDate}
            onChange={handleChange("endDate")}
            className={inputClasses}
          />
        </Field>

        <Field label="Capacity">
          <input
            required
            type="number"
            min="1"
            step="1"
            placeholder="Number of interns"
            value={form.capacity}
            onChange={handleChange("capacity")}
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Create Batch
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
        >
          Clear Form
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateBatchForm;
