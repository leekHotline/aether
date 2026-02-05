'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NodeSphere from './NodeSphere'
import NodeLink from './NodeLink'
import RippleBurst from './RippleBurst'
import OrbitCard from './OrbitCard'

const NODES = [
  {
    id: 'gravity',
    label: 'Gravity',
    icon: '🌌',
    x: 200,
    y: 120,
    color: '#6366F1',
    description: '控制世界的引力场，让万物失重漂浮',
    effect: '失重 / 漂浮 / 轨道失稳',
    metrics: [
      { label: 'ΔMass', value: '0.0', unit: 'g' },
      { label: 'Objects', value: '12', unit: '' },
      { label: 'Anchors', value: '3', unit: '' },
    ],
  },
  {
    id: 'time',
    label: 'Time',
    icon: '⏱️',
    x: 350,
    y: 80,
    color: '#8B5CF6',
    description: '操控时间流速，回放或暂停事件',
    effect: '慢动作 / 延迟 / 事件回放',
    metrics: [
      { label: 'Scale', value: '0.5', unit: 'x' },
      { label: 'Events', value: '8', unit: '' },
      { label: 'Loops', value: '2', unit: '' },
    ],
  },
  {
    id: 'material',
    label: 'Material',
    icon: '💎',
    x: 320,
    y: 220,
    color: '#EC4899',
    description: '改变物质形态，破碎或液化',
    effect: '材质变形 / 破碎 / 液化',
    metrics: [
      { label: 'State', value: 'Liquid', unit: '' },
      { label: 'Density', value: '2.4', unit: '' },
      { label: 'Shards', value: '64', unit: '' },
    ],
  },
  {
    id: 'force',
    label: 'Force',
    icon: '⚡',
    x: 150,
    y: 200,
    color: '#F59E0B',
    description: '施加冲击力，产生爆发效果',
    effect: '冲击 / 推力 / 爆发',
    metrics: [
      { label: 'Power', value: '850', unit: 'N' },
      { label: 'Radius', value: '12', unit: 'm' },
      { label: 'Impulse', value: '1.2', unit: 's' },
    ],
  },
]

// 连线配置
const LINKS = [
  { from: 'gravity', to: 'time' },
  { from: 'time', to: 'material' },
  { from: 'material', to: 'force' },
  { from: 'force', to: 'gravity' },
  { from: 'gravity', to: 'material' },
]

export default function MultiverseStage() {
  const [activeNode, setActiveNode] = useState('gravity')
  const [rippleKey, setRippleKey] = useState(0)

  const handleNodeClick = (nodeId: string) => {
    setActiveNode(nodeId)
    setRippleKey((k) => k + 1)
  }

  const activeNodeData = NODES.find((n) => n.id === activeNode)
  const activeNodePos = activeNodeData ? { x: activeNodeData.x, y: activeNodeData.y } : { x: 0, y: 0 }

  // 呼吸动画效果 - 整体微缩放
  useEffect(() => {
    // 可以在这里添加 GSAP 呼吸动画
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* SVG 舞台 */}
      <motion.svg
        viewBox="0 0 500 320"
        className="w-full max-w-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* 背景光晕 */}
        <defs>
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="160" r="200" fill="url(#bg-glow)" />

        {/* 连线 */}
        {LINKS.map((link) => {
          const fromNode = NODES.find((n) => n.id === link.from)!
          const toNode = NODES.find((n) => n.id === link.to)!
          const isActive = link.from === activeNode || link.to === activeNode
          return (
            <NodeLink
              key={`${link.from}-${link.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              isActive={isActive}
              color={isActive ? activeNodeData?.color || '#6366F1' : '#94A3B8'}
            />
          )
        })}

        {/* Ripple 效果 */}
        <RippleBurst
          key={rippleKey}
          x={activeNodePos.x}
          y={activeNodePos.y}
          isActive={rippleKey > 0}
          color={activeNodeData?.color || '#6366F1'}
        />

        {/* 节点球体 */}
        {NODES.map((node) => (
          <NodeSphere
            key={node.id}
            id={node.id}
            label={node.label}
            icon={node.icon}
            x={node.x}
            y={node.y}
            isActive={node.id === activeNode}
            onClick={() => handleNodeClick(node.id)}
            color={node.color}
          />
        ))}
      </motion.svg>

      {/* 浮层卡片 */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden lg:block">
        <OrbitCard node={activeNodeData || null} isVisible={!!activeNodeData} />
      </div>

      {/* 提示文字 */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        点击节点查看规则变化
      </motion.div>
    </div>
  )
}
