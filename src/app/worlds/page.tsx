'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { seedWorlds } from '@/data/seedWorlds'
import { WorldSeed } from '@/types'
import GlassCard from '@/components/ui/GlassCard'
import FadeIn from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import RippleButton from '@/components/ui/RippleButton'

const styleColors: Record<string, string> = {
  'cyber-zen': 'from-cyan-400/20 to-purple-400/20',
  'noir': 'from-slate-400/20 to-gray-500/20',
  'cartoon': 'from-yellow-300/20 to-orange-400/20',
  'sci-fi': 'from-blue-400/20 to-indigo-500/20',
  'fantasy': 'from-emerald-400/20 to-teal-500/20',
}

function WorldCard({ world, index }: { world: WorldSeed; index: number }) {
  return (
    <StaggerItem>
      <Link href={`/editor/${world.id}`}>
        <GlassCard tilt glow className="group cursor-pointer overflow-hidden">
          {/* Cover */}
          <div className={`aspect-video bg-gradient-to-br ${styleColors[world.style] || styleColors['sci-fi']} relative overflow-hidden`}>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            
            {/* Animated pattern */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.3) 0%, transparent 50%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Play icon on hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            >
              <div className="w-16 h-16 rounded-full bg-white/90 shadow-large flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-DEFAULT ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-text-DEFAULT group-hover:text-accent-DEFAULT transition-colors">
                {world.name}
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary-surface text-text-secondary capitalize">
                {world.style.replace('-', ' ')}
              </span>
            </div>
            
            <p className="text-sm text-text-secondary line-clamp-2 mb-4">
              {world.description}
            </p>
            
            {/* Clips count */}
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                {world.clips.length} clips
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ~5 min
              </span>
            </div>
          </div>
        </GlassCard>
      </Link>
    </StaggerItem>
  )
}

export default function WorldsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', 'Sci-Fi', 'Cyber Zen', 'Noir', 'Fantasy']

  const filteredWorlds = activeFilter === 'All' 
    ? seedWorlds 
    : seedWorlds.filter(w => w.style.toLowerCase().includes(activeFilter.toLowerCase().replace(' ', '-')))

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 glass-strong border-b border-border">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-DEFAULT to-accent-glow flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-semibold text-text-DEFAULT">Aether</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/worlds" className="text-sm font-medium text-text-DEFAULT">
            Worlds
          </Link>
          <Link href="/docs" className="text-sm text-text-secondary hover:text-text-DEFAULT transition-colors">
            Docs
          </Link>
        </nav>
      </header>
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <FadeIn className="mb-12">
            <h1 className="text-4xl md:text-title font-bold text-text-DEFAULT mb-4">
              探索世界
            </h1>
            <p className="text-lg text-text-secondary max-w-xl">
              选择一个种子世界开始你的创作之旅，每个世界都有独特的物理规则和视觉风格
            </p>
          </FadeIn>
          
          {/* Search & Filter */}
          <FadeIn delay={0.1} className="flex flex-col md:flex-row gap-4 mb-10">
            {/* Search */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="搜索世界..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl text-text-DEFAULT placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-DEFAULT/20 focus:border-accent-DEFAULT transition-all"
              />
            </div>
            
            {/* Filter tags */}
            <div className="flex gap-2 flex-wrap">
              {filters.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    tag === activeFilter
                      ? 'bg-accent-DEFAULT text-white shadow-glow'
                      : 'bg-white border border-border text-text-secondary hover:border-accent-DEFAULT/50 hover:text-text-DEFAULT'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </FadeIn>
          
          {/* World Grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {filteredWorlds.map((world, index) => (
              <WorldCard key={world.id} world={world} index={index} />
            ))}
          </StaggerContainer>
          
          {/* Empty state */}
          {filteredWorlds.length === 0 && (
            <FadeIn className="text-center py-20">
              <div className="text-6xl mb-4">🌌</div>
              <p className="text-text-secondary mb-6">没有找到匹配的世界</p>
              <RippleButton variant="secondary" onClick={() => setActiveFilter('All')}>
                查看全部
              </RippleButton>
            </FadeIn>
          )}
        </div>
      </main>
    </div>
  )
}
