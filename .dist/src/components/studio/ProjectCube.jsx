import React, { useEffect, useRef } from "react";

// Orientation de chaque face du cube (la translation Z = demi-arête est ajoutée en CSS)
const FACES = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(-90deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

// Cube 3D qui tourne : chaque face = un projet, clic = ouverture du site
export default function ProjectCube({ items, yours }) {
  const cubeRef = useRef(null);
  const state = useRef({ ax: -18, ay: 25, hover: false, drag: null, moved: false });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const s = state.current;
      const dt = Math.min(64, now - last);
      last = now;
      if (!reduce && !s.hover && !s.drag) {
        s.ay += dt * 0.018;
        s.ax += dt * 0.007;
      }
      if (cubeRef.current) cubeRef.current.style.transform = `rotateX(${s.ax}deg) rotateY(${s.ay}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e) => {
    state.current.drag = { x: e.clientX, y: e.clientY, ax: state.current.ax, ay: state.current.ay };
    state.current.moved = false;
  };
  const onPointerMove = (e) => {
    const s = state.current;
    if (!s.drag) return;
    const dx = e.clientX - s.drag.x;
    const dy = e.clientY - s.drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) s.moved = true;
    s.ay = s.drag.ay + dx * 0.4;
    s.ax = s.drag.ax - dy * 0.4;
  };
  const endDrag = () => { state.current.drag = null; };
  // Un glisser ne doit pas ouvrir le lien
  const onFaceClick = (e) => { if (state.current.moved) e.preventDefault(); };

  const faces = [
    ...items.map((p) => ({ href: p.url, external: true, image: p.image, title: p.title.split(" — ")[0], sub: p.category })),
    { href: "#contact", external: false, title: yours.title, sub: yours.text },
  ].slice(0, 6);

  return (
    <div
      className="studio-cube-scene select-none touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={(e) => { endDrag(e); state.current.hover = false; }}
      onPointerEnter={() => { state.current.hover = true; }}
    >
      <div ref={cubeRef} className="studio-cube">
        {faces.map((f, i) => (
          <a
            key={f.title}
            href={f.href}
            target={f.external ? "_blank" : undefined}
            rel={f.external ? "noopener noreferrer" : undefined}
            onClick={onFaceClick}
            draggable={false}
            className="studio-cube-face group"
            style={{ transform: `${FACES[i]} translateZ(calc(var(--cube) / 2))` }}
          >
            {f.image ? (
              <img src={f.image} alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover object-top" />
            ) : (
              <span className="absolute inset-0 bg-[var(--ink)]" />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-[18px] text-white">
              <span>
                <span className="block text-[20px] md:text-[24px] font-semibold leading-tight tracking-[-0.02em]">{f.title}</span>
                <span className="block mt-1 text-[12px] font-semibold opacity-70">{f.sub}</span>
              </span>
              <span className="inline-flex w-[34px] h-[34px] shrink-0 items-center justify-center border border-white/60 transition-colors group-hover:bg-white group-hover:text-black">
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {f.external ? <path d="M4 12 12 4M5.5 4H12v6.5" /> : <path d="M2 8h12M9 3l5 5-5 5" />}
                </svg>
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
