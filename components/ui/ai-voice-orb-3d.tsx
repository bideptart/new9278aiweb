"use client"

/**
 * AI Voice Orb — an audio-reactive 3D hero visual for 9278.ai.
 *
 * The core is a high-tessellation icosahedron displaced along its normals by
 * layered 3D simplex noise, with the displacement amplitude driven by real
 * FFT data off the sample call's AnalyserNode. It morphs while the agent
 * speaks rather than just sitting there pulsing, which is the whole point
 * for a voice product.
 *
 * Around it, particles are arranged in discrete concentric bands (not a
 * random cloud) that counter-rotate and ripple outward with the audio, so
 * the ring reads as sound waves instead of dust.
 *
 * Blending note: everything uses NormalBlending. AdditiveBlending — the
 * usual choice for glowing particles — is a no-op against this page's white
 * background (adding to white stays white) and composites to muddy grey
 * through the transparent canvas, which is what made an earlier pass look
 * like dirty speckles.
 */

import { forwardRef, Suspense, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { cn } from "@/lib/utils"

const BURST_DURATION = 0.7

/** 3D simplex noise — Ashima Arts / Stefan Gustavson, MIT licensed.
    Standard reference implementation, inlined so the shader is self-contained. */
const SIMPLEX_3D = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
    + i.y+vec4(0.0,i1.y,i2.y,1.0))
    + i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

// ---------------------------------------------------------------------------
// Core — noise-displaced, audio-reactive
// ---------------------------------------------------------------------------

const CORE_VERT = /* glsl */ `
uniform float uTime;
uniform float uLevel;
uniform float uBurst;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;

${SIMPLEX_3D}

void main() {
  vec3 pos = position;

  // Two noise octaves at different scales/drifts: the low frequency gives
  // the slow "breathing" silhouette, the high one the surface detail.
  float n1 = snoise(pos * 1.5 + vec3(0.0, uTime * 0.28, 0.0));
  float n2 = snoise(pos * 3.4 + vec3(uTime * 0.2, 0.0, uTime * 0.14)) * 0.45;
  float n = n1 + n2;

  // Kept deliberately small: at higher amplitudes the noise reads as a lumpy
  // potato rather than a sphere that breathes.
  float amp = 0.018 + uLevel * 0.09 + uBurst * 0.10;
  float disp = n * amp;

  pos += normal * disp;

  vDisp = disp / max(amp, 0.0001);
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`

const CORE_FRAG = /* glsl */ `
uniform vec3 uDeep;
uniform vec3 uMid;
uniform vec3 uHot;
uniform float uLevel;
uniform float uBurst;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  vec3 L = normalize(vec3(0.45, 0.75, 0.8));

  float diff = clamp(dot(N, L), 0.0, 1.0);
  vec3 H = normalize(L + V);
  float spec = pow(clamp(dot(N, H), 0.0, 1.0), 42.0);

  // Crests read slightly hotter than troughs so the surface has form.
  float t = clamp(vDisp * 0.5 + 0.5, 0.0, 1.0);
  vec3 base = mix(uDeep, uMid, t);

  // Floor of 0.55 keeps the unlit side glowing rather than going muddy —
  // this is a light emissive orb, not a shaded solid.
  vec3 col = base * (0.55 + diff * 0.62);
  col += uHot * spec * 0.85;

  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.5);
  col += uHot * fres * (0.30 + uBurst * 0.30);

  gl_FragColor = vec4(col, 1.0);
}
`

function VoiceCore({
  levelRef,
  burstRef,
  onClick,
}: {
  levelRef: React.MutableRefObject<number>
  burstRef: React.MutableRefObject<number>
  onClick: () => void
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLevel: { value: 0 },
      uBurst: { value: 0 },
      uDeep: { value: new THREE.Color("#b91c1c") },
      uMid: { value: new THREE.Color("#f2564b") },
      uHot: { value: new THREE.Color("#fff1f2") },
    }),
    [],
  )

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uLevel.value = levelRef.current
    uniforms.uBurst.value = burstRef.current
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.18
  })

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerOver={() => {
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto"
      }}
    >
      <icosahedronGeometry args={[1, 24]} />
      <shaderMaterial ref={matRef} uniforms={uniforms} vertexShader={CORE_VERT} fragmentShader={CORE_FRAG} />
    </mesh>
  )
}

