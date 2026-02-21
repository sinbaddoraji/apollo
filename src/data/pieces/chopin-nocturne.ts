import type { Piece } from "../../components/MainPage/types";

export const chopinNocturne: Piece = {
  title: "Nocturne in E-flat",
  subtitle: "Op. 9, No. 2",
  composer: "Chopin",
  year: 1832,
  key: "Eb major",
  tempo: 72,
  mood: "Dreamy",
  notes: [
    // === A Section: Opening theme ===
    // Phrase 1 - gentle opening with upward arc
    "Bb4", "C5", "D5", "Eb5", "F5", "Eb5", "D5", "C5",
    "Bb4", "Ab4", "G4", "F4", "Eb4",
    // Phrase 2 - repeat with rising extension
    "Bb4", "C5", "D5", "Eb5", "F5", "G5", "Ab5", "G5",
    "F5", "Eb5", "D5", "C5", "Bb4",
    // Phrase 3 - ornamental turn on Eb5
    "Eb5", "F5", "Eb5", "D5", "Eb5", "G5", "F5", "Eb5",
    "D5", "C5", "Bb4", "Ab4", "Bb4",
    // Phrase 4 - graceful descent with chromatic touch
    "C5", "D5", "Eb5", "E5", "F5", "Eb5", "D5", "Db5",
    "C5", "Bb4", "Ab4", "G4", "Ab4", "Bb4", "Eb4",

    // === A' Section: Theme varied with ornamentation ===
    // Phrase 5 - theme with added grace notes
    "Bb4", "C5", "Db5", "D5", "Eb5", "F5", "Gb5", "F5",
    "Eb5", "D5", "C5", "Bb4", "Ab4", "Bb4",
    // Phrase 6 - soaring line
    "C5", "D5", "Eb5", "F5", "G5", "Ab5", "Bb5", "Ab5",
    "G5", "F5", "Eb5", "D5", "C5", "Bb4",
    // Phrase 7 - filigree ornament
    "Eb5", "F5", "G5", "F5", "Eb5", "F5", "G5", "Ab5",
    "G5", "F5", "Eb5", "D5", "Eb5", "F5", "Eb5",
    // Phrase 8 - tender resolution to tonic
    "D5", "C5", "Bb4", "Ab4", "G4", "F4", "Eb4", "F4",
    "G4", "Ab4", "Bb4", "C5", "Bb4", "Ab4", "G4", "Eb4",

    // === B Section: Contrasting middle in Ab major ===
    // Phrase 9 - new lyrical theme in Ab
    "Ab4", "Bb4", "C5", "Db5", "Eb5", "F5", "Eb5", "Db5",
    "C5", "Bb4", "Ab4", "G4", "Ab4",
    // Phrase 10 - sequential rise
    "Bb4", "C5", "Db5", "Eb5", "F5", "Gb5", "F5", "Eb5",
    "Db5", "C5", "Bb4", "Ab4",
    // Phrase 11 - dramatic climax approach
    "Eb5", "F5", "Gb5", "Ab5", "Bb5", "C6", "Bb5", "Ab5",
    "Gb5", "F5", "Eb5", "Db5", "C5",
    // Phrase 12 - peak and chromatic descent
    "Bb5", "A5", "Ab5", "G5", "Gb5", "F5", "E5", "Eb5",
    "D5", "Db5", "C5", "Bb4",

    // === A'' Section: Return with elaborate ornamentation ===
    // Phrase 13 - theme returns richly decorated
    "Bb4", "C5", "D5", "Eb5", "D5", "Eb5", "F5", "G5",
    "F5", "Eb5", "D5", "C5", "Bb4", "Ab4", "Bb4",
    // Phrase 14 - expressive ascent with turns
    "C5", "D5", "Eb5", "F5", "Eb5", "D5", "Eb5", "G5",
    "Ab5", "G5", "F5", "Eb5", "D5", "Eb5",
    // Phrase 15 - cascading ornamental passage
    "F5", "G5", "Ab5", "Bb5", "Ab5", "G5", "F5", "Eb5",
    "D5", "C5", "Bb4", "Ab4", "G4", "F4",
    // Phrase 16 - lyrical penultimate phrase
    "Eb4", "G4", "Bb4", "Eb5", "D5", "C5", "Bb4", "Ab4",
    "G4", "F4", "Eb4", "D4", "Eb4",

    // === Coda ===
    // Phrase 17 - gentle reminiscence
    "Bb4", "C5", "D5", "Eb5", "F5", "Eb5", "D5", "C5",
    "Bb4", "Ab4", "G4",
    // Phrase 18 - final ornamental sigh
    "Ab4", "Bb4", "Ab4", "G4", "Ab4", "Bb4", "G4",
    // Phrase 19 - closing tonic resolution
    "F4", "Eb4", "D4", "Eb4",
  ],
  durations: [
    // Phrase 1
    "4n", "8n", "8n", "4n", "8n", "8n", "4n", "8n",
    "8n", "4n", "8n", "8n", "2n",
    // Phrase 2
    "4n", "8n", "8n", "4n", "8n", "8n", "8n", "8n",
    "4n", "8n", "8n", "4n", "2n",
    // Phrase 3
    "4n", "8n", "16n", "16n", "4n", "8n", "8n", "4n",
    "8n", "8n", "4n", "8n", "2n",
    // Phrase 4
    "8n", "8n", "4n", "8n", "4n", "8n", "8n", "8n",
    "4n", "8n", "8n", "8n", "4n", "4n", "2n",
    // Phrase 5
    "4n", "8n", "16n", "16n", "4n", "8n", "8n", "8n",
    "4n", "8n", "8n", "4n", "8n", "2n",
    // Phrase 6
    "8n", "8n", "4n", "8n", "8n", "4n", "8n", "8n",
    "4n", "8n", "8n", "4n", "4n", "2n",
    // Phrase 7
    "8n", "8n", "8n", "16n", "16n", "8n", "8n", "4n",
    "8n", "8n", "4n", "8n", "8n", "4n", "2n",
    // Phrase 8
    "8n", "8n", "4n", "8n", "8n", "4n", "4n", "8n",
    "8n", "4n", "8n", "4n", "8n", "8n", "4n", "2n",
    // Phrase 9
    "4n", "8n", "8n", "4n", "8n", "4n", "8n", "8n",
    "4n", "8n", "8n", "4n", "2n",
    // Phrase 10
    "4n", "8n", "8n", "4n", "8n", "8n", "8n", "8n",
    "4n", "8n", "4n", "2n",
    // Phrase 11
    "8n", "8n", "8n", "8n", "4n", "4n", "8n", "8n",
    "8n", "8n", "4n", "4n", "2n",
    // Phrase 12
    "4n", "8n", "8n", "8n", "8n", "8n", "8n", "4n",
    "8n", "8n", "4n", "2n",
    // Phrase 13
    "4n", "8n", "8n", "4n", "16n", "16n", "8n", "8n",
    "8n", "4n", "8n", "8n", "4n", "8n", "2n",
    // Phrase 14
    "8n", "8n", "4n", "8n", "16n", "16n", "4n", "8n",
    "4n", "8n", "8n", "4n", "8n", "2n",
    // Phrase 15
    "8n", "8n", "8n", "4n", "8n", "8n", "8n", "4n",
    "8n", "8n", "4n", "8n", "4n", "2n",
    // Phrase 16
    "4n", "8n", "8n", "2n", "8n", "8n", "4n", "8n",
    "8n", "4n", "8n", "8n", "2n",
    // Phrase 17
    "4n", "8n", "8n", "4n", "8n", "4n", "8n", "8n",
    "4n", "4n", "2n",
    // Phrase 18
    "4n", "8n", "16n", "16n", "4n", "4n", "2n",
    // Phrase 19
    "4n", "4n", "4n", "1n",
  ],
  velocities: [
    // Phrase 1 - p, gentle
    0.45, 0.48, 0.50, 0.55, 0.58, 0.52, 0.48, 0.45,
    0.42, 0.40, 0.38, 0.35, 0.40,
    // Phrase 2 - mp, growing
    0.50, 0.52, 0.55, 0.58, 0.62, 0.65, 0.68, 0.62,
    0.58, 0.52, 0.48, 0.50, 0.45,
    // Phrase 3 - mf, ornamental
    0.58, 0.62, 0.55, 0.50, 0.58, 0.65, 0.60, 0.55,
    0.50, 0.48, 0.45, 0.42, 0.48,
    // Phrase 4 - chromatic expressiveness
    0.52, 0.55, 0.58, 0.60, 0.62, 0.58, 0.52, 0.50,
    0.48, 0.45, 0.42, 0.40, 0.42, 0.45, 0.38,
    // Phrase 5 - p, decorated return
    0.48, 0.50, 0.45, 0.52, 0.55, 0.58, 0.55, 0.52,
    0.50, 0.48, 0.45, 0.42, 0.40, 0.45,
    // Phrase 6 - mf, soaring
    0.55, 0.58, 0.62, 0.65, 0.68, 0.72, 0.75, 0.70,
    0.65, 0.60, 0.55, 0.52, 0.50, 0.45,
    // Phrase 7 - filigree, light
    0.50, 0.52, 0.55, 0.48, 0.45, 0.50, 0.55, 0.60,
    0.55, 0.50, 0.48, 0.45, 0.48, 0.50, 0.42,
    // Phrase 8 - diminishing
    0.48, 0.45, 0.42, 0.40, 0.38, 0.35, 0.38, 0.40,
    0.42, 0.45, 0.48, 0.50, 0.45, 0.42, 0.38, 0.35,
    // Phrase 9 - mp, new theme
    0.52, 0.55, 0.58, 0.60, 0.62, 0.65, 0.60, 0.55,
    0.52, 0.48, 0.45, 0.42, 0.48,
    // Phrase 10 - growing intensity
    0.55, 0.58, 0.62, 0.65, 0.68, 0.70, 0.65, 0.60,
    0.55, 0.52, 0.48, 0.45,
    // Phrase 11 - f, climactic
    0.65, 0.68, 0.72, 0.75, 0.80, 0.85, 0.78, 0.72,
    0.68, 0.65, 0.60, 0.55, 0.52,
    // Phrase 12 - chromatic descent, diminuendo
    0.75, 0.70, 0.68, 0.65, 0.62, 0.58, 0.55, 0.52,
    0.48, 0.45, 0.42, 0.40,
    // Phrase 13 - mf, richly decorated
    0.55, 0.58, 0.60, 0.62, 0.55, 0.58, 0.62, 0.68,
    0.62, 0.58, 0.52, 0.48, 0.45, 0.42, 0.48,
    // Phrase 14 - expressive swells
    0.52, 0.55, 0.60, 0.65, 0.58, 0.52, 0.58, 0.68,
    0.72, 0.65, 0.60, 0.55, 0.50, 0.52,
    // Phrase 15 - cascading, bright
    0.62, 0.65, 0.70, 0.75, 0.68, 0.62, 0.58, 0.55,
    0.50, 0.48, 0.45, 0.42, 0.40, 0.38,
    // Phrase 16 - tender winding down
    0.42, 0.45, 0.48, 0.55, 0.52, 0.48, 0.45, 0.42,
    0.40, 0.38, 0.35, 0.32, 0.35,
    // Phrase 17 - pp, reminiscence
    0.38, 0.40, 0.42, 0.45, 0.42, 0.40, 0.38, 0.35,
    0.32, 0.30, 0.28,
    // Phrase 18 - ppp, sighing
    0.30, 0.32, 0.28, 0.25, 0.28, 0.30, 0.25,
    // Phrase 19 - pppp, final
    0.25, 0.22, 0.20, 0.18,
  ],
  bass: {
    notes: [
      // A Section
      "Eb2", "Bb2", "Eb3", "Bb2", "Ab2", "Eb3", "Ab2", "Bb2", "Eb2",
      "Eb2", "Bb2", "Ab2", "Eb2", "Bb2", "Eb2",
      "Ab2", "Eb2", "Ab2", "Bb2", "Eb2",
      "Ab2", "Bb2", "G2", "Ab2", "Bb2", "Eb2",
      // A' Section
      "Eb2", "Bb2", "Ab2", "Eb2", "Bb2",
      "Ab2", "Bb2", "Eb2", "Ab2", "Bb2", "Eb2",
      "Eb2", "Ab2", "Bb2", "Eb2", "Ab2", "Bb2",
      "Eb2", "Ab2", "Bb2", "Eb2", "Ab2", "Eb2",
      // B Section
      "Ab2", "Eb2", "Ab2", "Db2", "Ab2",
      "Bb2", "F2", "Bb2", "Eb2",
      "Ab2", "Eb2", "Ab2", "Bb2", "Eb2", "Ab2",
      "Bb2", "F2", "Bb2", "Eb2", "Bb2",
      // A'' Section
      "Eb2", "Bb2", "Ab2", "Eb2", "Bb2", "Eb2",
      "Ab2", "Bb2", "Eb2", "Ab2", "Bb2",
      "Ab2", "Bb2", "Eb2", "Ab2", "Bb2",
      "Eb2", "Ab2", "Bb2", "Eb2",
      // Coda
      "Eb2", "Bb2", "Ab2", "Bb2",
      "Ab2", "Bb2", "Eb2",
      "Bb2", "Eb2",
    ],
    durations: [
      // A Section
      "2n", "2n", "2n", "2n", "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "2n", "1n",
      // A' Section
      "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "2n", "1n",
      // B Section
      "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "1n",
      // A'' Section
      "2n", "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "1n",
      // Coda
      "2n", "2n", "2n", "1n",
      "2n", "2n", "1n",
      "2n", "1n",
    ],
    velocities: [
      // A Section
      0.35, 0.32, 0.35, 0.32, 0.30, 0.35, 0.32, 0.35, 0.30,
      0.35, 0.32, 0.30, 0.35, 0.35, 0.30,
      0.32, 0.30, 0.32, 0.35, 0.30,
      0.32, 0.35, 0.30, 0.32, 0.35, 0.30,
      // A' Section
      0.35, 0.32, 0.30, 0.35, 0.30,
      0.32, 0.35, 0.35, 0.32, 0.35, 0.30,
      0.35, 0.32, 0.35, 0.32, 0.32, 0.30,
      0.30, 0.28, 0.30, 0.28, 0.28, 0.25,
      // B Section
      0.35, 0.32, 0.35, 0.38, 0.35,
      0.38, 0.35, 0.38, 0.35,
      0.40, 0.38, 0.42, 0.45, 0.42, 0.38,
      0.42, 0.38, 0.35, 0.32, 0.30,
      // A'' Section
      0.35, 0.32, 0.30, 0.35, 0.35, 0.32,
      0.32, 0.35, 0.38, 0.35, 0.32,
      0.38, 0.40, 0.38, 0.35, 0.32,
      0.30, 0.28, 0.30, 0.28,
      // Coda
      0.25, 0.22, 0.20, 0.18,
      0.18, 0.20, 0.15,
      0.15, 0.12,
    ],
  },
  chords: {
    notes: [
      // A Section - Eb major arpeggiated chords
      "G3", "Bb3", "Eb4",   "F3", "Bb3", "D4",   "G3", "Bb3", "Eb4",
      "F3", "Ab3", "D4",    "Ab3", "C4", "Eb4",   "G3", "Bb3", "Eb4",
      "Ab3", "C4", "Eb4",   "F3", "Ab3", "D4",    "G3", "Bb3", "Eb4",
      "Ab3", "C4", "Eb4",   "G3", "Bb3", "Eb4",   "F3", "Ab3", "D4",
      "Ab3", "C4", "Eb4",   "G3", "Bb3", "Eb4",   "Bb3", "D4", "F4",
      "Ab3", "C4", "Eb4",   "F3", "Ab3", "Bb3",   "G3", "Bb3", "Eb4",
      // A' Section
      "G3", "Bb3", "Eb4",   "F3", "Ab3", "Db4",   "Ab3", "C4", "Eb4",
      "G3", "Bb3", "Eb4",   "Bb3", "D4", "F4",
      "Ab3", "C4", "Eb4",   "Bb3", "D4", "F4",    "G3", "Bb3", "Eb4",
      "Ab3", "C4", "Eb4",   "Bb3", "D4", "F4",    "G3", "Bb3", "Eb4",
      "G3", "Bb3", "Eb4",   "Ab3", "C4", "Eb4",   "F3", "Bb3", "D4",
      "G3", "Bb3", "Eb4",   "Ab3", "C4", "Eb4",   "Bb3", "D4", "F4",
      "G3", "Bb3", "Eb4",   "Ab3", "C4", "Eb4",   "F3", "Bb3", "D4",
      "G3", "Bb3", "Eb4",   "Ab3", "C4", "Eb4",   "G3", "Bb3", "Eb4",
      // B Section - Ab major / contrasting harmonies
      "Ab3", "C4", "Eb4",   "G3", "Bb3", "Eb4",   "Ab3", "C4", "Eb4",
      "Db3", "F3", "Ab3",   "Ab3", "C4", "Eb4",
      "Bb3", "D4", "F4",    "F3", "A3", "C4",     "Bb3", "D4", "F4",
      "G3", "Bb3", "Eb4",
      "Ab3", "C4", "Eb4",   "G3", "Bb3", "Eb4",   "Ab3", "C4", "Eb4",
      "Bb3", "D4", "F4",    "G3", "Bb3", "Eb4",   "Ab3", "C4", "Eb4",
      "Bb3", "D4", "F4",    "F3", "A3", "C4",     "Bb3", "D4", "F4",
      "G3", "Bb3", "Eb4",   "Bb3", "D4", "F4",
      // A'' Section
      "G3", "Bb3", "Eb4",   "F3", "Bb3", "D4",    "Ab3", "C4", "Eb4",
      "G3", "Bb3", "Eb4",   "Bb3", "D4", "F4",    "G3", "Bb3", "Eb4",
      "Ab3", "C4", "Eb4",   "Bb3", "D4", "F4",    "G3", "Bb3", "Eb4",
      "Ab3", "C4", "Eb4",   "Bb3", "D4", "F4",
      "Ab3", "C4", "Eb4",   "Bb3", "D4", "F4",    "G3", "Bb3", "Eb4",
      "Ab3", "C4", "Eb4",   "Bb3", "D4", "F4",
      "G3", "Bb3", "Eb4",   "Ab3", "C4", "Eb4",   "Bb3", "D4", "F4",
      "G3", "Bb3", "Eb4",
      // Coda
      "G3", "Bb3", "Eb4",   "F3", "Bb3", "D4",    "Ab3", "C4", "Eb4",
      "Bb3", "D4", "F4",
      "Ab3", "C4", "Eb4",   "Bb3", "D4", "F4",    "G3", "Bb3", "Eb4",
      "F3", "Bb3", "D4",    "G3", "Bb3", "Eb4",
    ],
    durations: [
      // A Section (18 chord groups = 54 notes, 18 durations)
      "2n", "2n", "2n", "2n", "2n", "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n", "2n", "2n", "2n", "2n", "1n",
      // A' Section (14 chord groups)
      "2n", "2n", "2n", "2n", "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n", "2n", "2n", "2n", "2n",
      "2n", "2n", "2n", "2n", "2n", "2n", "2n", "2n",
      "2n", "2n", "1n",
      // B Section (16 chord groups)
      "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "1n",
      // A'' Section (16 chord groups)
      "2n", "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "1n",
      // Coda (9 chord groups)
      "2n", "2n", "2n", "1n",
      "2n", "2n", "2n", "2n", "1n",
    ],
    velocities: [
      // A Section
      0.28, 0.28, 0.28, 0.28, 0.30, 0.30, 0.28, 0.28, 0.28,
      0.28, 0.30, 0.30, 0.28, 0.28, 0.25, 0.25, 0.28, 0.22,
      // A' Section
      0.28, 0.28, 0.30, 0.28, 0.28, 0.30, 0.30, 0.28,
      0.30, 0.30, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28,
      0.25, 0.25, 0.22, 0.22, 0.25, 0.25, 0.22, 0.22,
      0.22, 0.22, 0.20,
      // B Section
      0.30, 0.30, 0.32, 0.32, 0.30,
      0.32, 0.30, 0.32, 0.30,
      0.35, 0.35, 0.38, 0.38, 0.35, 0.32,
      0.35, 0.32, 0.30, 0.28, 0.25,
      // A'' Section
      0.30, 0.28, 0.28, 0.30, 0.30, 0.28,
      0.28, 0.30, 0.32, 0.30, 0.28,
      0.32, 0.35, 0.32, 0.30, 0.28,
      0.25, 0.22, 0.22, 0.20,
      // Coda
      0.20, 0.18, 0.18, 0.15,
      0.15, 0.15, 0.15, 0.12, 0.10,
    ],
  },
};
