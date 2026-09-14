// import { useState } from "react";

// const studentNames = ["Aditi Verma", "Sneha Joshi", "Rahul Das", "Meera Pillai"];

// const criteria = [
//   "Attendance",
//   "Technical Skills",
//   "Communication",
//   "Teamwork",
//   "Learning Ability",
//   "Discipline",
// ];

// const PerformanceEvaluation = () => {
//   const [scores, setScores] = useState(criteria.map(() => 7));

//   const setScore = (index, value) =>
//     setScores((prev) => prev.map((s, i) => (i === index ? Number(value) : s)));

//   const overall = (
//     scores.reduce((sum, s) => sum + s, 0) / scores.length
//   ).toFixed(1);

//   return (
//     <div className="space-y-6">

//       {/* ================= HEADER ================= */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">
//           Performance Evaluation
//         </h1>
//         <p className="text-slate-400 text-sm mt-1">
//           Evaluate interns across six criteria
//         </p>
//       </div>


//       {/* ================= EVALUATION CARD ================= */}
//       <div className="bg-white rounded-2xl border border-slate-200 p-6">

//         {/* STUDENT PICKER */}
//         <div className="flex items-center gap-4">

//           <label className="font-mono text-xs tracking-[0.1em] text-slate-400 uppercase">
//             Evaluating:
//           </label>

//           <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-orange-400">
//             {studentNames.map((name) => (
//               <option key={name}>{name}</option>
//             ))}
//           </select>

//         </div>


//         {/* CRITERIA SLIDERS */}
//         <div className="mt-8">
//           {criteria.map((label, index) => (
//             <Criterion
//               key={label}
//               label={label}
//               score={scores[index]}
//               onChange={(value) => setScore(index, value)}
//             />
//           ))}
//         </div>


//         {/* OVERALL + SUBMIT */}
//         <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">

//           <div>
//             <p className="font-mono text-xs tracking-[0.1em] text-slate-400 uppercase">
//               Overall Rating
//             </p>
//             <p className="text-3xl font-bold text-orange-500 mt-1">
//               {overall}
//               <span className="text-lg text-slate-300">/10</span>
//             </p>
//           </div>

//           <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors">
//             Submit Evaluation
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// };


// /* ================= COMPONENTS ================= */

// const Criterion = ({ label, score, onChange }) => (
//   <div className="mb-8 last:mb-0">

//     <div className="flex items-center justify-between mb-3">

//       <span className="text-slate-900">
//         {label}
//       </span>

//       <span className="font-mono text-sm font-semibold text-orange-500">
//         {score}/10
//       </span>

//     </div>

//     <input
//       type="range"
//       min="1"
//       max="10"
//       value={score}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full h-1.5 rounded-full bg-slate-200 appearance-none cursor-pointer accent-orange-500"
//     />

//     <div className="flex justify-between font-mono text-xs text-slate-300 mt-2">
//       <span>1</span>
//       <span>5</span>
//       <span>10</span>
//     </div>

//   </div>
// );

// export default PerformanceEvaluation;



import { useEffect, useState } from "react";
import { mentorService } from "../../services/mentor.service";

const criteria = [
  { key: "technicalSkills", label: "Technical Skills" },
  { key: "communicationSkills", label: "Communication" },
  { key: "punctuality", label: "Punctuality" },
  { key: "teamwork", label: "Teamwork" },
];

const PerformanceEvaluation = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [scores, setScores] = useState({
    technicalSkills: 3,
    communicationSkills: 3,
    punctuality: 3,
    teamwork: 3,
  });
  const [remarks, setRemarks] = useState("");
  const [isFinal, setIsFinal] = useState(false);

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

  const setScore = (key, value) => {
    setScores((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const overall = (
    Object.values(scores).reduce((sum, s) => sum + s, 0) / criteria.length
  ).toFixed(1);

  const handleSubmit = async () => {
    setError("");
    setSuccessMsg("");

    if (!selectedStudentId) {
      setError("Please select a student");
      return;
    }

    setSubmitting(true);

    try {
      await mentorService.createEvaluation({
        studentId: selectedStudentId,
        ...scores,
        remarks,
        isFinal,
      });

      setSuccessMsg("Evaluation submitted successfully!");
      setRemarks("");
      setIsFinal(false);
    } catch (err) {
      console.error("Submit evaluation error:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to submit evaluation"
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
          Performance Evaluation
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Evaluate interns across four criteria
        </p>
      </div>


      {/* ================= EVALUATION CARD ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMsg && <p className="text-emerald-600 text-sm mb-4">{successMsg}</p>}

        {/* STUDENT PICKER */}
        <div className="flex items-center gap-4">

          <label className="font-mono text-xs tracking-[0.1em] text-slate-400 uppercase">
            Evaluating:
          </label>

          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-orange-400"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName || ""}
              </option>
            ))}
          </select>

        </div>


        {/* CRITERIA SLIDERS */}
        <div className="mt-8">
          {criteria.map(({ key, label }) => (
            <Criterion
              key={key}
              label={label}
              score={scores[key]}
              onChange={(value) => setScore(key, value)}
            />
          ))}
        </div>


        {/* REMARKS */}
        <div className="mt-6">
          <label className="font-mono text-xs tracking-[0.1em] text-slate-400 uppercase">
            Remarks
          </label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 mt-2 text-sm"
            placeholder="Add remarks about this evaluation"
          />
        </div>

        {/* FINAL CHECKBOX */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="isFinal"
            checked={isFinal}
            onChange={(e) => setIsFinal(e.target.checked)}
            className="accent-orange-500"
          />
          <label htmlFor="isFinal" className="text-sm text-slate-500">
            Mark as final evaluation (enables certificate issuance)
          </label>
        </div>


        {/* OVERALL + SUBMIT */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">

          <div>
            <p className="font-mono text-xs tracking-[0.1em] text-slate-400 uppercase">
              Overall Rating
            </p>
            <p className="text-3xl font-bold text-orange-500 mt-1">
              {overall}
              <span className="text-lg text-slate-300">/5</span>
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Evaluation"}
          </button>

        </div>

      </div>

    </div>
  );
};


/* ================= COMPONENTS ================= */

const Criterion = ({ label, score, onChange }) => (
  <div className="mb-8 last:mb-0">

    <div className="flex items-center justify-between mb-3">

      <span className="text-slate-900">
        {label}
      </span>

      <span className="font-mono text-sm font-semibold text-orange-500">
        {score}/5
      </span>

    </div>

    <input
      type="range"
      min="1"
      max="5"
      value={score}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-1.5 rounded-full bg-slate-200 appearance-none cursor-pointer accent-orange-500"
    />

    <div className="flex justify-between font-mono text-xs text-slate-300 mt-2">
      <span>1</span>
      <span>3</span>
      <span>5</span>
    </div>

  </div>
);

export default PerformanceEvaluation;