"use client";
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useState, useMemo } from "react";
import Projects from "./Projects";

export default function Home() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  // --- Hydration-safe floating bubbles: generate only on client ---
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const bubbles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 30 }).map(() => ({
      w: Math.random() * 6 + 4,
      h: Math.random() * 6 + 4,
      top: Math.random() * 100,
      left: Math.random() * 100,
      dur: Math.random() * 10 + 5,
    }));
  }, [mounted]);

  // --- Fade-in observer as you had ---
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main
      style={{
        fontFamily: "Inter, sans-serif",
        scrollBehavior: "smooth",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #111827)",
        color: "#f8fafc",
      }}
    >
      <style>{`
        .fade-in {
          opacity: 1;
          transform: translateY(0);
          transition: all 1s ease;
        }
        section {
          opacity: 0;
          transform: translateY(20px);
        }
        nav button:hover {
          color: #38bdf8;
          text-shadow: 0 0 10px #38bdf8;
        }
        @keyframes float {
          0% { transform: translateY(0) }
          50% { transform: translateY(-20px) }
          100% { transform: translateY(0) }
        }
      `}</style>

      {/* 🌸 Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 15px rgba(0,0,0,0.3)",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          padding: "0.8rem 0",
        }}
      >
        {["home", "about", "work", "projects", "leadership", "contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1rem",
              cursor: "pointer",
              textTransform: "capitalize",
              color: "#f1f5f9",
              fontWeight: 700,
              transition: "0.3s",
            }}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* 🏠 Hero Section */}
      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 1rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          {bubbles.map((b, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: `${b.w}px`,
                height: `${b.h}px`,
                background: "rgba(56, 189, 248, 0.7)",
                borderRadius: "50%",
                top: `${b.top}%`,
                left: `${b.left}%`,
                animation: `float ${b.dur}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "0.5rem",
            color: "#38bdf8",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "bold",
            zIndex: 1,
          }}
        >
          Hi, I’m Bhoomika 👋
        </h1>
        <h2
          style={{
            fontSize: "1.8rem",
            maxWidth: "650px",
            lineHeight: "2rem",
            color: "#a5b4fc",
            fontFamily: "'Roboto Mono', monospace",
            zIndex: 1,
          }}
        >
          <Typewriter
            words={[
              "Aspiring to build ethical and impactful technology.",
              "Passionate about AI & data.",
              "Data Science Major💻",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1200}
          />
        </h2>
      </section>

      {/* 💫 About Section */}
      <section
        id="about"
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem 1rem",
          borderTop: "1px solid #1e293b",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "#93c5fd",
            fontWeight: "bold",
          }}
        >
          About Me
        </h2>
        <p
          style={{
            maxWidth: "700px",
            textAlign: "center",
            fontSize: "1.2rem",
            lineHeight: "2rem",
          }}
        >
          Data Science student at <strong>San José State University</strong> with strong foundations in Python, Java, and machine learning.
          Experienced in applied research and projects in AI, data analysis, and backend development.
          Passionate about leveraging technology to solve real world problems in healthcare, policy, and social impact domains.
        </p>
      </section>

      {/* 💼 Work Experience Section */}
      <section
        id="work"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem 1rem",
          borderTop: "1px solid #1e293b",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "2rem",
            color: "#7dd3fc",
            fontWeight: "bold",
          }}
        >
          Work Experience
        </h2>

        {[
          {
            icon: "💡",
            company: "San José State University",
            link: "https://www.sjsu.edu/",
            role: "AI/ML Intern",
            title:
              "AI-Driven ESA Compliance Agent Framework (in collaboration with EPA) | May 2025 – Present",
            description:
              "Built an AI system that automates environmental compliance checks by integrating soil data from 200+ counties. Used tools like LangChain and CrewAI to streamline research workflows and support smarter, data-driven decision-making for policy teams.",
            skills:
              "Data integration • AI agents • Automation • MongoDB • Environmental data • SQL",
          },
          {
            icon: "🧭",
            company: "Paragon Policy Fellowship",
            link: "https://www.paragoninstitute.org/",
            role: "Fellow",
            title: "Jan 2025 – Sep 2025",
            description:
              "Researched how cities can responsibly adopt AI to improve public services. Created data-driven policy briefs focused on AI governance, fairness, and accountability, and presented actionable recommendations to civic leaders.",
            skills:
              "Policy research • Data ethics • Communication • Responsible AI • Civic innovation",
          },
          {
            icon: "🧬",
            company: "San José State University",
            link: "https://www.sjsu.edu/",
            role: "Research Intern",
            title:
              "Detection of Coxsackie B2 Virus in Water Using Riboswitches | Oct 2024 – Sep 2025",
            description:
              "Worked on developing ML-powered biosensors to detect viruses in water samples. Designed data pipelines and helped build models that achieved strong accuracy, showing how AI can advance public health monitoring.",
            publication: {
              images: ["/images/publication1.png", "/images/publication2.png"],
            },
            skills:
              "Machine learning • Data preprocessing • Research analysis • Scientific communication",
          },
          {
            icon: "🤖",
            company: "AI4ALL",
            link: "https://ai-4-all.org/",
            role: "Fellow",
            title: "AI4ALL Program",
            description: "",
            skills: "",
          },
        ].map((exp, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
              marginBottom: "1.5rem",
              background: "rgba(30,41,59,0.5)",
              padding: "1.5rem 2rem",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "750px",
              boxShadow: "0 0 20px rgba(168,85,247,0.25)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 25px rgba(168,85,247,0.45)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 20px rgba(168,85,247,0.25)")
            }
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                background: "#7dd3fc",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "#0f172a",
                fontSize: "1.5rem",
                flexShrink: 0,
              }}
            >
              {exp.icon}
            </div>

            <div style={{ color: "#e2e8f0" }}>
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#fafafaff",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                {exp.company}
              </a>{" "}
              – {exp.role}
              <br />
              <p
                style={{ margin: "0.5rem 0", fontWeight: "bold", color: "#93c5fd" }}
              >
                {exp.title}
              </p>
              {exp.description && (
                <p style={{ margin: "0.25rem 0", color: "#e2e8f0" }}>
                  {exp.description}
                </p>
              )}

              {/* Publication images (only for research intern) */}
              {exp.publication && (
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {exp.publication.images.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="Publication poster"
                      style={{
                        width: "120px",
                        height: "auto",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.3)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  ))}
                </div>
              )}

              {exp.skills && (
                <p
                  style={{
                    marginTop: "0.75rem",
                    fontStyle: "italic",
                    color: "#facc15",
                    fontWeight: "bold",
                  }}
                >
                  Key Skills: {exp.skills}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      <Projects />

      {/* 🌟 Leadership & Activities */}
      <section
        id="leadership"
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
            color: "#a5b4fc",
            fontWeight: "bold",
            marginBottom: "2rem",
          }}
        >
          Leadership & Activities
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            maxWidth: "900px",
          }}
        >
          {[
            {
              title: "Lead Ambassador",
              org: "Mozilla RCC Responsible Computing Club at SJSU",
              desc:
                "Selected as Lead Ambassador in Mozilla’s global initiative promoting ethical technology and responsible AI.",
              color: "#38bdf8",
              icon: "🦊",
            },
            {
              title: "Technical Workshops Lead",
              org: "Applied Engineering Organization at SJSU",
              desc:
                "Selected to organize and lead technical workshops on AI, GenAI, Python, and Java for peers and club members.",
              color: "#fbbf24",
              icon: "⚙️",
            },
          ].map((role, i) => (
            <div
              key={i}
              style={{
                background: "rgba(30,41,59,0.7)",
                borderRadius: "12px",
                padding: "2rem",
                width: "350px",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-5px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 25px ${role.color}60`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 5px 15px rgba(0,0,0,0.3)";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                {role.icon}
              </div>
              <h3 style={{ color: role.color, fontWeight: "bold", fontSize: "1.3rem" }}>
                {role.title}
              </h3>
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{role.org}</p>
              <p style={{ fontSize: "1rem", color: "#e2e8f0" }}>{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✉️ Contact Section */}
      <section
        id="contact"
        style={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(15, 23, 42, 0.9)",
          padding: "3rem 1rem",
          borderTop: "1px solid #1e293b",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "#38bdf8",
            fontWeight: "bold",
          }}
        >
          Let’s Connect
        </h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem", fontWeight: "bold" }}>
  📧{" "}
  <a
    href="mailto:bhoomika.gupta@sjsu.edu"
    style={{ color: "#93c5fd" }}
  >
    bhoomika.gupta@sjsu.edu
  </a>
</p>

<p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
  💼{" "}
  <a
    href="https://www.linkedin.com/in/bhoomikagupta44/"
    target="_blank"
    rel="noreferrer noopener"
    style={{ color: "#93c5fd" }}
  >
    LinkedIn ↗
  </a>
</p>


      </section>
    </main>
  );
}

