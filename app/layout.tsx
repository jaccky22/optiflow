// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { SiteFooter } from '@/components/site-footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Optiflow - AI-Powered Video Content Optimization Tool',
  description: 'Optimize your video content with AI-powered title generation, description optimization, and hashtag suggestions for YouTube, TikTok, and X. Boost your views and engagement now.',
  keywords: 'video content optimization, AI video optimization, YouTube optimization, TikTok optimization, video SEO, content optimization tools, video marketing, social media optimization',
  authors: [{ name: 'Optiflow Team' }],
  creator: 'Optiflow Team',
  publisher: 'Optiflow',
  robots: 'index, follow',
  openGraph: {
    title: 'Optiflow - AI-Powered Video Content Optimization Tool',
    description: 'Optimize your video content with AI-powered title generation, description optimization, and hashtag suggestions for YouTube, TikTok, and X. Boost your views and engagement now.',
    url: 'https://optiflow.com',
    type: 'website',
    locale: 'en_US',
    siteName: 'Optiflow',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Optiflow - AI-Powered Video Content Optimization Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optiflow - AI-Powered Video Content Optimization Tool',
    description: 'Optimize your video content with AI-powered title generation, description optimization, and hashtag suggestions for YouTube, TikTok, and X. Boost your views and engagement now.',
    images: ['/images/twitter-card.png'],
  },
  alternates: {
    canonical: 'https://optiflow.com',
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5760370419762495"
          crossorigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        {/* Removed AdSense from the global layout to comply with AdSense policy */}
        <SiteFooter />
      </body>
    </html>
  )
}