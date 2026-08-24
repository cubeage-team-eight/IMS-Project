import React from 'react'

const mentors = [
    {
        initials: "AP",
        name: "Dr. Arun Patel",
        role: "Senior Engineer · Full Stack Development",
        empId: "EMP-0041",
        skills: ["React", "Node.js", "MongoDB"],
        internCount: 12,
    },
    {
        initials: "AP",
        name: "Dr. Arun Patel",
        role: "Senior Engineer · Full Stack Development",
        empId: "EMP-0067",
        skills: ["React", "Node.js", "MongoDB"],
        internCount: 12,
    },
    {
        initials: "AP",
        name: "Dr. Arun Patel",
        role: "Senior Engineer · Full Stack Development",
        empId: "EMP-0023",
        skills: ["React", "Node.js", "MongoDB"],
        internCount: 12,
    },
    {
        initials: "AP",
        name: "Dr. Arun Patel",
        role: "Senior Engineer · Full Stack Development",
        empId: "EMP-0089",
        skills: ["React", "Node.js", "MongoDB"],
        internCount: 12,
    },
]


function MentorCards({ initial, name, role, empId, skills, internCount }) {
    return (
        
        <div className="bg-white rounded-2xl shadow-sm p-5 w-full flex items-start justify-between">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-500 font-semibold text-sm">
                        {initial}
                    </span>
                </div>

              
                <div>
                    <h3 className="text-slate-900 font-semibold text-base leading-tight">
                        {name}
                    </h3>
                    <p className="text-slate-500 text-sm mt-0.5">
                        {role}
                    </p>
                    <p className="text-slate-300 text-xs font-medium tracking-wide mt-1">
                        {empId}
                    </p>

                   
                    <div className="flex flex-wrap gap-2 mt-3">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="bg-blue-50 text-blue-500 text-xs font-medium px-2.5 py-1 rounded-md"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            
            <div className="text-right flex-shrink-0 ml-4">
                <div className="text-blue-600 font-bold text-2xl leading-none">
                    {internCount}
                </div>
                <div className="text-slate-400 text-xs mt-1">Interns</div>
            </div>
        </div>
    )
}

function Mentorlist() {
    return (
        
        <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 '>
            {mentors.map((mentor) => (
                <MentorCards
                    key={mentor.empId}
                    initial={mentor.initials}
                    name={mentor.name}
                    role={mentor.role}
                    empId={mentor.empId}
                    skills={mentor.skills}
                    internCount={mentor.internCount}
                />
            ))}
        </div>
    )
}

function Mentors() {
    return (
        
        <div className=" p-6 min-h-screen">
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-medium'>Mentor Management</h1>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md'> + Add Mentor</button>
            </div>
            
            <Mentorlist />
        </div>
    )
}

export default Mentors