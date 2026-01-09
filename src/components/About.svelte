<script lang="ts">
  import Mail from "@lucide/svelte/icons/mail";
  import Linkedin from "@lucide/svelte/icons/linkedin";
  import FileText from "@lucide/svelte/icons/file-text";
  import Github from "@lucide/svelte/icons/github";
  import { Button } from "$lib/components/ui/button";
  
  let { id = 'about' }: { id?: string } = $props();
  
  const summary = 'Lately, I have been focusing on hiking, climbing & exploring national parks.';
</script>

<section {id} data-project-section={id} class="scroll-mt-32 mb-20 pb-20 border-b border-border/20">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
    <div class="lg:col-span-8 space-y-6 lg:flex lg:flex-col lg:justify-center">
      <div class="space-y-4 text-foreground leading-relaxed text-base">
        <h3 class="text-lg font-medium">I like to code</h3>
        <p>
          Check out my <a href="#openmario" class="text-primary hover:underline">projects</a>, <a href="#experience" class="text-primary hover:underline">experiences</a>, etc....
        </p>
        <p class="text-base md:text-lg">
          Lately, I have been focusing on{' '}
          <span class="line-through text-muted-foreground/50">
            creating full stack web applications that deliver end-to-end solutions while maintaining high performance, scalability, and clean architecture
          </span>{' '}
          hiking, climbing & exploring national parks.
        </p>
        <div class="flex items-center gap-4 flex-wrap pt-2">
          <Button
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            aria-label="Resume"
            data-s-event="Resume Download"
            data-s-event-path="/about"
          >
            <FileText />
            Resume
          </Button>
          <Button
            href="mailto:satwik.shresth@gmail.com"
            variant="outline"
            aria-label="Email"
            data-s-event="Email Click"
            data-s-event-path="/about"
          >
            <Mail />
            Email
          </Button>
          <Button
            href="https://linkedin.com/in/satwik-shresth/"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            aria-label="LinkedIn"
            data-s-event="LinkedIn Click"
            data-s-event-path="/about"
          >
            <Linkedin />
            LinkedIn
          </Button>
        </div>
      </div>
    </div>
    
    <div class="lg:col-span-4 lg:flex lg:flex-col lg:justify-center">
      <div class="flex justify-center lg:justify-start">
        <img 
          src="/my_photo.png" 
          alt="Satwik Shresth" 
          class="w-[180px] sm:w-[280px] lg:w-full lg:max-w-none h-[180px] sm:h-[280px] lg:h-auto object-cover rounded-lg shadow-lg" 
        />
      </div>
    </div>
  </div>
</section>
