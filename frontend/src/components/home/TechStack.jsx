const techStack = [
  { category: "Frontend", technologies: ["React.js", "Tailwind CSS", "Material UI", "Axios", "React Router"] },
  { category: "Backend", technologies: ["Node.js", "Express.js"] },
  { category: "Database", technologies: ["MongoDB", "MongoDB Atlas"] },
  { category: "Auth", technologies: ["JSON Web Token", "bcrypt"] },
  { category: "File Storage", technologies: ["Cloudinary", "ImageKit"] },
  { category: "Reports", technologies: ["ExcelJS", "PDFKit"] },
  { category: "Deployment", technologies: ["Vercel (Frontend)", "Render / Hostinger VPS"] },
];

/* Shared horizontal page padding — was the --page-pad variable */
const PAGE_PAD = "px-[clamp(24px,11vw,150px)]";

/* ================================================================= */
/*                              HERO                                 */
/* ================================================================= */

function TechStackHero() {
  return (
    <header
      className={`${PAGE_PAD} pb-[clamp(44px,6vw,74px)] pt-[clamp(56px,8vw,92px)]`}
    >
      <p className="mb-[22px] text-[12.5px] font-semibold tracking-[0.18em] text-[#e76d26]">
        11 — TECHNOLOGY STACK
      </p>

      <h1 className="font-['Playfair_Display',Georgia,serif] text-[clamp(38px,5vw,58px)] font-bold leading-[1.1] tracking-[-0.01em] text-[#f6f5f2]">
        MERN Stack
        <span className="block font-medium italic">architecture</span>
      </h1>
    </header>
  );
}

/* ================================================================= */
/*                           STACK ROW                               */
/* ================================================================= */

function TechStackRow({ category, technologies }) {
  return (
    <div
      role="listitem"
      className="flex flex-col items-start gap-2.5 border-b border-white/[0.08] py-[18px] first:border-t sm:flex-row sm:items-center sm:gap-[clamp(20px,4vw,48px)]"
    >
      <div className="text-[13.5px] tracking-[0.01em] text-[#6e7f96] sm:w-[200px] sm:shrink-0">
        {category}
      </div>

      <div className="flex flex-1 flex-wrap gap-2.5">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-md border border-white/[0.12] bg-white/[0.04] px-[15px] py-[9px] text-[13px] text-[#c9cedb] transition duration-150 hover:border-[#A1968A8C] hover:bg-[#E8912A14] hover:text-[#f6f5f2]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function TechStackTable() {
  return (
    <section
      role="list"
      className={`${PAGE_PAD} pb-[clamp(64px,8vw,96px)]`}
    >
      {techStack.map((row) => (
        <TechStackRow key={row.category} category={row.category} technologies={row.technologies} />
      ))}
    </section>
  );
}

/* ================================================================= */
/*                               CTA                                 */
/* ================================================================= */

function TechStackCTA() {
  return (
    <section
      className={`relative overflow-hidden border-t border-white/[0.08] bg-[#0e121f] text-center ${PAGE_PAD} py-[clamp(80px,11vw,140px)]`}
    >
      {/* soft glow at the left edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_8%_55%,rgba(120,130,110,0.14),transparent_70%)]"
      />

      <div className="relative">
        <h2 className="font-['Playfair_Display',Georgia,serif] text-[clamp(38px,5.4vw,64px)] font-bold leading-[1.1] tracking-[-0.01em] text-[#f6f5f2]">
          Ready to explore
          <span className="block font-medium italic">the platform?</span>
        </h2>

        <p className="mt-[clamp(20px,3vw,34px)] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-[17px] text-[#b9c4d4]">
          Select your role to access a fully detailed dashboard view.
        </p>

        <button
          type="button"
          className="mt-[clamp(28px,4vw,48px)] cursor-pointer rounded-md bg-[#cb5f20] px-[34px] py-[19px] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-[17px] font-bold text-white transition duration-150 hover:-translate-y-px hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e76d26] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e121f]"
        >
          Enter the Platform →
        </button>
      </div>
    </section>
  );
}

/* ================================================================= */
/*                             FOOTER                                */
/* ================================================================= */

function TechStackFooter() {
  return (
    <footer
      className={`flex flex-col items-start justify-between gap-5 bg-[#0b0f1c] ${PAGE_PAD} py-[26px] sm:flex-row sm:flex-wrap sm:items-center`}
    >
      <div className="flex items-center gap-3 text-[13.5px] tracking-[0.06em] text-[#6e7f96]">
        <span
          aria-hidden="true"
          className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md bg-[#cb5f20] text-[10px] font-bold tracking-[0.02em] text-white"
        >
          IMS
        </span>

        <span>Internship Management System</span>
      </div>

      <div className="text-[13.5px] text-[#6e7f96]">
        MERN Stack · JWT · MongoDB Atlas · Vercel
      </div>
    </footer>
  );
}

/* ================================================================= */
/*                              PAGE                                 */
/* ================================================================= */

// Route: /tech-stack
export default function TechStack() {
  return (
    <div className="min-h-screen bg-[#0e121f] font-['JetBrains_Mono',ui-monospace,monospace] text-[#f6f5f2]">
      <TechStackHero />
      <TechStackTable />
      <TechStackCTA />
      <TechStackFooter />
    </div>
  );
}
