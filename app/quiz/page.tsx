"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Play,
  Clock,
  Target,
  BookOpen,
  Languages,
  PenTool,
  Volume2,
  CheckCircle,
  X,
  RotateCcw,
  Trophy,
  Star,
} from "lucide-react"

interface QuizSettings {
  level: string
  type: string
  questionCount: number
  timeLimit: number
}

interface Question {
  id: number
  type: "vocabulary" | "character" | "grammar" | "listening"
  question: string
  options: string[]
  correct: number
  explanation: string
  audio?: string
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    type: "vocabulary",
    question: "Comment dit-on 'Bonjour' en chinois ?",
    options: ["你好", "再见", "谢谢", "不客气"],
    correct: 0,
    explanation: "你好 (nǐ hǎo) est la façon la plus courante de dire bonjour en chinois.",
  },
  {
    id: 2,
    type: "character",
    question: "Combien de traits a le caractère '人' (personne) ?",
    options: ["1", "2", "3", "4"],
    correct: 1,
    explanation: "Le caractère 人 (rén) a 2 traits et représente une personne.",
  },
  {
    id: 3,
    type: "grammar",
    question: "Quelle est la structure correcte pour 'Je suis étudiant' ?",
    options: ["我学生是", "我是学生", "是我学生", "学生我是"],
    correct: 1,
    explanation: "La structure correcte est 我是学生 (wǒ shì xuéshēng) - sujet + verbe être + complément.",
  },
  {
    id: 4,
    type: "vocabulary",
    question: "Que signifie '水' ?",
    options: ["Feu", "Eau", "Terre", "Air"],
    correct: 1,
    explanation: "水 (shuǐ) signifie 'eau' en chinois.",
  },
  {
    id: 5,
    type: "character",
    question: "Quel est le pinyin correct pour '中国' ?",
    options: ["zhōng guó", "zhòng guó", "zhōng gúo", "zhòng gúo"],
    correct: 0,
    explanation: "中国 se prononce 'zhōng guó' et signifie 'Chine'.",
  },
]

