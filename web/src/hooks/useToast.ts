"use client";

import { useToastStore } from "@/components/ui/Toast";

export function useToast() {
  const addToast = useToastStore((s) => s.addToast);
  return { showToast: addToast };
}
