mod utils;

use wasm_bindgen::prelude::*;

// When the `console_error_panic_hook` feature is enabled, we can call the
// `set_panic_hook` function at least once during initialization, and then
// we will get better error messages if our code ever panics.
//
// For more details see
// https://github.com/rustwasm/console_error_panic_hook#readme
#[wasm_bindgen]
pub fn init() {
    utils::set_panic_hook();
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello from Rust, {}!", name)
}

/// Compute Julia set for a given complex constant c
/// Returns the number of iterations before the point escapes (or max_iter if it doesn't)
#[wasm_bindgen]
pub fn julia_iteration(cx: f64, cy: f64, zx: f64, zy: f64, max_iter: u32) -> u32 {
    let mut x = zx;
    let mut y = zy;
    let mut iter = 0;
    
    while iter < max_iter && (x * x + y * y) <= 4.0 {
        let xtemp = x * x - y * y + cx;
        y = 2.0 * x * y + cy;
        x = xtemp;
        iter += 1;
    }
    
    iter
}

/// Generate Hénon Attractor pixel data with parallel computation support
/// Returns RGBA pixel data for the entire canvas
/// seed: random seed for initial conditions (enables parallel execution with different seeds)
#[wasm_bindgen]
pub fn generate_henon_attractor(
    width: u32,
    height: u32,
    is_dark: bool,
    seed: u32,
) -> Vec<u8> {
    // Initialize density map (how many times each pixel is hit)
    let mut density = vec![0u32; (width * height) as usize];
    
    // Hénon Attractor parameters - a animates from 1.02 to 1.3
    let a_start: f64 = 1.02;
    let a_end: f64 = 1.3;
    let b: f64 = 0.37;
    
    // Use seed for random initial conditions (allows parallel execution)
    let mut rng_state = seed as u64;
    
    // Simple LCG for random number generation
    rng_state = rng_state.wrapping_mul(1103515245).wrapping_add(12345);
    let mut x: f64 = (rng_state as f64 / u64::MAX as f64) * 2.0 - 1.0; // Range: -1 to 1
    
    rng_state = rng_state.wrapping_mul(1103515245).wrapping_add(12345);
    let mut y: f64 = (rng_state as f64 / u64::MAX as f64) * 2.0 - 1.0; // Range: -1 to 1
    
    // Scale and offset for mapping to canvas
    let attractor_width = 3.2;
    let attractor_height = 0.9;
    let scale_x = (width as f64 / attractor_width) * 0.95;
    let scale_y = (height as f64 / attractor_height) * 0.95;
    let offset_x = width as f64 / 2.0;
    let offset_y = height as f64 / 2.0;
    
    // Total iterations - optimized for performance
    let iterations = 10_000_000;
    
    for i in 0..iterations {
        // Animate a from a_start to a_end over the course of iterations
        let progress = i as f64 / iterations as f64;
        let a = a_start + (a_end - a_start) * progress;
        
        // Hénon Attractor equations: x_{n+1} = 1 - a*x_n^2 + y_n, y_{n+1} = b*x_n
        let new_x = 1.0 - a * x * x + y;
        y = b * x;
        x = new_x;
        
        // Map to pixel coordinates
        let px = (x * scale_x + offset_x) as i32;
        let py = (y * scale_y + offset_y) as i32;
        
        // Increment density if within bounds
        if px >= 0 && px < width as i32 && py >= 0 && py < height as i32 {
            let idx = (py as u32 * width + px as u32) as usize;
            density[idx] = density[idx].saturating_add(1);
        }
    }
    
    // Find maximum density for normalization
    let max_density = density.iter().max().copied().unwrap_or(1) as f64;
    
    // Convert density map to RGBA pixels
    let mut pixels = Vec::with_capacity((width * height * 4) as usize);
    
    for &d in &density {
        if d > 0 {
            // Normalize density to 0-1 range
            let normalized = (d as f64 / max_density).min(1.0);
            
            // Map density to opacity - more visible, higher opacity range
            let opacity = (80.0 + normalized.powf(0.35) * 175.0) as u8;
            
            if is_dark {
                pixels.push(255);
                pixels.push(255);
                pixels.push(255);
                pixels.push(opacity);
            } else {
                pixels.push(20);
                pixels.push(20);
                pixels.push(20);
                pixels.push(opacity);
            }
        } else {
            // Transparent background
            pixels.push(0);
            pixels.push(0);
            pixels.push(0);
            pixels.push(0);
        }
    }
    
    pixels
}

/// Generate Clifford Attractor (butterfly/misty effect) pixel data
/// Returns RGBA pixel data for the entire canvas
#[wasm_bindgen]
pub fn generate_clifford_attractor(
    width: u32,
    height: u32,
    is_dark: bool,
) -> Vec<u8> {
    // Initialize density map (how many times each pixel is hit)
    let mut density = vec![0u32; (width * height) as usize];
    
    // Clifford Attractor parameters - creates butterfly-like shape
    let a: f64 = -1.4;
    let b: f64 = 1.6;
    let c: f64 = 1.0;
    let d: f64 = 0.7;
    
    // Initial conditions
    let mut x: f64 = 0.1;
    let mut y: f64 = 0.1;
    
    // Scale and offset for mapping to canvas - larger scale = bigger pattern
    let scale = (width.min(height) as f64) / 2.5; // Increased from 4.0 to 2.5 for larger pattern
    let offset_x = width as f64 / 2.0;
    let offset_y = height as f64 / 2.0;
    
    // Run many iterations to build up density - more iterations = more detail
    let iterations = 5_000_000;
    
    for _ in 0..iterations {
        // Clifford Attractor equations
        let old_x = x;
        let old_y = y;
        
        x = (a * old_y).sin() + c * (a * old_x).cos();
        y = (b * old_x).sin() + d * (b * old_y).cos();
        
        // Map to pixel coordinates
        let px = (x * scale + offset_x) as i32;
        let py = (y * scale + offset_y) as i32;
        
        // Increment density if within bounds
        if px >= 0 && px < width as i32 && py >= 0 && py < height as i32 {
            let idx = (py as u32 * width + px as u32) as usize;
            density[idx] += 1;
        }
    }
    
    // Find maximum density for normalization
    let max_density = density.iter().max().copied().unwrap_or(1) as f64;
    
    // Convert density map to RGBA pixels
    let mut pixels = Vec::with_capacity((width * height * 4) as usize);
    
    for &d in &density {
        if d > 0 {
            // Normalize density to 0-1 range
            let normalized = (d as f64 / max_density).min(1.0);
            
            // Map density to opacity - more visible, higher opacity range
            // Use a gentler curve for smoother gradients but higher base opacity
            let opacity = (50.0 + normalized.powf(0.4) * 205.0) as u8; // 50-255 opacity range for better visibility
            
            if is_dark {
                // Dark mode: white/light color - brighter
                pixels.push(255);
                pixels.push(255);
                pixels.push(255);
                pixels.push(opacity);
            } else {
                // Light mode: dark color - darker for contrast
                pixels.push(20);
                pixels.push(20);
                pixels.push(20);
                pixels.push(opacity);
            }
        } else {
            // Transparent background
            pixels.push(0);
            pixels.push(0);
            pixels.push(0);
            pixels.push(0);
        }
    }
    
    pixels
}