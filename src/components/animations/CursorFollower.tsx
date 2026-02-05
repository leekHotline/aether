'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CursorFollowerProps {
  size?: number
  color?: string
}

export default function CursorFollower({
  size = 20,
  color = 'rgba(99, 102, 241, 0.3)',
}: CursorFollowerProps) {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2)
      cursorY.set(e.clientY - size / 2)
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY, size])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
      }}
    />
  )
}
