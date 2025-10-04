"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Volume2, Search, BookOpen, Zap, Star, Plus } from "lucide-react"

interface ChineseWord {
  word: string
  pinyin: string
  meaning: string
  hsk: number
  frequency: number
  examples: { chinese: string; pinyin: string; english: string; french: string }[]
  synonyms: string[]
}

const mockWords: ChineseWord[] = [
  {
    word: "你好",
    pinyin: "nǐ hǎo",
    meaning: "bonjour, salut",
    hsk: 1,
    frequency: 95,
    examples: [
      { chinese: "你好！", pinyin: "Nǐ hǎo!", english: "Hello!", french: "Bonjour !" },
      { chinese: "你好吗？", pinyin: "Nǐ hǎo ma?", english: "How are you?", french: "Comment allez-vous ?" },
    ],
    synonyms: ["您好", "嗨"],
  },
  {
    word: "谢谢",
    pinyin: "xiè xiè",
    meaning: "merci",
    hsk: 1,
    frequency: 88,
    examples: [
      { chinese: "谢谢你！", pinyin: "Xiè xiè nǐ!", english: "Thank you!", french: "Merci !" },
      {
        chinese: "非常谢谢。",
        pinyin: "Fēicháng xiè xiè.",
        english: "Thank you very much.",
        french: "Merci beaucoup.",
      },
    ],
    synonyms: ["感谢", "多谢"],
  },
  {
    word: "学习",
    pinyin: "xué xí",
    meaning: "étudier, apprendre",
    hsk: 1,
    frequency: 85,
    examples: [
      {
        chinese: "我在学习中文。",
        pinyin: "Wǒ zài xué xí zhōng wén.",
        english: "I am studying Chinese.",
        french: "J'étudie le chinois.",
      },
      {
        chinese: "学习很重要。",
        pinyin: "Xué xí hěn zhòng yào.",
        english: "Studying is important.",
        french: "Étudier est important.",
      },
    ],
    synonyms: ["读书", "念书"],
  },
  {
    word: "水",
    pinyin: "shuǐ",
    meaning: "eau",
    hsk: 1,
    frequency: 92,
    examples: [
      {
        chinese: "我要喝水。",
        pinyin: "Wǒ yào hē shuǐ.",
        english: "I want to drink water.",
        french: "Je veux boire de l'eau.",
      },
      {
        chinese: "这水很干净。",
        pinyin: "Zhè shuǐ hěn gānjìng.",
        english: "This water is clean.",
        french: "Cette eau est propre.",
      },
    ],
    synonyms: ["H2O"],
  },
  {
    word: "吃",
    pinyin: "chī",
    meaning: "manger",
    hsk: 1,
    frequency: 89,
    examples: [
      { chinese: "我想吃饭。", pinyin: "Wǒ xiǎng chī fàn.", english: "I want to eat.", french: "Je veux manger." },
      { chinese: "你吃了吗？", pinyin: "Nǐ chī le ma?", english: "Have you eaten?", french: "As-tu mangé ?" },
    ],
    synonyms: ["用餐", "进食"],
  },
]

