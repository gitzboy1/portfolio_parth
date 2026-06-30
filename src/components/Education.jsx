import React from 'react';
import { motion } from 'framer-motion';

const educationList = [
  {
    degree: "B.Tech, Computer Engineering",
    institution: "Maharaja Surajmal Institute Of Technology",
    date: "Aug 2024 – Jul 2027",
    score: "CGPA: 8.64 / 10.0"
  },
  {
    degree: "Diploma, Computer Engineering",
    institution: "Delhi Skill and Entrepreneurship University",
    date: "Dec 2021 – Jun 2024",
    score: "CGPA: 8.13 / 10.0"
  },
  {
    degree: "Class X",
    institution: "C.R.P.F Public School",
    date: "2021",
    score: "Percentage: 82.83%"
  }
];

const Education = () => {
  return (
    <section className="section-container" style={{ position: 'relative', zIndex: 10 }}>
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{ fontSize: '3rem', marginBottom: '3rem', color: 'var(--color-accent-3)' }}
      >
        Education
      </motion.h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {educationList.map((edu, idx) => (
          <motion.div 
            key={idx}
            className="glass-panel"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            style={{ padding: '2rem', borderLeft: '4px solid var(--color-accent-2)' }}
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>{edu.degree}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1rem', color: '#ccc' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--color-accent-3)' }}>{edu.institution}</span>
              <span>{edu.date}</span>
            </div>
            <p style={{ color: 'var(--color-accent-1)', fontWeight: 'bold' }}>{edu.score}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
