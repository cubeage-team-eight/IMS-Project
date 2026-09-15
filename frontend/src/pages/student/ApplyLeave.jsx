// import React from 'react';

// const ApplyLeave = () => {
//   return (
//     <div className="space-y-6 max-w-6xl">
      
//       {/* Header section */}
//       <div>
//         <h1 className="text-xl font-semibold">Apply for Leave</h1>
//         <p className="text-slate-400 text-sm mt-1">Submit leave requests to your mentor for approval</p>
//       </div>

//       {/* Leave Balances */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
//         <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
//           <h2 className="text-3xl font-bold font-serif text-violet-600 mb-1">3</h2>
//           <p className="font-medium text-slate-400 text-sm">Medical Leave</p>
//           <p className="text-slate-300 text-xs">days remaining</p>
//         </div>

//         <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
//           <h2 className="text-3xl font-bold font-serif text-violet-600 mb-1">2</h2>
//           <p className="font-medium text-slate-400 text-sm">Personal Leave</p>
//           <p className="text-slate-300 text-xs">days remaining</p>
//         </div>

//         <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
//           <h2 className="text-3xl font-bold font-serif text-violet-600 mb-1">1</h2>
//           <p className="font-medium text-slate-400 text-sm">Emergency Leave</p>
//           <p className="text-slate-300 text-xs">days remaining</p>
//         </div>

//       </div>

//       {/* Application Form */}
//       <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
//         <h3 className="font-semibold mb-6">New Leave Application</h3>
        
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
//           <div className="space-y-6">
//             <div>
//               <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
//                 Leave Type
//               </label>
//               <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 appearance-none bg-white">
//                 <option>Medical Leave</option>
//                 <option>Personal Leave</option>
//                 <option>Emergency Leave</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
//                 End Date
//               </label>
//               <div className="relative">
//                 <input 
//                   type="date" 
//                   className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-400 uppercase font-mono"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
//                 Start Date
//               </label>
//               <div className="relative">
//                 <input 
//                   type="date" 
//                   className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-400 uppercase font-mono"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
//                 Reason
//               </label>
//               <textarea 
//                 placeholder="Briefly explain your reason for leave..." 
//                 rows="4"
//                 className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none h-[42px]"
//               ></textarea>
//             </div>
//           </div>
          
//           <div className="md:col-span-2 pt-2">
//             <button 
//               type="button" 
//               className="bg-violet-500 hover:bg-violet-600 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
//             >
//               Submit Application
//             </button>
//           </div>
          
//         </form>
//       </div>

//     </div>
//   );
// };

// export default ApplyLeave;

import React, { useEffect, useState } from 'react';
import { studentService } from '../../services/student.service';

const leaveTypeOptions = [
  { value: "SICK", label: "Medical Leave" },
  { value: "PERSONAL", label: "Personal Leave" },
  { value: "OTHER", label: "Emergency Leave" },
  { value: "CASUAL", label: "Casual Leave" },
];

const leaveTypeLabels = Object.fromEntries(
  leaveTypeOptions.map((o) => [o.value, o.label])
);

const statusStyle = {
  PENDING: "bg-amber-50 text-amber-600",
  APPROVED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-600",
  CANCELLED: "bg-slate-100 text-slate-500",
};

const ApplyLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [actioningId, setActioningId] = useState(null);

  const [formData, setFormData] = useState({
    leaveType: "SICK",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await studentService.getMyLeaves();
      setLeaves(res.data || []);
    } catch (err) {
      console.error("Load leaves error:", err);
      setError("Failed to load leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setError("");

    if (!formData.startDate || !formData.endDate || !formData.reason.trim()) {
      setError("Please fill in start date, end date and reason");
      return;
    }

    setSubmitting(true);

    try {
      await studentService.applyLeave(formData);
      setFormData({ leaveType: "SICK", startDate: "", endDate: "", reason: "" });
      await fetchLeaves();
    } catch (err) {
      console.error("Apply leave error:", err);
      setError(err.response?.data?.message || err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (leaveId) => {
    setActioningId(leaveId);
    try {
      await studentService.cancelLeave(leaveId);
      await fetchLeaves();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to cancel leave");
    } finally {
      setActioningId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const pendingCount = leaves.filter((l) => l.status === "PENDING").length;
  const approvedCount = leaves.filter((l) => l.status === "APPROVED").length;
  const rejectedCount = leaves.filter((l) => l.status === "REJECTED").length;

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">Apply for Leave</h1>
        <p className="text-slate-400 text-sm mt-1">Submit leave requests to your mentor for approval</p>
      </div>

      {/* Leave Stats (real counts, since no balance concept exists) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <h2 className="text-3xl font-bold font-serif text-amber-500 mb-1">{pendingCount}</h2>
          <p className="font-medium text-slate-400 text-sm">Pending</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <h2 className="text-3xl font-bold font-serif text-emerald-500 mb-1">{approvedCount}</h2>
          <p className="font-medium text-slate-400 text-sm">Approved</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <h2 className="text-3xl font-bold font-serif text-red-500 mb-1">{rejectedCount}</h2>
          <p className="font-medium text-slate-400 text-sm">Rejected</p>
        </div>

      </div>

      {/* Application Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h3 className="font-semibold mb-6">New Leave Application</h3>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-6">
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Leave Type
              </label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 appearance-none bg-white"
              >
                {leaveTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-400 uppercase font-mono"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-400 uppercase font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-[10px] tracking-widest uppercase font-mono mb-2">
                Reason
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Briefly explain your reason for leave..."
                rows="4"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
              ></textarea>
            </div>
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-violet-500 hover:bg-violet-600 text-white font-medium py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>

        </div>
      </div>

      {/* My Leave Requests */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h3 className="font-semibold mb-6">My Leave Requests</h3>

        {loading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : leaves.length === 0 ? (
          <p className="text-slate-400 text-sm">No leave requests yet.</p>
        ) : (
          <div className="space-y-4">
            {leaves.map((leave) => (
              <div key={leave.id} className="border border-slate-100 rounded-xl p-4">

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-slate-800">
                        {leaveTypeLabels[leave.leaveType] || leave.leaveType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      {formatDate(leave.startDate)} → {formatDate(leave.endDate)}
                    </p>
                  </div>

                  <span className={`text-xs px-3 py-1 rounded-md whitespace-nowrap ${statusStyle[leave.status]}`}>
                    {leave.status}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-3">{leave.reason}</p>

                {leave.status === "REJECTED" && leave.rejectionReason && (
                  <p className="text-xs text-red-500 mt-2">Reason: {leave.rejectionReason}</p>
                )}

                {leave.status === "PENDING" && (
                  <button
                    onClick={() => handleCancel(leave.id)}
                    disabled={actioningId === leave.id}
                    className="mt-3 text-xs text-red-500 hover:underline disabled:opacity-50"
                  >
                    {actioningId === leave.id ? "Cancelling..." : "Cancel Request"}
                  </button>
                )}

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ApplyLeave;
