import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import NightSky from "@/components/NightSky";
import FireworksCanvas from "@/components/FireworksCanvas";
import GreetingCard from "@/components/GreetingCard";
import FloatingLanterns from "@/components/FloatingLanterns";
import Controls from "@/components/Controls";

type Stage = "ambient" | "fireworks" | "message";

export default function Index() {
  const [stage, setStage] = useState<Stage>("ambient");
  const [isMuted, setIsMuted] = useState(true);
  const [key, setKey] = useState(0);

  const runSequence = useCallback(() => {
    setStage("ambient");
    const t1 = setTimeout(() => setStage("fireworks"), 1500);
    const t2 = setTimeout(() => setStage("message"), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    return runSequence();
  }, [key, runSequence]);

  const handleReplay = () => {
    setKey((k) => k + 1);
  };

  return (
    <div className="relative min-h-svh w-full bg-background overflow-hidden flex items-center justify-center font-sans selection:bg-primary/30">
      {/* Night sky with moon - always visible */}
      <NightSky />

      {/* Floating lanterns - always visible */}
      <FloatingLanterns />

      {/* Fireworks layer */}
      <FireworksCanvas
        key={`fw-${key}`}
        active={stage === "fireworks" || stage === "message"}
      />

      {/* Greeting card - appears over the sky, sky stays visible */}
      <AnimatePresence>
        {stage === "message" && <GreetingCard key={`card-${key}`} />}
      </AnimatePresence>

      <Controls
        onReplay={handleReplay}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />
    </div>
  );
}
