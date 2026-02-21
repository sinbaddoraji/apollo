import type { Piece } from "./types";
import { PieceCard } from "./PieceCard";

interface PieceListProps {
  list: Piece[];
  justGenerated: boolean;
  generatedCount: number;
  playingIndex: number | null;
  selectedIndex: number;
  onPlay: (piece: Piece, index: number) => void;
  onStop: () => void;
  onViewSheet: (piece: Piece) => void;
}

export function PieceList({
  list,
  justGenerated,
  generatedCount,
  playingIndex,
  selectedIndex,
  onPlay,
  onStop,
  onViewSheet,
}: PieceListProps) {
  return (
    <div
      className="overflow-y-auto"
      style={{ padding: "12px 12px 12px 14px" }}
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        {list.map((piece, idx) => (
          <PieceCard
            key={idx}
            piece={piece}
            index={idx}
            isNew={justGenerated && idx < generatedCount && idx === 0}
            isPlaying={playingIndex === idx}
            onPlay={() => onPlay(piece, idx)}
            onStop={onStop}
            onViewSheet={() => onViewSheet(piece)}
            isSelected={idx === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
}
