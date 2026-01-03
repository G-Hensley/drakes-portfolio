"use client"

import type React from "react"

import { useState } from "react"
import { subscribeToNewsletter } from "@/app/actions/subscribe"
import { Mail, Loader2, CheckCircle2 } from "lucide-react"

export function BlogSubscribe() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await subscribeToNewsletter(formData)

    setIsLoading(false)

    if (result.success) {
      setIsSuccess(true)
      ;(e.target as HTMLFormElement).reset()
      setTimeout(() => setIsSuccess(false), 5000)
    } else {
      setError(result.error || "Failed to subscribe")
    }
  }

  return (
    <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent rounded-2xl border border-accent/20 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Subscribe to Newsletter</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest posts and updates delivered directly to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="name"
              placeholder="Your name (optional)"
              className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="px-6 py-2.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        </div>
      </div>
    </div>
  )
}
