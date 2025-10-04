"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { BookOpen, Sigma, Headphones, Mic, Newspaper, PenLine, type LucideIcon } from "lucide-react"

type ColorKey = "emerald" | "amber" | "teal" | "rose" | "violet" | "cyan"

const colorMap: Record<ColorKey, { bg: string; text: string; ring: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  teal: { bg: "bg-teal-50", text: "text-teal-700", ring: "ring-teal-200" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-200" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-200" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-700", ring: "ring-cyan-200" },
}

const iconMap: Record<string, LucideIcon> = { BookOpen, Sigma, Headphones, Mic, Newspaper, PenLine }

export default function ActivityCard({
  title = "Vocabulaire",
  description = "Révise tes mots avec répétition espacée.",
  progress = 0,
  actionLabel = "Commencer",
  href = "#",
  color = "emerald",
  iconName = "BookOpen",
}: {
  title?: string
  description?: string
  progress?: number
  actionLabel?: string
  href?: string
  color?: ColorKey
  iconName?: keyof typeof iconMap | string
}) {
  const Icon = iconMap[iconName as string] ?? BookOpen
  const c = colorMap[color]

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-base">{title}</CardTitle>
        <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs ring-1", c.bg, c.text, c.ring)}>
          <Icon className={cn("mr-1 h-4 w-4", c.text)} />
          {Math.round(progress)}%
        </span>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        <Progress value={progress} aria-label={"Progression pour " + title} />
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-muted-foreground">
            10 min
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            Recommandé
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href={href}>{actionLabel}</Link>
        </Button>
        <Link href={href} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
          Détails
        </Link>
      </CardFooter>
    </Card>
  )
}
