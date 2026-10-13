import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import profileImg from "../assets/profile.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section container"
      aria-labelledby="hero-title"
    >
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-availability">
            <span className="status-dot" /> Open to internships · Class of 2027
          </p>
          <div className="introduction">
            <img
              src={profileImg}
              alt="Parth Singh Shekhawat"
              width="48"
              height="48"
              fetchPriority="high"
            />
            <span>
              Hi, I’m <strong>Parth Singh Shekhawat.</strong>
            </span>
          </div>
          <h1 id="hero-title">
            I build software.
            <br />I make data
            <br />
            <em>make sense.</em>
          </h1>
          <p className="hero-description">
            Computer Engineering student turning ideas into working products and
            data into useful insights. Grounded in Python, SQL, and full-stack
            development.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore my work <ArrowDown size={17} />
            </a>
            <a className="button button-secondary" href="#contact">
              Let’s talk <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-location">
            <MapPin size={14} /> Delhi, India <span /> B.Tech · MSIT
          </div>
        </div>
      </div>
      <div className="proof-strip">
        <div>
          <strong>04</strong>
          <span>
            Internships across
            <br />
            data, web & security
          </span>
        </div>
        <div>
          <strong>
            8.73<span>/10</span>
          </strong>
          <span>
            B.Tech CGPA
            <br />
            MSIT, Delhi
          </span>
        </div>
        <div>
          <strong>AIR 6</strong>
          <span>
            LEET exam
            <br />
            All India Rank
          </span>
        </div>
        <a href="#work" className="scroll-note">
          A few things I’ve built <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
