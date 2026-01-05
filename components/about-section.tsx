import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { PortableText } from "@/components/portable-text"
import { urlForImage } from "@/lib/sanity.client"
import type { PersonalInfo } from "@/lib/sanity.types"

interface TechnologyCategory {
  category: string
  items: string[]
}

interface AboutData {
  bio: any
  skills?: string[]
  technologies?: TechnologyCategory[]
}

interface AboutSectionProps {
  data: AboutData | null
  profileData?: PersonalInfo | null
  showProfile?: boolean
  showSkills?: boolean
}

const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

export function AboutSection({ data, profileData, showProfile = true, showSkills = true }: AboutSectionProps) {

  if (!data) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>About information not available. Please add content in Sanity Studio.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 items-center mt-2">
      {/* Profile Card */}
      {showProfile && profileData && (
        <section className="w-full sm:w-md glass-heavy rounded-2xl p-4 md:py-6 md:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Profile Image */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-accent/20 via-accent/5 to-transparent animate-pulse-slow" />
              <div className="absolute inset-0.5 rounded-full bg-secondary overflow-hidden border border-border">
                {profileData.avatar ? (
                  <img
                    src={urlForImage(profileData.avatar).width(200).height(200).url() || "/placeholder.svg"}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    {profileData.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">{profileData.name}</h1>
              <p className="text-xs md:text-sm text-muted-foreground bg-secondary inline-block px-3 md:px-4 py-1 rounded-lg mb-4">
                {profileData.title}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                {profileData.email && (
                  <a href={`mailto:${profileData.email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <Mail className="w-4 h-4" />
                    {profileData.email}
                  </a>
                )}
                {profileData.phone && (
                  <a href={`tel:${profileData.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <Phone className="w-4 h-4" />
                    {profileData.phone}
                  </a>
                )}
                {profileData.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {profileData.location}
                  </span>
                )}
              </div>

              {/* Social Links */}
              {profileData.socialLinks && profileData.socialLinks.length > 0 && (
                <div className="flex justify-center sm:justify-start gap-3 mt-4">
                  {profileData.socialLinks.map((social, index) => {
                    const IconComponent = socialIconMap[social.platform as keyof typeof socialIconMap]
                    if (!IconComponent) return null

                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
                        aria-label={social.platform}
                      >
                        <IconComponent className="w-4 h-4" />
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* About Card */}
      <section className="w-full glass rounded-2xl p-4 md:py-6 md:px-8 space-y-8 md:space-y-10">
        {/* About Me */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-full h-0.5 bg-accent rounded-full mb-6" />
          <div className="prose prose-sm md:prose-base max-w-none">
            <PortableText value={data.bio} />
          </div>
        </div>

        {/* Skills */}
        {showSkills && data.skills && data.skills.length > 0 && (
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string, index: number) => (
                <span
                key={index}
                className="px-3 py-1.5 bg-secondary text-foreground text-sm rounded-lg border border-border hover:border-accent transition-colors"
                >
                {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        {showSkills && data.technologies && data.technologies.length > 0 && (
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Technologies</h3>
            <div className="space-y-6">
              {data.technologies.map((tech: TechnologyCategory, index: number) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold text-foreground mb-3">{tech.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {tech.items.map((item: string, itemIndex: number) => (
                      <span
                        key={itemIndex}
                        className="px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-lg border border-accent/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
