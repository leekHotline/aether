'use client'

import dynamic from 'next/dynamic'

// 使用 V2 多元宇宙节点舞台 Hero
const HeroSectionV2 = dynamic(
  () => import('@/components/sections/HeroSectionV2'),
  { ssr: false }
)

export default function LandingPage() {
  return <HeroSectionV2 />
}
