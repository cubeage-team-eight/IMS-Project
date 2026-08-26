import React from 'react';

const MyTasks = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">My Tasks</h1>
        <p className="text-slate-400 text-sm mt-1">Tasks assigned by Dr. Arun Patel</p>
      </div>

      <div className="space-y-4">
        
        {/* Task 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 relative">
          <div className="absolute top-6 right-6">
            <span className="bg-violet-100 text-violet-600 text-xs font-semibold px-3 py-1 rounded-full">
              In Progress
            </span>
          </div>
          
          <h3 className="font-semibold text-slate-900 mb-1">Build REST API for user authentication</h3>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-slate-400 text-xs font-mono">Due: 02 Aug 2025</span>
            <span className="bg-red-100 text-red-600 text-[10px] font-semibold px-2 py-0.5 rounded">
              High Priority
            </span>
          </div>
          
          <p className="text-slate-500 text-sm mb-6 max-w-3xl">
            Implement JWT-based authentication with bcrypt password hashing using Express.js and MongoDB.
          </p>
          
          <button className="bg-violet-500 hover:bg-violet-600 text-white font-medium text-sm px-6 py-2 rounded-lg transition-colors">
            Mark as Completed
          </button>
        </div>

        {/* Task 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 relative">
          <div className="absolute top-6 right-6">
            <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
              Pending
            </span>
          </div>
          
          <h3 className="font-semibold text-slate-900 mb-1">Deploy app to Vercel with CI/CD pipeline</h3>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-slate-400 text-xs font-mono">Due: 10 Aug 2025</span>
            <span className="bg-orange-100 text-orange-600 text-[10px] font-semibold px-2 py-0.5 rounded">
              Medium Priority
            </span>
          </div>
          
          <p className="text-slate-500 text-sm mb-6 max-w-3xl">
            Set up GitHub Actions workflow and configure Vercel deployment with environment variables.
          </p>
          
          <button className="bg-violet-100 hover:bg-violet-200 text-violet-600 font-medium text-sm px-6 py-2 rounded-lg transition-colors">
            Start Task
          </button>
        </div>

        {/* Task 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 relative">
          <div className="absolute top-6 right-6">
            <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
              Pending
            </span>
          </div>
          
          <h3 className="font-semibold text-slate-900 mb-1">Write API documentation using Swagger</h3>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-slate-400 text-xs font-mono">Due: 12 Aug 2025</span>
            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-semibold px-2 py-0.5 rounded">
              Low Priority
            </span>
          </div>
          
          <p className="text-slate-500 text-sm mb-6 max-w-3xl">
            Document all API endpoints with request/response schemas and authentication requirements.
          </p>
          
          <button className="bg-violet-100 hover:bg-violet-200 text-violet-600 font-medium text-sm px-6 py-2 rounded-lg transition-colors">
            Start Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyTasks;
