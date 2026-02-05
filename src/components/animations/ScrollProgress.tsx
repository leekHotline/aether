'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

interface ScrollProgressProps {
  position?: 'top' | 'bottom'
  color?: string
  height?: number
}

export default function ScrollProgress({
  position = 'top',
  color = '#6366F1',
  height = 3,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={`fixed left-0 right-0 z-50 origin-left ${position === 'top' ? 'top-0' : 'bottom-0'}`}
      style={{
        scaleX,
        height,
        backgroundColor: color,
      }}
    />
  )
}
