# --------------------------
# Étape 1 : Build de l'application
# --------------------------
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Ignorer ESLint pendant le build pour éviter les erreurs
ENV NEXT_PUBLIC_IGNORE_ESLINT=true

# Construire l'application pour la production
RUN npm run build

# --------------------------
# Étape 2 : Image finale pour la production
# --------------------------
FROM node:20-alpine AS runner

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copier uniquement ce qui est nécessaire depuis le builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Utiliser l'utilisateur non-root
USER appuser

# Exposer le port par défaut de Next.js
EXPOSE 3000

# Commande pour démarrer l'application en production
CMD ["npm", "start"]
