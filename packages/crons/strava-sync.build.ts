import { build } from 'bun';

const result = await build({
   entrypoints: ['./packages/crons/strava-sync.cron.ts'],
   outdir: './.output/crons',
   target: 'bun',
   format: 'esm',
   minify: {
      whitespace: true,
      identifiers: true,
      syntax: true
   },
   naming: '[name].js',
   external: ['bun:sqlite'],
   packages: 'bundle',
   env: 'disable',
   drop: ['debugger']
});

if (!result.success) {
   console.error('Build failed');
   for (const log of result.logs) {
      console.error(log);
   }
   process.exit(1);
}

console.log('Build successful:');
for (const output of result.outputs) {
   const size = (output.size / 1024).toFixed(2);
   console.log(`  ${output.path} (${size} KB)`);
}
