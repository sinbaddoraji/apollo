import { useRef, useEffect, useCallback, useState } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  StaveConnector,
  Accidental,
} from "vexflow";
import type { Piece } from "./types";
import { moodColors } from "../../data/musicConstants";

interface SheetMusicModalProps {
  piece: Piece;
  onClose: () => void;
  onPlay?: (piece: Piece) => void;
  onStop?: () => void;
  isPlaying?: boolean;
  currentNote?: string;
}

const DURATION_MAP: Record<string, string> = {
  "1n": "w",
  "2n": "h",
  "2n.": "hd",
  "4n": "q",
  "4n.": "qd",
  "8n": "8",
  "8n.": "8d",
  "16n": "16",
  "16n.": "16d",
};

const BEAT_MAP: Record<string, number> = {
  "1n": 4,
  "2n": 2,
  "2n.": 3,
  "4n": 1,
  "4n.": 1.5,
  "8n": 0.5,
  "8n.": 0.75,
  "16n": 0.25,
  "16n.": 0.375,
};

function toVexDuration(toneDur: string): string {
  return DURATION_MAP[toneDur] || "q";
}

function toVexKey(note: string): string {
  const match = note.match(/^([A-Ga-g][#b]?)(\d)$/);
  if (!match) return "c/4";
  return `${match[1].toLowerCase()}/${match[2]}`;
}

interface MeasureData {
  notes: string[];
  durations: string[];
  startNoteIndex: number;
}

function groupIntoMeasures(
  notes: string[],
  durations: string[],
  beatsPerMeasure = 4
): MeasureData[] {
  const measures: MeasureData[] = [];
  let currentBeats = 0;
  let currentNotes: string[] = [];
  let currentDurs: string[] = [];
  let measureStartIndex = 0;

  for (let i = 0; i < notes.length; i++) {
    const beats = BEAT_MAP[durations[i]] || 1;
    if (currentBeats + beats > beatsPerMeasure && currentNotes.length > 0) {
      measures.push({
        notes: currentNotes,
        durations: currentDurs,
        startNoteIndex: measureStartIndex,
      });
      currentNotes = [];
      currentDurs = [];
      currentBeats = 0;
      measureStartIndex = i;
    }
    currentNotes.push(notes[i]);
    currentDurs.push(durations[i]);
    currentBeats += beats;
    if (currentBeats >= beatsPerMeasure) {
      measures.push({
        notes: currentNotes,
        durations: currentDurs,
        startNoteIndex: measureStartIndex,
      });
      currentNotes = [];
      currentDurs = [];
      currentBeats = 0;
      measureStartIndex = i + 1;
    }
  }
  if (currentNotes.length > 0) {
    measures.push({
      notes: currentNotes,
      durations: currentDurs,
      startNoteIndex: measureStartIndex,
    });
  }
  return measures;
}

function createStaveNotes(
  notes: string[],
  durations: string[],
  clef: string
): StaveNote[] {
  return notes.map((note, i) => {
    const vexDur = toVexDuration(durations[i]);
    const isRest = note === "R" || note.startsWith("R");
    if (isRest) {
      return new StaveNote({
        keys: [clef === "bass" ? "d/3" : "b/4"],
        duration: vexDur + "r",
        clef,
      });
    }
    const staveNote = new StaveNote({
      keys: [toVexKey(note)],
      duration: vexDur,
      clef,
    });
    const match = note.match(/^[A-Ga-g]([#b])/);
    if (match) {
      staveNote.addModifier(new Accidental(match[1]), 0);
    }
    return staveNote;
  });
}

function calculateMeasureBeats(durations: string[]): number {
  return durations.reduce((sum, d) => sum + (BEAT_MAP[d] || 1), 0);
}

export function SheetMusicModal({
  piece,
  onClose,
  onPlay,
  onStop,
  isPlaying = false,
  currentNote: activeNote,
}: SheetMusicModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(() => window.innerWidth < 640 ? 0.65 : 1);
  const [activeMeasure, setActiveMeasure] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const measuresRef = useRef<MeasureData[]>([]);

  const accent = moodColors[piece.mood] || "#347FC4";

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    requestAnimationFrame(() => setEntered(true));
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Determine which measure is active based on activeNote
  useEffect(() => {
    if (!activeNote || !measuresRef.current.length) {
      if (!isPlaying) setActiveMeasure(null);
      return;
    }
    const measures = measuresRef.current;
    // Find the measure containing the active note
    for (let i = measures.length - 1; i >= 0; i--) {
      if (measures[i].notes.includes(activeNote)) {
        setActiveMeasure(i);
        return;
      }
    }
  }, [activeNote, isPlaying]);

  useEffect(() => {
    if (!containerRef.current) return;
    const div = containerRef.current;
    div.innerHTML = "";

    const hasBass = piece.bass && piece.bass.notes.length > 0;
    const trebleMeasures = groupIntoMeasures(piece.notes, piece.durations);
    const bassMeasures = hasBass
      ? groupIntoMeasures(piece.bass!.notes, piece.bass!.durations)
      : [];

    measuresRef.current = trebleMeasures;

    const measuresPerLine = 4;
    const staveWidth = 250;
    const lineWidth = measuresPerLine * staveWidth + 40;
    const lineHeight = hasBass ? 200 : 120;
    const totalLines = Math.ceil(trebleMeasures.length / measuresPerLine);
    const totalHeight = totalLines * lineHeight + 60;

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(lineWidth, totalHeight);
    const context = renderer.getContext();
    context.setFont("serif", 10);

    const svg = div.querySelector("svg")!;

    for (let lineIdx = 0; lineIdx < totalLines; lineIdx++) {
      const startMeasure = lineIdx * measuresPerLine;
      const endMeasure = Math.min(
        startMeasure + measuresPerLine,
        trebleMeasures.length
      );
      const y = lineIdx * lineHeight + 20;

      for (let m = startMeasure; m < endMeasure; m++) {
        const x = (m - startMeasure) * staveWidth + 20;
        const measure = trebleMeasures[m];

        // Create clickable measure overlay
        const measureGroup = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        );
        measureGroup.setAttribute("data-measure", String(m));
        measureGroup.style.cursor = "pointer";

        // Measure background rect (for hover/active)
        const bg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        bg.setAttribute("x", String(x));
        bg.setAttribute("y", String(y - 5));
        bg.setAttribute("width", String(staveWidth));
        bg.setAttribute("height", String(hasBass ? 170 : 90));
        bg.setAttribute("rx", "4");
        bg.setAttribute("fill", "transparent");
        bg.classList.add("measure-bg");
        measureGroup.appendChild(bg);

        // Measure number
        const numText = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        numText.setAttribute("x", String(x + 4));
        numText.setAttribute("y", String(y - 8));
        numText.setAttribute("fill", "rgba(152,159,206,0.5)");
        numText.setAttribute("font-size", "9");
        numText.setAttribute("font-family", "Cormorant Garamond, Georgia, serif");
        numText.textContent = String(m + 1);
        measureGroup.appendChild(numText);

        svg.appendChild(measureGroup);

        const trebleStave = new Stave(x, y, staveWidth);
        if (m === startMeasure) {
          trebleStave.addClef("treble");
          if (lineIdx === 0) trebleStave.addTimeSignature("4/4");
        }
        trebleStave.setContext(context).draw();

        try {
          const trebleNotes = createStaveNotes(
            measure.notes,
            measure.durations,
            "treble"
          );
          const totalBeats = calculateMeasureBeats(measure.durations);
          const voice = new Voice({ numBeats: totalBeats, beatValue: 4 });
          voice.setStrict(false);
          voice.addTickables(trebleNotes);
          new Formatter()
            .joinVoices([voice])
            .format([voice], staveWidth - 50);
          voice.draw(context, trebleStave);
        } catch {
          // Skip measures that fail to render
        }

        if (hasBass && m < bassMeasures.length) {
          const bassY = y + 80;
          const bassStave = new Stave(x, bassY, staveWidth);
          if (m === startMeasure) {
            bassStave.addClef("bass");
            if (lineIdx === 0) bassStave.addTimeSignature("4/4");
          }
          bassStave.setContext(context).draw();

          if (m === startMeasure) {
            const connector = new StaveConnector(trebleStave, bassStave);
            connector.setType("brace");
            connector.setContext(context).draw();
            const lineConnector = new StaveConnector(trebleStave, bassStave);
            lineConnector.setType("singleLeft");
            lineConnector.setContext(context).draw();
          }

          try {
            const bassMeasure = bassMeasures[m];
            const bassNotes = createStaveNotes(
              bassMeasure.notes,
              bassMeasure.durations,
              "bass"
            );
            const totalBeats = calculateMeasureBeats(bassMeasure.durations);
            const voice = new Voice({ numBeats: totalBeats, beatValue: 4 });
            voice.setStrict(false);
            voice.addTickables(bassNotes);
            new Formatter()
              .joinVoices([voice])
              .format([voice], staveWidth - 50);
            voice.draw(context, bassStave);
          } catch {
            // Skip measures that fail to render
          }
        }
      }
    }

    // Style the SVG for dark theme
    if (svg) {
      svg.style.overflow = "visible";
      svg.querySelectorAll("*").forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (
          htmlEl.getAttribute("fill") === "#000" ||
          htmlEl.getAttribute("fill") === "black" ||
          (!htmlEl.getAttribute("fill") &&
            htmlEl.tagName !== "rect" &&
            htmlEl.tagName !== "g")
        ) {
          htmlEl.setAttribute("fill", "#E8E9F3");
        }
        if (
          htmlEl.getAttribute("stroke") === "#000" ||
          htmlEl.getAttribute("stroke") === "black"
        ) {
          htmlEl.setAttribute("stroke", "#E8E9F3");
        }
      });
      svg.querySelectorAll("text").forEach((t) => {
        if (!t.closest("[data-measure]")?.querySelector("text") || t.getAttribute("font-size") !== "9") {
          t.setAttribute("fill", "#E8E9F3");
        }
      });
      svg.querySelectorAll("line, path, rect").forEach((el) => {
        if (el.classList.contains("measure-bg")) return;
        if (
          el.getAttribute("stroke") &&
          el.getAttribute("stroke") !== "none"
        ) {
          el.setAttribute("stroke", "#E8E9F3");
        }
        const fill = el.getAttribute("fill");
        if (fill && fill !== "none" && fill !== "transparent") {
          el.setAttribute("fill", "#E8E9F3");
        }
      });
    }

  }, [piece, accent]);

  // Highlight active measure during playback
  useEffect(() => {
    if (!containerRef.current) return;
    const svg = containerRef.current.querySelector("svg");
    if (!svg) return;

    svg.querySelectorAll(".measure-bg").forEach((rect) => {
      const g = rect.parentElement;
      const m = Number(g?.getAttribute("data-measure"));
      if (m === activeMeasure && isPlaying) {
        rect.setAttribute("fill", accent + "18");
        rect.setAttribute("stroke", accent + "40");
        rect.setAttribute("stroke-width", "1.5");
      } else {
        rect.setAttribute("fill", "transparent");
        rect.removeAttribute("stroke");
        rect.removeAttribute("stroke-width");
      }
    });
  }, [activeMeasure, isPlaying, accent]);

  const handleMeasureClick = useCallback(
    (e: React.MouseEvent) => {
      const target = (e.target as Element).closest("[data-measure]");
      if (!target || !onPlay) return;
      const measureIdx = Number(target.getAttribute("data-measure"));
      const measure = measuresRef.current[measureIdx];
      if (!measure) return;

      // Build a sliced piece starting from this measure
      const startIdx = measure.startNoteIndex;
      const slicedPiece: Piece = {
        ...piece,
        notes: piece.notes.slice(startIdx),
        durations: piece.durations.slice(startIdx),
        velocities: piece.velocities?.slice(startIdx),
      };
      // For bass/chords, keep the full data (they loop independently)
      onPlay(slicedPiece);
    },
    [piece, onPlay]
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex flex-col items-center overflow-hidden transition-all duration-300"
      style={{
        background: entered ? "rgba(0,0,0,0.82)" : "rgba(0,0,0,0)",
        backdropFilter: entered ? "blur(12px)" : "blur(0px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1200px] h-full flex flex-col transition-all duration-400"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0)" : "translateY(24px)",
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 sm:px-8 sm:py-5 flex items-center justify-between shrink-0 gap-3"
          style={{
            borderBottom: `1px solid ${accent}25`,
            background: `linear-gradient(180deg, rgba(39,40,56,0.95) 0%, rgba(39,40,56,0.8) 100%)`,
          }}
        >
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            {/* Play/Stop button */}
            {onPlay && (
              <button
                onClick={() =>
                  isPlaying && onStop ? onStop() : onPlay(piece)
                }
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm transition-all duration-200 shrink-0"
                style={{
                  background: isPlaying ? accent : "transparent",
                  border: `2px solid ${accent}`,
                  color: isPlaying ? "#E8E9F3" : accent,
                  boxShadow: isPlaying
                    ? `0 0 20px ${accent}40`
                    : "none",
                }}
              >
                {isPlaying ? "■" : "▶"}
              </button>
            )}
            <div className="min-w-0">
              <h2
                className="font-['Cormorant_Garamond',Georgia,serif] text-[17px] sm:text-[22px] m-0 font-medium truncate"
                style={{ color: "#E8E9F3" }}
              >
                {piece.title}
              </h2>
              <div className="flex gap-2 sm:gap-3 mt-1 items-center flex-wrap">
                <span
                  className="text-[12px] sm:text-[13px] font-medium"
                  style={{ color: accent }}
                >
                  {piece.composer}
                </span>
                <span
                  className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full"
                  style={{
                    background: `${accent}15`,
                    color: `${accent}cc`,
                    border: `1px solid ${accent}30`,
                  }}
                >
                  {piece.key}
                </span>
                <span
                  className="hidden sm:inline text-[11px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(152,159,206,0.1)",
                    color: "rgba(152,159,206,0.7)",
                    border: "1px solid rgba(152,159,206,0.15)",
                  }}
                >
                  {piece.tempo} bpm
                </span>
                <span
                  className="hidden sm:inline text-[11px] px-2 py-0.5 rounded-full italic"
                  style={{
                    background: "rgba(152,159,206,0.1)",
                    color: "rgba(152,159,206,0.7)",
                    border: "1px solid rgba(152,159,206,0.15)",
                  }}
                >
                  {piece.mood}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Zoom controls - hidden on very small screens */}
            <div
              className="hidden sm:flex items-center gap-1 rounded-full px-1"
              style={{
                background: "rgba(93,83,107,0.2)",
                border: "1px solid rgba(125,107,145,0.2)",
              }}
            >
              <button
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))}
                className="w-7 h-7 rounded-full bg-transparent border-none text-periwinkle text-sm cursor-pointer flex items-center justify-center hover:text-light transition-colors"
              >
                −
              </button>
              <span className="text-[11px] text-lavender w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(2, z + 0.15))}
                className="w-7 h-7 rounded-full bg-transparent border-none text-periwinkle text-sm cursor-pointer flex items-center justify-center hover:text-light transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full text-lg cursor-pointer flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(93,83,107,0.2)",
                border: "1px solid rgba(125,107,145,0.2)",
                color: "#989FCE",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(164,75,111,0.2)";
                e.currentTarget.style.borderColor = "rgba(164,75,111,0.4)";
                e.currentTarget.style.color = "#E8E9F3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(93,83,107,0.2)";
                e.currentTarget.style.borderColor = "rgba(125,107,145,0.2)";
                e.currentTarget.style.color = "#989FCE";
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {isPlaying && activeMeasure != null && (
          <div
            className="h-[2px] shrink-0 transition-all duration-300 ease-linear"
            style={{
              background: `linear-gradient(90deg, ${accent}, ${accent}80)`,
              width: `${Math.min(
                100,
                ((activeMeasure + 1) / Math.max(1, measuresRef.current.length)) * 100
              )}%`,
              boxShadow: `0 0 8px ${accent}60`,
            }}
          />
        )}

        {/* Score area */}
        <div
          className="flex-1 overflow-auto p-3 sm:p-8"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(39,40,56,0.98) 0%, rgba(30,31,45,0.98) 100%)",
          }}
        >
          <style>{`
            [data-measure]:hover .measure-bg {
              fill: ${accent}0d !important;
            }
            [data-measure] {
              transition: opacity 0.15s;
            }
            .sheet-scroll::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            .sheet-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .sheet-scroll::-webkit-scrollbar-thumb {
              background: rgba(152,159,206,0.2);
              border-radius: 3px;
            }
            .sheet-scroll::-webkit-scrollbar-thumb:hover {
              background: rgba(152,159,206,0.35);
            }
          `}</style>
          <div
            ref={containerRef}
            onClick={handleMeasureClick}
            className="sheet-scroll"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              transition: "transform 0.2s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
