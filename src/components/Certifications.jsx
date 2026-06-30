import React from 'react';
import { motion } from 'framer-motion';

const certs = [
  {
    title: "Python Programming",
    issuer: "Google for Education"
  },
  {
    title: "Artificial Intelligence and Machine Learning Foundation",
    issuer: "RF Skilling Academy"
  }
];

const Certifications = () => {
  return (
    <section className="section-container" style={{ position: 'relative', zIndex: 10 }}>
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{ fontSize: '3rem', marginBottom: '3rem', color: 'var(--color-accent-2)' }}
      >
        Certifications
      </motion.h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {certs.map((cert, idx) => (
          <motion.div 
            key={idx}
            className="glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,240,255,0.2)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid var(--color-accent-3)' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text)' }}>{cert.title}</h3>
            <p style={{ color: 'var(--color-accent-1)', fontWeight: 'bold' }}>{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
