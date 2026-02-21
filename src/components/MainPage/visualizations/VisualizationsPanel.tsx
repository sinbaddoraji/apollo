import { Suspense, useMemo, useState, Component, type ReactNode } from "react";
import type { Analyser } from "tone";
import type { Piece } from "../types";
import type { NoteEvent } from "./types";
import { useAudioAnalyzer } from "./AudioAnalyzer";
import { WaveformCanvas } from "./3DWaveformCanvas";
import { getMoodConfig } from "./moodConfigs";
import { IdlePlaceholder } from "./IdlePlaceholder";
import { PianoKeyboard } from "./PianoKeyboard";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class VisualizationErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface VisualizationsPanelProps {
  analyser: Analyser | null;
  isPlaying: boolean;
  currentPiece: Piece | null;
  currentNote: string | null;
  recentNotes: string[];
  noteEvents?: NoteEvent[];
}

export function VisualizationsPanel({
  analyser,
  isPlaying,
  currentPiece,
  currentNote,
  recentNotes,
  noteEvents,
}: VisualizationsPanelProps) {
  const [pianoCollapsed, setPianoCollapsed] = useState(false);
  const audioData = useAudioAnalyzer(analyser, isPlaying);

  const config = useMemo(() => {
    return getMoodConfig(currentPiece?.mood);
  }, [currentPiece?.mood]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: config.backgroundColor }}
    >
      {isPlaying && audioData ? (
        <VisualizationErrorBoundary
          fallback={
            <div className="flex items-center justify-center h-full text-white/40 font-['Crimson_Text',Georgia,serif]">
              <div className="text-center">
                <div className="text-5xl mb-4">⚠</div>
                <div>Visualization unavailable</div>
              </div>
            </div>
          }
        >
          <Suspense fallback={<div className="text-neutral-500">Loading 3D Scene...</div>}>
            <WaveformCanvas audioData={audioData} config={config} noteEvents={noteEvents} currentNote={currentNote} recentNotes={recentNotes} />
            <PianoKeyboard noteEvents={noteEvents ?? []} config={config} currentNote={currentNote} collapsed={pianoCollapsed} onToggle={() => setPianoCollapsed((c) => !c)} />
            <div className="absolute left-6 right-6 pointer-events-none" style={{ bottom: pianoCollapsed ? 24 : 80, transition: "bottom 300ms ease-in-out" }}>
              {currentPiece && (
                <div>
                  <div
                    className="font-['Playfair_Display',Georgia,serif] text-lg font-semibold mb-1"
                    style={{ color: config.primaryColor }}
                  >
                    {currentPiece.title}
                  </div>
                  <div className="font-['Crimson_Text',Georgia,serif] text-sm text-white/60 italic">
                    {currentPiece.composer} • {currentPiece.mood}
                  </div>
                </div>
              )}
            </div>
          </Suspense>
        </VisualizationErrorBoundary>
      ) : (
        <IdlePlaceholder config={config} />
      )}
    </div>
  );
}
