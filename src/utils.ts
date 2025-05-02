import { KeyboardEvent } from "react";

export function isNumberKey(evt: KeyboardEvent<HTMLInputElement>) {
  // const charCode = evt.key;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  // return true;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
