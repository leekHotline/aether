'use client'

import { useState, useCallback, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { nanoid } from 'nanoid'
import EditorToolbar from '@/components/EditorToolbar'
import NarrativeEditor from '@/components/NarrativeEditor'
import WorldPreviewPlayer from '@/components/WorldPreviewPlayer'
import IntentRipple from '@/components/IntentRipple'
import AnchorHUD from '@/components/AnchorHUD'
import IntentTimeline from '@/components/IntentTimeline'
import { getWorldById } from '@/data/seedWorlds'
import { compileIntent } from '@/lib/intentCompiler'
import { saveSharedWorld, generateShareId } from '@/lib/shareStorage'
import { IntentRecord, EditorSession, SharedWorld } from '@/types'
import RippleButton from '@/components/ui/RippleButton'

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const worldId = params.worldId as string
  
  const world = getWorldById(worldId)
  
  const [session, setSession] = useState<EditorSession>({
    worldId,
    currentClipId: world?.defaultClipId || 'baseline',
    timeline: [],
    narrativeText: '',
  })
  
  const [showRipple, setShowRipple] = useState(false)
  const [activeAnchors, setActiveAnchors] = useState<string[]>([])
  const [showAnchors, setShowAnchors] = useState(false)
  const [isCompiling, setIsCompiling] = useState(false)

  // Handle intent application
  const handleApplyIntent = useCallback(() => {
    if (!session.narrativeText.trim()) return
    
    setIsCompiling(true)
    
    // Simulate compilation delay for UX
    setTimeout(() => {
      const compiled = compileIntent(session.narrativeText)
      
      // Create new timeline record
      const newRecord: IntentRecord = {
        id: nanoid(),
        version: session.timeline.length + 1,
        text: session.narrativeText,
        intentLabel: compiled.intentLabel,
        clipId: compiled.clipId,
        anchorsUpdated: compiled.anchorsUpdated,
        timestamp: Date.now(),
      }
      
      // Update session
      setSession((prev) => ({
        ...prev,
        currentClipId: compiled.clipId,
        timeline: [...prev.timeline, newRecord],
      }))
      
      // Trigger visual effects
      setShowRipple(true)
      setIsCompiling(false)
      
      if (compiled.anchorsUpdated.length > 0) {
        setActiveAnchors(compiled.anchorsUpdated)
        setShowAnchors(true)
        
        // Hide anchors after delay
        setTimeout(() => {
          setShowAnchors(false)
        }, 3000)
      }
    }, 600)
  }, [session.narrativeText, session.timeline.length])

  // Handle timeline selection
  const handleSelectVersion = useCallback((record: IntentRecord) => {
    setSession((prev) => ({
      ...prev,
      currentClipId: record.clipId,
    }))
    
    // Show anchors for selected version
    if (record.anchorsUpdated.length > 0) {
      setActiveAnchors(record.anchorsUpdated)
      setShowAnchors(true)
      setTimeout(() => setShowAnchors(false), 2000)
    }
  }, [])

  // Handle share
  const handleShare = useCallback(() => {
    const shareId = generateShareId()
    
    const sharedWorld: SharedWorld = {
      shareId,
      worldId,
      worldName: world?.name || 'Unknown World',
      finalClipId: session.currentClipId,
      timeline: session.timeline,
      storySummary: session.narrativeText.slice(0, 200),
      createdAt: Date.now(),
    }
    
    saveSharedWorld(sharedWorld)
    
    const shareUrl = `${window.location.origin}/world/${shareId}`
    navigator.clipboard.writeText(shareUrl)
    alert(`链接已复制到剪贴板：\n${shareUrl}`)
  }, [worldId, world?.name, session.currentClipId, session.timeline, session.narrativeText])

  // Handle narrative text change
  const handleTextChange = useCallback((text: string) => {
    setSession((prev) => ({ ...prev, narrativeText: text }))
  }, [])

  // Redirect if world not found
  useEffect(() => {
    if (!world) {
      router.push('/worlds')
    }
  }, [world, router])

  if (!world) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full border-2 border-accent-DEFAULT border-t-transparent animate-spin" />
          <p className="text-text-secondary">加载中...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-primary-bg overflow-hidden">
      {/* Toolbar */}
      <EditorToolbar
        worldName={world.name}
        status="Mock"
        latency={42}
        onShare={handleShare}
      />
      
      {/* Main content */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Narrative Editor */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-1/3 min-w-[400px] border-r border-border flex flex-col bg-white"
        >
          <div className="flex-1 min-h-0">
            <NarrativeEditor
              value={session.narrativeText}
              onChange={handleTextChange}
              onApplyIntent={handleApplyIntent}
            />
          </div>
          
          {/* Apply Button */}
          <div className="p-4 border-t border-border">
            <RippleButton
              variant="primary"
              className="w-full justify-center"
              onClick={handleApplyIntent}
              disabled={!session.narrativeText.trim() || isCompiling}
            >
              {isCompiling ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  编译中...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  应用意图
                </span>
              )}
            </RippleButton>
          </div>
          
          {/* Timeline */}
          <div className="h-1/3 border-t border-border overflow-auto bg-primary-surface/30">
            <IntentTimeline
              timeline={session.timeline}
              activeVersion={session.timeline.length}
              onSelectVersion={handleSelectVersion}
            />
          </div>
        </motion.div>
        
        {/* Right: World Preview */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 relative bg-gradient-to-br from-primary-surface to-primary-bg"
        >
          <WorldPreviewPlayer
            clips={world.clips}
            activeClipId={session.currentClipId}
          />
          
          {/* Intent Ripple */}
          <IntentRipple
            trigger={showRipple}
            onComplete={() => setShowRipple(false)}
          />
          
          {/* Anchor HUD */}
          <AnchorHUD anchors={activeAnchors} visible={showAnchors} />
          
          {/* Intent feedback overlay */}
          <AnimatePresence>
            {session.timeline.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-4 right-4 px-4 py-2.5 glass-strong rounded-xl shadow-soft"
              >
                <p className="text-xs font-medium text-text-secondary">
                  <span className="text-accent-DEFAULT">✓</span> 意图已编译 → {session.timeline[session.timeline.length - 1]?.anchorsUpdated.length || 0} 个锚点更新
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Compiling overlay */}
          <AnimatePresence>
            {isCompiling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10"
              >
                <div className="flex flex-col items-center gap-3 p-6 glass-strong rounded-2xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 rounded-full border-3 border-accent-DEFAULT border-t-transparent"
                  />
                  <p className="text-sm font-medium text-text-secondary">正在编译意图...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Quick intent buttons */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-16 flex items-center justify-center gap-3 border-t border-border bg-white px-4"
      >
        <span className="text-sm text-text-DEFAULT font-medium mr-2">快捷意图:</span>
        {[
          { label: '🌌 重力消失', text: '引力消失了' },
          { label: '⏱️ 时间减慢', text: '时间开始减慢' },
          { label: '⚔️ 召唤长剑', text: '一把长剑出现' },
          { label: '🌧️ 天降暴雨', text: '天空开始下起暴雨' },
        ].map((intent) => (
          <button
            key={intent.label}
            onClick={() => handleTextChange(intent.text)}
            className="px-4 py-2 bg-white border-2 border-gray-200 hover:border-accent-DEFAULT text-sm text-text-DEFAULT hover:text-accent-DEFAULT rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            {intent.label}
          </button>
        ))}
      </motion.div>
    </div>
  )
}
