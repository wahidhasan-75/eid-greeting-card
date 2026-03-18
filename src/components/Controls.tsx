import { RefreshCcw, Volume2, VolumeX } from "lucide-react";

interface Props {
  onReplay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function Controls({ onReplay, isMuted, onToggleMute }: Props) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
      <button
        onClick={onReplay}
        className="control-button group"
        title="Replay Animation"
      >
        <RefreshCcw
          size={20}
          className="group-hover:rotate-180 transition-transform duration-500"
        />
      </button>
      <button
        onClick={onToggleMute}
        className="control-button"
        title="Toggle Sound"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
}
