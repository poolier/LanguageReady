"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DayStat = {
  day: string
  minutes: number
}

export default function WeeklyActivity({
  data = [
    { day: "Lun", minutes: 15 },
    { day: "Mar", minutes: 20 },
    { day: "Mer", minutes: 0 },
    { day: "Jeu", minutes: 10 },
    { day: "Ven", minutes: 25 },
    { day: "Sam", minutes: 30 },
    { day: "Dim", minutes: 12 },
  ],
  max = 30,
}: {
  data?: DayStat[]
  max?: number
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Activité de la semaine</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {data.map((d) => {
            const pct = Math.min(100, Math.round((d.minutes / max) * 100))
            return (
              <div key={d.day} className="flex flex-col items-center gap-1">
                <div
                  className="flex h-24 w-6 items-end rounded-sm bg-muted"
                  aria-label={`${d.day}: ${d.minutes} minutes`}
                  role="img"
                >
                  <div
                    className="w-full rounded-sm bg-emerald-600"
                    style={{ height: `${pct}%` }}
                    title={`${d.minutes} min`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
