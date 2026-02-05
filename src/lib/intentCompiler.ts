import { CompiledIntent } from '@/types'

// Keyword mappings (Chinese + English)
const GRAVITY_KEYWORDS = [
  'gravity', 'gravit', '引力', '失重', '重力', '漂浮', 'float', 'floating',
  'levitate', 'levitation', '悬浮', 'weightless', '无重力', 'zero-g'
]

const SWORD_KEYWORDS = [
  'sword', '长剑', '剑气', '斩击', 'slash', 'blade', '刀', '剑',
  'strike', 'attack', '攻击', '砍', 'cut', 'slice', '武器', 'weapon'
]

function normalizeText(text: string): string {
  return text.toLowerCase().trim()
}

function containsKeyword(text: string, keywords: string[]): boolean {
  const normalized = normalizeText(text)
  return keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))
}

/**
 * Compile narrative intent to clip selection
 * Uses deterministic keyword matching (no AI/LLM dependency)
 */
export function compileIntent(text: string): CompiledIntent {
  // Check for gravity-related keywords
  if (containsKeyword(text, GRAVITY_KEYWORDS)) {
    return {
      clipId: 'gravity_off',
      anchorsUpdated: ['GravityField', 'PhysicsEngine'],
      intentLabel: 'Gravity Disabled',
    }
  }

  // Check for sword/combat keywords
  if (containsKeyword(text, SWORD_KEYWORDS)) {
    return {
      clipId: 'sword_slash',
      anchorsUpdated: ['WeaponImpulse', 'CombatSystem'],
      intentLabel: 'Sword Activated',
    }
  }

  // Default: return to baseline
  return {
    clipId: 'baseline',
    anchorsUpdated: [],
    intentLabel: 'Baseline',
  }
}
