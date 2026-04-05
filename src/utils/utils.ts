import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function isNumberKey(key: string) {
  const n = Number(key);
  return Number.isInteger(n) && n >= 1 && n <= 9;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
