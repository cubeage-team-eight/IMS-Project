import React from 'react'

function ProjectWorkflow() {

    const Items = [
    { id: "01", label: "Super Admin creats HR/Admin" },
    { id: "02", label: "Add Colleges to platform" },
    { id: "03", label: "Create Internship Batches" },
    { id: "04", label: "Add Mentors & assign departments" },
    { id: "05", label: "Student Registration & document upload" },
    { id: "06", label: "Document Verification" },
    { id: "07", label: "Assign Mentor & Batch" },
    { id: "08", label: "Internship commences" },
    { id: "09", label: "Daily QR Attendance" },
    { id: "10", label: "Task assigned by mentor" },
    { id: "11", label: "Daily work Report submission" },
    { id: "12", label: "Mentor Review & feedback" },
    { id: "13", label: "Performance Evaluation" },
    { id: "14", label: "Leave management" },
    { id: "15", label: "Intership Completion" },
    { id: "16", label: "Certificate Generation" },
    { id: "17", label: "Feedback Submission" },
    { id: "18", label: "Report of Intern" },
  ];

  return (
    <div className="bg-slate-900 text-white w-full pl-0 md:pl-8 lg:pl-24 cdoverflow-hidden">
        <div className="font-serif px-4 sm:px-6 md:px-10 py-6 md:py-10">
        <span className=" text-lg text-orange-400 font-mono text-sm">
          05-PROJECT WORKFLOW</span>
        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl leading-tight ">
          End-to-End <br/>
        <i>internship lifecycle</i> </h1>
        </div>
      <div className="flex flex-col min-w-0 gap-2 relative pl-8 sm:pl-10 pr-4 sm:pr-6 pb-8">
       
        <div className="absolute left-[49px] sm:left-[65.5px] w-[0.5px] h-full bg-orange-400/20"/>


        {Items.map((item, index) => (
          <div
            key={item.id}
            className="group flex items-start sm:items-center gap-3 sm:gap-6 md:gap-10 px-2 sm:px-3 py-2 m-1 sm:m-2 rounded min-w-0"
          >
            
            <div
             className={`shrink-0 mt-1.5 sm:mt-0 rounded-full w-3 h-3 sm:w-[12px] sm:h-[12px] z-20 transition-transform duration-100 ease-in-out group-hover:scale-125 ${
                index === 0 || index === 17 ? "bg-orange-400" : "bg-slate-500"
              }`}
            />

            
            <span className="min-w-0 flex-1 text-xs sm:text-sm text-slate-400 transition-transform duration-150 group-hover:translate-x-2 break-words">
              <span className="text-slate-500/50 font-mono">{item.id}</span> 
              <span className="mx-2 text-mono">{item.label}</span>
              <div class=" absolute my-6 w-3xs md:w-xl lg:w-7xl h-px bg-slate-700/50"/>
            </span>

            
               
          </div>
          
        ))}
        
      </div>
    </div>
  )
}

export default ProjectWorkflow