/**
 * Audio analysis data extracted from Tone.js Analyser node
 */
export interface AudioData {
  /** Raw frequency data from FFT analysis (0-255 values) */
  frequencyData: Uint8Array;
  /** Time-domain waveform data */
  timeDomainData: Uint8Array;
  /** Average bass frequency level (0-1) */
  bassLevel: number;
  /** Average mid frequency level (0-1) */
  midLevel: number;
  /** Average treble frequency level (0-1) */
  trebleLevel: number;
  /** Overall average amplitude (0-1) */
  averageLevel: number;
  /** Peak level with slow decay (0-1) */
  peak?: number;
  /** Frame-to-frame bass change for beat detection */
  bassDelta?: number;
  /** Frame-to-frame energy change */
  energyDelta?: number;
}

/**
 * Configuration for visualization based on musical mood
 */
export interface VisualizationConfig {
  /** Primary color in hex */
  primaryColor: string;
  /** Secondary color in hex */
  secondaryColor: string;
  /** Accent color for highlights */
  accentColor: string;
  /** Background color */
  backgroundColor: string;
  /** Base wave amplitude multiplier */
  amplitudeMultiplier: number;
  /** Wave speed multiplier */
  speedMultiplier: number;
  /** Particle count */
  particleCount: number;
  /** Wave complexity (number of overlapping waves) */
  waveComplexity: number;
}

export type MoodConfig = Record<string, VisualizationConfig>;

/**
 * A note event emitted during playback for visualization reactivity
 */
export interface NoteEvent {
  note: string;
  layer: "melody" | "bass" | "chords";
  timestamp: number;
  velocity: number;
}
