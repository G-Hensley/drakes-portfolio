"use client"

import { Nav } from "@/components/layout/Nav"
import { AboutSection } from "@/components/about-section"
import { ResumeSection } from "@/components/resume-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section-new"
import type { PersonalInfo } from "@/lib/sanity.types"

interface PageContentProps {
  personalInfo: PersonalInfo
  aboutData: any
  resumeData: any
  certifications: any
  projects: any[]
  labs: any[]
  blogPosts: any[]
  blogTags: string[]
}

export function PageContent({
  personalInfo,
  aboutData,
  resumeData,
  certifications,
  projects,
  labs,
  blogPosts,
  blogTags,
}: PageContentProps) {
  return (
    <>
      <Nav personalInfo={personalInfo} />

      <main className="flex-1 mt-16 w-full flex flex-col gap-6 md:gap-8">
        {/* About Section - includes profile card */}
        <section id="about">
          <AboutSection
            data={aboutData}
            profileData={personalInfo}
            showProfile={true}
            showSkills={false}
          />
        </section>

        {/* Resume Section - includes skills/technologies */}
        <section id="resume" className="glass glass-hover rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
          <ResumeSection
            data={resumeData}
            certifications={certifications}
            skills={aboutData?.skills}
            technologies={aboutData?.technologies}
          />
        </section>

        {/* Portfolio Preview - limited to 3 */}
        <section id="portfolio" className="glass glass-hover rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
          <PortfolioSection
            projects={projects || []}
            labs={labs || []}
            limit={3}
            showViewAll={true}
          />
        </section>

        {/* Blog Preview - limited to 3 */}
        <section id="blog" className="glass glass-hover rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
          <BlogSection
            posts={blogPosts.slice(0, 3)}
            tags={blogTags}
          />
        </section>

        {/* Contact Section */}
        <section id="contact" className="glass glass-hover rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
          <ContactSection />
        </section>
      </main>
    </>
  )
}
