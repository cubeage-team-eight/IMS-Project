// const studentNames = ["Aditi Verma", "Sneha Joshi", "Rahul Das", "Meera Pillai"];

// const recommendations = [
//   "Highly Recommended",
//   "Recommended",
//   "Not Recommended",
// ];

// const FeedbackForm = () => {
//   return (
//     <div className="space-y-6">

//       {/* ================= HEADER ================= */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">
//           Submit Intern Feedback
//         </h1>
//         <p className="text-slate-400 text-sm mt-1">
//           Provide final performance feedback and recommendations
//         </p>
//       </div>


//       {/* ================= FORM CARD ================= */}
//       <div className="bg-white rounded-2xl border border-slate-200 p-6">

//         {/* SELECTS */}
//         <div className="grid grid-cols-2 gap-10">

//           <Field label="Select Student">
//             <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-orange-400">
//               {studentNames.map((name) => (
//                 <option key={name}>{name}</option>
//               ))}
//             </select>
//           </Field>

//           <Field label="Recommendation">
//             <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-orange-400">
//               {recommendations.map((option) => (
//                 <option key={option}>{option}</option>
//               ))}
//             </select>
//           </Field>

//         </div>


//         {/* PERFORMANCE SUMMARY */}
//         <div className="mt-6">
//           <Field label="Performance Summary">
//             <textarea
//               rows={5}
//               placeholder="Describe the intern's overall performance, strengths, and areas for improvement..."
//               className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 placeholder:text-slate-400 outline-none focus:border-orange-400 resize-none"
//             />
//           </Field>
//         </div>


//         {/* TECHNICAL PROFICIENCY */}
//         <div className="mt-6">
//           <Field label="Technical Proficiency">
//             <textarea
//               rows={2}
//               placeholder="Rate and comment on technical skills demonstrated..."
//               className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 placeholder:text-slate-400 outline-none focus:border-orange-400 resize-none"
//             />
//           </Field>
//         </div>


//         {/* SUBMIT */}
//         <button className="w-full mt-8 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition-colors">
//           Submit Feedback
//         </button>

//       </div>

//     </div>
//   );
// };


// /* ================= COMPONENTS ================= */

// const Field = ({ label, children }) => (
//   <div>

//     <label className="block font-mono text-xs tracking-[0.1em] text-slate-400 uppercase mb-2">
//       {label}
//     </label>

//     {children}

//   </div>
// );

// export default FeedbackForm;


import { useEffect, useState } from "react";
import { mentorService } from "../../services/mentor.service";

const recommendations = [
  "Highly Recommended",
  "Recommended",
  "Not Recommended",
];

const FeedbackForm = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [recommendation, setRecommendation] = useState(recommendations[0]);
  const [summary, setSummary] = useState("");
  const [technicalNotes, setTechnicalNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await mentorService.getMyStudents();
        const list = res.data || [];
        setStudents(list);
        if (list.length > 0) setSelectedStudentId(list[0].id);
      } catch (err) {
        console.error("Load students error:", err);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    setError("");
    setSuccessMsg("");

    if (!selectedStudentId || !summary.trim()) {
      setError("Please select a student and add a performance summary");
      return;
    }

    setSubmitting(true);

    const remarks = `Recommendation: ${recommendation}\n\nPerformance Summary: ${summary}\n\nTechnical Proficiency: ${technicalNotes}`;

    try {
      await mentorService.createEvaluation({
        studentId: selectedStudentId,
        technicalSkills: 3,
        communicationSkills: 3,
        punctuality: 3,
        teamwork: 3,
        remarks,
        isFinal: true,
      });

      setSuccessMsg("Final feedback submitted successfully!");
      setSummary("");
      setTechnicalNotes("");
    } catch (err) {
      console.error("Submit feedback error:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to submit feedback"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading...</div>;
  }

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Submit Intern Feedback
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Provide final performance feedback and recommendations
        </p>
      </div>


      {/* ================= FORM CARD ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMsg && <p className="text-emerald-600 text-sm mb-4">{successMsg}</p>}

        {/* SELECTS */}
        <div className="grid grid-cols-2 gap-10">

          <Field label="Select Student">
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-orange-400"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName || ""}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Recommendation">
            <select
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-orange-400"
            >
              {recommendations.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>

        </div>


        {/* PERFORMANCE SUMMARY */}
        <div className="mt-6">
          <Field label="Performance Summary">
            <textarea
              rows={5}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe the intern's overall performance, strengths, and areas for improvement..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 placeholder:text-slate-400 outline-none focus:border-orange-400 resize-none"
            />
          </Field>
        </div>


        {/* TECHNICAL PROFICIENCY */}
        <div className="mt-6">
          <Field label="Technical Proficiency">
            <textarea
              rows={2}
              value={technicalNotes}
              onChange={(e) => setTechnicalNotes(e.target.value)}
              placeholder="Rate and comment on technical skills demonstrated..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 placeholder:text-slate-400 outline-none focus:border-orange-400 resize-none"
            />
          </Field>
        </div>


        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full mt-8 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>

      </div>

    </div>
  );
};


/* ================= COMPONENTS ================= */

const Field = ({ label, children }) => (
  <div>
    <label className="block font-mono text-xs tracking-[0.1em] text-slate-400 uppercase mb-2">
      {label}
    </label>
    {children}
  </div>
);

export default FeedbackForm;