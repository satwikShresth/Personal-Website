<script lang="ts">
  import { onMount } from 'svelte';
  import ModeToggle from './ModeToggle.svelte';
  import MobileHeader from './MobileHeader.svelte';
  import Github from "@lucide/svelte/icons/github";
  import { Button } from "$lib/components/ui/button";
  
  let { activeSection = '', setActiveSection }: { activeSection?: string; setActiveSection?: (id: string) => void } = $props();
  
  let isScrolled = $state(false);
  let projectsDropdownOpen = $state(false);
  let projectsDropdownRef: HTMLDivElement | null = null;
  
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' }
  ];

  const projectItems = [
    { id: 'openmario', label: 'OpenMario' },
    { id: 'inspiration', label: 'Inspiration' },
    { id: 'shelved', label: 'Shelved' },
    { id: 'personal-website', label: 'Personal Website' },
    { id: 'library', label: 'Library' }
  ];

  // Determine which navigation items to show
  let isInProjectsSection = $derived(projectItems.some(item => activeSection === item.id));

  function handleClick(e: MouseEvent, id: string) {
    e.preventDefault();
    // Immediately update active section
    if (setActiveSection) {
      setActiveSection(id);
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    projectsDropdownOpen = false;
  }

  function isAnyProjectActive(): boolean {
    return projectItems.some(item => activeSection === item.id);
  }

  onMount(() => {
    function handleScroll() {
      isScrolled = window.scrollY > 100;
    }
    
    function handleClickOutside(e: MouseEvent) {
      if (projectsDropdownRef && !projectsDropdownRef.contains(e.target as Node)) {
        projectsDropdownOpen = false;
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<!-- Mobile Header -->
<MobileHeader {activeSection} {setActiveSection} />

<!-- Desktop Header -->
<header class="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/20 transition-all duration-300 {isScrolled ? 'h-20' : 'h-40'}">
  <div class="max-w-5xl mx-auto px-8 h-full">
    <div class="flex items-center justify-between h-full transition-all duration-300 {isScrolled ? '' : 'py-6'}">
      <div class="flex flex-col items-start">
        <a 
          href="#" 
          class="text-foreground hover:opacity-80 transition-all duration-300 {isScrolled ? 'text-xl font-semibold' : 'text-5xl font-semibold'}"
          style="font-family: 'Playfair Display', serif;"
        >
          Satwik Shresth
        </a>
      </div>
      
      <div class="flex items-center gap-6">
        <nav class="hidden md:flex items-center gap-6 lg:gap-8 {isScrolled ? 'text-sm' : 'text-base lg:text-lg'} transition-all duration-300">
          {#if !isInProjectsSection}
            <!-- Default navigation: About, Experience, Projects dropdown -->
            {#each navItems as item}
              <a
                href="#{item.id}"
                class="relative transition-all duration-200 {activeSection === item.id 
                  ? 'text-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground font-normal'}"
                onclick={(e) => handleClick(e, item.id)}
                data-s-event="Navigation: {item.label}"
                data-s-event-path="/#{item.id}"
              >
                {item.label}
                {#if activeSection === item.id}
                  <span class="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                {/if}
              </a>
            {/each}
            
            <!-- Writeups Link -->
            <a
              href="/writeups"
              class="relative transition-all duration-200 text-muted-foreground hover:text-foreground font-normal"
              data-s-event="Navigation: Writeups"
              data-s-event-path="/writeups"
            >
              Writeups
            </a>
            
            <!-- Projects Dropdown -->
            <div 
              bind:this={projectsDropdownRef}
              class="relative"
              role="group"
              onmouseenter={() => projectsDropdownOpen = true}
              onmouseleave={() => projectsDropdownOpen = false}
            >
              <button
                type="button"
                class="relative transition-all duration-200 text-muted-foreground hover:text-foreground font-normal"
                onclick={(e) => {
                  e.stopPropagation();
                  projectsDropdownOpen = !projectsDropdownOpen;
                }}
                onkeydown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    projectsDropdownOpen = !projectsDropdownOpen;
                  }
                }}
                aria-expanded={projectsDropdownOpen}
                aria-haspopup="true"
              >
                Projects
              </button>
              
              {#if projectsDropdownOpen}
                <div class="absolute top-full left-0 w-48 bg-background border border-border/50 rounded-lg shadow-lg py-2 z-50">
                  {#each projectItems as project}
                    <a
                      href="#{project.id}"
                      class="block px-4 py-2 text-sm transition-colors duration-200 {activeSection === project.id
                        ? 'text-foreground font-medium bg-accent/50' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'}"
                      onclick={(e) => handleClick(e, project.id)}
                      data-s-event="Project: {project.label}"
                      data-s-event-path="/#{project.id}"
                    >
                      {project.label}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {:else}
            <!-- Projects navigation: Show all project names -->
            {#each projectItems as item}
              <a
                href="#{item.id}"
                class="relative transition-all duration-200 {activeSection === item.id 
                  ? 'text-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground font-normal'}"
                onclick={(e) => handleClick(e, item.id)}
                data-s-event="Project: {item.label}"
                data-s-event-path="/#{item.id}"
              >
                {item.label}
                {#if activeSection === item.id}
                  <span class="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                {/if}
              </a>
            {/each}
          {/if}
        </nav>
        
        <div class="flex items-center gap-2">
          <Button
            href="https://github.com/satwikShresth/satwik.dev"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="icon"
            aria-label="GitHub"
            class="w-9 h-9"
          >
            <Github class="h-4 w-4 text-muted-foreground" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  </div>
</header>
