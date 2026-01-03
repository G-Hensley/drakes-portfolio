export interface PersonalInfo {
  name: string
  title: string
  avatar?: any
  email?: string
  phone?: string
  location?: string
  socialLinks?: SocialLink[]
}

export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "portfolio"
  url: string
}

export interface About {
  bio: any[]
  skills?: string[]
  technologies?: Technology[]
}

export interface Technology {
  category: string
  items: string[]
}

export interface Resume {
  experience?: Experience[]
  education?: Education[]
  skills?: SkillCategory[]
}

export interface Experience {
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current?: boolean
  description?: any[]
}

export interface Education {
  degree: string
  institution: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface Certification {
  _id: string
  name: string
  issuer: string
  date: string
  credentialUrl?: string
  logo?: any
  order?: number
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  type: "project" | "lab"
  description: string
  image?: any
  techStack?: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  order?: number
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content?: any[]
  coverImage?: any
  tags?: string[]
  publishedAt: string
  featured?: boolean
}
