<script lang="ts">
  import ExternalLink from "@lucide/svelte/icons/external-link";
  import Github from "@lucide/svelte/icons/github";
  import { Badge } from "$lib/components/ui/badge";
  import ArchitectureDiagram from '../architecture/ArchitectureDiagram.svelte';
  import { nodes, edges } from '../architecture/inspiration';
  
  let { id = 'inspiration' }: { id?: string } = $props();
  
  const techStack = [
    'Docker',
    'React',
    'TanStack',
    'S3',
    'Celery',
    'Redis',
    'Postgres',
    'Python',
    'Playwright',
    'Rust'
  ].sort();
</script>

<section {id} data-project-section={id} class="scroll-mt-32 mb-20 pb-20 border-b border-border/20">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
    <div class="lg:col-span-4">
      <div class="text-xs uppercase tracking-widest text-muted-foreground mb-2">Project 02</div>
      <h2 class="text-3xl lg:text-4xl font-semibold mb-6 text-foreground" style="font-family: 'Playfair Display', serif;">
        Inspiration
      </h2>
      <div class="pt-4 bg-white rounded p-4">
        <img src="/inspiraiton.png" alt="Inspiration" class="w-full rounded" />
      </div>
      <div class="flex items-center gap-3 mt-4">
        <a 
          href="https://gitlab.cci.drexel.edu/inspiration"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 border border-border/50 hover:border-border flex items-center gap-2 px-3"
          aria-label="Inspiration GitLab"
        >
          <ExternalLink class="h-4 w-4 text-foreground" />
          <span class="text-sm text-foreground">GitLab</span>
        </a>
      </div>
    </div>
    
    <div class="lg:col-span-8 space-y-8">
      <div class="space-y-4 text-foreground leading-relaxed text-base">
        <ul class="space-y-2 list-disc pl-6">
          <li>FERPA-compliant open-source plagiarism detection software developed for Drexel University, enabling self-hosted and privacy-focused implementation</li>
          <li>Incorporates multi-modal detection techniques based on Stanford research papers with enhanced visualization for software similarity analysis</li>
        </ul>
      </div>
      
      <div class="py-8">
        <ArchitectureDiagram nodes={nodes} edges={edges} direction="TB" height={500} padding={5} />
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
