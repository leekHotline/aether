'use client'

import { motion } from 'framer-motion'

interface NodeSphereProps {
  id: string
  label: string
  icon: string
  x: number
  y: number
  isActive: boolean
  onClick: () => void
  color: string
}

export default function NodeSphere({
  id,
  label,
  icon,
  x,
  y,
  isActive,
  onClick,
  color,
}: NodeSphereProps) {
  return (
    <motion.g
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 外发光 */}
      <motion.circle
        cx={x}
        cy={y}
        r={isActive ? 50 : 40}
        fill={`url(#glow-${id})`}
        animate={{
          r: isActive ? [50, 55, 50] : 40,
          opacity: isActive ? [0.6, 0.8, 0.6] : 0.3,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 主球体 */}
      <motion.circle
        cx={x}
        cy={y}
        r={30}
        fill={`url(#sphere-${id})`}
        stroke={isActive ? color : 'rgba(255,255,255,0.3)'}
        strokeWidth={isActive ? 2 : 1}
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 内发光 */}
      <circle
        cx={x}
        cy={y}
        r={20}
        fill={`url(#inner-${id})`}
        style={{ mixBlendMode: 'screen' }}
      />

      {/* 图标 */}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="20"
        style={{ pointerEvents: 'none' }}
      >
        {icon}
      </text>

      {/* 标签 */}
      <motion.text
        x={x}
        y={y + 50}
        textAnchor="middle"
        fontSize="12"
        fontWeight={isActive ? 600 : 400}
        fill={isActive ? color : '#64748B'}
        animate={{ opacity: isActive ? 1 : 0.7 }}
      >
        {label}
      </motion.text>

      {/* 渐变定义 */}
      <defs>
        <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`sphere-${id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="50%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id={`inner-${id}`} cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.g>
  )
}
