import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { AudioData, VisualizationConfig } from "./types";

interface AbstractWaveformProps {
  /** Audio analysis data for reactivity */
  audioData: AudioData | null;
  /** Visualization configuration for colors and parameters */
  config: VisualizationConfig;
  /** Layer index for multiple overlapping waves */
  layer?: number;
}

/**
 * AbstractWaveform creates a 3D wave mesh that responds to audio frequencies.
 * Uses a high-segment plane geometry with custom vertex displacement
 * based on sine waves combined with audio frequency data.
 *
 * The wave creates an ethereal, abstract seascape effect with multiple
 * overlapping layers at different phase offsets.
 */
export function AbstractWaveform({
  audioData,
  config,
  layer = 0,
}: AbstractWaveformProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Create gradient shader material with glow effect
  const shaderMaterial = useMemo(() => {
    const primary = new THREE.Color(config.primaryColor);
    const secondary = new THREE.Color(config.secondaryColor);
    const accent = new THREE.Color(config.accentColor);

    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPrimaryColor: { value: primary },
        uSecondaryColor: { value: secondary },
        uAccentColor: { value: accent },
        uBassLevel: { value: 0 },
        uMidLevel: { value: 0 },
        uTrebleLevel: { value: 0 },
        uLayer: { value: layer },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uBassLevel;
        uniform float uMidLevel;
        uniform float uTrebleLevel;
        uniform float uLayer;

        varying vec2 vUv;
        varying float vElevation;
        varying float vDistance;

        // Simplex noise function for organic variation
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Base sine wave motion
          float wave1 = sin(pos.x * 2.0 + uTime * 0.5 + uLayer) * 0.3;
          float wave2 = sin(pos.y * 1.5 + uTime * 0.3 + uLayer * 0.5) * 0.2;
          float wave3 = sin((pos.x + pos.y) * 1.0 + uTime * 0.4) * 0.15;

          // Audio-reactive displacement — amplified for punchy response
          float bassDisplacement = uBassLevel * 2.5;
          float midDisplacement = uMidLevel * 1.2;
          float trebleDisplacement = uTrebleLevel * 0.8;

          // Combine waves with audio reactivity
          float elevation = wave1 + wave2 + wave3;
          elevation += bassDisplacement * sin(pos.x * 4.0 + uTime * 2.5);
          elevation += midDisplacement * sin(pos.y * 3.0 + uTime * 2.0);
          elevation += trebleDisplacement * snoise(pos.xy * 3.0 + uTime * 1.0);

          // Apply noise for organic feel
          float noise = snoise(pos.xy * 0.5 + uTime * 0.1) * 0.3;
          elevation += noise * (0.5 + uBassLevel);

          pos.z += elevation;

          vElevation = elevation;
          vDistance = length(pos.xy);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uPrimaryColor;
        uniform vec3 uSecondaryColor;
        uniform vec3 uAccentColor;
        uniform float uBassLevel;
        uniform float uMidLevel;
        uniform float uTrebleLevel;
        uniform float uLayer;

        varying vec2 vUv;
        varying float vElevation;
        varying float vDistance;

        void main() {
          // Create gradient based on elevation and UV position
          float gradientFactor = (vElevation + 0.5) * 0.5;
          gradientFactor = clamp(gradientFactor, 0.0, 1.0);

          // Mix colors based on elevation
          vec3 color = mix(uPrimaryColor, uSecondaryColor, gradientFactor);

          // Add accent highlights on peaks
          float highlight = smoothstep(0.3, 0.8, vElevation);
          color = mix(color, uAccentColor, highlight * 0.5 * (0.5 + uBassLevel));

          // Add edge glow
          float edgeFactor = smoothstep(0.3, 0.5, abs(vUv.x - 0.5) + abs(vUv.y - 0.5));
          color = mix(color, uAccentColor, edgeFactor * 0.3 * uTrebleLevel);

          // Distance fade
          float distanceFade = smoothstep(0.0, 0.4, vDistance) * smoothstep(0.8, 0.4, vDistance);

          // Audio-reactive glow — intensified
          float glow = uBassLevel * 0.6 + uMidLevel * 0.4 + uTrebleLevel * 0.2;
          color += uAccentColor * glow * distanceFade;

          // Layer-based opacity
          float alpha = (0.4 - uLayer * 0.1) * (0.5 + uBassLevel * 0.5);

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [config.primaryColor, config.secondaryColor, config.accentColor, layer]);

  // Update shader uniforms and wave animation
  useFrame((state) => {
    if (!materialRef.current) return;

    const { clock } = state;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

    if (audioData) {
      // Faster interpolation for punchier response to audio
      const amp = config.amplitudeMultiplier;
      const bassLevel = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uBassLevel.value,
        audioData.bassLevel * amp,
        0.25
      );
      const midLevel = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMidLevel.value,
        audioData.midLevel * amp,
        0.2
      );
      const trebleLevel = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uTrebleLevel.value,
        audioData.trebleLevel * amp,
        0.3
      );

      materialRef.current.uniforms.uBassLevel.value = bassLevel;
      materialRef.current.uniforms.uMidLevel.value = midLevel;
      materialRef.current.uniforms.uTrebleLevel.value = trebleLevel;
    } else {
      // Decay to zero when no audio
      materialRef.current.uniforms.uBassLevel.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uBassLevel.value,
        0,
        0.05
      );
      materialRef.current.uniforms.uMidLevel.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMidLevel.value,
        0,
        0.05
      );
      materialRef.current.uniforms.uTrebleLevel.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uTrebleLevel.value,
        0,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]} position={[0, 0, layer * -0.5]}>
      <planeGeometry args={[16, 10, 128, 64]} />
      <primitive ref={materialRef} object={shaderMaterial} />
    </mesh>
  );
}
