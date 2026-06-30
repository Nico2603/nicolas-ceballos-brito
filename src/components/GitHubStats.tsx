import { GITHUB_USERNAME } from '../constants/social'

export default function GitHubStats() {
  return (
    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
      <h3 className="font-display text-xl font-semibold text-center mb-6" style={{ color: 'var(--color-primary)' }}>
        Estadísticas de GitHub
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=tokyonight&hide_border=true`}
          alt="GitHub Stats"
          className="w-full rounded-xl"
          loading="lazy"
        />
        <img
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=tokyonight&hide_border=true`}
          alt="GitHub Streak"
          className="w-full rounded-xl"
          loading="lazy"
        />
      </div>
    </div>
  )
}
