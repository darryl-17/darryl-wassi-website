'use client';

import { useMemo, useRef, useState, useEffect, type RefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import rawPoints from '@/lib/globe-points.json';

/* Thème clair du site — globe non noir, vert de la charte.
   DOT/LINE/RIM = vert foncé lisible sur clair (#2e8f46 = --accent-ink) ;
   SPHERE = sphère claire pour donner du volume sans paraître noire. */
const DOT = '#2e8f46';
const LINE = '#2e8f46';
const RIM = '#2e8f46';
const SPHERE = '#eef2ec';
const PIN_HALO = '#90ee90';
const PIN_CORE = '#1f7a3c';
const PIN_RING = '#2e8f46';
const R = 1; // rayon du globe
const DEG = Math.PI / 180;

// Point d'ancrage — Yaoundé, Cameroun
const PIN = { lat: 3.848, lon: 11.502, label: 'Yaoundé · Cameroun' };

function latLonToVec3(lat: number, lon: number, r: number): [number, number, number] {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

/** Petite texture ronde pour des points nets (au lieu de carrés). */
function useDotTexture() {
  return useMemo(() => {
    const s = 64;
    const c = document.createElement('canvas');
    c.width = c.height = s;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.95)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 2;
    return tex;
  }, []);
}

/** Nuage de points formant les continents. */
function Continents() {
  const dot = useDotTexture();
  const positions = useMemo(() => {
    const flat = rawPoints as number[];
    const arr = new Float32Array((flat.length / 2) * 3);
    for (let i = 0, j = 0; i < flat.length; i += 2, j += 3) {
      const [x, y, z] = latLonToVec3(flat[i], flat[i + 1], R * 1.006);
      arr[j] = x;
      arr[j + 1] = y;
      arr[j + 2] = z;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={dot}
        color={DOT}
        size={0.026}
        sizeAttenuation
        transparent
        opacity={0.95}
        alphaTest={0.35}
        depthWrite={false}
      />
    </points>
  );
}

/** Halo atmosphérique (fresnel, face arrière). */
function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.NormalBlending,
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { uColor: { value: new THREE.Color(RIM) } },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          void main(){
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position,1.0);
            vView = mv.xyz;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          uniform vec3 uColor;
          void main(){
            vec3 v = normalize(-vView);
            float f = pow(1.0 - abs(dot(vNormal, v)), 3.0);
            gl_FragColor = vec4(uColor, f * 0.4);
          }`,
      }),
    []
  );
  return (
    <mesh scale={1.22} material={material}>
      <sphereGeometry args={[R, 48, 48]} />
    </mesh>
  );
}

/** Pin de localisation : point lumineux + anneau pulsant + label. */
function Marker({ animate, occlude }: { animate: boolean; occlude: RefObject<THREE.Mesh> }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const pos = useMemo(() => latLonToVec3(PIN.lat, PIN.lon, R * 1.01), []);
  const outward = useMemo(() => new THREE.Vector3(...pos).multiplyScalar(2), [pos]);

  // Oriente l'anneau tangent à la surface (une seule fois).
  useEffect(() => {
    ringRef.current?.lookAt(outward);
  }, [outward]);

  useFrame(({ clock }) => {
    if (!animate || !ringRef.current || !matRef.current) return;
    const t = (clock.getElapsedTime() % 2.4) / 2.4; // 0 → 1
    const scale = 0.02 + t * 0.14;
    ringRef.current.scale.set(scale, scale, scale);
    matRef.current.opacity = (1 - t) * 0.9;
  });

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color={PIN_HALO} transparent opacity={0.45} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.014, 16, 16]} />
        <meshBasicMaterial color={PIN_CORE} />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.7, 1, 40]} />
        <meshBasicMaterial
          ref={matRef}
          color={PIN_RING}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <Html center distanceFactor={9} position={[0, 0.11, 0]} occlude={[occlude]} zIndexRange={[10, 0]}>
        <div className="globe__pin-label">{PIN.label}</div>
      </Html>
    </group>
  );
}

/** Graticule (grille lat/lon) discrète. */
function Graticule() {
  const geo = useMemo(() => new THREE.SphereGeometry(R * 1.002, 36, 22), []);
  return (
    <lineSegments>
      <wireframeGeometry args={[geo]} />
      <lineBasicMaterial color={LINE} transparent opacity={0.1} depthWrite={false} />
    </lineSegments>
  );
}

function Controls({ reduced }: { reduced: boolean }) {
  const [auto, setAuto] = useState(!reduced);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableZoom
      minDistance={1.5}
      maxDistance={4}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.45}
      zoomSpeed={0.75}
      autoRotate={auto}
      autoRotateSpeed={0.42}
      onStart={() => {
        if (timer.current) clearTimeout(timer.current);
        setAuto(false);
      }}
      onEnd={() => {
        if (reduced) return;
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setAuto(true), 2800);
      }}
    />
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  const globeRef = useRef<THREE.Mesh>(null);
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 2, 4]} intensity={0.55} />
      <directionalLight position={[-4, -1, -2]} intensity={0.12} color={PIN_HALO} />
      <mesh ref={globeRef}>
        <sphereGeometry args={[R, 64, 64]} />
        <meshStandardMaterial
          color={SPHERE}
          roughness={1}
          metalness={0}
          emissive={'#dfeee2'}
          emissiveIntensity={0.12}
        />
      </mesh>
      <Graticule />
      <Continents />
      <Marker animate={!reduced} occlude={globeRef} />
      <Atmosphere />
      <Controls reduced={reduced} />
    </>
  );
}

export default function Globe() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.4, 2.7], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: 'none' }}
    >
      <Scene reduced={reduced} />
    </Canvas>
  );
}
