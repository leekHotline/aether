'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import TextReveal from '@/components/animations/TextReveal'
import FadeIn from '@/components/animations/FadeIn'
import CountUp from '@/components/animations/CountUp'
import ParallaxSection from '@/components/animations/ParallaxSection'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import GlassCard from '@/components/ui/GlassCard'
import RippleButton from '@/components/ui/RippleButton'
import ScrollProgress from '@/components/animations/ScrollProgress'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    // GSAP scroll animations
    const ctx = gsap.context(() => {
      // Parallax background orbs
      gsap.to('.orb-1', {
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
      
      gsap.to('.orb-2', {
        y: -150,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      <ScrollProgress />
      
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient orbs */}
          <div className="orb-1 absolute top-20 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-accent-soft to-transparent blur-3xl opacity-60" />
          <div className="orb-2 absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-purple-100 to-transparent blur-3xl opacity-40" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-soft border border-accent-DEFAULT/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-DEFAULT animate-pulse" />
              <span className="text-sm font-medium text-accent-DEFAULT">世界模型驱动的游戏 IDE</span>
            </div>
          </FadeIn>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-hero font-bold text-text-DEFAULT mb-6 tracking-tight">
            <TextReveal text="Write." delay={0.4} splitBy="char" />
            <br />
            <span className="text-gradient">
              <TextReveal text="World Reacts." delay={0.8} splitBy="char" />
            </span>
          </h1>

          {/* Subtitle */}
          <FadeIn delay={1.2} blur>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              用文字重塑现实，让想象力成为引擎。
              <br className="hidden md:block" />
              写下你的故事，世界即刻响应。
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={1.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-text-muted">向下滚动</span>
            <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.section>

      {/* Feature Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-title font-bold text-text-DEFAULT mb-4">
                范式转移
              </h2>
              <p className="text-lg text-text-secondary max-w-xl mx-auto">
                从脚本世界到计算世界，游戏开发的未来已来
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {[
              {
                icon: '📜',
                title: '传统方式',
                description: '编写复杂脚本，手动调参，漫长的迭代周期',
                muted: true,
              },
              {
                icon: '🌌',
                title: 'Aether 方式',
                description: '用自然语言描述意图，世界模型自动推演，实时响应',
                accent: true,
              },
              {
                icon: '✨',
                title: '创意优先',
                description: '专注于故事和体验，让技术服务于想象力',
              },
            ].map((feature, index) => (
              <StaggerItem key={feature.title}>
                <GlassCard 
                  className={`p-8 h-full ${feature.muted ? 'opacity-60' : ''} ${feature.accent ? 'border-accent-DEFAULT/30 shadow-glow' : ''}`}
                  tilt
                >
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-text-DEFAULT mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-primary-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: 800, suffix: 'ms', prefix: '<', label: '响应延迟' },
              { value: 99.9, suffix: '%', label: '可用率' },
              { value: 3, suffix: '+', label: '种子世界' },
            ].map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-text-DEFAULT mb-2">
                    <CountUp 
                      value={stat.value} 
                      prefix={stat.prefix} 
                      suffix={stat.suffix}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  </div>
                  <p className="text-text-secondary">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-title font-bold text-text-DEFAULT mb-4">
                如何运作
              </h2>
              <p className="text-lg text-text-secondary max-w-xl mx-auto">
                三步开启你的创作之旅
              </p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
            
            <StaggerContainer className="grid md:grid-cols-3 gap-12" staggerDelay={0.2}>
              {[
                {
                  step: '01',
                  title: '选择世界',
                  description: '从种子世界库中选择一个起点，或创建全新的世界',
                },
                {
                  step: '02',
                  title: '书写意图',
                  description: '用自然语言描述你想要的变化，比如"引力消失了"',
                },
                {
                  step: '03',
                  title: '见证变化',
                  description: '世界模型理解你的意图，实时生成对应的物理变化',
                },
              ].map((item, index) => (
                <StaggerItem key={item.step}>
                  <div className="relative text-center">
                    {/* Step number */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-accent-DEFAULT text-accent-DEFAULT font-bold text-xl flex items-center justify-center mx-auto mb-6 shadow-soft">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-text-DEFAULT mb-3">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <GlassCard className="p-12 md:p-16 text-center" glow>
              <h2 className="text-3xl md:text-4xl font-bold text-text-DEFAULT mb-4">
                准备好开始了吗？
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
                加入 Aether，用文字创造属于你的世界
              </p>
              <Link href="/worlds">
                <RippleButton variant="primary" size="lg">
                  立即开始
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </RippleButton>
              </Link>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-DEFAULT to-accent-glow flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-text-secondary">Aether © 2024</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <Link href="/docs" className="text-text-secondary hover:text-text-DEFAULT transition-colors link-underline">
              文档
            </Link>
            <a href="#" className="text-text-secondary hover:text-text-DEFAULT transition-colors link-underline">
              Twitter
            </a>
            <a href="#" className="text-text-secondary hover:text-text-DEFAULT transition-colors link-underline">
              Discord
            </a>
            <a href="#" className="text-text-secondary hover:text-text-DEFAULT transition-colors link-underline">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
