"use client";
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useState } from "react";
import Projects from "./Projects";

/* ── Status badge ── */
function StatusBadge({ status }: { status: "active" | "planned" | "posters" | "incoming" }) {
  const map = {
    active: { bg: "var(--status-active-bg)", color: "var(--status-active)", label: "Active" },
    planned: { bg: "var(--status-planned-bg)", color: "var(--status-planned)", label: "Planned" },
    posters: { bg: "#eee8ff", color: "#5b21b6", label: "2 Posters" },
    incoming: { bg: "#e0f2fe", color: "#0369a1", label: "Incoming" },
  };
  const s = map[status];
  return (
    <span
      style={{
        fontSize: ".75rem",
        fontWeight: 600,
        padding: "2px 10px",
        borderRadius: 999,
        background: s.bg,
        color: s.color,
        letterSpacing: ".02em",
      }}
    >
      {s.label}
    </span>
  );
}

/* ── Tag chip ── */
function Tag({ children }: { children: string }) {
  return (
    <span
      style={{
        fontSize: ".78rem",
        padding: "3px 10px",
        borderRadius: 999,
        background: "var(--tag-bg)",
        color: "var(--tag-text)",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════ */
export default function Home() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const [lightbox, setLightbox] = useState<string | null>(null);

  const NAV = ["home", "about", "research", "experience", "projects", "honors", "contact"];

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}>
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
        .visible { opacity: 1; transform: translateY(0); }
        .nav-link { background: none; border: none; font-size: .9rem; cursor: pointer;
          text-transform: capitalize; color: var(--muted); font-weight: 600; transition: .2s;
          padding: 4px 0; position: relative; }
        .nav-link:hover { color: var(--accent); }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0;
          height: 2px; background: var(--accent); transition: width .25s; }
        .nav-link:hover::after { width: 100%; }
        a.inline-link { color: var(--link); text-decoration: none; font-weight: 600;
          border-bottom: 1.5px solid transparent; transition: border-color .2s; }
        a.inline-link:hover { border-bottom-color: var(--link); }
        .card { background: var(--card-bg); border: 1px solid var(--card-border);
          border-radius: 12px; padding: 1.5rem 1.75rem; transition: box-shadow .25s, transform .25s; }
        .card:hover { box-shadow: 0 8px 30px rgba(0,0,0,.06); transform: translateY(-2px); }
        .poster-thumb { width: 110px; border-radius: 6px; cursor: pointer; transition: transform .25s; border: 1px solid var(--card-border); }
        .poster-thumb:hover { transform: scale(1.08); }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 100;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          animation: fadeIn .2s ease; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .section-heading { font-family: 'DM Serif Display', serif; font-size: 2.2rem;
          color: var(--heading); margin-bottom: 0.5rem; font-weight: 400; }
        .section-rule { width: 48px; height: 3px; background: var(--accent); border: none;
          margin: 0 0 2.5rem 0; border-radius: 2px; }
        @media (max-width: 700px) {
          .section-heading { font-size: 1.7rem; }
          .research-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="overlay" onClick={() => setLightbox(null)}>
          <img
            src={lightbox}
            alt="Poster"
            style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 8, boxShadow: "0 20px 60px rgba(0,0,0,.3)" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          background: "var(--nav-bg)",
          backdropFilter: "blur(12px)",
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          padding: scrolled ? ".6rem 0" : ".9rem 0",
          borderBottom: scrolled ? "1px solid var(--card-border)" : "1px solid transparent",
          transition: "padding .3s, border-color .3s",
        }}
      >
        {NAV.map((item) => (
          <button key={item} className="nav-link" onClick={() => scrollTo(item)}>
            {item}
          </button>
        ))}
      </nav>

      {/* ── Hero ── */}
      <section
        id="home"
        className="reveal"
        style={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "6rem 1.5rem 3rem",
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: ".85rem",
            color: "var(--muted)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            marginBottom: ".75rem",
          }}
        >
          Data Science · LLM Systems · Model Evaluation · ML for Health
        </p>
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            color: "var(--heading)",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Bhoomika Gupta
        </h1>
        <div
          style={{
            fontSize: "1.2rem",
            color: "var(--accent)",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            height: "1.8rem",
          }}
        >
          <Typewriter
            words={[
              "LLM evaluation & safety",
              "Neuro-symbolic reasoning",
              "Multi-agent systems",
              "ML on clinical & biological data",
            ]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1800}
          />
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="reveal"
        style={{
          padding: "5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "var(--section-alt)",
        }}
      >
        <h2 className="section-heading">About</h2>
        <hr className="section-rule" />
        <div style={{ maxWidth: 720, lineHeight: 1.85, fontSize: "1.05rem", color: "var(--foreground)" }}>
          <p style={{ marginBottom: "1.25rem" }}>
            Hi, I&apos;m Bhoomika, a Data Science undergraduate at San Jos&eacute; State University with a strong
            interest in machine learning systems, large language models, and structured reasoning. I focus on
            building and evaluating models on real-world data, with an emphasis on how these systems behave and
            how to make them more reliable. My goal is to apply these skills to develop systems that are both
            technically strong and useful in practice.
          </p>
          <div>
            <p style={{ fontWeight: 700, color: "var(--heading)", marginBottom: ".5rem", fontSize: ".95rem", letterSpacing: ".03em", textTransform: "uppercase" }}>
              Research Interests
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
              {[
                "LLM Systems & Evaluation",
                "Neuro-Symbolic Methods",
                "Multi-Agent Systems",
                "ML for Health & Biological Systems",
              ].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Research ── */}
      <section
        id="research"
        className="reveal"
        style={{
          padding: "5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className="section-heading">Research</h2>
        <hr className="section-rule" />

        <div
          className="research-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.25rem",
            width: "100%",
            maxWidth: 900,
          }}
        >
          {/* 1 — Neuro-Symbolic */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
              <span style={{ fontSize: ".8rem", color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                UCSC · AIEA Lab
              </span>
              <StatusBadge status="active" />
            </div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", color: "var(--heading)", marginBottom: ".5rem" }}>
              Neuro-Symbolic AI
            </h3>
            <p style={{ fontSize: ".92rem", color: "var(--muted)", lineHeight: 1.7 }}>
              Developing systems that integrate large language models with symbolic structures to enable
              structured, verifiable reasoning. Focusing on architectures that combine neural language
              understanding with formal logic for robust inference.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: ".75rem" }}>
              {["LLMs", "Symbolic Systems", "Reasoning"].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>

          {/* 2 — OpenGuard */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
              <span style={{ fontSize: ".8rem", color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                SJSU
              </span>
              <StatusBadge status="active" />
            </div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", color: "var(--heading)", marginBottom: ".5rem" }}>
              OpenGuard: Policy Driven LLM Evaluation
            </h3>
            <p style={{ fontSize: ".92rem", color: "var(--muted)", lineHeight: 1.7 }}>
              Designing evaluation workflows for LLM moderation. Building structured test suites
              across attack types and analyzing failure modes including false positives, partial leaks, and
              degradation under constraint across open-source guardrail models.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: ".75rem" }}>
              {["AI Safety", "Evaluation", "Guardrails"].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>

          {/* 3 — RNA Biosensors */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
              <span style={{ fontSize: ".8rem", color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                SJSU
              </span>
              <div style={{ display: "flex", gap: ".4rem" }}>
                <StatusBadge status="active" />
                <StatusBadge status="posters" />
              </div>
            </div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", color: "var(--heading)", marginBottom: ".5rem" }}>
              RNA Biosensor Classification
            </h3>
            <p style={{ fontSize: ".92rem", color: "var(--muted)", lineHeight: 1.7 }}>
              Building ML pipelines for low-cost biosensors to classify RNA sequences for virus detection
              in water samples. Achieving 95% accuracy using a Mixture-of-Experts architecture with
              reproducible feature extraction.
            </p>
            <div style={{ display: "flex", gap: ".75rem", marginTop: ".75rem" }}>
              {["/images/publication1.png", "/images/publication2.png"].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="Research poster"
                  className="poster-thumb"
                  onClick={() => setLightbox(src)}
                />
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: ".75rem" }}>
              {["PyTorch", "MoE", "Biosensors"].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>

          {/* 4 — EHR / HTO */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
              <span style={{ fontSize: ".8rem", color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                SJSU · SKILLab 
              </span>
              <StatusBadge status="active" />
            </div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", color: "var(--heading)", marginBottom: ".5rem" }}>
              EHR Sequence Modeling for Therapy Optimization
            </h3>
            <p style={{ fontSize: ".92rem", color: "var(--muted)", lineHeight: 1.7 }}>
              Contributing to transformer-based models for predicting clinical outcomes from electronic
              health records. Working on input sequence design across diagnoses, medications, labs,
              and vitals using BERT-based architectures including MedBERT, BEHRT, and TransformEHR.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: ".75rem" }}>
              {["EHR", "Transformers", "Clinical ML"].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>

          {/* 5 — Computational Analysis */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
              <span style={{ fontSize: ".8rem", color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                UCSD
              </span>
              <StatusBadge status="active" />
            </div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", color: "var(--heading)", marginBottom: ".5rem" }}>
              Computational Analysis of Online Communities
            </h3>
            <p style={{ fontSize: ".92rem", color: "var(--muted)", lineHeight: 1.7 }}>
              Analyzing large-scale social media data using topic modeling and sentiment analysis to
              map community structures and value systems across online subcultures.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: ".75rem" }}>
              {["NLP", "Topic Modeling", "Social Computing"].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>

          {/* 6 — CoT Thesis (Planned) */}
          <div className="card" style={{ borderStyle: "dashed" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
              <span style={{ fontSize: ".8rem", color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                SJSU 
              </span>
              <StatusBadge status="planned" />
            </div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", color: "var(--heading)", marginBottom: ".5rem" }}>
              Constraint Vulnerability in Chain of Thought Reasoning
            </h3>
            <p style={{ fontSize: ".92rem", color: "var(--muted)", lineHeight: 1.7 }}>
              Investigating how chain-of-thought reasoning affects instruction-following accuracy in LLMs,
              with a focus on identifying which constraint types are most vulnerable.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: ".75rem" }}>
              {["LLMs", "Reasoning", "Evaluation"].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section
        id="experience"
        className="reveal"
        style={{
          padding: "5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "var(--section-alt)",
        }}
      >
        <h2 className="section-heading">Experience</h2>
        <hr className="section-rule" />

        <div style={{ width: "100%", maxWidth: 760, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[
            {
              role: "AI/ML Fellow",
              org: "Break Through Tech",
              period: "Summer 2026",
              desc: "Selected for a competitive, industry-aligned AI/ML fellowship. Program focuses on applied machine learning and project-based collaboration.",
              tags: ["ML", "Fellowship", "Applied AI"],
              badge: "incoming" as const,
            },
            {
              role: "Edge AI Intern",
              org: "SiMa.ai × SJSU",
              period: "Apr 2026 – Present",
              desc: "Developing YOLO-based edge vision pipeline for real-time occupancy estimation across video streams.",
              tags: ["YOLO", "Edge AI", "Computer Vision"],
            },
            {
              role: "AI/ML Intern",
              org: "EPA ESA × SJSU",
              period: "Nov 2025 – Feb 2026",
              desc: "Built an AI agent to validate and normalize 200+ county-level soil datasets. Automated compliance checks using rule-based and LLM-assisted evaluation, reducing manual effort by 70%.",
              tags: ["Python", "LLMs", "MongoDB"],
            },
            {
              role: "Research Intern",
              org: "San José State University",
              period: "Aug 2025 – Dec 2025",
              desc: "Developed ML pipeline for low-cost biosensors, classifying 500+ RNA sequences with 95% accuracy using Mixture-of-Experts in PyTorch.",
              tags: ["PyTorch", "ML Pipeline", "Biosensors"],
            },
            {
              role: "Fellow",
              org: "Paragon Policy Fellowship",
              period: "Jan 2025 – Sep 2025",
              desc: "Analyzed large public datasets using SQL to identify trends in AI governance and healthcare. Translated quantitative findings into actionable policy briefs.",
              tags: ["Policy", "SQL", "AI Governance"],
            },
            {
              role: "Fellow",
              org: "AI4ALL",
              period: "2024",
              desc: "Built an accessibility tool simplifying complex text using FLAN-T5, reducing text length by 60–80% while preserving meaning.",
              tags: ["NLP", "FLAN-T5", "Accessibility"],
            },
          ].map((exp, i) => (
            <div key={i} className="card" style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <div
                style={{
                  width: 4,
                  minHeight: "100%",
                  background: "var(--accent)",
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: ".5rem", marginBottom: ".25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                    <span style={{ fontWeight: 700, color: "var(--heading)" }}>
                      {exp.role}
                    </span>
                    {exp.badge && <StatusBadge status={exp.badge} />}
                  </div>
                  <span style={{ fontSize: ".85rem", color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                    {exp.period}
                  </span>
                </div>
                <p style={{ fontSize: ".9rem", color: "var(--accent)", fontWeight: 600, marginBottom: ".35rem" }}>
                  {exp.org}
                </p>
                <p style={{ fontSize: ".92rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: ".5rem" }}>
                  {exp.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                  {exp.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <Projects />

      {/* ── Leadership ── */}
      <section
        className="reveal"
        style={{
          padding: "5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "var(--section-alt)",
        }}
      >
        <h2 className="section-heading">Leadership</h2>
        <hr className="section-rule" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", justifyContent: "center", maxWidth: 760 }}>
          {[
            {
              title: "Lead Ambassador",
              org: "Responsible Computing Club · SJSU",
              desc: "Selected for a global initiative promoting ethical technology and responsible AI practices on campus.",
            },
            {
              title: "Technical Workshops Lead",
              org: "Applied Engineering Organization · SJSU",
              desc: "Organized and led technical workshops on AI, GenAI, Python, and Java for peers and club members.",
            },
            {
              title: "AI Officer",
              org: "AI/ML Club · SJSU",
              desc: "Managing and collaborating on AI projects across student teams at SJSU.",
            },
          ].map((r, i) => (
            <div key={i} className="card" style={{ flex: "1 1 220px", maxWidth: 360 }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", color: "var(--heading)", marginBottom: ".25rem" }}>
                {r.title}
              </h3>
              <p style={{ fontSize: ".85rem", color: "var(--accent)", fontWeight: 600, marginBottom: ".5rem" }}>
                {r.org}
              </p>
              <p style={{ fontSize: ".9rem", color: "var(--muted)", lineHeight: 1.65 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Honors & Awards ── */}
      <section
        id="honors"
        className="reveal"
        style={{
          padding: "5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className="section-heading">Honors &amp; Awards</h2>
        <hr className="section-rule" />
        <div style={{ width: "100%", maxWidth: 760, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { title: "President's Scholar", org: "San José State University", detail: "4.0 GPA", year: "2025" },
            { title: "President's Scholar", org: "San José State University", detail: "4.0 GPA", year: "2024" },
          ].map((a, i) => (
            <div key={i} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.75rem" }}>
              <div>
                <span style={{ fontWeight: 700, color: "var(--heading)" }}>{a.title}</span>
                <span style={{ color: "var(--muted)", margin: "0 .5rem" }}>·</span>
                <span style={{ color: "var(--muted)", fontSize: ".92rem" }}>{a.org}</span>
                <span style={{ color: "var(--muted)", margin: "0 .5rem" }}>·</span>
                <span style={{ fontSize: ".9rem", color: "var(--accent)", fontWeight: 600 }}>{a.detail}</span>
              </div>
              <span style={{ fontSize: ".85rem", color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                {a.year}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="reveal"
        style={{
          padding: "5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          background: "var(--section-alt)",
        }}
      >
        <h2 className="section-heading">Let&apos;s Connect</h2>
        <hr className="section-rule" style={{ margin: "0 auto 1.5rem" }} />
        <p style={{ fontSize: "1rem", color: "var(--muted)", maxWidth: 480, lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Always on the lookout for opportunities to learn more and grow.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="mailto:bhoomika.gupta@sjsu.edu"
            className="inline-link"
            style={{ fontSize: "1.05rem" }}
          >
            bhoomika.gupta@sjsu.edu
          </a>
          <a
            href="https://www.linkedin.com/in/bhoomikagupta44/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-link"
            style={{ fontSize: "1.05rem" }}
          >
            LinkedIn ↗
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: "2rem 1rem",
          textAlign: "center",
          fontSize: ".8rem",
          color: "var(--muted)",
          borderTop: "1px solid var(--card-border)",
        }}
      >
        © 2026 Bhoomika Gupta
      </footer>
    </main>
  );
}
