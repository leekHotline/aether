'use client'

import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import type { WorldSphere } from './constants'
import { useMultiverseStore } from './useMultiverseStore'
import GalaxyShader from './GalaxyShader'

interface GlassSphereProps {
  world: WorldSphere
}

export default function GlassSphere({ world }: GlassSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const { setActiveWorld, setHoveredWorld, openCard, hoveredWorld } = useMultiverseStore()
  
  const isHovered = hoveredWorld === world.id || hovered
  
  // 目标缩放
  const targetScale = useMemo(() => {
    const base = world.size
    return isHovered ? base * 1.15 : base
  }, [isHovered, world.size])
  
  // 当前缩放（平滑过渡）
  const currentScale = useRef(world.size)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // 自转动画
      meshRef.current.rotation.y += world.rotationSpeed * (isHovered ? 2 : 1)
      meshRef.current.rotation.x += world.rotationSpeed * 0.3 * (isHovered ? 2 : 1)
      
      // 平滑缩放
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 5)
      meshRef.current.scale.setScalar(currentScale.current)
      
      // 悬浮动画（主星球更明显）
      if (world.isMain) {
        meshRef.current.position.y = world.position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      }
    }
    
    // 内部星系旋转
    if (innerRef.current) {
      innerRef.current.rotation.z += 0.005
    }
  })
  
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHovered(true)
    setHoveredWorld(world.id)
    document.body.style.cursor = 'pointer'
  }
  
  const handlePointerOut = () => {
    setHovered(false)
    setHoveredWorld(null)
    document.body.style.cursor = 'auto'
  }
  
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    setActiveWorld(world)
    openCard()
  }
  
  // 发光强度
  const emissiveIntensity = isHovered ? 0.3 : 0.1
  
  return (
    <group position={world.position}>
      {/* 外层玻璃球体 - 使用 MeshPhysicalMaterial 实现玻璃效果 */}
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <meshPhysicalMaterial
          color={world.primaryColor}
          metalness={0}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          ior={1.5}
          transparent
          opacity={0.9}
          emissive={world.primaryColor}
          emissiveIntensity={emissiveIntensity}
        />
      </Sphere>
      
      {/* 内部星系平面 */}
      <mesh ref={innerRef} scale={world.size * 0.85}>
        <planeGeometry args={[2, 2, 1, 1]} />
        <GalaxyShader
          primaryColor={world.primaryColor}
          secondaryColor={world.secondaryColor}
        />
      </mesh>
      
      {/* 外发光环 */}
      {isHovered && (
        <Sphere args={[1.1, 32, 32]} scale={world.size}>
          <meshBasicMaterial
            color={world.primaryColor}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </Sphere>
      )}
    </group>
  )
}
