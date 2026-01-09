<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import * as Card from "$lib/components/ui/card";
  import { getIcon } from "./iconMap";
  import type { LabelData } from "./types";

  let { data }: NodeProps = $props();

  const IconComponent = $derived(
    data.label && typeof data.label === "object" && "iconName" in data.label
      ? getIcon((data.label as LabelData).iconName)
      : null,
  );

  const tooltipData = $derived(() => {
    const card = data.Card as any;
    if (!card || (!card.Header && !card.Body && !card.Footer)) return null;
    return {
      header: card.Header || "",
      body: card.Body || "",
      footer: card.Footer || "",
    };
  });

  // Extract border color from style
  const borderStyle = $derived(() => {
    const border = (data.style as any)?.border;
    if (border) {
      const parts = border.split(" ");
      if (parts.length >= 3) {
        const color = parts.slice(2).join(" ");
        return `border: ${parts[0]} ${parts[1]} ${color}`;
      }
      return `border: ${border}`;
    }
    return "";
  });
</script>

<div class="relative">
  <Handle type="target" position={Position.Top} class="!bg-border !w-2 !h-2" />

  {#if tooltipData()}
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Card.Root
          class="px-3 py-1.5 min-w-[120px] cursor-default"
          style={borderStyle()}
        >
          <Card.Content
            class="p-0 flex items-center justify-center gap-1.5 text-card-foreground"
          >
            {#if IconComponent && data.label && typeof data.label === "object" && "iconName" in data.label}
              {#if IconComponent}
                {@const Icon = IconComponent}
                <Icon class="size-3.5 text-card-foreground" />
              {/if}
              <span class="text-sm">{(data.label as LabelData).text}</span>
            {:else if data.label && typeof data.label === "string"}
              <span class="text-sm">{data.label}</span>
            {/if}
          </Card.Content>
        </Card.Root>
      </Tooltip.Trigger>
      <Tooltip.Content side="top" class="max-w-[240px]">
        {#if tooltipData()!.header}
          <div class="font-semibold mb-1 text-foreground">
            {tooltipData()!.header}
          </div>
        {/if}
        {#if tooltipData()!.body}
          <div class="text-sm mb-1 text-foreground">{tooltipData()!.body}</div>
        {/if}
        {#if tooltipData()!.footer}
          <div class="text-xs italic text-muted-foreground">
            {tooltipData()!.footer}
          </div>
        {/if}
      </Tooltip.Content>
    </Tooltip.Root>
  {:else}
    <Card.Root class="px-3 py-1.5 min-w-[120px]" style={borderStyle()}>
      <Card.Content
        class="p-0 flex items-center justify-center gap-1.5 text-card-foreground"
      >
        {#if IconComponent && data.label && typeof data.label === "object" && "iconName" in data.label}
          {#if IconComponent}
            {@const Icon = IconComponent}
            <Icon class="size-3.5 text-card-foreground" />
          {/if}
          <span class="text-sm">{(data.label as LabelData).text}</span>
        {:else if data.label && typeof data.label === "string"}
          <span class="text-sm">{data.label}</span>
        {/if}
      </Card.Content>
    </Card.Root>
  {/if}

  <Handle
    type="source"
    position={Position.Bottom}
    class="!bg-border !w-2 !h-2"
  />
</div>
