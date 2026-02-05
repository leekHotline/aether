'use client'

import { ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
  blur?: boolean
}

export default function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 30,
  once = true,
  blur = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-10%' })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance }
      case 'down': return { y: -distance }
      case 'left': return { x: distance }
      case 'right': return { x: -distance }
      default: return {}
    }
  }

  const initialStyles = {
    opacity: 0,
    ...getInitialPosition(),
    ...(blur ? { filter: 'blur(10px)' } : {}),
  }

  const animateStyles = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(blur ? { filter: 'blur(0px)' } : {}),
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initialStyles}
      animate={isInView ? animateStyles : initialStyles}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
