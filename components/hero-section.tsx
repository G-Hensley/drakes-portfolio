import { PersonalInfo } from "@/lib/sanity.types"

export function HeroSection({ personalInfo }: { personalInfo: PersonalInfo }) {

  return (
    <section className="max-w-7xl min-h-fit h-screen px-8 xl:px-16 flex gap-16">
      <aside className="flex flex-col gap-4">
        <div>
          {personalInfo.topSkills?.map((skill) => (
            <span key={skill} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {skill}
            </span>
          ))}
        </div>
      </aside>
    </section>
  )
}
