import { Calendar, Clock } from "lucide-react"
import { getBlogPosts, getBlogTags } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.client"
import { BlogSubscribe } from "@/components/blog-subscribe"
import Link from "next/link"

export async function BlogSection() {
  const [posts, tags] = await Promise.all([getBlogPosts(6), getBlogTags()])

  if (!posts || posts.length === 0) {
    return (
      <div className="space-y-6 md:space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Blog</h2>
          <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        </div>
        <div className="text-center text-muted-foreground py-12">
          <p>No blog posts available. Please add content in Sanity Studio.</p>
        </div>
        <BlogSubscribe />
      </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Blog</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Blog Subscribe Section */}
      <BlogSubscribe />

      {/* Tags Filter */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 bg-secondary text-foreground text-sm rounded-lg border border-border hover:border-accent transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <article className="group bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 h-full">
              {post.coverImage && (
                <div className="aspect-video overflow-hidden bg-background">
                  <img
                    src={urlForImage(post.coverImage).width(600).height(400).url() || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    {Math.ceil(post.excerpt.split(" ").length / 200)} min read
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 md:py-1 bg-background rounded text-muted-foreground">
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

      {/* View All Link */}
      <div className="text-center pt-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
        >
          View All Posts
        </Link>
      </div>
    </div>
  )
}
