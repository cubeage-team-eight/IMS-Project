import React from 'react'

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
function Batches() {
  return (
    <div className="p-6 min-h-screen">
         <div className='flex justify-between items-center'>
                <h1 className='text-xl font-medium'>Internship Batches</h1>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md'> + Create Batch</button>
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
    </div>
  )
}

export default Batches