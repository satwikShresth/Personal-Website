# Use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies for building
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Build stage
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Build the bundled cron job
ENV NODE_ENV=production
RUN bun run cron:strava-sync:build

# Production stage - minimal runtime
FROM base AS release

# Copy only the built bundle and drizzle migrations
COPY --from=build /app/.output/crons .output/crons
COPY --from=build /app/drizzle ./drizzle

# Set user
USER bun

# Run the bundled cron job (no dependencies needed)
CMD ["bun", "run", ".output/crons/strava-sync.cron.js"]
