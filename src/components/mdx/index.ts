export default Object.fromEntries(
  Object.entries(import.meta.glob('./*.mdx', { eager: true })).map(
    ([path, module]) => [
      path.match(/\.\/(.+)\.mdx$/)[1],
      { component: module.default, metadata: module.metadata },
    ],
  ),
)
