import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loading...',
}

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse">
        <h1 className="text-4xl font-bold mb-6">Loading...</h1>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  )
}