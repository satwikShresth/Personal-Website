export async function load() {
	// Dynamically import all MDX files from content directory
	const modules = import.meta.glob<{ default: any; metadata: any }>('../../lib/content/writeups/*.mdx', { eager: true });

	const writeups = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.mdx', '') || '';
		const metadata = (module as any).metadata;

		if (metadata) {
			writeups.push({
				slug,
				...metadata
			});
		}
	}

	// Sort by date, newest first
	writeups.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		writeups
	};
}
