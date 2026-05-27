"use client";

import { create } from "zustand";

interface UIState {
  commandPaletteOpen: boolean;
  mobileSidebarOpen: boolean;
  selectedCompany: string;
  selectedAlertFilter: string;
  toggleCommandPalette: (open?: boolean) => void;
  toggleMobileSidebar: (open?: boolean) => void;
  setSelectedCompany: (company: string) => void;
  setSelectedAlertFilter: (filter: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  commandPaletteOpen: false,
  mobileSidebarOpen: false,
  selectedCompany: "Tesla",
  selectedAlertFilter: "all",
  toggleCommandPalette: (open) =>
    set((state) => ({
      commandPaletteOpen: open ?? !state.commandPaletteOpen,
    })),
  toggleMobileSidebar: (open) =>
    set((state) => ({
      mobileSidebarOpen: open ?? !state.mobileSidebarOpen,
    })),
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setSelectedAlertFilter: (filter) => set({ selectedAlertFilter: filter }),
}));
