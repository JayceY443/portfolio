import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'

const sourceHanSans = localFont({
  src: [
    {
      path: '../../public/fonts/SourceHanSansSC-Bold.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SourceHanSansSC-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SourceHanSansSC-Light.otf',
      weight: '300',
      style: 'normal'
    },
  ],
  variable: '--font-source-han-sans',
  display: 'swap'
})

const SourceHanSerif = localFont({
  src: [
    {
      path: '../../public/fonts/SourceHanSerifCN-ExtraLight.otf',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SourceHanSerifCN-Medium.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SourceHanSerifCN-Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SourceHanSerifCN-Heavy.otf',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SourceHanSerifCN-SemiBold.otf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SourceHanSerifCN-Bold.otf',
      weight: '700',
      style: 'normal'
    },
  ],
  variable: '--font-source-han-serif',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Jayce Yang’s Portfolio',
  description: 'Jayce Yang’s Portfolio',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="preload" 
          as="image" 
          href="https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250709-160132.jpeg" 
        />
        <link 
          rel="preload" 
          as="font" 
          type="font/woff2" 
          href="https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//SourceHanSansSC-Light.woff2" 
        />
        <link 
          rel="preload" 
          as="image" 
          href="https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250710-134107.jpeg" 
        />
      </head>
      <body
        className={`${sourceHanSans.variable} ${SourceHanSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
