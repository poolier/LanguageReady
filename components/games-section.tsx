import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gamepad2, Users, Clock, Star, Zap, Target } from "lucide-react"

export default function GamesSection() {
  const games = [
    {
      id: 1,
      title: "Mots Croisés",
      description: "Trouve les mots cachés avec des indices en anglais",
      difficulty: "Facile",
      duration: "5-10 min",
      players: "Solo",
      icon: Target,
      color: "bg-blue-50 text-blue-700",
      href: "/games/crossword",
    },
    {
      id: 2,
      title: "Speed Vocab",
      description: "Traduis le plus de mots possible en 60 secondes",
      difficulty: "Moyen",
      duration: "1 min",
      players: "Solo",
      icon: Zap,
      color: "bg-yellow-50 text-yellow-700",
      href: "/games/speed-vocab",
    },
    {
      id: 3,
      title: "Bataille de Conjugaison",
      description: "Affronte d'autres joueurs en temps réel",
      difficulty: "Difficile",
      duration: "3-5 min",
      players: "Multijoueur",
      icon: Users,
      color: "bg-red-50 text-red-700",
      href: "/games/conjugation-battle",
    },
    {
      id: 4,
      title: "Memory Phrases",
      description: "Mémorise et associe les expressions idiomatiques",
      difficulty: "Moyen",
      duration: "8-12 min",
      players: "Solo",
      icon: Star,
      color: "bg-purple-50 text-purple-700",
      href: "/games/memory-phrases",
    },
  ]

  return (
    <section aria-labelledby="games-title" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5 text-emerald-600" />
          <h2 id="games-title" className="text-lg font-semibold">
            Jeux éducatifs
          </h2>
        </div>
        <Link href="/games" className="text-sm text-muted-foreground hover:underline">
          Voir tous les jeux
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((game) => {
          const IconComponent = game.icon
          return (
            <Card key={game.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${game.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {game.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-base">{game.title}</CardTitle>
                <CardDescription className="text-sm">{game.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {game.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {game.players}
                  </div>
                </div>
                <Button asChild size="sm" className="w-full">
                  <Link href={game.href}>Jouer</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
