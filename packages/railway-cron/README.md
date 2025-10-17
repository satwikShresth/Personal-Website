# Railway Cron Configuration

This directory contains the Railway configuration for the Strava sync cron job.

## Files

- `railway.json` - Railway service configuration for cron
- `Dockerfile` - Production Docker build for the cron job

## Deployment

1. Create a new service in Railway
2. Point the root directory to the project root
3. Set the configuration file path in Railway service settings to: `packages/railway-cron/railway.json`
4. Railway will automatically run this as a cron job

## Environment Variables

Share the same environment variables as the main server service in Railway.

## Configuration

- **Builder**: Dockerfile
- **Dockerfile Path**: `packages/railway-cron/Dockerfile`
- **Cron Schedule**: `0 */6 * * *` (every 6 hours)
- **Watch Patterns**: `packages/crons/**`, `packages/scripts/**`, `src/db/**`
- **Restart Policy**: ON_FAILURE (max 3 retries)

## How It Works

The cron service:
1. Starts on the specified schedule
2. Runs `bun run cron:strava-sync`
3. Syncs Strava activities from the last timestamp in Redis
4. Sends Discord notifications on success/failure
5. Exits after completion

## Local Testing

```bash
# Build Docker image
docker build -f packages/railway-cron/Dockerfile -t app-cron .

# Run locally
docker run --env-file .env app-cron

# Or test directly
bun run cron:strava-sync
```

## Monitoring

Check Railway logs for:
- Sync start/completion messages
- Number of new/updated activities
- Any errors during sync
- Discord webhook delivery status

