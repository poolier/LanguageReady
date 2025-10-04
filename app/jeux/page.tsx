"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Trophy, Star, Clock, Target, Gamepad2, Zap, Brain, Shuffle } from "lucide-react"

export default function JeuxPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)

  // Données de jeux simulées
  const games = [
    {
      id: "memory-cards",
      title: "Cartes Mémoire",
      description: "Associe les caractères chinois avec leur signification",
      difficulty: "Facile",
      duration: "5-10 min",
      icon: Brain,
      color: "emerald",
      bestScore: 85,
      played: 12,
    },
    {
      id: "speed-vocab",
      title: "Vocabulaire Rapide",
      description: "Traduis le plus de mots possible en 60 secondes",
      difficulty: "Moyen",
      duration: "1 min",
      icon: Zap,
      color: "amber",
      bestScore: 42,
      played: 8,
    },
    {
      id: "character-builder",
      title: "Constructeur de Caractères",
      description: "Dessine les caractères dans le bon ordre des traits",
      difficulty: "Difficile",
      duration: "10-15 min",
      icon: Target,
      color: "rose",
      bestScore: 78,
      played: 5,
    },
    {
      id: "tone-master",
      title: "Maître des Tons",
      description: "Identifie les tons corrects des mots chinois",
      difficulty: "Moyen",
      duration: "5 min",
      icon: Gamepad2,
      color: "violet",
      bestScore: 92,
      played: 15,
    },
    {
      id: "sentence-puzzle",
      title: "Puzzle de Phrases",
      description: "Remets les mots dans le bon ordre pour former des phrases",
      difficulty: "Difficile",
      duration: "8-12 min",
      icon: Shuffle,
      color: "cyan",
      bestScore: 67,
      played: 3,
    },
  ]

  const memoryCards = [
    { id: 1, character: "你好", meaning: "Bonjour", matched: false, flipped: false },
    { id: 2, character: "谢谢", meaning: "Merci", matched: false, flipped: false },
    { id: 3, character: "再见", meaning: "Au revoir", matched: false, flipped: false },
    { id: 4, character: "水", meaning: "Eau", matched: false, flipped: false },
  ]

  const speedVocabWords = [
    { chinese: "猫", french: "Chat" },
    { chinese: "狗", french: "Chien" },
    { chinese: "鸟", french: "Oiseau" },
    { chinese: "鱼", french: "Poisson" },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
      amber: "bg-amber-100 text-amber-800 border-amber-200",
      rose: "bg-rose-100 text-rose-800 border-rose-200",
      violet: "bg-violet-100 text-violet-800 border-violet-200",
      cyan: "bg-cyan-100 text-cyan-800 border-cyan-200",
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.emerald
  }

  const startGame = (gameId: string) => {
    setSelectedGame(gameId)
    setGameStarted(true)
    setScore(0)
    setCurrentQuestion(0)
    setTimeLeft(30)
  }

  const resetGame = () => {
    setSelectedGame(null)
    setGameStarted(false)
    setScore(0)
    setCurrentQuestion(0)
    setTimeLeft(30)
  }

  if (gameStarted && selectedGame) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={resetGame} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour aux jeux
            </Button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span className="font-semibold">{score} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="font-semibold">{timeLeft}s</span>
              </div>
            </div>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">{games.find((g) => g.id === selectedGame)?.title}</CardTitle>
              <Progress value={(currentQuestion / 10) * 100} className="w-full" />
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedGame === "memory-cards" && (
                <div className="grid grid-cols-4 gap-4">
                  {memoryCards.map((card) => (
                    <Card key={card.id} className="aspect-square cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="flex items-center justify-center h-full p-2">
                        <div className="text-center">
                          <div className="text-lg font-bold">{card.character}</div>
                          <div className="text-sm text-muted-foreground">{card.meaning}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {selectedGame === "speed-vocab" && (
                <div className="text-center space-y-6">
                  <div className="text-4xl font-bold text-blue-600">猫</div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button size="lg" variant="outline">
                      Chat
                    </Button>
                    <Button size="lg" variant="outline">
                      Chien
                    </Button>
                    <Button size="lg" variant="outline">
                      Oiseau
                    </Button>
                    <Button size="lg" variant="outline">
                      Poisson
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4">
                <Button onClick={() => setCurrentQuestion((prev) => prev + 1)}>Question suivante</Button>
                <Button variant="outline" onClick={resetGame}>
                  Terminer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Retour au tableau de bord
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Centre de Jeux</h1>
          <p className="text-muted-foreground">Apprends en t'amusant avec nos jeux éducatifs interactifs</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {games.map((game) => {
            const IconComponent = game.icon
            return (
              <Card key={game.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${getColorClasses(game.color)}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary">{game.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {game.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      Meilleur: {game.bestScore}%
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Joué {game.played} fois</div>
                  <Button className="w-full" onClick={() => startGame(game.id)}>
                    <Play className="h-4 w-4 mr-2" />
                    Jouer
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Statistiques Globales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">43</div>
                  <div className="text-sm text-muted-foreground">Parties jouées</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">78%</div>
                  <div className="text-sm text-muted-foreground">Score moyen</div>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-violet-600">2h 15min</div>
                <div className="text-sm text-muted-foreground">Temps total de jeu</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
