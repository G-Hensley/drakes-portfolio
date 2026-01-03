import { unstable_cache } from "next/cache"
import { client } from "./sanity.client"

// Cache configuration - revalidate every hour (3600 seconds)
const CACHE_REVALIDATE = 3600

// Personal Info Queries
export const getPersonalInfo = unstable_cache(
  async () => {
    const query = `*[_type == "personalInfo"][0]{
      name,
      title,
      avatar,
      email,
      phone,
      location,
      socialLinks[]{
        platform,
        url
      }
    }`

    return await client.fetch(query)
  },
  ["personal-info"],
  { revalidate: CACHE_REVALIDATE, tags: ["personal-info"] }
)

// About Queries
export const getAbout = unstable_cache(
  async () => {
    const query = `*[_type == "about"][0]{
      bio,
      skills,
      technologies[]{
        category,
        items
      }
    }`

    return await client.fetch(query)
  },
  ["about"],
  { revalidate: CACHE_REVALIDATE, tags: ["about"] }
)

// Resume Queries
export const getResume = unstable_cache(
  async () => {
    const query = `*[_type == "resume"][0]{
      experience[]{
        title,
        company,
        location,
        startDate,
        endDate,
        current,
        description
      },
      education[]{
        degree,
        institution,
        location,
        startDate,
        endDate,
        description
      },
      skills[]{
        category,
        items
      }
    }`

    return await client.fetch(query)
  },
  ["resume"],
  { revalidate: CACHE_REVALIDATE, tags: ["resume"] }
)

// Certifications Queries
export const getCertifications = unstable_cache(
  async () => {
    const query = `*[_type == "certification"] | order(date desc){
      _id,
      name,
      issuer,
      date,
      credentialUrl,
      logo,
      order
    } | order(order asc)`

    return await client.fetch(query)
  },
  ["certifications"],
  { revalidate: CACHE_REVALIDATE, tags: ["certifications"] }
)

// Projects Queries
export const getProjects = unstable_cache(
  async (type?: "project" | "lab") => {
    const typeFilter = type ? `&& type == "${type}"` : ""
    const query = `*[_type == "project" ${typeFilter}] | order(order asc){
      _id,
      title,
      slug,
      type,
      description,
      image,
      techStack,
      githubUrl,
      liveUrl,
      featured,
      order
    }`

    return await client.fetch(query)
  },
  ["projects"],
  { revalidate: CACHE_REVALIDATE, tags: ["projects"] }
)

export const getFeaturedProjects = unstable_cache(
  async () => {
    const query = `*[_type == "project" && featured == true] | order(order asc){
      _id,
      title,
      slug,
      type,
      description,
      image,
      techStack,
      githubUrl,
      liveUrl
    }[0...6]`

    return await client.fetch(query)
  },
  ["featured-projects"],
  { revalidate: CACHE_REVALIDATE, tags: ["projects"] }
)

export const getProjectBySlug = unstable_cache(
  async (slug: string) => {
    const query = `*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      type,
      description,
      image,
      techStack,
      githubUrl,
      liveUrl,
      featured
    }`

    return await client.fetch(query, { slug })
  },
  ["project-by-slug"],
  { revalidate: CACHE_REVALIDATE, tags: ["projects"] }
)

// Blog Queries
export const getBlogPosts = unstable_cache(
  async (limit?: number) => {
    const limitClause = limit ? `[0...${limit}]` : ""
    const query = `*[_type == "blogPost"] | order(publishedAt desc){
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      tags,
      publishedAt,
      featured
    }${limitClause}`

    return await client.fetch(query)
  },
  ["blog-posts"],
  { revalidate: CACHE_REVALIDATE, tags: ["blog"] }
)

export const getFeaturedBlogPosts = unstable_cache(
  async () => {
    const query = `*[_type == "blogPost" && featured == true] | order(publishedAt desc){
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      tags,
      publishedAt
    }[0...3]`

    return await client.fetch(query)
  },
  ["featured-blog-posts"],
  { revalidate: CACHE_REVALIDATE, tags: ["blog"] }
)

export const getBlogPostBySlug = unstable_cache(
  async (slug: string) => {
    const query = `*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      publishedAt
    }`

    return await client.fetch(query, { slug })
  },
  ["blog-post-by-slug"],
  { revalidate: CACHE_REVALIDATE, tags: ["blog"] }
)

export const getBlogTags = unstable_cache(
  async () => {
    // Optimized query - fetch only tags array, not full documents
    const query = `array::unique(*[_type == "blogPost"].tags[]) | order(@ asc)`

    return await client.fetch(query)
  },
  ["blog-tags"],
  { revalidate: CACHE_REVALIDATE, tags: ["blog"] }
)

// Subscriber Queries (for admin/analytics)
export const getSubscriberCount = unstable_cache(
  async () => {
    const query = `count(*[_type == "subscriber"])`
    return await client.fetch(query)
  },
  ["subscriber-count"],
  { revalidate: CACHE_REVALIDATE, tags: ["subscribers"] }
)
