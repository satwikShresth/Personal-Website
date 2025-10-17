# Railway Server Configuration

This directory contains the Railway configuration for the main web server.

## Configuration

- **Builder**: Dockerfile
- **Dockerfile Path**: `packages/railway/server/Dockerfile`
- **Start Command**: `bun run .output/server/index.mjs`
- **Pre-deploy Command**: `bun run db:migrate`
- **Healthcheck**: `/` (300s timeout)
- **Watch Patterns**: `src/**`, `packages/**`
- **Restart Policy**: ON_FAILURE (max 10 retries)
- **Zero Downtime**: 60s overlap, 10s draining

## Deployment on Railway

1. Create a new service in Railway
2. Set the root directory to the project root
3. In service settings, set configuration file path to: `packages/railway/server/railway.json`
4. Set all required environment variables
5. Deploy

## Environment Variables

```
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESSKEYID=
S3_SECRETKEY=
REDIS_URL=
DEFAULT_TTL=900000
STRAVA_CLIENT_ID=
STRAVA_CLIENT_SECRET=
STRAVA_REDIRECT_URI=
STRAVA_CALLBACK_KEY=
DISCORD_WEBHOOK_URL=
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
REDIS_STRAVA_OAUTH_TOKEN_KEY=
```

## Local Testing

```bash
# Build Docker image
docker build -f packages/railway/server/Dockerfile -t app-server .

# Run locally
docker run -p 3000:3000 --env-file .env app-server
```
