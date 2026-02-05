'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera,
  Float,
  Preload,
  Stars,
} from '@react-three/drei'

import GlassSphere from './GlassSphere'
import WorldCard from './WorldCard'
import { PRESET_WORLDS } from './constants'

// 场景内容
function Scene() {
  return (
    <>
      {/* 相机 - 固定位置，让 OrbitControls 控制 */}
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
      
      {/* 控制器 - 以原点为中心旋转 */}
      <OrbitControls
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={true}
        minDistance={6}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 3 / 4}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.3}
      />
      
      {/* 环境光照 - 大幅提升亮度 */}
      <ambientLight intensity={0.6} />
      
      {/* 主光源 - 模拟太阳光，更亮 */}
      <directionalLight 
        position={[15, 10, 10]} 
        intensity={2.5} 
        color="#ffffff"
      />
      
      {/* 前方补光 - 照亮面向用户的部分 */}
      <directionalLight position={[0, 0, 15]} intensity={1.5} color="#ffffff" />
      
      {/* 侧面补光 - 蓝紫色调 */}
      <directionalLight position={[-10, -5, -10]} intensity={0.8} color="#818CF8" />
      <directionalLight position={[10, 5, -5]} intensity={0.6} color="#A5B4FC" />
      
      {/* 中心点光源 - 为主星球添加内部发光感，更亮 */}
      <pointLight position={[0, 0, 0]} intensity={3} color="#A5B4FC" distance={12} decay={2} />
      
      {/* 环形光点 - 蓝紫色系，更亮 */}
      <pointLight position={[5, 3, -3]} intensity={1.5} color="#818CF8" distance={15} decay={2} />
      <pointLight position={[-4, -2, 4]} intensity={1.2} color="#60A5FA" distance={15} decay={2} />
      <pointLight position={[0, 5, 3]} intensity={1.0} color="#C4B5FD" distance={15} decay={2} />
      
      {/* 边缘轮廓光 - 青色高光 */}
      <spotLight 
        position={[-10, 5, -5]} 
        angle={0.4} 
        penumbra={1} 
        intensity={2} 
        color="#22D3EE"
        distance={25}
      />
      
      {/* 环境贴图 - 提供反射 */}
      <Environment preset="night" />
      
      {/* 星空背景 - 使用 drei 内置 Stars */}
      <Stars 
        radius={50} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* 星球群 */}
      {PRESET_WORLDS.map((world) => (
        <Float
          key={world.id}
          speed={world.isMain ? 1 : 1.5}
          rotationIntensity={0.1}
          floatIntensity={world.isMain ? 0.3 : 0.2}
        >
          <GlassSphere world={world} />
        </Float>
      ))}
      
      <Preload all />
    </>
  )
}

// 加载占位 - 与深色背景匹配
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-800 border-t-indigo-400 rounded-full animate-spin" />
        <p className="text-sm text-indigo-300">加载多元宇宙...</p>
      </div>
    </div>
  )
}

export default function MultiverseCanvas() {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden">
      <Suspense fallback={<Loader />}>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          style={{ 
            background: 'linear-gradient(to bottom, #0f172a, #1e1b4b, #0f172a)',
          }}
        >
          <Scene />
        </Canvas>
      </Suspense>
      
      {/* 世界详情卡片 */}
      <WorldCard />
      
      {/* 底部提示 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-20">
        <p className="text-xs text-indigo-300/60">
          拖拽旋转 · 滚轮缩放 · 点击星球
        </p>
      </div>
    </div>
  )
}
