import { useEffect, useRef, useState } from "react";
import type { Analyser } from "tone";
import type { AudioData } from "./types";

/**
 * Custom hook that extracts real-time audio analysis data from a Tone.js Analyser node.
 */
export function useAudioAnalyzer(
  analyser: Analyser | null,
  enabled: boolean
): AudioData | null {
  const [audioData, setAudioData] = useState<AudioData | null>(null);
  const animationFrameRef = useRef<number>(undefined);
  const lastUpdateRef = useRef<number>(0);
  const prevBassRef = useRef<number>(0);
  const prevAvgRef = useRef<number>(0);
  const peakRef = useRef<number>(0);
  const UPDATE_INTERVAL = 1000 / 60; // 60fps for snappier response

  useEffect(() => {
    if (!analyser || !enabled) {
      return;
    }

    const fftSize = analyser.size;
    const frequencyArray = new Uint8Array(fftSize);
    const timeDomainArray = new Uint8Array(fftSize);

    const bassEnd = Math.floor(fftSize * 0.2);
    const trebleStart = Math.floor(fftSize * 0.7);

    const analyze = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current < UPDATE_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(analyze);
        return;
      }
      lastUpdateRef.current = timestamp;

      try {
        const values = analyser.getValue() as Float32Array;

        for (let i = 0; i < fftSize; i++) {
          const val = values[i];
          frequencyArray[i] = Math.max(0, Math.min(255, (val + 100) * 2.55));
          timeDomainArray[i] = 128;
        }

        // Calculate band averages with more granular splits
        let bassSum = 0;
        let midSum = 0;
        let trebleSum = 0;
        let totalSum = 0;

        for (let i = 0; i < fftSize; i++) {
          const value = frequencyArray[i];
          totalSum += value;

          if (i < bassEnd) {
            bassSum += value;
          } else if (i < trebleStart) {
            midSum += value;
          } else {
            trebleSum += value;
          }
        }

        const bassLevel = bassSum / bassEnd / 255;
        const midLevel = midSum / (trebleStart - bassEnd) / 255;
        const trebleLevel = trebleSum / (fftSize - trebleStart) / 255;
        const averageLevel = totalSum / fftSize / 255;

        // Peak tracking — holds peaks and decays slowly for punchier response
        const currentPeak = Math.max(bassLevel, midLevel, trebleLevel);
        peakRef.current = currentPeak > peakRef.current
          ? currentPeak
          : peakRef.current * 0.95;

        // Energy delta for beat-like detection
        const bassDelta = Math.max(0, bassLevel - prevBassRef.current);
        const energyDelta = Math.max(0, averageLevel - prevAvgRef.current);
        prevBassRef.current = bassLevel;
        prevAvgRef.current = averageLevel;

        setAudioData({
          frequencyData: frequencyArray,
          timeDomainData: timeDomainArray,
          bassLevel,
          midLevel,
          trebleLevel,
          averageLevel,
          peak: peakRef.current,
          bassDelta,
          energyDelta,
        });
      } catch (error) {
        console.error("Audio analysis error:", error);
      }

      animationFrameRef.current = requestAnimationFrame(analyze);
    };

    animationFrameRef.current = requestAnimationFrame(analyze);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setAudioData(null);
    };
  }, [analyser, enabled, UPDATE_INTERVAL]);

  return audioData;
}
