import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Flame, Sparkles, Trophy } from "lucide-react"

import LanguageSelector from "@/components/language-selector"
import QuickActions from "@/components/quick-actions"
import ContinueLearning from "@/components/continue-learning"
import ActivityCard from "@/components/activity-card"
import DailyGoal from "@/components/daily-goal"
import WeeklyActivity from "@/components/weekly-activity"
import CommunityLeaderboard from "@/components/community-leaderboard"
import ChallengesSection from "@/components/challenges-section"
import DetailedStats from "@/components/detailed-stats"
import GamesSection from "@/components/games-section"
import NewsSection from "@/components/news-section"
import LiveEvents from "@/components/live-events"

export default async function Page() {
  // Simulated server data
  const userName = "Alex"
  const streakDays = 5
  const dailyGoal = 20 // minutes
  const dailyProgress = 12 // minutes so far

  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto px-4 py-6 md:py-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Flame className="h-4 w-4 text-amber-500" />
                <span className="ml-1 font-medium">{streakDays} jours de série</span>
              </Badge>
              <Badge variant="outline" className="border-amber-200 text-amber-700">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span className="ml-1">Objectif: {dailyGoal} min</span>
              </Badge>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Bonjour, {userName} 👋</h1>
            <p className="text-muted-foreground">
              Continue ton apprentissage aujourd{"'"}hui. Tu as déjà étudié {dailyProgress} min.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <LanguageSelector />
          </div>
        </header>

        <div className="mt-6">
          <QuickActions />
        </div>

        <div className="mt-6">
          <ChallengesSection />
        </div>

        <div className="mt-6">
          <GamesSection />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Left column */}
          <div className="space-y-6">
            <ContinueLearning />

            <section aria-labelledby="activities-title" className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 id="activities-title" className="text-lg font-semibold">
                  Activités
                </h2>
                <Link href="#" className="text-sm text-muted-foreground hover:underline">
                  Voir tout
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <ActivityCard
                  title="Leçons HSK"
                  description="Progressez à travers les niveaux HSK officiels."
                  progress={25}
                  iconName="GraduationCap"
                  color="violet"
                  href="/lecons"
                  actionLabel="Commencer"
                />
                <ActivityCard
                  title="Vocabulaire"
                  description="Révise tes mots avec répétition espacée."
                  progress={72}
                  iconName="BookOpen"
                  color="emerald"
                  href="/vocabulaire-chinois"
                  actionLabel="Réviser"
                />
                <ActivityCard
                  title="Caractères"
                  description="Explore les caractères chinois en détail."
                  progress={45}
                  iconName="Languages"
                  color="cyan"
                  href="/caractere-chinois"
                  actionLabel="Explorer"
                />
                <ActivityCard
                  title="Grammaire"
                  description="Leçons interactives et exercices guidés."
                  progress={38}
                  iconName="Sigma"
                  color="amber"
                  href="#"
                  actionLabel="Étudier"
                />
                <ActivityCard
                  title="Compréhension orale"
                  description="Écoute des dialogues avec transcription."
                  progress={54}
                  iconName="Headphones"
                  color="teal"
                  href="#"
                  actionLabel="Écouter"
                />
                <ActivityCard
                  title="Expression orale"
                  description="Pratique ta prononciation et fluidité."
                  progress={20}
                  iconName="Mic"
                  color="rose"
                  href="#"
                  actionLabel="Parler"
                />
                <ActivityCard
                  title="Lecture"
                  description="Lis des textes adaptés à ton niveau."
                  progress={61}
                  iconName="Newspaper"
                  color="violet"
                  href="#"
                  actionLabel="Lire"
                />
                <ActivityCard
                  title="Écriture"
                  description="Rédige et reçois des retours."
                  progress={12}
                  iconName="PenLine"
                  color="cyan"
                  href="#"
                  actionLabel="Écrire"
                />
                <ActivityCard
                  title="Quiz"
                  description="Testez vos connaissances avec des quiz personnalisés."
                  progress={0}
                  iconName="Target"
                  color="rose"
                  href="/quiz"
                  actionLabel="Commencer"
                />
                <ActivityCard
                  title="Jeux"
                  description="Apprends en t'amusant avec nos jeux éducatifs."
                  progress={65}
                  iconName="Gamepad2"
                  color="violet"
                  href="/jeux"
                  actionLabel="Jouer"
                />
                <ActivityCard
                  title="Manuel"
                  description="Explorez les manuels HSK et Taiwan par chapitre."
                  progress={30}
                  iconName="BookOpen"
                  color="amber"
                  href="/textbook"
                  actionLabel="Explorer"
                />
              </div>
            </section>

            <NewsSection />

            <section aria-labelledby="recommended-title" className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <h2 id="recommended-title" className="text-lg font-semibold">
                  Recommandé pour toi
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Phrases courantes: au café</CardTitle>
                    <CardDescription>Dialogues courts pour commander et payer</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <Image
                      src="/coffee-shop-dialogue.png"
                      alt="Illustration d'un café"
                      width={120}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="text-sm text-muted-foreground">10 min • A1-A2</div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-emerald-700 hover:underline"
                    >
                      Commencer <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Prononciation: sons difficiles</CardTitle>
                    <CardDescription>/θ/ vs /s/ • exercices guidés</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <Image
                      src="/pronunciation-practice-mic.png"
                      alt="Microphone pour la prononciation"
                      width={120}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="text-sm text-muted-foreground">8 min • B1</div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-emerald-700 hover:underline"
                    >
                      S{"'"}entraîner <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-6">
            <DailyGoal defaultGoalMinutes={dailyGoal} defaultProgressMinutes={dailyProgress} />
            <WeeklyActivity />

            <LiveEvents />

            <DetailedStats />
            <CommunityLeaderboard />
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Rappels</CardTitle>
                <CardDescription>Ne rate pas ta série !</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Révision du vocabulaire</p>
                    <p className="text-muted-foreground">20 mots à revoir</p>
                  </div>
                  <Link href="#" className="text-emerald-700 hover:underline">
                    Ouvrir
                  </Link>
                </div>
                <Separator />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Quiz hebdomadaire</p>
                    <p className="text-muted-foreground">Disponible jusqu{"'"}à dimanche</p>
                  </div>
                  <Link href="#" className="text-emerald-700 hover:underline">
                    Lancer
                  </Link>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  )
}
