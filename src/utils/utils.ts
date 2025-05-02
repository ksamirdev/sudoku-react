import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function isNumberKey(key: string) {
  return Number.isFinite(Number(key));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
