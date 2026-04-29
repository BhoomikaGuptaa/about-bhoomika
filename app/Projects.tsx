"use client";

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

const PROJECTS = [
  {
    title: "Price Drop Prediction System",
    repo: "",
    icon: "📉",
    blurb:
      "Predicts product price drops across 1,200 products using 8 years of monthly pricing data. Improved alert precision by 3× and increased AUC from 0.43 to 0.70 over fixed threshold baselines.",
    tech: ["LightGBM", "FastAPI", "Python"],
  },
  {
    title: "Real-Time LLM Monitoring System",
    repo: "",
    icon: "🔍",
    blurb:
      "Streaming pipeline analyzing prompt–response events via Kafka. Handles 1K+ events/min with <200ms latency, flagging 15–20% of outputs for intervention.",
    tech: ["Kafka", "Streamlit", "Docker"],
  },
  {
    title: "AI Accessibility Assistant",
    repo: "",
    icon: "♿",
    blurb:
      "Text simplification tool using FLAN-T5 for readers at varying levels. Reduced text length by 60–80% while preserving meaning across 100+ passages.",
    tech: ["FLAN-T5", "NLP", "TTS"],
  },
  {
    title: "MyMindHealth",
    repo: "",
    icon: "🧠",
    blurb:
      "Mood tracking app using NLP and sentiment analysis to detect emotional patterns and surface data-driven insights.",
    tech: ["NLP", "scikit-learn", "SQL"],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="reveal"
      style={{
        padding: "5rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "2.2rem",
          color: "var(--heading)",
          marginBottom: "0.5rem",
          fontWeight: 400,
        }}
      >
        Projects
      </h2>
      <hr
        style={{
          width: 48,
          height: 3,
          background: "var(--accent)",
          border: "none",
          margin: "0 0 2.5rem 0",
          borderRadius: 2,
        }}
      />

      <div
        style={{
          display: "grid",
          gap: "1.25rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          width: "100%",
          maxWidth: 900,
        }}
      >
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className="card"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".5rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{p.icon}</span>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.1rem",
                  color: "var(--heading)",
                }}
              >
                {p.title}
              </h3>
            </div>

            <p style={{ fontSize: ".9rem", color: "var(--muted)", lineHeight: 1.7, flex: 1 }}>
              {p.blurb}
            </p>

            <div style={{ display: "flex", gap: ".35rem", flexWrap: "wrap", marginTop: ".75rem" }}>
              {p.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-link"
                style={{ marginTop: ".75rem", fontSize: ".9rem" }}
              >
                GitHub ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
