import { getAbout } from "@/lib/sanity.queries"
import { PortableText } from "@/components/portable-text"

export async function AboutSection() {
  const data = await getAbout()

  if (!data) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>About information not available. Please add content in Sanity Studio.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 md:space-y-10">
      {/* About Me */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">About Me</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        <div className="prose prose-sm md:prose-base max-w-none">
          <PortableText value={data.bio} />
        </div>
      </div>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
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
      {data.technologies && data.technologies.length > 0 && (
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Technologies</h3>
          <div className="space-y-6">
            {data.technologies.map((tech, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-foreground mb-3">{tech.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item, itemIndex) => (
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
    </div>
  )
}
