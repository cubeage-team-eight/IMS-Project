// const requests = [
//   { name: "Rahul Das",    type: "Medical Leave",  from: "01 Aug 2025", to: "02 Aug 2025", reason: "Doctor appointment and recovery", status: "Pending" },
//   { name: "Meera Pillai", type: "Personal Leave", from: "05 Aug 2025", to: "05 Aug 2025", reason: "Family function",                 status: "Pending" },
//   { name: "Sneha Joshi",  type: "Sick Leave",     from: "15 Jul 2025", to: "16 Jul 2025", reason: "Fever and rest advised",          status: "Approved" },
// ];

// const statusStyle = {
//   Pending: "bg-amber-50 text-amber-600",
//   Approved: "bg-emerald-100 text-emerald-700",
//   Rejected: "bg-red-100 text-red-600",
// };

// const LeaveApprovals = () => {
//   return (
//     <div className="space-y-6">

//       {/* ================= HEADER ================= */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">
//           Leave Requests
//         </h1>
//         <p className="text-slate-400 text-sm mt-1">
//           Review and approve leave applications from your interns
//         </p>
//       </div>


//       {/* ================= REQUEST LIST ================= */}
//       <div className="space-y-4">
//         {requests.map((request) => (
//           <LeaveCard key={request.name} {...request} />
//         ))}
//       </div>

//     </div>
//   );
// };


// /* ================= COMPONENTS ================= */

// const LeaveCard = ({ name, type, from, to, reason, status }) => (
//   <div className="bg-white rounded-2xl border border-slate-200 p-6">

//     {/* TOP ROW */}
//     <div className="flex items-start justify-between gap-6">

//       <div>

//         <div className="flex items-center gap-3">

//           <h3 className="font-semibold text-slate-900">
//             {name}
//           </h3>

//           <span className="font-mono text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
//             {type}
//           </span>

//         </div>

//         <p className="font-mono text-sm text-slate-400 mt-2">
//           {from} {"\u2192"} {to}
//         </p>

//       </div>

//       <span className={`font-mono text-xs px-3 py-1.5 rounded-md whitespace-nowrap ${statusStyle[status]}`}>
//         {status}
//       </span>

//     </div>


//     {/* REASON */}
//     <div className="mt-4 bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
//       <p className="text-sm text-slate-600">
//         {"\u201c"}{reason}{"\u201d"}
//       </p>
//     </div>


//     {/* ACTIONS */}
//     {status === "Pending" && (

//       <div className="mt-4 grid grid-cols-2 gap-5">

//         <button className="bg-green-100 hover:bg-green-200 text-green-800 font-medium py-3 rounded-lg transition-colors">
//           {"\u2713"} Approve
//         </button>

//         <button className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 rounded-lg transition-colors">
//           {"\u2717"} Reject
//         </button>

//       </div>

//     )}

//   </div>
// );

// export default LeaveApprovals;


import { useEffect, useState } from "react";
import { mentorService } from "../../services/mentor.service";

const leaveTypeLabels = {
  CASUAL: "Casual Leave",
  SICK: "Sick Leave",
  PERSONAL: "Personal Leave",
  OTHER: "Other",
};

const statusStyle = {
  PENDING: "bg-amber-50 text-amber-600",
  APPROVED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-600",
  CANCELLED: "bg-slate-100 text-slate-500",
};

const LeaveApprovals = () => {
  const [leaves, setLeaves] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actioningId, setActioningId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [leavesRes, studentsRes] = await Promise.all([
        mentorService.getLeavesOfMyStudents(),
        mentorService.getMyStudents(),
      ]);

      setLeaves(leavesRes.data || []);
      setStudents(studentsRes.data || []);
    } catch (err) {
      console.error("LeaveApprovals load error:", err);
      setError("Failed to load leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStudentName = (userId) => {
    const s = students.find((s) => s.userId === userId);
    return s ? `${s.firstName} ${s.lastName || ""}`.trim() : "Unknown";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleReview = async (leaveId, decision) => {
    setActioningId(leaveId);

    try {
      let rejectionReason = null;

      if (decision === "REJECTED") {
        rejectionReason = window.prompt("Enter rejection reason:");
        if (!rejectionReason) {
          setActioningId(null);
          return;
        }
      }

      await mentorService.reviewLeave(leaveId, {
        decision,
        rejectionReason,
      });

      await fetchData();
    } catch (err) {
      console.error("Review leave error:", err);
      alert(err.response?.data?.message || err.message || "Action failed");
    } finally {
      setActioningId(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading leave requests...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Leave Requests
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Review and approve leave applications from your interns
        </p>
      </div>


      {/* ================= REQUEST LIST ================= */}
      {leaves.length === 0 ? (
        <p className="text-slate-400 text-sm">No leave requests yet.</p>
      ) : (
        <div className="space-y-4">
          {leaves.map((request) => (
            <LeaveCard
              key={request.id}
              name={getStudentName(request.userId)}
              type={leaveTypeLabels[request.leaveType] || request.leaveType}
              from={formatDate(request.startDate)}
              to={formatDate(request.endDate)}
              reason={request.reason}
              status={request.status}
              onApprove={() => handleReview(request.id, "APPROVED")}
              onReject={() => handleReview(request.id, "REJECTED")}
              isActioning={actioningId === request.id}
            />
          ))}
        </div>
      )}

    </div>
  );
};


/* ================= COMPONENTS ================= */

const LeaveCard = ({
  name,
  type,
  from,
  to,
  reason,
  status,
  onApprove,
  onReject,
  isActioning,
}) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6">

    {/* TOP ROW */}
    <div className="flex items-start justify-between gap-6">

      <div>

        <div className="flex items-center gap-3">

          <h3 className="font-semibold text-slate-900">
            {name}
          </h3>

          <span className="font-mono text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
            {type}
          </span>

        </div>

        <p className="font-mono text-sm text-slate-400 mt-2">
          {from} {"\u2192"} {to}
        </p>

      </div>

      <span className={`font-mono text-xs px-3 py-1.5 rounded-md whitespace-nowrap ${statusStyle[status]}`}>
        {status}
      </span>

    </div>


    {/* REASON */}
    <div className="mt-4 bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
      <p className="text-sm text-slate-600">
        {"\u201c"}{reason}{"\u201d"}
      </p>
    </div>


    {/* ACTIONS */}
    {status === "PENDING" && (

      <div className="mt-4 grid grid-cols-2 gap-5">

        <button
          onClick={onApprove}
          disabled={isActioning}
          className="bg-green-100 hover:bg-green-200 text-green-800 font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {"\u2713"} Approve
        </button>

        <button
          onClick={onReject}
          disabled={isActioning}
          className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {"\u2717"} Reject
        </button>

      </div>

    )}

  </div>
);

export default LeaveApprovals;