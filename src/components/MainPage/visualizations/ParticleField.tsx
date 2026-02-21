import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { AudioData, VisualizationConfig } from "./types";

interface ParticleFieldProps {
  audioData: AudioData | null;
  config: VisualizationConfig;
}

const generateInitialPositions = (count: number) => {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

    velocities[i * 3] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
  }
  return { positions, velocities };
};

const generateInitialSizes = (count: number) => {
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    sizes[i] = Math.random() * 2 + 0.5;
  }
  return sizes;
};

const generateInitialColors = (count: number, config: VisualizationConfig) => {
  const colors = new Float32Array(count * 3);
  const primary = new THREE.Color(config.primaryColor);
  const secondary = new THREE.Color(config.secondaryColor);
  const accent = new THREE.Color(config.accentColor);

  for (let i = 0; i < count; i++) {
    const rand = Math.random();
    let color: THREE.Color;
    if (rand < 0.6) color = primary;
    else if (rand < 0.85) color = secondary;
    else color = accent;

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  return colors;
};

/**
 * ParticleField creates an ambient particle system that responds to audio.
 * Particles burst on beats, scale with bass, and sparkle with treble.
 */
export function ParticleField({ audioData, config }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const beatBurstRef = useRef(0);
  const prevBassRef = useRef(0);

  const [particleCount] = useState(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    return isMobile ? 300 : config.particleCount;
  });

  const { positions, velocities } = useMemo(() => {
    return generateInitialPositions(particleCount);
  }, [particleCount]);

  const sizes = useMemo(() => {
    return generateInitialSizes(particleCount);
  }, [particleCount]);

  const colors = useMemo(() => {
    return generateInitialColors(particleCount, config);
  }, [particleCount, config]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const { clock } = state;
    const time = clock.getElapsedTime();

    const bassLevel = audioData?.bassLevel ?? 0;
    const midLevel = audioData?.midLevel ?? 0;
    const trebleLevel = audioData?.trebleLevel ?? 0;
    const avgLevel = audioData?.averageLevel ?? 0;
    const bassDelta = audioData?.bassDelta ?? 0;

    // Beat burst detection
    if (bassDelta > 0.08 || (bassLevel - prevBassRef.current) > 0.12) {
      beatBurstRef.current = 1;
    }
    beatBurstRef.current *= 0.9;
    prevBassRef.current = bassLevel;

    const speedMultiplier = config.speedMultiplier * (1 + avgLevel * 3 + beatBurstRef.current * 2);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Apply velocity with audio-boosted speed
      positions[i3] += velocities[i3] * speedMultiplier;
      positions[i3 + 1] += velocities[i3 + 1] * speedMultiplier;
      positions[i3 + 2] += velocities[i3 + 2] * speedMultiplier;

      // Bass pulse — push particles outward from center on beats
      if (beatBurstRef.current > 0.1) {
        const dx = positions[i3];
        const dy = positions[i3 + 1];
        const dz = positions[i3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.01;
        const burst = beatBurstRef.current * 0.08;
        positions[i3] += (dx / dist) * burst;
        positions[i3 + 1] += (dy / dist) * burst;
        positions[i3 + 2] += (dz / dist) * burst;
      }

      // Treble sparkle — high-frequency jitter
      positions[i3] += (Math.random() - 0.5) * trebleLevel * 0.04;
      positions[i3 + 1] += (Math.random() - 0.5) * trebleLevel * 0.04;

      // Bass-driven sine wave — stronger amplitude
      positions[i3 + 1] += Math.sin(time * 0.8 + positions[i3] * 0.5) * 0.005 * (1 + bassLevel * 4);

      // Mid-frequency swirl
      positions[i3] += Math.cos(time * 0.3 + i * 0.01) * midLevel * 0.003;

      // Wrap around boundaries
      if (positions[i3] < -10) positions[i3] = 10;
      if (positions[i3] > 10) positions[i3] = -10;
      if (positions[i3 + 1] < -6) positions[i3 + 1] = 6;
      if (positions[i3 + 1] > 6) positions[i3 + 1] = -6;
      if (positions[i3 + 2] < -5) positions[i3 + 2] = 3;
      if (positions[i3 + 2] > 3) positions[i3 + 2] = -5;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Material: size and opacity react to audio
    if (materialRef.current) {
      const targetOpacity = 0.3 + bassLevel * 0.5 + beatBurstRef.current * 0.3;
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        Math.min(1, targetOpacity),
        0.2
      );

      // Size pulses with bass
      materialRef.current.size = THREE.MathUtils.lerp(
        materialRef.current.size,
        0.04 + bassLevel * 0.08 + beatBurstRef.current * 0.06,
        0.2
      );
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <primitive ref={materialRef} object={material} />
    </points>
  );
}
