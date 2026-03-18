import { motion } from "framer-motion";
import { useMemo } from "react";

const stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() > 0.8 ? 2 : 1,
  delay: Math.random() * 5,
  duration: 3 + Math.random() * 4,
}));

export default function NightSky() {
  const starElements = useMemo(
    () =>
      stars.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
          className="absolute rounded-full bg-foreground"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
          }}
        />
      )),
    []
  );

  return (
    <div className="absolute inset-0 z-0">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-midnight-mid to-midnight-light" />

      {/* Stars */}
      {starElements}

      {/* Crescent Moon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-[10%] right-[10%] md:top-[15%] md:right-[20%]"
      >
        <div className="relative">
          {/* Moon atmospheric glow */}
          <div className="absolute inset-0 blur-3xl rounded-full scale-[2] bg-primary/20" />
          <div className="absolute inset-0 blur-xl rounded-full scale-150 bg-gold-glow/10" />
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            className="moon-glow relative z-10"
          >
            <defs>
              <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(45, 80%, 92%)" />
                <stop offset="100%" stopColor="hsl(45, 60%, 80%)" />
              </linearGradient>
            </defs>
            <path
              d="M80 20 A45 45 0 1 0 80 80 A35 35 0 1 1 80 20"
              fill="url(#moonGrad)"
            />
          </svg>

          {/* Moon sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold-glow"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${-20 + Math.random() * 140}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Atmospheric mist */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-midnight-light/30 to-transparent" />
    </div>
  );
}
