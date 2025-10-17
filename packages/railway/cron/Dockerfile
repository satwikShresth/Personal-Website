# Use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /app

# Install production dependencies
FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Production stage
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY packages ./packages
COPY src ./src
COPY drizzle ./drizzle
COPY tsconfig.json ./
COPY package.json ./

# Set user
USER bun

# Run the cron job
CMD ["bun", "run", "cron:strava-sync"]
