import { motion } from "framer-motion";
import { useMemo } from "react";

interface Lantern {
  id: number;
  startX: number;
  duration: number;
  delay: number;
  size: number;
  swayAmount: number;
}

const generateLanterns = (count: number): Lantern[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    startX: 5 + Math.random() * 90,
    duration: 14 + Math.random() * 10,
    delay: Math.random() * 8,
    size: 18 + Math.random() * 14,
    swayAmount: 15 + Math.random() * 30,
  }));

export default function FloatingLanterns() {
  const lanterns = useMemo(() => generateLanterns(8), []);

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      {lanterns.map((l) => (
        <motion.div
          key={l.id}
          className="absolute"
          style={{ left: `${l.startX}%`, bottom: "-10%" }}
          animate={{
            y: [0, -(window.innerHeight * 1.3)],
            x: [0, l.swayAmount, -l.swayAmount / 2, l.swayAmount / 3, 0],
          }}
          transition={{
            y: { duration: l.duration, repeat: Infinity, delay: l.delay, ease: "linear" },
            x: { duration: l.duration * 0.8, repeat: Infinity, delay: l.delay, ease: "easeInOut" },
          }}
        >
          {/* Lantern SVG */}
          <svg
            width={l.size}
            height={l.size * 1.4}
            viewBox="0 0 40 56"
            fill="none"
          >
            {/* Glow behind lantern */}
            <defs>
              <radialGradient id={`lanternGlow${l.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(35, 90%, 65%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(35, 90%, 65%)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="20" cy="28" r="20" fill={`url(#lanternGlow${l.id})`} />
            
            {/* Top hook */}
            <line x1="20" y1="8" x2="20" y2="4" stroke="hsl(35, 50%, 55%)" strokeWidth="1" />
            
            {/* Lantern body */}
            <path
              d="M12 14 Q10 14 10 18 L10 34 Q10 40 14 42 L16 43 Q20 44 24 43 L26 42 Q30 40 30 34 L30 18 Q30 14 28 14 Z"
              fill="hsl(20, 85%, 50%)"
              fillOpacity="0.7"
            />
            {/* Inner glow */}
            <path
              d="M14 16 Q13 16 13 19 L13 33 Q13 38 16 40 L17 40.5 Q20 41.5 23 40.5 L24 40 Q27 38 27 33 L27 19 Q27 16 26 16 Z"
              fill="hsl(40, 95%, 65%)"
              fillOpacity="0.5"
            />
            {/* Top rim */}
            <rect x="14" y="13" width="12" height="3" rx="1" fill="hsl(35, 50%, 45%)" fillOpacity="0.8" />
            {/* Bottom rim */}
            <rect x="16" y="42" width="8" height="2" rx="1" fill="hsl(35, 50%, 45%)" fillOpacity="0.8" />
            
            {/* Bright center */}
            <ellipse cx="20" cy="26" rx="4" ry="6" fill="hsl(45, 100%, 80%)" fillOpacity="0.4" />
          </svg>

          {/* Extra ambient glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: l.size * 2,
              height: l.size * 2,
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "radial-gradient(circle, hsla(35,90%,60%,0.15) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
