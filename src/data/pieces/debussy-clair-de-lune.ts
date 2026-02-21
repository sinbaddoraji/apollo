import type { Piece } from "../../components/MainPage/types";

export const debussyClairDeLune: Piece = {
  title: "Clair de Lune",
  subtitle: "Suite bergamasque",
  composer: "Debussy",
  year: 1905,
  key: "Db major",
  tempo: 60,
  mood: "Ethereal",
  notes: [
    // === Section A: Opening theme — pp, mysterious, floating ===
    // m1-2: gentle arpeggiated ascent
    "F4", "Ab4", "Db5", "F5",
    "Eb5", "Db5", "Bb4", "Ab4",
    // m3-4: descending whole-tone color
    "Gb4", "F4", "Eb4", "Db4",
    "Eb4", "F4", "Ab4", "Bb4",
    // m5-6: theme restated with upper neighbor tones
    "F4", "Ab4", "Db5", "F5",
    "Gb5", "F5", "Eb5", "Db5",
    // m7-8: gentle descent with added 6th color
    "Bb4", "Ab4", "Gb4", "F4",
    "Eb4", "Db4", "Eb4", "F4",

    // === Section A': Theme with whole-tone inflection ===
    // m9-10: rising through Db major with Gb color
    "Ab4", "Bb4", "Db5", "Eb5",
    "F5", "Gb5", "Ab5", "Gb5",
    // m11-12: falling back, lingering on Eb
    "F5", "Eb5", "Db5", "Bb4",
    "Ab4", "Gb4", "Ab4", "Bb4",
    // m13-14: echo of opening, softer
    "Db5", "Eb5", "F5", "Eb5",
    "Db5", "Bb4", "Ab4", "Gb4",
    // m15-16: cadential settling
    "F4", "Eb4", "Db4", "Eb4",
    "F4", "Ab4", "Db5",

    // === Section B: Più mosso — flowing arpeggios ===
    // m17-18: sweeping arpeggio in Ab
    "Ab4", "C5", "Eb5", "Ab5", "Eb5", "C5",
    "Ab4", "Bb4", "C5", "Eb5", "F5", "Eb5",
    // m19-20: Db major arpeggio with passing tones
    "Db5", "F5", "Ab5", "Db6", "Ab5", "F5",
    "Db5", "Eb5", "F5", "Ab5", "Bb5", "Ab5",
    // m21-22: whole-tone passage — C D E F# G#
    "C5", "D5", "E5", "Gb5", "Ab5", "Bb5",
    "Ab5", "Gb5", "E5", "D5", "C5", "Bb4",
    // m23-24: return to Db tonality from whole-tone
    "Ab4", "Bb4", "Db5", "Eb5", "F5", "Ab5",
    "Gb5", "F5", "Eb5", "Db5", "Bb4", "Ab4",

    // === Section B': Più mosso, intensifying ===
    // m25-26: rising sequence with 9th colors
    "Db5", "Eb5", "Gb5", "Ab5", "Bb5", "Ab5",
    "Gb5", "F5", "Eb5", "Db5",
    // m27-28: climactic arpeggio reaching high Db
    "F5", "Ab5", "Bb5", "Db6", "Eb6", "Db6",
    "Bb5", "Ab5", "F5", "Eb5",
    // m29-30: gentle descent with added-note harmony
    "Db5", "Eb5", "F5", "Gb5", "F5", "Eb5",
    "Db5", "C5", "Bb4", "Ab4",
    // m31-32: sequence echoing, fading slightly
    "Bb4", "Db5", "Eb5", "F5", "Gb5", "F5",
    "Eb5", "Db5", "Bb4", "Ab4",

    // === Section C: Tempo rubato — the expressive heart ===
    // m33-34: lyrical singing melody, mf
    "F5", "Gb5", "Ab5", "Bb5",
    "Ab5", "Gb5", "F5", "Eb5",
    // m35-36: tender descending phrase
    "Db5", "Eb5", "F5", "Eb5",
    "Db5", "Bb4", "Ab4", "Gb4",
    // m37-38: reaching upward with longing
    "Ab4", "Db5", "F5", "Ab5",
    "Gb5", "F5", "Eb5", "Db5",
    // m39-40: whole-tone coloring again
    "C5", "D5", "E5", "Gb5",
    "Ab5", "Gb5", "E5", "D5",
    // m41-42: resolving back toward Db
    "Db5", "Eb5", "F5", "Gb5",
    "Ab5", "F5", "Db5", "Ab4",

    // === Section A'': Return of opening — ppp, like a memory ===
    // m43-44: opening theme, hushed
    "F4", "Ab4", "Db5", "F5",
    "Eb5", "Db5", "Bb4", "Ab4",
    // m45-46: with added 9ths
    "Gb4", "F4", "Eb4", "Db4",
    "Eb4", "Gb4", "Ab4", "Bb4",
    // m47-48: final ascent
    "Db5", "F5", "Ab5", "Db6",
    // m49-50: long final descent, morendo
    "Ab5", "F5", "Db5", "Ab4",
    "Gb4", "F4", "Db4",
  ],
  durations: [
    // === Section A ===
    "4n", "4n", "4n", "2n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "2n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "2n",
    "8n", "4n", "4n", "4n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "2n",

    // === Section A' ===
    "8n", "8n", "8n", "8n",
    "4n", "4n", "2n", "4n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "2n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "2n",

    // === Section B ===
    "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n",
    "8n", "8n", "8n", "8n", "8n", "8n",

    // === Section B' ===
    "8n", "8n", "8n", "8n", "8n", "8n",
    "4n", "4n", "4n", "2n",
    "8n", "8n", "8n", "8n", "8n", "4n",
    "4n", "4n", "4n", "2n",
    "8n", "8n", "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "2n",
    "8n", "8n", "8n", "4n", "4n", "4n",
    "4n", "4n", "4n", "2n",

    // === Section C ===
    "4n", "4n", "4n", "2n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "2n",
    "4n", "4n", "4n", "2n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "2n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "2n",
    "4n", "4n", "4n", "2n",

    // === Section A'' ===
    "4n", "4n", "4n", "2n",
    "4n", "4n", "4n", "4n",
    "4n", "4n", "4n", "2n",
    "4n", "4n", "4n", "4n",
    "2n", "2n", "2n", "1n",
    "2n", "2n", "2n", "2n",
    "2n", "2n", "1n",
  ],
  velocities: [
    // === Section A: pp ===
    0.3, 0.32, 0.35, 0.38,
    0.36, 0.34, 0.32, 0.3,
    0.28, 0.27, 0.26, 0.25,
    0.26, 0.28, 0.3, 0.32,
    0.3, 0.33, 0.36, 0.4,
    0.42, 0.4, 0.38, 0.36,
    0.34, 0.32, 0.3, 0.28,
    0.26, 0.24, 0.25, 0.28,

    // === Section A' ===
    0.32, 0.34, 0.36, 0.38,
    0.42, 0.44, 0.46, 0.44,
    0.42, 0.4, 0.38, 0.35,
    0.33, 0.3, 0.32, 0.34,
    0.36, 0.38, 0.4, 0.38,
    0.36, 0.34, 0.32, 0.3,
    0.28, 0.26, 0.24, 0.25,
    0.27, 0.3, 0.35,

    // === Section B: mp, flowing ===
    0.45, 0.48, 0.5, 0.55, 0.5, 0.48,
    0.45, 0.47, 0.5, 0.52, 0.55, 0.52,
    0.5, 0.55, 0.58, 0.62, 0.58, 0.55,
    0.5, 0.52, 0.55, 0.58, 0.6, 0.58,
    0.48, 0.5, 0.52, 0.55, 0.58, 0.6,
    0.58, 0.55, 0.52, 0.48, 0.45, 0.42,
    0.44, 0.46, 0.5, 0.52, 0.55, 0.58,
    0.55, 0.52, 0.48, 0.45, 0.42, 0.4,

    // === Section B': building ===
    0.5, 0.52, 0.55, 0.58, 0.62, 0.6,
    0.55, 0.52, 0.48, 0.45,
    0.58, 0.62, 0.65, 0.72, 0.75, 0.72,
    0.65, 0.6, 0.55, 0.5,
    0.48, 0.5, 0.52, 0.55, 0.52, 0.5,
    0.48, 0.45, 0.42, 0.4,
    0.42, 0.45, 0.48, 0.5, 0.52, 0.5,
    0.48, 0.45, 0.42, 0.38,

    // === Section C: mf, expressive peak ===
    0.6, 0.62, 0.65, 0.7,
    0.68, 0.65, 0.6, 0.55,
    0.5, 0.52, 0.55, 0.52,
    0.48, 0.45, 0.4, 0.38,
    0.42, 0.5, 0.58, 0.65,
    0.6, 0.55, 0.5, 0.48,
    0.45, 0.48, 0.5, 0.55,
    0.58, 0.55, 0.5, 0.45,
    0.48, 0.5, 0.55, 0.58,
    0.6, 0.55, 0.48, 0.42,

    // === Section A'': ppp, morendo ===
    0.25, 0.27, 0.3, 0.33,
    0.3, 0.28, 0.26, 0.24,
    0.22, 0.2, 0.19, 0.18,
    0.19, 0.2, 0.22, 0.24,
    0.28, 0.3, 0.32, 0.3,
    0.25, 0.22, 0.2, 0.18,
    0.16, 0.14, 0.12,
  ],
  bass: {
    notes: [
      // === Section A ===
      "Db3", "Db3", "Ab2", "Ab2",
      "Gb2", "Gb2", "Ab2", "Ab2",
      "Db3", "Db3", "Ab2", "Ab2",
      "Gb2", "Ab2", "Db3", "Db3",

      // === Section A' ===
      "Ab2", "Ab2", "Db3", "Db3",
      "Gb2", "Gb2", "Ab2", "Ab2",
      "Db3", "Ab2", "Gb2", "Db3",

      // === Section B ===
      "Ab2", "Ab2", "Ab2", "Ab2",
      "Db3", "Db3", "Db3", "Db3",
      "C3", "C3", "Bb2", "Bb2",
      "Ab2", "Ab2", "Db3", "Db3",

      // === Section B' ===
      "Gb2", "Gb2", "Ab2", "Ab2",
      "Db3", "Db3", "Gb2", "Gb2",
      "Ab2", "Ab2", "Db3", "Db3",
      "Gb2", "Gb2", "Ab2", "Ab2",

      // === Section C ===
      "Db3", "Db3", "Gb2", "Gb2",
      "Ab2", "Ab2", "Db3", "Db3",
      "Ab2", "Ab2", "Db3", "Db3",
      "C3", "C3", "Bb2", "Bb2",
      "Db3", "Db3", "Ab2", "Ab2",

      // === Section A'' ===
      "Db3", "Db3", "Ab2", "Ab2",
      "Gb2", "Gb2", "Ab2", "Ab2",
      "Db3", "Ab2",
      "Db3", "Db2",
      "Db2",
    ],
    durations: [
      // === Section A ===
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "1n",

      // === Section A' ===
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "1n",

      // === Section B ===
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "1n",

      // === Section B' ===
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "1n",

      // === Section C ===
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "1n",

      // === Section A'' ===
      "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n",
      "2n", "2n",
      "1n", "1n",
      "1n",
    ],
    velocities: [
      // === Section A ===
      0.25, 0.25, 0.22, 0.22,
      0.2, 0.2, 0.22, 0.22,
      0.25, 0.25, 0.22, 0.22,
      0.2, 0.22, 0.25, 0.25,

      // === Section A' ===
      0.22, 0.22, 0.25, 0.25,
      0.2, 0.2, 0.22, 0.22,
      0.25, 0.22, 0.2, 0.25,

      // === Section B ===
      0.3, 0.3, 0.3, 0.3,
      0.32, 0.32, 0.32, 0.32,
      0.3, 0.3, 0.28, 0.28,
      0.3, 0.3, 0.32, 0.32,

      // === Section B' ===
      0.28, 0.28, 0.3, 0.3,
      0.35, 0.35, 0.28, 0.28,
      0.3, 0.3, 0.32, 0.32,
      0.28, 0.28, 0.3, 0.3,

      // === Section C ===
      0.35, 0.35, 0.3, 0.3,
      0.32, 0.32, 0.35, 0.35,
      0.32, 0.32, 0.35, 0.35,
      0.3, 0.3, 0.28, 0.28,
      0.35, 0.35, 0.3, 0.3,

      // === Section A'' ===
      0.2, 0.2, 0.18, 0.18,
      0.16, 0.16, 0.18, 0.18,
      0.15, 0.15,
      0.12, 0.1,
      0.08,
    ],
  },
  chords: {
    notes: [
      // === Section A: Db major, Bbm, Gb, Ab7 ===
      "Ab3", "Db4", "F4",   "Ab3", "Db4", "F4",
      "Gb3", "Bb3", "Eb4",  "Gb3", "Bb3", "Eb4",
      "Ab3", "Db4", "F4",   "Ab3", "Db4", "F4",
      "Gb3", "Bb3", "Db4",  "Ab3", "C4", "Eb4",

      // === Section A': Db, Ebm7, Gb, Ab ===
      "Ab3", "Db4", "F4",   "Ab3", "Db4", "F4",
      "Eb3", "Gb3", "Bb3",  "Eb3", "Gb3", "Bb3",
      "Ab3", "Db4", "F4",   "Ab3", "C4", "Gb4",
      "Ab3", "Db4", "F4",   "Ab3", "Db4", "F4",

      // === Section B: Ab, Db, C whole-tone, Db ===
      "Ab3", "C4", "Eb4",   "Ab3", "C4", "Eb4",
      "Ab3", "Db4", "F4",   "Ab3", "Db4", "F4",
      "C4", "E4", "Ab4",    "Bb3", "D4", "Gb4",
      "Ab3", "Db4", "F4",   "Ab3", "Db4", "F4",

      // === Section B': Gbmaj7, Ab9, Db, Gbmaj7 ===
      "Gb3", "Bb3", "Db4",  "F3", "Ab3", "Eb4",
      "Ab3", "Db4", "F4",   "Gb3", "Bb3", "Db4",
      "Ab3", "C4", "Eb4",   "Ab3", "Db4", "F4",
      "Gb3", "Bb3", "Db4",  "Ab3", "C4", "Eb4",

      // === Section C: Db, Gbmaj7, Ab7, C dim, Db ===
      "Ab3", "Db4", "F4",   "Gb3", "Bb3", "Eb4",
      "Ab3", "C4", "Eb4",   "Ab3", "Db4", "F4",
      "Ab3", "Db4", "F4",   "Ab3", "Db4", "F4",
      "C4", "E4", "Gb4",    "Bb3", "Db4", "E4",
      "Ab3", "Db4", "F4",   "Ab3", "Db4", "F4",

      // === Section A'': Db, Bbm, Gb, Db ===
      "Ab3", "Db4", "F4",   "Ab3", "Db4", "F4",
      "Gb3", "Bb3", "Eb4",  "Ab3", "C4", "Eb4",
      "Ab3", "Db4", "F4",   "Ab3", "Db4", "F4",
      "Ab3", "Db4", "F4",
    ],
    durations: [
      // === Section A ===
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",

      // === Section A' ===
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",

      // === Section B ===
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",

      // === Section B' ===
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",

      // === Section C ===
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",

      // === Section A'' ===
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "2n", "2n", "2n",   "2n", "2n", "2n",
      "1n", "1n", "1n",
    ],
    velocities: [
      // === Section A ===
      0.2, 0.2, 0.2,   0.2, 0.2, 0.2,
      0.18, 0.18, 0.18, 0.18, 0.18, 0.18,
      0.2, 0.2, 0.2,   0.2, 0.2, 0.2,
      0.18, 0.18, 0.18, 0.2, 0.2, 0.2,

      // === Section A' ===
      0.2, 0.2, 0.2,   0.2, 0.2, 0.2,
      0.18, 0.18, 0.18, 0.18, 0.18, 0.18,
      0.2, 0.2, 0.2,   0.22, 0.22, 0.22,
      0.2, 0.2, 0.2,   0.2, 0.2, 0.2,

      // === Section B ===
      0.28, 0.28, 0.28, 0.28, 0.28, 0.28,
      0.3, 0.3, 0.3,   0.3, 0.3, 0.3,
      0.28, 0.28, 0.28, 0.26, 0.26, 0.26,
      0.28, 0.28, 0.28, 0.28, 0.28, 0.28,

      // === Section B' ===
      0.26, 0.26, 0.26, 0.28, 0.28, 0.28,
      0.32, 0.32, 0.32, 0.26, 0.26, 0.26,
      0.28, 0.28, 0.28, 0.3, 0.3, 0.3,
      0.26, 0.26, 0.26, 0.28, 0.28, 0.28,

      // === Section C ===
      0.32, 0.32, 0.32, 0.28, 0.28, 0.28,
      0.3, 0.3, 0.3,   0.32, 0.32, 0.32,
      0.3, 0.3, 0.3,   0.3, 0.3, 0.3,
      0.28, 0.28, 0.28, 0.26, 0.26, 0.26,
      0.32, 0.32, 0.32, 0.3, 0.3, 0.3,

      // === Section A'' ===
      0.15, 0.15, 0.15, 0.15, 0.15, 0.15,
      0.12, 0.12, 0.12, 0.14, 0.14, 0.14,
      0.12, 0.12, 0.12, 0.1, 0.1, 0.1,
      0.08, 0.08, 0.08,
    ],
  },
};
