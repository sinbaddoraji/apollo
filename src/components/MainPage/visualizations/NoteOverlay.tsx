interface NoteOverlayProps {
  currentNote: string | null;
  recentNotes: string[];
}

export function NoteOverlay({ currentNote, recentNotes }: NoteOverlayProps) {
  if (!currentNote) return null;

  return (
    <div className="absolute top-7 left-0 right-0 flex flex-col items-center pointer-events-none z-10">
      {/* Background pill for contrast */}
      <div className="bg-black/55 backdrop-blur-[12px] rounded-2xl px-8 pt-3 pb-2.5 flex flex-col items-center">
        <div
          key={currentNote + "-" + Date.now()}
          className="font-['Cormorant_Garamond',Georgia,serif] text-[56px] font-bold text-white tracking-wide animate-[notePop_0.2s_ease-out] leading-none"
          style={{
            textShadow:
              "0 0 12px rgba(52,127,196,0.9), 0 0 30px rgba(52,127,196,0.5), 0 0 60px rgba(52,127,196,0.25)",
          }}
        >
          {currentNote}
        </div>
        <div className="flex gap-4 mt-1.5">
          {recentNotes.slice(0, 4).map((note, i) => (
            <span
              key={`${note}-${i}`}
              className="font-['Cormorant_Garamond',Georgia,serif] text-[22px] font-semibold transition-opacity duration-300"
              style={{
                color: `rgba(255,255,255,${0.7 - i * 0.15})`,
                textShadow: "0 0 6px rgba(52,127,196,0.3)",
              }}
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
