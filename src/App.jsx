import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { Github, Linkedin } from "./components/SocialIcons";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Cube from "./components/canvas/Cube";

const navigation = [
  ["explore", "Explore me"],
  ["work", "Work"],
  ["experience", "Experience"],
  ["about", "About"],
  ["contact", "Contact"],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const menuButton = useRef(null);
  const copyTimer = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    const desktop = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("Parth8up0@gmail.com");
      setCopied(true);
      setCopyError(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="wordmark"
            href="#home"
            aria-label="Parth Singh Shekhawat, home"
            onClick={() => setMenuOpen(false)}
          >
            Parth Singh Shekhawat
          </a>
          <nav
            id="primary-navigation"
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Main navigation"
          >
            {navigation.map(([id, label]) => (
              <a
                key={id}
                href={"#" + id}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            className="header-resume"
            href={
              import.meta.env.BASE_URL + "resumes/Parth_Shekhawat_DB_Resume.pdf"
            }
            download
          >
            Resume <ArrowDown size={14} />
          </a>
          <button
            ref={menuButton}
            className="menu-toggle icon-button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <Hero />
        <Cube />
        <Projects />
        <Experience />
        <section
          className="section container"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-heading">
            <p className="eyebrow">03 / A little more about me</p>
            <h2 id="about-title">An engineer. Always a student.</h2>
          </div>
          <div className="about-intro">
            <p>
              I’m Parth, a Computer Engineering student in Delhi. I enjoy
              connecting the dots between code, data, and the people who use
              them.
            </p>
            <p>
              From building a gym marketplace to cleaning datasets and
              documenting security workflows, I like work that starts with a
              real problem and ends with something useful. I’m now looking for
              opportunities in software development, data, and AI engineering.
            </p>
          </div>
          <Skills />
          <Education />
          <Certifications />
        </section>
        <section
          className="section container contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div>
            <p className="eyebrow">
              <span className="status-dot" /> Open to internship opportunities
            </p>
            <h2 id="contact-title">
              Let’s build
              <br />
              something <em>useful.</em>
            </h2>
            <p>
              Have a role, a project, or an interesting problem?
              <br />
              I’d love to hear about it.
            </p>
          </div>
          <div className="contact-links">
            <a className="contact-email" href="mailto:Parth8up0@gmail.com">
              Parth8up0@gmail.com <ArrowUpRight />
            </a>
            <button className="copy-button" onClick={copyEmail}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Email copied" : "Copy email address"}
            </button>
            <span className="sr-only" role="status">
              {copied
                ? "Email address copied to clipboard."
                : copyError
                  ? "Could not copy. Please select the email address or use the email link."
                  : ""}
            </span>
            {copyError && (
              <p className="copy-error">
                Select the address above to copy it, or click it to send an
                email.
              </p>
            )}
            <div className="social-links">
              <a
                href="https://github.com/gitzboy1"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} /> GitHub <ArrowUpRight size={14} />
              </a>
              <a
                href="https://linkedin.com/in/parthshekhawat"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="container site-footer">
        <a href="#home" className="wordmark">
          Parth Singh Shekhawat
        </a>
        <p>© {new Date().getFullYear()} Parth Singh Shekhawat</p>
        <span>Built with curiosity. Based in Delhi.</span>
        <a href="mailto:Parth8up0@gmail.com" aria-label="Email Parth">
          <Mail size={18} />
        </a>
      </footer>
    </>
  );
}
