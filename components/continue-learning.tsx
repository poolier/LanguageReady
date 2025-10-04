import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Play } from "lucide-react"

export default function ContinueLearning({
  title = "Leçon 3 — Se présenter",
  description = "Apprends à saluer et te présenter dans une conversation simple.",
  imageSrc = "/language-classroom.png",
  progress = 45,
  durationMin = 12,
  href = "#",
}: {
  title?: string
  description?: string
  imageSrc?: string
  progress?: number
  durationMin?: number
  href?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Continuer</CardTitle>
        <CardDescription>Reprends là où tu t{"'"}es arrêté(e)</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-[220px_1fr]">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt="Illustration de la leçon en cours"
          width={320}
          height={160}
          className="aspect-video w-full rounded-md object-cover sm:w-[220px]"
        />
        <div className="space-y-3">
          <div>
            <h3 className="text-base font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="w-full" aria-label="Progression de la leçon" />
            <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {durationMin} min restantes
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href={href}>
            <Play className="mr-2 h-4 w-4" />
            Reprendre
          </Link>
        </Button>
        <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
          Voir la leçon
        </Link>
      </CardFooter>
    </Card>
  )
}
