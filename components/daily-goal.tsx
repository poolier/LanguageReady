"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

export default function DailyGoal({
  defaultGoalMinutes = 20,
  defaultProgressMinutes = 0,
}: {
  defaultGoalMinutes?: number
  defaultProgressMinutes?: number
}) {
  const [goal, setGoal] = useState(defaultGoalMinutes)
  const [progressMin] = useState(defaultProgressMinutes)

  const value = useMemo(() => {
    if (goal <= 0) return 0
    return Math.min(100, Math.round((progressMin / goal) * 100))
  }, [goal, progressMin])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Objectif quotidien</CardTitle>
        <CardDescription>Définis un objectif atteignable</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Progression</div>
          <div className="text-sm font-medium">
            {progressMin} / {goal} min
          </div>
        </div>
        <Progress value={value} aria-label="Progression de l'objectif quotidien" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Diminuer l'objectif"
              onClick={() => setGoal((g) => Math.max(5, g - 5))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-[3ch] text-center text-sm">{goal} min</span>
            <Button
              variant="outline"
              size="icon"
              aria-label="Augmenter l'objectif"
              onClick={() => setGoal((g) => Math.min(120, g + 5))}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700" size="sm">
            Enregistrer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
