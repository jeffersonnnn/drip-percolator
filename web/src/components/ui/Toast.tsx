"use client";

import React from "react";
import { create } from "zustand";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export function toast(message: string, type: ToastType = "info") {
  useToastStore.getState().addToast(message, type);
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({
  toast: t,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: () => void;
}) {
  const Icon =
    t.type === "success"
      ? CheckCircle
      : t.type === "error"
        ? AlertCircle
        : Info;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border backdrop-blur-sm animate-in slide-in-from-right",
        t.type === "success" && "bg-green-dark/80 border-green/30 text-green",
        t.type === "error" && "bg-red-dark/80 border-red/30 text-red",
        t.type === "info" && "bg-surface-2/90 border-border text-foreground"
      )}
    >
      <Icon size={16} className="mt-0.5 shrink-0" />
      <span className="text-xs font-mono flex-1">{t.message}</span>
      <button onClick={onDismiss} className="shrink-0 opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
}
