'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function StaggerItem({
  children,
  className = '',
  direction = 'up',
}: StaggerItemProps) {
  const getOffset = () => {
    switch (direction) {
      case 'up': return { y: 30 }
      case 'down': return { y: -30 }
      case 'left': return { x: 30 }
      case 'right': return { x: -30 }
    }
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          ...getOffset(),
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
