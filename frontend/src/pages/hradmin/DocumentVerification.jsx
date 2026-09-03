import React from 'react'

import { useState } from "react";
import { Check, X } from "lucide-react";

const initialDocuments = [
  {
    id: 1,
    name: "Aditi Verma",
    college: "VIT Vellore",
    docType: "NOC Letter",
    date: "28 Jul 2025",
  },
  {
    id: 2,
    name: "Vikram Singh",
    college: "NIT Trichy",
    docType: "Bonafide Certificate",
    date: "27 Jul 2025",
  },
  {
    id: 3,
    name: "Sneha Joshi",
    college: "BITS Pilani",
    docType: "PAN Card",
    date: "27 Jul 2025",
  },
  {
    id: 4,
    name: "Rahul Das",
    college: "Manipal Institute",
    docType: "College ID",
    date: "26 Jul 2025",
  },
];

function Avatar({ name }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-400">
      {initial}
    </div>
  );
}

function PendingDocuments() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [decisions, setDecisions] = useState({});

  const remaining = documents.filter((doc) => !decisions[doc.id]).length;

  const handleDecision = (id, decision) => {
    setDecisions((prev) => ({ ...prev, [id]: decision }));
  };

  return (
    <div className="min-h-screen w-full mt-4">
      <div className=" mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-200  px-4 py-4 sm:px-6">
          <span className="text-xs font-semibold tracking-wider text-slate-400">
            PENDING DOCUMENTS
          </span>
          <span className="rounded-full bg-amber-200/70 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            {remaining} remaining
          </span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 ">
          {documents.map((doc, idx) => {
            const decision = decisions[doc.id];
            return (
              <div
                key={doc.id}
                className="flex flex-col gap-3 px-4 py-6 transition-colors sm:flex-row sm:items-center sm:gap-4 sm:px-6 bg-white"
                
              >
                {/* Identity row */}
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Avatar name={doc.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {doc.name}
                    </p>
                    <p className="truncate text-sm text-slate-400">
                      {doc.college}
                    </p>
                  </div>
                  {/* Doc badge stays inline on mobile, next to name block */}
                  <span className="shrink-0 rounded-md bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 sm:hidden">
                    {doc.docType}
                  </span>
                </div>

                {/* Meta row (desktop only inline, mobile shown separately) */}
                <span className="hidden shrink-0 rounded-md bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 sm:inline-block">
                  {doc.docType}
                </span>

                <div className="flex items-center justify-between gap-3 sm:contents">
                  <span className="text-xs text-slate-400 sm:w-24 sm:shrink-0 sm:text-right">
                    {doc.date}
                  </span>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleDecision(doc.id, "approved")}
                      disabled={!!decision}
                      className={`inline-flex items-center gap-1 rounded-md px-3 py-2 sm:py-1.5 text-xs font-medium transition-colors ${
                        decision === "approved"
                          ? "bg-emerald-500 text-white"
                          : decision === "rejected"
                          ? "cursor-not-allowed bg-slate-100 text-slate-300"
                          : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      }`}
                    >
                      <Check size={14} strokeWidth={2.5} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecision(doc.id, "rejected")}
                      disabled={!!decision}
                      className={`inline-flex items-center gap-1 rounded-md px-3 py-2 sm:py-1.5 text-xs font-medium transition-colors ${
                        decision === "rejected"
                          ? "bg-red-500 text-white"
                          : decision === "approved"
                          ? "cursor-not-allowed bg-slate-100 text-slate-300"
                          : "bg-red-50 text-red-500 hover:bg-red-100"
                      }`}
                    >
                      <X size={14} strokeWidth={2.5} />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
const StatCard = ({
  title,
  value,
  valueColor = "text-slate-900",
}) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">

    <p className="text-[13px] text-slate-400">
      {title}
    </p>

    <h2 className={`text-3xl font-bold mt-3 ${valueColor}`}>
      {value}
    </h2>

   

  </div>
);

function DocumentVerification() {
  return (
    <div className=" xl:p-6 min-h-screen">
        <div className='flex justify-between items-center'>
                <h1 className='text-xl font-medium'>Document Verification</h1>
                
            </div>
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
            <StatCard
                title="Pending Review"
                value= "7"
            />
             <StatCard
                title="Approved"
                value= "312"
                valueColor='text-green-500'
            />
             <StatCard
                title="Rejected"
                value= "4"
                valueColor='text-red-400'
            />
             <StatCard
                title="Total docs"
                value= "323"
                
            />
        </div>
        <PendingDocuments/>
    </div>
  )
}

export default DocumentVerification