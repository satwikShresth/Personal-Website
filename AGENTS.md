# AGENTS.md - Development Guide

This document provides essential information for AI agents and developers working on this codebase.

## Project Overview

This is a **portfolio website** for Jacob Niv, a Biomedical Engineer. Built with Astro + Svelte, it showcases engineering projects, experience, and skills in a modern, responsive design with dark/light mode support.

## Tech Stack

- **Framework**: Astro 5.x with Svelte 5 integration
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide Icons (`@lucide/svelte`)
- **Theme**: `mode-watcher` for dark/light mode
- **Package Manager**: Bun
- **UI Components**: shadcn-svelte components

## Project Structure

```
absolute-altitude/
├── src/
│   ├── components/
│   │   ├── About.svelte              # About section with resume/contact links
│   │   ├── Experience.svelte         # Work experience timeline
│   │   ├── Header.svelte             # Desktop header (lg:block)
│   │   ├── MobileHeader.svelte       # Mobile header (lg:hidden)
│   │   ├── ModeToggle.svelte         # Dark/light mode toggle
│   │   ├── Portfolio.svelte          # Main container component
│   │   ├── Welcome.astro             # (Unused - legacy?)
│   │   └── projects/
│   │       ├── CustomFidgets.svelte
│   │       ├── ProstheticHand.svelte
│   │       ├── MillenniumFalcon.svelte
│   │       ├── Hammer.svelte
│   │       └── CarpetSweeper.svelte
│   ├── layouts/
│   │   └── Layout.astro              # Base HTML layout with theme setup
│   ├── pages/
│   │   └── index.astro               # Single page app entry point
│   ├── lib/
│   │   ├── components/ui/button/     # Reusable button component
│   │   └── utils.ts                  # Utility functions (cn, etc.)
│   └── styles/
│       └── global.css                # Global styles and CSS variables
├── public/
│   ├── pics/                         # Project images
│   └── jn_resume.pdf                 # Resume PDF
└── package.json
```

## Key Components

### Portfolio.svelte (Main Container)

**Purpose**: Orchestrates the entire page layout and manages active section state.

**Key Features**:
- Manages `activeSection` state (string ID of currently visible section)
- Provides `setActiveSection` callback to child components
- Implements scroll-based section detection using `[data-project-section]` attribute
- Handles diamond spinner GIF animation (refreshes every 3.4s)
- Renders all sections in order: About → Experience → Projects

**Active Section Detection**:
- Uses scroll listener to find section closest to viewport top (offset: 150px)
- When at bottom of page, activates last section
- All sections must have `data-project-section={id}` attribute

### Header.svelte (Desktop Header)

**Purpose**: Fixed navigation bar for desktop screens (lg breakpoint and above).

**Features**:
- **Responsive**: Hidden on mobile (`hidden lg:block`)
- **Scroll behavior**: Changes height (h-40 → h-20) when scrolled > 100px
- **Navigation modes**:
  - **Default mode**: Shows "About", "Experience", "Projects" (dropdown on hover)
  - **Projects mode**: When viewing any project, shows all project names directly
- **Active indicators**: Underline (`bg-primary h-0.5`) under active section
- **Projects dropdown**: Hover to open, shows all 5 project items

**Navigation Items**:
```typescript
navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' }
]

projectItems = [
  { id: 'custom-fidgets', label: 'Product Design' },
  { id: 'prosthetic-hand', label: 'Prosthetic Device' },
  { id: 'millennium-falcon', label: 'CAD Modeling' },
  { id: 'hammer', label: 'Precision Machining' },
  { id: 'carpet-sweeper', label: 'Mechanical Design' }
]
```

### MobileHeader.svelte (Mobile Header)

**Purpose**: Fixed navigation bar for mobile screens (below lg breakpoint).

**Features**:
- **Responsive**: Hidden on desktop (`lg:hidden`)
- **Static**: No scroll-based changes (kept simple per requirements)
- **Same navigation logic as desktop**:
  - Default mode: "About", "Experience", "Projects" (dropdown on click)
  - Projects mode: Shows all project names when viewing any project
