import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type WithElementRef<T> = T & {
  ref?: import("svelte").Snippet | import("svelte").ComponentPublicInstance | HTMLElement | null;
};
