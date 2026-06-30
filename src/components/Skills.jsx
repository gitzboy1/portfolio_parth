import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "C/C++", "Python", "SQL", "JavaScript", "HTML", "CSS",
  "Power BI", "Microsoft Excel", "Pandas", "NumPy", "Matplotlib",
  "Git", "GitHub", "Jupyter Notebook", "Jira", "Confluence", "REST APIs",
  "Requirements Gathering", "Stakeholder Communication", "Technical Documentation"
];

const Skills = () => {
  return (
    <section className="section-container" style={{ position: 'relative', zIndex: 10 }}>
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{ fontSize: '3rem', marginBottom: '3rem', color: 'var(--color-accent-1)', textAlign: 'center' }}
      >
        Skills & Technologies
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
      >
        {skills.map((skill, idx) => (
          <motion.span 
            key={idx}
            className="skill-tag"
            whileHover={{ scale: 1.1 }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
