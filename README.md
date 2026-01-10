# satwik.dev

Personal portfolio website built with SvelteKit, showcasing projects, experience, and technical writeups.

## Features

- 🎨 Modern, responsive design with dark mode support
- 📊 Interactive architecture diagrams using SvelteFlow
- 📝 MDX-based writeups and blog posts
- 🎥 Video content delivery via S3 presigned URLs
- 🔍 Type-safe environment variable management
- ⚡ Built with Svelte 5 and TypeScript

## Tech Stack

### Core
- **SvelteKit** - Full-stack framework
- **Svelte 5** - UI framework with runes
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Bun** - Runtime and package manager

### Styling
- **Tailwind CSS 4** - Utility-first CSS
- **Lucide Svelte** - Icon library
- **bits-ui** - Headless UI components

### Features
- **SvelteFlow** - Interactive graph/diagram library
- **dagre** - Graph layout algorithm
- **mdsvex** - Markdown/MDX preprocessing
- **MinIO** - S3-compatible object storage client
- **Zod** - Schema validation
- **@t3-oss/env-core** - Type-safe environment variables

## Prerequisites

- **Bun** (recommended) or Node.js 18+
- A S3-compatible object storage service (for video hosting)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Personal-Website
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables))

4. Start the development server:
```bash
bun run dev
# or
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# S3 Configuration (for video/media hosting)
S3_ENDPOINT=https://your-s3-endpoint.com
S3_BUCKET=your-bucket-name
S3_ACCESSKEYID=your-access-key-id
S3_SECRETKEY=your-secret-key

# Clerk Authentication (optional, if using authentication)
PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
```

### Required Variables
- `S3_ENDPOINT` - S3-compatible endpoint URL
- `S3_BUCKET` - Bucket name for storing media
- `S3_ACCESSKEYID` - S3 access key ID
- `S3_SECRETKEY` - S3 secret access key

### Optional Variables
- `PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key (if using authentication)

## Development

Start the development server:

```bash
bun run dev
# or
npm run dev
```

The site will be available at `http://localhost:5173`

### Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `check` - Run Svelte type checking
- `check:watch` - Run Svelte type checking in watch mode
- `lint` - Run ESLint

## Building for Production

Build the production version:

```bash
bun run build
# or
npm run build
```

Preview the production build:

```bash
bun run preview
# or
npm run preview
```

## Project Structure

```
.
├── src/
│   ├── lib/
│   │   ├── components/        # Reusable components
│   │   │   ├── architecture/  # Architecture diagram components
│   │   │   ├── projects/      # Project showcase components
│   │   │   └── ui/            # UI component library
│   │   ├── content/           # MDX content files
│   │   │   └── writeups/      # Blog posts and writeups
│   │   ├── api/               # Remote functions/API
│   │   ├── env.ts             # Environment variable validation
│   │   └── s3.service.ts      # S3 service for presigned URLs
│   └── routes/                # SvelteKit routes
│       ├── +page.svelte       # Home page
│       └── writeups/          # Writeups pages
├── static/                    # Static assets
├── svelte.config.js           # SvelteKit configuration
├── vite.config.ts             # Vite configuration
└── package.json               # Dependencies and scripts
```

## Architecture Diagrams

The site features interactive architecture diagrams built with SvelteFlow and dagre. Diagrams are defined in `src/lib/components/architecture/` and can be embedded in both Svelte components and MDX files.

Example usage in MDX:
```mdx
import ArchitectureDiagram from '$lib/components/ArchitectureDiagramWrapper.svelte';
import { nodes, edges } from '$lib/components/architecture/your-diagram';

<ArchitectureDiagram 
  nodes={nodes}
  edges={edges}
  direction="TB"
  height={500}
  padding={20}
/>
```

## Content Management

Writeups are stored as MDX files in `src/lib/content/writeups/`. Each writeup includes frontmatter with metadata:

```mdx
---
title: 'My Writeup Title'
date: '2025-01-01'
description: 'A brief description'
estimatedReadTime: 5
tags: ['tag1', 'tag2']
---

# Content goes here
```

## License

Private project - All rights reserved

## Contact

For questions or inquiries, please visit the website or reach out through the provided contact methods.