"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { QualityTier } from "@/components/providers/ExperienceProvider";

/**
 * Hero scene: a faceted core (software), an orbiting ring system (engineering),
 * a point field (data) and drifting nodes (intelligence).
 *
 * Everything is built from cheap primitives — icosahedron, torus, Points — and
 * a single instanced mesh for the nodes. No physical materials, no post
 * processing, no textures, so the whole scene stays well under a megabyte.
 */

interface SceneProps {
  tier: QualityTier;
  /** Disables the per-frame pointer response on lower tiers. */
  interactive: boolean;
}

const NODE_COUNTS: Record<QualityTier, number> = { high: 26, medium: 14, low: 0 };
const PARTICLE_COUNTS: Record<QualityTier, number> = { high: 1400, medium: 650, low: 0 };

/**
 * Deterministic PRNG (mulberry32).
 *
 * Replaces `Math.random()` so the particle field is identical on every render
 * and every machine — the geometry is memoised, and a pure generator keeps it
 * genuinely pure.
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Faceted core with a slow self-rotation. */
function Core({ interactive }: { interactive: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  // Pointer is read from the per-frame state rather than the `useThree`
  // snapshot, so nothing owned by a hook is mutated during the loop.
  useFrame((state, delta) => {
    if (!mesh.current || !wire.current) return;

    // Frame-rate independent rotation.
    mesh.current.rotation.y += delta * 0.16;
    mesh.current.rotation.x += delta * 0.05;
    wire.current.rotation.y -= delta * 0.1;
    wire.current.rotation.z += delta * 0.04;

    if (interactive) {
      // Gentle lean toward the pointer — capped so it never chases.
      const targetX = state.pointer.y * 0.16;
      const targetY = state.pointer.x * 0.22;
      mesh.current.rotation.x += (targetX - mesh.current.rotation.x) * 0.02;
      wire.current.rotation.x += (targetY - wire.current.rotation.x) * 0.02;
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#1e293b"
          emissive="#38bdf8"
          emissiveIntensity={0.18}
          roughness={0.42}
          metalness={0.65}
          flatShading
        />
      </mesh>

      <mesh ref={wire} scale={1.42}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/** Three inclined rings suggesting orbital structure. */
function Rings() {
  const group = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (group.current) group.current.rotation.z += delta * 0.06;
  });

  const rings = useMemo(
    () => [
      { radius: 2.05, tilt: [Math.PI / 2.2, 0, 0], color: "#38bdf8", opacity: 0.5 },
      { radius: 2.55, tilt: [Math.PI / 1.7, Math.PI / 6, 0], color: "#8b5cf6", opacity: 0.35 },
      { radius: 3.05, tilt: [Math.PI / 2.6, -Math.PI / 5, 0], color: "#3b82f6", opacity: 0.22 },
    ],
    [],
  );

  return (
    <group ref={group}>
      {rings.map((ring) => (
        <mesh
          key={ring.radius}
          rotation={ring.tilt as [number, number, number]}
        >
          <torusGeometry args={[ring.radius, 0.006, 8, 128]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} />
        </mesh>
      ))}
    </group>
  );
}

/** Instanced data nodes riding the orbits. */
function Nodes({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        radius: 1.9 + (index % 3) * 0.5,
        speed: 0.1 + ((index * 37) % 10) / 55,
        phase: (index / count) * Math.PI * 2,
        y: (((index * 53) % 100) / 100 - 0.5) * 1.4,
        scale: 0.02 + (((index * 17) % 10) / 10) * 0.03,
      })),
    [count],
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;

    seeds.forEach((seed, index) => {
      const angle = seed.phase + time * seed.speed;
      dummy.position.set(
        Math.cos(angle) * seed.radius,
        seed.y + Math.sin(time * 0.5 + seed.phase) * 0.12,
        Math.sin(angle) * seed.radius,
      );
      dummy.scale.setScalar(seed.scale);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(index, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#7dd3fc" />
    </instancedMesh>
  );
}

/** Sparse point field giving the composition depth. */
function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const random = seededRandom(0x5eed);
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      // Distribute in a shell so the centre stays readable.
      const radius = 4 + random() * 6;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      array[i * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, [count]);

  useFrame((_state, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.012;
  });

  if (count === 0) return null;

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#94a3b8"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Slow camera drift; replaces an expensive intro animation. */
function CameraRig({ interactive }: { interactive: boolean }) {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const driftX = Math.sin(time * 0.12) * 0.35;
    const driftY = Math.cos(time * 0.1) * 0.22;

    const targetX = interactive ? driftX + state.pointer.x * 0.5 : driftX;
    const targetY = interactive ? driftY + state.pointer.y * 0.3 : driftY;

    // `state.camera` is the live frame object, not a hook snapshot.
    const { camera } = state;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene({ tier, interactive }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 5, 3]} intensity={1.5} color="#93c5fd" />
      <pointLight position={[-4, -2, -3]} intensity={2.2} color="#8b5cf6" distance={14} />

      <CameraRig interactive={interactive} />
      <Core interactive={interactive} />
      <Rings />
      <Nodes count={NODE_COUNTS[tier]} />
      <ParticleField count={PARTICLE_COUNTS[tier]} />
    </>
  );
}

interface HeroSceneProps {
  tier: QualityTier;
  /** Pauses rendering when the tab is hidden. */
  paused: boolean;
}

export default function HeroScene({ tier, paused }: HeroSceneProps) {
  const interactive = tier === "high";

  return (
    <Canvas
      // `demand`-adjacent: when paused we stop the loop entirely.
      frameloop={paused ? "never" : "always"}
      // Capping DPR is the single biggest win on high-density displays.
      dpr={tier === "high" ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{
        antialias: tier === "high",
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
    >
      <Scene tier={tier} interactive={interactive} />
    </Canvas>
  );
}
