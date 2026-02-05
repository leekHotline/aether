'use client'

import { motion } from 'framer-motion'

interface NodeLinkProps {
  x1: number
  y1: number
  x2: number
  y2: number
  isActive: boolean
  color: string
}

export default function NodeLink({ x1, y1, x2, y2, isActive, color }: NodeLinkProps) {
  // 计算曲线控制点
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2 - 30
  const path = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`

  return (
    <g>
      {/* 发光层 */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={isActive ? 4 : 2}
        strokeLinecap="round"
        animate={{
          opacity: isActive ? 0.6 : 0.1,
          strokeWidth: isActive ? 4 : 2,
        }}
        transition={{ duration: 0.3 }}
        style={{ filter: isActive ? 'blur(4px)' : 'none' }}
      />
      
      {/* 主线条 */}
      <motion.path
        d={path}
        fill="none"
        stroke={isActive ? color : 'rgba(148, 163, 184, 0.3)'}
        strokeWidth={isActive ? 2 : 1}
        strokeLinecap="round"
        strokeDasharray={isActive ? '0' : '4 4'}
        animate={{
          opacity: isActive ? 1 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* 流动粒子效果 */}
      {isActive && (
        <motion.circle
          r={3}
          fill={color}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            offsetPath: `path('${path}')`,
          }}
        />
      )}
    </g>
  )
}
