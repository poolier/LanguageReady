"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Trophy, Star, ArrowRight, Lock } from "lucide-react"
import Link from "next/link"

interface HSKLevel {
  level: number
  title: string
  description: string
  characters: number
  words: number
  progress: number
  unlocked: boolean
  color: string
}

const hskLevels: HSKLevel[] = [
  {
    level: 1,
    title: "HSK 1 - Débutant",
    description: "Bases essentielles pour communiquer dans des situations très simples",
    characters: 174,
    words: 150,
    progress: 25,
    unlocked: true,
    color: "bg-green-500",
  },
  {
    level: 2,
    title: "HSK 2 - Élémentaire",
    description: "Communication simple sur des sujets familiers et quotidiens",
    characters: 347,
    words: 300,
    progress: 0,
    unlocked: true,
    color: "bg-blue-500",
  },
  {
    level: 3,
    title: "HSK 3 - Intermédiaire",
    description: "Communication dans la plupart des situations de la vie quotidienne",
    characters: 617,
    words: 600,
    progress: 0,
    unlocked: false,
    color: "bg-purple-500",
  },
  {
    level: 4,
    title: "HSK 4 - Intermédiaire supérieur",
    description: "Discussion sur une gamme étendue de sujets",
    characters: 1064,
    words: 1200,
    progress: 0,
    unlocked: false,
    color: "bg-orange-500",
  },
  {
    level: 5,
    title: "HSK 5 - Avancé",
    description: "Lecture de journaux et magazines, compréhension de films",
    characters: 1685,
    words: 2500,
    progress: 0,
    unlocked: false,
    color: "bg-red-500",
  },
  {
    level: 6,
    title: "HSK 6 - Supérieur",
    description: "Compréhension aisée de tout ce qui est lu ou entendu",
    characters: 2663,
    words: 5000,
    progress: 0,
    unlocked: false,
    color: "bg-indigo-500",
  },
]

export default function LessonsIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Leçons de Chinois</h1>
          <p className="text-gray-600 mb-6">Progressez à travers les niveaux HSK pour maîtriser le chinois mandarin</p>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div className="text-sm text-gray-600">Niveaux HSK</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">2,663</div>
                <div className="text-sm text-gray-600">Caractères total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">9,750</div>
                <div className="text-sm text-gray-600">Mots total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">25%</div>
                <div className="text-sm text-gray-600">Progression</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* HSK Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hskLevels.map((level) => (
            <Card
              key={level.level}
              className={`relative transition-all duration-200 hover:shadow-lg ${
                level.unlocked ? "cursor-pointer hover:scale-105" : "opacity-75"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className={`${level.color} text-white font-semibold px-3 py-1`}>HSK {level.level}</Badge>
                  {!level.unlocked && <Lock className="w-5 h-5 text-gray-400" />}
                </div>
                <CardTitle className="text-xl">{level.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{level.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-gray-900">{level.characters}</div>
                    <div className="text-gray-600">Caractères</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-gray-900">{level.words}</div>
                    <div className="text-gray-600">Mots</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-medium">{level.progress}%</span>
                  </div>
                  <Progress value={level.progress} className="h-2" />
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {level.unlocked ? (
                    level.level === 1 ? (
                      <Link href="/lecons/hsk1" className="w-full">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          {level.progress > 0 ? "Continuer" : "Commencer"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full bg-transparent" variant="outline">
                        Bientôt disponible
                      </Button>
                    )
                  ) : (
                    <Button className="w-full" variant="ghost" disabled>
                      <Lock className="w-4 h-4 mr-2" />
                      Verrouillé
                    </Button>
                  )}
                </div>
              </CardContent>

              {/* Difficulty indicator */}
              <div className="absolute top-4 right-4">
                <div className="flex space-x-1">
                  {[...Array(level.level)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${level.color}`} />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>À propos des niveaux HSK</CardTitle>
            <CardDescription>
              Le HSK (Hanyu Shuiping Kaoshi) est le test officiel de compétence en chinois mandarin
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Niveaux débutants (HSK 1-2)</h4>
              <p className="text-gray-600 mb-4">
                Acquisition des bases essentielles pour communiquer dans des situations simples du quotidien.
              </p>

              <h4 className="font-semibold mb-2">Niveaux intermédiaires (HSK 3-4)</h4>
              <p className="text-gray-600">
                Développement de la capacité à communiquer sur une gamme plus large de sujets.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Niveaux avancés (HSK 5-6)</h4>
              <p className="text-gray-600 mb-4">
                Maîtrise permettant de comprendre et de s'exprimer sur des sujets complexes.
              </p>

              <h4 className="font-semibold mb-2">Progression recommandée</h4>
              <p className="text-gray-600">
                Chaque niveau nécessite environ 2-3 mois d'étude régulière pour être maîtrisé.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
