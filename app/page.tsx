import { Suspense } from "react"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { MainContent } from "@/components/main-content"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPersonalInfo } from "@/lib/sanity.queries"

export default async function Home() {
  const personalInfo = await getPersonalInfo()

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12">
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
          <Suspense fallback={<ProfileSidebarSkeleton />}>
            <ProfileSidebar data={personalInfo} />
          </Suspense>

          <Suspense fallback={<MainContentSkeleton />}>
            <MainContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ProfileSidebarSkeleton() {
  return (
    <aside className="w-full lg:w-80 bg-card rounded-2xl border border-border p-4 md:p-6 h-fit animate-pulse">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6 bg-secondary rounded-3xl" />
        <div className="h-6 w-32 bg-secondary rounded mb-2" />
        <div className="h-4 w-24 bg-secondary rounded" />
      </div>
    </aside>
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
