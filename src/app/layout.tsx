import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="zh">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-aether-bg text-aether-text antialiased">
        {children}
      </body>
    </html>
  )
}
