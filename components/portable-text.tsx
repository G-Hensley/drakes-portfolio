import { PortableText as PortableTextComponent, type PortableTextComponents } from "@portabletext/react"

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-4 text-foreground">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold mb-3 text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold mb-3 text-foreground">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold mb-2 text-foreground">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 text-foreground leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-muted-foreground">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-foreground">{children}</li>,
    number: ({ children }) => <li className="text-foreground">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-accent">{children}</code>
    ),
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        {children}
      </a>
    ),
  },
}

export function PortableText({ value }: { value: any }) {
  return <PortableTextComponent value={value} components={components} />
}
