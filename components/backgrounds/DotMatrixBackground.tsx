"use client"

import { useEffect, useRef, useCallback } from 'react'

interface Dot {
  x: number
  y: number
  baseRadius: number
  phase: number
  speed: number
  color: 'cyan' | 'magenta' | 'deepBlue'
}

export function DotMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = []
    const spacing = 50 // Distance between dots
    const cols = Math.ceil(width / spacing) + 1
    const rows = Math.ceil(height / spacing) + 1

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Vary dot sizes: small (1.5), medium (2.5), large (4)
        const sizeRand = Math.random()
        let baseRadius: number
        if (sizeRand < 0.5) baseRadius = 1.5
        else if (sizeRand < 0.8) baseRadius = 2.5
        else baseRadius = 4

        // Alternate colors with some randomness (45% cyan, 30% magenta, 25% deep blue)
        const colorRand = Math.random()
        let color: 'cyan' | 'magenta' | 'deepBlue'
        if (colorRand < 0.45) color = 'cyan'
        else if (colorRand < 0.75) color = 'magenta'
        else color = 'deepBlue'

        dots.push({
          x: col * spacing,
          y: row * spacing,
          baseRadius,
          phase: Math.random() * Math.PI * 2, // Random starting phase for organic feel
          speed: 0.5 + Math.random() * 1.5, // Varying breathing speeds (0.5-2)
          color,
        })
      }
    }

    dotsRef.current = dots
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initDots(window.innerWidth, window.innerHeight)
    }

    resize()
    window.addEventListener('resize', resize)

    // Check if user prefers dark mode
    const isDark = () => {
      return document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Animation loop
    const animate = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      timeRef.current += 0.016 // ~60fps increment

      const dark = isDark()

      dotsRef.current.forEach((dot) => {
        // Calculate breathing scale using sine wave
        const breathe = Math.sin(timeRef.current * dot.speed + dot.phase)
        // Map -1 to 1 range to 0.3 to 1.7 (breathing range)
        const scale = 1 + breathe * 0.7
        const radius = dot.baseRadius * scale

        // Calculate opacity based on breathing (pulsing opacity)
        const baseOpacity = dark ? 0.6 : 0.5
        const opacityPulse = 0.3 + (breathe + 1) * 0.35 // 0.3 to 1.0
        const opacity = baseOpacity * opacityPulse

        // Set color based on dot type and theme
        let fillColor: string
        if (dot.color === 'cyan') {
          fillColor = dark
            ? `rgba(0, 217, 255, ${opacity})`
            : `rgba(0, 184, 230, ${opacity})`
        } else if (dot.color === 'magenta') {
          fillColor = dark
            ? `rgba(166, 2, 236, ${opacity})`
            : `rgba(157, 78, 221, ${opacity})`
        } else {
          // Teal/aquamarine - distinct from both cyan and magenta
          fillColor = dark
            ? `rgba(0, 255, 180, ${opacity})` // Bright teal-green for dark mode
            : `rgba(0, 200, 150, ${opacity})` // Slightly muted for light mode
        }

        // Draw the dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = fillColor
        ctx.fill()

        // Add glow effect for larger dots
        if (dot.baseRadius >= 3) {
          ctx.shadowBlur = 10
          if (dot.color === 'cyan') {
            ctx.shadowColor = dark ? 'rgba(0, 217, 255, 0.5)' : 'rgba(0, 184, 230, 0.4)'
          } else if (dot.color === 'magenta') {
            ctx.shadowColor = dark ? 'rgba(166, 2, 236, 0.5)' : 'rgba(157, 78, 221, 0.4)'
          } else {
            ctx.shadowColor = dark ? 'rgba(0, 255, 180, 0.5)' : 'rgba(0, 200, 150, 0.4)'
          }
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      animate()
    } else {
      // Static render for reduced motion
      const dark = isDark()
      dotsRef.current.forEach((dot) => {
        const opacity = dark ? 0.5 : 0.4
        let fillColor: string
        if (dot.color === 'cyan') {
          fillColor = `rgba(0, 217, 255, ${opacity})`
        } else if (dot.color === 'magenta') {
          fillColor = `rgba(166, 2, 236, ${opacity})`
        } else {
          fillColor = `rgba(0, 255, 180, ${opacity})`
        }

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.baseRadius, 0, Math.PI * 2)
        ctx.fillStyle = fillColor
        ctx.fill()
      })
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      // Theme changed, animation will pick up new colors automatically
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
    }
  }, [initDots])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -10 }}
      aria-hidden="true"
    />
  )
}
