"use server"

import { client } from "@/lib/sanity.client"

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string
  const name = formData.get("name") as string

  if (!email) {
    return { success: false, error: "Email is required" }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address" }
  }

  try {
    // Check if email already exists
    const existingSubscriber = await client.fetch(`*[_type == "subscriber" && email == $email][0]`, { email })

    if (existingSubscriber) {
      return { success: false, error: "Email already subscribed" }
    }

    // Create new subscriber
    await client.create({
      _type: "subscriber",
      email,
      name: name || undefined,
      subscribedAt: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    console.error("[v0] Subscription error:", error)
    return { success: false, error: "Failed to subscribe. Please try again." }
  }
}
