// lib/cn.ts
// ============================================================
// Classnames utility — merges Tailwind classes safely.
// Combines clsx (conditional classes) with tailwind-merge
// (deduplication of conflicting Tailwind utilities).
//
// Usage:
//   cn("px-4 py-2", isActive && "bg-accent", className)
// ============================================================

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}