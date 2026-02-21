import type { Piece } from "../../components/MainPage/types";

export const bachToccataFugue: Piece = {
  title: "Toccata and Fugue",
  subtitle: "in D Minor",
  composer: "Bach",
  year: 1703,
  key: "D minor",
  tempo: 90,
  mood: "Dramatic",
  notes: [
    // === TOCCATA: Opening adagio mordent ===
    "A5", "G5", "A5",
    "rest",
    "G5", "F5", "E5", "D5", "C#5", "D5",
    "rest",
    "A4", "G4", "A4",
    "rest",
    "G4", "F4", "E4", "D4", "C#4", "D4",
    "rest",

    // === Toccata: Descending diminished arpeggios ===
    "A5", "E5", "C5", "A4", "F4", "D4", "C#4", "D4",
    "A5", "F5", "D5", "A4", "F4", "D4",
    "G5", "E5", "Bb4", "G4", "E4", "C#4", "D4",

    // === Toccata: Virtuosic passage work ===
    "D5", "E5", "F5", "G5", "A5", "Bb5", "A5", "G5",
    "F5", "E5", "D5", "C#5", "D5", "E5", "F5", "G5",
    "A5", "G5", "F5", "E5", "D5", "C5", "Bb4", "A4",
    "G4", "A4", "Bb4", "C5", "D5", "C5", "Bb4", "A4",

    // === Toccata: Pedal point passage ===
    "F5", "E5", "F5", "D5",
    "G5", "F5", "G5", "E5",
    "A5", "G5", "A5", "F5",
    "Bb5", "A5", "G5", "F5", "E5", "D5",

    // === FUGUE: Subject exposition (voice 1 - soprano) ===
    "A4", "D5", "C5", "D5", "E5", "F5", "C#5", "D5",
    "E5", "A4", "Bb4", "C5", "D5", "E5", "F5", "G5",
    "F5", "E5", "D5", "C#5", "D5",

    // === Fugue: Answer (voice 2 - alto, at the fifth) ===
    "E4", "A4", "G4", "A4", "Bb4", "C5", "G4", "A4",
    "Bb4", "E4", "F4", "G4", "A4", "Bb4", "C5", "D5",
    "C5", "Bb4", "A4", "G#4", "A4",

    // === Fugue: Counter-subject (soprano continues) ===
    "D5", "C5", "Bb4", "A4", "G4", "F4", "E4", "F4",
    "G4", "A4", "Bb4", "A4", "G4", "F4", "G4", "A4",

    // === Fugue: Subject entry (voice 3 - bass register, octave up for melody line) ===
    "D4", "G4", "F4", "G4", "A4", "Bb4", "F#4", "G4",
    "A4", "D4", "E4", "F4", "G4", "A4", "Bb4", "C5",
    "Bb4", "A4", "G4", "F#4", "G4",

    // === Fugue: Episode 1 - Sequential development ===
    "D5", "C5", "D5", "Bb4", "A4", "G4", "A4", "F4",
    "G4", "F4", "G4", "E4", "F4", "E4", "F4", "D4",
    "E4", "D4", "E4", "C4", "D4", "C4", "D4", "Bb3",

    // === Fugue: Stretto (overlapping entries) ===
    "A4", "D5", "C5", "D5", "E5", "F5", "C#5", "D5",
    "A4", "D5", "C5", "D5", "E5", "F5",
    "G5", "F5", "E5", "D5", "C#5", "D5", "E5", "F5",
    "G5", "A5", "Bb5", "A5", "G5", "F5", "E5", "D5",

    // === Fugue: Final episode and cadential passage ===
    "C#5", "D5", "E5", "F5", "G5", "F5", "E5", "D5",
    "C5", "Bb4", "A4", "G4", "F4", "E4", "D4", "C#4",

    // === Coda: Grand toccata return ===
    "D4", "A4", "D5", "F5", "A5",
    "G5", "F5", "E5", "D5", "C#5",
    "D5",
  ],
  durations: [
    // Opening adagio mordent
    "16n", "16n", "2n",
    "8n",
    "16n", "16n", "16n", "16n", "16n", "2n",
    "8n",
    "16n", "16n", "2n",
    "8n",
    "16n", "16n", "16n", "16n", "16n", "2n",
    "8n",

    // Descending diminished arpeggios
    "16n", "16n", "16n", "16n", "16n", "16n", "16n", "4n",
    "16n", "16n", "16n", "16n", "16n", "4n",
    "16n", "16n", "16n", "16n", "16n", "16n", "4n",

    // Virtuosic passage work
    "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n",
    "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n",
    "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n",
    "16n", "16n", "16n", "16n", "16n", "16n", "16n", "16n",

    // Pedal point passage
    "8n", "8n", "8n", "4n",
    "8n", "8n", "8n", "4n",
    "8n", "8n", "8n", "4n",
    "8n", "8n", "8n", "8n", "8n", "2n",

    // Fugue subject (soprano)
    "8n", "8n", "16n", "16n", "8n", "8n", "16n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "4n",

    // Fugue answer (alto)
    "8n", "8n", "16n", "16n", "8n", "8n", "16n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "4n",

    // Counter-subject
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "4n",

    // Subject entry (voice 3)
    "8n", "8n", "16n", "16n", "8n", "8n", "16n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "4n",

    // Episode 1 - sequences
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "4n",

    // Stretto
    "8n", "8n", "16n", "16n", "8n", "8n", "16n", "8n",
    "8n", "8n", "16n", "16n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "4n",

    // Final episode
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "4n",

    // Coda
    "8n", "8n", "8n", "8n", "4n",
    "8n", "8n", "8n", "8n", "4n",
    "1n",
  ],
  bass: {
    notes: [
      // Toccata opening - organ pedal tones
      "D2", "D2", "D2", "D2",
      "D2", "A2", "D2", "A2",
      "Bb2", "A2", "G2", "A2",
      "D2", "D2",

      // Toccata passage work
      "D2", "C2", "Bb1", "A1",
      "D2", "E2", "F2", "G2",
      "A2", "G2", "F2", "E2",

      // Pedal point
      "D2", "D2", "D2", "D2",
      "D2", "D2",

      // Fugue exposition
      "D3", "A2", "D3", "G2",
      "A2", "D3", "A2", "D3",
      "G2", "C3", "F2", "Bb2",
      "A2", "D3", "G2", "A2",

      // Fugue development
      "D3", "C3", "Bb2", "A2",
      "G2", "F2", "E2", "D2",
      "A2", "Bb2", "C3", "D3",
      "G2", "A2", "Bb2", "A2",

      // Stretto and cadence
      "D3", "A2", "D3", "G2",
      "C3", "F2", "Bb2", "A2",
      "D3", "G2", "A2", "D3",

      // Coda
      "D2", "A2", "D2", "A1",
      "D2",
    ],
    durations: [
      // Toccata opening
      "1n", "1n", "1n", "1n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "1n", "1n",

      // Toccata passage
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",

      // Pedal point
      "1n", "1n", "1n", "1n",
      "1n", "1n",

      // Fugue exposition
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",

      // Fugue development
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",

      // Stretto and cadence
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",

      // Coda
      "2n", "2n", "2n", "2n",
      "1n",
    ],
  },
  chords: {
    notes: [
      // Toccata opening - sustained organ chords
      "D4", "F4", "A4",   "D4", "F4", "A4",
      "D4", "F4", "A4",   "D4", "F4", "A4",
      "A3", "C#4", "E4",  "A3", "C#4", "E4",
      "Bb3", "D4", "F4",  "A3", "C#4", "E4",
      "G3", "Bb3", "D4",  "A3", "C#4", "E4",
      "D4", "F4", "A4",   "D4", "F4", "A4",

      // Toccata passage chords
      "D4", "F4", "A4",   "C4", "E4", "G4",
      "Bb3", "D4", "F4",  "A3", "C#4", "E4",
      "D4", "F4", "A4",   "E4", "G4", "Bb4",
      "F4", "A4", "C5",   "G4", "Bb4", "D5",
      "A3", "C#4", "E4",  "A3", "C#4", "E4",

      // Pedal point chords
      "D4", "F4", "A4",   "D4", "F4", "A4",
      "D4", "F4", "A4",   "D4", "F4", "A4",
      "D4", "F4", "A4",   "D4", "F4", "A4",

      // Fugue exposition chords
      "D4", "F4", "A4",   "A3", "C#4", "E4",
      "D4", "F4", "A4",   "G3", "Bb3", "D4",
      "A3", "C#4", "E4",  "D4", "F4", "A4",
      "A3", "C#4", "E4",  "D4", "F4", "A4",
      "G3", "Bb3", "D4",  "C4", "E4", "G4",
      "F3", "A3", "C4",   "Bb3", "D4", "F4",
      "A3", "C#4", "E4",  "D4", "F4", "A4",
      "G3", "Bb3", "D4",  "A3", "C#4", "E4",

      // Fugue development chords
      "D4", "F4", "A4",   "C4", "E4", "G4",
      "Bb3", "D4", "F4",  "A3", "C#4", "E4",
      "G3", "Bb3", "D4",  "F3", "A3", "C4",
      "E3", "G3", "Bb3",  "D3", "F3", "A3",
      "A3", "C#4", "E4",  "Bb3", "D4", "F4",
      "C4", "E4", "G4",   "D4", "F4", "A4",
      "G3", "Bb3", "D4",  "A3", "C#4", "E4",
      "Bb3", "D4", "F4",  "A3", "C#4", "E4",

      // Stretto and cadence chords
      "D4", "F4", "A4",   "A3", "C#4", "E4",
      "D4", "F4", "A4",   "G3", "Bb3", "D4",
      "C4", "E4", "G4",   "F3", "A3", "C4",
      "Bb3", "D4", "F4",  "A3", "C#4", "E4",
      "D4", "F4", "A4",   "G3", "Bb3", "D4",
      "A3", "C#4", "E4",  "D4", "F4", "A4",

      // Coda chords
      "D4", "F4", "A4",   "A3", "C#4", "E4",
      "D3", "F3", "A3",   "A3", "C#4", "E4",
      "D4", "F4", "A4",
    ],
    durations: [
      // Toccata opening
      "1n", "1n", "1n",   "1n", "1n", "1n",
      "1n", "1n", "1n",   "1n", "1n", "1n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "1n", "1n", "1n",   "1n", "1n", "1n",

      // Toccata passage
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",

      // Pedal point
      "1n", "1n", "1n",   "1n", "1n", "1n",
      "1n", "1n", "1n",   "1n", "1n", "1n",
      "1n", "1n", "1n",   "1n", "1n", "1n",

      // Fugue exposition
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",

      // Fugue development
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",

      // Stretto and cadence
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",

      // Coda
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "1n", "1n", "1n",
    ],
  },
};
