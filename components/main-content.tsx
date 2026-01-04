"use client"

import { useState } from "react"
import { AboutSection } from "@/components/about-section"
import { ResumeSection } from "@/components/resume-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section-new"

interface MainContentProps {
  aboutData: any
  resumeData: any
  certifications: any
  projects: any[]
  labs: any[]
  blogPosts: any[]
  blogTags: string[]
}

export function MainContent({
  aboutData,
  resumeData,
  certifications,
  projects,
  labs,
  blogPosts,
  blogTags,
}: MainContentProps) {
  const [activeSection, setActiveSection] = useState("about")

  return (
    <main className="flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden">
      {/* Navigation */}
      <nav className="flex gap-1 sm:gap-2 md:gap-4 p-3 sm:p-4 md:p-6 border-b border-border overflow-x-auto scrollbar-hide">
        {["about", "resume", "portfolio", "blog", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
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
        {activeSection === "about" && <AboutSection data={aboutData} />}
        {activeSection === "resume" && (
          <ResumeSection data={resumeData} certifications={certifications} />
        )}
        {activeSection === "portfolio" && (
          <PortfolioSection projects={projects || []} labs={labs || []} />
        )}
        {activeSection === "blog" && (
          <BlogSection posts={blogPosts} tags={blogTags} />
        )}
        {activeSection === "contact" && <ContactSection />}
      </div>
    </main>
  )
}
