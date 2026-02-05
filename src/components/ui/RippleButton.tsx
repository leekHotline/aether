'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface RippleButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

interface Ripple {
  id: number
  x: number
  y: number
}

export default function RippleButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = { id: Date.now(), x, y }
    setRipples((prev) => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)
    
    onClick?.()
  }

  const baseStyles = 'relative overflow-hidden font-medium transition-all duration-300 focus-ring'
  
  const variantStyles = {
    primary: 'bg-accent-DEFAULT text-white hover:bg-accent-glow shadow-medium hover:shadow-glow',
    secondary: 'bg-white text-text-DEFAULT border-2 border-gray-200 hover:border-accent-DEFAULT hover:shadow-medium shadow-soft',
    ghost: 'text-text-DEFAULT hover:text-accent-DEFAULT hover:bg-primary-surface',
  }
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}
