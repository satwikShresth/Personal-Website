<script lang="ts">
  import {
    BaseEdge,
    EdgeLabel,
    getBezierPath,
    type EdgeProps,
  } from "@xyflow/svelte";
  import { onMount } from "svelte";

  let {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    label,
    interactionWidth,
    labelStyle,
    style,
    ...restProps
  }: EdgeProps = $props();

  const pathData = $derived(
    getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
    }),
  );

  const path = $derived(pathData[0]);
  const labelX = $derived(pathData[1]);
  const labelY = $derived(pathData[2]);

  let labelColor = $state("#000000");
  let backgroundColor = $state("#ffffff");

  onMount(() => {
    const updateColors = () => {
      const root = document.documentElement;
      const computedFg = getComputedStyle(root)
        .getPropertyValue("--foreground")
        .trim();
      const computedBg = getComputedStyle(root)
        .getPropertyValue("--background")
        .trim();
      labelColor = computedFg || "#000000";
      backgroundColor = computedBg || "#ffffff";
    };

    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  });
</script>

<BaseEdge {id} {path} {interactionWidth} {labelStyle} {style} {...restProps} />

{#if label}
  <EdgeLabel
    x={labelX}
    y={labelY}
    style={`fill: ${labelColor}; background-color: ${backgroundColor}; font-size: 12px; font-weight: 500; padding: 2px 4px; border-radius: 3px;`}
  >
    {label}
  </EdgeLabel>
{/if}
