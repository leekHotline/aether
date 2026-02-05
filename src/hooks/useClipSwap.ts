'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Clip } from '@/types'

interface ClipSwapState {
  frontVideo: HTMLVideoElement | null
  backVideo: HTMLVideoElement | null
  isFading: boolean
}

export function useClipSwap(clips: Clip[], initialClipId: string) {
  const [activeClipId, setActiveClipId] = useState(initialClipId)
  const [prevClipId, setPrevClipId] = useState<string | null>(null)
  const [isFading, setIsFading] = useState(false)
  
  const swapClip = useCallback((newClipId: string) => {
    if (newClipId === activeClipId) return
    
    setPrevClipId(activeClipId)
    setActiveClipId(newClipId)
    setIsFading(true)
    
    // Fade duration
    setTimeout(() => {
      setIsFading(false)
      setPrevClipId(null)
    }, 500)
  }, [activeClipId])

  const activeClip = clips.find((c) => c.id === activeClipId) || clips[0]
  const prevClip = prevClipId ? clips.find((c) => c.id === prevClipId) : null

  return {
    activeClip,
    prevClip,
    activeClipId,
    isFading,
    swapClip,
  }
}
