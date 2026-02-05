import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { ProblemSolutionSection } from "@/components/sections/problem-solution-section"
import { ComponentVisualizerSection } from "@/components/sections/component-visualizer-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"

import { SpecsSection } from "@/components/sections/specs-section"
import { FAQSection } from "@/components/sections/faq-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FooterSection } from "@/components/sections/footer-section"

export default function VisionAssistLanding() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Saltar al contenido principal
      </a>
      
      <Navigation />
      
      <main id="main-content">
        <HeroSection />
        <ProblemSolutionSection />
        <ComponentVisualizerSection />
        <HowItWorksSection />
        <SpecsSection />
        <FAQSection />
        <ContactSection />
      </main>
      
      <FooterSection />
    </>
  )
}
