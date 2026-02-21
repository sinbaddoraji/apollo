import type { VisualizationConfig, MoodConfig } from "./types";

/**
 * Predefined visualization configurations for different musical moods.
 * Each configuration includes color palettes and animation parameters
 * that match the emotional character of the music.
 */
export const moodConfigs: MoodConfig = {
  triumphant: {
    primaryColor: "#347FC4",
    secondaryColor: "#989FCE",
    accentColor: "#6BA3D6",
    backgroundColor: "#1e1f2e",
    amplitudeMultiplier: 1.8,
    speedMultiplier: 1.1,
    particleCount: 800,
    waveComplexity: 3,
  },
  melancholic: {
    primaryColor: "#7D6B91",
    secondaryColor: "#989FCE",
    accentColor: "#B0A8C8",
    backgroundColor: "#1e1d2a",
    amplitudeMultiplier: 1.2,
    speedMultiplier: 0.8,
    particleCount: 500,
    waveComplexity: 2,
  },
  serene: {
    primaryColor: "#6BA3BE",
    secondaryColor: "#989FCE",
    accentColor: "#B0C8E0",
    backgroundColor: "#1c2030",
    amplitudeMultiplier: 1.0,
    speedMultiplier: 0.6,
    particleCount: 400,
    waveComplexity: 2,
  },
  dramatic: {
    primaryColor: "#A44B6F",
    secondaryColor: "#C46B8F",
    accentColor: "#E08BA8",
    backgroundColor: "#241828",
    amplitudeMultiplier: 2.2,
    speedMultiplier: 1.3,
    particleCount: 1000,
    waveComplexity: 4,
  },
  mysterious: {
    primaryColor: "#5D536B",
    secondaryColor: "#7D6B91",
    accentColor: "#989FCE",
    backgroundColor: "#1a1828",
    amplitudeMultiplier: 1.4,
    speedMultiplier: 0.9,
    particleCount: 600,
    waveComplexity: 3,
  },
  romantic: {
    primaryColor: "#B47DA8",
    secondaryColor: "#D09DC8",
    accentColor: "#E8B8E0",
    backgroundColor: "#221828",
    amplitudeMultiplier: 1.3,
    speedMultiplier: 0.85,
    particleCount: 700,
    waveComplexity: 3,
  },
  playful: {
    primaryColor: "#989FCE",
    secondaryColor: "#B0B8E0",
    accentColor: "#C8D0F0",
    backgroundColor: "#1e2038",
    amplitudeMultiplier: 1.6,
    speedMultiplier: 1.2,
    particleCount: 900,
    waveComplexity: 4,
  },
  // Default fallback config
  default: {
    primaryColor: "#347FC4",
    secondaryColor: "#989FCE",
    accentColor: "#6BA3D6",
    backgroundColor: "#272838",
    amplitudeMultiplier: 1.4,
    speedMultiplier: 1.0,
    particleCount: 700,
    waveComplexity: 3,
  },
};

/**
 * Get the visualization config for a given mood string.
 * Returns default config if mood is not recognized.
 */
export function getMoodConfig(mood?: string): VisualizationConfig {
  const moodKey = mood?.toLowerCase() || "default";
  return moodConfigs[moodKey] || moodConfigs.default;
}

export const NOTE_COLORS: Record<string, string> = {
  C: "#ff4444",
  D: "#ff8c00",
  E: "#ffd700",
  F: "#44bb44",
  G: "#4488ff",
  A: "#4b0082",
  B: "#8b00ff",
};

export function getNoteColor(note: string): string {
  const letter = note.replace(/[0-9]/g, "").charAt(0).toUpperCase();
  return NOTE_COLORS[letter] || "#ffffff";
}
