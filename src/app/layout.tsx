import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'REPORCH | Coming Soon',
  description: 'Launching Soon: REPORCH - Building Revolutionary Developer Tools',
  metadataBase: new URL('https://reporch.com'),
  openGraph: {
    title: 'REPORCH | Coming Soon', 
    description: 'Launching Soon: REPORCH - Building Revolutionary Developer Tools',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'REPORCH Logo',
      }
    ],
    siteName: 'REPORCH',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    }
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: '48x48' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicons/safari-pinned-tab.svg',
        color: '#1a2b34'
      }
    ]
  },
  manifest: '/favicons/site.webmanifest'
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