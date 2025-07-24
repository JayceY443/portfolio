'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const OAuthHandlerInner = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code) {
      return
    }

    console.log('OAuth code detected, letting Supabase handle automatically')
    
    const url = new URL(window.location.href)
    url.searchParams.delete('code')
    url.searchParams.delete('state')
    router.replace(url.pathname)
  }, [searchParams, router])

  return null
}

const OAuthHandler = () => {
  return (
    <Suspense fallback={null}>
      <OAuthHandlerInner />
    </Suspense>
  )
}

export default OAuthHandler