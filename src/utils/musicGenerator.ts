import type { Piece } from "../components/MainPage/types";
import {
  keys,
  composers,
  moods,
  forms,
  scales,
  noteNames,
  rootMap,
} from "../data/musicConstants";

// Chord progressions for harmonic context
const chordProgressions = {
  major: [
    [0, 3, 4],    // I - IV - V
    [0, 4, 3],    // I - V - IV
    [0, 3, 0, 4], // I - IV - I - V
    [0, 2, 3, 0], // I - iii - IV - I
    [0, 4, 0, 3], // I - V - I - IV
    [0, 5, 1, 4], // I - vi - ii - V (deceptive)
  ],
  minor: [
    [0, 6, 4],    // i - VI - iv
    [0, 4, 6],    // i - iv - VI
    [0, 5, 4, 0], // i - v - iv - i
    [0, 6, 4, 5], // i - VI - iv - v
    [0, 4, 0, 5], // i - iv - i - v
  ],
};

// Interval weights for more natural melody (prefer stepwise motion)
const intervalWeights: Record<number, number> = {
  0: 12,   // Repeat note
  1: 28,   // Major/minor 2nd (stepwise)
  2: 22,   // Major/minor 3rd
  3: 10,   // Perfect 4th
  4: 14,   // Perfect 5th
  5: 6,    // Major/minor 6th
  6: 3,    // Major/minor 7th
  7: 5,    // Octave
};

// Melodic patterns for more authentic generation
const melodicPatterns = {
  major: [
    // Rising patterns
    [0, 2, 4, 7],      // Arpeggio up
    [0, 2, 4, 2],      // Zigzag up
    [0, 1, 2, 3, 4],   // Scale up
    [0, 4, 2, 1],      // Zigzag down
    // Descending patterns
    [7, 4, 2, 0],      // Arpeggio down
    [4, 2, 1, 0],      // Scale down
    [7, 6, 4, 2],      // Thirds down
    // Ornamentation patterns
    [0, 1, 0, 2, 0],   // Turn-like
    [0, 2, 1, 2],      // Neighbor tone
    [4, 5, 4, 3],      // Upper neighbor
  ],
  minor: [
    [0, 2, 3, 7],      // Minor arpeggio up
    [0, 2, 3, 2],      // Minor zigzag up
    [0, 1, 2, 3],      // Natural minor up
    [7, 3, 2, 0],      // Minor arpeggio down
    [3, 2, 1, 0],      // Minor scale down
    [0, 2, 1, 2],      // Minor neighbor
  ],
};

const DIRECTION_MEMORY = 3;

interface MelodyState {
  currentScaleDegree: number;
  currentOctave: number;
  lastDirection: number;
  directionCount: number;
}

/**
 * Weighted random selection
 */
function weightedRandom(weights: Record<number, number>): number {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let random = Math.random() * total;
  for (const [value, weight] of Object.entries(weights)) {
    random -= weight;
    if (random <= 0) return parseInt(value);
  }
  return 0;
}

/**
 * Get next scale degree with weighted intervals
 */
function getNextScaleDegree(state: MelodyState, scaleLength: number): number {
  const possibleIntervals = Object.keys(intervalWeights).map(Number);
  const validIntervals = possibleIntervals.filter((interval) => {
    const direction = interval >= 0 ? 1 : -1;
    const absInterval = Math.abs(interval);

    // Direction continuation bias
    const shouldContinueDirection =
      state.directionCount > 0 &&
      state.directionCount < DIRECTION_MEMORY &&
      Math.random() < 0.7;

    if (shouldContinueDirection && direction !== state.lastDirection && state.lastDirection !== 0) {
      return false;
    }

    const newDegree = state.currentScaleDegree + (direction === 1 ? absInterval : -absInterval);
    return newDegree >= -2 && newDegree <= scaleLength + 1;
  });

  const intervals = validIntervals.length > 0 ? validIntervals : possibleIntervals;
  const validWeights: Record<number, number> = {};
  for (const interval of intervals) {
    validWeights[interval] = intervalWeights[interval] || 1;
  }

  return weightedRandom(validWeights);
}

