import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from './icons/SocialIcons'
import { SOCIAL_LINKS } from '../constants/social'

interface SocialLinksProps {
  className?: string
  size?: 'sm' | 'md'
  variant?: 'default' | 'onDark'
}

const socialItems = [
  { href: SOCIAL_LINKS.facebook, label: 'Facebook', Icon: FacebookIcon, color: '#1877F2' },
  { href: SOCIAL_LINKS.twitter, label: 'Twitter', Icon: TwitterIcon, color: '#1DA1F2' },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: InstagramIcon, color: '#E4405F' },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', Icon: LinkedInIcon, color: '#0A66C2' },
  { href: SOCIAL_LINKS.github, label: 'GitHub', Icon: GitHubIcon, color: '#333333' },
] as const

export default function SocialLinks({ className = '', size = 'md', variant = 'default' }: SocialLinksProps) {
  const iconSize = size === 'sm' ? 18 : 22
  const buttonSize = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12'
  const isOnDark = variant === 'onDark'

  return (
    <div className={`flex flex-wrap gap-3 ${isOnDark ? '' : 'justify-center'} ${className}`}>
      {socialItems.map(({ href, label, Icon, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${buttonSize} flex items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
            isOnDark
              ? 'bg-white/10 border-white/20 hover:bg-white/20'
              : 'bg-[var(--color-bg-card)] border-[var(--color-border-light)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]'
          }`}
          style={{ color: isOnDark ? 'white' : color }}
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  )
}
