// Web Worker for procedural Hénon Attractor generation
// Generates points strand by strand and sends them to main thread

type WorkerMessage = 
  | { type: 'start'; width: number; height: number }
  | { type: 'stop' };

type Point = {
  x: number;
  y: number;
};

// Hénon Attractor parameters - a animates from 1.02 to 1.3
const A_START = 1.02;
const A_END = 1.3;
const B = 0.37;

// Total iterations - increased for more detail and density
const TOTAL_ITERATIONS = 10_000_000;
const BATCH_SIZE = 3000; // Points per batch (strand) - smaller batches for more visible iteration

let isRunning = false;
let currentWidth = 0;
let currentHeight = 0;
let scaleX = 0;
let scaleY = 0;
let offsetX = 0;
let offsetY = 0;
let x = 0;
let y = 0;
let iterations = 0;
let warmupDone = false;
let currentA = A_START;

function sendBatch(points: Point[]) {
  self.postMessage({
    type: 'batch',
    points: points
  });
}

function sendComplete() {
  self.postMessage({
    type: 'complete'
  });
}

function generateStrand() {
  if (!isRunning) return;
  
  const batch: Point[] = [];
  
  // Warmup - skip first 100 iterations to get into attractor (only once)
  // Start with random initial points
  if (!warmupDone) {
    // Random initial conditions
    x = (Math.random() - 0.5) * 2; // Random between -1 and 1
    y = (Math.random() - 0.5) * 2; // Random between -1 and 1
    warmupDone = true;
  }
  
  // Generate a chunk of iterations - smaller chunks for more frequent visible updates
  const chunkSize = 10000; // Smaller chunks = more frequent batches = more visible iteration
  let chunkIterations = 0;
  
  while (chunkIterations < chunkSize && iterations < TOTAL_ITERATIONS && isRunning) {
    // Animate a from A_START to A_END over the course of iterations
    const progress = iterations / TOTAL_ITERATIONS;
    currentA = A_START + (A_END - A_START) * progress;
    
    // Hénon Attractor equations: x_{n+1} = 1 - a*x_n^2 + y_n, y_{n+1} = b*x_n
    const newX = 1 - currentA * x * x + y;
    y = B * x;
    x = newX;
    
    // Map to pixel coordinates using separate x and y scaling
    const px = x * scaleX + offsetX;
    const py = y * scaleY + offsetY;
    
    // Only include points within canvas bounds
    if (px >= 0 && px < currentWidth && py >= 0 && py < currentHeight) {
      batch.push({ x: Math.floor(px), y: Math.floor(py) });
      
      // Send batch when full
      if (batch.length >= BATCH_SIZE) {
        sendBatch([...batch]);
        batch.length = 0; // Clear batch
      }
    }
    
    iterations++;
    chunkIterations++;
  }
  
  // Send remaining points in batch
  if (batch.length > 0 && isRunning) {
    sendBatch(batch);
  }
  
  // Continue or finish
  if (iterations >= TOTAL_ITERATIONS || !isRunning) {
    if (isRunning) {
      sendComplete();
    }
    isRunning = false;
  } else {
    // Yield and continue
    setTimeout(() => {
      if (isRunning) generateStrand();
    }, 0);
  }
}

self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
  const message = e.data;
  
  if (message.type === 'start') {
    isRunning = true;
    currentWidth = message.width;
    currentHeight = message.height;
    
    // Reset state for new generation - start with random points
    x = (Math.random() - 0.5) * 2;
    y = (Math.random() - 0.5) * 2;
    iterations = 0;
    warmupDone = false;
    currentA = A_START;
    
    // Calculate scale and offset for Hénon Attractor
    // Hénon attractor typically spans roughly -1.5 to 1.5 in x, -0.4 to 0.4 in y
    // Scale independently for x and y to make it massive and fill the canvas
    const attractorWidth = 3.2;  // X range: -1.6 to 1.6
    const attractorHeight = 0.9; // Y range: -0.45 to 0.45
    // Use separate scaling to fill canvas - make it massive!
    scaleX = currentWidth / attractorWidth * 0.95; // 95% of width
    scaleY = currentHeight / attractorHeight * 0.95; // 95% of height  
    offsetX = currentWidth / 2.0;
    offsetY = currentHeight / 2.0;
    
    // Start generating
    generateStrand();
  } else if (message.type === 'stop') {
    isRunning = false;
  }
});