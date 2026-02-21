import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import type { VisualizationConfig, NoteEvent } from "./types";

interface NoteOrbProps {
  currentNote: string | null;
  recentNotes: string[];
  config: VisualizationConfig;
  noteEvents?: NoteEvent[];
}

export function NoteOrb({ currentNote, recentNotes, config }: NoteOrbProps) {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(1);
  const prevNoteRef = useRef<string | null>(null);
  const colorRef = useRef(new THREE.Color(config.primaryColor));
  const targetColorRef = useRef(new THREE.Color(config.primaryColor));

  const primaryColor = useMemo(() => new THREE.Color(config.primaryColor), [config.primaryColor]);
  const accentColor = useMemo(() => new THREE.Color(config.accentColor), [config.accentColor]);

  useFrame((_, delta) => {
    if (!groupRef.current || !orbRef.current) return;

    // Spin
    groupRef.current.rotation.y += delta * 0.5;

    // Pulse on note change
    if (currentNote && currentNote !== prevNoteRef.current) {
      scaleRef.current = 1.4;
      targetColorRef.current.copy(accentColor);
      prevNoteRef.current = currentNote;
    }

    // Decay scale back to 1
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, 1, delta * 5);
    const s = scaleRef.current;
    orbRef.current.scale.set(s, s, s);
    if (glowRef.current) glowRef.current.scale.set(s * 1.35, s * 1.35, s * 1.35);

    // Decay color back to primary
    targetColorRef.current.lerp(primaryColor, delta * 3);
    colorRef.current.lerp(targetColorRef.current, delta * 8);

    // Apply emissive color
    const mat = orbRef.current.material as THREE.MeshStandardMaterial;
    mat.emissive.copy(colorRef.current);
    mat.color.copy(colorRef.current).multiplyScalar(0.3);

    // Glow color
    if (glowRef.current) {
      const gMat = glowRef.current.material as THREE.MeshBasicMaterial;
      gMat.color.copy(colorRef.current);
    }
  });

  if (!currentNote) return null;

  return (
    <group position={[0, 4, 0]}>
      <group ref={groupRef}>
        {/* Core orb */}
        <mesh ref={orbRef} renderOrder={999}>
          <sphereGeometry args={[1.0, 32, 32]} />
          <meshStandardMaterial
            emissive={config.primaryColor}
            emissiveIntensity={3}
            roughness={0.15}
            metalness={0.7}
            toneMapped={false}
          />
        </mesh>

        {/* Glow halo */}
        <mesh ref={glowRef} renderOrder={998}>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshBasicMaterial
            color={config.primaryColor}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Billboard text — always faces camera */}
      <Billboard position={[0, -2.0, 0]}>
        <Text
          fontSize={1.1}
          font="https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff"
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.06}
          outlineColor="black"
          renderOrder={1000}
        >
          {currentNote}
        </Text>
      </Billboard>

      {/* Recent notes trail */}
      {recentNotes.slice(0, 4).map((note, i) => (
        <Billboard key={`${note}-${i}`} position={[0, -3.2 - i * 0.7, 0]}>
          <Text
            fontSize={0.45}
            font="https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff"
            color="white"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.7 - i * 0.15}
            outlineWidth={0.03}
            outlineColor="black"
            renderOrder={1000}
          >
            {note}
          </Text>
        </Billboard>
      ))}
    </group>
  );
}
