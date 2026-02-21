import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { AudioData, VisualizationConfig } from "./types";

interface DynamicCameraProps {
  audioData: AudioData | null;
  config: VisualizationConfig;
}

export function DynamicCamera({ audioData }: DynamicCameraProps) {
  const { camera } = useThree();
  const timeRef = useRef(0);
  const shakeRef = useRef(new THREE.Vector3());
  const prevBassRef = useRef(0);

  // Tempo estimation from beat intervals
  const beatTimesRef = useRef<number[]>([]);
  const tempoRef = useRef(80); // default BPM estimate
  const prevTempoRef = useRef(80);
  const tempoChangeRef = useRef(0); // 0-1 intensity of tempo change event
  const tempoDirectionRef = useRef(0); // +1 = speeding up, -1 = slowing down

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    const bassLevel = audioData?.bassLevel ?? 0;

    // Beat detection
    const bassDelta = bassLevel - prevBassRef.current;
    prevBassRef.current = bassLevel;

    if (bassDelta > 0.15) {
      shakeRef.current.set(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.2
      );

      // Record beat time for tempo estimation
      const beatTimes = beatTimesRef.current;
      beatTimes.push(t);

      // Keep last 8 beats
      if (beatTimes.length > 8) {
        beatTimes.shift();
      }

      // Estimate tempo from intervals between beats
      if (beatTimes.length >= 3) {
        let totalInterval = 0;
        const intervals = beatTimes.length - 1;
        for (let i = 1; i < beatTimes.length; i++) {
          totalInterval += beatTimes[i] - beatTimes[i - 1];
        }
        const avgInterval = totalInterval / intervals;
        // BPM = 60 / seconds_per_beat
        const newTempo = Math.min(200, Math.max(40, 60 / avgInterval));

        const oldTempo = tempoRef.current;
        tempoRef.current = newTempo;

        // Detect significant tempo change (>15% shift)
        const tempoRatio = newTempo / oldTempo;
        if (tempoRatio > 1.15 || tempoRatio < 0.85) {
          tempoChangeRef.current = Math.min(1, Math.abs(tempoRatio - 1) * 3);
          tempoDirectionRef.current = tempoRatio > 1 ? 1 : -1;
          prevTempoRef.current = oldTempo;
        }
      }
    }

    // Decay shake and tempo change
    shakeRef.current.multiplyScalar(0.9);
    tempoChangeRef.current *= 0.97;

    // Normalized tempo (0 = slow ~60bpm, 1 = fast ~180bpm)
    const tempoNorm = Math.min(1, Math.max(0, (tempoRef.current - 60) / 120));
    const tempoChange = tempoChangeRef.current;
    const tempoDir = tempoDirectionRef.current;

    // === TEMPO-DRIVEN CAMERA BEHAVIOR ===

    // Orbit speed scales with tempo: slow pieces = slow orbit, fast = fast orbit
    const orbitSpeed = 0.03 + tempoNorm * 0.08;
    const orbitAngle = t * orbitSpeed;

    // Distance: fast tempo = closer/tighter, slow = pulled back/wide
    const tempoDistance = THREE.MathUtils.lerp(26, 18, tempoNorm);
    const distance = THREE.MathUtils.lerp(tempoDistance, tempoDistance * 0.7, bassLevel);

    // Elevation: fast tempo = lower (more dramatic), slow = higher (more overview)
    const tempoElevation = THREE.MathUtils.lerp(20, 12, tempoNorm);
    const elevation = THREE.MathUtils.lerp(tempoElevation, tempoElevation * 0.75, bassLevel);

    // Breathing speed matches tempo
    const breatheSpeed = 0.08 + tempoNorm * 0.15;
    const breathe = Math.sin(t * breatheSpeed) * (1.5 + tempoNorm * 1.0);

    // Tempo change event: dramatic camera sweep
    let sweepX = 0;
    let sweepY = 0;
    let sweepZ = 0;
    if (tempoChange > 0.05) {
      if (tempoDir > 0) {
        // Speeding up: quick zoom-in + drop down
        sweepY = -tempoChange * 4;
        sweepX = tempoChange * 3 * Math.sin(t * 5);
        sweepZ = -tempoChange * 3;
      } else {
        // Slowing down: pull back + rise up
        sweepY = tempoChange * 5;
        sweepZ = tempoChange * 4;
      }
    }

    const targetX = Math.sin(orbitAngle) * distance + sweepX;
    const targetZ = Math.cos(orbitAngle) * distance + sweepZ;
    const targetY = elevation + breathe + sweepY;

    // Lerp speed: faster during tempo changes for snappy response
    const lerpSpeed = 0.04 + tempoChange * 0.12;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetX + shakeRef.current.x,
      lerpSpeed
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY + shakeRef.current.y,
      lerpSpeed
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetZ + shakeRef.current.z,
      lerpSpeed
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}
