'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IntentRippleProps {
  trigger: boolean
  onComplete?: () => void
}

export default function IntentRipple({ trigger, onComplete }: IntentRippleProps) {
  const rippleKey = useRef(0)

  useEffect(() => {
    if (trigger) {
      rippleKey.current++
    }
  }, [trigger])

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          key={rippleKey.current}
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-20"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          onAnimationComplete={onComplete}
        >
          {/* Multiple ripple rings */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 80,
                height: 80,
                border: '2px solid',
                borderColor: `rgba(99, 102, 241, ${0.6 - i * 0.15})`,
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{
                duration: 1.2,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
          
          {/* Center glow */}
          <motion.div
            className="absolute w-6 h-6 rounded-full bg-accent-DEFAULT"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 60px 30px rgba(99, 102, 241, 0.4)',
            }}
          />
          
          {/* Success checkmark */}
          <motion.div
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-large flex items-center justify-center">
              <motion.svg
                className="w-8 h-8 text-accent-DEFAULT"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
