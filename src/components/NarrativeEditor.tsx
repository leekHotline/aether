'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
)

interface NarrativeEditorProps {
  value: string
  onChange: (value: string) => void
  onApplyIntent: () => void
}

export default function NarrativeEditor({
  value,
  onChange,
  onApplyIntent,
}: NarrativeEditorProps) {
  const handleEditorChange = (val: string | undefined) => {
    onChange(val || '')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Cmd/Ctrl + Enter to apply intent
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      onApplyIntent()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="h-full flex flex-col bg-white overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      {/* Editor header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary-surface/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-DEFAULT animate-pulse" />
          <span className="text-sm font-medium text-text-DEFAULT">叙事编辑器</span>
        </div>
        <span className="text-xs text-text-muted flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-white border border-border rounded text-text-secondary text-xs">⌘</kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-border rounded text-text-secondary text-xs">↵</kbd>
          <span className="ml-1 text-text-muted">应用</span>
        </span>
      </div>
      
      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          language="markdown"
          theme="vs"
          value={value}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            lineNumbers: 'off',
            folding: false,
            wordWrap: 'on',
            padding: { top: 20, bottom: 20 },
            scrollBeyondLastLine: false,
            renderLineHighlight: 'none',
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'hidden',
              verticalScrollbarSize: 6,
            },
          }}
        />
      </div>
      
      {/* Placeholder hint */}
      {!value && (
        <div className="absolute inset-x-4 top-16 pointer-events-none">
          <p className="text-sm text-text-muted italic">
            在这里输入你的叙事意图...
          </p>
          <p className="text-xs text-text-muted/60 mt-2">
            例如: &quot;天空开始下雨&quot; 或 &quot;重力消失了&quot;
          </p>
        </div>
      )}
    </motion.div>
  )
}
