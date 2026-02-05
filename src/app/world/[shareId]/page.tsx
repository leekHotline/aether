'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getSharedWorld } from '@/lib/shareStorage'
import { getWorldById } from '@/data/seedWorlds'
import WorldPreviewPlayer from '@/components/WorldPreviewPlayer'
import { SharedWorld } from '@/types'
import RippleButton from '@/components/ui/RippleButton'
import GlassCard from '@/components/ui/GlassCard'
import FadeIn from '@/components/animations/FadeIn'

export default function SharePage() {
  const params = useParams()
  const shareId = params.shareId as string
  
  const [sharedWorld, setSharedWorld] = useState<SharedWorld | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const world = getSharedWorld(shareId)
    if (world) {
      setSharedWorld(world)
    } else {
      setError('分享链接无效或已过期')
    }
    setIsLoading(false)
  }, [shareId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 border-2 border-accent-DEFAULT border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error || !sharedWorld) {
    return (
      <div className="min-h-screen bg-primary-bg flex flex-col items-center justify-center gap-6">
        <FadeIn className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary-surface flex items-center justify-center mb-6 mx-auto">
            <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-DEFAULT mb-2">未找到世界</h1>
          <p className="text-text-secondary mb-8">{error}</p>
          <RippleButton variant="primary">
            <Link href="/worlds">浏览世界</Link>
          </RippleButton>
        </FadeIn>
      </div>
    )
  }

  const worldSeed = getWorldById(sharedWorld.worldId)
  const clips = worldSeed?.clips || []

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-border glass-strong">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-DEFAULT to-accent-glow flex items-center justify-center shadow-glow"
          >
            <span className="text-white font-bold text-sm">A</span>
          </motion.div>
          <span className="text-lg font-semibold text-text-DEFAULT">
            Aether<span className="text-accent-DEFAULT">灵境</span>
          </span>
        </Link>
        
        <RippleButton variant="primary" size="sm">
          <Link href={`/editor/${sharedWorld.worldId}`}>在编辑器中打开</Link>
        </RippleButton>
      </header>
      
      {/* Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 relative p-4"
        >
          {clips.length > 0 && (
            <WorldPreviewPlayer
              clips={clips}
              activeClipId={sharedWorld.finalClipId}
            />
          )}
        </motion.div>
        
        {/* Info sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-96 border-l border-border bg-white p-6"
        >
          <h1 className="text-2xl font-bold text-text-DEFAULT mb-2">
            {sharedWorld.worldName}
          </h1>
          
          <p className="text-sm text-text-muted mb-6 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            创建于 {new Date(sharedWorld.createdAt).toLocaleDateString('zh-CN')}
          </p>
          
          {/* Story summary */}
          {sharedWorld.storySummary && (
            <GlassCard className="mb-6">
              <h2 className="text-sm font-semibold text-text-secondary mb-2">📖 故事摘要</h2>
              <p className="text-text-DEFAULT text-sm leading-relaxed">
                {sharedWorld.storySummary}
              </p>
            </GlassCard>
          )}
          
          {/* Timeline */}
          <div>
            <h2 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
              <span>⏱️</span> 时间线
            </h2>
            <div className="space-y-2">
              <AnimatePresence>
                {sharedWorld.timeline.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 px-4 py-3 bg-primary-surface rounded-xl border border-border"
                  >
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-accent-DEFAULT/10 text-accent-DEFAULT">
                      v{record.version}
                    </span>
                    <span className="text-sm text-text-DEFAULT flex-1 truncate">
                      {record.intentLabel}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {sharedWorld.timeline.length === 0 && (
                <p className="text-sm text-text-muted text-center py-8">
                  无历史记录
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
