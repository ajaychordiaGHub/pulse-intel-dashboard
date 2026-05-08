import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category } from "./mock-data";

export type Frequency = "manual" | "daily" | "weekly";

export type Monitor = {
  hostName: string;
  hostUrl: string;
  competitors: { name: string; url: string }[];
  targets: string[]; // keywords / target companies
  categories: Category[];
  frequency: Frequency;
  createdAt: string;
};

type State = {
  monitor: Monitor | null;
  setMonitor: (m: Monitor) => void;
  reset: () => void;
};

export const useMonitorStore = create<State>()(
  persist(
    (set) => ({
      monitor: null,
      setMonitor: (m) => set({ monitor: m }),
      reset: () => set({ monitor: null }),
    }),
    { name: "pulseintel-monitor" },
  ),
);
