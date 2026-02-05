'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clip } from '@/types'
import { useClipSwap } from '@/hooks/useClipSwap'

interface WorldPreviewPlayerProps {
  clips: Clip[]
  activeClipId: string
  onClipChange?: (clipId: string) => void
}

export default function WorldPreviewPlayer({
  clips,
  activeClipId,
  onClipChange,
}: WorldPreviewPlayerProps) {
  const { activeClip, prevClip, isFading, swapClip } = useClipSwap(clips, activeClipId)
  
  const frontVideoRef = useRef<HTMLVideoElement>(null)
  const backVideoRef = useRef<HTMLVideoElement>(null)

  // Sync with external activeClipId changes
  useEffect(() => {
    if (activeClipId !== activeClip.id) {
      swapClip(activeClipId)
    }
  }, [activeClipId, activeClip.id, swapClip])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary-surface to-primary-bg">
      {/* Back video (previous clip during fade) */}
      <AnimatePresence>
        {prevClip && isFading && (
          <motion.video
            key={`back-${prevClip.id}`}
            ref={backVideoRef}
            src={prevClip.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* Front video (active clip) */}
      <motion.video
        key={`front-${activeClip.id}`}
        ref={frontVideoRef}
        src={activeClip.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.1) 100%)',
        }}
      />

      {/* Clip label overlay */}
      <motion.div
        key={activeClip.label}
        className="absolute bottom-4 left-4 glass-strong px-4 py-2 rounded-xl shadow-soft"
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-text-DEFAULT font-medium">{activeClip.label}</span>
        </div>
      </motion.div>
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-border/50 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-border/50 rounded-tr-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-border/50 rounded-br-lg" />
    </div>
  )
}
