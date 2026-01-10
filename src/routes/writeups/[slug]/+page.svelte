<script lang="ts">
	// import type { PageData } from "./$types";
	import Footer from "$lib/components/Footer.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { Separator } from "$lib/components/ui/separator";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb";
	import { Calendar } from "@lucide/svelte/icons";

	const { data } = $props();

	const title = $derived(data.meta?.title || "");
	const titleWords = $derived(title.trim().split(/\s+/));
	const lastWord = $derived(
		titleWords.length > 1 ? titleWords[titleWords.length - 1] : "",
	);
	const normalText = $derived(
		titleWords.length > 1 ? titleWords.slice(0, -1).join(" ") : title,
	);
	const description = $derived(data.meta?.description || "");
	const tags = $derived(data.meta?.tags || []);
	const date = $derived(data.meta?.date || "");
</script>

<svelte:head>
	<title>{title} | Satwik Shresth</title>
</svelte:head>

<div class="min-h-screen bg-background flex flex-col">
	<main class="w-full pt-20 lg:pt-24 flex-1">
		<div class="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
			<Breadcrumb.Root class="mb-6">
				<Breadcrumb.List class="text-base">
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/writeups/">Writeups</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>{title}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>

			<article>
				<header class="mb-8">
					<h1
						class="text-4xl lg:text-6xl font-extrabold mb-6 text-foreground"
						style="font-family: 'Playfair Display', serif;"
					>
						{normalText}{#if lastWord}
							<span class="text-primary">{lastWord}</span>{/if}
					</h1>

					<p
						class="text-xl lg:text-2xl text-muted-foreground/90 leading-relaxed mb-8"
					>
						{description}
					</p>

					<div class="flex flex-col gap-4 mb-8">
						<div class="flex flex-wrap gap-2">
							{#each tags as tag}
								<Badge variant="default">{tag}</Badge>
							{/each}
						</div>

						<div
							class="flex items-center gap-6 text-sm text-muted-foreground"
						>
							<div class="flex items-center gap-2">
								<Calendar class="size-4" />
								<span>{date}</span>
							</div>
							<div class="flex items-center gap-2">
								<span>Satwik Shresth</span>
							</div>
						</div>
					</div>

					<Separator class="w-3/4" />
				</header>

				<div
					class="writeup-content space-y-6 text-foreground leading-relaxed text-base md:text-lg"
				>
					{#if data.Content}
						<data.Content />
					{/if}
				</div>
			</article>
		</div>
	</main>

	<Footer />
</div>

<style>
	:global(.writeup-content h1),
	:global(.writeup-content h2),
	:global(.writeup-content h3),
	:global(.writeup-content h4) {
		font-family: "Playfair Display", serif;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	:global(.writeup-content h2) {
		font-size: 1.875rem;
		margin-top: 2.5rem;
	}

	:global(.writeup-content h3) {
		font-size: 1.5rem;
	}

	:global(.writeup-content p) {
		margin-bottom: 1.25rem;
		line-height: 1.75;
	}

	:global(.writeup-content ul),
	:global(.writeup-content ol) {
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
		line-height: 1.75;
	}

	:global(.writeup-content li) {
		margin-bottom: 0.5rem;
	}

	:global(.writeup-content li > p) {
		margin-bottom: 0.5rem;
	}

	:global(.writeup-content strong) {
		font-weight: 600;
	}

	:global(.writeup-content code) {
		background-color: var(--muted);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
		font-family: "SF Mono", "Monaco", "Consolas", monospace;
	}

	:global(.writeup-content pre) {
		background-color: var(--muted);
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: 1.25rem;
	}

	:global(.writeup-content pre code) {
		background-color: transparent;
		padding: 0;
	}

	:global(.writeup-content a) {
		color: var(--primary);
		text-decoration: underline;
	}

	:global(.writeup-content a:hover) {
		opacity: 0.8;
	}

	:global(.writeup-content img) {
		margin: 2rem 0;
		border-radius: 0.5rem;
	}

	:global(.writeup-content blockquote) {
		border-left: 4px solid var(--border);
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: var(--muted-foreground);
	}
</style>