// ---------------------------------------------------------------------------
// Wave bands — concentric particle rings, not a random cloud
// ---------------------------------------------------------------------------

const BAND_COUNT = 12
const PER_BAND = 900
const RING_TOTAL = BAND_COUNT * PER_BAND

const [ringPositions, ringColors] = (() => {
  const pos = new Float32Array(RING_TOTAL * 3)
  const col = new Float32Array(RING_TOTAL * 3)

  const inner = new THREE.Color("#dc2626")
  const outer = new THREE.Color("#fecdd3")

  let i = 0
  for (let b = 0; b < BAND_COUNT; b++) {
    const t = b / (BAND_COUNT - 1)
    const radius = 1.3 + b * 0.3
    // Bands loosen as they go out: tight rings near the core read as
    // structure, the outer ones spread into an atmospheric halo.
    const jitter = 0.05 + t * 0.22
    const thickness = 0.04 + t * 0.16
    // Outer bands pale toward the page white so the field fades out instead
    // of ending on a hard edge — per-vertex alpha isn't available here, so
    // the falloff is carried by colour.
    const shade = inner.clone().lerp(outer, Math.pow(t, 0.75))
    for (let k = 0; k < PER_BAND; k++) {
      const angle = (k / PER_BAND) * Math.PI * 2 + Math.random() * 0.04
      const r = radius + (Math.random() - 0.5) * jitter
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * thickness
      pos[i * 3 + 2] = Math.sin(angle) * r
      col[i * 3] = shade.r
      col[i * 3 + 1] = shade.g
      col[i * 3 + 2] = shade.b
      i++
    }
  }
  return [pos, col]
})()

/**
 * Deliberately a stock PointsMaterial rather than a custom shader. An
 * earlier custom-shader version of this rendered nothing at all, and the
 * built-in material is the configuration already proven to draw in this
 * scene — the animation it loses is done on the object transform instead.
 */
