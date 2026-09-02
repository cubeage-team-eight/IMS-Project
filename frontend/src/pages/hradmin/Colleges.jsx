import React from 'react'
import {useState} from "react"
import {X} from "lucide-react"
const colleges = [
  {
    name: "BITS Pilani",
    code: "BITS-PIL",
    location: "Pilani, Rajasthan",
    contact: "Dr. Suresh Rao",
    interns: 142,
    status: "Active",
  },
  {
    name: "NIT Trichy",
    code: "NIT-TRI",
    location: "Tiruchirappalli, Tamil Nadu",
    contact: "Prof. Anitha Kumar",
    interns: 118,
    status: "Active",
  },
  {
    name: "VIT Vellore",
    code: "VIT-VEL",
    location: "Vellore, Tamil Nadu",
    contact: "Mr. Ramesh V",
    interns: 97,
    status: "Active",
  },
  {
    name: "Manipal Institute",
    code: "MAHE-MAN",
    location: "Manipal, Karnataka",
    contact: "Dr. Preethi Shetty",
    interns: 84,
    status: "Active",
  },
  {
    name: "SRM University",
    code: "SRM-CHN",
    location: "Chennai, Tamil Nadu",
    contact: "Ms. Divya R",
    interns: 76,
    status: "Inactive",
  },
];

function StatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
        isActive
          ? "bg-emerald-100 text-emerald-700"
          : "bg-rose-100 text-rose-600"
      }`}
    >
      {status}
    </span>
  );
}
const initialState = {
  name:"",
  code: "",
  location: "",
  contact: "",
  interns: "",
  status: "",
  
};
const FieldLabel = ({ children }) => (
  <label className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-400 uppercase mb-2">
    {children}
  </label>
);
 
const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition";

function AddCollegeForm({ onSubmit, onCancle}) {
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
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <FieldLabel>name</FieldLabel>
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
            <FieldLabel>Contact</FieldLabel>
            <input
              type="text"
              placeholder="Contact"
              value={form.contact}
              onChange={handleChange("contact")}
              className={inputClasses}
            />
          </div>
 
          <div>
            <FieldLabel>Interns</FieldLabel>
            <input
              type="number"
              placeholder="Enter No of interns"
              value={form.interns}
              onChange={handleChange("interns")}
              className={inputClasses}
            />
          </div>
           <div>
            <FieldLabel>Status</FieldLabel>
            <select
              value={form.status}
              onChange={handleChange("status")}
              className={`${inputClasses} appearance-none text-slate-700`}
            >
              <option value="">Status</option>
              <option value="In Active">In Active</option>
              <option value="Active">Active</option>
              
            </select>
          </div>
        </div>
 
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500/90 active:bg-blue-600 transition"
          >
            Add Batch
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
function CollegeTable() {
  return (
    <div className="mx-auto mt-6 w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-sm">
      {/* Mobile / small screens: stacked cards */}
      <div className="divide-y divide-slate-50 sm:hidden">
        {colleges.map((college) => (
          <div key={college.code} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {college.name}
                </p>
                <p className="mt-0.5 font-mono text-xs text-slate-400">
                  {college.code}
                </p>
              </div>
              <StatusBadge status={college.status} />
            </div>
 
            <dl className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
              <dt className="text-slate-400">Location</dt>
              <dd className="text-right text-slate-600">
                {college.location}
              </dd>
 
              <dt className="text-slate-400">Contact</dt>
              <dd className="text-right text-slate-600">
                {college.contact}
              </dd>
 
              <dt className="text-slate-400">Interns</dt>
              <dd className="text-right font-semibold text-slate-800">
                {college.interns}
              </dd>
            </dl>
 
            <div className="mt-3 flex items-center gap-4 border-t border-slate-50 pt-3 text-sm font-medium">
              <button className="text-blue-500 hover:text-blue-700">
                Edit
              </button>
              <button className="text-slate-500 hover:text-slate-700">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
 
      {/* Tablet / desktop: table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-6">
                College
              </th>
              <th className="px-4 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-6">
                Code
              </th>
              <th className="px-4 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-6">
                Location
              </th>
              <th className="px-4 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-6">
                Contact Person
              </th>
              <th className="px-4 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-6">
                Interns
              </th>
              <th className="px-4 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-6">
                Status
              </th>
              <th className="px-4 py-4 text-xs font-medium uppercase tracking-wider text-slate-400 lg:px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college, idx) => (
              <tr
                key={college.code}
                className={`${
                  idx % 2 === 1 ? "bg-slate-50/60" : "bg-white"
                } border-b border-slate-50 last:border-0`}
              >
                <td className="px-4 py-4 text-sm font-semibold text-slate-800 lg:px-6">
                  {college.name}
                </td>
                <td className="px-4 py-4 font-mono text-sm text-slate-400 lg:px-6">
                  {college.code}
                </td>
                <td className="px-4 py-4 text-sm text-slate-500 lg:px-6">
                  {college.location}
                </td>
                <td className="px-4 py-4 text-sm text-slate-500 lg:px-6">
                  {college.contact}
                </td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-slate-800 lg:px-6">
                  {college.interns}
                </td>
                <td className="px-4 py-4 lg:px-6">
                  <StatusBadge status={college.status} />
                </td>
                <td className="px-4 py-4 lg:px-6">
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <button className="text-blue-500 hover:text-blue-700">
                      Edit
                    </button>
                    <button className="text-slate-500 hover:text-slate-700">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Colleges() {
    const [isOpen, setIsOpen] = useState(false);
      const [college, setCollege] = useState([]);
     
      const closeModal = () => setIsOpen(false);
     
      const handleRegister = (formData) => {
        setCollege((prev) => [...prev, formData]);
        closeModal();
        console.log(formData)
      }
  return (
    <div className="sm:p-6 min-h-screen">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4">
            <div>
            <h2 className="text-lg font-semibold text-slate-800 font-[Open_Sans]">College Management</h2>
            <p className="text-slate-400">{colleges.length} colleges registered across India</p>
            </div>
          <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md text-sm  hover:bg-blue-600 transition-colors" onClick={()=>setIsOpen(true)}>
            + Add College
          </button>
        </div>
        <CollegeTable/>
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
             <AddCollegeForm onSubmit={handleRegister} onCancel={closeModal}/>
          </div>
        </div>
      )}
       
    </div>
  )
}

export default Colleges