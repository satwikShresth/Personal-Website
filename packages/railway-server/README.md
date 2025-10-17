# Railway Server Configuration

This directory contains the Railway configuration for the main web server.

## Files

- `railway.json` - Railway service configuration
- `Dockerfile` - Production Docker build for the web server

## Deployment

1. Create a new service in Railway
2. Point the root directory to the project root
3. Railway will automatically detect `railway.json` from this package
4. Set the configuration file path in Railway service settings to: `packages/railway-server/railway.json`

## Environment Variables

Required environment variables:

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

## Configuration

- **Builder**: Dockerfile
- **Dockerfile Path**: `packages/railway-server/Dockerfile`
- **Start Command**: `bun run .output/server/index.mjs`
- **Pre-deploy Command**: `bun run db:migrate`
- **Healthcheck**: `/` (300s timeout)
- **Watch Patterns**: `src/**`, `packages/**`
- **Restart Policy**: ON_FAILURE (max 10 retries)
- **Zero Downtime**: 60s overlap, 10s draining

## Local Testing

```bash
# Build Docker image
docker build -f packages/railway-server/Dockerfile -t app-server .

# Run locally
docker run -p 3000:3000 --env-file .env app-server
```

