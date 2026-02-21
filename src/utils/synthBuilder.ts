import * as Tone from "tone";
import type {
  InstrumentWrapper,
  SynthResult,
  EffectNodes,
} from "../components/MainPage/types";

const pianoSamples = {
  urls: {
    "A2": "A2.mp3",
    "C3": "C3.mp3",
    "D#3": "Ds3.mp3",
    "F#3": "Fs3.mp3",
    "A3": "A3.mp3",
    "C4": "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    "A4": "A4.mp3",
    "C5": "C5.mp3",
    "D#5": "Ds5.mp3",
    "F#5": "Fs5.mp3",
    "A5": "A5.mp3",
    "C6": "C6.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
};

export interface MultiSynthResult {
  melody: InstrumentWrapper;
  bass: InstrumentWrapper;
  chords: InstrumentWrapper;
  effects: EffectNodes;
  cleanup: () => void;
}

function createVelocitySampler(
  sampler: Tone.Sampler
): InstrumentWrapper {
  return {
    triggerAttackRelease: (
      note: string,
      duration: string | number,
      time: number,
      velocity: number = 0.7,
    ) => {
      sampler.triggerAttackRelease(note, duration, time, velocity);
    },
    triggerAttack: (note: string, time: number, velocity: number = 0.7) => {
      sampler.triggerAttack(note, time, velocity);
    },
    dispose: () => sampler.dispose(),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function buildPiano(
  volumeDb: number,
  destination: Tone.InputNode,
  release: number = 1.5
): { sampler: Tone.Sampler; volume: Tone.Volume } {
  const sampler = new Tone.Sampler({
    urls: pianoSamples.urls,
    baseUrl: pianoSamples.baseUrl,
    release: release,
    attack: 0.005,
    curve: "exponential",
  });

  const vol = new Tone.Volume(volumeDb);
  vol.connect(destination);
  sampler.connect(vol);

  return { sampler, volume: vol };
}

function buildReverb(): Tone.Reverb {
  return new Tone.Reverb({
    decay: 3.5,
    wet: 0.35,
    preDelay: 0.01,
  });
}

export function buildSynth(analyser?: Tone.Analyser, bpm: number = 80): MultiSynthResult {
  const beatSec = 60 / bpm;

  const melodyRelease = clamp(beatSec * 1.0, 0.8, 2.0);
  const bassRelease = clamp(beatSec * 1.8, 1.2, 3.0);
  const chordsRelease = clamp(beatSec * 2.2, 1.5, 4.0);

  const reverb = buildReverb().toDestination();
  const pingPongDelay = new Tone.PingPongDelay("8n", 0.18);
  pingPongDelay.connect(reverb);
  const stereoWidener = new Tone.StereoWidener(0.4);
  stereoWidener.connect(pingPongDelay);
  const compressor = new Tone.Compressor({ threshold: -12, ratio: 3 });
  compressor.connect(stereoWidener);

  const masterVol = new Tone.Volume(-2);

  if (analyser) {
    masterVol.connect(analyser);
    analyser.connect(compressor);
  } else {
    masterVol.connect(compressor);
  }

  // Melody
  const melodyPanner = new Tone.Panner(0);
  melodyPanner.connect(masterVol);
  const { sampler: melodySampler, volume: melodyVolume } = buildPiano(-3, melodyPanner, melodyRelease);

  // Bass
  const bassPanner = new Tone.Panner(-0.3);
  bassPanner.connect(masterVol);
  const bassEQ = new Tone.EQ3({ low: 4, mid: -3, high: -2 });
  bassEQ.connect(bassPanner);
  const { sampler: bassSampler, volume: bassVolume } = buildPiano(-6, bassEQ, bassRelease);

  // Chords
  const chordsPanner = new Tone.Panner(0.3);
  chordsPanner.connect(masterVol);
  const chorus = new Tone.Chorus({ frequency: 1.5, depth: 0.7, wet: 0.2 });
  chorus.start();
  chorus.connect(chordsPanner);
  const { sampler: chordsSampler, volume: chordsVolume } = buildPiano(-10, chorus, chordsRelease);

  const effects: EffectNodes = {
    melodyVolume,
    bassVolume,
    chordsVolume,
    reverb,
    pingPongDelay,
    chorus,
  };

  return {
    melody: createVelocitySampler(melodySampler),
    bass: createVelocitySampler(bassSampler),
    chords: createVelocitySampler(chordsSampler),
    effects,
    cleanup: () => {
      melodySampler.dispose();
      bassSampler.dispose();
      chordsSampler.dispose();
      melodyVolume.dispose();
      bassVolume.dispose();
      chordsVolume.dispose();
      melodyPanner.dispose();
      bassPanner.dispose();
      chordsPanner.dispose();
      bassEQ.dispose();
      chorus.dispose();
      masterVol.dispose();
      compressor.dispose();
      stereoWidener.dispose();
      pingPongDelay.dispose();
      reverb.dispose();
    },
  };
}

export function buildSingleSynth(analyser?: Tone.Analyser): SynthResult {
  const result = buildSynth(analyser);
  return {
    synth: result.melody,
    cleanup: result.cleanup,
  };
}

export function getVelocityCurve(mood: string, length: number): number[] {
  const curves: Record<string, { base: number; variance: number; accent: number }> = {
    Melancholic: { base: 0.4, variance: 0.15, accent: 0.15 },
    Dreamy: { base: 0.35, variance: 0.1, accent: 0.1 },
    Solemn: { base: 0.45, variance: 0.12, accent: 0.12 },
    Tender: { base: 0.5, variance: 0.15, accent: 0.15 },
    Romantic: { base: 0.5, variance: 0.2, accent: 0.2 },
    Ethereal: { base: 0.35, variance: 0.1, accent: 0.1 },
    Triumphant: { base: 0.65, variance: 0.2, accent: 0.25 },
    Majestic: { base: 0.6, variance: 0.18, accent: 0.22 },
    Vibrant: { base: 0.6, variance: 0.2, accent: 0.2 },
    Playful: { base: 0.55, variance: 0.22, accent: 0.2 },
    Fierce: { base: 0.7, variance: 0.2, accent: 0.25 },
    Dramatic: { base: 0.55, variance: 0.25, accent: 0.3 },
  };

  const curve = curves[mood] || { base: 0.5, variance: 0.15, accent: 0.15 };
  const velocities: number[] = [];

  for (let i = 0; i < length; i++) {
    const beatAccent = (i % 4 === 0) ? curve.accent : 0;
    const phraseAccent = (i % 8 === 0 && i > 0) ? curve.accent * 0.5 : 0;
    const randomVar = (Math.random() - 0.5) * curve.variance;

    let vel = curve.base + beatAccent + phraseAccent + randomVar;
    velocities.push(Math.max(0.1, Math.min(1.0, vel)));
  }

  return velocities;
}
