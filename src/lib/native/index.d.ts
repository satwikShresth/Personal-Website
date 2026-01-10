/* tslint:disable */
/* eslint-disable */

/**
 * Generate Clifford Attractor (butterfly/misty effect) pixel data
 * Returns RGBA pixel data for the entire canvas
 */
export function generate_clifford_attractor(width: number, height: number, is_dark: boolean): Uint8Array;

/**
 * Generate Hénon Attractor pixel data with parallel computation support
 * Returns RGBA pixel data for the entire canvas
 * seed: random seed for initial conditions (enables parallel execution with different seeds)
 */
export function generate_henon_attractor(width: number, height: number, is_dark: boolean, seed: number): Uint8Array;

export function greet(name: string): string;

export function init(): void;

/**
 * Compute Julia set for a given complex constant c
 * Returns the number of iterations before the point escapes (or max_iter if it doesn't)
 */
export function julia_iteration(cx: number, cy: number, zx: number, zy: number, max_iter: number): number;
