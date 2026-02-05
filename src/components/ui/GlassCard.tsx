'use client'

import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import clsx from 'clsx'

interface GlassCardProps {
  children: ReactNode
  className?: string
  tilt?: boolean
  glow?: boolean
  onClick?: () => void
}

export default function GlassCard({
  children,
  className = '',
  tilt = false,
  glow = false,
  onClick,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 200 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-8, 8])
  
  // Glare effect position
  const glareX = useTransform(xSpring, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(ySpring, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const normalizedX = (e.clientX - centerX) / (rect.width / 2)
    const normalizedY = (e.clientY - centerY) / (rect.height / 2)
    
    x.set(normalizedX * 0.5)
    y.set(normalizedY * 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
      whileHover={!tilt ? { y: -4, transition: { duration: 0.3 } } : undefined}
      className={clsx(
        'relative rounded-2xl border border-border bg-white/70 backdrop-blur-xl',
        'transition-shadow duration-300',
        glow && 'hover:shadow-glow',
        !glow && 'hover:shadow-large',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Glare effect */}
      {tilt && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />
      )}
      
      {children}
    </motion.div>
  )
}
