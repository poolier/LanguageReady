"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, Play, Zap, CheckSquare, Square } from "lucide-react"

interface VocabWord {
  chinese: string
  pinyin: string
  translation: string
}

interface Chapter {
  id: number
  title: string
  words: VocabWord[]
}

export default function BookPage({ params }: { params: { bookId: string } }) {
  const [showPinyin, setShowPinyin] = useState(true)
  const [showTranslation, setShowTranslation] = useState(true)
  const [selectedChapters, setSelectedChapters] = useState<number[]>([])

  // Chargement dynamique du vocabulaire JSON
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [bookTitle, setBookTitle] = useState("")
  const [bookDescription, setBookDescription] = useState("")
  const bookId = params.bookId.toLowerCase()

  useEffect(() => {
    fetch(`/textbooks/${bookId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Fichier vocabulaire non trouvé')
        return res.json()
      })
      .then((data) => {
        // On suppose que le JSON est un tableau plat, on regroupe par chapitre
        const chaptersMap: { [id: number]: Chapter } = {}
        data.forEach((entry: any) => {
          const chapId = entry["Chapitre"]
          if (!chaptersMap[chapId]) {
            chaptersMap[chapId] = {
              id: chapId,
              title: `Chapitre ${chapId}`,
              words: []
            }
          }
          chaptersMap[chapId].words.push({
            chinese: entry["Zh"],
            pinyin: entry["Pinyin"],
            translation: entry["En"]
          })
        })
        setChapters(Object.values(chaptersMap))
        setBookTitle(data[0]?.Textbook || bookId.toUpperCase())
        setBookDescription("") // Ajoute une description si dispo dans le JSON
      })
      .catch(() => {
        setChapters([])
        setBookTitle("Livre non trouvé")
        setBookDescription("")
      })
  }, [bookId])

  // fallback pour la sélection des chapitres
  const allChapters = chapters
  const currentBook = { title: bookTitle, description: bookDescription, chapters: chapters }



  const toggleChapterSelection = (chapterId: number) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId],
    )
  }

  const selectAllChapters = () => {
    if (selectedChapters.length === allChapters.length) {
      setSelectedChapters([])
    } else {
      setSelectedChapters(allChapters.map((ch) => ch.id))
    }
  }

  const selectedWordsCount = allChapters
    .filter((ch) => selectedChapters.includes(ch.id))
    .reduce((total, ch) => total + ch.words.length, 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/textbook">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux manuels
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentBook.title}</h1>
              <p className="text-gray-600">{currentBook.description}</p>
            </div>

            {/* Column visibility controls */}
            <div className="flex gap-2">
              <Button variant={showPinyin ? "default" : "outline"} size="sm" onClick={() => setShowPinyin(!showPinyin)}>
                {showPinyin ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                Pinyin
              </Button>
              <Button
                variant={showTranslation ? "default" : "outline"}
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
              >
                {showTranslation ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                Traduction
              </Button>
            </div>
          </div>
        </header>

        {/* Chapter Selection and Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sélection des chapitres</span>
              <Button variant="outline" size="sm" onClick={selectAllChapters}>
                {selectedChapters.length === allChapters.length ? (
                  <Square className="h-4 w-4 mr-2" />
                ) : (
                  <CheckSquare className="h-4 w-4 mr-2" />
                )}
                {selectedChapters.length === allChapters.length ? "Désélectionner tout" : "Sélectionner tout"}
              </Button>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Sélectionnez les chapitres que vous souhaitez réviser, puis lancez un quiz ou des flashcards pour tester
              vos connaissances.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {allChapters.map((chapter) => (
                <div key={chapter.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`chapter-${chapter.id}`}
                    checked={selectedChapters.includes(chapter.id)}
                    onCheckedChange={() => toggleChapterSelection(chapter.id)}
                  />
                  <label
                    htmlFor={`chapter-${chapter.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Ch.{chapter.id}: {chapter.title}
                  </label>
                </div>
              ))}
            </div>

            {selectedChapters.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="text-sm text-emerald-700">
                  <strong>{selectedChapters.length}</strong> chapitre(s) sélectionné(s) •
                  <strong> {selectedWordsCount}</strong> mots
                </div>
                <div className="flex gap-2">
                  <Link href="/flashcards">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Flashcards
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Quiz
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vocabulary by Chapter */}
        <div className="space-y-8">
          {allChapters.map((chapter) => (
            <Card key={chapter.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Badge variant="outline">Chapitre {chapter.id}</Badge>
                  {chapter.title}
                  <span className="text-sm font-normal text-gray-500">({chapter.words.length} mots)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-medium">Caractère</th>
                        {showPinyin && <th className="text-left py-2 px-4 font-medium">Pinyin</th>}
                        {showTranslation && <th className="text-left py-2 px-4 font-medium">Traduction</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {chapter.words.map((word, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-lg">{word.chinese}</td>
                          {showPinyin && <td className="py-3 px-4 text-gray-600">{word.pinyin}</td>}
                          {showTranslation && <td className="py-3 px-4">{word.translation}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
