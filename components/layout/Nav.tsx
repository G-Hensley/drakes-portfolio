"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

// Sections that scroll on the homepage
const scrollSections = ["about", "resume", "blog", "contact"]

// External page links
const pageLinks = [
  { name: "portfolio", href: "/portfolio" }
]

export function Nav() {
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )

    scrollSections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault()
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="glass-nav flex gap-1 sm:gap-2 p-2 rounded-xl md:rounded-2xl overflow-x-auto scrollbar-hide fixed z-50">
      {/* Scroll sections */}
      {scrollSections.slice(0, 2).map((section) => (
        <a
          key={section}
          href={`#${section}`}
          onClick={(e) => handleClick(e, section)}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
            activeSection === section
              ? "text-foreground bg-accent/10"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          {section}
        </a>
      ))}

      {/* Portfolio page link */}
      {pageLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap cursor-pointer shrink-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          {link.name}
        </Link>
      ))}

      {/* Remaining scroll sections */}
      {scrollSections.slice(2).map((section) => (
        <a
          key={section}
          href={`#${section}`}
          onClick={(e) => handleClick(e, section)}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
            activeSection === section
              ? "text-foreground bg-accent/10"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          {section}
        </a>
      ))}
    </nav>
  )
}
