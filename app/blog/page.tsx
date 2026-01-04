import { Calendar, Clock } from "lucide-react"
import { getBlogPosts, getBlogTags } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.client"
import { BlogSubscribe } from "@/components/blog-subscribe"
import { ThemeToggle } from "@/components/layout"
import Link from "next/link"

// Revalidate every hour
export const revalidate = 3600

export const metadata = {
  title: "Blog - Developer Portfolio",
  description: "Read the latest blog posts about web development, programming, and technology.",
}

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getBlogPosts(), getBlogTags()])

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-accent hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts, tutorials, and insights about web development and technology.
          </p>
        </div>

        {/* Subscribe Section */}
        <div className="mb-12">
          <BlogSubscribe />
        </div>

        {/* Tags Filter */}
        {tags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Topics</h2>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium">All</button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-secondary text-foreground rounded-lg border border-border hover:border-accent transition-colors text-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!posts || posts.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>No blog posts available. Please add content in Sanity Studio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`}>
                <article className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 h-full">
                  {post.coverImage && (
                    <div className="aspect-video overflow-hidden bg-secondary">
                      <img
                        src={urlForImage(post.coverImage).width(600).height(400).url() || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {Math.ceil(post.excerpt.split(" ").length / 200)} min read
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 bg-secondary rounded-lg text-muted-foreground border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
