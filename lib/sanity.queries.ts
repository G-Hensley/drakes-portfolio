import { client } from "./sanity.client"

// Personal Info Queries
export async function getPersonalInfo() {
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
}

// About Queries
export async function getAbout() {
  const query = `*[_type == "about"][0]{
    bio,
    skills,
    technologies[]{
      category,
      items
    }
  }`

  return await client.fetch(query)
}

// Resume Queries
export async function getResume() {
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
}

// Certifications Queries
export async function getCertifications() {
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
}

// Projects Queries
export async function getProjects(type?: "project" | "lab") {
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
}

export async function getFeaturedProjects() {
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
}

export async function getProjectBySlug(slug: string) {
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
}

// Blog Queries
export async function getBlogPosts(limit?: number) {
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
}

export async function getFeaturedBlogPosts() {
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
}

export async function getBlogPostBySlug(slug: string) {
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
}

export async function getBlogTags() {
  const query = `*[_type == "blogPost"]{
    tags
  }`

  const posts = await client.fetch(query)
  const allTags = posts.flatMap((post: any) => post.tags || [])
  return [...new Set(allTags)].sort()
}

// Subscriber Queries (for admin/analytics)
export async function getSubscriberCount() {
  const query = `count(*[_type == "subscriber"])`
  return await client.fetch(query)
}
