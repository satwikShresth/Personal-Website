<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import Sun from "@lucide/svelte/icons/sun";
  import Moon from "@lucide/svelte/icons/moon";
</script>

<button
  onclick={toggleMode}
  class="relative p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 border border-border/50 hover:border-border flex items-center justify-center w-9 h-9"
  aria-label="Toggle theme"
>
  <Sun
    class="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 absolute text-muted-foreground"
  />
  <Moon
    class="h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 absolute text-muted-foreground"
  />
  <span class="sr-only">Toggle theme</span>
</button>
