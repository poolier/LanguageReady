"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Headphones, Mic, Rocket, SpellCheck2 } from "lucide-react"

export default function QuickActions({
  compact = false,
}: {
  compact?: boolean
}) {
  return (
    <Card className="p-3 sm:p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Button
          asChild
          className="justify-start gap-2 bg-emerald-600 hover:bg-emerald-700"
          size={compact ? "sm" : "default"}
        >
          <Link href="#">
            <Rocket className="h-4 w-4" />
            Leçon du jour
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="justify-start gap-2 bg-transparent"
          size={compact ? "sm" : "default"}
        >
          <Link href="#">
            <SpellCheck2 className="h-4 w-4" />
            Réviser les mots
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="justify-start gap-2 bg-transparent"
          size={compact ? "sm" : "default"}
        >
          <Link href="#">
            <Mic className="h-4 w-4" />
            Parler
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="justify-start gap-2 bg-transparent"
          size={compact ? "sm" : "default"}
        >
          <Link href="#">
            <Headphones className="h-4 w-4" />
            Écouter
          </Link>
        </Button>
      </div>
    </Card>
  )
}
