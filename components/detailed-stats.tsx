import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, BookOpen, Clock, Target, TrendingUp } from "lucide-react"

interface StatItem {
  label: string
  value: string
  progress?: number
  trend?: "up" | "down" | "stable"
  icon: React.ReactNode
}

const stats: StatItem[] = [
  {
    label: "Temps d'étude cette semaine",
    value: "4h 32min",
    progress: 65,
    trend: "up",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    label: "Mots appris ce mois",
    value: "127",
    progress: 84,
    trend: "up",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    label: "Précision moyenne",
    value: "89%",
    progress: 89,
    trend: "stable",
    icon: <Target className="h-4 w-4" />,
  },
  {
    label: "Niveau actuel",
    value: "B1+",
    progress: 72,
    trend: "up",
    icon: <TrendingUp className="h-4 w-4" />,
  },
]

export default function DetailedStats() {
  const getTrendColor = (trend?: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-emerald-600"
      case "down":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-emerald-600" />
          <CardTitle className="text-base">Statistiques détaillées</CardTitle>
        </div>
        <CardDescription>Ton évolution cette semaine</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-muted-foreground">{stat.icon}</div>
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{stat.value}</span>
                {stat.trend && <TrendingUp className={`h-3 w-3 ${getTrendColor(stat.trend)}`} />}
              </div>
            </div>
            {stat.progress && <Progress value={stat.progress} className="h-2" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
