'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import clsx from 'clsx'

import FadeIn from '@/components/animations/FadeIn'
import TextReveal from '@/components/animations/TextReveal'
import RippleButton from '@/components/ui/RippleButton'
import GlassCard from '@/components/ui/GlassCard'

// 动态加载重型组件
const MultiverseCanvas = dynamic(() => import('@/components/multiverse-3d/MultiverseCanvas'), { ssr: false })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// 价值阐释卡片数据
const VALUE_CARDS = [
  {
    step: '01',
    title: 'Write',
    subtitle: '写下意图',
    description: '用自然语言描述你想要的世界变化',
    icon: '✍️',
  },
  {
    step: '02',
    title: 'Compile',
    subtitle: '编译规则',
    description: 'AI 将意图转化为世界规则变更',
    icon: '⚙️',
  },
  {
    step: '03',
    title: 'React',
    subtitle: '世界响应',
    description: '物理引擎实时渲染新的世界状态',
    icon: '🌍',
  },
]

export default function HeroSectionV2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const stepperRef = useRef<HTMLDivElement>(null)
  const lineProgressRef = useRef<HTMLDivElement>(null)
  const lineTrackRef = useRef<HTMLDivElement>(null)
  const lineGlowRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景光晕随滚动漂移
      gsap.to('.glow-orb', {
        y: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!stepperRef.current) return

    const mm = ScrollTrigger.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const steps = VALUE_CARDS.length
      let lineWidth = 0

      const updateMetrics = () => {
        lineWidth = lineTrackRef.current?.getBoundingClientRect().width ?? 0
      }

      updateMetrics()
      ScrollTrigger.addEventListener('refreshInit', updateMetrics)

      const setProgress = lineProgressRef.current ? gsap.quickSetter(lineProgressRef.current, 'scaleX') : null
      const setGlowX = lineGlowRef.current ? gsap.quickSetter(lineGlowRef.current, 'x') : null

      const trigger = ScrollTrigger.create({
        trigger: stepperRef.current,
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: true,
        onUpdate: (self) => {
          const progress = Math.max(0, Math.min(1, self.progress))
          if (setProgress) setProgress(Math.max(0.04, progress))
          if (setGlowX) setGlowX(progress * lineWidth)

          const nextIndex = Math.min(steps - 1, Math.floor(progress * steps + 0.0001))
          setActiveStep((prev) => (prev === nextIndex ? prev : nextIndex))
        },
      })

      return () => {
        trigger.kill()
        ScrollTrigger.removeEventListener('refreshInit', updateMetrics)
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900">
      {/* 背景光晕 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="glow-orb absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/10 blur-3xl" />
        <div className="glow-orb absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/15 to-pink-600/5 blur-3xl" />
      </div>

      {/* Hero 区域 */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center z-10"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：标题与 CTA */}
          <div className="space-y-8">
            {/* Badge */}
            <FadeIn delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-sm font-medium text-indigo-300">世界模型驱动的游戏 IDE</span>
              </div>
            </FadeIn>

            {/* 主标题 */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              <TextReveal text="Write." delay={0.4} splitBy="char" />
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                <TextReveal text="World Reacts." delay={0.8} splitBy="char" />
              </span>
            </h1>

            {/* 副标题 */}
            <FadeIn delay={1.2} blur>
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                一句话改变世界规则。
                <br />
                写下你的意图，物理引擎即刻响应。
              </p>
            </FadeIn>

            {/* CTA 按钮 */}
            <FadeIn delay={1.5}>
              <div className="flex flex-wrap gap-4">
                <Link href="/worlds">
                  <RippleButton variant="primary" size="lg">
                    开始创作
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </RippleButton>
                </Link>
                <Link href="/editor/gravity-escape">
                  <RippleButton variant="secondary" size="lg">
                    观看演示
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </RippleButton>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* 右侧：3D 多元宇宙星球 */}
          <FadeIn delay={0.6} direction="right">
            <div className="relative h-[450px] lg:h-[550px]">
              <MultiverseCanvas />
            </div>
          </FadeIn>
        </div>

        {/* 滚动提示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400">向下滚动</span>
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.section>

      {/* 价值阐释区 */}
      <section ref={stepperRef} className="relative z-10 py-28 px-6 bg-white">
        {/* 背景柔光 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-purple-100/60 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              三步，重塑世界
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              从意图到现实，无需代码，只需文字
            </p>
          </FadeIn>

          <div className="relative">
            {/* 连接线 */}
            <div
              ref={lineTrackRef}
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-[90%] -translate-x-1/2 -translate-y-1/2 bg-slate-200/70 md:block"
            >
              <div
                ref={lineProgressRef}
                className="relative h-full w-full origin-left scale-x-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
              >
                <span className="absolute inset-0 opacity-70 blur-[1px] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.8),transparent)] bg-[length:200%_100%] animate-[line-shine_2.8s_linear_infinite]" />
              </div>
              <div
                ref={lineGlowRef}
                className="absolute -top-2 h-5 w-24 rounded-full bg-white/70 blur-xl opacity-80"
              />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden w-[90%] -translate-x-1/2 -translate-y-1/2 md:flex items-center justify-between">
              {VALUE_CARDS.map((card, i) => {
                const isActive = activeStep === i
                const isDone = activeStep > i
                return (
                  <div
                    key={`${card.step}-dot`}
                    className={clsx(
                      'h-3 w-3 rounded-full border border-white/80 shadow-sm transition-all duration-500',
                      isActive && 'scale-125 bg-indigo-500 shadow-[0_0_14px_rgba(99,102,241,0.65)]',
                      isDone && 'bg-indigo-300',
                      !isActive && !isDone && 'bg-white'
                    )}
                  />
                )
              })}
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {VALUE_CARDS.map((card, i) => {
                const isActive = activeStep === i
                const isDone = activeStep > i

                return (
                  <motion.div
                    key={card.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <GlassCard
                      tilt
                      className={clsx(
                        'group h-full p-6 transition-all duration-500',
                        isActive && 'ring-1 ring-indigo-200/80 shadow-xl',
                        !isActive && 'shadow-sm',
                        isDone && 'opacity-90'
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={clsx(
                            'flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-white/70 text-2xl shadow-sm transition-all duration-500',
                            isActive && 'bg-indigo-50 text-indigo-600 shadow-md',
                            !isActive && 'text-slate-600'
                          )}
                        >
                          {card.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={clsx(
                                'text-xs font-mono px-2 py-0.5 rounded',
                                isActive ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 bg-gray-100'
                              )}
                            >
                              {card.step}
                            </span>
                            <span className="text-xs text-gray-400">{card.subtitle}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>

                          <div
                            className={clsx(
                              'mt-5 h-1 w-full overflow-hidden rounded-full bg-slate-100',
                              isActive && 'bg-indigo-100/70'
                            )}
                          >
                            <div
                              className={clsx(
                                'h-full w-1/3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500',
                                isActive && 'w-2/3',
                                isDone && 'w-full'
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="relative z-10 py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              准备好改变世界了吗？
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              进入编辑器，体验「写一句话改变世界」的魔法
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/worlds">
                <RippleButton variant="primary" size="lg">
                  进入世界
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </RippleButton>
              </Link>
              <Link href="/docs">
                <RippleButton variant="secondary" size="lg">
                  阅读文档
                </RippleButton>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-gray-900">Aether<span className="text-indigo-500">灵境</span></span>
          </div>
          <p className="text-sm text-gray-500">
            © 2026 Aether. World Model Driven Game IDE.
          </p>
        </div>
      </footer>
    </div>
  )
}
