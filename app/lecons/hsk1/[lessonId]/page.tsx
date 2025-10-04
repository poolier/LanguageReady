"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  CheckCircle,
  X,
  RotateCcw,
  BookOpen,
  PenTool,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface LessonContent {
  id: number
  title: string
  type: "vocabulary" | "grammar" | "dialogue" | "practice"
  sections: LessonSection[]
}

interface LessonSection {
  id: number
  type: "introduction" | "vocabulary" | "example" | "exercise" | "summary"
  title: string
  content: any
}

interface VocabularyItem {
  character: string
  pinyin: string
  meaning: string
  example: string
  exampleTranslation: string
}

const lessonData: { [key: string]: LessonContent } = {
  "1": {
    id: 1,
    title: "Salutations de base",
    type: "vocabulary",
    sections: [
      {
        id: 1,
        type: "introduction",
        title: "Introduction",
        content: {
          text: "Dans cette leçon, nous allons apprendre les salutations de base en chinois. Ces expressions sont essentielles pour commencer toute conversation.",
          objectives: [
            "Apprendre à dire bonjour et au revoir",
            "Maîtriser les expressions de politesse",
            "Comprendre les contextes d'utilisation",
          ],
        },
      },
      {
        id: 2,
        type: "vocabulary",
        title: "Vocabulaire principal",
        content: {
          words: [
            {
              character: "你好",
              pinyin: "nǐ hǎo",
              meaning: "Bonjour, salut",
              example: "你好，我是李明。",
              exampleTranslation: "Bonjour, je suis Li Ming.",
            },
            {
              character: "再见",
              pinyin: "zài jiàn",
              meaning: "Au revoir",
              example: "再见，明天见！",
              exampleTranslation: "Au revoir, à demain !",
            },
            {
              character: "谢谢",
              pinyin: "xiè xiè",
              meaning: "Merci",
              example: "谢谢你的帮助。",
              exampleTranslation: "Merci pour ton aide.",
            },
            {
              character: "不客气",
              pinyin: "bù kè qì",
              meaning: "De rien, je vous en prie",
              example: "不客气，这是我应该做的。",
              exampleTranslation: "De rien, c'est ce que je dois faire.",
            },
          ] as VocabularyItem[],
        },
      },
      {
        id: 3,
        type: "example",
        title: "Dialogue exemple",
        content: {
          dialogue: [
            { speaker: "A", text: "你好！", pinyin: "nǐ hǎo!", translation: "Bonjour !" },
            {
              speaker: "B",
              text: "你好！很高兴见到你。",
              pinyin: "nǐ hǎo! hěn gāo xìng jiàn dào nǐ.",
              translation: "Bonjour ! Ravi de te rencontrer.",
            },
            { speaker: "A", text: "谢谢！", pinyin: "xiè xiè!", translation: "Merci !" },
            {
              speaker: "B",
              text: "不客气。再见！",
              pinyin: "bù kè qì. zài jiàn!",
              translation: "De rien. Au revoir !",
            },
            { speaker: "A", text: "再见！", pinyin: "zài jiàn!", translation: "Au revoir !" },
          ],
        },
      },
      {
        id: 4,
        type: "exercise",
        title: "Exercice pratique",
        content: {
          questions: [
            {
              question: "Comment dit-on 'Bonjour' en chinois ?",
              options: ["你好", "再见", "谢谢", "不客气"],
              correct: 0,
              explanation: "你好 (nǐ hǎo) est la façon la plus courante de dire bonjour en chinois.",
            },
            {
              question: "Quelle est la réponse appropriée à '谢谢' ?",
              options: ["你好", "再见", "不客气", "谢谢"],
              correct: 2,
              explanation: "不客气 (bù kè qì) signifie 'de rien' et est la réponse appropriée à 'merci'.",
            },
            {
              question: "Comment dit-on 'Au revoir' ?",
              options: ["你好", "再见", "谢谢", "不客气"],
              correct: 1,
              explanation: "再见 (zài jiàn) signifie 'au revoir' en chinois.",
            },
          ],
        },
      },
      {
        id: 5,
        type: "summary",
        title: "Résumé",
        content: {
          text: "Félicitations ! Vous avez appris les salutations de base en chinois.",
          achievements: [
            "Maîtrise de 4 expressions essentielles",
            "Compréhension des contextes d'usage",
            "Pratique avec un dialogue réel",
          ],
          nextSteps: "Dans la prochaine leçon, nous apprendrons les nombres de 1 à 10.",
        },
      },
    ],
  },
}

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.lessonId as string
  const lesson = lessonData[lessonId]

  const [currentSection, setCurrentSection] = useState(0)
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null)
  const [exerciseAnswers, setExerciseAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Leçon non trouvée</h1>
          <Link href="/lecons/hsk1">
            <Button>Retour aux leçons</Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentSectionData = lesson.sections[currentSection]
  const progress = ((currentSection + 1) / lesson.sections.length) * 100

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "zh-CN"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const handleExerciseAnswer = (questionIndex: number, answerIndex: number) => {
    setExerciseAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const checkExerciseResults = () => {
    setShowResults(true)
  }

  const resetExercise = () => {
    setExerciseAnswers({})
    setShowResults(false)
  }

  const renderSection = () => {
    switch (currentSectionData.type) {
      case "introduction":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {currentSectionData.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{currentSectionData.content.text}</p>
              <div>
                <h4 className="font-semibold mb-2">Objectifs de la leçon :</h4>
                <ul className="list-disc list-inside space-y-1">
                  {currentSectionData.content.objectives.map((objective: string, index: number) => (
                    <li key={index} className="text-gray-600">
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )

      case "vocabulary":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {currentSectionData.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentSectionData.content.words.map((word: VocabularyItem, index: number) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedWord?.character === word.character
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedWord(word)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900 mr-3">{word.character}</span>
                          <span className="text-gray-600">{word.pinyin}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            playAudio(word.character)
                          }}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{word.meaning}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedWord && (
              <Card>
                <CardHeader>
                  <CardTitle>Détails du mot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-gray-900 mb-2">{selectedWord.character}</div>
                    <div className="text-xl text-gray-600 mb-1">{selectedWord.pinyin}</div>
                    <div className="text-lg text-gray-800">{selectedWord.meaning}</div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Exemple d'usage :</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-medium">{selectedWord.example}</span>
                        <Button variant="ghost" size="sm" onClick={() => playAudio(selectedWord.example)}>
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{selectedWord.exampleTranslation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case "example":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {currentSectionData.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSectionData.content.dialogue.map((line: any, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <Badge variant="secondary" className="mt-1">
                      {line.speaker}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-medium">{line.text}</span>
                        <Button variant="ghost" size="sm" onClick={() => playAudio(line.text)}>
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{line.pinyin}</div>
                      <div className="text-sm text-gray-700">{line.translation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "exercise":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="w-5 h-5" />
                {currentSectionData.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentSectionData.content.questions.map((question: any, qIndex: number) => (
                  <div key={qIndex} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">
                      Question {qIndex + 1}: {question.question}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option: string, oIndex: number) => {
                        const isSelected = exerciseAnswers[qIndex] === oIndex
                        const isCorrect = oIndex === question.correct
                        const showResult = showResults

                        return (
                          <Button
                            key={oIndex}
                            variant={isSelected ? "default" : "outline"}
                            className={`text-left justify-start h-auto p-3 ${
                              showResult
                                ? isCorrect
                                  ? "bg-green-100 border-green-500 text-green-800"
                                  : isSelected && !isCorrect
                                    ? "bg-red-100 border-red-500 text-red-800"
                                    : ""
                                : ""
                            }`}
                            onClick={() => !showResults && handleExerciseAnswer(qIndex, oIndex)}
                            disabled={showResults}
                          >
                            <span className="text-lg mr-2">{option}</span>
                            {showResult && isCorrect && <CheckCircle className="w-4 h-4 ml-auto" />}
                            {showResult && isSelected && !isCorrect && <X className="w-4 h-4 ml-auto" />}
                          </Button>
                        )
                      })}
                    </div>
                    {showResults && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex gap-2">
                  {!showResults ? (
                    <Button
                      onClick={checkExerciseResults}
                      disabled={Object.keys(exerciseAnswers).length !== currentSectionData.content.questions.length}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Vérifier les réponses
                    </Button>
                  ) : (
                    <Button onClick={resetExercise} variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Recommencer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "summary":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                {currentSectionData.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{currentSectionData.content.text}</p>

              <div>
                <h4 className="font-semibold mb-2">Ce que vous avez accompli :</h4>
                <ul className="list-disc list-inside space-y-1">
                  {currentSectionData.content.achievements.map((achievement: string, index: number) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-semibold text-emerald-800 mb-2">Prochaine étape :</h4>
                <p className="text-emerald-700">{currentSectionData.content.nextSteps}</p>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/lecons/hsk1">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux leçons
              </Button>
            </Link>
            <Badge variant="secondary" className="text-sm">
              Section {currentSection + 1} sur {lesson.sections.length}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          <Progress value={progress} className="h-2 mb-4" />
        </div>

        {/* Content */}
        <div className="mb-6">{renderSection()}</div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          <span className="text-sm text-gray-600">{currentSectionData.title}</span>

          {currentSection < lesson.sections.length - 1 ? (
            <Button
              onClick={() => setCurrentSection(currentSection + 1)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Link href="/lecons/hsk1">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Terminer la leçon
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
