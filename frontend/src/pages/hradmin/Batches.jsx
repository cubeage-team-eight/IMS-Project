import React from 'react'
import { useState } from 'react';
import {X} from "lucide-react";
const batches=[
    {
        id:1,
        title:"Batch 2025-Q1",
        startDate:"01 Jan 2026",
        endDate:"31 Mar 2026",
        mentor:"Dr. Arun Patel",
        status:"Active",
        enrolled:45,
        capacity:50
    },
    {
        id:2,
        title:"Batch 2025-Q2",
        startDate:"01 Jan 2026",
        endDate:"31 Mar 2026",
        mentor:"Dr. Arun Patel",
        status:"Active",
        enrolled:45,
        capacity:70
    },
    {
        id:3,
        title:"Batch 2025-Q3",
        startDate:"01 Jan 2026",
        endDate:"31 Mar 2026",
        mentor:"Dr. Arun Patel",
        status:"Active",
        enrolled:20,
        capacity:50
    },
    {
        id:4,
        title:"Batch 2025-Q4",
        startDate:"01 Jan 2026",
        endDate:"31 Mar 2026",
        mentor:"Dr. Arun Patel",
        status:"Completed",
        enrolled:10,
        capacity:50
    }
]


const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Completed: "bg-slate-100 text-slate-600",
  Upcoming: "bg-amber-50 text-amber-600",
};

 function BatchCard({title ,startDate ,endDate ,mentor, status,enrolled,capacity,})
  {
  const percent = Math.min(100, Math.round((enrolled / capacity) * 100));
 
  return (
    <div className="w-full  mx-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
            {title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 truncate">
            {startDate} &rarr; {endDate} &middot; Mentor: {mentor}
          </p>
        </div>
 
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            statusStyles[status] ?? statusStyles.Active
          }`}
        >
          {status}
        </span>
      </div>
 
      {/* Progress */}
      <div className="mt-5 sm:mt-6">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-slate-400">Enrolled</span>
          <span className="font-mono font-medium text-slate-900">
            {enrolled} / {capacity}
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

const initialState = {
  title:"",
  startDate: "",
  endDate: "",
  mentor: "",
  status: "",
  enrolled: "",
  capacity: "",
};
const FieldLabel = ({ children }) => (
  <label className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-400 uppercase mb-2">
    {children}
  </label>
);
 
const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition";

function CreateBatchForm({ onSubmit, onCancle}) {
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
            <FieldLabel>Title</FieldLabel>
            <input
              type="text"
              placeholder="Summer Intership"
              value={form.title}
              onChange={handleChange("title")}
              className={inputClasses}
            />
          </div>
 
          <div>
            <FieldLabel>Start Date</FieldLabel>
            <input
              type="date"
              placeholder="DD/MM/YYYY"
              value={form.startDate}
              onChange={handleChange("startDate")}
              className={inputClasses}
            />
          </div>
 
          <div>
            <FieldLabel>End Date</FieldLabel>
            <input
              type="date"
              placeholder="DD/MM/YYYY"
              value={form.endDate}
              onChange={handleChange("endDate")}
              className={inputClasses}
            />
          </div>

          <div>
            <FieldLabel>Mentor</FieldLabel>
            <input
              type="text"
              placeholder="Mentor Name"
              value={form.mentor}
              onChange={handleChange("mentor")}
              className={inputClasses}
            />
          </div>
 
          <div>
            <FieldLabel>Capacity</FieldLabel>
            <input
              type="number"
              placeholder="Enter No of interns"
              value={form.enrolled}
              onChange={handleChange("enrolled")}
              className={inputClasses}
            />
          </div>
        </div>
 
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500/90 active:bg-blue-600 transition"
          >
            Create Batch
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
function Batches() {
    const [isOpen, setIsOpen] = useState(false);
    const [batcheInfo, setBatcheInfo] = useState([]);
   
    const closeModal = () => setIsOpen(false);
   
    const handleRegister = (formData) => {
      setBatcheInfo((prev) => [...prev, formData]);
      closeModal();
      console.log(formData)
    }
  return (
    <div className="sm:p-6 min-h-screen">
         <div className='flex flex-col sm:flex-row gap-4 justify-between items-center'>
            <div>
                <h1 className='text-xl font-medium'>Internship Batches</h1>
                <p className='text-slate-400'>Manage batch cycles, capacity, and mentor assignmentsManage batch cycles, capacity, and mentor assignments</p>
            </div>    
                <button className='w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md text-sm  hover:bg-blue-600 transition-colors' onClick={()=>setIsOpen(true)}> + Create Batch</button>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 ">
                {batches.map((batch) => (
                    <BatchCard
                        key={batch.id}
                        title={batch.title}
                        startDate={batch.startDate}
                        endDate={batch.endDate}
                        mentor={batch.mentor}
                        status={batch.status}
                        enrolled={batch.enrolled}
                        capacity={batch.capacity}
                    />
                ))}
            </div>
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
                        <CreateBatchForm onSubmit={handleRegister} onCancel={closeModal} />
                      </div>
                    </div>
                  )}
    </div>
  )
}

export default Batches