- **Active indicators**: Same underline style as desktop
- **Projects dropdown**: Click to toggle (mobile-friendly)

**Important**: Must match desktop header functionality but with mobile-appropriate interactions.

### About.svelte

**Purpose**: About section with summary, resume link, and contact buttons.

**Features**:
- Resume PDF link (`/jn_resume.pdf`)
- Email button (mailto: jacobniv2187@gmail.com)
- LinkedIn button (https://www.linkedin.com/in/jacob-niv-56887033b/)
- All buttons use consistent styling with icons (FileText, Mail, Linkedin from Lucide)

### Project Components (src/components/projects/)

All project components follow the same pattern:

**Required Structure**:
```svelte
<script lang="ts">
  let { id = 'project-id' }: { id?: string } = $props();
  // Content variables...
</script>

<section {id} data-project-section={id} class="scroll-mt-32 mb-20 pb-20 border-b border-border/20">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
    <div class="lg:col-span-4">
      <!-- Project number, title, images -->
    </div>
    <div class="lg:col-span-8">
      <!-- Description and content -->
    </div>
  </div>
</section>
```

**Critical Attributes**:
- `id={id}` - Must match projectItems ID in Header
- `data-project-section={id}` - Required for scroll detection
- `scroll-mt-32` - Scroll margin for fixed header
- Grid layout: 4 cols left (title/images), 8 cols right (content)

**Existing Projects**:
1. `custom-fidgets` - Product Design
2. `prosthetic-hand` - Prosthetic Device  
3. `millennium-falcon` - CAD Modeling
4. `hammer` - Precision Machining
5. `carpet-sweeper` - Mechanical Design

## Navigation System

### Active Section Tracking

1. **Portfolio.svelte** manages `activeSection` state
2. **Scroll listener** detects which section is in viewport
3. **Header components** receive `activeSection` and `setActiveSection` as props
4. **Sections** use `data-project-section` attribute for detection

### Navigation Modes

**Default Mode** (not viewing a project):
- Shows: About, Experience, Projects (dropdown)

**Projects Mode** (viewing any project):
- Shows: All 5 project names directly in navigation
- Determined by: `isInProjectsSection = projectItems.some(item => activeSection === item.id)`

### Active Indicators

Active sections show:
- **Text style**: `text-foreground font-semibold` (vs `text-muted-foreground`)
- **Underline**: `<span class="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"></span>`

## Styling & Design System

### Tailwind Breakpoints
- `lg:` - 1024px and above (desktop)
- Below `lg` - Mobile/tablet

### Color System
Uses CSS variables defined in `global.css`:
- `background` - Page background
- `foreground` - Primary text
- `muted-foreground` - Secondary text
- `primary` - Accent color (underlines, links)
- `border` - Border colors
- `accent` - Hover states

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Source Sans 3 (sans-serif)
- Set in `Layout.astro` via Google Fonts

### Component Patterns

**Icon Buttons** (About section):
```svelte
<a class="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 border border-border/50 hover:border-border flex items-center justify-center gap-2 px-3">
  <Icon class="h-4 w-4 text-muted-foreground" />
  <span class="text-sm text-muted-foreground">Label</span>
</a>
```

**Section Layout**:
- Grid: `grid-cols-1 lg:grid-cols-12`
- Left column: `lg:col-span-4` (title, metadata, images)
- Right column: `lg:col-span-8` (content)
- Spacing: `gap-8 lg:gap-12`

## Adding UI Components

To add new shadcn-svelte components to the project, use:

```bash
bun x shadcn-svelte@latest add [component-name]
```

**Example:**
```bash
bun x shadcn-svelte@latest add breadcrumb
```

This will add the component to `src/lib/components/ui/` and install any required dependencies. Components are automatically available via the `$lib/components/ui` alias.

## Adding New Projects

To add a new project:

1. **Create component** in `src/components/projects/NewProject.svelte`:
   ```svelte
   <script lang="ts">
     let { id = 'new-project-id' }: { id?: string } = $props();
   </script>
   
   <section {id} data-project-section={id} class="scroll-mt-32 mb-20 pb-20 border-b border-border/20">
     <!-- Project content -->
   </section>
   ```

2. **Add to Portfolio.svelte**:
   - Import: `import NewProject from './projects/NewProject.svelte';`
   - Render: `<NewProject />` in the sections list

3. **Update navigation** in both `Header.svelte` and `MobileHeader.svelte`:
   ```typescript
   const projectItems = [
     // ... existing items
     { id: 'new-project-id', label: 'Project Label' }
   ];
   ```

4. **Ensure ID consistency**:
   - Component prop: `id = 'new-project-id'`
   - Section attribute: `data-project-section={id}`
   - Navigation item: `{ id: 'new-project-id', ... }`
   - All must match exactly

## Important Patterns

### Svelte 5 Runes

This project uses Svelte 5 with runes:
- `$props()` - Component props
- `$state()` - Reactive state
- `$derived()` - Computed values

### Scroll Behavior

- Smooth scrolling: `scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Scroll offset: 150px for header clearance
- Scroll margin: `scroll-mt-32` on sections

### Theme System

- Uses `mode-watcher` package
- Theme preference stored in localStorage
- Toggle via `ModeToggle` component
- CSS variables automatically switch based on `.dark` class

### Image Handling

- Images in `public/pics/` are referenced as `/pics/filename.png`
- No image optimization configured (consider adding if needed)
- GIF animations manually refreshed (see CustomFidgets diamond spinner)

## Common Tasks

### Modify Navigation Items

Update `navItems` array in:
- `Header.svelte` (desktop)
- `MobileHeader.svelte` (mobile)

Both must stay in sync.

### Change Active Section Detection

Modify `updateActiveSection()` function in `Portfolio.svelte`:
- Viewport offset: `window.scrollY + 150`
- Detection threshold: `sectionTop <= viewportTop + 200`
- Bottom detection: `scrollHeight - 100`

### Update Contact Information

Edit `About.svelte`:
- Email: `href="mailto:jacobniv2187@gmail.com"`
- LinkedIn: `href="https://www.linkedin.com/in/jacob-niv-56887033b/"`
- Resume: `href="/jn_resume.pdf"`

### Change Header Behavior

**Desktop Header** (`Header.svelte`):
- Scroll threshold: `window.scrollY > 100`
- Height change: `h-40` → `h-20`

**Mobile Header** (`MobileHeader.svelte`):
- Currently static (no scroll changes)
- Keep simple per design requirements

## File Locations Reference

- **Main page**: `src/pages/index.astro`
- **Layout**: `src/layouts/Layout.astro`
- **Global styles**: `src/styles/global.css`
- **Resume PDF**: `public/jn_resume.pdf`
- **Project images**: `public/pics/`
- **Utility functions**: `src/lib/utils.ts`

## Development Commands

```bash
bun install          # Install dependencies
bun dev              # Start dev server (localhost:4321)
bun build            # Build for production
bun preview          # Preview production build
```

## Notes for Future Development

1. **Mobile Header**: Keep it simple - no scroll-based changes
2. **Navigation Sync**: Desktop and mobile headers must have identical navigation logic
3. **Section IDs**: Always use consistent IDs across components, navigation, and data attributes
4. **Project Order**: Projects appear in navigation and page in the same order as `projectItems` array
5. **Accessibility**: All interactive elements have proper ARIA labels
6. **Icons**: Use `@lucide/svelte` for consistency
7. **Responsive**: Test on both mobile (< 1024px) and desktop (≥ 1024px)

## Potential Improvements

- Add image optimization/loading states
- Consider lazy loading for project sections
- Add error boundaries
- Implement smooth scroll polyfill for older browsers
- Add analytics (if needed)
- Consider adding a "Back to top" button
- Add loading states for resume PDF
