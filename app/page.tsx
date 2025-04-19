// Move the 'use client' directive to the top of the file
// is already at the top of the file, so no change is needed

"use client"

import { HeroSection } from "@/components/hero-section"
import { PlatformTabs } from "@/components/platform-tabs"
import { FeatureHighlights } from "@/components/feature-highlights"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { AdSense } from "@/components/adsense/AdSense"
import BlogLandingPreview from "@/components/BlogLandingPreview"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      
      {/* Ad after hero */}
      <AdSense
        adClient="ca-pub-5760370419762495"
        adSlot="4855988487"
        adFormat="auto"
        className="mb-8"
      />

      <div className="container px-4 py-8 md:py-12 lg:py-16 max-w-7xl mx-auto">
        <PlatformTabs />
      </div>

      {/* Ad after platform tools */}
      <AdSense
        adClient="ca-pub-5760370419762495"
        adSlot="6532655284"
        adFormat="auto"
        className="mb-8"
      />

      <FeatureHighlights />
      <BlogLandingPreview />
      <Testimonials />
      <CTASection />
    </div>
  )
}