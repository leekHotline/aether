'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface NodeData {
  id: string
  label: string
  description: string
  effect: string
  metrics: {
    label: string
    value: string
    unit: string
  }[]
}

interface OrbitCardProps {
  node: NodeData | null
  isVisible: boolean
}

export default function OrbitCard({ node, isVisible }: OrbitCardProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && node && (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 w-72"
        >
          {/* 标题区 */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-lg">
                {node.id === 'gravity' && '🌌'}
                {node.id === 'time' && '⏱️'}
                {node.id === 'material' && '💎'}
                {node.id === 'force' && '⚡'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{node.label}</h3>
              <p className="text-xs text-gray-500">规则节点</p>
            </div>
          </div>

          {/* 描述 */}
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {node.description}
          </p>

          {/* 效果标签 */}
          <div className="bg-indigo-50 rounded-lg px-3 py-2 mb-4">
            <p className="text-xs text-indigo-600 font-medium">
              → {node.effect}
            </p>
          </div>

          {/* 指标仪表 */}
          <div className="grid grid-cols-3 gap-2">
            {node.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-2 bg-gray-50 rounded-lg"
              >
                <div className="text-lg font-bold text-indigo-600">
                  {metric.value}
                  <span className="text-xs text-gray-400 ml-0.5">{metric.unit}</span>
                </div>
                <div className="text-xs text-gray-500">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
