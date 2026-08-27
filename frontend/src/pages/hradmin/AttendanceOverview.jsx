import React from 'react'

import { useState } from "react";

const initialBatches = [
  { id: 1, name: "Batch 2025-Q1", attendance: 86 },
  { id: 2, name: "Batch 2025-Q2", attendance: 86 },
];

function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-blue-500 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function BatchAttendanceOverview() {
  const [batches] = useState(initialBatches);

  const handleExport = () => {
    console.log("Exporting report...");
  };

  return (
    <div className="w-full bg-slate-100 mt-6">
      <div className="mx-auto  rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-800">
            Batch Attendance Overview
          </h2>
          <button
            onClick={handleExport}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Export Report
          </button>
        </div>

        {/* Batches */}
        <div className="mt-6 flex flex-col divide-y divide-slate-100">
          {batches.map((batch) => (
            <div key={batch.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-700">
                  {batch.name}
                </span>
                <span className="text-xs text-slate-400">
                  {batch.attendance}% attendance
                </span>
              </div>
              <div className="mt-3">
                <ProgressBar value={batch.attendance} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const StatCard = ({
  title,
  total,
  current,
  valueColor = "text-slate-900",
}) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">

    <p className="text-[13px] text-slate-400">
      {title}
    </p>

    <h2 className={`text-3xl font-bold mt-3 ${valueColor}`}>
      {current}<span className="text-[15px] text-slate-400 font-thin"> / {total}</span>
    </h2>

   

  </div>
);
function AttendanceOverview() {
  return (
    <div className="p-4 min-h-screen">
        <div className="    ">
                <h1 className='text-xl font-medium'>Attendance Management</h1>
                <p className='text-slate-700/50'>Monitor and manage daily attendance across all batches</p>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <StatCard 
                title="Present Today"
                current="731"
                total="847"
                valueColor='text-green-400'
            />
             <StatCard 
                title="Absent Today"
                current="84"
                total="847"
                valueColor='text-red-400'
            />
             <StatCard 
                title="On Leave"
                current="31"
                total="847"
                valueColor='text-orange-400'
            />
        </div>
        <BatchAttendanceOverview/>
    </div>
  )
}

export default AttendanceOverview