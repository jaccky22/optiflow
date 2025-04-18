"use client"

import { useEffect, useState } from "react"

// Declare global AdSense type
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  adSlot: string
  adClient: string
  adFormat?: string
  adWidth?: number
  adHeight?: number
  className?: string
}

export function AdSense({
  adSlot,
  adClient,
  adFormat = "auto",
  adWidth = 300,
  adHeight = 250,
  className = "",
}: AdSenseProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      // Load the Google AdSense script if it hasn't been loaded yet
      if (!window.adsbygoogle) {
        const script = document.createElement("script")
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + adClient
        script.async = true
        script.crossOrigin = "anonymous"
        script.onload = () => {
          setLoading(false)
        }
        script.onerror = () => {
          setError(true)
          setLoading(false)
        }
        document.head.appendChild(script)
      } else {
        setLoading(false)
      }
    } catch (err) {
      setError(true)
      setLoading(false)
      console.error("Error loading AdSense script:", err)
    }
  }, [])
  
  // Initialize the ad after the component mounts and when loading is complete
  useEffect(() => {
    if (!loading && !error && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("Error initializing AdSense ad:", err);
      }
    }
  }, [loading, error])

  if (loading) {
    return (
      <div className={`adsense-container ${className} flex items-center justify-center`}>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg h-24 w-full max-w-[300px]" />
      </div>
    )
  }

  if (error) {
    return null
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className={`adsbygoogle block w-full`}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        style={{ minHeight: adHeight + 'px' }} // Minimum height needed for proper rendering
      ></ins>
    </div>
  )
}