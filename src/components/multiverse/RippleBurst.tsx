'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface RippleBurstProps {
  x: number
  y: number
  isActive: boolean
  color: string
}

export default function RippleBurst({ x, y, isActive, color }: RippleBurstProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <g>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              fill="none"
              stroke={color}
              strokeWidth={2}
              initial={{ r: 30, opacity: 0.8, strokeWidth: 2 }}
              animate={{ r: 80, opacity: 0, strokeWidth: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: 'easeOut',
              }}
            />
          ))}
        </g>
      )}
    </AnimatePresence>
  )
}
