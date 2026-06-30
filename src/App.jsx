import React from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Scene from './components/canvas/Scene';
import './index.css';

function App() {
  return (
    <>
      <div className="canvas-container">
        <Scene />
      </div>
      
      <main className="content-layer">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        
        {/* Simple Footer */}
        <footer style={{ textAlign: 'center', padding: '2rem', color: '#aaa', marginTop: '4rem', zIndex: 10, position: 'relative' }}>
          <p>© {new Date().getFullYear()} Parth Singh Shekhawat.</p>
        </footer>
      </main>
    </>
  );
}

export default App;
