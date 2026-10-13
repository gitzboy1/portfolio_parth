import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { cubeFaces } from "../../data/cubeFaces";
const Scene = lazy(() => import("./Scene"));

function CubeFallback() {
  return (
    <div
      className="cube-fallback"
      role="img"
      aria-label="A cube about Parth, with all topics available below"
    >
      <div className="css-cube">
        <span>PARTH</span>
        <span>PROJECTS</span>
        <span>MY STORY</span>
      </div>
    </div>
  );
}
class CubeBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? <CubeFallback /> : this.props.children;
  }
}
export default function Cube() {
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [supported, setSupported] = useState(null);
  const [selected, setSelected] = useState(4);
  const wrapper = useRef(null);
  const rotation = useRef({ x: 0.25, y: -0.5 });
  const pointer = useRef(null);
  const invalidate = useRef(() => {});
  const onFailure = useCallback(() => setSupported(false), []);
  const onFaceChange = useCallback((index) => setSelected(index), []);
  const face = cubeFaces[selected];

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2");
      setSupported(Boolean(context));
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setSupported(false);
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    let intersecting = false;
    const updateVisibility = () => {
      setPageVisible(!document.hidden);
      setVisible(intersecting && !document.hidden);
    };
    updateVisibility();
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        updateVisibility();
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );
    observer.observe(wrapper.current);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  function turn(x, y) {
    rotation.current.x += x;
    rotation.current.y += y;
    invalidate.current();
  }
  function selectFace(index) {
    const [x, y] = cubeFaces[index].rotation;
    rotation.current = { x, y };
    setSelected(index);
    invalidate.current();
  }
  function endDrag(event) {
    pointer.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <section
      id="explore"
      ref={wrapper}
      className={"cube-explorer" + (visible ? " is-exploring" : "")}
      aria-labelledby="explore-title"
    >
      <div className="cube-world" aria-hidden={!visible}>
        <div
          className={"cube-stage" + (dragging ? " is-dragging" : "")}
          tabIndex={supported && visible ? 0 : undefined}
          role="group"
          aria-label="Interactive cube about Parth"
          aria-describedby="cube-help"
          onKeyDown={(event) => {
            const directions = {
              ArrowLeft: [0, -0.25],
              ArrowRight: [0, 0.25],
              ArrowUp: [-0.25, 0],
              ArrowDown: [0.25, 0],
            };
            if (directions[event.key] && supported) {
              event.preventDefault();
              turn(...directions[event.key]);
            }
          }}
          onPointerDown={(event) => {
            if (
              !supported ||
              !visible ||
              pointer.current ||
              (event.pointerType === "mouse" && event.button !== 0)
            )
              return;
            pointer.current = {
              id: event.pointerId,
              x: event.clientX,
              y: event.clientY,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
          }}
          onPointerMove={(event) => {
            if (!pointer.current || pointer.current.id !== event.pointerId)
              return;
            const { x, y } = pointer.current;
            turn(
              event.pointerType === "touch" ? 0 : (event.clientY - y) * 0.008,
              (event.clientX - x) * 0.008,
            );
            pointer.current = {
              id: event.pointerId,
              x: event.clientX,
              y: event.clientY,
            };
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={() => {
            pointer.current = null;
            setDragging(false);
          }}
        >
          {supported ? (
            <CubeBoundary onError={onFailure}>
              <Suspense fallback={<CubeFallback />}>
                <Scene
                  rotation={rotation}
                  animate={pageVisible && !reducedMotion && !dragging}
                  invalidateRef={invalidate}
                  onContextLost={onFailure}
                  onFaceChange={onFaceChange}
                />
              </Suspense>
            </CubeBoundary>
          ) : (
            <CubeFallback />
          )}
        </div>
      </div>
      <div className="container cube-explorer-content">
        <div className="cube-intro">
          <p className="eyebrow">A different way to get to know me</p>
          <h2 id="explore-title">There’s more than one side to me.</h2>
          <p id="cube-help">
            Drag the cube or use arrow keys. Each side tells a part of my story.
          </p>
        </div>
        <div
          className="cube-topics"
          role="group"
          aria-label="Choose a side of Parth"
        >
          {cubeFaces.map((item, index) => (
            <button
              key={item.id}
              aria-pressed={selected === index}
              onClick={() => selectFace(index)}
              aria-controls="cube-detail"
            >
              {item.id === "about"
                ? "About me"
                : item.id === "contact"
                  ? "Let’s talk"
                  : item.id}
            </button>
          ))}
        </div>
        <article className="cube-detail" id="cube-detail">
          <div
            aria-live={reducedMotion || !supported ? "polite" : "off"}
            aria-atomic="true"
          >
            <p className="eyebrow">
              {String(selected + 1).padStart(2, "0")} / {face.title}
            </p>
            <h3>{face.heading}</h3>
            <p>{face.body}</p>
          </div>
          <a className="text-link" href={face.href}>
            {face.link} <ArrowUpRight size={18} />
          </a>
        </article>
      </div>
    </section>
  );
}
