import { useState, useEffect } from "react";
import type { NoteEvent, VisualizationConfig } from "./types";

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const BLACK_KEYS = new Set(["C#", "D#", "F#", "G#", "A#"]);

// Flat → sharp normalization
const FLAT_TO_SHARP: Record<string, string> = {
  Db: "C#", Eb: "D#", Fb: "E", Gb: "F#", Ab: "G#", Bb: "A#", Cb: "B",
};

function normalizeNote(note: string): string {
  const match = note.match(/^([A-G][b#]?)(\d+)$/);
  if (!match) return note;
  const [, pitch, octave] = match;
  const normalized = FLAT_TO_SHARP[pitch] ?? pitch;
  return `${normalized}${octave}`;
}

// Build keys for C2–B6 (5 octaves)
interface KeyDef {
  note: string;       // e.g. "C4"
  pitchClass: string; // e.g. "C#"
  isBlack: boolean;
}

const KEYS: KeyDef[] = [];
for (let oct = 2; oct <= 6; oct++) {
  for (const n of NOTE_NAMES) {
    KEYS.push({ note: `${n}${oct}`, pitchClass: n, isBlack: BLACK_KEYS.has(n) });
  }
}

const WHITE_KEYS = KEYS.filter((k) => !k.isBlack);

// Black key position: index into the white keys array where each black key sits
// Black keys sit between specific white key pairs within each octave
function getBlackKeyLeft(pitchClass: string, octaveIndex: number): number {
  const whitePerOctave = 7;
  const offsets: Record<string, number> = {
    "C#": 0.6, "D#": 1.6, "F#": 3.6, "G#": 4.6, "A#": 5.6,
  };
  const offset = offsets[pitchClass];
  if (offset === undefined) return 0;
  return ((octaveIndex * whitePerOctave + offset) / WHITE_KEYS.length) * 100;
}

interface ActiveInfo {
  layer: NoteEvent["layer"];
  velocity: number;
}

function getLayerColor(layer: NoteEvent["layer"], config: VisualizationConfig): string {
  if (layer === "melody") return config.primaryColor;
  if (layer === "bass") return config.secondaryColor;
  return config.accentColor;
}

interface PianoKeyboardProps {
  noteEvents: NoteEvent[];
  config: VisualizationConfig;
  currentNote: string | null;
  collapsed: boolean;
  onToggle: () => void;
}

export function PianoKeyboard({ noteEvents, config, collapsed, onToggle }: PianoKeyboardProps) {
  const [activeKeys, setActiveKeys] = useState<Map<string, ActiveInfo>>(new Map);

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      const map = new Map<string, ActiveInfo>();
      for (const ev of noteEvents) {
        const key = normalizeNote(ev.note);
        if (now - ev.timestamp < 300 && !map.has(key)) {
          map.set(key, { layer: ev.layer, velocity: ev.velocity });
        }
      }
      setActiveKeys(map);
    }, 1000 / 30);
    return () => clearInterval(id);
  }, [noteEvents]);

  const blackKeyWidth = (0.65 / WHITE_KEYS.length) * 100;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10"
      style={{ transition: "transform 300ms ease-in-out", transform: collapsed ? "translateY(64px)" : "none" }}
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-t-md"
        style={{
          bottom: 64,
          right: 16,
          background: "rgba(39,40,56,0.85)",
          border: "1px solid rgba(125,107,145,0.3)",
          borderBottom: "none",
          color: "#989FCE",
          fontSize: 11,
          letterSpacing: "0.05em",
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ display: "inline-block", transition: "transform 200ms", transform: collapsed ? "rotate(180deg)" : "none" }}>
          ▼
        </span>
        <span className="uppercase tracking-wider font-medium">Piano</span>
      </button>

      {/* Keys container */}
      <div className="pointer-events-none flex" style={{ height: 64 }}>
        <div className="relative flex w-full h-full">
          {WHITE_KEYS.map((k) => {
            const info = activeKeys.get(k.note);
            const color = info ? getLayerColor(info.layer, config) : undefined;
            return (
              <div
                key={k.note}
                className="flex-1 border-r"
                style={{
                  background: color
                    ? `linear-gradient(to top, ${color}, ${color}cc)`
                    : "rgba(220,220,225,0.92)",
                  borderColor: "rgba(100,90,120,0.25)",
                  borderBottomLeftRadius: 3,
                  borderBottomRightRadius: 3,
                  boxShadow: color
                    ? `0 0 10px ${color}88, 0 0 20px ${color}44, inset 0 -2px 6px ${color}66`
                    : "inset 0 -2px 4px rgba(0,0,0,0.08)",
                  transform: info ? "translateY(2px)" : "none",
                  transition: "all 150ms ease-out",
                }}
              />
            );
          })}

          {KEYS.filter((k) => k.isBlack).map((k) => {
            const octaveIndex = parseInt(k.note.slice(-1)) - 2;
            const left = getBlackKeyLeft(k.pitchClass, octaveIndex);
            const info = activeKeys.get(k.note);
            const color = info ? getLayerColor(info.layer, config) : undefined;
            return (
              <div
                key={k.note}
                className="absolute top-0"
                style={{
                  left: `${left}%`,
                  width: `${blackKeyWidth}%`,
                  height: "60%",
                  background: color
                    ? `linear-gradient(to top, ${color}, ${color}dd)`
                    : "rgba(25,20,35,0.95)",
                  borderBottomLeftRadius: 3,
                  borderBottomRightRadius: 3,
                  boxShadow: color
                    ? `0 0 12px ${color}aa, 0 0 24px ${color}55`
                    : "0 2px 4px rgba(0,0,0,0.4)",
                  transform: info ? "translateY(2px)" : "none",
                  transition: "all 150ms ease-out",
                  zIndex: 2,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
