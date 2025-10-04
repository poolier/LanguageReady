"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, Check, X, Volume2, ChevronLeft, ChevronRight } from "lucide-react"

interface VocabWord {
  chinese: string
  pinyin: string
  translation: string
}

export default function FlashcardsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set())

  // Sample data - would come from selected chapters
  const flashcards: VocabWord[] = [
    { chinese: "你好", pinyin: "nǐ hǎo", translation: "bonjour" },
    { chinese: "我", pinyin: "wǒ", translation: "je/moi" },
    { chinese: "你", pinyin: "nǐ", translation: "tu/toi" },
    { chinese: "他", pinyin: "tā", translation: "il/lui" },
    { chinese: "她", pinyin: "tā", translation: "elle" },
    { chinese: "一", pinyin: "yī", translation: "un" },
    { chinese: "二", pinyin: "èr", translation: "deux" },
    { chinese: "三", pinyin: "sāam", translation: "trois" },
    { chinese: "家", pinyin: "jiā", translation: "famille/maison" },
    { chinese: "爸爸", pinyin: "bàba", translation: "papa" },
  ]

  const currentCard = flashcards[currentIndex]
  const progress = ((currentIndex + 1) / flashcards.length) * 100
  const totalAnswered = correctCount + incorrectCount

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "zh-CN"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (completedCards.has(currentIndex)) return

    setCompletedCards((prev) => new Set([...prev, currentIndex]))

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1)
    } else {
      setIncorrectCount((prev) => prev + 1)
    }

    // Auto advance after a short delay
    setTimeout(() => {
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex((prev) => prev + 1)
        setShowAnswer(false)
      }
    }, 1000)
  }

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setShowAnswer(false)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setShowAnswer(false)
    }
  }

  const resetSession = () => {
    setCurrentIndex(0)
    setShowAnswer(false)
    setCorrectCount(0)
    setIncorrectCount(0)
    setCompletedCards(new Set())
  }

  const isCompleted = currentIndex === flashcards.length - 1 && completedCards.has(currentIndex)

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/textbook">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux manuels
              </Button>
            </Link>

            <Button variant="outline" size="sm" onClick={resetSession}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Recommencer
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Flashcards</h1>
            <p className="text-gray-600 mb-4">Révisez votre vocabulaire chinois</p>

            {/* Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  Carte {currentIndex + 1} sur {flashcards.length}
                </span>
                <span>{Math.round(progress)}% complété</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="flex justify-center gap-4 mb-8">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" />
            Correct: {correctCount}
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="h-3 w-3 mr-1" />
            Incorrect: {incorrectCount}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Total: {totalAnswered}
          </Badge>
        </div>

        {!isCompleted ? (
          /* Flashcard */
          <div className="max-w-2xl mx-auto">
            <div className="flashcard-container" style={{ perspective: "1000px", height: "400px" }}>
              <div
                className={`flashcard ${showAnswer ? "flipped" : ""}`}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s",
                  transform: showAnswer ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front Face */}
                <Card
                  className="flashcard-face flashcard-front shadow-lg"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardContent className="text-center space-y-6 p-8">
                    <div className="space-y-4">
                      <div className="text-6xl font-bold text-gray-900 mb-4">{currentCard.chinese}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playAudio(currentCard.chinese)}
                        className="mb-6"
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Écouter
                      </Button>
                    </div>

                    <Button
                      onClick={() => setShowAnswer(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
                    >
                      Voir la réponse
                    </Button>
                  </CardContent>
                </Card>

                {/* Back Face */}
                <Card
                  className="flashcard-face flashcard-back shadow-lg"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardContent className="text-center space-y-6 p-8">
                    <div className="space-y-4">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{currentCard.chinese}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playAudio(currentCard.chinese)}
                        className="mb-4"
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Écouter
                      </Button>
                    </div>

                    <div className="p-6 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                      <div className="text-2xl font-semibold text-emerald-800 mb-2">{currentCard.pinyin}</div>
                      <div className="text-xl text-emerald-700">{currentCard.translation}</div>
                    </div>

                    {!completedCards.has(currentIndex) && (
                      <div className="flex gap-4 justify-center">
                        <Button
                          onClick={() => handleAnswer(false)}
                          variant="outline"
                          className="border-red-200 text-red-700 hover:bg-red-50 px-6 py-3"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Incorrect
                        </Button>
                        <Button
                          onClick={() => handleAnswer(true)}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Correct
                        </Button>
                      </div>
                    )}

                    <Button onClick={() => setShowAnswer(false)} variant="outline" className="mt-4">
                      Retourner la carte
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" onClick={prevCard} disabled={currentIndex === 0}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>

              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {flashcards.length}
              </span>

              <Button variant="outline" onClick={nextCard} disabled={currentIndex === flashcards.length - 1}>
                Suivant
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <CardContent className="space-y-6">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900">Session terminée !</h2>
                <p className="text-gray-600">Félicitations ! Vous avez terminé toutes les flashcards.</p>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{correctCount}</div>
                    <div className="text-sm text-green-700">Correct</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
                    <div className="text-sm text-red-700">Incorrect</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((correctCount / totalAnswered) * 100)}%
                    </div>
                    <div className="text-sm text-blue-700">Réussite</div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button onClick={resetSession} className="bg-emerald-600 hover:bg-emerald-700">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Recommencer
                  </Button>
                  <Link href="/textbook">
                    <Button variant="outline">Retour aux manuels</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
