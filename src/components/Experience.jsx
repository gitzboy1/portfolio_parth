import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: "Security Engineer Intern",
    company: "CERT-In (Indian Computer Emergency Response Team)",
    date: "Jun 2023 – Jul 2023",
    description: [
      "Coordinated with public and private sector CERTs on national-level incident response workflows, gathering cross-functional requirements and managing operational data.",
      "Authored 10+ SOPs for cybersecurity audits; translated complex technical processes into structured reference documentation."
    ]
  },
  {
    role: "IT Division Intern",
    company: "Airports Authority of India",
    date: "Sep 2023",
    description: [
      "Conducted gap analysis of IT infrastructure across airport divisions, mapping system workflows and identifying process inefficiencies.",
      "Maintained daily operational reports, hardware asset registers, and IT inventory trackers across 3+ divisions."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "KDSESJS",
    date: "Jun 2025 – Jul 2025",
    description: [
      "Gathered requirements from NGO stakeholders to design and develop the organization’s website from scratch.",
      "Translated health and education program goals into a structured, user-friendly interface."
    ]
  }
];

const Experience = () => {
  return (
    <section className="section-container" style={{ position: 'relative', zIndex: 10 }}>
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{ fontSize: '3rem', marginBottom: '3rem', color: 'var(--color-accent-3)' }}
      >
        Experience
      </motion.h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {experiences.map((exp, idx) => (
          <motion.div 
            key={idx}
            className="glass-panel"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            style={{ padding: '2rem', borderLeft: '4px solid var(--color-accent-1)' }}
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{exp.role}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1rem', color: '#ccc' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--color-accent-2)' }}>{exp.company}</span>
              <span>{exp.date}</span>
            </div>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#aaa', lineHeight: '1.6' }}>
              {exp.description.map((item, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
