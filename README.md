# Engineering Portfolio - Jacob Niv

My personal website: [jacobniv.xyz](https://jacobniv.xyz)

A modern, responsive portfolio website showcasing engineering projects, experience, and skills. Built with Astro and Svelte, featuring dark/light mode support and smooth scroll-based navigation.

## 🚀 Features

- **Responsive Design** - Optimized for both desktop and mobile devices
- **Dark/Light Mode** - Toggle between themes with persistent preference
- **Smooth Navigation** - Scroll-based active section detection with visual indicators
- **Project Showcase** - Detailed project pages with images and descriptions
- **Interactive Header** - Dynamic navigation that adapts based on current section
- **Contact Integration** - Quick access to resume, email, and LinkedIn

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) 5.x with [Svelte](https://svelte.dev) 5 integration
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Icons**: [Lucide Icons](https://lucide.dev)
- **Theme**: [mode-watcher](https://github.com/janosh/mode-watcher) for dark/light mode
- **Package Manager**: [Bun](https://bun.sh)

## 📦 Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- A modern web browser

## 🚦 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd absolute-altitude
```

2. Install dependencies:
```bash
bun install
```

Or with npm/yarn:
```bash
npm install
# or
yarn install
```

### Development

Start the development server:
```bash
bun dev
```

The site will be available at `http://localhost:4321`

### Building

Build for production:
```bash
bun build
```

The production-ready files will be in the `dist/` directory.

### Preview

Preview the production build locally:
```bash
bun preview
```

## 📁 Project Structure

```
absolute-altitude/
├── public/
│   ├── pics/              # Project images
│   └── jn_resume.pdf      # Resume PDF
├── src/
│   ├── components/
│   │   ├── About.svelte           # About section with contact info
│   │   ├── Experience.svelte      # Work experience timeline
│   │   ├── Header.svelte          # Desktop navigation header
│   │   ├── MobileHeader.svelte    # Mobile navigation header
│   │   ├── ModeToggle.svelte      # Dark/light mode toggle
│   │   ├── Portfolio.svelte       # Main container component
│   │   └── projects/              # Individual project components
│   │       ├── CustomFidgets.svelte
│   │       ├── ProstheticHand.svelte
│   │       ├── MillenniumFalcon.svelte
│   │       ├── Hammer.svelte
│   │       └── CarpetSweeper.svelte
│   ├── layouts/
│   │   └── Layout.astro           # Base HTML layout
│   ├── pages/
│   │   └── index.astro            # Main page entry point
│   ├── lib/
│   │   ├── components/ui/         # Reusable UI components
│   │   └── utils.ts               # Utility functions
│   └── styles/
│       └── global.css             # Global styles and CSS variables
└── package.json
```

## 🎨 Key Components

### Portfolio.svelte
Main container that manages page layout and active section state. Handles scroll-based section detection and coordinates navigation.

### Header Components
- **Header.svelte**: Desktop navigation (visible on screens ≥ 1024px)
- **MobileHeader.svelte**: Mobile navigation (visible on screens < 1024px)

Both headers feature:
- Dynamic navigation that shows project names when viewing projects
- Active section indicators with underline animations
- Projects dropdown menu

### About.svelte
About section with professional summary, resume download, and contact buttons (Email, LinkedIn).

### Project Components
Each project follows a consistent structure with:
- Project title and number
- Images and media
- Detailed descriptions
- Responsive grid layout

## 🎯 Navigation System

The site uses scroll-based navigation that automatically highlights the current section:

- **Default Mode**: Shows "About", "Experience", and "Projects" (dropdown)
- **Projects Mode**: When viewing any project, shows all project names directly in navigation
- **Active Indicators**: Underline animation shows the current section

## 🎨 Customization

### Adding a New Project

1. Create a new component in `src/components/projects/`:
```svelte
<script lang="ts">
  let { id = 'new-project-id' }: { id?: string } = $props();
</script>

<section {id} data-project-section={id} class="scroll-mt-32 mb-20 pb-20 border-b border-border/20">
  <!-- Project content -->
</section>
```

2. Import and add it to `Portfolio.svelte`

3. Update navigation in `Header.svelte` and `MobileHeader.svelte`:
```typescript
const projectItems = [
  // ... existing items
  { id: 'new-project-id', label: 'Project Label' }
];
```

### Updating Contact Information

Edit `src/components/About.svelte` to update:
- Email address
- LinkedIn URL
- Resume PDF path

### Styling

Styles are managed through Tailwind CSS. Key customization points:
- Color scheme: `src/styles/global.css` (CSS variables)
- Typography: `src/layouts/Layout.astro` (Google Fonts)
- Component styles: Inline Tailwind classes in components

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun preview` | Preview production build |
| `bun astro ...` | Run Astro CLI commands |

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

[Add your license here]

## 👤 Author

Jacob Niv - Biomedical Engineer

- Email: jacobniv2187@gmail.com
- LinkedIn: [Jacob Niv](https://www.linkedin.com/in/jacob-niv-56887033b/)

## 📚 Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [Svelte Documentation](https://svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

---

For detailed development information, see [AGENTS.md](./AGENTS.md) (if available).
