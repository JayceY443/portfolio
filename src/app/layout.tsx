import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { ThemeProvider } from 'next-themes'
import OAuth from '@/components/auth/oauth-handler'

const SourceHanSerif = localFont({
  src: [
    {
      path: '../../public/fonts/subset/SourceHanSerifCN-Medium-subset.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/subset/SourceHanSerifCN-Bold-subset.woff2',
      weight: '700',
      style: 'normal'
    },
  ],
  variable: '--font-source-han-serif',
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: 'Jayce Yang\'s Portfolio',
  description: 'Jayce Yang\'s Portfolio',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link 
          rel="preload" 
          as="image" 
          href="https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250709-160132.jpeg" 
        />
        <link 
          rel="preload" 
          as="image" 
          href="https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250710-134107.jpeg" 
        />
      </head>
      <body
        className={`${SourceHanSerif.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <OAuth />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
