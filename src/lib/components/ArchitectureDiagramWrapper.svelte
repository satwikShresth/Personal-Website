<script lang="ts">
  import ArchitectureDiagram from './architecture/ArchitectureDiagram.svelte';
  import type { NodeConfig, EdgeConfig } from './architecture/types';

  interface Props {
    nodes: Array<NodeConfig>;
    edges: Array<EdgeConfig>;
    direction?: 'TB' | 'LR' | 'BT' | 'RL';
    height?: number | string;
    padding?: number;
  }

  let { nodes, edges, direction = 'TB', height = 500, padding = 5 }: Props = $props();
</script>

<ArchitectureDiagram 
  {nodes}
  {edges}
  {direction}
  {height}
  {padding}
/>
