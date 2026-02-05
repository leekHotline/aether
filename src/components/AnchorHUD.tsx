'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface AnchorHUDProps {
  anchors: string[]
  visible: boolean
}

const anchorPositions: Record<string, { top: string; left: string }> = {
  GravityField: { top: '20%', left: '70%' },
  PhysicsEngine: { top: '40%', left: '30%' },
  WeaponImpulse: { top: '50%', left: '60%' },
  CombatSystem: { top: '70%', left: '40%' },
  TimeScale: { top: '30%', left: '50%' },
  WeatherSystem: { top: '15%', left: '45%' },
}

export default function AnchorHUD({ anchors, visible }: AnchorHUDProps) {
  return (
    <AnimatePresence>
      {visible && anchors.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {anchors.map((anchor, index) => {
            const position = anchorPositions[anchor] || { top: '50%', left: '50%' }
            return (
              <motion.div
                key={anchor}
                className="absolute"
                style={{ top: position.top, left: position.left }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4, type: 'spring' }}
              >
                {/* Anchor point */}
                <div className="relative">
                  {/* Outer pulsing ring */}
                  <motion.div
                    className="absolute -inset-3 rounded-full border border-accent-DEFAULT/30"
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  {/* Inner pulsing ring */}
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border border-accent-DEFAULT/50"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.2,
                    }}
                  />
                  
                  {/* Core dot */}
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-accent-DEFAULT shadow-glow"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  
                  {/* Label */}
                  <motion.div
                    className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <span className="text-xs font-medium text-text-DEFAULT glass px-3 py-1.5 rounded-lg shadow-soft border border-border">
                      <span className="text-accent-DEFAULT">⚓</span> {anchor}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </AnimatePresence>
  )
}
