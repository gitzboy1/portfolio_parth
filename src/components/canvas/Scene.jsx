import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const InfoCube = () => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const previousPointer = useRef({ x: 0, y: 0 });

  // Rotate slowly when not hovered or dragged
  useFrame(() => {
    if (!hovered && !isDragging) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    previousPointer.current = { x: e.clientX, y: e.clientY };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      e.stopPropagation();
      const deltaX = e.clientX - previousPointer.current.x;
      const deltaY = e.clientY - previousPointer.current.y;
      
      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;
      
      previousPointer.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh 
        ref={meshRef} 
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'grab'; }} 
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'auto'; }}
        onPointerDown={(e) => { handlePointerDown(e); document.body.style.cursor = 'grabbing'; }}
        onPointerMove={handlePointerMove}
        onPointerUp={(e) => { handlePointerUp(e); document.body.style.cursor = 'grab'; }}
        onPointerCancel={(e) => { handlePointerUp(e); document.body.style.cursor = 'auto'; }}
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color={hovered || isDragging ? "#ff007f" : "#4b0082"} wireframe={false} metalness={0.8} roughness={0.2} transparent opacity={0.9} />
        
        {/* Edges for a cool sci-fi look */}
        <boxHelper args={[new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3))]} material-color="#00f0ff" />

        {/* Front Face */}
        <Html position={[0, 0, 1.51]} transform center distanceFactor={10}>
          <div className="cube-content">
            <h3>Parth Singh</h3>
            <p>Engineer</p>
          </div>
        </Html>
        {/* Back Face */}
        <Html position={[0, 0, -1.51]} transform center rotation={[0, Math.PI, 0]} distanceFactor={10}>
          <div className="cube-content">
            <h3>Business</h3>
            <p>Analyst</p>
          </div>
        </Html>
        {/* Right Face */}
        <Html position={[1.51, 0, 0]} transform center rotation={[0, Math.PI / 2, 0]} distanceFactor={10}>
          <div className="cube-content">
            <h3>Python</h3>
            <p>Power BI</p>
          </div>
        </Html>
        {/* Left Face */}
        <Html position={[-1.51, 0, 0]} transform center rotation={[0, -Math.PI / 2, 0]} distanceFactor={10}>
          <div className="cube-content">
            <h3>React</h3>
            <p>Three.js</p>
          </div>
        </Html>
        {/* Top Face */}
        <Html position={[0, 1.51, 0]} transform center rotation={[-Math.PI / 2, 0, 0]} distanceFactor={10}>
          <div className="cube-content">
            <h3>Data</h3>
            <p>Driven</p>
          </div>
        </Html>
        {/* Bottom Face */}
        <Html position={[0, -1.51, 0]} transform center rotation={[Math.PI / 2, 0, 0]} distanceFactor={10}>
          <div className="cube-content">
            <h3>Web</h3>
            <p>Dev</p>
          </div>
        </Html>
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
      <color attach="background" args={['#02000a']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ff007f" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#7000ff" />
      
      {/* Cosmic background */}
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={1} fade speed={1.5} />

      <InfoCube />

      <Environment preset="night" />
    </Canvas>
  );
};

export default Scene;
