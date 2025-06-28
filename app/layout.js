import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StudyGraph - 学習時間を可視化',
  description: 'GitHubのcontributionsのように学習時間を可視化するアプリ。継続的な学習をサポートします。',
  keywords: ['学習', '勉強', '可視化', '継続', '習慣', 'GitHub', 'contributions'],
  authors: [{ name: 'StudyGraph Team' }],
  creator: 'StudyGraph',
  publisher: 'StudyGraph',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'StudyGraph - 学習時間を可視化',
    description: 'GitHubのcontributionsのように学習時間を可視化するアプリ',
    url: 'https://study-graph.vercel.app',
    siteName: 'StudyGraph',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StudyGraph',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyGraph - 学習時間を可視化',
    description: 'GitHubのcontributionsのように学習時間を可視化するアプリ',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}