'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { WorldSeed } from '@/types'
import GlassCard from '@/components/ui/GlassCard'

interface WorldCardProps {
  world: WorldSeed
  index: number
}

const styleColors: Record<string, { gradient: string; accent: string }> = {
  'cyber-zen': { 
    gradient: 'from-cyan-400/20 via-purple-400/10 to-indigo-400/20', 
    accent: 'bg-gradient-to-r from-cyan-400 to-purple-400' 
  },
  'noir': { 
    gradient: 'from-slate-300/20 via-gray-300/10 to-zinc-400/20', 
    accent: 'bg-gradient-to-r from-slate-500 to-gray-600' 
  },
  'cartoon': { 
    gradient: 'from-yellow-300/20 via-orange-200/10 to-pink-300/20', 
    accent: 'bg-gradient-to-r from-yellow-400 to-orange-400' 
  },
  'sci-fi': { 
    gradient: 'from-blue-400/20 via-indigo-300/10 to-violet-400/20', 
    accent: 'bg-gradient-to-r from-blue-500 to-indigo-500' 
  },
  'fantasy': { 
    gradient: 'from-emerald-400/20 via-teal-300/10 to-cyan-400/20', 
    accent: 'bg-gradient-to-r from-emerald-400 to-teal-500' 
  },
}

export default function WorldCard({ world, index }: WorldCardProps) {
  const colors = styleColors[world.style] || styleColors['sci-fi']
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group"
    >
      <Link href={`/editor/${world.id}`}>
        <GlassCard tilt glow className="overflow-hidden cursor-pointer">
          {/* Cover image area */}
          <div className={`aspect-video bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}>
            {/* Subtle animated pattern */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 20%, rgba(99,102,241,0.15) 0%, transparent 40%),
                  radial-gradient(circle at 70% 80%, rgba(168,85,247,0.15) 0%, transparent 40%)
                `
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
            
            {/* Hover play button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-14 h-14 rounded-full bg-white/95 shadow-large flex items-center justify-center group-hover:shadow-glow transition-shadow">
                <svg className="w-5 h-5 text-accent-DEFAULT ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>
            
            {/* Style badge */}
            <div className="absolute top-3 right-3">
              <span className={`text-xs px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-text-secondary capitalize font-medium shadow-sm`}>
                {world.style.replace('-', ' ')}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-text-DEFAULT group-hover:text-accent-DEFAULT transition-colors duration-200">
                {world.name}
              </h3>
            </div>
            
            <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
              {world.description}
            </p>
            
            {/* Meta info */}
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {world.clips.length} clips
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ~5 min play
              </span>
            </div>
            
            {/* Progress bar placeholder */}
            <div className="mt-4 h-1 bg-primary-surface rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${colors.accent}`}
                initial={{ width: 0 }}
                whileHover={{ width: '30%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}
