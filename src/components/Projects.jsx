import {
  ArrowUpRight,
  AudioLines,
  Check,
  Code2,
  Database,
  Dumbbell,
  Radio,
  UserRound,
} from "lucide-react";
import { repositories, repositoryUrl } from "../data/repositories";

export default function Projects() {
  return (
    <section
      className="section container"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-heading heading-with-link">
        <div>
          <p className="eyebrow">01 / Projects · 7 public repositories</p>
          <h2 id="work-title">From idea to implementation.</h2>
        </div>
        <a
          className="text-link"
          href="https://github.com/gitzboy1"
          target="_blank"
          rel="noreferrer"
        >
          Explore GitHub <ArrowUpRight size={17} />
        </a>
      </div>
      <article className="project project-gym">
        <div
          className="project-visual gym-visual"
          role="img"
          aria-label="GymSetu architecture illustration: gym discovery, membership tiers, checkout, and analytics connected to Node.js and PostgreSQL."
        >
          <div className="visual-topline">
            <span>
              <span className="mini-dot" /> GYMSETU
            </span>
            <span>PRODUCT ARCHITECTURE / 01</span>
          </div>
          <div className="gym-diagram">
            <div className="diagram-user">
              <UserRound size={20} />
              <span>Find your fit.</span>
            </div>
            <div className="diagram-connector" />
            <div className="gym-options">
              <div>
                <Dumbbell />
                <span>Discover gyms</span>
              </div>
              <div>
                <Check />
                <span>Choose a plan</span>
              </div>
              <div>
                <ArrowUpRight />
                <span>Get moving</span>
              </div>
            </div>
            <div className="diagram-connector" />
            <div className="diagram-backend">
              <span>
                <Code2 size={16} /> Node.js
              </span>
              <span>
                <Database size={16} /> PostgreSQL
              </span>
              <span className="diagram-analytics">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i /> Analytics
              </span>
            </div>
          </div>
          <div className="visual-bottomline">
            <span>DISCOVER → JOIN → TRAIN</span>
            <span>Full-stack marketplace</span>
          </div>
        </div>
        <div className="project-copy">
          <p className="eyebrow">Full-stack development</p>
          <h3>
            GymSetu<span>01</span>
          </h3>
          <p className="project-subtitle">
            A better connection between gyms and people.
          </p>
          <p>
            A SaaS marketplace connecting users with local gyms, with dynamic
            membership tiers and a real-time analytics dashboard.
          </p>
          <ul className="project-points">
            <li>Built the application with Node.js and PostgreSQL.</li>
            <li>Tested onboarding and checkout with Playwright.</li>
            <li>
              Defined user stories for a proposed AI recommendation feature.
            </li>
          </ul>
          <div className="tags">
            <span>Node.js</span>
            <span>PostgreSQL</span>
            <span>Playwright</span>
          </div>
          <a
            className="text-link project-link"
            href="https://github.com/gitzboy1/GymSetu"
            target="_blank"
            rel="noreferrer"
          >
            View source code <ArrowUpRight size={18} />
          </a>
        </div>
      </article>
      <article className="project project-eysonic">
        <div
          className="project-visual eysonic-visual"
          role="img"
          aria-label="EYSONIC concept illustration: an ultrasonic wearable senses obstacles within one to two metres and gives audio and vibration alerts."
        >
          <div className="visual-topline">
            <span>
              <span className="mini-dot" /> EYSONIC
            </span>
            <span>ASSISTIVE TECHNOLOGY / 02</span>
          </div>
          <div className="sensor-illustration">
            <div className="radar-ring ring-one" />
            <div className="radar-ring ring-two" />
            <div className="radar-ring ring-three" />
            <div className="wearable-strap" />
            <div className="wearable">
              <Radio size={32} />
              <span>EYSONIC</span>
              <div className="sensor-lights">
                <i />
                <i />
                <i />
              </div>
            </div>
            <span className="sensor-range">
              1–2 m<span>OBSTACLE DETECTION</span>
            </span>
            <span className="sensor-alert">
              <AudioLines size={18} /> Audio + vibration
            </span>
          </div>
          <div className="visual-bottomline">
            <span>SENSE → SIGNAL → NAVIGATE</span>
            <span>Prototype concept illustration</span>
          </div>
        </div>
        <div className="project-copy">
          <p className="eyebrow">Embedded systems · Accessibility</p>
          <h3>
            EYSONIC<span>02</span>
          </h3>
          <p className="project-subtitle">
            Small device. A meaningful purpose.
          </p>
          <p>
            A wearable obstacle-detection prototype designed for people with
            visual impairments, built with Embedded C and ultrasonic sensors.
          </p>
          <ul className="project-points">
            <li>Detects nearby obstacles within 1–2 metres.</li>
            <li>Combines audio and vibration alerts.</li>
            <li>Demonstrated a working prototype at a college showcase.</li>
          </ul>
          <div className="tags">
            <span>Embedded C</span>
            <span>Ultrasonic sensors</span>
            <span>Prototyping</span>
          </div>
          <a
            className="text-link project-link"
            href="mailto:Parth8up0@gmail.com?subject=Let%E2%80%99s%20talk%20about%20EYSONIC"
          >
            Let’s discuss the prototype <ArrowUpRight size={18} />
          </a>
        </div>
      </article>
      <article className="ai-project" id="eyesonic-ai">
        <div>
          <p className="eyebrow">Computer vision · Team project</p>
          <h3>EYSONIC AI</h3>
          <p>
            A camera-based assistive vision project using YOLOv8 object
            detection, face recognition, and spoken alerts. The Flask
            application processes camera frames locally, with English and Hindi
            voice output.
          </p>
          <div className="tags">
            <span>Python</span>
            <span>Flask</span>
            <span>YOLOv8</span>
            <span>OpenCV</span>
          </div>
        </div>
        <a
          className="text-link"
          href="https://github.com/gitzboy1/Eyesonic"
          target="_blank"
          rel="noreferrer"
        >
          View EYSONIC AI source <ArrowUpRight size={18} />
        </a>
      </article>
      <div className="repository-heading">
        <h3>More from my GitHub</h3>
        <p>
          AI experiments, full-stack applications, and the projects that started
          it all.
        </p>
      </div>
      <div className="repository-grid">
        {repositories.map((repo) => (
          <article className="repository-card" key={repo.name}>
            <p className="eyebrow">{repo.category}</p>
            <h3>{repo.title}</h3>
            <p>{repo.description}</p>
            <div className="tags">
              {repo.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="repository-note">{repo.note}</p>
            <a
              className="text-link"
              href={repositoryUrl(repo.name)}
              target="_blank"
              rel="noreferrer"
            >
              View {repo.title} source <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
