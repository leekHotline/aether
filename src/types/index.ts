// World Seed Types
export interface Clip {
  id: string
  label: string
  videoUrl: string
  description?: string
}

export interface WorldSeed {
  id: string
  name: string
  description: string
  style: 'cyber-zen' | 'noir' | 'cartoon' | 'sci-fi' | 'fantasy'
  coverImage: string
  clips: Clip[]
  defaultClipId: string
}

// Editor Session Types
export interface IntentRecord {
  id: string
  version: number
  text: string
  intentLabel: string
  clipId: string
  anchorsUpdated: string[]
  timestamp: number
}

export interface EditorSession {
  worldId: string
  currentClipId: string
  timeline: IntentRecord[]
  narrativeText: string
}

// Intent Compiler Types
export interface CompiledIntent {
  clipId: string
  anchorsUpdated: string[]
  intentLabel: string
}

// Share Types
export interface SharedWorld {
  shareId: string
  worldId: string
  worldName: string
  finalClipId: string
  timeline: IntentRecord[]
  storySummary: string
  createdAt: number
}
