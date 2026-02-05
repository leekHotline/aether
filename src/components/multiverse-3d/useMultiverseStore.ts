import { create } from 'zustand'
import type { WorldSphere } from './constants'

interface MultiverseState {
  activeWorld: WorldSphere | null
  hoveredWorld: string | null
  isCardOpen: boolean
  setActiveWorld: (world: WorldSphere | null) => void
  setHoveredWorld: (id: string | null) => void
  openCard: () => void
  closeCard: () => void
}

export const useMultiverseStore = create<MultiverseState>((set) => ({
  activeWorld: null,
  hoveredWorld: null,
  isCardOpen: false,
  setActiveWorld: (world) => set({ activeWorld: world }),
  setHoveredWorld: (id) => set({ hoveredWorld: id }),
  openCard: () => set({ isCardOpen: true }),
  closeCard: () => set({ isCardOpen: false, activeWorld: null }),
}))
