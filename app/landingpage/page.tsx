"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Trophy, Star, Play, CheckCircle, Globe, Zap } from 'lucide-react'
import Link from "next/link"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-emerald-600" />,
      title: "Vocabulaire Interactif",
      description: "Apprenez avec des caractères chinois, pinyin, et exemples contextuels",
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Communauté Active",
      description: "Rejoignez des milliers d'apprenants et participez aux défis",
    },
    {
      icon: <Trophy className="w-8 h-8 text-emerald-600" />,
      title: "Système de Progression",
      description: "Suivez vos progrès avec des objectifs personnalisés et des récompenses",
    },
  ]

  const testimonials = [
    {
      name: "Marie L.",
      role: "Étudiante",
      content: "Grâce à cette plateforme, j'ai progressé plus rapidement qu'avec mes cours traditionnels !",
      rating: 5,
    },
    {
      name: "Thomas K.",
      role: "Professionnel",
      content: "L'approche gamifiée rend l'apprentissage addictif. Je ne peux plus m'arrêter !",
      rating: 5,
    },
    {
      name: "Sophie M.",
      role: "Enseignante",
      content: "Excellent outil pédagogique. Mes étudiants adorent les exercices interactifs.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* <CHANGE> Converted header to Tailwind classes */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                LinguaLearn
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-emerald-600">Se connecter</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                  Commencer gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* <CHANGE> Converted hero section to Tailwind classes */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-2 text-sm font-medium">
              🎉 Plus de 50,000 apprenants nous font confiance
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Maîtrisez les langues
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                {" "}avec plaisir
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Découvrez une nouvelle façon d'apprendre les langues avec notre plateforme interactive. Vocabulaire,
              grammaire, conversation - tout ce dont vous avez besoin pour réussir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/signup">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Play className="w-5 h-5 mr-2" />
                  Commencer maintenant
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                  Voir la démo
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500">✨ Gratuit pour commencer • Aucune carte de crédit requise</p>
          </div>
        </div>
      </section>

      {/* <CHANGE> Converted features section to Tailwind classes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir LinguaLearn ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Une approche moderne et efficace pour apprendre les langues</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                  activeFeature === index 
                    ? "border-emerald-500 shadow-lg transform scale-105" 
                    : "border-gray-200 hover:border-emerald-300"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <CHANGE> Converted stats section to Tailwind classes */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-emerald-100">Apprenants actifs</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-emerald-100">Langues disponibles</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-emerald-100">Exercices complétés</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-emerald-100">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* <CHANGE> Converted testimonials section to Tailwind classes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos utilisateurs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <CHANGE> Converted CTA section to Tailwind classes */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Prêt à commencer votre aventure linguistique ?</h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Rejoignez des milliers d'apprenants qui transforment leur façon d'apprendre les langues
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                <Zap className="w-5 h-5 mr-2" />
                Créer mon compte gratuit
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                J'ai déjà un compte
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center text-emerald-100">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Gratuit pour commencer</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Aucun engagement</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Support 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* <CHANGE> Converted footer to Tailwind classes */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-8 h-8 text-emerald-400" />
                <span className="text-2xl font-bold">LinguaLearn</span>
              </div>
              <p className="text-gray-400 leading-relaxed">La plateforme d'apprentissage des langues nouvelle génération.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-emerald-400 transition-colors">Fonctionnalités</Link></li>
                <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Tarifs</Link></li>
                <li><Link href="/demo" className="hover:text-emerald-400 transition-colors">Démo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-emerald-400 transition-colors">Centre d'aide</Link></li>
                <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
                <li><Link href="/community" className="hover:text-emerald-400 transition-colors">Communauté</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-emerald-400 transition-colors">À propos</Link></li>
                <li><Link href="/careers" className="hover:text-emerald-400 transition-colors">Carrières</Link></li>
                <li><Link href="/press" className="hover:text-emerald-400 transition-colors">Presse</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 LinguaLearn. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
