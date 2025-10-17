# Railway Cron Configuration

This directory contains the Railway configuration for the Strava sync cron job.

## Configuration

- **Builder**: Dockerfile (optimized with bundling)
- **Dockerfile Path**: `packages/railway/cron/Dockerfile`
- **Cron Schedule**: `0 */6 * * *` (every 6 hours)
- **Watch Patterns**: `packages/crons/**`, `packages/scripts/**`, `src/db/**`
- **Restart Policy**: ON_FAILURE (max 3 retries)
- **Bundle**: Pre-built with bytecode for fast startup

## Deployment on Railway

1. Create a new service in Railway
2. Set the root directory to the project root
3. In service settings, set configuration file path to: `packages/railway/cron/railway.json`
4. Share environment variables with the main server service
5. Deploy

Railway will automatically run this as a cron job on the specified schedule.

## Environment Variables

Same as the main server (shared in Railway).

## How It Works

The cron Docker build:
1. **Build stage**: Bundles all dependencies into a single optimized file
2. **Production stage**: Only includes the bundled output (no node_modules)
3. **Fast startup**: Pre-compiled bytecode reduces cold start time
4. **Minimal size**: No source files or dependencies in final image

## Local Testing

```bash
# Test with source (development)
bun run cron:strava-sync

# Build the bundle
bun run cron:strava-sync:build

# Test with bundle (production)
bun run cron:strava-sync:prod

# Build Docker image
docker build -f packages/railway/cron/Dockerfile -t app-cron .

# Run Docker locally
docker run --env-file .env app-cron
```

