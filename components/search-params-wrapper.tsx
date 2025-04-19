"use client"

import { useSearchParams } from "next/navigation"
import { type ReactNode, Suspense } from "react"

interface SearchParamsWrapperProps {
  children: (searchParams: URLSearchParams) => ReactNode
  fallback?: ReactNode
}

export function SearchParamsWrapper({ children, fallback = null }: SearchParamsWrapperProps) {
  const searchParams = useSearchParams()
  return <>{children(searchParams)}</>
}

export function SearchParamsSuspenseWrapper({ children, fallback = null }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      <SearchParamsWrapper>{children}</SearchParamsWrapper>
    </Suspense>
  )
}
