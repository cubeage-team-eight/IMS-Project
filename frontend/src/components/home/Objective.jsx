import React from "react";

/* ================================================================= */
/*                          SECTION DATA                             */
/* ================================================================= */

const OBJECTIVES = [
  "Automate internship management end-to-end",
  "Maintain student records fully digitally",
  "Eliminate paperwork and manual processes",
  "Enable QR-based attendance tracking",
  "Assign and monitor internship tasks",
  "Evaluate intern performance systematically",
  "Generate certificates automatically with QR verification",
  "Produce reports and analytics on demand",
];

/* ================================================================= */
/*                            SECTION                                */
/* ================================================================= */

function Objective() {
  return (
    <section className="bg-[#FAFAF8] px-6 py-20 font-['Plus_Jakarta_Sans',sans-serif] sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-5 lg:pt-1">
          <p className="font-['JetBrains_Mono',monospace] text-[14px] font-bold uppercase tracking-[0.18em] text-[#C2761A]">
            02 — Objectives
          </p>

          <h2 className="mt-7 font-['Source_Serif_4',Georgia,serif] text-[42px] font-bold leading-[1.12] tracking-[-0.01em] text-[#0F1E2E] sm:text-[52px] lg:text-[58px]">
            What the
            <br />
            <em className="font-bold italic">system</em> solves
          </h2>

          <p className="mt-8 max-w-[430px] text-[17px] leading-[1.75] text-slate-500">
            The IMS eliminates manual processes by providing a secure, scalable
            platform where all stakeholders collaborate throughout the internship
            period.
          </p>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 border-t border-slate-200 sm:grid-cols-2">
            {OBJECTIVES.map((text, i) => (
              <ObjectiveCell
                key={text}
                number={String(i + 1).padStart(2, "0")}
                text={text}
                /* vertical rule only on the left-hand column */
                dividerRight={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================= */
/*                         OBJECTIVE CELL                            */
/* ================================================================= */

const ObjectiveCell = ({ number, text, dividerRight }) => (
  <div
    className={`flex items-start gap-6 border-b border-slate-200 px-1 py-7 sm:px-6 ${
      dividerRight ? "sm:border-r" : ""
    }`}
  >
    <span className="mt-[3px] shrink-0 font-['JetBrains_Mono',monospace] text-[14px] text-slate-300">
      {number}
    </span>

    <p className="text-[17px] leading-[1.6] text-slate-700">{text}</p>
  </div>
);

export default Objective;
