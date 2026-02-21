import { Canvas } from "@react-three/fiber";
import type { AudioData, VisualizationConfig, NoteEvent } from "./types";
import { MusicalTerrain, AudioSphere, WaveRing } from "./CubeField";
import { DynamicCamera } from "./DynamicCamera";
import { PostProcessingEffects } from "./PostProcessingEffects";
import { NoteOrb } from "./NoteOrb";

interface WaveformCanvasProps {
  audioData: AudioData | null;
  config: VisualizationConfig;
  noteEvents?: NoteEvent[];
  currentNote: string | null;
  recentNotes: string[];
}

export function WaveformCanvas({ audioData, config, noteEvents, currentNote, recentNotes }: WaveformCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [0, 18, 24],
        fov: 50,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      className="w-full h-full"
      style={{ background: config.backgroundColor }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 15, 5]} intensity={1.2} />
      <pointLight position={[8, 8, 8]} intensity={0.5} color={config.accentColor} />
      <pointLight position={[-8, 6, -8]} intensity={0.4} color={config.primaryColor} />
      <pointLight position={[0, 10, 0]} intensity={0.3} color={config.secondaryColor} />

      <MusicalTerrain audioData={audioData} config={config} noteEvents={noteEvents} />
      <AudioSphere audioData={audioData} config={config} noteEvents={noteEvents} />
      <WaveRing audioData={audioData} config={config} noteEvents={noteEvents} />
      <NoteOrb currentNote={currentNote} recentNotes={recentNotes} config={config} noteEvents={noteEvents} />
      <DynamicCamera audioData={audioData} config={config} />
      <PostProcessingEffects audioData={audioData} config={config} noteEvents={noteEvents} />
    </Canvas>
  );
}
