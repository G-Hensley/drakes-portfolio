import { PersonalInfo } from "@/lib/sanity.types"

export function HeroSection({ personalInfo }: { personalInfo: PersonalInfo }) {

  return (
    <section className="max-w-7xl min-h-fit h-screen px-8 xl:px-16 pt-20 flex gap-16">
      <aside className="flex flex-col gap-4">
        <h1>{personalInfo.name}</h1>
        <div className="mx-auto">
          {personalInfo.topSkills?.map((skill) => (
            <span key={skill} className="text-white text-2xl">
              {skill}
            </span>
          ))}
        </div>
      </aside>
    </section>
  )
}
