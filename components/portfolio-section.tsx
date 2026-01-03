"use client"

import { useState } from "react"
import { Eye, Github, Beaker, Folder } from "lucide-react"
import { urlForImage } from "@/lib/sanity.client"
import type { Project } from "@/lib/sanity.types"

interface PortfolioSectionProps {
  projects: Project[]
  labs: Project[]
}

export function PortfolioSection({ projects, labs }: PortfolioSectionProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "labs">("projects")

  const displayedProjects = activeTab === "projects" ? projects : labs

  if (!projects || projects.length === 0) {
    return (
      <div className="space-y-6 md:space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Portfolio</h2>
          <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        </div>
        <div className="text-center text-muted-foreground py-12">
          <p>No projects available. Please add content in Sanity Studio.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Portfolio</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Tab Buttons for Projects and Labs */}
      <div className="flex gap-2 md:gap-3 border-b border-border">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base font-medium transition-all relative ${
            activeTab === "projects" ? "text-accent" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Folder className="w-4 h-4" />
          Projects
          {activeTab === "projects" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>
        <button
          onClick={() => setActiveTab("labs")}
          className={`flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base font-medium transition-all relative ${
            activeTab === "labs" ? "text-accent" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Beaker className="w-4 h-4" />
          Labs
          {activeTab === "labs" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>
      </div>

      {/* Projects/Labs Grid */}
      {displayedProjects.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p>No {activeTab} available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayedProjects.map((project) => (
            <div
              key={project._id}
              className="group relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/10"
            >
              {project.image && (
                <div className="aspect-[4/3] overflow-hidden bg-background">
                  <img
                    src={urlForImage(project.image).width(600).height(450).url() || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-4 md:p-5">
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground rounded-lg text-xs font-medium hover:bg-accent/90 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary border border-border text-foreground rounded-lg text-xs font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                  )}
                </div>
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-accent/90 backdrop-blur-sm text-accent-foreground rounded-lg text-xs font-medium">
                  Featured
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
