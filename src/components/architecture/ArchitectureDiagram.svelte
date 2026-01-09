<script lang="ts">
  import { SvelteFlow, Background } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  import { onMount } from 'svelte';
  import InfoNode from './InfoNode.svelte';
  import CustomEdge from './CustomEdge.svelte';
  import { applyAutoLayout, addDefaultsToNodes } from './utils';
  import type { ArchitectureDiagramProps, NodeConfig, EdgeConfig } from './types';
  import * as Tooltip from '$lib/components/ui/tooltip';
  
  let { nodes, edges, direction = 'TB', height = 1000, padding = 40 }: ArchitectureDiagramProps = $props();
  
  let processedNodes = $state.raw<any[]>([]);
  let processedEdges = $state.raw<any[]>([]);
  let backgroundColor = $state('#ffffff');
  
  onMount(() => {
    const nodesWithDefaults = addDefaultsToNodes(nodes);
    const laidOutNodes = applyAutoLayout(nodesWithDefaults, edges, direction);
    // Filter out group nodes and remove parentId relationships
    processedNodes = laidOutNodes
      .filter(node => node.type !== 'labeledGroup')
      .map(node => {
        const { parentId, ...rest } = node;
        return {
          ...rest,
          position: node.position || { x: 0, y: 0 }
        };
      });
    
    // Set edge type and process edges
    processedEdges = edges.map(edge => ({
      ...edge,
      type: 'custom'
    }));
    
    // Get computed background color from CSS variable
    const updateColor = () => {
      const root = document.documentElement;
      const computed = getComputedStyle(root).getPropertyValue('--background').trim();
      backgroundColor = computed || '#ffffff';
    };
    
    updateColor();
    
    // Watch for theme changes
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  });
  
  const nodeTypes = {
    info: InfoNode
  };
  
  const edgeTypes = {
    custom: CustomEdge
  };
</script>

<Tooltip.Provider>
  <div class="w-full rounded-lg overflow-hidden bg-background" style="height: {height}px;">
    <!-- @ts-ignore: NodeConfig/EdgeConfig types are compatible with SvelteFlow's Node/Edge types -->
    <SvelteFlow 
      nodes={processedNodes}
      edges={processedEdges}
      {nodeTypes}
      {edgeTypes}
      fitView
      panOnDrag={false}
      panOnScroll={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
    >
      <Background gap={20} bgColor={backgroundColor} />
    </SvelteFlow>
  </div>
</Tooltip.Provider>
