import { getProjects } from "@/lib/sanity.queries"
import { PortfolioSection } from "@/components/portfolio-section"

export async function PortfolioWrapper() {
  const [projects, labs] = await Promise.all([getProjects("project"), getProjects("lab")])

  return <PortfolioSection projects={projects || []} labs={labs || []} />
}
