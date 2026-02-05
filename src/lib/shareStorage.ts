import { SharedWorld } from '@/types'

const STORAGE_KEY = 'aether_shared_worlds'

export function saveSharedWorld(world: SharedWorld): void {
  if (typeof window === 'undefined') return
  
  const existing = getSharedWorlds()
  existing[world.shareId] = world
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
}

export function getSharedWorld(shareId: string): SharedWorld | null {
  if (typeof window === 'undefined') return null
  
  const worlds = getSharedWorlds()
  return worlds[shareId] || null
}

export function getSharedWorlds(): Record<string, SharedWorld> {
  if (typeof window === 'undefined') return {}
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

export function generateShareId(): string {
  return Math.random().toString(36).substring(2, 10)
}
