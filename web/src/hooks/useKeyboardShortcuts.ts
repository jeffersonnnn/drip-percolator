"use client";

import { useEffect } from "react";
import { useTradeStore } from "@/stores/useTradeStore";

export function useKeyboardShortcuts() {
  const { setSide, reset } = useTradeStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.key.toLowerCase()) {
        case "b":
          setSide("long");
          break;
        case "s":
          setSide("short");
          break;
        case "escape":
          reset();
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setSide, reset]);
}
