import { useState } from "react";


const NAV_ITEMS = ["Overview", "Objectives", "User Roles", "Modules", "Workflow", "Tech Stack"];

const techStack = [
  { category: "Frontend", technologies: ["React.js", "Tailwind CSS", "Material UI", "Axios", "React Router"] },
  { category: "Backend", technologies: ["Node.js", "Express.js"] },
  { category: "Database", technologies: ["MongoDB", "MongoDB Atlas"] },
  { category: "Auth", technologies: ["JSON Web Token", "bcrypt"] },
  { category: "File Storage", technologies: ["Cloudinary", "ImageKit"] },
  { category: "Reports", technologies: ["ExcelJS", "PDFKit"] },
  { category: "Deployment", technologies: ["Vercel (Frontend)", "Render / Hostinger VPS"] },
];


function TechStackNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar" aria-label="Primary">
        <a className="brand" href="/" aria-label="IMS home">
          <span className="brand-mark" aria-hidden="true">IMS</span>
          <span className="brand-name">INTERNSHIP MANAGEMENT SYSTEM</span>
        </a>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => {
            const isActive = item === "Tech Stack";
            return (
              <li key={item}>
                <a
                  href={isActive ? "/tech-stack" : "#"}
                  className={isActive ? "active" : ""}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>

        <button className="nav-cta desktop-only" type="button">
          Login →
        </button>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobilePanel"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="mobile-panel" id="mobilePanel">
          {NAV_ITEMS.map((item) => {
            const isActive = item === "Tech Stack";
            return (
              <a
                key={item}
                href={isActive ? "/tech-stack" : "#"}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "page" : undefined}
              >
                {item}
              </a>
            );
          })}
          <button className="nav-cta" type="button">
            Login →
          </button>
        </div>
      )}
    </>
  );
}

function TechStackHero() {
  return (
    <header className="hero">
      <p className="eyebrow">11 — TECHNOLOGY STACK</p>
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

const styles = `
.techstack-page{
  --bg: #080b15;
  --bg-nav: #0b0f1c;
  --text-hi: #f6f5f2;
  --text-lo: #8a92a6;
  --chip-text: #c9cedb;
  --accent: #d9773f;
  --accent-soft: rgba(217,119,63,0.12);
  --border: rgba(255,255,255,0.09);
  --chip-bg: transparent;
  --chip-border: rgba(255,255,255,0.14);
  --page-pad: clamp(24px, 12vw, 170px);

  background: var(--bg);
  color: var(--text-hi);
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  min-height: 100vh;
}

.techstack-page *{ box-sizing: border-box; }
.techstack-page a{ color: inherit; text-decoration: none; }
.techstack-page :focus-visible{ outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }

/* ---------- NAVBAR ---------- */
.techstack-page .navbar{
  position: sticky;
  top: 0;
  z-index: 50;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 24px;
  padding: 14px var(--page-pad);
  background: var(--bg-nav);
  border-bottom: 1px solid var(--border);
}

.techstack-page .brand{ display:flex; align-items:center; gap: 10px; min-width: 0; }

.techstack-page .brand-mark{
  flex: 0 0 auto;
  width: 26px; height: 26px;
  border-radius: 6px;
  background: var(--accent);
  display:flex; align-items:center; justify-content:center;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.02em;
  color: #ffffff;
}

.techstack-page .brand-name{
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--text-hi);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.techstack-page .nav-links{
  display:flex;
  align-items:center;
  gap: clamp(10px, 1.8vw, 26px);
  list-style:none;
  margin:0; padding:0;
}

.techstack-page .nav-links a{
  font-size: 14px;
  font-weight: 400;
  color: var(--text-lo);
  padding: 8px 6px;
  border-radius: 6px;
  transition: color .16s ease, background .16s ease;
  white-space: nowrap;
}
.techstack-page .nav-links a:hover{ color: var(--text-hi); }
.techstack-page .nav-links a.active{
  color: var(--accent);
  background: var(--accent-soft);
  padding: 8px 14px;
  font-weight: 600;
}

.techstack-page .nav-cta{
  flex: 0 0 auto;
  display:inline-flex;
  align-items:center;
  gap: 6px;
  background: var(--accent);
  color: #ffffff;
  font-weight: 700;
  font-size: 13.5px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: filter .16s ease, transform .16s ease;
}
.techstack-page .nav-cta:hover{ filter: brightness(1.1); transform: translateY(-1px); }

.techstack-page .nav-toggle{
  display:none;
  background: none;
  border: 1px solid var(--border);
  border-radius: 8px;
  width: 36px; height: 36px;
  color: var(--text-hi);
  align-items:center; justify-content:center;
  cursor: pointer;
}

.techstack-page .mobile-panel{
  display:flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px var(--page-pad) 16px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-nav);
}
.techstack-page .mobile-panel a{
  padding: 12px 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-lo);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.techstack-page .mobile-panel a.active{ color: var(--accent); }
.techstack-page .mobile-panel .nav-cta{ margin-top: 12px; justify-content:center; }

@media (max-width: 860px){
  .techstack-page .nav-links{ display:none; }
  .techstack-page .nav-cta.desktop-only{ display:none; }
  .techstack-page .nav-toggle{ display:flex; }
}

/* ---------- HERO ---------- */
.techstack-page .hero{ padding: clamp(56px, 9vw, 96px) var(--page-pad) clamp(48px, 6vw, 70px); }

.techstack-page .eyebrow{
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin: 0 0 20px;
  font-family: 'JetBrains Mono', monospace;
}

.techstack-page .hero-title{
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.06;
  font-size: clamp(38px, 5.5vw, 64px);
  color: var(--text-hi);
}

.techstack-page .hero-title .serif{
  display:block;
  font-style: italic;
  font-weight: 500;
  color: var(--text-hi);
}

/* ---------- STACK TABLE ---------- */
.techstack-page .stack-section{ padding: 0 var(--page-pad) clamp(64px, 8vw, 100px); }

.techstack-page .stack-row{
  display:flex;
  align-items: center;
  gap: clamp(20px, 4vw, 48px);
  padding: 15px 0;
  border-bottom: 1px solid var(--border);
}
.techstack-page .stack-row:first-child{ border-top: 1px solid var(--border); }

.techstack-page .stack-label{
  flex: 0 0 200px;
  color: var(--text-lo);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
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
  padding: 8px 14px;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  color: var(--chip-text);
  transition: background .16s ease, border-color .16s ease, color .16s ease;
}
.techstack-page .chip:hover{
  background: rgba(217,119,63,0.07);
  border-color: rgba(217,119,63,0.55);
  color: var(--text-hi);
}

@media (max-width: 640px){
  .techstack-page .stack-row{ flex-direction: column; align-items: flex-start; gap: 10px; }
  .techstack-page .stack-label{ flex: none; }
}
`;

// Route: /tech-stack
export default function TechStack() {
  return (
    <div className="techstack-page">
      <style>{styles}</style>
      <TechStackNavbar />
      <TechStackHero />
      <TechStackTable />
    </div>
  );
}

