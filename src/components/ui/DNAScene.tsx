'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ── Hélice de DNA ─────────────────────────────────────────────────────────────
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)

  const { strand1, strand2, rungs } = useMemo(() => {
    const s1: THREE.Vector3[] = []
    const s2: THREE.Vector3[] = []
    const r: { p1: THREE.Vector3; p2: THREE.Vector3 }[] = []
    const total = 40
    for (let i = 0; i < total; i++) {
      const t = (i / total) * Math.PI * 4
      const y = (i / total) * 10 - 5
      const x1 = Math.cos(t) * 1.4
      const z1 = Math.sin(t) * 1.4
      const x2 = Math.cos(t + Math.PI) * 1.4
      const z2 = Math.sin(t + Math.PI) * 1.4
      s1.push(new THREE.Vector3(x1, y, z1))
      s2.push(new THREE.Vector3(x2, y, z2))
      if (i % 4 === 0) r.push({ p1: new THREE.Vector3(x1, y, z1), p2: new THREE.Vector3(x2, y, z2) })
    }
    return { strand1: s1, strand2: s2, rungs: r }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Strand 1 */}
      {strand1.map((pos, i) => (
        <mesh key={`s1-${i}`} position={pos}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#40916C" emissive="#40916C" emissiveIntensity={0.4} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Strand 2 */}
      {strand2.map((pos, i) => (
        <mesh key={`s2-${i}`} position={pos}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#2D6A4F" emissive="#2D6A4F" emissiveIntensity={0.4} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Rungs (barras conectoras) */}
      {rungs.map((rung, i) => {
        const mid = rung.p1.clone().lerp(rung.p2, 0.5)
        const dir = rung.p2.clone().sub(rung.p1)
        const length = dir.length()
        const quat = new THREE.Quaternion()
        quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
        return (
          <mesh key={`rung-${i}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.015, 0.015, length, 6]} />
            <meshStandardMaterial color="#1B4332" transparent opacity={0.5} />
          </mesh>
        )
      })}
    </group>
  )
}

// ── Células flutuantes ────────────────────────────────────────────────────────
function FloatingCells() {
  const cells = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 3 - 2,
    ),
    speed: 0.2 + Math.random() * 0.4,
    offset: Math.random() * Math.PI * 2,
    scale: 0.2 + Math.random() * 0.3,
    distort: 0.2 + Math.random() * 0.3,
  })), [])

  return (
    <>
      {cells.map((cell) => (
        <CellMesh key={cell.id} {...cell} />
      ))}
    </>
  )
}

function CellMesh({ position, speed, offset, scale, distort }: {
  position: THREE.Vector3; speed: number; offset: number; scale: number; distort: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = position.y + Math.sin(t * speed + offset) * 0.4
    ref.current.position.x = position.x + Math.cos(t * speed * 0.7 + offset) * 0.2
    ref.current.rotation.x = t * speed * 0.3
    ref.current.rotation.z = t * speed * 0.2
  })
  return (
    <Sphere ref={ref} args={[scale, 32, 32]} position={position}>
      <MeshDistortMaterial
        color="#40916C"
        emissive="#1B4332"
        emissiveIntensity={0.3}
        distort={distort}
        speed={speed * 2}
        transparent
        opacity={0.25}
        wireframe={false}
      />
    </Sphere>
  )
}

// ── Mouse interaction ─────────────────────────────────────────────────────────
function MouseTracker() {
  const { camera } = useThree()
  useFrame((state) => {
    const { mouse } = state
    camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.05
    camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Scene ─────────────────────────────────────────────────────────────────────
export default function DNAScene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 65 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#40916C" />
        <pointLight position={[-5, -5, 3]} intensity={0.5} color="#1B4332" />
        <MouseTracker />
        <DNAHelix />
        <FloatingCells />
      </Canvas>
    </div>
  )
}
