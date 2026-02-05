'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import FadeIn from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import GlassCard from '@/components/ui/GlassCard'

const concepts = [
  {
    icon: '🌍',
    title: '世界 (World)',
    description: '一个可交互的游戏环境，包含场景、物理规则和视觉状态。',
  },
  {
    icon: '📝',
    title: '意图 (Intent)',
    description: '你用自然语言描述的想法，例如"引力消失了"或"一把剑出现"。',
  },
  {
    icon: '⚓',
    title: '锚点 (Anchor)',
    description: '世界中可以被意图影响的物理/逻辑节点，如重力场、武器系统等。',
  },
  {
    icon: '🎬',
    title: '片段 (Clip)',
    description: '世界的一个状态快照，当意图被应用时，世界会切换到对应的片段。',
  },
]

const steps = [
  { step: 1, text: '进入 Worlds 页面选择一个种子世界', link: '/worlds' },
  { step: 2, text: '在编辑器左侧输入你的叙事文本' },
  { step: 3, text: '按 Cmd/Ctrl + Enter 或点击应用意图' },
  { step: 4, text: '观看右侧世界的变化！' },
]

const faqs = [
  {
    question: '这是真正的 AI 推理吗？',
    answer: '当前 MVP 版本使用确定性关键词匹配来演示核心交互流程。真正的世界模型推理服务正在开发中。',
  },
  {
    question: '我可以创建自己的世界吗？',
    answer: '自定义世界创建功能即将推出。目前你可以使用我们提供的种子世界进行体验。',
  },
  {
    question: '分享功能是如何工作的？',
    answer: '点击 Share 按钮会生成一个唯一链接，他人可以通过这个链接查看你创作的世界状态。数据目前存储在本地 localStorage 中。',
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-primary-bg">
      <Header />
      
      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-24">
        <FadeIn>
          <h1 className="text-title font-bold text-text-DEFAULT mb-4">文档</h1>
          <p className="text-lg text-text-secondary mb-12">
            了解 Aether 的核心概念和使用方法
          </p>
        </FadeIn>
        
        {/* What is Aether */}
        <FadeIn delay={0.1} className="mb-16">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold text-text-DEFAULT mb-4">
              什么是 Aether？
            </h2>
            <p className="text-text-secondary leading-relaxed text-lg">
              Aether 是一个世界模型驱动的游戏 IDE，让你可以通过自然语言描述来驱动游戏世界的变化。
              写下你想要的场景，世界就会响应。
            </p>
          </GlassCard>
        </FadeIn>
        
        {/* Core concepts */}
        <FadeIn delay={0.2} className="mb-16">
          <h2 className="text-2xl font-semibold text-text-DEFAULT mb-6">核心概念</h2>
          <StaggerContainer className="grid md:grid-cols-2 gap-4">
            {concepts.map((concept) => (
              <StaggerItem key={concept.title}>
                <GlassCard tilt className="h-full">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{concept.icon}</span>
                    <div>
                      <h3 className="text-lg font-medium text-text-DEFAULT mb-2">
                        {concept.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {concept.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>
        
        {/* Quick start */}
        <FadeIn delay={0.3} className="mb-16">
          <h2 className="text-2xl font-semibold text-text-DEFAULT mb-6">快速开始</h2>
          <div className="space-y-4">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-accent-DEFAULT text-white flex items-center justify-center font-semibold shadow-glow">
                  {item.step}
                </div>
                <span className="text-text-DEFAULT">
                  {item.link ? (
                    <>
                      进入 <Link href={item.link} className="text-accent-DEFAULT hover:underline">Worlds</Link> 页面选择一个种子世界
                    </>
                  ) : (
                    item.text
                  )}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
        
        {/* FAQ */}
        <FadeIn delay={0.4}>
          <h2 className="text-2xl font-semibold text-text-DEFAULT mb-6">常见问题</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass rounded-xl border border-border overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer text-text-DEFAULT font-medium hover:bg-primary-surface/50 transition-colors">
                  {faq.question}
                  <svg
                    className="w-5 h-5 text-text-muted transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </FadeIn>
      </main>
    </div>
  )
}
