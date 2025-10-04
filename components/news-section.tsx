import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper, Clock, ArrowRight } from "lucide-react"

export default function NewsSection() {
  const articles = [
    {
      id: 1,
      title: "5 astuces pour améliorer ta prononciation anglaise",
      excerpt: "Découvre des techniques simples pour perfectionner ton accent et être mieux compris.",
      category: "Conseils",
      readTime: "3 min",
      publishedAt: "Il y a 2 jours",
      image: "/language-classroom.png",
      href: "/blog/pronunciation-tips",
    },
    {
      id: 2,
      title: "Nouvelle fonctionnalité: Conversations IA",
      excerpt: "Pratique tes conversations avec notre assistant IA disponible 24h/24.",
      category: "Nouveautés",
      readTime: "2 min",
      publishedAt: "Il y a 1 semaine",
      image: "/language-classroom.png",
      href: "/blog/ai-conversations",
    },
  ]

  return (
    <section aria-labelledby="news-title" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-emerald-600" />
          <h2 id="news-title" className="text-lg font-semibold">
            Actualités & Conseils
          </h2>
        </div>
        <Link href="/blog" className="text-sm text-muted-foreground hover:underline">
          Voir tous les articles
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <Card key={article.id} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </div>
              </div>
              <CardTitle className="text-base line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Image
                src={article.image || "/placeholder.svg"}
                alt=""
                width={300}
                height={160}
                className="w-full h-32 object-cover rounded-md"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
                <Link
                  href={article.href}
                  className="inline-flex items-center text-sm font-medium text-emerald-700 hover:underline"
                >
                  Lire <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
