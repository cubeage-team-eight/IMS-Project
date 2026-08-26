import React from 'react'

const colleges = [
  {
    name: "BITS Pilani",
    code: "BITS-PIL",
    location: "Pilani, Rajasthan",
    contact: "Dr. Suresh Rao",
    interns: 142,
    status: "Active",
  },
  {
    name: "NIT Trichy",
    code: "NIT-TRI",
    location: "Tiruchirappalli, Tamil Nadu",
    contact: "Prof. Anitha Kumar",
    interns: 118,
    status: "Active",
  },
  {
    name: "VIT Vellore",
    code: "VIT-VEL",
    location: "Vellore, Tamil Nadu",
    contact: "Mr. Ramesh V",
    interns: 97,
    status: "Active",
  },
  {
    name: "Manipal Institute",
    code: "MAHE-MAN",
    location: "Manipal, Karnataka",
    contact: "Dr. Preethi Shetty",
    interns: 84,
    status: "Active",
  },
  {
    name: "SRM University",
    code: "SRM-CHN",
    location: "Chennai, Tamil Nadu",
    contact: "Ms. Divya R",
    interns: 76,
    status: "Inactive",
  },
];

function StatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
        isActive
          ? "bg-emerald-100 text-emerald-700"
          : "bg-rose-100 text-rose-600"
      }`}
    >
      {status}
    </span>
  );
}

function CollegeTable() {
  return (
    
      <div className="mx-auto mt-6 max-w-6xl overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                College
              </th>
              <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                Code
              </th>
              <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                Location
              </th>
              <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                Contact Person
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                Interns
              </th>
              <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college, idx) => (
              <tr
                key={college.code}
                className={`${
                  idx % 2 === 1 ? "bg-slate-50/60" : "bg-white"
                } border-b border-slate-50 last:border-0`}
              >
                <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                  {college.name}
                </td>
                <td className="px-6 py-4 font-mono text-sm text-slate-400">
                  {college.code}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {college.location}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {college.contact}
                </td>
                <td className="px-6 py-4 text-right text-sm font-semibold text-slate-800">
                  {college.interns}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={college.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <button className="text-blue-500 hover:text-blue-700">
                      Edit
                    </button>
                    <button className="text-slate-500 hover:text-slate-700">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
}

function Colleges() {
  return (
    <div className="p-6 min-h-screen">
        <div className='flex justify-between'>
            <h1 className='text-xl font-medium'>College Management</h1>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'> + Add College</button>
        </div>
        <CollegeTable/>
    </div>
  )
}

export default Colleges