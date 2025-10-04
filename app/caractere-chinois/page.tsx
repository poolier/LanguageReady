"use client"

import { CardDescription } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Volume2, Search, BookOpen, Zap, Star, Plus, Brain } from "lucide-react"

interface ChineseCharacter {
  character: string
  pinyin: string
  meaning: string
  hsk: number
  frequency: number
  strokes: number
  strokeOrder: string[]
  vocabulary: { word: string; pinyin: string; meaning: string }[]
  examples: { chinese: string; pinyin: string; english: string; french: string }[]
}

const mockCharacters: ChineseCharacter[] = [
  {
    character: "你",
    pinyin: "nǐ",
    meaning: "tu, vous",
    hsk: 1,
    frequency: 98,
    strokes: 7,
    strokeOrder: ["丿", "亻", "小", "亅", "丶", "丿", "乀"],
    vocabulary: [
      { word: "你好", pinyin: "nǐ hǎo", meaning: "bonjour" },
      { word: "你们", pinyin: "nǐ men", meaning: "vous (pluriel)" },
      { word: "你的", pinyin: "nǐ de", meaning: "ton, votre" },
    ],
    examples: [
      { chinese: "你好吗？", pinyin: "Nǐ hǎo ma?", english: "How are you?", french: "Comment allez-vous ?" },
      {
        chinese: "你叫什么名字？",
        pinyin: "Nǐ jiào shénme míngzi?",
        english: "What's your name?",
        french: "Comment vous appelez-vous ?",
      },
    ],
  },
  {
    character: "我",
    pinyin: "wǒ",
    meaning: "je, moi",
    hsk: 1,
    frequency: 95,
    strokes: 7,
    strokeOrder: ["丿", "一", "丨", "一", "丿", "乀", "丶"],
    vocabulary: [
      { word: "我们", pinyin: "wǒ men", meaning: "nous" },
      { word: "我的", pinyin: "wǒ de", meaning: "mon, ma, mes" },
      { word: "我是", pinyin: "wǒ shì", meaning: "je suis" },
    ],
    examples: [
      { chinese: "我是学生。", pinyin: "Wǒ shì xuéshēng.", english: "I am a student.", french: "Je suis étudiant." },
      {
        chinese: "我喜欢中文。",
        pinyin: "Wǒ xǐhuān zhōngwén.",
        english: "I like Chinese.",
        french: "J'aime le chinois.",
      },
    ],
  },
  {
    character: "好",
    pinyin: "hǎo",
    meaning: "bon, bien",
    hsk: 1,
    frequency: 92,
    strokes: 6,
    strokeOrder: ["女", "子"],
    vocabulary: [
      { word: "你好", pinyin: "nǐ hǎo", meaning: "bonjour" },
      { word: "很好", pinyin: "hěn hǎo", meaning: "très bien" },
      { word: "好的", pinyin: "hǎo de", meaning: "d'accord" },
    ],
    examples: [
      {
        chinese: "今天天气很好。",
        pinyin: "Jīntiān tiānqì hěn hǎo.",
        english: "The weather is very good today.",
        french: "Il fait très beau aujourd'hui.",
      },
      {
        chinese: "这个很好吃。",
        pinyin: "Zhège hěn hǎochī.",
        english: "This is very delicious.",
        french: "C'est très délicieux.",
      },
    ],
  },
  {
    character: "学",
    pinyin: "xué",
    meaning: "apprendre, étudier",
    hsk: 1,
    frequency: 88,
    strokes: 8,
    strokeOrder: ["丶", "丶", "冖", "子"],
    vocabulary: [
      { word: "学生", pinyin: "xuéshēng", meaning: "étudiant" },
      { word: "学校", pinyin: "xuéxiào", meaning: "école" },
      { word: "学习", pinyin: "xuéxí", meaning: "étudier" },
    ],
    examples: [
      {
        chinese: "我在学中文。",
        pinyin: "Wǒ zài xué zhōngwén.",
        english: "I am learning Chinese.",
        french: "J'apprends le chinois.",
      },
      {
        chinese: "他是大学生。",
        pinyin: "Tā shì dàxuéshēng.",
        english: "He is a university student.",
        french: "Il est étudiant universitaire.",
      },
    ],
  },
  {
    character: "是",
    pinyin: "shì",
    meaning: "être",
    hsk: 1,
    frequency: 94,
    strokes: 9,
    strokeOrder: ["日", "一", "丶", "一", "丨", "一", "一", "丨", "一"],
    vocabulary: [
      { word: "我是", pinyin: "wǒ shì", meaning: "je suis" },
      { word: "不是", pinyin: "bù shì", meaning: "ne pas être" },
      { word: "就是", pinyin: "jiù shì", meaning: "c'est exactement" },
    ],
    examples: [
      { chinese: "我是老师。", pinyin: "Wǒ shì lǎoshī.", english: "I am a teacher.", french: "Je suis professeur." },
    ],
  },
  {
    character: "有",
    pinyin: "yǒu",
    meaning: "avoir",
    hsk: 1,
    frequency: 91,
    strokes: 6,
    strokeOrder: ["一", "丿", "丨", "丶", "一", "丨"],
    vocabulary: [
      { word: "有的", pinyin: "yǒu de", meaning: "certains" },
      { word: "没有", pinyin: "méi yǒu", meaning: "ne pas avoir" },
      { word: "拥有", pinyin: "yōng yǒu", meaning: "posséder" },
    ],
    examples: [
      { chinese: "我有一本书。", pinyin: "Wǒ yǒu yī běn shū.", english: "I have a book.", french: "J'ai un livre." },
    ],
  },
]

