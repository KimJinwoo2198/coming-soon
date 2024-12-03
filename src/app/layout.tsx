import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'Interactive Coming Soon Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Syncopate:wght@400;700&family=Rajdhani:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}