"use client"

import { AboutSection } from "@/components/about-section"
import { ResumeSection } from "@/components/resume-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section-new"
import type { PersonalInfo } from "@/lib/sanity.types"

interface MainContentProps {
  profileInfo: PersonalInfo | null
  activeSection: string
  aboutData: any
  resumeData: any
  certifications: any
  projects: any[]
  labs: any[]
  blogPosts: any[]
  blogTags: string[]
}

export function MainContent({
  profileInfo,
  activeSection,
  aboutData,
  resumeData,
  certifications,
  projects,
  labs,
  blogPosts,
  blogTags,
}: MainContentProps) {
  // About section renders its own cards, so no wrapper needed
  if (activeSection === "about") {
    return (
      <main className="flex-1 mt-20 w-full">
        <AboutSection data={aboutData} profileData={profileInfo} />
      </main>
    )
  }

  // Other sections use the card wrapper
  return (
    <main className="flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden mt-18 w-full">
      <div className="p-4 sm:p-5 md:p-6 lg:p-8">
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
