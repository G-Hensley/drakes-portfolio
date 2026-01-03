import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.client"
import { PortableText } from "@/components/portable-text"
import { BlogSubscribe } from "@/components/blog-subscribe"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { notFound } from "next/navigation"

// Revalidate every hour
export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} - Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const readTime = post.content ? Math.ceil(JSON.stringify(post.content).length / 1000) : 5

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-secondary mb-8">
            <img
              src={urlForImage(post.coverImage).width(1200).height(675).url() || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime} min read
            </span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-lg border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">{post.content && <PortableText value={post.content} />}</div>

        {/* Subscribe Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <BlogSubscribe />
        </div>
      </article>
    </div>
  )
}
