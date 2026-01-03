import { cache } from "react"
import { client } from "./sanity.client"

// Use React's cache for request deduplication within a single render
// Combined with route-level revalidation for time-based cache invalidation

// Personal Info Queries
export const getPersonalInfo = cache(async () => {
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
})

// About Queries
export const getAbout = cache(async () => {
  const query = `*[_type == "about"][0]{
    bio,
    skills,
    technologies[]{
      category,
      items
    }
  }`

  return await client.fetch(query)
})

// Resume Queries
export const getResume = cache(async () => {
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
})

// Certifications Queries
export const getCertifications = cache(async () => {
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
})

// Projects Queries
export const getProjects = cache(async (type?: "project" | "lab") => {
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
})

export const getFeaturedProjects = cache(async () => {
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
})

export const getProjectBySlug = cache(async (slug: string) => {
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
})

// Blog Queries
export const getBlogPosts = cache(async (limit?: number) => {
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
})

export const getFeaturedBlogPosts = cache(async () => {
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
})

export const getBlogPostBySlug = cache(async (slug: string) => {
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
})

export const getBlogTags = cache(async () => {
  // Optimized query - fetch only tags array, not full documents
  const query = `array::unique(*[_type == "blogPost"].tags[]) | order(@ asc)`

  return await client.fetch(query)
})

// Subscriber Queries (for admin/analytics)
export const getSubscriberCount = cache(async () => {
  const query = `count(*[_type == "subscriber"])`
  return await client.fetch(query)
})
