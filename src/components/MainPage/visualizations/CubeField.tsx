import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { AudioData, VisualizationConfig, NoteEvent } from "./types";
import { getNoteColor } from "./moodConfigs";

interface CymaticsProps {
  audioData: AudioData | null;
  config: VisualizationConfig;
  noteEvents?: NoteEvent[];
}

// Helper: get latest event for a layer
function getLatestEvent(events: NoteEvent[] | undefined, layer: string): NoteEvent | null {
  if (!events) return null;
  for (let i = 0; i < events.length; i++) {
    if (events[i].layer === layer) return events[i];
  }
  return null;
}

export function MusicalTerrain({ audioData, config, noteEvents }: CymaticsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const gridSize = 52;
  const spacing = 0.48;
  const radius = (gridSize / 2) * spacing;

  const gridData = useMemo(() => {
    const positions: number[] = [];
    const distances: number[] = [];
    const angles: number[] = [];

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (j - gridSize / 2) * spacing;
        const y = (i - gridSize / 2) * spacing;
        const dist = Math.sqrt(x * x + y * y);

        if (dist <= radius) {
          positions.push(x, y);
          distances.push(dist);
          angles.push(Math.atan2(y, x));
        }
      }
    }

    return {
      positions: new Float32Array(positions),
      distances: new Float32Array(distances),
      angles: new Float32Array(angles),
      count: distances.length,
    };
  }, [gridSize, spacing, radius]);

  const colorPalette = useMemo(
    () => ({
      primary: new THREE.Color(config.primaryColor),
      secondary: new THREE.Color(config.secondaryColor),
      accent: new THREE.Color(config.accentColor),
      water: new THREE.Color(0x1a3a5c),
      foam: new THREE.Color(0xddeeff),
    }),
    [config.primaryColor, config.secondaryColor, config.accentColor]
  );

  const prevBass = useRef(0);
  const beatPulse = useRef(0);
  const modeRef = useRef(0);
  const lastBeatTime = useRef(0);
  const bassPulse = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    const bass = audioData?.bassLevel ?? 0;
    const mid = audioData?.midLevel ?? 0;
    const treble = audioData?.trebleLevel ?? 0;
    const avg = audioData?.averageLevel ?? 0;

    // Bass note event pulse
    const bassEvent = getLatestEvent(noteEvents, "bass");
    if (bassEvent && (Date.now() - bassEvent.timestamp) < 200) {
      bassPulse.current = Math.max(bassPulse.current, bassEvent.velocity);
    }
    bassPulse.current *= 0.9;

    const bassDelta = bass - prevBass.current;
    if (bassDelta > 0.18 && time - lastBeatTime.current > 0.4) {
      beatPulse.current = 1;
      modeRef.current = (modeRef.current + 1) % 6;
      lastBeatTime.current = time;
    }
    beatPulse.current *= 0.93;
    prevBass.current = bass;

    const mode = modeRef.current;
    const symmetry = [3, 4, 5, 6, 8, 12][mode];

    const tempColor = new THREE.Color();
    // Amplified bass reactivity from note events
    const bassBoost = 1 + bassPulse.current * 1.5;

    for (let i = 0; i < gridData.count; i++) {
      const x = gridData.positions[i * 2];
      const y = gridData.positions[i * 2 + 1];
      const dist = gridData.distances[i];
      const angle = gridData.angles[i];

      const normDist = dist / radius;

      const freq1 = 2 + bass * 6;
      const freq2 = 4 + mid * 8;
      const freq3 = 6 + treble * 12;

      const angular1 = Math.cos(symmetry * angle);
      const angular2 = Math.sin(symmetry * 0.5 * angle + time * 0.3);

      const radial1 = Math.sin(dist * freq1 - time * 2);
      const radial2 = Math.cos(dist * freq2 + time * 1.5);
      const radial3 = Math.sin(dist * freq3 - time * 3);

      const wave1 = radial1 * angular1 * (0.6 + bass * 3.0);
      const wave2 = radial2 * angular2 * (0.4 + mid * 2.0);
      const wave3 = radial3 * Math.cos((symmetry + 2) * angle) * (0.3 + treble * 1.5);

      let height = (wave1 + wave2 + wave3) * (0.4 + avg * 1.8) * bassBoost;

      if (beatPulse.current > 0.05) {
        const ripplePos = (time - lastBeatTime.current) * 8;
        const ripple = Math.sin((dist - ripplePos) * 6) * Math.exp(-(dist - ripplePos) * (dist - ripplePos) * 0.5);
        height += ripple * beatPulse.current * 4;
      }

      const edgeDampen = 1 - normDist * normDist;
      height *= edgeDampen;

      dummy.position.set(x, height, y);

      const absHeight = Math.abs(height);
      const baseScale = 0.08 + absHeight * 0.15 + avg * 0.06;
      const scaleY = baseScale * (0.4 + absHeight * 1.5);
      const scaleXZ = baseScale * (1 + absHeight * 0.3);
      dummy.scale.set(scaleXZ, Math.max(0.02, scaleY), scaleXZ);
      dummy.rotation.set(0, 0, 0);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      if (absHeight < 0.15) {
        tempColor.copy(colorPalette.water);
      } else if (absHeight < 0.5) {
        tempColor.lerpColors(colorPalette.primary, colorPalette.secondary, (absHeight - 0.15) / 0.35);
      } else {
        tempColor.lerpColors(colorPalette.accent, colorPalette.foam, Math.min(1, (absHeight - 0.5) * 2));
      }

      if (beatPulse.current > 0.2) {
        tempColor.lerp(colorPalette.accent, beatPulse.current * 0.4);
      }

      const brightness = 0.6 + avg * 0.8 + absHeight * 0.4;
      tempColor.multiplyScalar(brightness);

      meshRef.current.setColorAt(i, tempColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, gridData.count]}
      count={gridData.count}
    >
      <sphereGeometry args={[1, 8, 6]} />
      <meshStandardMaterial
        roughness={0.15}
        metalness={0.3}
        transparent
        opacity={0.9}
        emissive={config.accentColor}
        emissiveIntensity={0.15}
      />
    </instancedMesh>
  );
}

