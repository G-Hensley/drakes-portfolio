import { Suspense } from "react"
import { ProfileSection, ThemeToggle, PageContent } from "@/components/layout"
import {
  getPersonalInfo,
  getAbout,
  getResume,
  getCertifications,
  getProjects,
  getBlogPosts,
  getBlogTags,
} from "@/lib/sanity.queries"

// Revalidate every hour
export const revalidate = 3600

export default async function Home() {
  const [personalInfo, aboutData, resumeData, certifications, projects, labs, blogPosts, blogTags] =
    await Promise.all([
      getPersonalInfo(),
      getAbout(),
      getResume(),
      getCertifications(),
      getProjects("project"),
      getProjects("lab"),
      getBlogPosts(6),
      getBlogTags(),
    ])

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-12">
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 items-center">
          <ProfileSection data={personalInfo} />

          <Suspense fallback={<MainContentSkeleton />}>
            <PageContent
              aboutData={aboutData}
              resumeData={resumeData}
              certifications={certifications}
              projects={projects}
              labs={labs}
              blogPosts={blogPosts}
              blogTags={blogTags}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function MainContentSkeleton() {
  return (
    <main className="flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="p-6 space-y-4">
        <div className="h-8 w-48 bg-secondary rounded" />
        <div className="h-4 w-full bg-secondary rounded" />
        <div className="h-4 w-3/4 bg-secondary rounded" />
      </div>
    </main>
  )
}
