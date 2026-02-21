export const composers = [
  "Bach",
  "Mozart",
  "Beethoven",
  "Chopin",
  "Debussy",
  "Tchaikovsky",
  "Vivaldi",
  "Handel",
  "Brahms",
  "Schumann",
  "Liszt",
  "Wagner",
  "Mahler",
];

export const keys = [
  "C major",
  "D major",
  "E major",
  "F major",
  "G major",
  "A major",
  "B major",
  "C minor",
  "D minor",
  "E minor",
  "F minor",
  "G minor",
  "A minor",
];

export const tempos = [54, 60, 66, 72, 80, 100, 120, 140, 150];

export const moods = [
  "Triumphant",
  "Melancholic",
  "Playful",
  "Dramatic",
  "Dreamy",
  "Ethereal",
  "Romantic",
  "Majestic",
  "Solemn",
  "Vibrant",
  "Tender",
  "Fierce",
];

export const forms = [
  "Symphony",
  "Concerto",
  "Sonata",
  "Prelude",
  "Nocturne",
  "Waltz",
  "Etude",
  "Rhapsody",
  "Suite",
  "Fantasy",
  "March",
  "Overture",
];

export const scales = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
};

export const noteNames = [
  "C",
  "C#",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

export const rootMap: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
  "C#": 1,
  "D#": 3,
  "F#": 6,
  "G#": 8,
  "A#": 10,
  Db: 1,
  Eb: 3,
  Gb: 6,
  Ab: 8,
  Bb: 10,
};

export const moodColors: Record<string, string> = {
  Triumphant: "#347FC4",
  Melancholic: "#7D6B91",
  Playful: "#989FCE",
  Dramatic: "#A44B6F",
  Dreamy: "#7D6B91",
  Ethereal: "#6BA3BE",
  Romantic: "#B47DA8",
  Majestic: "#347FC4",
  Solemn: "#5D536B",
  Vibrant: "#989FCE",
  Tender: "#8B7DA8",
  Fierce: "#A44B6F",
};
