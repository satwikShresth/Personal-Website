export const load = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;

	try {
		const post = await import(`../../../lib/content/writeups/${slug}.mdx`);
		return {
			Content: post.default,
			meta: { ...post.metadata, slug },
		};
	} catch (err: any) {
		console.error('Error loading the post:', err);
		return {
			status: 500,
			error: `Could not load the post: ${err?.message || err}`,
		};
	}
};
