import { HeroSection } from "@/components/hero-section"
import { PlatformTabs } from "@/components/platform-tabs"
import { FeatureHighlights } from "@/components/feature-highlights"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <div className="container px-4 py-8 md:py-12 lg:py-16 max-w-7xl mx-auto">
        <PlatformTabs />
      </div>
      <FeatureHighlights />
      <Testimonials />
      <CTASection />
    </div>
  )
}