export default function ChineseVocabularyPage() {
  const [words] = useState<ChineseWord[]>(mockWords)
  const [searchTerm, setSearchTerm] = useState("")
  const [hskFilter, setHskFilter] = useState<string>("all")
  const [filteredWords, setFilteredWords] = useState<ChineseWord[]>(words)
  const [studyList, setStudyList] = useState<string[]>([])
  const [selectedWord, setSelectedWord] = useState<ChineseWord | null>(words[0])

  useEffect(() => {
    let filtered = words

    if (searchTerm) {
      filtered = filtered.filter(
        (word) =>
          word.word.includes(searchTerm) ||
          word.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word.meaning.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (hskFilter !== "all") {
      filtered = filtered.filter((word) => word.hsk === Number.parseInt(hskFilter))
    }

    setFilteredWords(filtered)
    if (filtered.length > 0 && !filtered.includes(selectedWord!)) {
      setSelectedWord(filtered[0])
    }
  }, [searchTerm, hskFilter, words, selectedWord])

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "zh-CN"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const addToStudyList = (word: string) => {
    if (!studyList.includes(word)) {
      setStudyList([...studyList, word])
    }
  }

  const getHSKColor = (hsk: number) => {
    const colors = {
      1: "bg-green-100 text-green-800 border-green-200",
      2: "bg-blue-100 text-blue-800 border-blue-200",
      3: "bg-yellow-100 text-yellow-800 border-yellow-200",
      4: "bg-orange-100 text-orange-800 border-orange-200",
      5: "bg-red-100 text-red-800 border-red-200",
      6: "bg-purple-100 text-purple-800 border-purple-200",
    }
    return colors[hsk as keyof typeof colors] || colors[1]
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vocabulaire Chinois</h1>
              <p className="text-gray-600">Apprenez les mots et expressions essentiels</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par mot, pinyin ou signification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={hskFilter} onValueChange={setHskFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Niveau HSK" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="1">HSK 1</SelectItem>
                <SelectItem value="2">HSK 2</SelectItem>
                <SelectItem value="3">HSK 3</SelectItem>
                <SelectItem value="4">HSK 4</SelectItem>
                <SelectItem value="5">HSK 5</SelectItem>
                <SelectItem value="6">HSK 6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={hskFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setHskFilter("all")}
              className="h-8"
            >
              Tous
            </Button>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <Button
                key={level}
                variant={hskFilter === level.toString() ? "default" : "outline"}
                size="sm"
                onClick={() => setHskFilter(level.toString())}
                className={`h-8 ${hskFilter === level.toString() ? getHSKColor(level) : ""}`}
              >
                HSK {level}
              </Button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Word list */}
          <div className="lg:col-span-1">
            <Card className="h-fit max-h-[calc(100vh-200px)] overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">Liste des mots ({filteredWords.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredWords.map((word, index) => (
                    <div
                      key={index}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedWord?.word === word.word ? "bg-red-50 border-l-4 border-l-red-500" : ""
                      }`}
                      onClick={() => setSelectedWord(word)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold text-red-600">{word.word}</div>
                        <Badge className={`text-xs ${getHSKColor(word.hsk)}`}>HSK {word.hsk}</Badge>
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-1">{word.pinyin}</div>
                      <div className="text-sm text-gray-600">{word.meaning}</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-gray-500">{word.frequency}%</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            playAudio(word.word)
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Word details */}
          <div className="lg:col-span-2">
            {selectedWord ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-6xl font-bold text-red-600">{selectedWord.word}</span>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-2xl font-bold">{selectedWord.pinyin}</h2>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => playAudio(selectedWord.word)}
                              className="h-8 w-8 p-0"
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-lg text-gray-700">{selectedWord.meaning}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={getHSKColor(selectedWord.hsk)}>HSK {selectedWord.hsk}</Badge>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Fréquence: {selectedWord.frequency}%</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => addToStudyList(selectedWord.word)}
                        disabled={studyList.includes(selectedWord.word)}
                        className="flex items-center gap-2"
                        variant="outline"
                      >
                        <Plus className="h-4 w-4" />
                        {studyList.includes(selectedWord.word) ? "Ajouté à la liste" : "Add to Study List"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Synonymes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedWord.synonyms.map((synonym, index) => (
                        <Badge key={index} variant="secondary">
                          {synonym}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Exemples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedWord.examples.map((example, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-lg font-bold text-red-600">{example.chinese}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => playAudio(example.chinese)}
                              className="h-8 w-8 p-0"
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-gray-700 mb-1">{example.pinyin}</p>
                          <Separator className="my-2" />
                          <p className="text-sm text-gray-600 mb-1">{example.english}</p>
                          <p className="text-sm text-blue-600">{example.french}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Sélectionnez un mot dans la liste pour voir ses détails</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
