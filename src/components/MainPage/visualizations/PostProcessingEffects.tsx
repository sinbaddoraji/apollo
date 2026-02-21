import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import * as THREE from "three";
import type { AudioData, VisualizationConfig, NoteEvent } from "./types";

interface PostProcessingEffectsProps {
  audioData: AudioData | null;
  config: VisualizationConfig;
  noteEvents?: NoteEvent[];
}

function getLatestMelodyEvent(events: NoteEvent[] | undefined): NoteEvent | null {
  if (!events) return null;
  for (let i = 0; i < events.length; i++) {
    if (events[i].layer === "melody") return events[i];
  }
  return null;
}

export function PostProcessingEffects({
  audioData,
  noteEvents,
}: PostProcessingEffectsProps) {
  const bloomRef = useRef<any>(null);
  const chromaRef = useRef<any>(null);
  const melodySpike = useRef(0);

  useFrame(() => {
    const bassLevel = audioData?.bassLevel ?? 0;

    // Melody note bloom spike
    const melodyEvent = getLatestMelodyEvent(noteEvents);
    if (melodyEvent && (Date.now() - melodyEvent.timestamp) < 100) {
      melodySpike.current = Math.max(melodySpike.current, melodyEvent.velocity * 2);
    }
    melodySpike.current *= 0.9;

    if (bloomRef.current) {
      const targetIntensity = THREE.MathUtils.lerp(0.8, 5.0, bassLevel) + melodySpike.current * 1.5;
      bloomRef.current.intensity = THREE.MathUtils.lerp(
        bloomRef.current.intensity,
        targetIntensity,
        0.2
      );
    }

    if (chromaRef.current) {
      const offset = THREE.MathUtils.lerp(0.001, 0.008, bassLevel) + melodySpike.current * 0.004;
      chromaRef.current.offset = new Vector2(offset, offset);
    }
  });

  return (
    <EffectComposer>
      <Bloom
        ref={bloomRef}
        intensity={0.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        ref={chromaRef}
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.001, 0.001)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette offset={0.3} darkness={0.8} />
    </EffectComposer>
  );
}
