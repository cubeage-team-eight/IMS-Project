import { useState } from "react";

const studentNames = ["Aditi Verma", "Sneha Joshi", "Rahul Das", "Meera Pillai"];

const criteria = [
  "Attendance",
  "Technical Skills",
  "Communication",
  "Teamwork",
  "Learning Ability",
  "Discipline",
];

const PerformanceEvaluation = () => {
  const [scores, setScores] = useState(criteria.map(() => 7));

  const setScore = (index, value) =>
    setScores((prev) => prev.map((s, i) => (i === index ? Number(value) : s)));

  const overall = (
    scores.reduce((sum, s) => sum + s, 0) / scores.length
  ).toFixed(1);

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Performance Evaluation
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Evaluate interns across six criteria
        </p>
      </div>


      {/* ================= EVALUATION CARD ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">

        {/* STUDENT PICKER */}
        <div className="flex items-center gap-4">

          <label className="font-mono text-xs tracking-[0.1em] text-slate-400 uppercase">
            Evaluating:
          </label>

          <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-orange-400">
            {studentNames.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>

        </div>


        {/* CRITERIA SLIDERS */}
        <div className="mt-8">
          {criteria.map((label, index) => (
            <Criterion
              key={label}
              label={label}
              score={scores[index]}
              onChange={(value) => setScore(index, value)}
            />
          ))}
        </div>


        {/* OVERALL + SUBMIT */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">

          <div>
            <p className="font-mono text-xs tracking-[0.1em] text-slate-400 uppercase">
              Overall Rating
            </p>
            <p className="text-3xl font-bold text-orange-500 mt-1">
              {overall}
              <span className="text-lg text-slate-300">/10</span>
            </p>
          </div>

          <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors">
            Submit Evaluation
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
        {score}/10
      </span>

    </div>

    <input
      type="range"
      min="1"
      max="10"
      value={score}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-1.5 rounded-full bg-slate-200 appearance-none cursor-pointer accent-orange-500"
    />

    <div className="flex justify-between font-mono text-xs text-slate-300 mt-2">
      <span>1</span>
      <span>5</span>
      <span>10</span>
    </div>

  </div>
);

export default PerformanceEvaluation;
