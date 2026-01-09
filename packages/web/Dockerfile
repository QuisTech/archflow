FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/web/package.json packages/web/package.json
COPY packages/api/package.json packages/api/package.json
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build --workspace=packages/web

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/packages/web/public ./public

# Set the correct permission for prerender cache
# mkdir .next needed for permissions? logic usually handled by standalone output
# We will use standalone mode if configured in next.config.js, otherwise standard start

# Note: For strict robust dockerfiles we usually configure output: 'standalone' in next.config.js
# For this simplified version, we copy the build output.
COPY --from=builder --chown=nextjs:nodejs /app/packages/web/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/web/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