/**
 * Convert scale degree to note name
 */
function scaleDegreeToNote(
  degree: number,
  octave: number,
  root: number,
  mode: "major" | "minor"
): string {
  const scaleIntervals = scales[mode];
  const normalizedDegree = ((degree % scaleIntervals.length) + scaleIntervals.length) % scaleIntervals.length;
  const octaveAdjust = Math.floor(degree / scaleIntervals.length);

  const midiBase = root + scaleIntervals[normalizedDegree];
  const finalOctave = octave + octaveAdjust + 3;

  return noteNames[midiBase % 12] + finalOctave;
}

/**
 * Get beat count for duration notation
 */
function getBeatCount(duration: string): number {
  const beatMap: Record<string, number> = {
    "8n": 0.5,
    "4n": 1,
    "2n": 2,
    "1n": 4,
    "16n": 0.25,
  };
  return beatMap[duration] || 1;
}

/**
 * Generate melodic pattern (more authentic than random)
 */
function generatePattern(
  state: MelodyState,
  root: number,
  mode: "major" | "minor",
  scaleLength: number
): { notes: string[]; degrees: number[] } {
  const patterns = melodicPatterns[mode];
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];

  const notes: string[] = [];
  const degrees: number[] = [];

  // Start from current position and follow pattern
  let currentDegree = state.currentScaleDegree;
  let currentOctave = state.currentOctave;

  for (const interval of pattern) {
    currentDegree += interval;

    // Handle octave changes
    if (currentDegree >= scaleLength) {
      currentDegree -= scaleLength;
      currentOctave++;
    } else if (currentDegree < 0) {
      currentDegree += scaleLength;
      currentOctave--;
    }

    // Limit range
    if (currentOctave > 1) {
      currentOctave = 1;
      currentDegree = scaleLength - 1;
    } else if (currentOctave < -1) {
      currentOctave = -1;
      currentDegree = 0;
    }

    degrees.push(currentDegree);
    notes.push(scaleDegreeToNote(currentDegree, currentOctave, root, mode));
  }

  // Update state
  state.currentScaleDegree = currentDegree;
  state.currentOctave = currentOctave;

  return { notes, degrees };
}

/**
 * Generate a musical phrase
 */
