<script lang="ts">
  import ExternalLink from "@lucide/svelte/icons/external-link";
  import Github from "@lucide/svelte/icons/github";
  import BookOpen from "@lucide/svelte/icons/book-open";
  import { Badge } from "$lib/components/ui/badge";
  
  let { id = 'library' }: { id?: string } = $props();
  
  const techStack = [
    'Docker',
    'Drizzle ORM',
    'TanStack Query',
    'Express.js',
    'JsonWebToken',
    'React.js',
    'SQLite',
    'Zod'
  ].sort();
</script>

<section {id} data-project-section={id} class="scroll-mt-32 mb-20 pb-20 border-b border-border/20">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
    <div class="lg:col-span-4">
      <div class="text-xs uppercase tracking-widest text-muted-foreground mb-2">Project 05</div>
      <h2 class="text-3xl lg:text-4xl font-semibold mb-6 text-foreground" style="font-family: 'Playfair Display', serif;">
        Library
      </h2>
      <div class="pt-4 flex items-center justify-center bg-accent/10 rounded-lg p-8">
        <BookOpen class="h-24 w-24 text-muted-foreground/50" />
      </div>
      <div class="flex items-center gap-3 mt-4">
        <a 
          href="https://cs478.satwik.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 border border-border/50 hover:border-border flex items-center gap-2 px-3"
          aria-label="Library Live"
        >
          <ExternalLink class="h-4 w-4 text-foreground" />
          <span class="text-sm text-foreground">Live</span>
        </a>
        <a 
          href="https://github.com/satwikShresth/Library"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 border border-border/50 hover:border-border flex items-center gap-2 px-3"
          aria-label="Library GitHub"
        >
          <Github class="h-4 w-4 text-foreground" />
          <span class="text-sm text-foreground">GitHub</span>
        </a>
      </div>
    </div>
    
    <div class="lg:col-span-8 space-y-8">
      <div class="space-y-4 text-foreground leading-relaxed text-base">
        <ul class="space-y-2 list-disc pl-6">
          <li>A humble assignment I actually hosted—so now it's your problem to check it out</li>
          <li>Fully typed in TypeScript and neatly structured for posterity</li>
          <li>My very first React app—a quaint benchmark against what I'm building today</li>
          <li>No bells, no whistles: just raw, typed React goodness</li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-foreground" style="font-family: 'Playfair Display', serif;">
          Tech Stack
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each techStack as tech}
            <Badge variant="outline">{tech}</Badge>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
