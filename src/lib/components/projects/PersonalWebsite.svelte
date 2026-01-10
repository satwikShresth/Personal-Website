<script lang="ts">
  import ExternalLink from "@lucide/svelte/icons/external-link";
  import Github from "@lucide/svelte/icons/github";
  import { Badge } from "$lib/components/ui/badge";
  
  let { id = 'personal-website' }: { id?: string } = $props();
  
  const techStack = [
    'TypeScript',
    'React.js',
    'Next.js',
    'TanStack Query',
    'Chakra UI',
    'CI/CD',
    'GitHub Actions'
  ].sort();
</script>

<section {id} data-project-section={id} class="scroll-mt-32 mb-20 pb-20 border-b border-border/20">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
    <div class="lg:col-span-4">
      <div class="text-xs uppercase tracking-widest text-muted-foreground mb-2">Project 04</div>
      <h2 class="text-3xl lg:text-4xl font-semibold mb-6 text-foreground" style="font-family: 'Playfair Display', serif;">
        Personal Website
      </h2>
      <div class="pt-4 max-w-sm mx-auto lg:max-w-none">
        <img src="/android-chrome-512x512.png" alt="Personal Website" class="w-full rounded object-contain" />
      </div>
      <div class="flex items-center gap-3 mt-4">
        <a 
          href="https://satwik.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 border border-border/50 hover:border-border flex items-center gap-2 px-3"
          aria-label="Personal Website Live"
        >
          <ExternalLink class="h-4 w-4 text-foreground" />
          <span class="text-sm text-foreground">Live</span>
        </a>
        <a 
          href="https://github.com/satwikShresth/satwik.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 border border-border/50 hover:border-border flex items-center gap-2 px-3"
          aria-label="Personal Website GitHub"
        >
          <Github class="h-4 w-4 text-foreground" />
          <span class="text-sm text-foreground">GitHub</span>
        </a>
      </div>
    </div>
    
    <div class="lg:col-span-8 space-y-8">
      <div class="space-y-4 text-foreground leading-relaxed text-base">
        <ul class="space-y-2 list-disc pl-6">
          <li>A 100% client‑side playground for digging through my half‑baked blogs via full‑text or tag searches</li>
          <li>Born as therapy for my runaway hot takes—so I can't lose my own brilliant (and not‑so‑brilliant) ideas</li>
          <li>No courses, no paywalls—just unfiltered opinions and unsolicited wisdom</li>
          <li>Also doubles as a humble shrine to my ramblings and occasional flashes of genius</li>
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