export function AudioSphere({ audioData, config, noteEvents }: CymaticsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const count = 120;

  const dropletData = useMemo(() => {
    const basePositions = new Float32Array(count * 2);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 11;
      basePositions[i * 2] = Math.cos(angle) * r;
      basePositions[i * 2 + 1] = Math.sin(angle) * r;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 1.0 + Math.random() * 3.0;
    }

    return { basePositions, phases, speeds };
  }, [count]);

  const beatRef = useRef(0);
  const prevBass = useRef(0);
  const melodyPulse = useRef(0);
  const melodyColorRef = useRef(new THREE.Color("#ffffff"));

  const colorPalette = useMemo(
    () => ({
      accent: new THREE.Color(config.accentColor),
      primary: new THREE.Color(config.primaryColor),
      foam: new THREE.Color(0xddeeff),
    }),
    [config.accentColor, config.primaryColor]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    const bass = audioData?.bassLevel ?? 0;
    const mid = audioData?.midLevel ?? 0;
    const treble = audioData?.trebleLevel ?? 0;
    const avg = audioData?.averageLevel ?? 0;

    // Melody note event: color flash + particle burst
    const melodyEvent = getLatestEvent(noteEvents, "melody");
    if (melodyEvent && (Date.now() - melodyEvent.timestamp) < 150) {
      melodyPulse.current = Math.max(melodyPulse.current, melodyEvent.velocity);
      melodyColorRef.current.set(getNoteColor(melodyEvent.note));
    }
    melodyPulse.current *= 0.88;

    if (bass - prevBass.current > 0.12) {
      beatRef.current = 1;
    }
    beatRef.current *= 0.88;
    prevBass.current = bass;

    const tempColor = new THREE.Color();
    // Treble-driven energy instead of bass-driven (melody lives in upper frequencies)
    const energy = treble * 1.5 + mid * 0.5 + melodyPulse.current * 3 + beatRef.current;

    for (let i = 0; i < count; i++) {
      const bx = dropletData.basePositions[i * 2];
      const by = dropletData.basePositions[i * 2 + 1];
      const phase = dropletData.phases[i];
      const speed = dropletData.speeds[i];

      const rawBounce = Math.sin(time * speed + phase);
      // Treble-driven bounce instead of bass-driven
      const bounceHeight = Math.max(0, rawBounce) *
        (0.8 + treble * 8 + melodyPulse.current * 12 + avg * 5);

      const scatter = melodyPulse.current * 2 + treble * 1.2;
      const driftX = Math.sin(time * 0.7 + phase) * scatter +
        Math.sin(time * speed * 0.5 + phase * 3) * treble * 1.5;
      const driftZ = Math.cos(time * 0.5 + phase * 2) * scatter +
        Math.cos(time * speed * 0.3 + phase * 5) * treble * 1.5;

      dummy.position.set(
        bx + driftX,
        bounceHeight,
        by + driftZ
      );

      const scale = 0.04 + energy * 0.12 + Math.max(0, rawBounce) * avg * 0.15;
      const velocityStretch = 1 + bounceHeight * 0.6;
      dummy.scale.set(scale, scale * velocityStretch, scale);
      dummy.rotation.set(0, 0, 0);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const heightMix = Math.min(1, bounceHeight / 4);
      tempColor.lerpColors(colorPalette.primary, colorPalette.foam, heightMix);
      // Flash melody note color
      if (melodyPulse.current > 0.1) {
        tempColor.lerp(melodyColorRef.current, melodyPulse.current * 0.8);
      } else {
        tempColor.lerp(colorPalette.accent, treble * 0.7 + beatRef.current * 0.6);
      }
      tempColor.multiplyScalar(0.8 + avg * 1.5 + melodyPulse.current * 1.5);

      meshRef.current.setColorAt(i, tempColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} count={count}>
      <sphereGeometry args={[1, 6, 4]} />
      <meshStandardMaterial
        roughness={0.05}
        metalness={0.4}
        transparent
        opacity={0.85}
        emissive={config.accentColor}
        emissiveIntensity={0.5}
      />
    </instancedMesh>
  );
}

