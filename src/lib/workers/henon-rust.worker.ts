// Web Worker for Hénon Attractor generation
// Generates progressively, sending batches for smooth rendering

type WorkerMessage = 
  | { type: 'start'; width: number; height: number; seed: number; isDark: boolean }
  | { type: 'stop' };

// Hénon Attractor parameters - a animates from 1.02 to 1.3
const A_START = 1.02;
const A_END = 1.3;
const B = 0.37;

// Total iterations
const TOTAL_ITERATIONS = 5_000_000;

// Batch size - process in small chunks and send updates
const BATCH_SIZE = 25000; // Process 25k iterations at a time, then send update

// Delay between batches for smooth, slow rendering (milliseconds)
const BATCH_DELAY = 20; // 20ms delay = ~50 batches per second

let isRunning = false;

// Simple LCG for random number generation
function nextRandom(state: number): number {
  return ((state * 1103515245 + 12345) & 0x7fffffff) >>> 0;
}

function randomValue(seed: number, index: number): number {
  let state = (seed + index) >>> 0;
  for (let i = 0; i < 10; i++) {
    state = nextRandom(state);
  }
  return (state / 2147483647) * 2.0 - 1.0; // Range: -1 to 1
}

async function generateHenonAttractor(
  width: number, 
  height: number, 
  isDark: boolean, 
  seed: number
) {
  // Initialize density map
  const density = new Uint32Array(width * height);
  
  // Random initial conditions based on seed
  let x = randomValue(seed, 0);
  let y = randomValue(seed, 1);
  
  // Scale and offset for mapping to canvas
  // Hénon attractor has natural bounds: x ~ -1.5 to 1.5, y ~ -0.4 to 0.4
  // Use larger dimensions to shrink the pattern (larger attractor size = smaller pattern)
  const attractorWidth = 4.5;  // X range: -2.25 to 2.25 (larger = smaller pattern)
  const attractorHeight = 1.1; // Y range: -0.6 to 0.6 (larger = smaller pattern)
  // Scale to canvas - larger attractor dimensions result in smaller pattern
  const scaleX = (width / attractorWidth);
  const scaleY = (height / attractorHeight);
  const offsetX = width / 2.0;
  const offsetY = height / 2.0;
  
  let currentMaxDensity = 1;
  
  // Generate attractor in batches with progressive updates
  for (let i = 0; i < TOTAL_ITERATIONS; i += BATCH_SIZE) {
    if (!isRunning) break;
    
    const batchEnd = Math.min(i + BATCH_SIZE, TOTAL_ITERATIONS);
    const batchDensity = new Uint32Array(width * height);
    
    // Process a batch of iterations
    for (let j = i; j < batchEnd; j++) {
      // Animate a from A_START to A_END over the course of iterations
      const progress = j / TOTAL_ITERATIONS;
      const a = A_START + (A_END - A_START) * progress;
      
      // Hénon Attractor equations: x_{n+1} = 1 - a*x_n^2 + y_n, y_{n+1} = b*x_n
      const newX = 1.0 - a * x * x + y;
      y = B * x;
      x = newX;
      
      // Map to pixel coordinates (flip Y to reverse top/bottom)
      const px = Math.floor(x * scaleX + offsetX);
      const py = Math.floor(-y * scaleY + offsetY);
      
      // Increment density if within bounds
      if (px >= 0 && px < width && py >= 0 && py < height) {
        const idx = py * width + px;
        const newDensity = density[idx] + 1;
        density[idx] = Math.min(newDensity, 0xFFFFFFFF);
        // Track updated pixels in this batch (store the new density value)
        if (batchDensity[idx] < newDensity) {
          batchDensity[idx] = newDensity;
        }
        if (newDensity > currentMaxDensity) {
          currentMaxDensity = newDensity;
        }
      }
    }
    
    // Send batch update for progressive rendering
    if (isRunning) {
      self.postMessage({
        type: 'batch',
        density: batchDensity,
        maxDensity: currentMaxDensity,
        progress: (batchEnd / TOTAL_ITERATIONS) * 100
      }, [batchDensity.buffer]);
    }
    
    // Delay for smooth, slow rendering
    await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
  }
  
  // Send completion with final density map
  if (isRunning) {
    self.postMessage({
      type: 'complete',
      density: density,
      maxDensity: currentMaxDensity,
      width: width,
      height: height,
      isDark: isDark
    }, [density.buffer]);
  }
}

self.addEventListener('message', async (e: MessageEvent<WorkerMessage>) => {
  const message = e.data;
  
  if (message.type === 'start') {
    isRunning = true;
    
    const { width, height, seed, isDark } = message;
    
    try {
      // Generate attractor with progressive batch updates
      await generateHenonAttractor(width, height, isDark, seed);
    } catch (error) {
      console.error('Worker error:', error);
      self.postMessage({
        type: 'error',
        error: String(error)
      });
    }
    
    isRunning = false;
  } else if (message.type === 'stop') {
    isRunning = false;
  }
});