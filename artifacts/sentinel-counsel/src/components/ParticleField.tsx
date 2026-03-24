import { useEffect, useRef } from "react";

const COUNT = 900;
const LINE_DIST = 120;
const MOUSE_RADIUS = 200;

interface Dot {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  r: number;
  bright: number;
  cyan: boolean;
  phase: number;
  drift: number;
  driftAngle: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const d of dots) {
        d.x = d.ox = Math.random() * w;
        d.y = d.oy = Math.random() * h;
      }
    };

    const dots: Dot[] = [];
    for (let i = 0; i < COUNT; i++) {
      dots.push({
        x: 0, y: 0, ox: 0, oy: 0,
        vx: 0, vy: 0,
        r: Math.random() * 1.4 + 0.3,
        bright: 0.15 + Math.random() * 0.55,
        cyan: Math.random() < 0.12,
        phase: Math.random() * Math.PI * 2,
        drift: 0.08 + Math.random() * 0.25,
        driftAngle: Math.random() * Math.PI * 2,
      });
    }

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const d of dots) {
        const time = t * 0.0004;
        d.ox += Math.cos(d.driftAngle + time) * d.drift * 0.3;
        d.oy += Math.sin(d.driftAngle * 1.3 + time * 0.7) * d.drift * 0.3;

        if (d.ox < -40) d.ox = w + 40;
        if (d.ox > w + 40) d.ox = -40;
        if (d.oy < -40) d.oy = h + 40;
        if (d.oy > h + 40) d.oy = -40;

        let tx = d.ox;
        let ty = d.oy;

        const dx = mx - d.ox;
        const dy = my - d.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * 35;
          tx += (dx / dist) * force;
          ty += (dy / dist) * force;
        }

        d.vx += (tx - d.x) * 0.04;
        d.vy += (ty - d.y) * 0.04;
        d.vx *= 0.88;
        d.vy *= 0.88;
        d.x += d.vx;
        d.y += d.vy;
      }

      ctx.lineWidth = 0.4;
      for (let i = 0; i < COUNT; i++) {
        const a = dots[i];
        for (let j = i + 1; j < COUNT; j++) {
          const b = dots[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < LINE_DIST * LINE_DIST) {
            const dist = Math.sqrt(d2);
            const alpha = (1 - dist / LINE_DIST) * 0.12;
            if (a.cyan || b.cyan) {
              ctx.strokeStyle = `rgba(0, 210, 240, ${alpha * 1.2})`;
            } else {
              ctx.strokeStyle = `rgba(180, 195, 210, ${alpha})`;
            }
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        const pulse = 0.7 + 0.3 * Math.sin(t * 0.002 + d.phase);
        const alpha = d.bright * pulse;

        if (d.cyan) {
          const glow = d.r * 6;
          const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, glow);
          grad.addColorStop(0, `rgba(0, 232, 255, ${alpha * 0.6})`);
          grad.addColorStop(1, `rgba(0, 232, 255, 0)`);
          ctx.beginPath();
          ctx.arc(d.x, d.y, glow, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        if (d.cyan) {
          ctx.fillStyle = `rgba(0, 220, 245, ${alpha})`;
        } else {
          const v = Math.floor(140 + d.bright * 80);
          ctx.fillStyle = `rgba(${v}, ${v + 5}, ${v + 15}, ${alpha})`;
        }
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
