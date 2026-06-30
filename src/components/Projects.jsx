import React from 'react';
import { motion } from 'framer-motion';

const GithubIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const projects = [
  {
    title: "GymSetu — Full-Stack SaaS Marketplace",
    tech: "Node.js, PostgreSQL",
    description: [
      "Defined product requirements and built a scalable SaaS marketplace connecting users to local gyms, incorporating dynamic membership tiers and a real-time demand analytics dashboard.",
      "Designed user stories and acceptance criteria for an AI-powered recommendation engine.",
      "Implemented end-to-end Playwright testing to validate business logic and ensure fault-tolerant checkout flows."
    ],
    github: "#"
  },
  {
    title: "EYSONIC — Smart Band for the Visually Impaired",
    tech: "Embedded C, Ultrasonic Sensors",
    description: [
      "Prototyped a wearable obstacle-detection band using ultrasonic sensors with a dual-alert system (audio + vibration) triggered within 1–2 meters.",
      "Demonstrated functional prototype at college showcase."
    ],
    github: "#"
  }
];

const Projects = () => {
  return (
    <section className="section-container" style={{ position: 'relative', zIndex: 10 }}>
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{ fontSize: '3rem', marginBottom: '3rem', color: 'var(--color-accent-1)' }}
      >
        Projects
      </motion.h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {projects.map((proj, idx) => (
          <motion.div 
            key={idx}
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10, boxShadow: '0 10px 40px rgba(255,0,127,0.2)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>{proj.title}</h3>
              <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text)' }}>
                <GithubIcon size={24} />
              </a>
            </div>
            
            <span style={{ display: 'inline-block', padding: '0.2rem 0.8rem', background: 'rgba(112, 0, 255, 0.3)', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '1.5rem', alignSelf: 'flex-start', color: 'var(--color-accent-3)' }}>
              {proj.tech}
            </span>
            
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#aaa', lineHeight: '1.6', flexGrow: 1 }}>
              {proj.description.map((item, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
