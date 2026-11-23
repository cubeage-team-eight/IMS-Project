
import React, { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { hrService } from "../../services/hr.service";

// Status Badge
function StatusBadge({ isActive }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
        isActive
          ? "bg-emerald-100 text-emerald-700"
          : "bg-rose-100 text-rose-600"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

const initialState = {
  name: "",
  code: "",
  location: "",
  contact: "",
  status: "Active",
};

const FieldLabel = ({ children }) => (
  <label className="mb-2 block text-[11px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
    {children}
  </label>
);

const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition";

// Add / Edit College Form
function AddCollegeForm({
  onSubmit,
  onDelete,
  submitting,
  formError,
  editingCollege,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingCollege) {
      setForm({
        name: editingCollege.name || "",
        code: editingCollege.code || "",
        location: editingCollege.address || "",
        contact: editingCollege.contactPerson || "",
        status: editingCollege.isActive ? "Active" : "Inactive",
      });
    } else {
      setForm(initialState);
    }
  }, [editingCollege]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleClear = () => setForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-8">
      {formError && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-500">
          {formError}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <FieldLabel>College Name</FieldLabel>
            <input
              type="text"
              placeholder="Name of College"
              value={form.name}
              onChange={handleChange("name")}
              className={inputClasses}
            />
          </div>

          <div>
            <FieldLabel>Code</FieldLabel>
            <input
              type="text"
              placeholder="Enter College Code"
              value={form.code}
              onChange={handleChange("code")}
              className={inputClasses}
            />
          </div>

          <div>
            <FieldLabel>Location</FieldLabel>
            <input
              type="text"
              placeholder="Enter location"
              value={form.location}
              onChange={handleChange("location")}
              className={inputClasses}
            />
          </div>

          <div>
            <FieldLabel>Contact Person</FieldLabel>
            <input
              type="text"
              placeholder="Contact Person"
              value={form.contact}
              onChange={handleChange("contact")}
              className={inputClasses}
            />
          </div>

          <div>
            <FieldLabel>Status</FieldLabel>
            <select
              value={form.status}
              onChange={handleChange("status")}
              className={`${inputClasses} appearance-none`}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {submitting
              ? editingCollege
                ? "Updating..."
                : "Adding..."
              : editingCollege
                ? "Update College"
                : "Add College"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={submitting}
            className="w-full rounded-lg bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200 disabled:opacity-50 sm:w-auto"
          >
            Clear Form
          </button>

          {editingCollege && (
            <button
              type="button"
              onClick={onDelete}
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-6 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50 sm:w-auto"
            >
              <Trash2 size={15} />
              Delete College
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// View College Modal
function ViewCollegeModal({ college, onClose }) {
  if (!college) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              College Details
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Existing college information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              College Name
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {college.name || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Code
            </p>
            <p className="mt-1 font-mono text-sm text-slate-700">
              {college.code || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Location
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {college.address || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Contact Person
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {college.contactPerson || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Interns
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {college.internCount ?? 0}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              Status
            </p>
            <StatusBadge isActive={college.isActive} />
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-100 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// College Table
function CollegeTable({
  colleges,
  internCounts,
  onEdit,
  onView,
  onDelete,
}) {
  return (
    <div className="mx-auto mt-6 w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-sm">
      {/* Mobile View */}
      <div className="divide-y divide-slate-50 sm:hidden">
        {colleges.map((college) => (
          <div key={college.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {college.name}
                </p>
                <p className="mt-0.5 font-mono text-xs text-slate-400">
                  {college.code}
                </p>
              </div>

              <StatusBadge isActive={college.isActive} />
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
              <dt className="text-slate-400">Location</dt>
              <dd className="text-right text-slate-600">
                {college.address || "—"}
              </dd>

              <dt className="text-slate-400">Contact</dt>
              <dd className="text-right text-slate-600">
                {college.contactPerson || "—"}
              </dd>

              <dt className="text-slate-400">Interns</dt>
              <dd className="text-right font-semibold text-slate-800">
                {internCounts[college.id] || 0}
              </dd>
            </dl>

            <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-slate-50 pt-3 text-sm font-medium">
              <button
                onClick={() => onEdit(college)}
                className="text-blue-500 transition hover:text-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => onView(college)}
                className="text-slate-500 transition hover:text-slate-700"
              >
                View
              </button>

              <button
                onClick={() => onDelete(college)}
                className="flex items-center gap-1 text-red-500 transition hover:text-red-700"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[900px] table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="w-[18%] px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-4">
                College
              </th>

              <th className="w-[9%] px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-4">
                Code
              </th>

              <th className="w-[14%] px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-4">
                Location
              </th>

              <th className="w-[15%] px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-4">
                Contact Person
              </th>

              <th className="w-[7%] px-3 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-4">
                Interns
              </th>

              <th className="w-[9%] px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-4">
                Status
              </th>

              <th className="w-[28%] px-3 py-4 text-center text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {colleges.map((college, idx) => (
              <tr
                key={college.id}
                className={`${
                  idx % 2 === 1 ? "bg-slate-50/60" : "bg-white"
                } border-b border-slate-50 last:border-0`}
              >
                <td className="px-3 py-4 text-sm font-semibold text-slate-800 lg:px-4">
                  {college.name}
                </td>

                <td className="px-3 py-4 font-mono text-sm text-slate-400 lg:px-4">
                  {college.code}
                </td>

                <td className="break-words px-3 py-4 text-sm text-slate-500 lg:px-4">
                  {college.address || "—"}
                </td>

                <td className="break-words px-3 py-4 text-sm text-slate-500 lg:px-4">
                  {college.contactPerson || "—"}
                </td>

                <td className="px-3 py-4 text-right text-sm font-semibold text-slate-800 lg:px-4">
                  {internCounts[college.id] || 0}
                </td>

                <td className="px-3 py-4 lg:px-4">
                  <StatusBadge isActive={college.isActive} />
                </td>

                <td className="px-3 py-4 lg:px-4">
                  <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <button
                      onClick={() => onEdit(college)}
                      className="rounded-md bg-blue-50 px-2.5 py-1.5 text-sm font-medium text-blue-500 transition hover:bg-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onView(college)}
                      className="rounded-md bg-slate-100 px-2.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
                    >
                      View
                    </button>

                    <button
                      onClick={() => onDelete(college)}
                      className="flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-medium text-red-500 transition hover:bg-red-100"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {colleges.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-slate-400"
                >
                  No colleges found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Colleges Component
function Colleges() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const [viewingCollege, setViewingCollege] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [internCounts, setInternCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Fetch Colleges and Students
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [collegesRes, studentsRes] = await Promise.all([
        hrService.getAllColleges(),
        hrService.getAllStudents(),
      ]);

      const collegeList = collegesRes.data || [];
      const students = studentsRes.data || [];

      setColleges(collegeList);

      const counts = {};

      students.forEach((student) => {
        counts[student.collegeId] =
          (counts[student.collegeId] || 0) + 1;
      });

      setInternCounts(counts);
    } catch (err) {
      console.error("Load colleges error:", err);
      setError("Failed to load colleges");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Close Add / Edit Modal
  const closeModal = () => {
    setIsOpen(false);
    setEditingCollege(null);
    setFormError("");
  };

  // Edit College
  const handleEdit = (college) => {
    setEditingCollege(college);
    setFormError("");
    setIsOpen(true);
  };

  // View College
  const handleView = (college) => {
    setViewingCollege(college);
  };

  // Delete College
  const handleDelete = async (college) => {
    if (!college?.id) return;

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${college.name}"?`
    );

    if (!confirmed) return;

    try {
      setSubmitting(true);
      await hrService.deleteCollege(college.id);

      if (editingCollege?.id === college.id) {
        closeModal();
      }

      if (viewingCollege?.id === college.id) {
        setViewingCollege(null);
      }

      await fetchData();
    } catch (err) {
      console.error("Delete college error:", err);

      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete college";

      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Add / Update College
  const handleRegister = async (formData) => {
    setFormError("");

    if (!formData.name || !formData.code) {
      setFormError("Name and code are required");
      return;
    }

    setSubmitting(true);

    try {
      const collegeData = {
        name: formData.name,
        code: formData.code,
        address: formData.location,
        contactPerson: formData.contact,
        isActive: formData.status === "Active",
      };

      if (editingCollege) {
        await hrService.updateCollege(
          editingCollege.id,
          collegeData
        );
      } else {
        await hrService.createCollege(collegeData);
      }

      closeModal();
      await fetchData();
    } catch (err) {
      console.error(
        editingCollege
          ? "Update college error:"
          : "Create college error:",
        err
      );

      setFormError(
        err.response?.data?.message ||
          err.message ||
          (editingCollege
            ? "Failed to update college"
            : "Failed to add college")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading colleges...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen sm:p-6">
      {/* Header */}
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-[Open_Sans] text-lg font-semibold text-slate-800">
            College Management
          </h2>

          <p className="text-slate-400">
            {colleges.length} colleges registered across India
          </p>
        </div>

        <button
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600 sm:w-auto"
          onClick={() => {
            setEditingCollege(null);
            setFormError("");
            setIsOpen(true);
          }}
        >
          + Add College
        </button>
      </div>

      {/* College Table */}
      <CollegeTable
        colleges={colleges}
        internCounts={internCounts}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />

      {/* Add / Edit Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={submitting}
              className="absolute right-6 top-2 z-10 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
            >
              <X size={14} />
            </button>

            <div className="px-1 pb-2 pt-1">
              <h2 className="text-lg font-semibold text-slate-800">
                {editingCollege ? "Edit College" : "Add College"}
              </h2>

              <p className="text-sm text-slate-400">
                {editingCollege
                  ? "Update existing college information"
                  : "Enter college information"}
              </p>
            </div>

            <AddCollegeForm
              onSubmit={handleRegister}
              onDelete={() => handleDelete(editingCollege)}
              submitting={submitting}
              formError={formError}
              editingCollege={editingCollege}
            />
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingCollege && (
        <ViewCollegeModal
          college={{
            ...viewingCollege,
            internCount: internCounts[viewingCollege.id] || 0,
          }}
          onClose={() => setViewingCollege(null)}
        />
      )}
    </div>
  );
}

export default Colleges;
