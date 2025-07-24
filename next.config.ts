import type { NextConfig } from 'next'

const repo = process.env.GITHUB_ACTIONS ? '/portfolio' : ''

const nextConfig: NextConfig = {
  basePath: repo,
  assetPrefix: `${repo}/`,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rbrzxzkxabhaeiljimvy.storage.supabase.co',
      },
    ],
  },
}

export default nextConfig
