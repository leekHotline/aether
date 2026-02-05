'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import RippleButton from '@/components/ui/RippleButton'

interface HeaderProps {
  showNav?: boolean
  variant?: 'default' | 'transparent'
}

export default function Header({ showNav = true, variant = 'default' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    variant === 'transparent' 
      ? ['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)'] 
      : ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.95)']
  )
  
  const headerBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ backgroundColor: headerBg, backdropFilter: headerBlur }}
      className={`
        fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6
        transition-shadow duration-300
        ${scrolled ? 'shadow-soft border-b border-border' : 'border-b border-transparent'}
      `}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-DEFAULT to-accent-glow flex items-center justify-center shadow-glow"
        >
          <span className="text-white font-bold text-xl">A</span>
        </motion.div>
        <motion.span 
          className="text-xl font-semibold text-text-DEFAULT"
          whileHover={{ x: 3 }}
        >
          Aether
          <span className="text-accent-DEFAULT">灵境</span>
        </motion.span>
      </Link>
      
      {/* Navigation */}
      {showNav && (
        <nav className="flex items-center gap-8">
          <NavLink href="/worlds">Worlds</NavLink>
          <NavLink href="/docs">Docs</NavLink>
          <RippleButton variant="primary" size="sm">
            <Link href="/worlds">Launch Editor</Link>
          </RippleButton>
        </nav>
      )}
    </motion.header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group px-3 py-2 rounded-lg hover:bg-primary-surface transition-colors">
      <span className="text-sm font-medium text-text-DEFAULT group-hover:text-accent-DEFAULT transition-colors">
        {children}
      </span>
    </Link>
  )
}
