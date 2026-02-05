'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'

interface CountUpProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  })
  
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest.toFixed(decimals))
    })
    return unsubscribe
  }, [springValue, decimals])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  )
}
