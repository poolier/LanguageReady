import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Target } from "lucide-react"
import Image from "next/image"

export default function TextbookPage() {
  const hskBooks = [
    {
      id: "hsk1",
      title: "HSK 1",
      description: "Niveau débutant - Bases essentielles",
      words: 150,
      chapters: 15,
      difficulty: "Débutant",
      color: "bg-emerald-50 border-emerald-200",
      textColor: "text-emerald-700",
    },
    {
      id: "hsk2",
      title: "HSK 2",
      description: "Niveau élémentaire - Conversations simples",
      words: 300,
      chapters: 20,
      difficulty: "Élémentaire",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
    {
      id: "hsk3",
      title: "HSK 3",
      description: "Niveau intermédiaire - Communication quotidienne",
      words: 600,
      chapters: 25,
      difficulty: "Intermédiaire",
      color: "bg-amber-50 border-amber-200",
      textColor: "text-amber-700",
    },
    {
      id: "hsk4",
      title: "HSK 4",
      description: "Niveau intermédiaire supérieur",
      words: 1200,
      chapters: 30,
      difficulty: "Inter. Sup.",
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700",
    },
    {
      id: "hsk5",
      title: "HSK 5",
      description: "Niveau avancé - Textes complexes",
      words: 2500,
      chapters: 35,
      difficulty: "Avancé",
      color: "bg-red-50 border-red-200",
      textColor: "text-red-700",
    },
    {
      id: "hsk6",
      title: "HSK 6",
      description: "Niveau supérieur - Maîtrise complète",
      words: 5000,
      chapters: 40,
      difficulty: "Supérieur",
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
    },
  ]

  const taiwanBooks = [
    {
      id: "taiwan1",
      title: "Taiwan 1",
      description: "Chinois traditionnel - Niveau débutant",
      words: 200,
      chapters: 12,
      difficulty: "Débutant",
      color: "bg-teal-50 border-teal-200",
      textColor: "text-teal-700",
    },
    {
      id: "taiwan2",
      title: "Taiwan 2",
      description: "Chinois traditionnel - Niveau élémentaire",
      words: 400,
      chapters: 16,
      difficulty: "Élémentaire",
      color: "bg-cyan-50 border-cyan-200",
      textColor: "text-cyan-700",
    },
    {
      id: "taiwan3",
      title: "Taiwan 3",
      description: "Chinois traditionnel - Niveau intermédiaire",
      words: 800,
      chapters: 20,
      difficulty: "Intermédiaire",
      color: "bg-indigo-50 border-indigo-200",
      textColor: "text-indigo-700",
    },
    {
      id: "taiwan4",
      title: "Taiwan 4",
      description: "Chinois traditionnel - Niveau inter. sup.",
      words: 1500,
      chapters: 24,
      difficulty: "Inter. Sup.",
      color: "bg-violet-50 border-violet-200",
      textColor: "text-violet-700",
    },
    {
      id: "taiwan5",
      title: "Taiwan 5",
      description: "Chinois traditionnel - Niveau avancé",
      words: 3000,
      chapters: 28,
      difficulty: "Avancé",
      color: "bg-pink-50 border-pink-200",
      textColor: "text-pink-700",
    },
    {
      id: "taiwan6",
      title: "Taiwan 6",
      description: "Chinois traditionnel - Niveau supérieur",
      words: 6000,
      chapters: 32,
      difficulty: "Supérieur",
      color: "bg-rose-50 border-rose-200",
      textColor: "text-rose-700",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manuel de Vocabulaire</h1>
          <p className="text-gray-600">Explorez les manuels HSK et Taiwan pour enrichir votre vocabulaire chinois</p>
        </header>

        {/* HSK Books Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Manuels HSK</h2>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
              Chinois Simplifié
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hskBooks.map((book) => (
              <Card key={book.id} className={`${book.color} hover:shadow-lg transition-shadow`}>
                <CardHeader className="pb-3">
                  <div className="w-full h-48 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                    <Image
                      src={`/hsk-.png?key=pcjaj&height=192&width=144&query=HSK ${book.title} textbook cover`}
                      alt={`Couverture ${book.title}`}
                      width={144}
                      height={192}
                      className="rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-xl ${book.textColor}`}>{book.title}</CardTitle>
                    <Badge variant="outline" className={book.textColor}>
                      {book.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">{book.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span>{book.words} mots</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span>{book.chapters} chapitres</span>
                    </div>
                  </div>

                  <Link href={`/textbook/${book.id}`}>
                    <Button className={`w-full ${book.textColor} hover:opacity-90`} variant="outline">
                      Ouvrir le manuel
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Taiwan Books Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-teal-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Manuels Taiwan</h2>
            <Badge variant="secondary" className="bg-teal-100 text-teal-700">
              Chinois Traditionnel
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {taiwanBooks.map((book) => (
              <Card key={book.id} className={`${book.color} hover:shadow-lg transition-shadow`}>
                <CardHeader className="pb-3">
                  <div className="w-full h-48 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                    <Image
                      src={`/taiwan-.png?key=el7th&height=192&width=144&query=Taiwan ${book.title} traditional Chinese textbook cover`}
                      alt={`Couverture ${book.title}`}
                      width={144}
                      height={192}
                      className="rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-xl ${book.textColor}`}>{book.title}</CardTitle>
                    <Badge variant="outline" className={book.textColor}>
                      {book.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">{book.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span>{book.words} mots</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span>{book.chapters} chapitres</span>
                    </div>
                  </div>

                  <Link href={`/textbook/${book.id}`}>
                    <Button className={`w-full ${book.textColor} hover:opacity-90`} variant="outline">
                      Ouvrir le manuel
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