function generatePhrase(
  keyStr: string,
  mood: string,
  _chordProgression: number[],
  _phraseIndex: number
): { notes: string[]; durations: string[]; velocities: number[] } {
  const parts = keyStr.split(" ");
  const rootName = parts[0];
  const mode = parts[1] === "minor" ? "minor" : "major";
  const root = rootMap[rootName];
  const scaleIntervals = scales[mode];
  const scaleLength = scaleIntervals.length;

  // Phrase parameters based on mood
  const isSlow = mood === "Melancholic" || mood === "Dreamy" || mood === "Solemn";
  const isEnergetic = mood === "Playful" || mood === "Fierce" || mood === "Triumphant";

  const phraseLengthBeats = 4 + Math.floor(Math.random() * 4);
  const targetNotes = isSlow ? 8 + Math.floor(Math.random() * 4) : 10 + Math.floor(Math.random() * 8);

  const notes: string[] = [];
  const durations: string[] = [];
  const velocities: number[] = [];

  // Base velocity for this mood
  const moodVelocities: Record<string, number> = {
    Melancholic: 0.45,
    Dreamy: 0.35,
    Solemn: 0.5,
    Tender: 0.5,
    Romantic: 0.55,
    Ethereal: 0.35,
    Triumphant: 0.7,
    Majestic: 0.65,
    Vibrant: 0.6,
    Playful: 0.6,
    Fierce: 0.75,
    Dramatic: 0.6,
  };
  const baseVelocity = moodVelocities[mood] || 0.5;

  // Starting state
  const state: MelodyState = {
    currentScaleDegree: 0,
    currentOctave: 0,
    lastDirection: 0,
    directionCount: 0,
  };

  let beatInPhrase = 0;
  let notesInPhrase = 0;

  while (notesInPhrase < targetNotes && beatInPhrase < phraseLengthBeats * 4) {
    // Decide whether to use pattern or stepwise motion
    const usePattern = Math.random() < 0.4 && notesInPhrase < targetNotes - 4;

    if (usePattern) {
      const pattern = generatePattern(state, root, mode, scaleLength);
      for (let i = 0; i < pattern.notes.length && notesInPhrase < targetNotes; i++) {
        const isOnBeat = beatInPhrase % 1 === 0;
        const duration = isOnBeat && Math.random() < 0.5 ? "4n" : "8n";

        notes.push(pattern.notes[i]);
        durations.push(duration);

        // Dynamic shaping
        const beatAccent = (notesInPhrase % 4 === 0) ? 0.15 : 0;
        const phrasePos = notesInPhrase / targetNotes;
        const phraseCurve = Math.sin(phrasePos * Math.PI) * 0.1; // Arch shape

        velocities.push(Math.min(1, baseVelocity + beatAccent + phraseCurve + (Math.random() - 0.5) * 0.1));

        beatInPhrase += getBeatCount(duration);
        notesInPhrase++;
      }
    } else {
      // Stepwise motion
      const interval = getNextScaleDegree(state, scaleLength);
      state.currentScaleDegree += interval;
      const newDirection = interval === 0 ? 0 : interval > 0 ? 1 : -1;

      if (state.currentScaleDegree >= scaleLength) {
        state.currentScaleDegree -= scaleLength;
        state.currentOctave++;
      } else if (state.currentScaleDegree < 0) {
        state.currentScaleDegree += scaleLength;
        state.currentOctave--;
      }

      if (newDirection === state.lastDirection) {
        state.directionCount++;
      } else {
        state.directionCount = 1;
        state.lastDirection = newDirection;
      }

      if (state.currentOctave > 1) {
        state.currentOctave = 1;
        state.currentScaleDegree = scaleLength - 1;
      } else if (state.currentOctave < -1) {
        state.currentOctave = -1;
        state.currentScaleDegree = 0;
      }

      const note = scaleDegreeToNote(state.currentScaleDegree, state.currentOctave, root, mode);
      notes.push(note);

      // Duration based on position
      const isNearEnd = beatInPhrase >= phraseLengthBeats * 4 - 2;
      const duration = isNearEnd && !isEnergetic ? "2n" : Math.random() < 0.3 ? "8n" : "4n";
      durations.push(duration);

      // Velocity with beat emphasis
      const beatAccent = (notesInPhrase % 4 === 0) ? 0.15 : 0;
      velocities.push(Math.min(1, baseVelocity + beatAccent + (Math.random() - 0.5) * 0.1));

      beatInPhrase += getBeatCount(duration);
      notesInPhrase++;
    }
  }

  // Cadence - end on tonic or dominant with longer note
  if (notes.length > 0) {
    const endingDegree = Math.random() < 0.7 ? 0 : 4;
    notes[notes.length - 1] = scaleDegreeToNote(endingDegree, 0, root, mode);
    durations[durations.length - 1] = "2n";
    velocities[velocities.length - 1] = baseVelocity - 0.1; // Softer ending
  }

  return { notes, durations, velocities };
}

/**
 * Generate complete melody with dynamics
 */