export default function QuizPage() {
  const [gameState, setGameState] = useState<"setup" | "playing" | "results">("setup")
  const [settings, setSettings] = useState<QuizSettings>({
    level: "hsk1",
    type: "mixed",
    questionCount: 10,
    timeLimit: 300, // 5 minutes
  })

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(settings.timeLimit)
  const [questions, setQuestions] = useState<Question[]>([])

  const startQuiz = () => {
    // Generate questions based on settings
    const selectedQuestions = sampleQuestions.slice(0, settings.questionCount)
    setQuestions(selectedQuestions)
    setTimeLeft(settings.timeLimit)
    setCurrentQuestion(0)
    setAnswers({})
    setGameState("playing")
  }

  const handleAnswer = (answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = () => {
    setGameState("results")
  }

  const resetQuiz = () => {
    setGameState("setup")
    setCurrentQuestion(0)
    setAnswers({})
  }

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "zh-CN"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correct++
      }
    })
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (gameState === "setup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Chinois</h1>
            <p className="text-gray-600">Configurez votre quiz personnalisé</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Paramètres du Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Level Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Niveau HSK</label>
                <Select
                  value={settings.level}
                  onValueChange={(value) => setSettings((prev) => ({ ...prev, level: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hsk1">HSK 1 - Débutant</SelectItem>
                    <SelectItem value="hsk2">HSK 2 - Élémentaire</SelectItem>
                    <SelectItem value="hsk3">HSK 3 - Intermédiaire</SelectItem>
                    <SelectItem value="hsk4">HSK 4 - Intermédiaire+</SelectItem>
                    <SelectItem value="mixed">Niveaux mélangés</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quiz Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Type de Quiz</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "vocabulary", label: "Vocabulaire", icon: BookOpen },
                    { value: "characters", label: "Caractères", icon: Languages },
                    { value: "grammar", label: "Grammaire", icon: PenTool },
                    { value: "mixed", label: "Mélangé", icon: Target },
                  ].map(({ value, label, icon: Icon }) => (
                    <Button
                      key={value}
                      variant={settings.type === value ? "default" : "outline"}
                      className="h-auto p-4 flex-col gap-2"
                      onClick={() => setSettings((prev) => ({ ...prev, type: value }))}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Question Count */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre de questions</label>
                <div className="flex gap-2">
                  {[5, 10, 15, 20].map((count) => (
                    <Button
                      key={count}
                      variant={settings.questionCount === count ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSettings((prev) => ({ ...prev, questionCount: count }))}
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Time Limit */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Limite de temps</label>
                <div className="flex gap-2">
                  {[
                    { value: 180, label: "3 min" },
                    { value: 300, label: "5 min" },
                    { value: 600, label: "10 min" },
                    { value: 0, label: "Illimité" },
                  ].map(({ value, label }) => (
                    <Button
                      key={value}
                      variant={settings.timeLimit === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSettings((prev) => ({ ...prev, timeLimit: value }))}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="bg-emerald-50 p-4 rounded-lg">
                <h3 className="font-medium text-emerald-800 mb-2">Résumé de votre quiz :</h3>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Niveau : {settings.level.toUpperCase()}</li>
                  <li>• Type : {settings.type === "mixed" ? "Mélangé" : settings.type}</li>
                  <li>• Questions : {settings.questionCount}</li>
                  <li>• Temps : {settings.timeLimit === 0 ? "Illimité" : formatTime(settings.timeLimit)}</li>
                </ul>
              </div>

              <Button onClick={startQuiz} className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Commencer le Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState === "playing") {
    const currentQ = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                Question {currentQuestion + 1} / {questions.length}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {currentQ.type}
              </Badge>
            </div>
            {settings.timeLimit > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className={timeLeft < 60 ? "text-red-600 font-medium" : ""}>{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>

          <Progress value={progress} className="h-2 mb-6" />

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={answers[currentQuestion] === index ? "default" : "outline"}
                    className="h-auto p-4 text-left justify-start text-lg"
                    onClick={() => handleAnswer(index)}
                  >
                    <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                    {currentQ.type === "vocabulary" && option.match(/[\u4e00-\u9fff]/) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto"
                        onClick={(e) => {
                          e.stopPropagation()
                          playAudio(option)
                        }}
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    )}
                  </Button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Précédent
                </Button>

                <Button
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion] === undefined}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {currentQuestion === questions.length - 1 ? "Terminer" : "Suivant"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState === "results") {
    const score = calculateScore()

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="mb-4">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
              <h1 className="text-3xl font-bold text-gray-900">Quiz Terminé !</h1>
            </div>

            <Card className="max-w-md mx-auto mb-6">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-emerald-600">{score.percentage}%</div>
                  <div className="text-lg text-gray-600">
                    {score.correct} / {score.total} bonnes réponses
                  </div>
                  <div className="flex justify-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(score.percentage / 20) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Résultats détaillés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = answers[index]
                const isCorrect = userAnswer === question.correct

                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      ) : (
                        <X className="w-5 h-5 text-red-600 mt-1" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">
                          Question {index + 1}: {question.question}
                        </h4>
                        <div className="text-sm space-y-1">
                          <div className={`${isCorrect ? "text-green-700" : "text-red-700"}`}>
                            Votre réponse: {question.options[userAnswer] || "Non répondu"}
                          </div>
                          {!isCorrect && (
                            <div className="text-green-700">Bonne réponse: {question.options[question.correct]}</div>
                          )}
                          <div className="text-gray-600 bg-gray-50 p-2 rounded mt-2">{question.explanation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button onClick={resetQuiz} variant="outline" size="lg">
              <RotateCcw className="w-5 h-5 mr-2" />
              Nouveau Quiz
            </Button>
            <Button onClick={() => setGameState("setup")} className="bg-emerald-600 hover:bg-emerald-700" size="lg">
              <Settings className="w-5 h-5 mr-2" />
              Modifier Paramètres
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
