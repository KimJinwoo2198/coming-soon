import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reporch | 혁신적인 개발 도구 Coming Soon',
  description: 'Reporch는 혁신적인 플랫폼으로 곧 출시됩니다!',
  alternates: { canonical: 'https://reporch.com' },
  keywords: ['소프트웨어 개발', '개발 도구', '프로그래밍', 'Reporch', '개발 생산성'],
  openGraph: {
    title: 'Reporch | Coming Soon',
    description: 'Reporch는 혁신적인 플랫폼으로 곧 출시됩니다!',
    type: 'website',
    locale: 'ko_KR',
    images: [
      { url: 'https://reporch.com/logo.png', width: 1200, height: 630, alt: 'Reporch Logo', type: 'image/png' },
    ],
    siteName: 'Reporch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reporch | Coming Soon',
    description: 'Reporch는 혁신적인 플랫폼으로 곧 출시됩니다!',
    images: ['https://reporch.com/logo.png'],
    creator: '@REPORCH',
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
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
  },
  manifest: '/favicons/site.webmanifest',
};

const googleTagManager = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SVQ7VGCKS6');
`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Reporch",
  "url": "https://reporch.com",
  "logo": "https://reporch.com/logo.png",
  "description": "혁신적인 플랫폼 Coming Soon",
  "foundingDate": "2024-12-04",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+82-10-2198-4966",
    "contactType": "Customer Service",
    "email": "contact@reporch.com",
  },
  "sameAs": ["https://twitter.com/Reporch", "https://github.com/Reporch"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Syncopate:wght@400;700&family=Rajdhani:wght@300;400;500&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Syncopate:wght@400;700&family=Rajdhani:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
        </noscript>

        {/* SEO */}
        <meta name="theme-color" content="#1a2b34" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="sitemap" content="https://reporch.com/sitemap.xml" />

        {/* Scripts */}
        <script defer src="https://www.googletagmanager.com/gtag/js?id=G-SVQ7VGCKS6"></script>
        <script defer dangerouslySetInnerHTML={{ __html: googleTagManager }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
