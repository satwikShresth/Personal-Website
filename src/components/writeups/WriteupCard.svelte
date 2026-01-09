<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import Calendar from '@lucide/svelte/icons/calendar';
  import Clock from '@lucide/svelte/icons/clock';
  
  interface WriteupCardProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: Array<string>;
    estimatedReadTime?: number;
  }
  
  let { slug, title, date, description, tags, estimatedReadTime }: WriteupCardProps = $props();
  
  const formattedDate = $derived(new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));
  
  const readTime = $derived(estimatedReadTime || Math.ceil(description.length / 1000) + 2);
</script>

<Card.Root class="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
  <Card.Content class="p-5">
    <div class="flex items-center justify-between mb-3 text-sm text-muted-foreground">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1.5">
          <Calendar class="size-3.5" />
          <span>{formattedDate}</span>
        </div>
        {#if estimatedReadTime}
          <div class="flex items-center gap-1.5">
            <Clock class="size-3.5" />
            <span>{readTime} min read</span>
          </div>
        {/if}
      </div>
    </div>
    
    <Card.Title class="text-xl font-bold mb-3 text-foreground">
      {title}
    </Card.Title>
    
    <p class="text-base mb-4 leading-relaxed text-muted-foreground">
      {description}
    </p>
    
    <div class="flex flex-wrap gap-2 mt-auto">
      {#each tags as tag}
        <Badge variant="outline">{tag}</Badge>
      {/each}
    </div>
  </Card.Content>
</Card.Root>
