import type React from "react"
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
  title: "Sanity Studio",
  description: "Content management studio",
}