function generateMelody(keyStr: string, mood: string): {
  notes: string[];
  durations: string[];
  chordProgression: number[];
  totalBeats: number;
  velocities: number[];
} {
  const parts = keyStr.split(" ");
  const mode = parts[1] === "minor" ? "minor" : "major";

  const progressions = chordProgressions[mode];
  const chordProgression = progressions[Math.floor(Math.random() * progressions.length)];

  const numPhrases = 6 + Math.floor(Math.random() * 5);

  const allNotes: string[] = [];
  const allDurations: string[] = [];
  const allVelocities: number[] = [];

  // Build velocity curve based on mood
  const moodVelocities: Record<string, { base: number; variance: number; accent: number }> = {
    Melancholic: { base: 0.4, variance: 0.1, accent: 0.1 },
    Dreamy: { base: 0.35, variance: 0.08, accent: 0.08 },
    Solemn: { base: 0.45, variance: 0.1, accent: 0.1 },
    Tender: { base: 0.5, variance: 0.12, accent: 0.12 },
    Romantic: { base: 0.5, variance: 0.15, accent: 0.15 },
    Ethereal: { base: 0.35, variance: 0.08, accent: 0.08 },
    Triumphant: { base: 0.65, variance: 0.15, accent: 0.2 },
    Majestic: { base: 0.6, variance: 0.12, accent: 0.15 },
    Vibrant: { base: 0.6, variance: 0.15, accent: 0.15 },
    Playful: { base: 0.55, variance: 0.15, accent: 0.15 },
    Fierce: { base: 0.7, variance: 0.15, accent: 0.2 },
    Dramatic: { base: 0.55, variance: 0.2, accent: 0.25 },
  };

  const velParams = moodVelocities[mood] || { base: 0.5, variance: 0.12, accent: 0.12 };

  for (let i = 0; i < numPhrases; i++) {
    const phrase = generatePhrase(keyStr, mood, chordProgression, i);
    allNotes.push(...phrase.notes);
    allDurations.push(...phrase.durations);

    // Add phrase-level dynamics (second phrase louder, etc.)
    const phraseMultiplier = i === numPhrases - 1 ? 1.1 : i === 1 ? 1.05 : 1.0;
    for (const v of phrase.velocities) {
      allVelocities.push(Math.min(1, v * phraseMultiplier));
    }

    if (i < numPhrases - 1) {
      allDurations[allDurations.length - 1] = "2n";
    }
  }

  // Calculate total beats
  let totalBeats = 0;
  for (const dur of allDurations) {
    totalBeats += getBeatCount(dur);
  }
  totalBeats = Math.ceil(totalBeats / 4) * 4;

  // Apply final velocity curve with beat emphasis
  for (let i = 0; i < allVelocities.length; i++) {
    const beatAccent = (i % 4 === 0) ? velParams.accent : 0;
    const randomVar = (Math.random() - 0.5) * velParams.variance;
    allVelocities[i] = Math.max(0.15, Math.min(1, velParams.base + beatAccent + randomVar));
  }

  const maxLength = 256;
  if (allNotes.length > maxLength) {
    return {
      notes: allNotes.slice(0, maxLength),
      durations: allDurations.slice(0, maxLength),
      chordProgression,
      totalBeats,
      velocities: allVelocities.slice(0, maxLength),
    };
  }

  return { notes: allNotes, durations: allDurations, chordProgression, totalBeats, velocities: allVelocities };
}

/**
 * Generate bass line with proper rhythm
 */
function generateBass(
  keyStr: string,
  totalBeats: number,
  chordProgression: number[]
): { notes: string[]; durations: string[]; velocities: number[] } {
  const parts = keyStr.split(" ");
  const rootName = parts[0];
  const mode = parts[1] === "minor" ? "minor" : "major";
  const root = rootMap[rootName];
  const scaleIntervals = scales[mode];

  const bassNotes: string[] = [];
  const bassDurations: string[] = [];
  const bassVelocities: number[] = [];

  let currentBeat = 0;
  let chordIndex = 0;

  while (currentBeat < totalBeats) {
    const chordRoot = chordProgression[chordIndex % chordProgression.length];
    const normalizedRoot = ((chordRoot % scaleIntervals.length) + scaleIntervals.length) % scaleIntervals.length;
    const bassNote = noteNames[(root + scaleIntervals[normalizedRoot]) % 12] + "2";

    // Bass rhythm pattern
    const useWhole = Math.random() < 0.4;
    const useQuarter = Math.random() < 0.3;

    if (useWhole) {
      bassNotes.push(bassNote);
      bassDurations.push("1n");
      bassVelocities.push(0.5 + Math.random() * 0.1);
      currentBeat += 4;
    } else if (useQuarter) {
      bassNotes.push(bassNote, bassNote, bassNote, bassNote);
      bassDurations.push("4n", "4n", "4n", "4n");
      bassVelocities.push(0.55, 0.45, 0.5, 0.4);
      currentBeat += 4;
    } else {
      bassNotes.push(bassNote, bassNote);
      bassDurations.push("2n", "2n");
      bassVelocities.push(0.5, 0.45);
      currentBeat += 4;
    }

    chordIndex++;
  }

  return { notes: bassNotes, durations: bassDurations, velocities: bassVelocities };
}

