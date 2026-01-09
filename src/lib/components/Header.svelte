<script lang="ts">
  import { onMount } from 'svelte';
  import ModeToggle from './ModeToggle.svelte';
  import MobileHeader from './MobileHeader.svelte';
  import Github from "@lucide/svelte/icons/github";
  import { Button } from "$lib/components/ui/button";
  
  let { activeSection = '', setActiveSection }: { activeSection?: string; setActiveSection?: (id: string) => void } = $props();
  
  let isScrolled = $state(false);
  let projectsDropdownOpen = $state(false);
  let projectsDropdownRef = $state<HTMLDivElement | null>(null);
  
  type NavItem = { id: string; label: string; href?: string };
  
  const navItems: NavItem[] = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Exprience' },
    { id: 'projects', label: 'Projects' }, // This is a placeholder for Projects section
    { id: 'writeups', label: 'Writeup', href: '/writeups' }
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
          href="/"
          class="text-foreground hover:opacity-80 transition-all duration-300 {isScrolled ? 'text-xl font-semibold' : 'text-5xl font-semibold'}"
          style="font-family: 'Playfair Display', serif;"
        >
          Satwik Shresth
        </a>
      </div>
      
      <div class="flex items-center gap-6">
        <div class="flex flex-col items-end gap-2">
          <nav class="hidden md:flex items-center gap-6 lg:gap-8 {isScrolled ? 'text-sm' : 'text-base lg:text-lg'} transition-all duration-300">
            {#each navItems as item}
              {#if item.href}
                <!-- External link (Writeups) -->
                <a
                  href={item.href}
                  class="relative transition-all duration-200 text-muted-foreground hover:text-foreground font-normal"
                  data-s-event="Navigation: {item.label}"
                  data-s-event-path={item.href}
                >
                  {item.label}
                </a>
              {:else}
                <!-- Internal navigation item -->
                <a
                  href="#{item.id}"
                  class="relative transition-all duration-200 {(isInProjectsSection && item.id === 'projects') || (!isInProjectsSection && activeSection === item.id)
                    ? 'text-foreground font-semibold' 
                    : 'text-muted-foreground hover:text-foreground font-normal'}"
                  onclick={(e) => {
                    if (item.id === 'projects') {
                      e.preventDefault();
                      // Scroll to first project
                      const firstProject = document.getElementById(projectItems[0].id);
                      if (firstProject && setActiveSection) {
                        setActiveSection(projectItems[0].id);
                        firstProject.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    } else {
                      handleClick(e, item.id);
                    }
                  }}
                  data-s-event="Navigation: {item.label}"
                  data-s-event-path="/#{item.id}"
                >
                  {item.label}
                  {#if (isInProjectsSection && item.id === 'projects') || (!isInProjectsSection && activeSection === item.id)}
                    <span class="absolute -bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                  {/if}
                </a>
              {/if}
            {/each}
          </nav>
          
          <!-- Projects list - shown when in projects section -->
          {#if isInProjectsSection}
            <nav class="hidden md:flex items-center gap-4 text-xs lg:text-sm text-muted-foreground">
              {#each projectItems as item}
                <a
                  href="#{item.id}"
                  class="relative transition-all duration-200 {activeSection === item.id 
                    ? 'text-foreground font-medium' 
                    : 'hover:text-foreground'}"
                  onclick={(e) => handleClick(e, item.id)}
                  data-s-event="Project: {item.label}"
                  data-s-event-path="/#{item.id}"
                >
                  {item.label}
                  {#if activeSection === item.id}
                    <span class="absolute -bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                  {/if}
                </a>
              {/each}
            </nav>
          {/if}
        </div>
        
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
