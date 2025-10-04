import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Users, Zap } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "community"
  progress: number
  maxProgress: number
  reward: string
  timeLeft?: string
  participants?: number
}

const challenges: Challenge[] = [
  {
    id: "daily-vocab",
    title: "Maître du vocabulaire",
    description: "Apprends 10 nouveaux mots aujourd'hui",
    type: "daily",
    progress: 6,
    maxProgress: 10,
    reward: "50 XP",
    timeLeft: "8h",
  },
  {
    id: "weekly-streak",
    title: "Série parfaite",
    description: "Étudie 7 jours consécutifs cette semaine",
    type: "weekly",
    progress: 5,
    maxProgress: 7,
    reward: "Badge + 200 XP",
    timeLeft: "2j",
  },
  {
    id: "community-challenge",
    title: "Défi communautaire",
    description: "Collectivement, atteignons 10 000 minutes d'étude",
    type: "community",
    progress: 7420,
    maxProgress: 10000,
    reward: "Contenu exclusif",
    participants: 156,
  },
]

export default function ChallengesSection() {
  const getTypeIcon = (type: Challenge["type"]) => {
    switch (type) {
      case "daily":
        return <Clock className="h-4 w-4" />
      case "weekly":
        return <Calendar className="h-4 w-4" />
      case "community":
        return <Users className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: Challenge["type"]) => {
    switch (type) {
      case "daily":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "weekly":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "community":
        return "bg-orange-50 text-orange-700 border-orange-200"
    }
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold">Défis actifs</h2>
        </div>
        <Link href="/challenges" className="text-sm text-muted-foreground hover:underline">
          Voir tous
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className={getTypeColor(challenge.type)}>
                  {getTypeIcon(challenge.type)}
                  <span className="ml-1 capitalize">{challenge.type}</span>
                </Badge>
                {challenge.timeLeft && <span className="text-xs text-muted-foreground">{challenge.timeLeft}</span>}
              </div>
              <CardTitle className="text-base">{challenge.title}</CardTitle>
              <CardDescription className="text-sm">{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progrès</span>
                  <span className="font-medium">
                    {challenge.progress}/{challenge.maxProgress}
                    {challenge.type === "community" ? " min" : ""}
                  </span>
                </div>
                <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Récompense: {challenge.reward}
                  {challenge.participants && <div className="mt-1">{challenge.participants} participants</div>}
                </div>
                <Button size="sm" variant="outline">
                  Continuer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
