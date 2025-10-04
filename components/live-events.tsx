import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Video, Clock } from "lucide-react"

export default function LiveEvents() {
  const events = [
    {
      id: 1,
      title: "Conversation Club - Niveau B1",
      description: "Discussion libre sur le thème 'Voyages et découvertes'",
      time: "Aujourd'hui 18h00",
      duration: "45 min",
      participants: 12,
      maxParticipants: 15,
      level: "B1",
      type: "Conversation",
      status: "Bientôt",
      href: "/events/conversation-b1",
    },
    {
      id: 2,
      title: "Atelier Grammaire: Present Perfect",
      description: "Maîtrise enfin la différence entre present perfect et past simple",
      time: "Demain 14h30",
      duration: "30 min",
      participants: 8,
      maxParticipants: 20,
      level: "B1-B2",
      type: "Grammaire",
      status: "Ouvert",
      href: "/events/grammar-present-perfect",
    },
  ]

  return (
    <section aria-labelledby="events-title" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-600" />
          <h2 id="events-title" className="text-lg font-semibold">
            Événements en direct
          </h2>
        </div>
        <Link href="/events" className="text-sm text-muted-foreground hover:underline">
          Voir le planning
        </Link>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <Card key={event.id} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {event.level}
                    </Badge>
                    <Badge variant={event.status === "Bientôt" ? "default" : "secondary"} className="text-xs">
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{event.title}</CardTitle>
                  <CardDescription className="text-sm">{event.description}</CardDescription>
                </div>
                <Video className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {event.time}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {event.participants}/{event.maxParticipants}
                </div>
              </div>
              <Button asChild size="sm" className="w-full">
                <Link href={event.href}>{event.status === "Bientôt" ? "Rejoindre" : "S'inscrire"}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
