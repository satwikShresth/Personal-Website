<script lang="ts">
	import type { PageData } from "./$types";
	import WriteupCard from "$lib/components/writeups/WriteupCard.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb";

	let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen bg-background flex flex-col">
	<main class="w-full pt-20 lg:pt-24 flex-1">
		<div class="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
			<Breadcrumb.Root class="mb-6">
				<Breadcrumb.List class="text-base">
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>Writeups</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>

			<div class="mb-8">
				<h1
					class="text-3xl lg:text-5xl font-extrabold mb-3 text-foreground"
					style="font-family: 'Playfair Display', serif;"
				>
					My <span class="text-primary">Writings</span>
				</h1>
				<p
					class="text-xl lg:text-2xl text-muted-foreground/90 leading-relaxed"
				>
					Random brain dumps, tweets, stats...
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each data.writeups as writeup}
					<a href={`/writeups/${writeup.slug}/`} class="block">
						<WriteupCard
							slug={writeup.slug}
							title={writeup.title}
							date={writeup.date}
							description={writeup.description}
							tags={writeup.tags}
							estimatedReadTime={writeup.estimatedReadTime}
						/>
					</a>
				{/each}
			</div>
		</div>
	</main>

	<Footer />
</div>
