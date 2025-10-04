# --------------------------
# Étape 1 : Build de l'application
# --------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Construire l'application pour la production
RUN npm run build

# --------------------------
# Étape 2 : Image finale pour la production
# --------------------------
FROM node:20-alpine AS runner

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
#COPY --from=builder /app/next.config.js ./

USER appuser

EXPOSE 3000

CMD ["npm", "start"]
