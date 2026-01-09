<script lang="ts">
  import { cn } from "$lib/utils";

  interface Props {
    selected?: boolean;
    className?: string;
    style?: string;
    [key: string]: any;
  }

  let {
    selected = false,
    className = "",
    style = "",
    ...restProps
  }: Props = $props();
</script>

<div
  class={cn(
    "relative rounded-md border bg-card p-5 text-card-foreground",
    className,
    selected ? "border-muted-foreground shadow-lg" : "",
    "hover:ring-1",
  )}
  {style}
  tabindex="0"
  {...restProps}
>
  <slot />
</div>
