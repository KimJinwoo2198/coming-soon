import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reporch | Coming Soon',
  description: 'Launching Soon: Reporch',
  metadataBase: new URL('https://reporch.com'),
  keywords: ['software development', 'dev tools', 'programming', 'Reporch', '소프트웨어 개발'],
  authors: [{ name: 'Reporch' }],
  generator: 'Next.js',
  applicationName: 'Reporch',
  referrer: 'origin-when-cross-origin',
  creator: 'Reporch',
  publisher: 'Reporch',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://reporch.com',
  },
  openGraph: {
    title: 'Reporch | Coming Soon', 
    description: 'Launching Soon: Reporch',
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Reporch Logo',
        type: 'image/png',
      }
    ],
    siteName: 'Reporch',
    url: 'https://reporch.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reporch',
    description: 'Launching Soon: Reporch',
    images: ['/logo.png'],
    creator: '@REPORCH',
    site: '@REPORCH',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
    nocache: true,
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
    <html lang="ko">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Syncopate:wght@400;700&family=Rajdhani:wght@300;400;500&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#1a2b34" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SVQ7VGCKS6"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SVQ7VGCKS6');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Reporch",
              "url": "https://reporch.com",
              "logo": "https://reporch.com/logo.png",
              "description": "Coming Soon",
              "sameAs": [
                "https://twitter.com/Reporch",
                "https://github.com/Reporch"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
