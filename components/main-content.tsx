"use client"

import { useState } from "react"
import { AboutSection } from "@/components/about-section"
import { ResumeSection } from "@/components/resume-section"
import { PortfolioWrapper } from "@/components/portfolio-wrapper"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section-new"
import { Suspense } from "react"

export function MainContent() {
  const [activeSection, setActiveSection] = useState("about")

  return (
    <main className="flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden">
      {/* Navigation */}
      <nav className="flex gap-1 sm:gap-2 md:gap-4 p-3 sm:p-4 md:p-6 border-b border-border overflow-x-auto scrollbar-hide">
        {["about", "resume", "portfolio", "blog", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap flex-shrink-0 ${
              activeSection === section
                ? "text-foreground bg-accent/10"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {section}
          </button>
        ))}
      </nav>

      <div className="p-4 sm:p-5 md:p-6 lg:p-8">
        {activeSection === "about" && (
          <Suspense fallback={<SectionSkeleton />}>
            <AboutSection />
          </Suspense>
        )}
        {activeSection === "resume" && (
          <Suspense fallback={<SectionSkeleton />}>
            <ResumeSection />
          </Suspense>
        )}
        {activeSection === "portfolio" && (
          <Suspense fallback={<SectionSkeleton />}>
            <PortfolioWrapper />
          </Suspense>
        )}
        {activeSection === "blog" && (
          <Suspense fallback={<SectionSkeleton />}>
            <BlogSection />
          </Suspense>
        )}
        {activeSection === "contact" && <ContactSection />}
      </div>
    </main>
  )
}

function SectionSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-secondary rounded" />
      <div className="h-4 w-full bg-secondary rounded" />
      <div className="h-4 w-3/4 bg-secondary rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-secondary rounded-xl" />
        ))}
      </div>
    </div>
  )
}
