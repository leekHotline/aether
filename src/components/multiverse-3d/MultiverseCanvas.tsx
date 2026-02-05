'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera,
  Float,
  Preload,
} from '@react-three/drei'
import * as THREE from 'three'

import GlassSphere from './GlassSphere'
import StarField from './StarField'
import WorldCard from './WorldCard'
import { PRESET_WORLDS } from './constants'

// 相机自动轻微运动
function CameraRig() {
  const { camera } = useThree()
  const initialPosition = useRef(new THREE.Vector3(0, 0, 8))
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    // 轻微呼吸感
    camera.position.x = initialPosition.current.x + Math.sin(t * 0.2) * 0.3
    camera.position.y = initialPosition.current.y + Math.cos(t * 0.15) * 0.2
  })
  
  return null
}

// 场景内容
function Scene() {
  return (
    <>
      {/* 相机 */}
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <CameraRig />
      
      {/* 控制器 */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2 - Math.PI / 4}
        maxPolarAngle={Math.PI / 2 + Math.PI / 4}
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
      
      {/* 环境光照 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#6366F1" />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#8B5CF6" />
      
      {/* 环境贴图 */}
      <Environment preset="night" />
      
      {/* 星空背景 */}
      <StarField count={1500} radius={25} />
      
      {/* 星球群 */}
      {PRESET_WORLDS.map((world) => (
        <Float
          key={world.id}
          speed={world.isMain ? 1.5 : 2}
          rotationIntensity={0.2}
          floatIntensity={world.isMain ? 0.5 : 0.3}
        >
          <GlassSphere world={world} />
        </Float>
      ))}
      
      <Preload all />
    </>
  )
}

// 加载占位
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-500">加载多元宇宙...</p>
      </div>
    </div>
  )
}

export default function MultiverseCanvas() {
  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* CSS 辉光层 */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
        }}
      />
      
      <Suspense fallback={<Loader />}>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ 
            background: 'transparent',
            filter: 'contrast(1.05) saturate(1.1)',
          }}
        >
          <Scene />
        </Canvas>
      </Suspense>
      
      {/* 世界详情卡片 */}
      <WorldCard />
      
      {/* 底部提示 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-20">
        <p className="text-xs text-gray-400">
          拖拽旋转 · 点击星球查看详情
        </p>
      </div>
    </div>
  )
}
