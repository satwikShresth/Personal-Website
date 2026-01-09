<script lang="ts">
  import { cn } from "$lib/utils";

  interface GroupNodeLabelProps {
    className?: string;
    [key: string]: any;
  }

  let { className = "", ...restProps }: GroupNodeLabelProps = $props();
</script>

<div class="h-full w-full" {...restProps}>
  <div
    class={cn(
      "w-fit bg-gray-200 bg-secondary p-2 text-xs text-card-foreground",
      className,
    )}
  >
    <slot />
  </div>
</div>
