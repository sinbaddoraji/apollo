import { useMemo, useState, useEffect } from "react";
import * as Tone from "tone";
import type { Piece } from "./types";
import { classicalPieces } from "../../data/classicalPieces";
import { SheetMusicModal } from "./SheetMusicModal";
import { VisualizationsPanel } from "./visualizations/VisualizationsPanel";
import Header from "./Header";
import { PieceList } from "./PieceList";
import { MixerPanel } from "./MixerPanel";
import { PanelLayout } from "./PanelLayout";
import { usePlayback } from "./hooks/usePlayback";
import { useGeneration } from "./hooks/useGeneration";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

export default function MainPage() {
  const { generated, justGenerated, handleGenerate } = useGeneration();
  const {
    playingIndex, analyser, currentPiece, currentNote,
    recentNotes, effects, noteEvents,
    stopPlayback, handlePlay,
  } = usePlayback();

  const [sheetPiece, setSheetPiece] = useState<Piece | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Generated pieces appear first, then classical pieces
  const list = useMemo(
    () => [...generated, ...classicalPieces],
    [generated],
  );

  // Unlock AudioContext on first user interaction (critical for iOS)
  useEffect(() => {
    const unlock = () => {
      Tone.start();
      const ctx = Tone.getContext().rawContext;
      if (ctx.state !== "running") {
        (ctx as AudioContext).resume?.();
      }
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("touchend", unlock);
      document.removeEventListener("click", unlock);
    };
    document.addEventListener("touchstart", unlock, { once: true });
    document.addEventListener("touchend", unlock, { once: true });
    document.addEventListener("click", unlock, { once: true });
    return () => {
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("touchend", unlock);
      document.removeEventListener("click", unlock);
    };
  }, []);

  useKeyboardShortcuts({
    list, selectedIndex, setSelectedIndex,
    playingIndex, stopPlayback, handlePlay, handleGenerate,
  });

  return (
    <div
      className="w-full h-screen flex flex-col font-['Cormorant_Garamond',Georgia,serif] text-light overflow-hidden"
      style={{
        background: "#272838",
        backgroundImage:
          "radial-gradient(ellipse at 15% 10%, rgba(93,83,107,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(52,127,196,0.12) 0%, transparent 55%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap');
      `}</style>

      <Header />

      <div className="flex-1 min-h-0 overflow-hidden">
        <PanelLayout
          onGenerate={handleGenerate}
          onStop={stopPlayback}
          isPlaying={playingIndex !== null}
          piecesContent={
            <PieceList
              list={list}
              justGenerated={justGenerated}
              generatedCount={generated.length}
              playingIndex={playingIndex}
              selectedIndex={selectedIndex}
              onPlay={handlePlay}
              onStop={stopPlayback}
              onViewSheet={setSheetPiece}
            />
          }
          visualizationContent={
            <VisualizationsPanel
              analyser={analyser}
              isPlaying={playingIndex !== null}
              currentPiece={currentPiece}
              currentNote={currentNote}
              recentNotes={recentNotes}
              noteEvents={noteEvents}
            />
          }
          mixerContent={<MixerPanel effects={effects} />}
        />
      </div>

      {sheetPiece && (
        <SheetMusicModal
          piece={sheetPiece}
          onClose={() => setSheetPiece(null)}
          onPlay={(p) => {
            const idx = list.findIndex((l) => l.title === sheetPiece.title);
            handlePlay(p, idx >= 0 ? idx : 0);
          }}
          onStop={stopPlayback}
          isPlaying={playingIndex !== null && list[playingIndex]?.title === sheetPiece.title}
          currentNote={
            playingIndex !== null && list[playingIndex]?.title === sheetPiece.title
              ? currentNote ?? undefined
              : undefined
          }
        />
      )}
    </div>
  );
}
