import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry point for the library
  entry: ['src/index.ts'],

  // Output formats for maximum compatibility
  format: ['cjs', 'esm'],

  // Generate TypeScript declaration files
  dts: true,

  // Do not split chunks for a cleaner output
  splitting: false,

  // Include source maps for easier debugging
  sourcemap: true,

  // Clean the dist directory before building
  clean: true,

  // External peer dependencies to avoid bundling
  external: ['react', 'react-dom', 'styled-components'],

  // Enable tree-shaking to reduce bundle size
  treeshake: true,

  // Do not minify to keep the code readable (minify in your final app)
  minify: false,

  // Target modern JavaScript
  target: 'es2020',

  // Build for the browser
  platform: 'browser',

  // Ensure Node.js polyfills are not included
  platform: 'browser',
});
