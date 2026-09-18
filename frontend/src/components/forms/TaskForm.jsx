import React, { useState } from "react";
import {
  X,
  FileText,
  UserRound,
  MessageSquareText,
  Flag,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

const TaskForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    student: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const students = [
    "Aditi Verma",
    "Sneha Joshi",
    "Rahul Das",
    "Meera Pillai",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
       <div className="w-full max-w-[790px] rounded-2xl bg-white shadow-2xl">
         <div className="flex items-start justify-between px-7 pt-7">

          <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
              <FileText size={25} className="text-white" />
            </div>

            <div>
              <h2 className="text-[24px] font-bold text-[#08182A]">
                Assign New Task
              </h2>

              <p className="mt-1 text-[15px] text-slate-400">
                Fill in the details below to assign a task to a student.
              </p>
            </div>

          </div>
 <button
            type="button"
            onClick={onClose}
            className="text-slate-500 transition hover:text-slate-800"
          >
            <X size={25} />
          </button>

        </div>
<form
          onSubmit={handleSubmit}
          className="px-7 pb-7 pt-7"
        >
 <div className="grid grid-cols-2 gap-7">
<div>
              <label className="mb-2 block text-[15px] font-semibold text-[#08182A]">
                Task Title <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <FileText
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  required
                  className="h-12 w-full rounded-lg border border-slate-200 pl-12 pr-4 text-[14px] text-[#08182A] outline-none placeholder:text-slate-400 focus:border-orange-400"
                />

              </div>
            </div>
<div>
              <label className="mb-2 block text-[15px] font-semibold text-[#08182A]">
                Assign To (Student){" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <UserRound
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="student"
                  value={formData.student}
                  onChange={handleChange}
                  required
                  className="h-12 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-12 pr-10 text-[14px] text-[#08182A] outline-none focus:border-orange-400"
                >
                  <option value="">Select student</option>

                  {students.map((student) => (
                    <option key={student} value={student}>
                      {student}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={19}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>
            </div>

          </div>
 <div className="mt-7">

            <label className="mb-2 block text-[15px] font-semibold text-[#08182A]">
              Description <span className="text-red-500">*</span>
            </label>

            <div className="relative">

              <MessageSquareText
                size={19}
                className="absolute left-4 top-5 text-slate-400"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write task description here..."
                maxLength={500}
                rows={5}
                required
                className="w-full resize-none rounded-lg border border-slate-200 py-4 pl-12 pr-4 text-[14px] text-[#08182A] outline-none placeholder:text-slate-400 focus:border-orange-400"
              />

            </div>
 <div className="mt-1 text-right text-xs text-slate-400">
              {formData.description.length}/500
            </div>

          </div>
<div className="mt-4 grid grid-cols-2 gap-7">
<div>

              <label className="mb-2 block text-[15px] font-semibold text-[#08182A]">
                Priority <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <Flag
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  className="h-12 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-12 pr-10 text-[14px] text-[#08182A] outline-none focus:border-orange-400"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <ChevronDown
                  size={19}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>
<div>

              <label className="mb-2 block text-[15px] font-semibold text-[#08182A]">
                Due Date <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <CalendarDays
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-12 pr-4 text-[14px] text-[#08182A] outline-none focus:border-orange-400"
                />

              </div>

            </div>

          </div>
<div className="mt-7 border-t border-slate-200" />
<div className="mt-6 flex justify-end gap-3">
 <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-lg border border-slate-200 px-7 text-[14px] font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
<button
              type="submit"
              className="h-11 rounded-lg bg-orange-500 px-7 text-[14px] font-semibold text-white transition hover:bg-orange-600"
            >
              Assign Task
            </button>
</div>
</form>
 </div>
</div>
  );
};
export default TaskForm;