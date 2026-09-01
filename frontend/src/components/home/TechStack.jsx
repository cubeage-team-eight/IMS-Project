import { useNavigate } from "react-router-dom";

const techStack = [
  { category: "Frontend", technologies: ["React.js", "Tailwind CSS", "Material UI", "Axios", "React Router"] },
  { category: "Backend", technologies: ["Node.js", "Express.js"] },
  { category: "Database", technologies: ["MongoDB", "MongoDB Atlas"] },
  { category: "Auth", technologies: ["JSON Web Token", "bcrypt"] },
  { category: "File Storage", technologies: ["Cloudinary", "ImageKit"] },
  { category: "Reports", technologies: ["ExcelJS", "PDFKit"] },
  { category: "Deployment", technologies: ["Vercel (Frontend)", "Render / Hostinger VPS"] },
];

function TechStackHero() {
  return (
    <header className="hero">
      <p className="eyebrow">6 — TECHNOLOGY STACK</p>
      <h1 className="hero-title">
        MERN Stack
        <span className="serif">architecture</span>
      </h1>
    </header>
  );
}

function TechStackRow({ category, technologies }) {
  return (
    <div className="stack-row" role="listitem">
      <div className="stack-label">{category}</div>
      <div className="stack-chips">
        {technologies.map((tech) => (
          <span className="chip" key={tech}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
function TechStackTable() {
  return (
    <section className="stack-section" role="list">
      {techStack.map((row) => (
        <TechStackRow key={row.category} category={row.category} technologies={row.technologies} />
      ))}
    </section>
  );
}

function TechStackCTA() {
  const navigate = useNavigate();

  return (
    <section className="cta">
      <h2 className="cta-title">
        Ready to explore
        <span className="serif">the platform?</span>
      </h2>

      <p className="cta-sub">Select your role to access a fully detailed dashboard view.</p>

      <button className="cta-button" type="button"
       onClick={() => navigate("/login")}>
        Enter the Platform →
      </button>
    </section>
  );
}

function TechStackFooter() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="brand-mark" aria-hidden="true">IMS</span>
        <span>Internship Management System</span>
      </div>

      <div className="footer-meta">MERN Stack · JWT · MongoDB Atlas · Vercel</div>
    </footer>
  );
}

const styles = `
.techstack-page{
  --bg: #0e121f;
  --bg-nav: #0b0f1c;
  --bg-footer: #0b0f1c;
  --text-hi: #f6f5f2;
  --text-lo: #6e7f96;
  --chip-text: #c9cedb;
  --accent: #e76d26;
  --accent-soft: rgba(232,145,42,0.12);
  --cta: #cb5f20;
  --border: rgba(255,255,255,0.08);
  --chip-bg: rgba(255,255,255,0.04);
  --chip-border: rgba(255,255,255,0.12);
  --page-pad: clamp(24px, 11vw, 150px);

  background: var(--bg);
  color: var(--text-hi);
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  min-height: 100vh;
}

.techstack-page *{ box-sizing: border-box; }
.techstack-page a{ color: inherit; text-decoration: none; }
.techstack-page :focus-visible{ outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }



/* ---------- HERO ---------- */
.techstack-page .hero{ padding: clamp(56px, 8vw, 92px) var(--page-pad) clamp(44px, 6vw, 74px); }

.techstack-page .eyebrow{
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin: 0 0 22px;
  font-family: 'JetBrains Mono', monospace;
}

.techstack-page .hero-title{
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.1;
  font-size: clamp(38px, 5vw, 58px);
  color: var(--text-hi);
}

.techstack-page .hero-title .serif{
  display:block;
  font-style: italic;
  font-weight: 500;
  color: var(--text-hi);
}

/* ---------- STACK TABLE ---------- */
.techstack-page .stack-section{ padding: 0 var(--page-pad) clamp(64px, 8vw, 96px); }

.techstack-page .stack-row{
  display:flex;
  align-items: center;
  gap: clamp(20px, 4vw, 48px);
  padding: 18px 0;
  border-bottom: 1px solid var(--border);
}
.techstack-page .stack-row:first-child{ border-top: 1px solid var(--border); }

.techstack-page .stack-label{
  flex: 0 0 200px;
  color: var(--text-lo);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
  letter-spacing: 0.01em;
}

.techstack-page .stack-chips{
  display:flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
}

.techstack-page .chip{
  display:inline-flex;
  align-items:center;
  padding: 9px 15px;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--chip-text);
  transition: background .16s ease, border-color .16s ease, color .16s ease;
}
.techstack-page .chip:hover{
  background: rgba(232,145,42,0.08);
  border-color: rgba(161, 150, 138, 0.55);
  color: var(--text-hi);
}

/* ---------- CTA ---------- */
.techstack-page .cta{
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: clamp(80px, 11vw, 140px) var(--page-pad);
  background:
    radial-gradient(60% 90% at 8% 55%, rgba(120,130,110,0.14), transparent 70%),
    var(--bg);
  border-top: 1px solid var(--border);
}

.techstack-page .cta-title{
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-size: clamp(38px, 5.4vw, 64px);
  color: var(--text-hi);
}

.techstack-page .cta-title .serif{
  display:block;
  font-style: italic;
  font-weight: 500;
}

.techstack-page .cta-sub{
  margin: clamp(20px, 3vw, 34px) 0 0;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 17px;
  color: #b9c4d4;
}

.techstack-page .cta-button{
  margin-top: clamp(28px, 4vw, 48px);
  background: var(--cta);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 19px 34px;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 17px;
  font-weight: 700;
  transition: filter .16s ease, transform .16s ease;
}
.techstack-page .cta-button:hover{ filter: brightness(1.06); transform: translateY(-1px); }

.techstack-page .brand-mark{
  flex: 0 0 auto;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: var(--cta);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.02em;
  color: #ffffff;
}

/* ---------- FOOTER ---------- */
.techstack-page .footer{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: 26px var(--page-pad);
  background: var(--bg-footer);
}

.techstack-page .footer-brand{
  display:flex;
  align-items:center;
  gap: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
  letter-spacing: 0.06em;
  color: var(--text-lo);
}

.techstack-page .footer-meta{
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
  color: var(--text-lo);
}

@media (max-width: 640px){
  .techstack-page .stack-row{ flex-direction: column; align-items: flex-start; gap: 10px; }
  .techstack-page .stack-label{ flex: none; }
  .techstack-page .footer{ flex-direction: column; align-items: flex-start; }
}
`;

// Route: /tech-stack
export default function TechStack() {
  return (
    <div id="tech-stack" className="techstack-page">
      <style>{styles}</style>
      <div className="hidden"><TechStackNavbar /></div>
      <TechStackHero />
      <TechStackTable />
      <TechStackCTA />
      <TechStackFooter />
    </div>
  );
}
