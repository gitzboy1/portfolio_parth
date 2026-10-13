import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  BoxGeometry,
  CanvasTexture,
  EdgesGeometry,
  SRGBColorSpace,
  Vector3,
} from "three";
import { cubeFaces } from "../../data/cubeFaces";

const normals = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

function createFace({ title, subtitle, lines }, index) {
  const number = String(index + 1).padStart(2, "0");
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#19251d";
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "#324637";
  ctx.lineWidth = 1;
  for (let n = 0; n <= 512; n += 64) {
    ctx.beginPath();
    ctx.moveTo(n, 0);
    ctx.lineTo(n, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, n);
    ctx.lineTo(512, n);
    ctx.stroke();
  }
  ctx.strokeStyle = "#c2ec94";
  ctx.lineWidth = 3;
  ctx.strokeRect(15, 15, 482, 482);
  ctx.fillStyle = "#bde991";
  ctx.font = "20px monospace";
  ctx.fillText("PS / " + number, 42, 60);
  ctx.fillStyle = "#19251d";
  ctx.fillRect(30, 174, 452, 218);
  ctx.fillStyle = "#d4f3b3";
  ctx.textAlign = "center";
  ctx.font = "bold 48px sans-serif";
  ctx.fillText(title, 256, 256);
  ctx.font = "22px monospace";
  ctx.fillStyle = "#a4b49c";
  ctx.fillText(subtitle, 256, 302);
  ctx.font = "18px sans-serif";
  lines.forEach((line, index) => ctx.fillText(line, 256, 345 + index * 28));
  ctx.textAlign = "left";
  ctx.fillStyle = "#c2ec94";
  ctx.fillRect(42, 438, 12, 12);
  ctx.font = "18px monospace";
  ctx.fillText("ENGINEERING / 2027", 70, 451);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function InfoCube({
  rotation,
  animate,
  invalidateRef,
  onContextLost,
  onFaceChange,
}) {
  const mesh = useRef(null);
  const lastFace = useRef(4);
  const direction = useMemo(() => new Vector3(), []);
  const { invalidate, gl } = useThree();
  const [textures, setTextures] = useState([]);
  const edges = useMemo(() => {
    const box = new BoxGeometry(2.6, 2.6, 2.6);
    const geometry = new EdgesGeometry(box);
    box.dispose();
    return geometry;
  }, []);

  useEffect(() => {
    invalidateRef.current = invalidate;
    const lost = (event) => {
      event.preventDefault();
      onContextLost();
    };
    const element = gl.domElement;
    element.addEventListener("webglcontextlost", lost);
    return () => {
      invalidateRef.current = () => {};
      element.removeEventListener("webglcontextlost", lost);
    };
  }, [invalidate, invalidateRef, gl, onContextLost]);

  useEffect(() => {
    const next = cubeFaces.map(createFace);
    setTextures(next);
    return () => next.forEach((texture) => texture.dispose());
  }, [setTextures]);

  useEffect(() => () => edges.dispose(), [edges]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    if (animate) rotation.current.y += Math.min(delta, 0.05) * 0.18;
    mesh.current.rotation.set(rotation.current.x, rotation.current.y, 0);
    let front = 0;
    let best = -Infinity;
    normals.forEach((normal, index) => {
      const z = direction.set(...normal).applyEuler(mesh.current.rotation).z;
      if (z > best) {
        best = z;
        front = index;
      }
    });
    if (front !== lastFace.current) {
      lastFace.current = front;
      onFaceChange(front);
    }
  });

  return (
    <mesh ref={mesh} rotation={[rotation.current.x, rotation.current.y, 0]}>
      <boxGeometry args={[2.6, 2.6, 2.6]} />
      {textures.length ? (
        textures.map((texture, index) => (
          <meshBasicMaterial
            key={index}
            attach={"material-" + index}
            map={texture}
          />
        ))
      ) : (
        <meshBasicMaterial color="#26362a" />
      )}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#c5ed9c" />
      </lineSegments>
    </mesh>
  );
}

export default function Scene(props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.8], fov: 40 }}
      dpr={[1, 1.5]}
      frameloop={props.animate ? "always" : "demand"}
      gl={{ antialias: true, alpha: true }}
      fallback={null}
    >
      <InfoCube {...props} />
    </Canvas>
  );
}