function WaveBands({ levelRef }: { levelRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    const p = pointsRef.current
    if (!p) return
    // ~20s per revolution. Much slower than this and the field reads as
    // static; much faster and it starts to distract from the copy.
    p.rotation.z += delta * 0.32
    // Whole field swells with the voice, standing in for the per-particle
    // radial wave the shader version did.
    const target = 1 + levelRef.current * 0.14
    p.scale.setScalar(THREE.MathUtils.lerp(p.scale.x, target, Math.min(1, delta * 6)))
  })

  return (
    <points ref={pointsRef} rotation={[-Math.PI / 2.35, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={RING_TOTAL}
          array={ringPositions}
          itemSize={3}
          args={[ringPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={RING_TOTAL}
          array={ringColors}
          itemSize={3}
          args={[ringColors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

// ---------------------------------------------------------------------------
// Ground plane — perspective grid with radar pings sweeping outward from
// under the orb. Gives the scene depth and a sense of "calls arriving"
// instead of the orb floating on empty white.
// ---------------------------------------------------------------------------

const FLOOR_VERT = /* glsl */ `
varying vec2 vPos;
void main() {
  vPos = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const FLOOR_FRAG = /* glsl */ `
uniform float uTime;
uniform float uLevel;
uniform vec3 uGrid;
uniform vec3 uPing;
varying vec2 vPos;

void main() {
  float d = length(vPos);

  // Softly vignette the plane so it dissolves into the page instead of
  // ending on a hard rectangular edge.
  float fade = smoothstep(17.0, 2.5, d);
  if (fade <= 0.001) discard;

  // Analytic grid rather than fwidth-based: derivatives need an extension
  // under GLSL1, and the vignette hides the aliasing this would otherwise
  // show at grazing angles.
  vec2 f = abs(fract(vPos * 0.5) - 0.5);
  float grid = 1.0 - smoothstep(0.0, 0.035, min(f.x, f.y));

  // Three staggered pings expanding from the centre, brightening with the
  // voice level.
  float ping = 0.0;
  for (int i = 0; i < 3; i++) {
    float phase = fract(uTime * 0.16 + float(i) * 0.3333);
    float r = phase * 17.0;
    ping += smoothstep(0.5, 0.0, abs(d - r)) * (1.0 - phase);
  }
  ping *= 0.45 + uLevel * 0.9;

  vec3 col = mix(uGrid, uPing, clamp(ping * 1.6, 0.0, 1.0));
  float ink = (grid * 0.16 + ping * 0.38) * fade;

  gl_FragColor = vec4(col, ink);
}
`

function SceneFloor({ levelRef }: { levelRef: React.MutableRefObject<number> }) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLevel: { value: 0 },
      uGrid: { value: new THREE.Color("#c2606a") },
      uPing: { value: new THREE.Color("#dc2626") },
    }),
    [],
  )

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uLevel.value = levelRef.current
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.45, 0]}>
      <planeGeometry args={[44, 44]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={FLOOR_VERT}
        fragmentShader={FLOOR_FRAG}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.NormalBlending}
      />
    </mesh>
  )
}

// ---------------------------------------------------------------------------

function Scene({
  active,
  analyserRef,
  burstSignal,
  onToggle,
}: {
  active: boolean
  analyserRef?: React.MutableRefObject<AnalyserNode | null>
  burstSignal: number
  onToggle: () => void
}) {
  const levelRef = useRef(0)
  const burstRef = useRef(0)
  const burstStart = useRef<number | null>(null)
  const mounted = useRef(false)
  const fftRef = useRef<Uint8Array | null>(null)

  useEffect(() => {
    if (mounted.current) burstStart.current = performance.now()
    mounted.current = true
  }, [burstSignal])

  useFrame((_, delta) => {
    // Real FFT energy while the sample plays; a gentle idle sway otherwise so
    // the orb never freezes into a static ball.
    const analyser = analyserRef?.current
    let target = 0
    if (active && analyser) {
      if (!fftRef.current || fftRef.current.length !== analyser.frequencyBinCount) {
        fftRef.current = new Uint8Array(analyser.frequencyBinCount)
      }
      analyser.getByteFrequencyData(fftRef.current)
      let sum = 0
      const n = Math.min(48, fftRef.current.length)
      for (let i = 0; i < n; i++) sum += fftRef.current[i]
      target = Math.pow(sum / (n * 255), 0.85)
    } else {
      target = 0.12 + Math.sin(performance.now() / 900) * 0.05
    }
    // Smooth toward the target so the surface eases rather than snapping.
    levelRef.current += (target - levelRef.current) * Math.min(1, delta * 9)

    if (burstStart.current !== null) {
      const elapsed = (performance.now() - burstStart.current) / 1000
      if (elapsed < BURST_DURATION) {
        burstRef.current = Math.sin((elapsed / BURST_DURATION) * Math.PI)
      } else {
        burstRef.current = 0
        burstStart.current = null
      }
    }
  })

  return (
    <group rotation={[0.16, 0, 0]}>
      <SceneFloor levelRef={levelRef} />
      <VoiceCore levelRef={levelRef} burstRef={burstRef} onClick={onToggle} />
      <WaveBands levelRef={levelRef} />
    </group>
  )
}

export type VoiceOrbHandle = { toggle: () => void }

export type AIVoiceOrbProps = {
  className?: string
  /** Drives the "speaking" state — real FFT reactivity instead of idle sway. */
  active?: boolean
  /** Analyser tapped off the playing sample; the orb reads it every frame. */
  analyserRef?: React.MutableRefObject<AnalyserNode | null>
  onToggle?: () => void
}

export const AIVoiceOrb3D = forwardRef<VoiceOrbHandle, AIVoiceOrbProps>(function AIVoiceOrb3D(
  { className, active: activeProp, analyserRef, onToggle },
  ref,
) {
  const [internalActive, setInternalActive] = useState(false)
  const [burstSignal, setBurstSignal] = useState(0)
  const active = activeProp ?? internalActive

  const toggle = () => {
    setBurstSignal((b) => b + 1)
    if (onToggle) onToggle()
    else setInternalActive((a) => !a)
  }

  useImperativeHandle(ref, () => ({ toggle }), [onToggle])

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Canvas camera={{ position: [0, 1.15, 5.2], fov: 42 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Scene active={active} analyserRef={analyserRef} burstSignal={burstSignal} onToggle={toggle} />
        </Suspense>
      </Canvas>
    </div>
  )
})
