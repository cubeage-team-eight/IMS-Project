// import React from 'react';

// const MyTasks = () => {
//   return (
//     <div className="space-y-6 max-w-6xl">
      
//       {/* Header section */}
//       <div>
//         <h1 className="text-xl font-semibold">My Tasks</h1>
//         <p className="text-slate-400 text-sm mt-1">Tasks assigned by Dr. Arun Patel</p>
//       </div>

//       <div className="space-y-4">
        
//         {/* Task 1 */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-6 relative">
//           <div className="absolute top-6 right-6">
//             <span className="bg-violet-100 text-violet-600 text-xs font-semibold px-3 py-1 rounded-full">
//               In Progress
//             </span>
//           </div>
          
//           <h3 className="font-semibold text-slate-900 mb-1">Build REST API for user authentication</h3>
          
//           <div className="flex items-center gap-3 mb-4">
//             <span className="text-slate-400 text-xs font-mono">Due: 02 Aug 2025</span>
//             <span className="bg-red-100 text-red-600 text-[10px] font-semibold px-2 py-0.5 rounded">
//               High Priority
//             </span>
//           </div>
          
//           <p className="text-slate-500 text-sm mb-6 max-w-3xl">
//             Implement JWT-based authentication with bcrypt password hashing using Express.js and MongoDB.
//           </p>
          
//           <button className="bg-violet-500 hover:bg-violet-600 text-white font-medium text-sm px-6 py-2 rounded-lg transition-colors">
//             Mark as Completed
//           </button>
//         </div>

//         {/* Task 2 */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-6 relative">
//           <div className="absolute top-6 right-6">
//             <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
//               Pending
//             </span>
//           </div>
          
//           <h3 className="font-semibold text-slate-900 mb-1">Deploy app to Vercel with CI/CD pipeline</h3>
          
//           <div className="flex items-center gap-3 mb-4">
//             <span className="text-slate-400 text-xs font-mono">Due: 10 Aug 2025</span>
//             <span className="bg-orange-100 text-orange-600 text-[10px] font-semibold px-2 py-0.5 rounded">
//               Medium Priority
//             </span>
//           </div>
          
//           <p className="text-slate-500 text-sm mb-6 max-w-3xl">
//             Set up GitHub Actions workflow and configure Vercel deployment with environment variables.
//           </p>
          
//           <button className="bg-violet-100 hover:bg-violet-200 text-violet-600 font-medium text-sm px-6 py-2 rounded-lg transition-colors">
//             Start Task
//           </button>
//         </div>

//         {/* Task 3 */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-6 relative">
//           <div className="absolute top-6 right-6">
//             <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
//               Pending
//             </span>
//           </div>
          
//           <h3 className="font-semibold text-slate-900 mb-1">Write API documentation using Swagger</h3>
          
//           <div className="flex items-center gap-3 mb-4">
//             <span className="text-slate-400 text-xs font-mono">Due: 12 Aug 2025</span>
//             <span className="bg-yellow-100 text-yellow-700 text-[10px] font-semibold px-2 py-0.5 rounded">
//               Low Priority
//             </span>
//           </div>
          
//           <p className="text-slate-500 text-sm mb-6 max-w-3xl">
//             Document all API endpoints with request/response schemas and authentication requirements.
//           </p>
          
//           <button className="bg-violet-100 hover:bg-violet-200 text-violet-600 font-medium text-sm px-6 py-2 rounded-lg transition-colors">
//             Start Task
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MyTasks;


import React, { useEffect, useState } from 'react';
import { studentService } from '../../services/student.service';

const priorityStyle = {
  HIGH: "bg-red-100 text-red-600",
  MEDIUM: "bg-orange-100 text-orange-600",
  LOW: "bg-yellow-100 text-yellow-700",
};

const statusStyle = {
  ASSIGNED: "bg-slate-100 text-slate-600",
  IN_PROGRESS: "bg-violet-100 text-violet-600",
  SUBMITTED: "bg-blue-100 text-blue-600",
  REVISION_REQUIRED: "bg-red-100 text-red-600",
  COMPLETED: "bg-emerald-100 text-emerald-700",
};

