"use client"

import { AboutSection } from "@/components/about-section"
import { ResumeSection } from "@/components/resume-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section-new"

interface MainContentProps {
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
  activeSection,
  aboutData,
  resumeData,
  certifications,
  projects,
  labs,
  blogPosts,
  blogTags,
}: MainContentProps) {
  return (
    <main className="flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden">
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