/**
 * Generate chord accompaniment
 */
function generateChords(
  keyStr: string,
  totalBeats: number,
  chordProgression: number[],
  mood: string
): { notes: string[]; durations: string[]; velocities: number[] } {
  const parts = keyStr.split(" ");
  const rootName = parts[0];
  const mode = parts[1] === "minor" ? "minor" : "major";
  const root = rootMap[rootName];
  const scaleIntervals = scales[mode];

  const chordNotes: string[] = [];
  const chordDurations: string[] = [];
  const chordVelocities: number[] = [];

  const useArpeggios = mood === "Playful" || mood === "Dreamy" || mood === "Ethereal";

  let currentBeat = 0;
  let chordIndex = 0;

  while (currentBeat < totalBeats) {
    const chordRoot = chordProgression[chordIndex % chordProgression.length];
    const normalizedRoot = ((chordRoot % scaleIntervals.length) + scaleIntervals.length) % scaleIntervals.length;

    // Build triad
    const thirdDegree = (normalizedRoot + 2) % scaleIntervals.length;
    const fifthDegree = (normalizedRoot + 4) % scaleIntervals.length;

    const rootNote = noteNames[(root + scaleIntervals[normalizedRoot]) % 12] + "3";
    const thirdNote = noteNames[(root + scaleIntervals[thirdDegree]) % 12] + "4";
    const fifthNote = noteNames[(root + scaleIntervals[fifthDegree]) % 12] + "4";

    const chord = [rootNote, thirdNote, fifthNote];
    const chordVel = 0.25 + Math.random() * 0.08;

    if (useArpeggios) {
      // Arpeggiated
      const arpPattern = Math.random() < 0.5 ? [0, 1, 2, 1] : [0, 2, 1, 2];
      for (const idx of arpPattern) {
        if (currentBeat >= totalBeats) break;
        chordNotes.push(chord[idx]);
        chordDurations.push("4n");
        chordVelocities.push(chordVel);
        currentBeat++;
      }
    } else {
      // Block chords
      chordNotes.push(...chord);
      chordDurations.push("2n", "2n", "2n");
      chordVelocities.push(chordVel, chordVel * 0.9, chordVel * 0.85);
      currentBeat += 2;
    }

    chordIndex++;
  }

  return { notes: chordNotes, durations: chordDurations, velocities: chordVelocities };
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Adjust tempo based on mood
 */
function getTempoForMood(mood: string): number {
  const moodTempos: Record<string, [number, number]> = {
    Melancholic: [52, 68],
    Dreamy: [58, 76],
    Solemn: [50, 64],
    Tender: [64, 88],
    Romantic: [68, 96],
    Ethereal: [62, 86],
    Triumphant: [100, 132],
    Majestic: [76, 116],
    Vibrant: [116, 144],
    Playful: [116, 144],
    Fierce: [132, 168],
    Dramatic: [76, 132],
  };

  const [min, max] = moodTempos[mood] || [60, 120];
  return min + Math.floor(Math.random() * (max - min));
}

export function generateSong(): Piece {
  const mood = randomFrom(moods);
  const keyStr = randomFrom(keys);
  const { notes, durations, chordProgression, totalBeats, velocities } = generateMelody(keyStr, mood);
  const tempo = getTempoForMood(mood);

  const bass = generateBass(keyStr, totalBeats, chordProgression);
  const chords = generateChords(keyStr, totalBeats, chordProgression, mood);

  return {
    title: `${randomFrom(forms)} No. ${Math.floor(Math.random() * 30) + 1}`,
    subtitle: `Op. ${Math.floor(Math.random() * 130) + 1}`,
    composer: randomFrom(composers),
    year: Math.floor(Math.random() * 300) + 1600,
    key: keyStr,
    tempo,
    mood,
    notes,
    durations,
    velocities,
    bass,
    chords,
    generated: true,
  };
}
