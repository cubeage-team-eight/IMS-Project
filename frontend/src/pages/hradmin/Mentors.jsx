
import React, { useEffect, useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { hrService } from "../../services/hr.service";

const initialState = {
  name: "",
  email: "",
  password: "",
  mobile: "",
  empId: "",
  branch: "",
  role: "",
};

const FieldLabel = ({ children }) => (
  <label className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-400 uppercase mb-2">
    {children}
  </label>
);

const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition";

function MentorRegistrationForm({
  onSubmit,
  submitting,
  formError,
}) {
  const [form, setForm] = useState(initialState);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleClear = () => setForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <div className="w-full mt-4 mx-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 p-5 sm:p-8">
      <div>
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
                value={form.name}
                onChange={handleChange("name")}
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
                minLength={8}
                required
                className={inputClasses}
              />

              {form.password.length > 0 && form.password.length < 8 && (
                <p className="mt-1 text-sm text-red-500">
                  Password must be at least 8 characters long.
                </p>
              )}
            </div>

            <div>
              <FieldLabel>Mobile Number</FieldLabel>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={form.mobile}
                onChange={handleChange("mobile")}
                className={inputClasses}
              />
            </div>

            <div>
              <FieldLabel>Employee Id</FieldLabel>
              <input
                type="text"
                placeholder="EMP-0001"
                value={form.empId}
                onChange={handleChange("empId")}
                className={inputClasses}
              />
            </div>

            <div>
              <FieldLabel>Role / Designation</FieldLabel>
              <input
                list="designation-options"
                value={form.role}
                onChange={handleChange("role")}
                className={inputClasses}
                placeholder="Select or type designation"
                autoComplete="off"
                required
              />

              <datalist id="designation-options">
                <option value="Technical Mentor" />
                <option value="Senior Engineer" />
                <option value="Software Developer" />
                <option value="Team Lead" />
                <option value="Project Manager" />
                <option value="Full Stack Developer" />
                <option value="Frontend Developer" />
                <option value="Backend Developer" />
                <option value="AI/ML Engineer" />
              </datalist>
            </div>

            <div>
              <FieldLabel>Branch / Department</FieldLabel>
              <input
                type="text"
                placeholder="IT"
                value={form.branch}
                onChange={handleChange("branch")}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500/90 active:bg-blue-600 transition disabled:opacity-50"
            >
              {submitting ? "Registering..." : "Register Mentor"}
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
    </div>
  );
}

function MentorCards({
  mentor,
  onDelete,
  deleting,
}) {
  const name = `${mentor.firstName || ""} ${mentor.lastName || ""}`.trim();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 w-full flex items-start justify-between gap-3 border border-slate-100">
      <div className="flex items-start gap-4 min-w-0">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
          <span className="text-blue-500 font-semibold text-sm">
            {mentor.firstName?.charAt(0).toUpperCase() || "?"}
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="text-slate-900 font-semibold text-base leading-tight break-words">
            {name}
          </h3>

          <p className="text-slate-500 text-sm mt-0.5">
            {mentor.designation || "—"}
          </p>

          <p className="text-slate-300 text-xs font-medium tracking-wide mt-1">
            {mentor.employeeId || "—"}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        <div className="text-right">
          <div className="text-blue-600 font-bold text-2xl leading-none">
            —
          </div>
          <div className="text-slate-400 text-xs mt-1">Interns</div>
        </div>

        <button
          type="button"
          onClick={() => onDelete(mentor)}
          disabled={deleting}
          title="Delete Mentor"
          className="flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition disabled:opacity-50"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}

function MentorList({ mentors, onDelete, deletingId }) {
  if (mentors.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <p className="text-slate-600 font-medium">No mentors found</p>
        <p className="text-slate-400 text-sm mt-1">
          Click Add Mentor to register a new mentor.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
      {mentors.map((mentor) => (
        <MentorCards
          key={mentor.id}
          mentor={mentor}
          onDelete={onDelete}
          deleting={deletingId === mentor.id}
        />
      ))}
    </div>
  );
}

function Mentors() {
  const [isOpen, setIsOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await hrService.getAllMentors();
      setMentors(res.data || []);
      setError("");
    } catch (err) {
      console.error("Load mentors error:", err);
      setError("Failed to load mentors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setFormError("");
  };

  const handleRegister = async (formData) => {
    setFormError("");

    if (!formData.name || !formData.email || !formData.password) {
      setFormError("Name, email and password are required");
      return;
    }

    if (formData.password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return;
    }

    setSubmitting(true);

    const nameParts = formData.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    try {
      await hrService.createMentor({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        firstName,
        lastName,
        phone: formData.mobile,
        employeeId: formData.empId,
        designation: formData.role,
        department: formData.branch,
      });

      closeModal();
      await fetchMentors();
    } catch (err) {
      console.error("Create mentor error:", err);
      setFormError(
        err.response?.data?.message ||
          err.message ||
          "Failed to register mentor"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMentor = async () => {
    if (!selectedMentor) return;

    try {
      setDeletingId(selectedMentor.id);
      setDeleteError("");

      await hrService.deleteMentor(selectedMentor.id);

      setMentors((prev) =>
        prev.filter((mentor) => mentor.id !== selectedMentor.id)
      );

      setSelectedMentor(null);
    } catch (err) {
      console.error("Delete mentor error:", err);
      setDeleteError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete mentor"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading mentors...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="sm:p-6 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Mentor Management</h1>
          <p className="text-slate-400">
            Manage employee mentors and their intern assignments
          </p>
        </div>

        <button
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          + Add Mentor
        </button>
      </div>

      <MentorList
        mentors={mentors}
        onDelete={(mentor) => {
          setDeleteError("");
          setSelectedMentor(mentor);
        }}
        deletingId={deletingId}
      />

      {/* Add Mentor Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-4 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-6 top-2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 z-10"
            >
              <X size={14} />
            </button>

            <MentorRegistrationForm
              onSubmit={handleRegister}
              submitting={submitting}
              formError={formError}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {selectedMentor && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={() => {
            if (!deletingId) {
              setSelectedMentor(null);
              setDeleteError("");
            }
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertTriangle size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Delete Mentor?
                </h2>
                <p className="text-xs text-slate-400">
                  Permanent deletion
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-600">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-slate-900">
                {selectedMentor.firstName} {selectedMentor.lastName || ""}
              </span>
              ? Their mentor account and related assignments will also be
              deleted. This action cannot be undone.
            </p>

            {deleteError && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                disabled={!!deletingId}
                onClick={() => {
                  setSelectedMentor(null);
                  setDeleteError("");
                }}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!!deletingId}
                onClick={handleDeleteMentor}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                <Trash2 size={15} />
                {deletingId ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mentors;