export default function ChineseCharacterPage() {
  const [characters] = useState<ChineseCharacter[]>(mockCharacters)
  const [searchTerm, setSearchTerm] = useState("")
  const [hskFilter, setHskFilter] = useState<string>("all")
  const [filteredCharacters, setFilteredCharacters] = useState<ChineseCharacter[]>(characters)
  const [studyList, setStudyList] = useState<string[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<ChineseCharacter | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    let filtered = characters

    if (searchTerm) {
      filtered = filtered.filter(
        (char) =>
          char.character.includes(searchTerm) ||
          char.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          char.meaning.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (hskFilter !== "all") {
      filtered = filtered.filter((char) => char.hsk === Number.parseInt(hskFilter))
    }

    setFilteredCharacters(filtered)
  }, [searchTerm, hskFilter, characters])

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "zh-CN"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const addToStudyList = (character: string) => {
    if (!studyList.includes(character)) {
      setStudyList([...studyList, character])
    }
  }

  const explainWithAI = (character: ChineseCharacter) => {
    alert(
      `Explication IA pour ${character.character} (${character.pinyin}): Cette fonctionnalité sera bientôt disponible avec une intégration IA complète pour expliquer l'étymologie, l'usage contextuel et les nuances culturelles du caractère.`,
    )
  }

  const openCharacterPopup = (character: ChineseCharacter) => {
    setSelectedCharacter(character)
    setIsPopupOpen(true)
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
              <h1 className="text-3xl font-bold text-gray-900">Caractères Chinois</h1>
              <p className="text-gray-600">Cliquez sur un caractère pour voir ses détails</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par caractère, pinyin ou signification..."
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
            {[1, 2, 3, 4, 5, 6, 7].map((level) => (
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredCharacters.map((char, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => openCharacterPopup(char)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">{char.character}</div>
                <div className="text-sm font-medium text-gray-700 mb-1">{char.pinyin}</div>
                <div className="text-xs text-gray-500 mb-2 line-clamp-2">{char.meaning}</div>
                <div className="flex items-center justify-between">
                  <Badge className={`text-xs ${getHSKColor(char.hsk)}`}>HSK {char.hsk}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-gray-500">{char.frequency}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedCharacter && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-6xl font-bold text-red-600">{selectedCharacter.character}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-2xl font-bold">{selectedCharacter.pinyin}</h2>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => playAudio(selectedCharacter.character)}
                            className="h-8 w-8 p-0"
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-lg text-gray-700">{selectedCharacter.meaning}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getHSKColor(selectedCharacter.hsk)}>HSK {selectedCharacter.hsk}</Badge>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Fréquence: {selectedCharacter.frequency}%</span>
                      </div>
                      <p className="text-sm text-gray-600">{selectedCharacter.strokes} traits</p>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => addToStudyList(selectedCharacter.character)}
                      disabled={studyList.includes(selectedCharacter.character)}
                      className="flex items-center gap-2"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4" />
                      {studyList.includes(selectedCharacter.character) ? "Ajouté à la liste" : "Add to Study List"}
                    </Button>
                    <Button
                      onClick={() => explainWithAI(selectedCharacter)}
                      className="flex items-center gap-2"
                      variant="outline"
                    >
                      <Brain className="h-4 w-4" />
                      Explain with AI
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ordre des traits</CardTitle>
                      <CardDescription>Séquence pour écrire le caractère correctement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedCharacter.strokeOrder.map((stroke, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="text-lg font-mono">{stroke}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Vocabulaire contenant ce caractère</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {selectedCharacter.vocabulary.map((word, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-xl font-bold text-red-600">{word.word}</span>
                              <div>
                                <p className="font-medium">{word.pinyin}</p>
                                <p className="text-sm text-gray-600">{word.meaning}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => playAudio(word.word)}
                              className="h-8 w-8 p-0"
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Phrases d'exemple</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedCharacter.examples.map((example, index) => (
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
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
