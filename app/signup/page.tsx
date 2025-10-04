"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import "./signup.css"

const languages = [
  { value: "chinese", label: "Chinois (Mandarin)" },
  { value: "english", label: "Anglais" },
  { value: "spanish", label: "Espagnol" },
  { value: "french", label: "Français" },
  { value: "german", label: "Allemand" },
  { value: "japanese", label: "Japonais" },
  { value: "korean", label: "Coréen" },
  { value: "italian", label: "Italien" },
]

const profileIcons = [
  { id: "student", emoji: "🎓", name: "Étudiant" },
  { id: "teacher", emoji: "👨‍🏫", name: "Professeur" },
  { id: "business", emoji: "💼", name: "Professionnel" },
  { id: "traveler", emoji: "✈️", name: "Voyageur" },
  { id: "book", emoji: "📚", name: "Lecteur" },
  { id: "globe", emoji: "🌍", name: "Explorateur" },
  { id: "star", emoji: "⭐", name: "Ambitieux" },
  { id: "heart", emoji: "❤️", name: "Passionné" },
]

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    language: "",
    profileIcon: "student",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      window.location.href = "/"
    }, 2000)
  }

  const handleGoogleSignup = () => {
    // Google OAuth integration would go here
    console.log("Google signup clicked")
  }

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <CardHeader className="signup-header">
          <CardTitle className="signup-title">Créer un compte</CardTitle>
          <CardDescription className="signup-description">
            Rejoignez notre communauté d'apprenants et commencez votre voyage linguistique
          </CardDescription>
        </CardHeader>
        <CardContent className="signup-content">
          <form onSubmit={handleSignup} className="signup-form">
            <div className="form-group">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <Input
                  id="username"
                  type="text"
                  placeholder="votre_nom"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="input-with-icon"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <Label htmlFor="email">Email</Label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="input-with-icon"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="input-with-icon-both"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <Label htmlFor="language">Langue à apprendre</Label>
              <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez une langue" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <Label>Icône de profil</Label>
              <div className="profile-icons-grid">
                {profileIcons.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => handleInputChange("profileIcon", icon.id)}
                    className={`profile-icon-btn ${formData.profileIcon === icon.id ? "profile-icon-selected" : ""}`}
                    title={icon.name}
                  >
                    <span className="profile-icon-emoji">{icon.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="signup-btn" disabled={isLoading}>
              {isLoading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </form>

          <div className="separator-wrapper">
            <div className="separator-line">
              <Separator />
            </div>
            <div className="separator-text">
              <span className="separator-label">Ou continuer avec</span>
            </div>
          </div>

          <Button type="button" variant="outline" className="google-btn bg-transparent" onClick={handleGoogleSignup}>
            <svg className="google-icon" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            S'inscrire avec Google
          </Button>

          <div className="login-link">
            <span className="login-text">Déjà un compte ? </span>
            <Link href="/login" className="login-link-text">
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
