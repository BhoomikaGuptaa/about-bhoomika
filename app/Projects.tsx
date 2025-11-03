"use client";

import { useMemo } from "react";

// each project has its own emoji icon now
const PROJECTS = [
  {
    title: "MyMindHealth",
    repo: "https://github.com/BhoomikaGuptaa/MyMindHealth",
    live: "",
    icon: "🧠", // mind emoji
    blurb:
      "A mental wellness app that tracks moods and provides insights using NLP and sentiment analysis. Designed to detect emotional patterns and improve user wellbeing through data-driven insights.",
    tech: [
      "Python",
      "NLP",
      "Sentiment Analysis",
      "scikit-learn",
      "SQL",
      "AWS",
      "PySpark",
      "Data Engineering",
      "Matplotlib",
      "Seaborn",
      "API Integration",
    ],
  },
  {
    title: "CaloriesBurntPredictor",
    repo: "https://github.com/BhoomikaGuptaa/CaloriesBurntPredictor",
    live: "",
    icon: "🏃‍♀️", // running emoji
    blurb:
      "A predictive model estimating calories burned during workouts using regression analysis, feature engineering, and real-world datasets. Includes scalable data pipeline and ML deployment practices.",
    tech: [
      "Python",
      "Regression Models",
      "scikit-learn",
      "PySpark",
      "SQL",
      "AWS",
      "Data Pipelines",
      "Feature Engineering",
      "Hadoop",
      "Big Data Tools",
    ],
  },
];

export default function Projects() {
  const iconBadgeStyle = useMemo(
    () =>
      ({
        width: 50,
        height: 50,
        borderRadius: "50%",
        background: "rgba(56,189,248,.25)",
        display: "grid",
        placeItems: "center",
        fontSize: "1.5rem",
        flexShrink: 0,
      }) as React.CSSProperties,
    []
  );

  return (
    <section
      id="projects"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem 1rem",
        borderTop: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.25rem",
          color: "#7dd3fc",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Projects
      </h2>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            style={{
              border: "1px solid #1e293b",
              background: "rgba(30,41,59,0.55)",
              borderRadius: 14,
              padding: "1rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              transition: "transform .25s ease, box-shadow .25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 16px 40px rgba(56,189,248,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.25)";
            }}
          >
            {/* tiny icon + title */}
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
              <div aria-hidden style={iconBadgeStyle}>
                {p.icon || "💡"}
              </div>
              <h3 style={{ margin: 0, color: "#93c5fd" }}>{p.title}</h3>
            </div>

            <p style={{ margin: "0.75rem 0 0.5rem", color: "#e2e8f0" }}>{p.blurb}</p>

            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: ".8rem",
                    padding: ".25rem .5rem",
                    borderRadius: 999,
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                    color: "#e5e7eb",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{ marginTop: "0.75rem", display: "flex", gap: "1rem" }}>
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer noopener"
                style={{ color: "#38bdf8", fontWeight: 700 }}
              >
                GitHub ↗
              </a>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ color: "#a5b4fc", fontWeight: 700 }}
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
