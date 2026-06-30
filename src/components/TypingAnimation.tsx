import { useEffect, useState } from 'react'
import { typingLines } from '../data/content'

interface TypingAnimationProps {
  className?: string
}

export default function TypingAnimation({ className = '' }: TypingAnimationProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentLine = typingLines[lineIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentLine.length) {
            setDisplayText(currentLine.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setLineIndex((prev) => (prev + 1) % typingLines.length)
        }
      },
      isDeleting ? 40 : 80,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, lineIndex])

  return (
    <p
      className={`text-lg md:text-xl font-medium h-8 ${className}`}
      style={{ color: className ? undefined : 'var(--color-accent-primary)' }}
      aria-live="polite"
    >
      {displayText}
      <span className="animate-pulse">|</span>
    </p>
  )
}
