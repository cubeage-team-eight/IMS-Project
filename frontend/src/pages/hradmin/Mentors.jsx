// import React from 'react'
// import {useState} from 'react'
// import {X} from 'lucide-react'
// const mentors = [
//     {
//         initials: "AP",
//         name: "Dr. Arun Patel",
//         role: "Senior Engineer · Full Stack Development",
//         empId: "EMP-0041",
//         skills: ["React", "Node.js", "MongoDB"],
//         internCount: 12,
//     },
//     {
//         initials: "AP",
//         name: "Dr. Arun Patel",
//         role: "Senior Engineer · Full Stack Development",
//         empId: "EMP-0067",
//         skills: ["React", "Node.js", "MongoDB"],
//         internCount: 12,
//     },
//     {
//         initials: "AP",
//         name: "Dr. Arun Patel",
//         role: "Senior Engineer · Full Stack Development",
//         empId: "EMP-0023",
//         skills: ["React", "Node.js", "MongoDB"],
//         internCount: 12,
//     },
//     {
//         initials: "AP",
//         name: "Dr. Arun Patel",
//         role: "Senior Engineer · Full Stack Development",
//         empId: "EMP-0089",
//         skills: ["React", "Node.js", "MongoDB"],
//         internCount: 12,
//     },
// ]



// const initialState = {
//   initials:"",
//   name: "",
//   email: "",
//   mobile: "",
//   empId: "",
//   branch: "",
//   role: "",
//   internCount:"",
// };

// const FieldLabel = ({ children }) => (
//   <label className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-400 uppercase mb-2">
//     {children}
//   </label>
// );
 
// const inputClasses =
//   "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition";

  
// function MentorRegistrationForm({ onSubmit, onCancle}) {
//   const [form, setForm] = useState(initialState);
  
//   const handleChange = (field) => (e) =>
//     setForm((prev) => ({ ...prev, [field]: e.target.value }));
 
//   const handleClear = () => setForm(initialState);
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit?.(form);
//   };
 
//   return (
    
//     <div className="w-full mt-4 mx-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 p-5 sm:p-8">
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
//           <div>
//             <FieldLabel>Full Name</FieldLabel>
//             <input
//               type="text"
//               placeholder="e.g. Aditi Verma"
//               value={form.name}
//               onChange={handleChange("name")}
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
//             <FieldLabel>Employee Id</FieldLabel>
//             <input
//               type="text"
//               placeholder="CS2021001"
//               value={form.empId}
//               onChange={handleChange("empId")}
//               className={inputClasses}
//             />
//           </div>
 
//           <div>
//             <FieldLabel>Role</FieldLabel>
//             <input
//               type="text"
//               placeholder="CS2021001"
//               value={form.role}
//               onChange={handleChange("role")}
//               className={inputClasses}
//             />
//           </div>
 
//           <div>
//             <FieldLabel>Branch / Department</FieldLabel>
//             <input
//               type="text"
//               placeholder="IT"
//               value={form.branch}
//               onChange={handleChange("branch")}
//               className={inputClasses}
//             />
//           </div>
 
//           <div>
//             <FieldLabel>No of Interns</FieldLabel>
//             <input
//               type="text"
             
//               value={form.internCount}
//               onChange={handleChange("internCount")}
//               className={inputClasses}
//             />
//           </div>
 
         
//         </div>
 
//         <div className="mt-7 flex flex-col sm:flex-row gap-3">
//           <button
//             type="submit"
//             className="w-full sm:w-auto rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500/90 active:bg-blue-600 transition"
//           >
//             Register Mentor
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
//       </div>
//     </div>
//   );
// }

// function MentorCards({ initial, name, role, empId, skills, internCount }) {
//     return (
        
//         <div className="bg-white rounded-2xl shadow-sm p-5 w-full flex items-start justify-between">
//             <div className="flex items-start gap-4">
//                 {/* Avatar */}
//                 <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
//                     <span className="text-blue-500 font-semibold text-sm">
//                         {initial}
//                     </span>
//                 </div>

              
//                 <div>
//                     <h3 className="text-slate-900 font-semibold text-base leading-tight">
//                         {name}
//                     </h3>
//                     <p className="text-slate-500 text-sm mt-0.5">
//                         {role}
//                     </p>
//                     <p className="text-slate-300 text-xs font-medium tracking-wide mt-1">
//                         {empId}
//                     </p>

                   
//                     <div className="flex flex-wrap gap-2 mt-3">
//                         {skills.map((skill) => (
//                             <span
//                                 key={skill}
//                                 className="bg-blue-50 text-blue-500 text-xs font-medium px-2.5 py-1 rounded-md"
//                             >
//                                 {skill}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             </div>

            
//             <div className="text-right flex-shrink-0 ml-4">
//                 <div className="text-blue-600 font-bold text-2xl leading-none">
//                     {internCount}
//                 </div>
//                 <div className="text-slate-400 text-xs mt-1">Interns</div>
//             </div>
//         </div>
//     )
// }

