<script lang="ts">
	import * as Tooltip from "$lib/components/ui/tooltip";
	import "./layout.css";
	import { ModeWatcher } from "mode-watcher";
</script>

<Tooltip.Provider>
	<ModeWatcher />
	<slot />
</Tooltip.Provider>
