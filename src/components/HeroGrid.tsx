import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  phase: number
  radius: number
}

export default function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let width = 0
    let height = 0
    let dpr = 1
    const dots: Dot[] = []
    const dotCount = 72
    let mouseX = 0.5
    let mouseY = 0.5

    const resize = () => {
      dpr = Math.min(devicePixelRatio, 2)
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (dots.length === 0) {
        for (let i = 0; i < dotCount; i++) {
          dots.push({
            x: Math.random() * width,
            y: Math.random() * height,
            phase: Math.random() * Math.PI * 2,
            radius: 1 + Math.random() * 1.5,
          })
        }
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) / rect.width
      mouseY = (e.clientY - rect.top) / rect.height
    }

    resize()

    let time = 0
    const draw = () => {
      time += 0.012
      ctx.clearRect(0, 0, width, height)

      const parallaxX = (mouseX - 0.5) * 24
      const parallaxY = (mouseY - 0.5) * 24

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]
          const b = dots[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.12
            ctx.beginPath()
            ctx.moveTo(a.x + parallaxX * 0.02, a.y + parallaxY * 0.02)
            ctx.lineTo(b.x + parallaxX * 0.02, b.y + parallaxY * 0.02)
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      dots.forEach((dot) => {
        const pulse = 0.35 + Math.sin(time + dot.phase) * 0.25
        const x = dot.x + parallaxX * 0.04
        const y = dot.y + parallaxY * 0.04
        ctx.beginPath()
        ctx.arc(x, y, dot.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(103, 232, 249, ${pulse})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      aria-hidden
    />
  )
}
