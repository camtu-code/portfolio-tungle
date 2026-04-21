FROM node:20-alpine

WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Generate Prisma client
RUN npx prisma generate

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV DATABASE_URL="file:/app/prisma/dev.db"

# Build Next.js app
RUN npm run build

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Sync schema and start
CMD ["sh", "-c", "npx prisma db push && npm start"]
