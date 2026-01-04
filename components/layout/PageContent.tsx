"use client"

import { useState } from "react"
import { Nav } from "@/components/layout/Nav"
import { MainContent } from "@/components/layout/main-content"

interface PageContentProps {
  aboutData: any
  resumeData: any
  certifications: any
  projects: any[]
  labs: any[]
  blogPosts: any[]
  blogTags: string[]
}

export function PageContent({
  aboutData,
  resumeData,
  certifications,
  projects,
  labs,
  blogPosts,
  blogTags,
}: PageContentProps) {
  const [activeSection, setActiveSection] = useState("about")

  return (
    <>
      <Nav activeSection={activeSection} onSectionChange={setActiveSection} />
      <MainContent
        activeSection={activeSection}
        aboutData={aboutData}
        resumeData={resumeData}
        certifications={certifications}
        projects={projects}
        labs={labs}
        blogPosts={blogPosts}
        blogTags={blogTags}
      />
    </>
  )
}
