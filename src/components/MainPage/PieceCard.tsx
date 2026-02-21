import type { Piece } from "./types";
import { moodColors } from "../../data/musicConstants";
import { WaveViz } from "./WaveViz";

interface PieceCardProps {
  piece: Piece;
  index: number;
  isNew: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  onViewSheet: () => void;
  isSelected?: boolean;
}

export function PieceCard({
  piece,
  index,
  isNew,
  isPlaying,
  onPlay,
  onStop,
  onViewSheet,
  isSelected,
}: PieceCardProps) {
  const accent = moodColors[piece.mood] || "#347FC4";
  return (
    <div
      className="rounded-sm p-3 sm:p-4 sm:px-5 grid grid-cols-[1fr_auto_auto] sm:grid-cols-[32px_1fr_auto_auto] gap-2 sm:gap-3.5 items-center transition-[background,border-color] duration-250"
      style={{
        background: isPlaying ? `${accent}10` : isSelected ? "rgba(93,83,107,0.18)" : "rgba(93,83,107,0.1)",
        border: `1px solid ${isPlaying ? accent + "44" : isSelected ? accent + "33" : "rgba(125,107,145,0.25)"}`,
        borderLeft: `3px solid ${isSelected && !isPlaying ? accent + "88" : accent}`,
        outline: isSelected ? `1px solid ${accent}44` : "none",
        outlineOffset: -1,
        animation: isNew ? "slideIn 0.35s ease" : "none",
      }}
    >
      {/* Index number - hidden on mobile */}
      <div className="hidden sm:block font-['Cormorant_Garamond',Georgia,serif] text-xs text-lavender text-right">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5 sm:gap-2.5 flex-wrap">
          <span className="text-sm sm:text-base text-light truncate">
            {piece.title}
          </span>
          <span className="hidden sm:inline text-xs text-periwinkle italic">
            {piece.subtitle}
          </span>
          {piece.generated && (
            <span
              className="text-[9px] rounded-sm px-1.5 py-px tracking-widest uppercase shrink-0"
              style={{
                background: `${accent}20`,
                color: accent,
                border: `1px solid ${accent}40`,
              }}
            >
              Generated
            </span>
          )}
        </div>
        <div className="flex gap-2 sm:gap-3.5 flex-wrap items-center" style={{ marginTop: "4px" }}>
          <span
            className="text-xs sm:text-sm"
            style={{ color: accent }}
          >
            {piece.composer}
          </span>
          <span className="hidden sm:inline text-xs text-lavender">{piece.year}</span>
          <span className="text-[11px] sm:text-xs text-lavender">{piece.key}</span>
          <span className="text-[11px] sm:text-xs text-lavender italic">
            {piece.tempo} bpm
          </span>
          {isPlaying && <WaveViz playing={true} color={accent} />}
        </div>
      </div>
      <button
        onClick={onViewSheet}
        title="View sheet music"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-transparent border-2 border-border-strong text-periwinkle text-sm sm:text-base cursor-pointer flex items-center justify-center transition-all duration-200 shrink-0 font-serif"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = accent;
          e.currentTarget.style.color = accent;
          e.currentTarget.style.background = accent + "15";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(125,107,145,0.3)";
          e.currentTarget.style.color = "#989FCE";
          e.currentTarget.style.background = "transparent";
        }}
      >
        𝄞
      </button>
      <button
        onClick={isPlaying ? onStop : onPlay}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full text-sm cursor-pointer flex items-center justify-center transition-all duration-200 shrink-0"
        style={{
          background: isPlaying ? accent : "transparent",
          border: `2px solid ${isPlaying ? accent : "rgba(125,107,145,0.35)"}`,
          color: isPlaying ? "#E8E9F3" : accent,
        }}
        onMouseEnter={(e) => {
          if (!isPlaying) {
            e.currentTarget.style.borderColor = accent;
            e.currentTarget.style.background = accent + "22";
          }
        }}
        onMouseLeave={(e) => {
          if (!isPlaying) {
            e.currentTarget.style.borderColor = "rgba(125,107,145,0.35)";
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        {isPlaying ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect width="10" height="10"/></svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><polygon points="0,0 10,6 0,12"/></svg>
        )}
      </button>
    </div>
  );
}
