import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

export const client = createClient({
  projectId: "plh1uu9n",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}
