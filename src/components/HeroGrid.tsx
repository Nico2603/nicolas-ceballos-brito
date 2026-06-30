import { useEffect, useRef } from 'react'

export default function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const dots: { x: number; y: number; phase: number }[] = []
    const dotCount = 40

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    resize()

    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        phase: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    const draw = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      dots.forEach((dot) => {
        const alpha = 0.15 + Math.sin(time + dot.phase) * 0.1
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      aria-hidden
    />
  )
}
