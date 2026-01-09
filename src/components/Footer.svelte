<script lang="ts">
  import Mail from "@lucide/svelte/icons/mail";
  import Linkedin from "@lucide/svelte/icons/linkedin";
  import Github from "@lucide/svelte/icons/github";
  import { Button } from "$lib/components/ui/button";
</script>

<footer class="border-t border-border/20 bg-background">
  <div class="max-w-5xl mx-auto px-6 lg:px-8 py-12">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Satwik Shresth. All rights reserved.</p>
      </div>
      
      <div class="flex items-center gap-2">
        <Button
          href="https://github.com/satwik-shresth"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="icon"
          aria-label="GitHub"
          class="w-9 h-9"
        >
          <Github class="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button
          href="https://linkedin.com/in/satwik-shresth/"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="icon"
          aria-label="LinkedIn"
          class="w-9 h-9"
        >
          <Linkedin class="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button
          href="mailto:satwik.shresth@gmail.com"
          variant="ghost"
          size="icon"
          aria-label="Email"
          class="w-9 h-9"
        >
          <Mail class="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  </div>
</footer>