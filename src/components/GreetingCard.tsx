import { motion } from "framer-motion";

export default function GreetingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="z-20 relative px-6 w-full max-w-2xl text-center"
    >
      <div className="glass-card p-8 md:p-16">
        {/* Subtle inner glow accents */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-5xl md:text-7xl mb-6 text-foreground text-glow"
        >
          Eid Mubarak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-yellow-200 text-lg md:text-xl leading-relaxed max-w-md mx-auto mb-8"
        >
          Wishing you peace, happiness, and countless blessings on this joyous
          occasion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="h-px w-12 bg-gradient-to-r from-transparent via-foreground/20 to-transparent mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-amber-300 text-sm uppercase tracking-[0.2em] mb-10"
        >
          May your Eid be filled with love, light & celebration
        </motion.p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-4" />
          <p className="font-display text-xl md:text-2xl italic text-foreground/80">
            — From{" "}
            <span className="gold-gradient not-italic font-semibold">Wahid</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
