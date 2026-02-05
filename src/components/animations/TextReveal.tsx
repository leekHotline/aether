'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation, Variant } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerDelay?: number
  once?: boolean
  splitBy?: 'char' | 'word'
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.03,
  once = true,
  splitBy = 'char',
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-10%' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [isInView, controls, once])

  const items = splitBy === 'char' 
    ? text.split('') 
    : text.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{ 
            whiteSpace: item === ' ' || splitBy === 'word' ? 'pre' : 'normal',
          }}
        >
          {item}
          {splitBy === 'word' && index < items.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}