export function WaveRing({ audioData, config, noteEvents }: CymaticsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const rings = 8;
  const particlesPerRing = 48;
  const count = rings * particlesPerRing;

  const ringData = useMemo(() => {
    const radii = new Float32Array(rings);
    const angles = new Float32Array(count);

    for (let r = 0; r < rings; r++) {
      radii[r] = 2.5 + r * 1.6;
      for (let p = 0; p < particlesPerRing; p++) {
        angles[r * particlesPerRing + p] = (p / particlesPerRing) * Math.PI * 2;
      }
    }

    return { radii, angles };
  }, [rings, particlesPerRing, count]);

  const colorPalette = useMemo(
    () => ({
      accent: new THREE.Color(config.accentColor),
      secondary: new THREE.Color(config.secondaryColor),
      primary: new THREE.Color(config.primaryColor),
    }),
    [config.accentColor, config.secondaryColor, config.primaryColor]
  );

  const chordPulse = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    const bass = audioData?.bassLevel ?? 0;
    const mid = audioData?.midLevel ?? 0;
    const treble = audioData?.trebleLevel ?? 0;

    // Chord note event: ring expansion pulse
    const chordEvent = getLatestEvent(noteEvents, "chords");
    if (chordEvent && (Date.now() - chordEvent.timestamp) < 200) {
      chordPulse.current = Math.max(chordPulse.current, chordEvent.velocity);
    }
    chordPulse.current *= 0.92;

    const tempColor = new THREE.Color();

    for (let r = 0; r < rings; r++) {
      const baseRadius = ringData.radii[r];

      const ripplePhase = time * 1.5 - r * 0.4;
      const rippleHeight = Math.sin(ripplePhase) * (0.15 + bass * 0.6) * (1 - r / (rings * 1.5));

      // Chord pulse expands rings outward
      const chordExpand = 1 + chordPulse.current * 0.3 * (1 - r / rings);
      const breathe = (1 + Math.sin(time * 0.8 + r * 0.7) * mid * 0.15) * chordExpand;
      const currentRadius = baseRadius * breathe;

      for (let p = 0; p < particlesPerRing; p++) {
        const idx = r * particlesPerRing + p;
        const angle = ringData.angles[idx];

        const surfaceWave = Math.sin(angle * (3 + r) + time * 2) * treble * 0.2;

        dummy.position.set(
          Math.cos(angle) * (currentRadius + surfaceWave),
          rippleHeight + surfaceWave * 0.3,
          Math.sin(angle) * (currentRadius + surfaceWave)
        );

        const scale = 0.04 + Math.abs(rippleHeight) * 0.08 + mid * 0.03 + chordPulse.current * 0.04;
        dummy.scale.set(scale * 1.5, scale * 0.4, scale * 1.5);
        dummy.rotation.set(0, 0, 0);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);

        const ringMix = r / rings;
        tempColor.lerpColors(colorPalette.primary, colorPalette.secondary, ringMix);
        const heightGlow = Math.abs(rippleHeight) * 3;
        tempColor.lerp(colorPalette.accent, Math.min(1, heightGlow + chordPulse.current * 0.5));
        tempColor.multiplyScalar(0.4 + mid * 0.8 + heightGlow * 0.5 + chordPulse.current * 0.4);

        meshRef.current.setColorAt(idx, tempColor);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} count={count}>
      <sphereGeometry args={[1, 6, 4]} />
      <meshStandardMaterial
        roughness={0.1}
        metalness={0.3}
        transparent
        opacity={0.6}
        emissive={config.secondaryColor}
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
}

export { MusicalTerrain as CubeField };
