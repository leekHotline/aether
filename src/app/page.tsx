'use client'

import dynamic from 'next/dynamic'

// Dynamically import to avoid SSR issues with GSAP
const HeroSection = dynamic(
  () => import('@/components/sections/HeroSection'),
  { ssr: false }
)

export default function LandingPage() {
  return <HeroSection />
}
