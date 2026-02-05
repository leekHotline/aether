'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import RippleButton from '@/components/ui/RippleButton'

interface EditorToolbarProps {
  worldName: string
  status: 'Mock' | 'Connected'
  latency?: number
  onShare: () => void
}

export default function EditorToolbar({
  worldName,
  status,
  latency = 42,
  onShare,
}: EditorToolbarProps) {
  return (
    <motion.header 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-14 flex items-center justify-between px-4 border-b border-border bg-white/80 backdrop-blur-md"
    >
      {/* Left: Logo + World name */}
      <div className="flex items-center gap-4">
        <Link href="/worlds" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-DEFAULT to-accent-glow flex items-center justify-center shadow-glow"
          >
            <span className="text-white font-bold text-sm">A</span>
          </motion.div>
        </Link>
        
        <div className="h-6 w-px bg-border" />
        
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-text-DEFAULT">{worldName}</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary-surface text-text-muted">编辑中</span>
        </div>
      </div>
      
      {/* Right: Status + Share */}
      <div className="flex items-center gap-4">
        {/* Status badge */}
        <motion.div 
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-border"
          whileHover={{ scale: 1.02 }}
        >
          <span className={`w-2 h-2 rounded-full ${status === 'Connected' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
          <span className="text-xs font-medium text-text-secondary">{status === 'Connected' ? '已连接' : '模拟模式'}</span>
          <span className="text-xs text-text-muted/60">|</span>
          <span className="text-xs font-mono text-text-muted">{latency}ms</span>
        </motion.div>
        
        {/* Share button */}
        <RippleButton variant="primary" size="sm" onClick={onShare}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          分享
        </RippleButton>
      </div>
    </motion.header>
  )
}
