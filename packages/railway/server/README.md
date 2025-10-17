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

## Public Networking & Custom Domain

### Railway Public Domain

By default, Railway provides a public domain in the format:
```
https://<service-name>-production-<hash>.up.railway.app
```

You can find this in your service's Settings → Networking tab.

### Adding a Custom Domain

1. Go to your Railway service settings
2. Navigate to the "Networking" tab
3. Click "Add Custom Domain"
4. Enter your domain (e.g., `yourdomain.com` or `www.yourdomain.com`)
5. Railway will provide DNS records to configure

### DNS Configuration

Add a CNAME record to your domain provider:

**For root domain:**
```
Type: CNAME
Name: @
Value: <your-service-name>-production-<hash>.up.railway.app
```

**For subdomain:**
```
Type: CNAME
Name: www
Value: <your-service-name>-production-<hash>.up.railway.app
```

**Note:** Some DNS providers don't support CNAME records for root domains. In that case, use their ALIAS or ANAME record type, or use a subdomain like `www`.

### SSL/TLS Certificate

Railway automatically provisions and renews SSL certificates using Let's Encrypt. Once DNS propagates (usually 5-60 minutes), your domain will have HTTPS enabled automatically.

### Verification

Check DNS propagation:
```bash
# Check DNS records
dig yourdomain.com

# Or use nslookup
nslookup yourdomain.com
```

Test your domain:
```bash
# Health check
curl https://yourdomain.com/

# Check SSL certificate
curl -vI https://yourdomain.com/
```

## Environment Variables

**Important:** Update `STRAVA_REDIRECT_URI` with your custom domain after setup.

```
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESSKEYID=
S3_SECRETKEY=
REDIS_URL=
DEFAULT_TTL=900000
STRAVA_CLIENT_ID=
STRAVA_CLIENT_SECRET=
STRAVA_REDIRECT_URI=https://yourdomain.com/api/strava/callback
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
