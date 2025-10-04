import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown, Medal, Trophy } from "lucide-react"

interface LeaderboardUser {
  rank: number
  name: string
  avatar?: string
  points: number
  streak: number
}

const leaderboardData: LeaderboardUser[] = [
  { rank: 1, name: "Sophie L.", points: 2840, streak: 28 },
  { rank: 2, name: "Marc D.", points: 2650, streak: 15 },
  { rank: 3, name: "Alex M.", points: 2420, streak: 5 },
  { rank: 4, name: "Emma R.", points: 2180, streak: 12 },
  { rank: 5, name: "Lucas B.", points: 1950, streak: 8 },
]

export default function CommunityLeaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-4 w-4 text-yellow-500" />
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />
      case 3:
        return <Trophy className="h-4 w-4 text-amber-600" />
      default:
        return <span className="text-sm font-medium text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Classement hebdomadaire</CardTitle>
        <CardDescription>Top 5 de ta communauté</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboardData.map((user) => (
          <div key={user.rank} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6">{getRankIcon(user.rank)}</div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-xs">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.points} pts</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {user.streak}j
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
