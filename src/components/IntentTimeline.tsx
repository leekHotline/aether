'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { IntentRecord } from '@/types'

interface IntentTimelineProps {
  timeline: IntentRecord[]
  activeVersion: number
  onSelectVersion: (record: IntentRecord) => void
}

export default function IntentTimeline({
  timeline,
  activeVersion,
  onSelectVersion,
}: IntentTimelineProps) {
  return (
    <div className="flex flex-col gap-2 p-4 h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-text-DEFAULT">时间线</h3>
        {timeline.length > 0 && (
          <span className="text-xs text-text-muted px-2 py-0.5 rounded-full bg-primary-surface">
            {timeline.length} 条记录
          </span>
        )}
      </div>
      
      <div className="flex flex-col gap-2 flex-1 overflow-auto">
        <AnimatePresence mode="popLayout">
          {timeline.map((record, index) => (
            <motion.button
              key={record.id}
              onClick={() => onSelectVersion(record)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group
                ${record.version === activeVersion
                  ? 'bg-accent-DEFAULT/10 border border-accent-DEFAULT/30 shadow-glow'
                  : 'bg-white hover:bg-primary-surface border border-border hover:border-accent-DEFAULT/20'
                }
              `}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Version badge */}
              <span className={`
                text-xs font-mono px-2 py-0.5 rounded-md
                ${record.version === activeVersion 
                  ? 'bg-accent-DEFAULT text-white' 
                  : 'bg-primary-surface text-accent-DEFAULT'
                }
              `}>
                v{record.version}
              </span>
              
              {/* Intent label */}
              <span className="text-sm text-text-DEFAULT flex-1 truncate group-hover:text-accent-DEFAULT transition-colors">
                {record.intentLabel}
              </span>
              
              {/* Clip indicator */}
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-xs text-text-muted">
                  {record.clipId}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      
      {timeline.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center py-8"
        >
          <div className="w-12 h-12 rounded-full bg-primary-surface flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-text-secondary">暂无历史记录</p>
          <p className="text-xs text-text-muted mt-1">应用一个意图开始创作</p>
        </motion.div>
      )}
    </div>
  )
}
