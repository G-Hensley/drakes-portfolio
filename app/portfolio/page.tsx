import { PortfolioSection } from "@/components/portfolio-section"
import { ThemeToggle } from "@/components/layout"
import { getProjects } from "@/lib/sanity.queries"
import Link from "next/link"

// Revalidate every hour
export const revalidate = 3600

export const metadata = {
  title: "Portfolio - Developer Portfolio",
  description: "View my projects and lab experiments.",
}

export default async function PortfolioPage() {
  const [projects, labs] = await Promise.all([
    getProjects("project"),
    getProjects("lab"),
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-accent hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Portfolio</h1>
          <p className="text-lg text-muted-foreground">
            A collection of my projects and experimental labs.
          </p>
        </div>

        {/* Portfolio Section - full, no limit */}
        <div className="bg-card rounded-xl md:rounded-2xl border border-border p-4 sm:p-5 md:p-6 lg:p-8">
          <PortfolioSection
            projects={projects || []}
            labs={labs || []}
          />
        </div>
      </div>
    </div>
  )
}
