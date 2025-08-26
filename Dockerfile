# ------------- Stage 1: Builder -------------

FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install --frozen-lockfile

COPY src ./src
COPY docs ./docs

RUN npm run build

# ------------- Stage 2: Production -------------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm install --omit=dev --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/docs ./docs

EXPOSE 3000

CMD ["node", "dist/index.js"]
