<script lang="ts">
	import { onMount } from "svelte";
	import Portfolio from "$lib/components/Portfolio.svelte";
	import { configure } from "onedollarstats";

	configure({
		collectorUrl: "https://collector.onedollarstats.com/events",
		autocollect: true,
		hashRouting: true,
	});
</script>

<Portfolio />