// function Mentorlist() {
//     return (
        
//         <div className='grid grid-cols-1 gap-4 mt-4  md:grid-cols-2'>
//             {mentors.map((mentor) => (
//                 <MentorCards
//                     key={mentor.empId}
//                     initial={mentor.initials}
//                     name={mentor.name}
//                     role={mentor.role}
//                     empId={mentor.empId}
//                     skills={mentor.skills}
//                     internCount={mentor.internCount}
//                 />
//             ))}
//         </div>
//     )
// }

// function Mentors() {
//      const [isOpen, setIsOpen] = useState(false);
//   const [mentors, setMentors] = useState([]);
 
//   const closeModal = () => setIsOpen(false);
 
//   const handleRegister = (formData) => {
//     setMentors((prev) => [...prev, formData]);
//     closeModal();
//     console.log(formData)
    
//   };
//     return (
        
//         <div className=" sm:p-6 min-h-screen">
//             <div className='flex flex-col sm:flex-row gap-4 justify-between items-center '>
//               <div>
//                 <h1 className='text-xl font-semibold '>Mentor Management</h1>
//                 <p className='text-slate-400'>Manage employee mentors and their intern assignments</p>
//               </div>  
//                 <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md text-sm  hover:bg-blue-600 transition-colors" onClick={()=>setIsOpen(true)}>
//               + Add Mentor
//             </button>
//             </div>
            
//             <Mentorlist />
//             {isOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
//           onClick={closeModal}
//         >
//           <div
//             className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-4 shadow-lg relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="absolute right-6 top-2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 z-10"
//             >
//               <X size={14} />
//             </button>
//             <MentorRegistrationForm onSubmit={handleRegister} onCancel={closeModal} />
//           </div>
//         </div>
//       )}
            
//         </div>
//     )
// }

// export default Mentors



import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { hrService } from '../../services/hr.service';

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


function MentorRegistrationForm({ onSubmit, onCancel, submitting, formError }) {
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
        {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
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
                type="text"
                placeholder="Senior Engineer"
                value={form.role}
                onChange={handleChange("role")}
                className={inputClasses}
              />
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

function MentorCards({ initial, name, role, empId }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 w-full flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
          <span className="text-blue-500 font-semibold text-sm">
            {initial}
          </span>
        </div>

        <div>
          <h3 className="text-slate-900 font-semibold text-base leading-tight">
            {name}
          </h3>
          <p className="text-slate-500 text-sm mt-0.5">
            {role}
          </p>
          <p className="text-slate-300 text-xs font-medium tracking-wide mt-1">
            {empId}
          </p>
        </div>
      </div>

      <div className="text-right flex-shrink-0 ml-4">
        <div className="text-blue-600 font-bold text-2xl leading-none">
          —
        </div>
        <div className="text-slate-400 text-xs mt-1">Interns</div>
      </div>
    </div>
  )
}

function MentorList({ mentors }) {
  return (
    <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-2'>
      {mentors.map((mentor) => (
        <MentorCards
          key={mentor.id}
          initial={mentor.firstName?.charAt(0).toUpperCase() || "?"}
          name={`${mentor.firstName} ${mentor.lastName || ""}`.trim()}
          role={mentor.designation || "—"}
          empId={mentor.employeeId || "—"}
        />
      ))}
    </div>
  )
}

function Mentors() {
  const [isOpen, setIsOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await hrService.getAllMentors();
      setMentors(res.data || []);
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
      setFormError(err.response?.data?.message || err.message || "Failed to register mentor");
    } finally {
      setSubmitting(false);
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
      <div className='flex flex-col sm:flex-row gap-4 justify-between items-center'>
        <div>
          <h1 className='text-xl font-semibold'>Mentor Management</h1>
          <p className='text-slate-400'>Manage employee mentors and their intern assignments</p>
        </div>
        <button
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          + Add Mentor
        </button>
      </div>

      <MentorList mentors={mentors} />

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
              onCancel={closeModal}
              submitting={submitting}
              formError={formError}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default Mentors