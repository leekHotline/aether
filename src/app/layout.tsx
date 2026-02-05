import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Aether - World Model Driven Game IDE',
  description: 'Write → World Reacts. The future of game development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-aether-bg text-aether-text antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
