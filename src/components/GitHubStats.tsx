import { GITHUB_USERNAME } from '../constants/social'
import Card from './ui/Card'

export default function GitHubStats() {
  return (
    <Card>
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-center mb-6 text-[var(--color-text-primary)]">
          Estadísticas de GitHub
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=react&hide_border=true&bg_color=1A2332&title_color=22D3EE&text_color=F1F5F9&icon_color=F59E0B`}
            alt="GitHub Stats"
            className="w-full rounded-xl"
            loading="lazy"
          />
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=react&hide_border=true&background=1A2332&ring=22D3EE&fire=F59E0B&currStreakNum=F1F5F9&sideNums=F1F5F9&currStreakLabel=22D3EE&sideLabels=94A3B8&dates=94A3B8`}
            alt="GitHub Streak"
            className="w-full rounded-xl"
            loading="lazy"
          />
        </div>
      </div>
    </Card>
  )
}
