import { describe, it, expect } from 'vitest'
import { compileIntent } from '@/lib/intentCompiler'

describe('Intent Compiler', () => {
  describe('gravity keywords', () => {
    it('should detect "gravity" keyword', () => {
      const result = compileIntent('The gravity suddenly disappeared')
      expect(result.clipId).toBe('gravity_off')
      expect(result.intentLabel).toBe('Gravity Disabled')
    })

    it('should detect Chinese "引力" keyword', () => {
      const result = compileIntent('突然，引力消失了……')
      expect(result.clipId).toBe('gravity_off')
    })

    it('should detect "失重" keyword', () => {
      const result = compileIntent('空间站进入失重状态')
      expect(result.clipId).toBe('gravity_off')
    })

    it('should detect "漂浮" keyword', () => {
      const result = compileIntent('所有物体开始漂浮')
      expect(result.clipId).toBe('gravity_off')
    })
  })

  describe('sword keywords', () => {
    it('should detect "sword" keyword', () => {
      const result = compileIntent('He drew his sword')
      expect(result.clipId).toBe('sword_slash')
      expect(result.intentLabel).toBe('Sword Activated')
    })

    it('should detect Chinese "长剑" keyword', () => {
      const result = compileIntent('他拔出了长剑')
      expect(result.clipId).toBe('sword_slash')
    })

    it('should detect "剑气" keyword', () => {
      const result = compileIntent('一道剑气划破天际')
      expect(result.clipId).toBe('sword_slash')
    })

    it('should detect "斩击" keyword', () => {
      const result = compileIntent('凌厉的斩击')
      expect(result.clipId).toBe('sword_slash')
    })
  })

  describe('default case', () => {
    it('should return baseline for unrecognized text', () => {
      const result = compileIntent('The sun was shining brightly')
      expect(result.clipId).toBe('baseline')
      expect(result.intentLabel).toBe('Baseline')
      expect(result.anchorsUpdated).toEqual([])
    })

    it('should return baseline for empty text', () => {
      const result = compileIntent('')
      expect(result.clipId).toBe('baseline')
    })
  })

  describe('anchors', () => {
    it('should include GravityField anchor for gravity intent', () => {
      const result = compileIntent('gravity off')
      expect(result.anchorsUpdated).toContain('GravityField')
    })

    it('should include WeaponImpulse anchor for sword intent', () => {
      const result = compileIntent('sword slash')
      expect(result.anchorsUpdated).toContain('WeaponImpulse')
    })
  })
})
