export default Object.fromEntries(
  Object.entries(import.meta.glob('./*.mdx', { eager: true })).map(
    ([path, module]) => [
      // @ts-ignore: something
      path.match(/\.\/(.+)\.mdx$/)[1],
      // @ts-ignore: something
      { component: module.default, metadata: module.metadata },
    ],
  ),
)
