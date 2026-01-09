<script lang="ts">
  import { Panel, type NodeProps } from '@xyflow/svelte';
  import BaseNode from './base-node.svelte';
  import GroupNodeLabel from './group-node-label.svelte';
  import { getIcon } from './iconMap';
  import type { LabelData } from './types';
  
  let { selected = false, data, style = {} }: NodeProps = $props();
  
  const position = 'bottom-right';
  
  function getLabelClassName(pos: string) {
    switch (pos) {
      case 'top-left':
        return 'rounded-br-sm';
      case 'top-center':
        return 'rounded-b-sm';
      case 'top-right':
        return 'rounded-bl-sm';
      case 'bottom-left':
        return 'rounded-tr-sm';
      case 'bottom-right':
        return 'rounded-tl-sm';
      case 'bottom-center':
        return 'rounded-t-sm';
      default:
        return 'rounded-tl-sm';
    }
  }
  
  const styleString = $derived(
    Object.entries(style)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => {
        const cssKey = k.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssKey}: ${v}`;
      })
      .join('; ')
  );
  
  const IconComponent = $derived(
    data.label && typeof data.label === 'object' && 'iconName' in data.label
      ? getIcon((data.label as LabelData).iconName)
      : null
  );
</script>

<BaseNode
  selected={selected}
  className="h-full overflow-hidden rounded-sm bg-white bg-opacity-50 p-0"
  style={styleString}
>
  <Panel class="m-0 p-0" position={position}>
    {#if data.label}
      <GroupNodeLabel className={getLabelClassName(position)}>
        {#if IconComponent && data.label && typeof data.label === 'object' && 'iconName' in data.label}
          {#if IconComponent}
            {@const Icon = IconComponent}
            <Icon style="font-size: 12px; margin-right: 4px;" />
          {/if}
          <span style="font-size: 12px;">{(data.label as LabelData).text}</span>
        {:else if data.label && typeof data.label === 'string'}
          <span style="font-size: 12px;">{data.label}</span>
        {/if}
      </GroupNodeLabel>
    {/if}
  </Panel>
</BaseNode>
