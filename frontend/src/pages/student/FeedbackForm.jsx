import React from 'react';

const FeedbackForm = () => {
  // SVG for filled star
  const StarFilled = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  // SVG for empty star
  const StarEmpty = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-200" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">Submit Feedback</h1>
        <p className="text-slate-400 text-sm mt-1">Share your internship experience and suggestions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mentor Rating */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="font-semibold mb-4 text-slate-900">Mentor Rating</h3>
          
          <div className="flex items-center gap-1 mb-6 cursor-pointer">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarEmpty />
          </div>
          
          <textarea 
            placeholder="How was your mentorship experience? What did you like or what could be improved?" 
            rows="4"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-sm outline-none focus:border-violet-500 focus:bg-white focus:ring-1 focus:ring-violet-500 resize-none text-slate-600 placeholder:text-slate-400"
          ></textarea>
        </div>

        {/* Company Rating */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="font-semibold mb-4 text-slate-900">Company Rating</h3>
          
          <div className="flex items-center gap-1 mb-6 cursor-pointer">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarEmpty />
          </div>
          
          <textarea 
            placeholder="How was the overall internship program at the company?" 
            rows="4"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-sm outline-none focus:border-violet-500 focus:bg-white focus:ring-1 focus:ring-violet-500 resize-none text-slate-600 placeholder:text-slate-400"
          ></textarea>
        </div>

        {/* Suggestions for Improvement */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="font-semibold mb-4 text-slate-900">Suggestions for Improvement</h3>
          
          <textarea 
            placeholder="Any suggestions for improving the internship program for future students..." 
            rows="4"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-sm outline-none focus:border-violet-500 focus:bg-white focus:ring-1 focus:ring-violet-500 resize-none text-slate-600 placeholder:text-slate-400 mb-6"
          ></textarea>
          
          <button className="bg-violet-500 hover:bg-violet-600 text-white font-medium px-8 py-3 rounded-lg transition-colors">
            Submit Feedback
          </button>
        </div>

      </div>

    </div>
  );
};

export default FeedbackForm;