const statusLabelMap = {
  ASSIGNED: "Pending",
  IN_PROGRESS: "In Progress",
  SUBMITTED: "Submitted",
  REVISION_REQUIRED: "Revision Required",
  COMPLETED: "Completed",
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actioningId, setActioningId] = useState(null);

  const [submitModalTask, setSubmitModalTask] = useState(null);
  const [submissionText, setSubmissionText] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await studentService.getMyTasks();
      setTasks(res.data || []);
    } catch (err) {
      console.error("Load tasks error:", err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleStartTask = async (taskId) => {
    setActioningId(taskId);
    try {
      await studentService.startTask(taskId);
      await fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to start task");
    } finally {
      setActioningId(null);
    }
  };

  const openSubmitModal = (task) => {
    setSubmitModalTask(task);
    setSubmissionText("");
  };

  const handleSubmitTask = async () => {
    if (!submissionText.trim()) {
      alert("Please enter your submission before submitting");
      return;
    }

    setActioningId(submitModalTask.id);
    try {
      await studentService.submitTask(submitModalTask.id, submissionText);
      setSubmitModalTask(null);
      await fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to submit task");
    } finally {
      setActioningId(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading tasks...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">My Tasks</h1>
        <p className="text-slate-400 text-sm mt-1">Tasks assigned to you by your mentor</p>
      </div>

      {tasks.length === 0 ? (
        <p className="text-slate-400 text-sm">No tasks assigned yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-2xl border border-slate-200 p-6 relative">

              <div className="absolute top-6 right-6">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyle[task.status]}`}>
                  {statusLabelMap[task.status] || task.status}
                </span>
              </div>

              <h3 className="font-semibold text-slate-900 mb-1">{task.title}</h3>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-slate-400 text-xs font-mono">Due: {formatDate(task.dueDate)}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${priorityStyle[task.priority]}`}>
                  {task.priority} Priority
                </span>
              </div>

              <p className="text-slate-500 text-sm mb-6 max-w-3xl">
                {task.description}
              </p>

              {task.status === "REVISION_REQUIRED" && task.mentorFeedback && (
                <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-4">
                  <p className="text-xs text-red-500 font-semibold mb-1">Mentor Feedback:</p>
                  <p className="text-sm text-red-600">{task.mentorFeedback}</p>
                </div>
              )}

              {task.status === "ASSIGNED" && (
                <button
                  onClick={() => handleStartTask(task.id)}
                  disabled={actioningId === task.id}
                  className="bg-violet-100 hover:bg-violet-200 text-violet-600 font-medium text-sm px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {actioningId === task.id ? "Starting..." : "Start Task"}
                </button>
              )}

              {(task.status === "IN_PROGRESS" || task.status === "REVISION_REQUIRED") && (
                <button
                  onClick={() => openSubmitModal(task)}
                  className="bg-violet-500 hover:bg-violet-600 text-white font-medium text-sm px-6 py-2 rounded-lg transition-colors"
                >
                  Submit Task
                </button>
              )}

              {task.status === "SUBMITTED" && (
                <p className="text-slate-400 text-sm italic">Awaiting mentor review</p>
              )}

              {task.status === "COMPLETED" && (
                <p className="text-emerald-600 text-sm font-medium">✓ Completed</p>
              )}

            </div>
          ))}
        </div>
      )}


      {/* SUBMIT MODAL */}
      {submitModalTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">

            <h2 className="text-lg font-semibold mb-1">Submit Task</h2>
            <p className="text-slate-400 text-sm mb-4">{submitModalTask.title}</p>

            <textarea
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              rows={5}
              placeholder="Describe what you've done, paste links, notes, etc."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setSubmitModalTask(null)}
                className="px-4 py-2 text-sm text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTask}
                disabled={actioningId === submitModalTask.id}
                className="bg-violet-500 hover:bg-violet-600 text-white text-sm px-5 py-2 rounded-lg disabled:opacity-50"
              >
                {actioningId === submitModalTask.id ? "Submitting..." : "Submit"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyTasks;