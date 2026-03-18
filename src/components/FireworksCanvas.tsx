import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;
  friction: number;
  gravity: number;
  size: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    this.velocity = { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
    this.alpha = 1;
    this.friction = 0.96;
    this.gravity = 0.12;
    this.size = Math.random() * 2.5 + 0.5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.008;
  }
}

class Rocket {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  trail: { x: number; y: number; alpha: number }[];
  colors: string[];

  constructor(x: number, targetY: number, colors: string[]) {
    this.x = x;
    this.y = window.innerHeight + 10;
    this.targetY = targetY;
    this.speed = 4 + Math.random() * 2;
    this.trail = [];
    this.colors = colors;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y, alpha: 1 });
    if (this.trail.length > 15) this.trail.shift();
    this.trail.forEach((t) => (t.alpha -= 0.06));
    this.y -= this.speed;
    return this.y <= this.targetY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.trail.forEach((t) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, t.alpha);
      ctx.beginPath();
      ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#FFD700";
      ctx.fill();
      ctx.restore();
    });
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFACD";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#FFD700";
    ctx.fill();
  }
}

interface Props {
  active: boolean;
}

const COLORS_SETS = [
  ["#FFD700", "#FFC125", "#FFFACD", "#E8D590"],
  ["#C0C0C0", "#E2E2E2", "#D4D4D4", "#FFFAFA"],
  ["#FFD700", "#FFA500", "#FFFACD", "#FFE4B5"],
];

export default function FireworksCanvas({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rockets = useRef<Rocket[]>([]);
  const animFrame = useRef<number>(0);

  const createExplosion = (x: number, y: number, colors: string[]) => {
    for (let i = 0; i < 50; i++) {
      particles.current.push(
        new Particle(x, y, colors[Math.floor(Math.random() * colors.length)])
      );
    }
  };

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rockets.current = rockets.current.filter((r) => {
        r.draw(ctx);
        if (r.update()) {
          createExplosion(r.x, r.y, r.colors);
          return false;
        }
        return true;
      });

      particles.current = particles.current.filter((p) => {
        if (p.alpha <= 0) return false;
        p.update();
        p.draw(ctx);
        return true;
      });

      animFrame.current = requestAnimationFrame(render);
    };

    const w = window.innerWidth;
    const h = window.innerHeight;

    const t1 = setTimeout(() => {
      rockets.current.push(new Rocket(w * 0.5, h * 0.25, COLORS_SETS[0]));
    }, 300);
    const t2 = setTimeout(() => {
      rockets.current.push(new Rocket(w * 0.3, h * 0.35, COLORS_SETS[1]));
    }, 900);
    const t3 = setTimeout(() => {
      rockets.current.push(new Rocket(w * 0.7, h * 0.3, COLORS_SETS[2]));
    }, 1400);
    const t4 = setTimeout(() => {
      rockets.current.push(new Rocket(w * 0.4, h * 0.2, COLORS_SETS[0]));
      rockets.current.push(new Rocket(w * 0.6, h * 0.28, COLORS_SETS[1]));
    }, 2000);

    render();

    return () => {
      cancelAnimationFrame(animFrame.current);
      window.removeEventListener("resize", resize);
      [t1, t2, t3, t4].forEach(clearTimeout);
      particles.current = [];
      rockets.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-10 pointer-events-none" />;
}
