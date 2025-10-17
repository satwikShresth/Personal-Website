# Railway Cron Configuration

This directory contains the Railway configuration for the Strava sync cron job.

## Configuration

- **Builder**: Dockerfile
- **Dockerfile Path**: `packages/railway/cron/Dockerfile`
- **Cron Schedule**: `0 */6 * * *` (every 6 hours)
- **Watch Patterns**: `packages/crons/**`, `packages/scripts/**`, `src/db/**`
- **Restart Policy**: ON_FAILURE (max 3 retries)

## Deployment on Railway

1. Create a new service in Railway
2. Set the root directory to the project root
3. In service settings, set configuration file path to: `packages/railway/cron/railway.json`
4. Share environment variables with the main server service
5. Deploy

Railway will automatically run this as a cron job on the specified schedule.

## Environment Variables

Same as the main server (shared in Railway).

## Local Testing

```bash
# Build Docker image
docker build -f packages/railway/cron/Dockerfile -t app-cron .

# Run locally
docker run --env-file .env app-cron

# Or test directly
bun run cron:strava-sync
```

