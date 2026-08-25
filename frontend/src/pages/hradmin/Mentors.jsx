import React from 'react'
import {useState} from 'react'
const mentors = [
    {
        initials: "AP",
        name: "Dr. Arun Patel",
        role: "Senior Engineer · Full Stack Development",
        empId: "EMP-0041",
        skills: ["React", "Node.js", "MongoDB"],
        internCount: 12,
    },
    {
        initials: "AP",
        name: "Dr. Arun Patel",
        role: "Senior Engineer · Full Stack Development",
        empId: "EMP-0067",
        skills: ["React", "Node.js", "MongoDB"],
        internCount: 12,
    },
    {
        initials: "AP",
        name: "Dr. Arun Patel",
        role: "Senior Engineer · Full Stack Development",
        empId: "EMP-0023",
        skills: ["React", "Node.js", "MongoDB"],
        internCount: 12,
    },
    {
        initials: "AP",
        name: "Dr. Arun Patel",
        role: "Senior Engineer · Full Stack Development",
        empId: "EMP-0089",
        skills: ["React", "Node.js", "MongoDB"],
        internCount: 12,
    },
]



const initialState = {
  initials:"",
  name: " ",
  email: " ",
  mobile: " ",
  empId: " ",
  branch: " ",
  role: " ",
  internCount:" ",
};

const FieldLabel = ({ children }) => (
  <label className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-400 uppercase mb-2">
    {children}
  </label>
);
 
const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition";

function MentorRegistrationForm({ onSubmit }) {
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
      <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-6">
        Mentor Registration Form
      </h2>
 
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
              placeholder="CS2021001"
              value={form.empId}
              onChange={handleChange("empId")}
              className={inputClasses}
            />
          </div>
 
          <div>
            <FieldLabel>Role</FieldLabel>
            <input
              type="text"
              placeholder="CS2021001"
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
 
          <div>
            <FieldLabel>No of Interns</FieldLabel>
            <input
              type="text"
             
              value={form.internCount}
              onChange={handleChange("internCount")}
              className={inputClasses}
            />
          </div>
 
         
        </div>
 
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500/90 active:bg-blue-600 transition"
          >
            Register Mentor
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

function MentorCards({ initial, name, role, empId, skills, internCount }) {
    return (
        
        <div className="bg-white rounded-2xl shadow-sm p-5 w-full flex items-start justify-between">
            <div className="flex items-start gap-4">
                {/* Avatar */}
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

                   
                    <div className="flex flex-wrap gap-2 mt-3">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="bg-blue-50 text-blue-500 text-xs font-medium px-2.5 py-1 rounded-md"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            
            <div className="text-right flex-shrink-0 ml-4">
                <div className="text-blue-600 font-bold text-2xl leading-none">
                    {internCount}
                </div>
                <div className="text-slate-400 text-xs mt-1">Interns</div>
            </div>
        </div>
    )
}

function Mentorlist() {
    return (
        
        <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 '>
            {mentors.map((mentor) => (
                <MentorCards
                    key={mentor.empId}
                    initial={mentor.initials}
                    name={mentor.name}
                    role={mentor.role}
                    empId={mentor.empId}
                    skills={mentor.skills}
                    internCount={mentor.internCount}
                />
            ))}
        </div>
    )
}

function Mentors() {
    return (
        
        <div className=" p-6 min-h-screen">
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-medium'>Mentor Management</h1>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md'> + Add Mentor</button>
            </div>
            
            <Mentorlist />
            <MentorRegistrationForm/>
        </div>
    )
}

export default Mentors