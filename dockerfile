# Étape 1 : Construction de l'application
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json / yarn.lock
COPY package*.json ./
# COPY yarn.lock ./  # si tu utilises Yarn

# Installer les dépendances
RUN npm ci --production=false
# RUN yarn install --frozen-lockfile  # si Yarn

# Copier tout le code source
COPY . .

# Construire l'application Next.js pour la production
RUN npm run build
# RUN yarn build

# Étape 2 : Image finale légère pour la production
FROM node:20-alpine AS runner

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour la production
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
