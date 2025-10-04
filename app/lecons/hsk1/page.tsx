"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Play, Book, Users, Clock, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: number
  title: string
  description: string
  duration: string
  completed: boolean
  locked: boolean
  type: "vocabulary" | "grammar" | "dialogue" | "practice"
  words: string[]
}

const hsk1Lessons: Lesson[] = [
  {
    id: 1,
    title: "Salutations de base",
    description: "Apprendre à dire bonjour, au revoir et se présenter",
    duration: "15 min",
    completed: true,
    locked: false,
    type: "vocabulary",
    words: ["你好", "再见", "谢谢", "不客气"],
  },
  {
    id: 2,
    title: "Les nombres 1-10",
    description: "Compter de 1 à 10 en chinois",
    duration: "20 min",
    completed: true,
    locked: false,
    type: "vocabulary",
    words: ["一", "二", "三", "四", "五"],
  },
  {
    id: 3,
    title: "La famille",
    description: "Vocabulaire de base sur la famille",
    duration: "25 min",
    completed: false,
    locked: false,
    type: "vocabulary",
    words: ["爸爸", "妈妈", "儿子", "女儿"],
  },
  {
    id: 4,
    title: "Grammaire: 是 (être)",
    description: "Utilisation du verbe être en chinois",
    duration: "30 min",
    completed: false,
    locked: false,
    type: "grammar",
    words: ["是", "不是", "我是", "你是"],
  },
  {
    id: 5,
    title: "Les couleurs",
    description: "Apprendre les couleurs principales",
    duration: "18 min",
    completed: false,
    locked: false,
    type: "vocabulary",
    words: ["红色", "蓝色", "绿色", "黄色"],
  },
  {
    id: 6,
    title: "Dialogue: Se présenter",
    description: "Conversation pratique pour se présenter",
    duration: "35 min",
    completed: false,
    locked: true,
    type: "dialogue",
    words: ["我叫", "你叫什么", "很高兴认识你"],
  },
  {
    id: 7,
    title: "Les jours de la semaine",
    description: "Vocabulaire des jours de la semaine",
    duration: "22 min",
    completed: false,
    locked: true,
    type: "vocabulary",
    words: ["星期一", "星期二", "星期三", "今天"],
  },
  {
    id: 8,
    title: "Pratique: Questions simples",
    description: "Poser et répondre à des questions de base",
    duration: "40 min",
    completed: false,
    locked: true,
    type: "practice",
    words: ["什么", "哪里", "谁", "怎么样"],
  },
]

const typeIcons = {
  vocabulary: Book,
  grammar: Users,
  dialogue: Users,
  practice: Star,
}

const typeColors = {
  vocabulary: "bg-blue-500",
  grammar: "bg-green-500",
  dialogue: "bg-purple-500",
  practice: "bg-orange-500",
}

export default function HSK1LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const completedLessons = hsk1Lessons.filter((lesson) => lesson.completed).length
  const totalLessons = hsk1Lessons.length
  const progressPercentage = (completedLessons / totalLessons) * 100

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.locked) {
      setSelectedLesson(lesson)
    }
  }

  const startLesson = () => {
    if (selectedLesson) {
      window.location.href = `/lecons/hsk1/${selectedLesson.id}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/lecons">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux niveaux
              </Button>
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">Leçons HSK 1</h1>
          <p className="text-gray-600 mb-4">Maîtrisez les 150 mots et caractères essentiels du niveau HSK 1</p>

          {/* Progress Overview */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Progression générale</h3>
                  <p className="text-sm text-gray-600">
                    {completedLessons} sur {totalLessons} leçons terminées
                  </p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {Math.round(progressPercentage)}%
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roadmap des leçons */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Roadmap des leçons</h2>
            <div className="space-y-4">
              {hsk1Lessons.map((lesson, index) => {
                const Icon = typeIcons[lesson.type]
                const isNextLesson = !lesson.completed && !lesson.locked

                return (
                  <Card
                    key={lesson.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      lesson.locked ? "opacity-50 cursor-not-allowed" : ""
                    } ${selectedLesson?.id === lesson.id ? "ring-2 ring-emerald-500" : ""} ${
                      isNextLesson ? "ring-2 ring-orange-400 bg-orange-50" : ""
                    }`}
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        {/* Status Icon */}
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle className="w-8 h-8 text-green-500" />
                          ) : lesson.locked ? (
                            <Circle className="w-8 h-8 text-gray-400" />
                          ) : (
                            <Circle className="w-8 h-8 text-orange-500" />
                          )}
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-lg">{lesson.title}</h3>
                            <Badge variant="secondary" className={`${typeColors[lesson.type]} text-white text-xs`}>
                              <Icon className="w-3 h-3 mr-1" />
                              {lesson.type}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {lesson.duration}
                            </div>
                            <div className="flex items-center">
                              <Book className="w-4 h-4 mr-1" />
                              {lesson.words.length} mots
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <Button variant="outline" size="sm">
                              Réviser
                            </Button>
                          ) : lesson.locked ? (
                            <Button variant="ghost" size="sm" disabled>
                              Verrouillé
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              <Play className="w-4 h-4 mr-1" />
                              Commencer
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Détails de la leçon sélectionnée */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {selectedLesson ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{selectedLesson.title}</span>
                      <Badge variant="secondary" className={`${typeColors[selectedLesson.type]} text-white`}>
                        {selectedLesson.type}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{selectedLesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Durée:</span>
                        <span className="font-medium">{selectedLesson.duration}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Mots à apprendre:</span>
                        <span className="font-medium">{selectedLesson.words.length}</span>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Vocabulaire principal:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedLesson.words.map((word, index) => (
                            <Badge key={index} variant="outline" className="text-lg">
                              {word}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        onClick={startLesson}
                        disabled={selectedLesson.locked}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {selectedLesson.completed ? "Réviser la leçon" : "Commencer la leçon"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">Sélectionnez une leçon</h3>
                    <p className="text-sm text-gray-600">Cliquez sur une leçon dans la roadmap pour voir les détails</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
