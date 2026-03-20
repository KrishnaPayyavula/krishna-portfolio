import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#FAFAF7",
  dark: "#111110",
  muted: "#6B6B65",
  subtle: "#B5B5AE",
  border: "#E8E8E3",
  purple: "#3a0ca3",
  green: "#2b9348",
  teal: "#1a535c",
  red: "#e63946",
  card: "#FFFFFF",
};

function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView(0.08);
  return (
    <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

const font = {
  display: "'Playfair Display', serif",
  body: "'Outfit', sans-serif",
};

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [["about","About"],["experience","Experience"],["skills","Skills"],["projects","Projects"],["blog","Blog"],["contact","Contact"]];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(250,250,247,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <a href="#hero" style={{ fontFamily: font.display, fontSize: 24, color: C.dark, textDecoration: "none", fontWeight: 700, letterSpacing: "-0.03em" }}>
          K<span style={{ color: C.purple }}>.</span>
        </a>
        <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{
              fontSize: 13, color: active === id ? C.dark : C.muted,
              textDecoration: "none", fontFamily: font.body, fontWeight: 500,
              letterSpacing: "0.02em", transition: "color 0.3s",
            }}
              onMouseEnter={e => e.target.style.color = C.dark}
              onMouseLeave={e => e.target.style.color = active === id ? C.dark : C.muted}
            >{label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const anim = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(28px)",
    transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 40px", maxWidth: 1180, margin: "0 auto", position: "relative" }}>
      <div style={{ position: "absolute", top: "8%", right: "0%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}08 0%, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}06 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ display: "flex", gap: 12, marginBottom: 32, ...anim(0.2) }}>
        {["AI & Cloud", "Conversational AI", "Data Engineering"].map((t, i) => (
          <span key={i} style={{
            fontFamily: font.body, fontSize: 12, fontWeight: 500, letterSpacing: "0.04em",
            padding: "6px 16px", borderRadius: 100,
            color: [C.purple, C.teal, C.green][i],
            background: [C.purple + "0A", C.teal + "0A", C.green + "0A"][i],
            border: `1px solid ${[C.purple, C.teal, C.green][i]}15`,
          }}>{t}</span>
        ))}
      </div>

      <h1 style={{
        fontFamily: font.display, fontSize: "clamp(52px, 7.5vw, 88px)",
        fontWeight: 700, lineHeight: 1.02, color: C.dark,
        letterSpacing: "-0.035em", margin: 0, maxWidth: 850, ...anim(0.35),
      }}>
        Krishna
        <br />
        <span style={{
          background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>Payyavula</span>
      </h1>

      <p style={{
        fontFamily: font.body, fontSize: 19, color: C.muted, maxWidth: 560,
        lineHeight: 1.75, marginTop: 28, fontWeight: 400, ...anim(0.55),
      }}>
        Technical Lead & Senior Solutions Architect with 8+ years building
        enterprise AI systems, cloud architectures, and conversational platforms
        that drive real business impact.
      </p>

      <div style={{ display: "flex", gap: 14, marginTop: 44, ...anim(0.7) }}>
        <a href="#projects" style={{
          fontFamily: font.body, fontSize: 14, fontWeight: 600,
          color: "#fff", background: C.dark, padding: "15px 36px",
          borderRadius: 100, textDecoration: "none", letterSpacing: "0.01em",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 12px 40px rgba(17,17,16,0.15)"; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
        >View My Work</a>
        <a href="#contact" style={{
          fontFamily: font.body, fontSize: 14, fontWeight: 600,
          color: C.dark, background: "transparent", padding: "15px 36px",
          borderRadius: 100, textDecoration: "none",
          border: `1.5px solid ${C.border}`, transition: "border-color 0.3s",
        }}
          onMouseEnter={e => e.target.style.borderColor = C.dark}
          onMouseLeave={e => e.target.style.borderColor = C.border}
        >Get in Touch</a>
      </div>

      <div style={{ position: "absolute", bottom: 50, left: "50%", transform: "translateX(-50%)", ...anim(1.2) }}>
        <div style={{ width: 1, height: 56, background: `linear-gradient(to bottom, ${C.subtle}40, transparent)` }} />
      </div>
    </section>
  );
}

function About() {
  const stats = [
    ["8+", "Years Experience"],
    ["70M SEK", "Annual Savings"],
    ["10K+", "Daily Interactions"],
    ["40%", "AI Accuracy Boost"],
  ];
  return (
    <section id="about" style={{ padding: "160px 40px", maxWidth: 1180, margin: "0 auto" }}>
      <Reveal><p style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.purple, marginBottom: 20 }}>About</p></Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontFamily: font.display, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: C.dark, lineHeight: 1.2, maxWidth: 780, letterSpacing: "-0.025em", margin: 0 }}>
          Architecting intelligent systems that transform how businesses serve their customers.
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, marginTop: 56 }}>
        <Reveal delay={0.15}>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.muted, lineHeight: 1.85 }}>
            I'm a Senior Solutions Architect and Technical Lead currently at PostNord (via Capgemini), where I architect conversational AI systems processing 10,000+ daily customer interactions. My work spans enterprise cloud architectures, LLM integration, and real-time data pipelines across AWS and Azure.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.muted, lineHeight: 1.85 }}>
            Before Stockholm, I built healthcare data platforms at Carelon and designed scalable microservice architectures at Jasmin Infotech. I'm passionate about mentoring teams, presenting technical solutions to business leaders, and recently led an award-winning voice bot project at Sweden's largest AI hackathon.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.3}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 72 }}>
          {stats.map(([val, label], i) => (
            <div key={i} style={{
              padding: "28px 24px", borderRadius: 16, background: C.card,
              border: `1px solid ${C.border}`, transition: "box-shadow 0.3s, transform 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <p style={{
                fontFamily: font.display, fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: "-0.02em",
                background: `linear-gradient(135deg, ${[C.purple, C.green, C.teal, C.red][i]}, ${[C.teal, C.teal, C.purple, C.purple][i]})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>{val}</p>
              <p style={{ fontFamily: font.body, fontSize: 13, color: C.subtle, marginTop: 6, fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Experience() {
  const jobs = [
    { period: "Jan 2026 — Present", title: "Automation Engineer", company: "PostNord", location: "Stockholm", color: C.purple,
      points: ["Driving next-generation automation initiatives for Scandinavia's largest postal service", "Scaling AI-driven process automation across customer service operations"] },
    { period: "Apr 2022 — Dec 2025", title: "Technical Lead", company: "PostNord (via Capgemini)", location: "Stockholm", color: C.green,
      points: ["Led Conversational AI initiatives with ~70M SEK annual cost impact", "Architected microservices, APIs, and cloud solutions for enhanced performance", "Deployed Generative AI workflows automating repetitive customer service tasks", "Mentored junior developers in engineering best practices and innovation culture"] },
    { period: "Oct 2023 — Dec 2025", title: "Senior Software Engineer", company: "Capgemini Sverige AB", location: "Stockholm", color: C.teal,
      points: ["Implemented innovative cost-saving strategies through task automation", "Recruited and integrated offshore talent enhancing resource availability", "Showcased innovations at AWS Summit, MongoDB.local, and tech meetups"] },
    { period: "Jan 2021 — Apr 2022", title: "Software Engineer", company: "Carelon Global Solutions", location: "Bangalore, India", color: C.red,
      points: ["Created resilient backend services with AWS and Node.js for healthcare platforms", "Collaborated with enterprise architects on health technology solutions", "Built expertise across multiple AWS services for optimal cloud utilization"] },
    { period: "Nov 2017 — Jan 2021", title: "System Engineer", company: "Jasmin Infotech", location: "Chennai, India", color: C.muted,
      points: ["Designed secure microservice architectures for diverse client engagements", "Conducted research and feasibility studies for enterprise applications", "Developed RESTful APIs and NoSQL database solutions"] },
  ];
  return (
    <section id="experience" style={{ padding: "160px 40px", maxWidth: 1180, margin: "0 auto" }}>
      <Reveal><p style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.purple, marginBottom: 20 }}>Experience</p></Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontFamily: font.display, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: C.dark, lineHeight: 1.2, maxWidth: 600, letterSpacing: "-0.025em", margin: "0 0 64px" }}>
          8+ years of building at scale.
        </h2>
      </Reveal>
      {jobs.map((job, i) => (
        <Reveal key={i} delay={0.06 * (i + 1)}>
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "40px 0", borderTop: `1px solid ${C.border}` }}>
            <div>
              <p style={{ fontFamily: font.body, fontSize: 13, color: C.subtle, margin: 0, fontWeight: 500 }}>{job.period}</p>
              <p style={{ fontFamily: font.body, fontSize: 12, color: C.subtle, marginTop: 4, opacity: 0.7 }}>{job.location}</p>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: job.color, flexShrink: 0 }} />
                <h3 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: C.dark, margin: 0, letterSpacing: "-0.01em" }}>{job.company}</h3>
              </div>
              <p style={{ fontFamily: font.body, fontSize: 14, color: C.purple, marginTop: 2, marginLeft: 20, fontWeight: 500 }}>{job.title}</p>
              <div style={{ marginTop: 16, marginLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                {job.points.map((p, j) => (
                  <p key={j} style={{ fontFamily: font.body, fontSize: 14.5, color: C.muted, lineHeight: 1.65, margin: 0 }}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

function Skills() {
  const cats = [
    { title: "Architecture & Cloud", items: ["AWS", "Azure", "Multi-Cloud", "Microservices", "System Design", "Serverless"], color: C.purple },
    { title: "AI & LLM", items: ["Conversational AI", "LangChain", "LangGraph", "RAG", "Vector DBs", "Agentic AI", "Botpress"], color: C.green },
    { title: "Languages & Frameworks", items: ["Python", "JavaScript", "Node.js", "Flask", "FastAPI", "SQL", "REST APIs"], color: C.teal },
    { title: "Data & DevOps", items: ["PostgreSQL", "DynamoDB", "MongoDB", "Docker", "Kubernetes", "ETL Pipelines", "CloudWatch"], color: C.red },
  ];
  return (
    <section id="skills" style={{ padding: "160px 40px", maxWidth: 1180, margin: "0 auto" }}>
      <Reveal><p style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.purple, marginBottom: 20 }}>Skills</p></Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontFamily: font.display, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: C.dark, lineHeight: 1.2, maxWidth: 500, letterSpacing: "-0.025em", margin: "0 0 64px" }}>Technical expertise.</h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {cats.map((cat, i) => (
          <Reveal key={i} delay={0.08 * (i + 1)}>
            <div style={{
              padding: 32, borderRadius: 18, background: C.card,
              border: `1px solid ${C.border}`, transition: "box-shadow 0.3s, transform 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color }} />
                <p style={{ fontFamily: font.body, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: cat.color, margin: 0 }}>{cat.title}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.items.map((item, j) => (
                  <span key={j} style={{
                    fontFamily: font.body, fontSize: 13.5, fontWeight: 500, color: C.dark,
                    padding: "8px 18px", borderRadius: 100,
                    background: C.bg, border: `1px solid ${C.border}`,
                    transition: "all 0.25s ease", cursor: "default",
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = cat.color + "40"; e.target.style.background = cat.color + "08"; e.target.style.color = cat.color; }}
                    onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.background = C.bg; e.target.style.color = C.dark; }}
                  >{item}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    { tag: "Enterprise AI", title: "Conversational AI Platform", desc: "End-to-end voice and chat system processing 10,000+ daily customer interactions at PostNord. Handles intelligent routing, DTMF input, and seamless agent handover — driving 70M SEK in annual savings.", tech: ["Python", "Asterisk", "Botpress", "AWS"], color: C.purple },
    { tag: "AI + Data", title: "Text-to-Query Analytics Engine", desc: "Hybrid RAG + analytics system using LangGraph workflows. Converts natural language into SQL and vector search queries, achieving 40% accuracy improvement over baseline.", tech: ["LangGraph", "RAG", "ChromaDB", "SQL"], color: C.green },
    { tag: "Cloud Architecture", title: "Shipment Intelligence API", desc: "Cloud-native microservice transforming raw shipment data into structured, LLM-ready responses. Powers intelligent customer support automation across multiple channels.", tech: ["Cloud Run", "Python", "REST API", "LLM"], color: C.teal },
    { tag: "Hackathon Winner", title: "AI Voice Bot", desc: "Award-winning voice bot built at Sweden's largest AI hackathon. Demonstrates advanced voice interaction capabilities with real-time natural language understanding and generation.", tech: ["Voice AI", "NLU", "Python", "Real-time"], color: C.red },
  ];
  return (
    <section id="projects" style={{ padding: "160px 40px", maxWidth: 1180, margin: "0 auto" }}>
      <Reveal><p style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.purple, marginBottom: 20 }}>Projects</p></Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontFamily: font.display, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: C.dark, lineHeight: 1.2, maxWidth: 550, letterSpacing: "-0.025em", margin: "0 0 64px" }}>Selected work.</h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {projects.map((p, i) => (
          <Reveal key={i} delay={0.08 * (i + 1)}>
            <div style={{
              padding: 36, borderRadius: 18, background: C.card, border: `1px solid ${C.border}`,
              transition: "all 0.35s ease", cursor: "default", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 40px ${p.color}10`; e.currentTarget.style.borderColor = p.color + "25"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ position: "absolute", top: -50, right: -50, width: 140, height: 140, borderRadius: "50%", background: p.color, opacity: 0.04, filter: "blur(40px)", pointerEvents: "none" }} />
              <span style={{ fontFamily: font.body, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: p.color }}>{p.tag}</span>
              <h3 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: C.dark, margin: "14px 0 10px", letterSpacing: "-0.01em" }}>{p.title}</h3>
              <p style={{ fontFamily: font.body, fontSize: 14, color: C.muted, lineHeight: 1.75, margin: "0 0 24px" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tech.map((t, j) => (
                  <span key={j} style={{ fontFamily: font.body, fontSize: 12, fontWeight: 500, color: C.muted, padding: "5px 14px", borderRadius: 100, background: C.bg, border: `1px solid ${C.border}` }}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  const certs = [
    { name: "Vibe Coding", color: C.purple },
    { name: "Building Ambient Agents with LangGraph", color: C.green },
    { name: "Node.js Essential Training", color: C.teal },
    { name: "Designing RESTful APIs", color: C.red },
    { name: "Digital Marketing Basics", color: C.muted },
  ];
  return (
    <section style={{ padding: "0 40px 160px", maxWidth: 1180, margin: "0 auto" }}>
      <Reveal>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 64 }}>
          <p style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.purple, marginBottom: 24 }}>Certifications & Recognition</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {certs.map((c, i) => (
              <span key={i} style={{
                fontFamily: font.body, fontSize: 13.5, fontWeight: 500, color: C.dark,
                padding: "10px 22px", borderRadius: 100, background: C.card,
                border: `1px solid ${C.border}`, transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.target.style.borderColor = c.color + "40"; e.target.style.color = c.color; }}
                onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.dark; }}
              >{c.name}</span>
            ))}
            <span style={{
              fontFamily: font.body, fontSize: 13.5, fontWeight: 600, color: C.green,
              padding: "10px 22px", borderRadius: 100, background: C.green + "08",
              border: `1px solid ${C.green}20`,
            }}>Go Above & Beyond Award</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" style={{ padding: "0 40px 160px", maxWidth: 1180, margin: "0 auto" }}>
      <Reveal>
        <div style={{
          padding: "72px 64px", borderRadius: 24,
          background: `linear-gradient(135deg, ${C.purple}06 0%, ${C.teal}04 50%, ${C.green}03 100%)`,
          border: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 48,
        }}>
          <div>
            <p style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.purple, marginBottom: 16 }}>Blog</p>
            <h2 style={{ fontFamily: font.display, fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, color: C.dark, lineHeight: 1.25, letterSpacing: "-0.02em", margin: 0 }}>
              Writing about engineering,
              <br />AI, and learning Swedish.
            </h2>
            <p style={{ fontFamily: font.body, fontSize: 15, color: C.muted, marginTop: 16, lineHeight: 1.75, maxWidth: 440 }}>
              Thoughts on data engineering, backend architecture, Databricks, ETL pipelines, and my journey learning Swedish in Stockholm.
            </p>
          </div>
          <a href="https://blog.krishnapayyavula.com" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: font.body, fontSize: 14, fontWeight: 600,
            color: "#fff", background: C.dark, padding: "16px 40px",
            borderRadius: 100, textDecoration: "none", whiteSpace: "nowrap",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 12px 40px rgba(17,17,16,0.12)"; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
          >Read the Blog &#8594;</a>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  const items = [
    { label: "Email", val: "payyavulavenkatakrishna@gmail.com", href: "mailto:payyavulavenkatakrishna@gmail.com", color: C.purple },
    { label: "LinkedIn", val: "krishnapayyavula", href: "https://www.linkedin.com/in/krishnapayyavula", color: C.teal },
    { label: "GitHub", val: "krishnapayyavula", href: "https://github.com/krishnapayyavula", color: C.green },
  ];
  return (
    <section id="contact" style={{ padding: "160px 40px 100px", maxWidth: 1180, margin: "0 auto" }}>
      <Reveal><p style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.purple, marginBottom: 20 }}>Contact</p></Reveal>
      <Reveal delay={0.08}>
        <h2 style={{ fontFamily: font.display, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, color: C.dark, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 20px", maxWidth: 650 }}>
          Let's build something
          <br /><span style={{ color: C.subtle }}>extraordinary.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p style={{ fontFamily: font.body, fontSize: 16, color: C.muted, lineHeight: 1.7, maxWidth: 500, marginBottom: 48 }}>
          Open to collaborations, consulting, and conversations about AI, cloud architecture, and engineering leadership.
        </p>
      </Reveal>
      <Reveal delay={0.22}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {items.map((item, i) => (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{
              textDecoration: "none", padding: "28px 36px", borderRadius: 18,
              background: C.card, border: `1px solid ${C.border}`,
              transition: "all 0.3s ease", minWidth: 220, flex: 1,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "30"; e.currentTarget.style.boxShadow = `0 8px 28px ${item.color}08`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <p style={{ fontFamily: font.body, fontSize: 11, fontWeight: 600, color: item.color, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>{item.label}</p>
              <p style={{ fontFamily: font.body, fontSize: 15, color: C.dark, margin: "10px 0 0", fontWeight: 500 }}>{item.val}</p>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "40px 40px 48px", maxWidth: 1180, margin: "0 auto",
      borderTop: `1px solid ${C.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <p style={{ fontFamily: font.body, fontSize: 13, color: C.subtle, margin: 0 }}>
        &#169; 2026 Krishna Payyavula
      </p>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <span style={{ fontFamily: font.body, fontSize: 12, color: C.subtle }}>Stockholm, Sweden</span>
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.border }} />
        {[["GitHub","https://github.com/krishnapayyavula"],["LinkedIn","https://www.linkedin.com/in/krishnapayyavula"]].map(([l,h]) => (
          <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: font.body, fontSize: 13, color: C.muted, textDecoration: "none",
            transition: "color 0.3s", fontWeight: 500,
          }}
            onMouseEnter={e => e.target.style.color = C.dark}
            onMouseLeave={e => e.target.style.color = C.muted}
          >{l}</a>
        ))}
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const ids = ["hero","about","experience","skills","projects","blog","contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.25 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; background: ${C.bg}; }
        body { background: ${C.bg}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        ::selection { background: ${C.purple}20; color: ${C.dark}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.subtle}; }
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .nav-links { display: none !important; }
        }
      `}</style>
      <Nav active={active} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
