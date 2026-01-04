"use client"

interface NavProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sections = ["about", "resume", "portfolio", "blog", "contact"]

export function Nav({ activeSection, onSectionChange }: NavProps) {
  return (
    <nav className="flex gap-1 sm:gap-2 md:gap-4 p-3 sm:p-4 md:p-6 bg-card rounded-xl md:rounded-2xl border border-border overflow-x-auto scrollbar-hide">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onSectionChange(section)}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
            activeSection === section
              ? "text-foreground bg-accent/10"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          {section}
        </button>
      ))}
    </nav>
  )
}
