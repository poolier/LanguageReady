"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"

type Lang = {
  code: string
  label: string
  flag: string // simple emoji fallback
}

const languages: Lang[] = [
  { code: "en", label: "Anglais", flag: "🇬🇧" },
  { code: "es", label: "Espagnol", flag: "🇪🇸" },
  { code: "de", label: "Allemand", flag: "🇩🇪" },
  { code: "it", label: "Italien", flag: "🇮🇹" },
  { code: "ja", label: "Japonais", flag: "🇯🇵" },
]

export default function LanguageSelector({
  initial = "en",
}: {
  initial?: string
}) {
  const [active, setActive] = useState(initial)
  const current = languages.find((l) => l.code === active) ?? languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label="Changer la langue d'apprentissage">
          <span className="mr-2">{current.flag}</span>
          {current.label}
          <Languages className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((l) => (
          <DropdownMenuItem key={l.code} onClick={() => setActive(l.code)} aria-label={"Choisir " + l.label}>
            <span className="mr-2">{l.flag}</span>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
