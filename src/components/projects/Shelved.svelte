<script lang="ts">
  import ExternalLink from "@lucide/svelte/icons/external-link";
  import Github from "@lucide/svelte/icons/github";
  import { Badge } from "$lib/components/ui/badge";
  
  let { id = 'shelved' }: { id?: string } = $props();
  
  const techStack = [
    'Docker',
    'Node.js',
    'Knex.js',
    'Postgres',
    'JavaScript',
    'EJS'
  ].sort();
</script>

<section {id} data-project-section={id} class="scroll-mt-32 mb-20 pb-20 border-b border-border/20">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
    <div class="lg:col-span-4">
      <div class="text-xs uppercase tracking-widest text-muted-foreground mb-2">Project 03</div>
      <h2 class="text-3xl lg:text-4xl font-semibold mb-6 text-foreground" style="font-family: 'Playfair Display', serif;">
        Shelved
      </h2>
      <div class="pt-4">
        <img src="/shelved.png" alt="Shelved" class="w-full rounded" />
      </div>
      <div class="flex items-center gap-3 mt-4">
        <a 
          href="https://shelved.satwik.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 border border-border/50 hover:border-border flex items-center gap-2 px-3"
          aria-label="Shelved Live"
        >
          <ExternalLink class="h-4 w-4 text-foreground" />
          <span class="text-sm text-foreground">Live</span>
        </a>
        <a 
          href="https://github.com/satwikShresth/shelved"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 border border-border/50 hover:border-border flex items-center gap-2 px-3"
          aria-label="Shelved GitHub"
        >
          <Github class="h-4 w-4 text-foreground" />
          <span class="text-sm text-foreground">GitHub</span>
        </a>
      </div>
    </div>
    
    <div class="lg:col-span-8 space-y-8">
      <div class="space-y-4 text-foreground leading-relaxed text-base">
        <ul class="space-y-2 list-disc pl-6">
          <li>A simple group project where the goal was to master JavaScript as a raw language and build applications and features from scratch</li>
          <li>The learning outcome was a deeper understanding of CSS, JavaScript, server‑side rendering, and DOM manipulation</li>
          <li>Built entirely on Deno without any bundling</li>
          <li>Used EJS to render web pages</li>
          <li>Employed a strategy pattern to integrate multiple content APIs and normalize their outputs into a unified format</li>
          <li>Implemented social features including friends, following, discovery, public collections, and private connections</li>
          <li>Utilized PostgreSQL for the database</li>
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
