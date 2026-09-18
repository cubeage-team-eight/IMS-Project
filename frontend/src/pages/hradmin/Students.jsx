// import React from 'react'
// import {useState} from 'react'
// const initialState = {
//   fullName: "",
//   email: "",
//   mobile: "",
//   rollNumber: "",
//   college: "",
//   branch: "",
//   batch: "",
//   joiningDate: "",
// };

// const FieldLabel = ({ children }) => (
//   <label className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-400 uppercase mb-2">
//     {children}
//   </label>
// );
 
// const inputClasses =
//   "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition";

// function StudentRegistrationForm({ onSubmit }) {
//   const [form, setForm] = useState(initialState);
 
//   const handleChange = (field) => (e) =>
//     setForm((prev) => ({ ...prev, [field]: e.target.value }));
 
//   const handleClear = () => setForm(initialState);
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit?.(form);
//   };
 
//   return (
//     <div className="w-full  mx-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 p-5 sm:p-8">
//       <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-6">
//         Student Registration Form
//       </h2>
 
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
//           <div>
//             <FieldLabel>Full Name</FieldLabel>
//             <input
//               type="text"
//               placeholder="e.g. Aditi Verma"
//               value={form.fullName}
//               onChange={handleChange("fullName")}
//               className={inputClasses}
//             />
//           </div>
 
//           <div>
//             <FieldLabel>Email Address</FieldLabel>
//             <input
//               type="email"
//               placeholder="aditi@college.edu"
//               value={form.email}
//               onChange={handleChange("email")}
//               className={inputClasses}
//             />
//           </div>
 
//           <div>
//             <FieldLabel>Mobile Number</FieldLabel>
//             <input
//               type="tel"
//               placeholder="+91 98765 43210"
//               value={form.mobile}
//               onChange={handleChange("mobile")}
//               className={inputClasses}
//             />
//           </div>
 
//           <div>
//             <FieldLabel>Roll Number</FieldLabel>
//             <input
//               type="text"
//               placeholder="CS2021001"
//               value={form.rollNumber}
//               onChange={handleChange("rollNumber")}
//               className={inputClasses}
//             />
//           </div>
 
//           <div>
//             <FieldLabel>College</FieldLabel>
//             <select
//               value={form.college}
//               onChange={handleChange("college")}
//               className={`${inputClasses} appearance-none text-slate-700`}
//             >
//               <option value="">Select college</option>
//               <option value="IIT Bombay">IIT Bombay</option>
//               <option value="IIT Delhi">IIT Delhi</option>
//               <option value="COEP Pune">COEP Pune</option>
//               <option value="VJTI Mumbai">VJTI Mumbai</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
 
//           <div>
//             <FieldLabel>Branch / Department</FieldLabel>
//             <input
//               type="text"
//               placeholder="Computer Science"
//               value={form.branch}
//               onChange={handleChange("branch")}
//               className={inputClasses}
//             />
//           </div>
 
//           <div>
//             <FieldLabel>Internship Batch</FieldLabel>
//             <input
//               type="text"
//               placeholder="Batch 2025-Q2"
//               value={form.batch}
//               onChange={handleChange("batch")}
//               className={inputClasses}
//             />
//           </div>
 
//           <div>
//             <FieldLabel>Joining Date</FieldLabel>
//             <input
//               type="date"
//               value={form.joiningDate}
//               onChange={handleChange("joiningDate")}
//               className={`${inputClasses} text-slate-700`}
//             />
//           </div>
//         </div>
 
//         <div className="mt-7 flex flex-col sm:flex-row gap-3">
//           <button
//             type="submit"
//             className="w-full sm:w-auto rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500/90 active:bg-blue-600 transition"
//           >
//             Register Student
//           </button>
//           <button
//             type="button"
//             onClick={handleClear}
//             className="w-full sm:w-auto rounded-lg bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200 transition"
//           >
//             Clear Form
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
// function Students() {
//   return (
//     <div className="sm:p-6 min-h-screen">
//         <div className='flex flex-col sm:flex-row gap-4 justify-between items-center'>
//             <h1 className='text-xl font-medium'>Student Registration</h1>
//             <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-500/90 transition'> + Register Students</button>
//         </div>
//         <div className="mt-6">
//             <StudentRegistrationForm/>
//         </div>
//     </div>
//   )
// }

// export default Students




import React, { useEffect, useState } from 'react'
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
  joiningDate: "",
};

const FieldLabel = ({ children }) => (
  <label className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-400 uppercase mb-2">
    {children}
  </label>
);

const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition";

function StudentRegistrationForm({ onSubmit, colleges, batches, submitting, formError }) {
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
        Student Registration Form
      </h2>

      {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}

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
            />
          </div>

          <div>
            <FieldLabel>Password</FieldLabel>
            <input
              type="text"
              placeholder="Set initial password"
              value={form.password}
              onChange={handleChange("password")}
              className={inputClasses}
            />
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
            <FieldLabel>Roll Number / Enrollment No.</FieldLabel>
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
            >
              <option value="">Select college</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
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
                <option key={b.id} value={b.id}>{b.name}</option>
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
            {submitting ? "Registering..." : "Register Student"}
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [collegesRes, batchesRes] = await Promise.all([
        hrService.getAllColleges(),
        hrService.getAllBatches(),
      ]);
      setColleges(collegesRes.data || []);
      setBatches(batchesRes.data || []);
    } catch (err) {
      console.error("Load data error:", err);
      setError("Failed to load colleges/batches");
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

    if (!form.fullName || !form.email || !form.password || !form.collegeId || !form.rollNumber) {
      setFormError("Full name, email, password, roll number and college are required");
      return;
    }

    setSubmitting(true);

    const nameParts = form.fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    try {
      const res = await hrService.createStudent({
        firstName,
        lastName,
        email: form.email,
        password: form.password,
        phone: form.mobile,
        collegeId: form.collegeId,
        enrollmentNumber: form.rollNumber,
        course: form.course,
        branch: form.branch,
        joiningDate: form.joiningDate || null,
      });

      const newStudent = res.data;

      if (form.batchId && newStudent?.id) {
        await hrService.assignStudentToBatch(form.batchId, newStudent.id);
      }

      setSuccessMsg("Student registered successfully!");
      resetForm();
    } catch (err) {
      console.error("Create student error:", err);
      setFormError(err.response?.data?.message || err.message || "Failed to register student");
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
      <div className='flex flex-col sm:flex-row gap-4 justify-between items-center'>
        <h1 className='text-xl font-medium'>Student Registration</h1>
      </div>

      {successMsg && <p className="text-emerald-600 text-sm mt-4">{successMsg}</p>}

      <div className="mt-6">
        <StudentRegistrationForm
          onSubmit={handleRegister}
          colleges={colleges}
          batches={batches}
          submitting={submitting}
          formError={formError}
        />
      </div>
    </div>
  )
}

export default Students