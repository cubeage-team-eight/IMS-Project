const studentNames = ["Aditi Verma", "Sneha Joshi", "Rahul Das", "Meera Pillai"];

const recommendations = [
  "Highly Recommended",
  "Recommended",
  "Not Recommended",
];

const FeedbackForm = () => {
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

        {/* SELECTS */}
        <div className="grid grid-cols-2 gap-10">

          <Field label="Select Student">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-orange-400">
              {studentNames.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </Field>

          <Field label="Recommendation">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-orange-400">
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
              placeholder="Rate and comment on technical skills demonstrated..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 placeholder:text-slate-400 outline-none focus:border-orange-400 resize-none"
            />
          </Field>
        </div>


        {/* SUBMIT */}
        <button className="w-full mt-8 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition-colors">
          Submit Feedback
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
