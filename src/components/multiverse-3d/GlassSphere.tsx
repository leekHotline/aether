'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Sphere, useTexture } from '@react-three/drei'
import type { WorldSphere } from './constants'
import { useMultiverseStore } from './useMultiverseStore'

interface GlassSphereProps {
  world: WorldSphere
}

export default function GlassSphere({ world }: GlassSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const { setActiveWorld, setHoveredWorld, openCard, hoveredWorld } = useMultiverseStore()
  
  const isHovered = hoveredWorld === world.id || hovered
  
  // 加载纹理（如果有的话）
  const texturePath = world.texture || null
  
  // 目标缩放
  const targetScale = useMemo(() => {
    const base = world.size
    return isHovered ? base * 1.15 : base
  }, [isHovered, world.size])
  
  // 当前缩放（平滑过渡）
  const currentScale = useRef(world.size)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // 自转动画 - Y轴和X轴轻微倾斜旋转
      meshRef.current.rotation.y += world.rotationSpeed * (isHovered ? 2 : 1)
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
      
      // 平滑缩放
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 5)
      meshRef.current.scale.setScalar(currentScale.current)
    }
    
    // 外发光呼吸动画
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.5 + world.position[0]) * 0.08 + 0.92
      glowRef.current.scale.setScalar(currentScale.current * 1.25 * pulse)
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = isHovered ? 0.25 : 0.12 * pulse
    }
    
    // 大气层动画
    if (atmosphereRef.current) {
      atmosphereRef.current.scale.setScalar(currentScale.current * 1.08)
      atmosphereRef.current.rotation.y -= world.rotationSpeed * 0.5
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
  const emissiveIntensity = isHovered ? 0.5 : 0.2
  
  return (
    <group position={world.position}>
      {/* 外发光环 - 始终显示，更大更柔和 */}
      <Sphere ref={glowRef} args={[1, 32, 32]}>
        <meshBasicMaterial
          color={world.primaryColor}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
      {/* 第二层外发光 - 更远的光晕 */}
      <Sphere args={[1.4 * world.size, 24, 24]}>
        <meshBasicMaterial
          color={world.secondaryColor}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
      {/* 主星球 */}
      <Sphere
        ref={meshRef}
        args={[1, 128, 128]} // 更高分辨率的球体
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {texturePath ? (
          <TexturedMaterial 
            texturePath={texturePath} 
            emissiveIntensity={emissiveIntensity}
            primaryColor={world.primaryColor}
          />
        ) : (
          <meshStandardMaterial
            color={world.primaryColor}
            metalness={0.3}
            roughness={0.4}
            emissive={world.primaryColor}
            emissiveIntensity={emissiveIntensity}
          />
        )}
      </Sphere>
      
      {/* 大气层效果 - 渐变边缘 */}
      <Sphere ref={atmosphereRef} args={[1.05, 48, 48]}>
        <meshBasicMaterial
          color={world.secondaryColor}
          transparent
          opacity={isHovered ? 0.18 : 0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
      {/* 菲涅尔边缘光 */}
      <Sphere args={[1.02 * world.size, 48, 48]}>
        <shaderMaterial
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
          uniforms={{
            glowColor: { value: new THREE.Color(world.primaryColor) },
            intensity: { value: isHovered ? 1.5 : 0.8 },
          }}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 glowColor;
            uniform float intensity;
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vec3 viewDir = normalize(-vPosition);
              float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);
              gl_FragColor = vec4(glowColor, fresnel * intensity * 0.5);
            }
          `}
        />
      </Sphere>
    </group>
  )
}

// 纹理材质组件 - 优化立体感
function TexturedMaterial({ 
  texturePath, 
  emissiveIntensity,
  primaryColor 
}: { 
  texturePath: string
  emissiveIntensity: number
  primaryColor: string
}) {
  const texture = useTexture(texturePath)
  
  useEffect(() => {
    // 设置纹理属性 - 优化球体映射
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.anisotropy = 16 // 提高纹理清晰度
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
  }, [texture])
  
  return (
    <meshStandardMaterial
      map={texture}
      metalness={0.15}
      roughness={0.65}
      emissive={primaryColor}
      emissiveIntensity={emissiveIntensity * 0.4}
      envMapIntensity={0.8}
    />
  )
}
