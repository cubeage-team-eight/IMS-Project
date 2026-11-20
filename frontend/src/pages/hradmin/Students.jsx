import React, { useEffect, useState } from 'react';
import { hrService } from '../../services/hr.service';

const initialState = {
  fullName: "",
  email: "",
  password: "",
  mobile: "",
  rollNumber: "",
  collegeId: "",
  branch: "",
  course: "",
  batchId: "",
  mentorId: "",
  projectId: "",
  joiningDate: "",
};

const FieldLabel = ({ children }) => (
  <label className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-400 uppercase mb-2">
    {children}
  </label>
);

const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition";

function StudentRegistrationForm({
  onSubmit,
  colleges,
  batches,
  mentors,
  projects,
  submitting,
  formError,
}) {
  const [form, setForm] = useState(initialState);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleClear = () => setForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form, () => setForm(initialState));
  };

  return (
    <div className="w-full mx-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 p-5 sm:p-8">
      <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-6">
        Registration Form
      </h2>

      {formError && (
        <p className="text-red-500 text-sm mb-4">{formError}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <FieldLabel>Full Name</FieldLabel>
            <input
              type="text"
              placeholder="e.g. Aditi Verma"
              value={form.fullName}
              onChange={handleChange("fullName")}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <FieldLabel>Email Address</FieldLabel>
            <input
              type="email"
              placeholder="aditi@college.edu"
              value={form.email}
              onChange={handleChange("email")}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <FieldLabel>Password</FieldLabel>
            <input
              type="password"
              placeholder="Set initial password"
              value={form.password}
              onChange={handleChange("password")}
              className={inputClasses}
              minLength={8}
              required
            />
          </div>

          <div>
            <FieldLabel>Mobile Number</FieldLabel>
            <input
              type="tel"
              placeholder="9876543210"
              value={form.mobile}
              onChange={handleChange("mobile")}
              className={inputClasses}
            />
          </div>

          <div>
            <FieldLabel>Roll Number(Optional)</FieldLabel>
            <input
              type="text"
              placeholder="CS2021001"
              value={form.rollNumber}
              onChange={handleChange("rollNumber")}
              className={inputClasses}
            />
          </div>

          <div>
            <FieldLabel>College</FieldLabel>
            <select
              value={form.collegeId}
              onChange={handleChange("collegeId")}
              className={`${inputClasses} appearance-none text-slate-700`}
              required
            >
              <option value="">Select college</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel>Branch / Department</FieldLabel>
            <input
              type="text"
              placeholder="Computer Science"
              value={form.branch}
              onChange={handleChange("branch")}
              className={inputClasses}
            />
          </div>

          <div>
            <FieldLabel>Course</FieldLabel>
            <input
              type="text"
              placeholder="B.Tech / MCA"
              value={form.course}
              onChange={handleChange("course")}
              className={inputClasses}
            />
          </div>

          <div>
            <FieldLabel>Internship Batch (optional)</FieldLabel>
            <select
              value={form.batchId}
              onChange={handleChange("batchId")}
              className={`${inputClasses} appearance-none text-slate-700`}
            >
              <option value="">No batch</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel>Assign Mentor (optional)</FieldLabel>
            <select
              value={form.mentorId}
              onChange={handleChange("mentorId")}
              className={`${inputClasses} appearance-none text-slate-700`}
            >
              <option value="">No mentor</option>
              {mentors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.firstName} {m.lastName || ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel>Assign Project (optional)</FieldLabel>
            <select
              value={form.projectId}
              onChange={handleChange("projectId")}
              className={`${inputClasses} appearance-none text-slate-700`}
            >
              <option value="">No project</option>

              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name || p.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel>Joining Date</FieldLabel>
            <input
              type="date"
              value={form.joiningDate}
              onChange={handleChange("joiningDate")}
              className={`${inputClasses} text-slate-700`}
            />
          </div>
        </div>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500/90 active:bg-blue-600 transition disabled:opacity-50"
          >
            {submitting ? "Registering..." : "Register"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="w-full sm:w-auto rounded-lg bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200 transition"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}

function Students() {
  const [colleges, setColleges] = useState([]);
  const [batches, setBatches] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        collegesRes,
        batchesRes,
        mentorsRes,
        projectsRes,
      ] = await Promise.all([
        hrService.getAllColleges(),
        hrService.getAllBatches(),
        hrService.getAllMentors(),
        hrService.getAllProjects(),
      ]);

      setColleges(collegesRes.data || []);
      setBatches(batchesRes.data || []);
      setMentors(mentorsRes.data || []);

      // Handle projects response
      const projectsData = Array.isArray(projectsRes)
        ? projectsRes
        : Array.isArray(projectsRes?.data)
          ? projectsRes.data
          : Array.isArray(projectsRes?.data?.data)
            ? projectsRes.data.data
            : [];

      setProjects(projectsData);

    } catch (err) {
      console.error("Load data error:", err);
      setError("Failed to load colleges/batches/mentors/projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRegister = async (form, resetForm) => {
    setFormError("");
    setSuccessMsg("");

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.collegeId
    ) {
      setFormError(
        "Full name, email, password and college are required"
      );
      return;
    }

    if (form.password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return;
    }

    setSubmitting(true);

    const nameParts = form.fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    try {
      const res = await hrService.createStudent({
        firstName,
        lastName,
        email: form.email.trim(),
        password: form.password,
        phone: form.mobile,
        collegeId: form.collegeId,
        enrollmentNumber: form.rollNumber.trim() || null,
        course: form.course,
        branch: form.branch,
        joiningDate: form.joiningDate || null,
      });

      const newStudent = res.data?.data || res.data;

      if (form.batchId && newStudent?.id) {
        await hrService.assignStudentToBatch(
          form.batchId,
          newStudent.id
        );
      }

      if (form.mentorId && newStudent?.id) {
        await hrService.assignStudentToMentor(
          form.mentorId,
          newStudent.id
        );
      }

      setSuccessMsg("Student registered successfully!");
      resetForm();

    } catch (err) {
      console.error(
        "Create student error:",
        err.response?.data || err
      );

      setFormError(
        err.response?.data?.message ||
        err.message ||
        "Failed to register student"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="sm:p-6 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h1 className="text-xl font-medium">Registration</h1>
      </div>

      {successMsg && (
        <p className="text-emerald-600 text-sm mt-4">{successMsg}</p>
      )}

      <div className="mt-6">
        <StudentRegistrationForm
          onSubmit={handleRegister}
          colleges={colleges}
          batches={batches}
          mentors={mentors}
          projects={projects}
          submitting={submitting}
          formError={formError}
        />
      </div>
    </div>
  );
}

export default Students;
