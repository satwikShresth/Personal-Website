<script lang="ts">
  import { onMount } from "svelte";
  import HenonRustWorker from "$lib/workers/henon-rust.worker.ts?worker";
  
  let canvasRef: HTMLCanvasElement | null = $state(null);
  let containerRef: HTMLElement | null = $state(null);
  let isDarkMode = $state(false);
  let workers: Worker[] = $state([]);
  // Use non-reactive variables for rendering to avoid triggering Svelte rerenders
  let densityMap: Uint32Array | null = null;
  let maxDensity = 1;
  let imageData: ImageData | null = null;
  let currentWidth = 0;
  let currentHeight = 0;
  let renderAnimationFrame: number | null = null;
  const NUM_WORKERS = 1; // Use single worker - Rust is fast enough, parallelization would require splitting iterations
  
  function updateDarkMode() {
    isDarkMode = document.documentElement.classList.contains('dark');
  }
  
  function renderFromDensityMap(ctx: CanvasRenderingContext2D, width: number, height: number) {
    if (!densityMap || !imageData) return;
    
    const data = imageData.data;
    const r = isDarkMode ? 255 : 20;
    const g = isDarkMode ? 255 : 20;
    const b = isDarkMode ? 255 : 20;
    
    // Clear image data first (set all to transparent)
    data.fill(0);
    
    // Render all points with density-based opacity
    for (let i = 0; i < densityMap.length; i++) {
      const density = densityMap[i];
      if (density > 0) {
        const normalized = Math.min(density / maxDensity, 1.0);
        // More visible opacity curve - starts higher and scales better
        const opacity = Math.floor(80 + Math.pow(normalized, 0.35) * 175);
        
        const idx = i * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = opacity;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }
  
  // Schedule rendering using requestAnimationFrame to batch updates and prevent rerenders
  function scheduleRender(ctx: CanvasRenderingContext2D, width: number, height: number) {
    if (renderAnimationFrame !== null) {
      cancelAnimationFrame(renderAnimationFrame);
    }
    
    renderAnimationFrame = requestAnimationFrame(() => {
      renderFromDensityMap(ctx, width, height);
      renderAnimationFrame = null;
    });
  }
  
  function mergeDensityIntoMap(batchDensity: Uint32Array, width: number, height: number, batchMaxDensity: number) {
    if (!densityMap) return;
    
    // Merge batch density into the main density map
    // batchDensity contains the updated density values for pixels changed in this batch
    for (let i = 0; i < densityMap.length; i++) {
      if (batchDensity[i] > 0) {
        // Update with the new density value from the batch
        densityMap[i] = batchDensity[i];
        
        if (batchDensity[i] > maxDensity) {
          maxDensity = batchDensity[i];
        }
      }
    }
  }
  
  function mergePixelDataIntoDensityMap(pixelData: Uint8Array, width: number, height: number) {
    if (!densityMap) return;
    
    // Merge pixel data by extracting alpha channel as density indicator
    // Higher alpha = higher density, we'll accumulate them
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixelIdx = (y * width + x) * 4;
        const alpha = pixelData[pixelIdx + 3];
        
        if (alpha > 0) {
          const idx = y * width + x;
          // Accumulate density (alpha is already normalized, use it as weight)
          densityMap[idx] += alpha;
          
          if (densityMap[idx] > maxDensity) {
            maxDensity = densityMap[idx];
          }
        }
      }
    }
  }
  
  function startParallelGeneration() {
    if (!canvasRef || !containerRef) {
      return;
    }
    
    const container = containerRef;
    const canvas = canvasRef;
    
    // Get About and Experience sections to calculate bounds
    const aboutSection = document.getElementById('about');
    const experienceSection = document.getElementById('experience');
    
    if (!aboutSection || !experienceSection) {
      return;
    }
    
    const aboutRect = aboutSection.getBoundingClientRect();
    const experienceRect = experienceSection.getBoundingClientRect();
    const parentRect = container.parentElement?.getBoundingClientRect();
    
    if (!parentRect) {
      return;
    }
    
    // Calculate combined bounds covering both sections
    const top = Math.min(aboutRect.top, experienceRect.top);
    const bottom = Math.max(aboutRect.bottom, experienceRect.bottom);
    const left = Math.min(aboutRect.left, experienceRect.left);
    const right = Math.max(aboutRect.right, experienceRect.right);
    
    // Make canvas significantly larger than content area to prevent any cutoff
    // Use viewport dimensions as base, ensuring it extends well beyond content
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Calculate base dimensions
    const baseWidth = right - left;
    const baseHeight = bottom - top;
    
    // Make canvas extend significantly beyond - use viewport as minimum, add extra buffer
    const paddingX = Math.max(300, viewportWidth * 0.2); // At least 300px or 20% of viewport
    const paddingTop = Math.max(300, viewportHeight * 0.15); // At least 300px or 15% of viewport
    const paddingBottom = Math.max(800, viewportHeight * 0.5); // At least 800px or 50% of viewport for bottom
    
    // Calculate dimensions - ensure canvas is never smaller than viewport
    const width = Math.max(viewportWidth, Math.floor(baseWidth + paddingX * 2));
    const height = Math.max(viewportHeight * 2, Math.floor(baseHeight + paddingTop + paddingBottom));
    
    // Position to center on content but allow extension
    const topOffset = top - parentRect.top - paddingTop;
    const leftOffset = left - parentRect.left - paddingX;
    
    if (baseWidth === 0 || baseHeight === 0) {
      return;
    }
    
    currentWidth = width;
    currentHeight = height;
    
    // Position container to cover both sections with padding
    // Don't restrict container size - let it extend freely
    container.style.top = `${topOffset}px`;
    container.style.left = `${leftOffset}px`;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.style.overflow = 'visible';
    container.style.maxWidth = 'none';
    container.style.maxHeight = 'none';
    
    // Set canvas dimensions (larger to prevent cutoff)
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Initialize density map and image data (non-reactive to avoid rerenders)
    densityMap = new Uint32Array(width * height);
    maxDensity = 1;
    imageData = ctx.createImageData(width, height);
    
    // Stop existing workers
    workers.forEach(worker => {
      worker.postMessage({ type: 'stop' });
      worker.terminate();
    });
    workers = [];
    
    // Create a single worker for progressive generation
    const worker = new HenonRustWorker();
    const seed = 1;
    
    worker.onmessage = (e) => {
      const { type } = e.data;
      
      if (type === 'batch') {
        // Progressive batch update
        const { density: batchDensity, maxDensity: batchMaxDensity } = e.data;
        
        if (batchDensity && densityMap) {
          // Merge batch density into main map (non-reactive update)
          const batchDensityArray = new Uint32Array(batchDensity);
          mergeDensityIntoMap(batchDensityArray, width, height, batchMaxDensity);
          
          // Schedule render using requestAnimationFrame to batch updates
          if (ctx && imageData) {
            scheduleRender(ctx, width, height);
          }
        }
      } else if (type === 'complete') {
        // Final completion
        const { density: finalDensity, maxDensity: finalMaxDensity } = e.data;
        
        if (finalDensity && densityMap) {
          // Set final density map (non-reactive update)
          const finalDensityArray = new Uint32Array(finalDensity);
          for (let i = 0; i < densityMap.length; i++) {
            densityMap[i] = finalDensityArray[i];
          }
          maxDensity = finalMaxDensity;
          
          // Final render
          if (ctx && imageData) {
            renderFromDensityMap(ctx, width, height);
          }
          
          console.log('🌀 Hénon Attractor generation complete');
        }
        
        workers = [];
      } else if (type === 'error') {
        console.error('Worker error:', e.data.error);
        workers = [];
      }
    };
    
    worker.onerror = (error) => {
      console.error('❌ Worker error:', error);
      workers = [];
    };
    
    workers.push(worker);
    
    // Start progressive generation
    worker.postMessage({
      type: 'start',
      width: width,
      height: height,
      seed: seed,
      isDark: isDarkMode
    });
  }
  
  function handleResize() {
    startParallelGeneration();
  }
  
  onMount(async () => {
    updateDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const wasDark = isDarkMode;
      updateDarkMode();
      // Re-render when theme changes
      if (wasDark !== isDarkMode && canvasRef && containerRef) {
        startParallelGeneration();
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Wait for container to be properly sized
    setTimeout(() => {
      startParallelGeneration();
    }, 100);
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (renderAnimationFrame !== null) {
        cancelAnimationFrame(renderAnimationFrame);
      }
      workers.forEach(worker => {
        worker.postMessage({ type: 'stop' });
        worker.terminate();
      });
      workers = [];
    };
  });
</script>

<div bind:this={containerRef} class="absolute pointer-events-none" style="z-index: 0;">
  <canvas
    bind:this={canvasRef}
    style="display: block; background: transparent; width: 100%; height: 100%;"
  ></canvas>
</div>