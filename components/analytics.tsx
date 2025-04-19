"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This would be replaced with your actual analytics implementation
    // For example, Google Analytics, Plausible, Fathom, etc.
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Example analytics call
    console.log(`Page view: ${url}`)

    // In a real implementation, you would call your analytics service here
    // Example: gtag('config', 'GA-MEASUREMENT-ID', { page_path: url })
  }, [pathname, searchParams])

  return null
}
