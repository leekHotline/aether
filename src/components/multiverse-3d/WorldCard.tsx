'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useMultiverseStore } from './useMultiverseStore'

export default function WorldCard() {
  const { activeWorld, isCardOpen, closeCard } = useMultiverseStore()
  
  if (!activeWorld) return null
  
  return (
    <AnimatePresence>
      {isCardOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCard}
          />
          
          {/* 卡片 */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-[360px] max-w-[90vw]"
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              x: '-50%', 
              y: '-50%',
              rotateX: 20,
              rotateY: -10,
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: '-50%', 
              y: '-50%',
              rotateX: 0,
              rotateY: 0,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              rotateX: -20,
              rotateY: 10,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{ perspective: 1000 }}
          >
            <div 
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  0 8px 32px rgba(0,0,0,0.1),
                  0 0 0 1px rgba(255,255,255,0.5),
                  inset 0 1px 0 rgba(255,255,255,0.6)
                `,
              }}
            >
              {/* 顶部装饰渐变 */}
              <div 
                className="absolute top-0 left-0 right-0 h-24 opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${activeWorld.primaryColor}, ${activeWorld.secondaryColor})`,
                }}
              />
              
              {/* 关闭按钮 */}
              <button
                onClick={closeCard}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors z-10"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* 内容区 */}
              <div className="relative p-6 pt-8">
                {/* 星球图标 */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${activeWorld.primaryColor}, ${activeWorld.secondaryColor})`,
                  }}
                >
                  <span className="text-2xl">🌌</span>
                </div>
                
                {/* 标题 */}
                <div className="mb-1">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    世界节点
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {activeWorld.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {activeWorld.description}
                </p>
                
                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeWorld.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        background: `${activeWorld.primaryColor}15`,
                        color: activeWorld.primaryColor,
                      }}
                    >
                      → {tag}
                    </span>
                  ))}
                </div>
                
                {/* 数据指标 */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 rounded-xl bg-gray-50">
                    <div className="text-xl font-bold text-gray-900">{activeWorld.stats.mass}</div>
                    <div className="text-xs text-gray-500">ΔMass</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gray-50">
                    <div className="text-xl font-bold text-gray-900">{activeWorld.stats.objects}</div>
                    <div className="text-xs text-gray-500">Objects</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gray-50">
                    <div className="text-xl font-bold text-gray-900">{activeWorld.stats.anchors}</div>
                    <div className="text-xs text-gray-500">Anchors</div>
                  </div>
                </div>
                
                {/* CTA 按钮 */}
                <Link href={`/editor/${activeWorld.id}`} onClick={closeCard}>
                  <motion.button
                    className="w-full py-3 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${activeWorld.primaryColor}, ${activeWorld.secondaryColor})`,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    进入世界
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
