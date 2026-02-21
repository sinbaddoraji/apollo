import type * as Tone from "tone";

export interface HarmonyPart {
  notes: string[];
  durations: string[];
  velocities?: number[];
}

export interface Piece {
  title: string;
  subtitle: string;
  composer: string;
  year: number;
  key: string;
  tempo: number;
  mood: string;
  notes: string[];
  durations: string[];
  velocities?: number[];
  rubato?: number[];
  bass?: HarmonyPart;
  chords?: HarmonyPart;
  generated?: boolean;
}

export interface EffectNodes {
  melodyVolume: Tone.Volume;
  bassVolume: Tone.Volume;
  chordsVolume: Tone.Volume;
  reverb: Tone.Reverb;
  pingPongDelay: Tone.PingPongDelay;
  chorus: Tone.Chorus;
}

export interface MultiSynthResult {
  melody: InstrumentWrapper;
  bass: InstrumentWrapper;
  chords: InstrumentWrapper;
  effects: EffectNodes;
  cleanup: () => void;
}

export interface InstrumentWrapper {
  triggerAttackRelease(
    note: string,
    duration: string | number,
    time: number,
    velocity?: number,
  ): void;
  triggerAttack(note: string, time: number, velocity?: number): void;
  dispose(): void;
}

export interface SynthResult {
  synth: InstrumentWrapper;
  cleanup: () => void;
}

export type { NoteEvent } from "./visualizations/types";
