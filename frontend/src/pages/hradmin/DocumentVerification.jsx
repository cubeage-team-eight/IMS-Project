import React from 'react'

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
    <div className="p-6 min-h-screen">
        <div className='flex justify-between items-center'>
                <h1 className='text-xl font-medium'>Document Verification</h1>
                
            </div>
        <div className='grid grid-cols-4 gap-4 mt-6'>
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
    </div>
  )
}

export default DocumentVerification