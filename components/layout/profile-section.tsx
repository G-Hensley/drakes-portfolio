import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { urlForImage } from "@/lib/sanity.client"
import type { PersonalInfo } from "@/lib/sanity.types"

interface ProfileSectionProps {
  data: PersonalInfo | null
}

export function ProfileSection({ data }: ProfileSectionProps) {
  if (!data) {
    return (
      <section className="w-full sm:w-md glass glass-hover rounded-2xl p-4 md:p-6 lg:sticky lg:top-8 h-fit">
        <div className="text-center text-muted-foreground">Loading profile...</div>
      </section>
    )
  }

  const socialIconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
  }

  return (
    <section className="w-full sm:w-md rounded-2xl p-4 md:py-6 px-8 relative h-fit">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-accent/20 via-accent/5 to-transparent animate-pulse-slow" />
          <div className="absolute inset-0.5 rounded-full bg-secondary overflow-hidden border border-border">
            {data.avatar ? (
              <img
                src={urlForImage(data.avatar).width(200).height(200).url() || "/placeholder.svg"}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center text-2xl font-bold text-muted-foreground">
                {data.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">{data.name}</h1>
        <p className="text-xs md:text-sm text-muted-foreground bg-secondary px-3 md:px-4 py-1 rounded-lg">
          {data.title}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-4 md:my-6" />

      {/* Contact Info */}
      <div className="flex flex-col gap-3 md:gap-4">
        {data.email && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground uppercase mb-1">Email</p>
              <a
                href={`mailto:${data.email}`}
                className="text-sm text-foreground hover:text-accent transition-colors break-all"
              >
                {data.email}
              </a>
            </div>
          </div>
        )}

        {data.phone && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase mb-1">Phone</p>
              <a
                href={`tel:${data.phone.replace(/\s/g, "")}`}
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {data.phone}
              </a>
            </div>
          </div>
        )}

        {data.location && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase mb-1">Location</p>
              <p className="text-sm text-foreground">{data.location}</p>
            </div>
          </div>
        )}
      </div>

      {/* Social Links */}
      {data.socialLinks && data.socialLinks.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
          {data.socialLinks.map((social, index) => {
            const IconComponent = socialIconMap[social.platform as keyof typeof socialIconMap]
            if (!IconComponent) return null

            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
                aria-label={social.platform}
              >
                <IconComponent className="w-5 h-5" />
              </a>
            )
          })}
        </div>
      )}
    </section>
  )
}
