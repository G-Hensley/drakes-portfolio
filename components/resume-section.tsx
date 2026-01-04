import { BookOpen, Briefcase, Award } from "lucide-react"
import { PortableText } from "@/components/portable-text"
import { urlForImage } from "@/lib/sanity.client"

interface ResumeSectionProps {
  data: any
  certifications: any[]
}

export function ResumeSection({ data: resumeData, certifications }: ResumeSectionProps) {
  if (!resumeData) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>Resume information not available. Please add content in Sanity Studio.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Resume</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-6">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">Education</h3>
          </div>
          <div className="space-y-4">
            {resumeData.education.map((item, index) => (
              <div key={index} className="relative pl-5 md:pl-6 pb-6 border-l-2 border-border last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">{item.degree}</h4>
                <p className="text-sm text-accent mb-2">
                  {item.institution}
                  {item.location && ` • ${item.location}`}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {new Date(item.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  {" - "}
                  {item.endDate
                    ? new Date(item.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                    : "Present"}
                </p>
                {item.description && (
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-6">
            <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">Experience</h3>
          </div>
          <div className="space-y-4">
            {resumeData.experience.map((item, index) => (
              <div key={index} className="relative pl-5 md:pl-6 pb-6 border-l-2 border-border last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-accent mb-2">
                  {item.company}
                  {item.location && ` • ${item.location}`}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {new Date(item.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  {" - "}
                  {item.current
                    ? "Present"
                    : item.endDate
                      ? new Date(item.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : "Present"}
                </p>
                {item.description && (
                  <div className="text-xs md:text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none">
                    <PortableText value={item.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-6">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">Certifications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert._id}
                className="p-4 bg-secondary rounded-xl border border-border hover:border-accent transition-colors"
              >
                <div className="flex items-start gap-3">
                  {cert.logo && (
                    <div className="w-12 h-12 flex-shrink-0 bg-background rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={urlForImage(cert.logo).width(48).height(48).url() || "/placeholder.svg"}
                        alt={cert.issuer}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
                    <p className="text-xs text-accent">
                      {new Date(cert.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:underline mt-2 inline-block"
                      >
                        View Credential →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Skills</h3>
          <div className="space-y-6">
            {resumeData.skills.map((skillCategory, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-foreground mb-3">{skillCategory.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-lg border border-accent/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
