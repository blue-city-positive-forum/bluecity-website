import { create } from 'zustand';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  id: string;
  message: string;
  type: AlertType;
  duration?: number;
}

interface UIState {
  alerts: Alert[];
  modals: Record<string, boolean>;
  sidebarOpen: boolean;
  
  showAlert: (message: string, type: AlertType, duration?: number) => void;
  hideAlert: (id: string) => void;
  openModal: (key: string) => void;
  closeModal: (key: string) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  alerts: [],
  modals: {},
  sidebarOpen: false,

  showAlert: (message, type, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const alert: Alert = { id, message, type, duration };
    
    set((state) => ({
      alerts: [...state.alerts, alert],
    }));

    if (duration > 0) {
      setTimeout(() => {
        get().hideAlert(id);
      }, duration);
    }
  },

  hideAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },

  openModal: (key) => {
    set((state) => ({
      modals: { ...state.modals, [key]: true },
    }));
  },

  closeModal: (key) => {
    set((state) => ({
      modals: { ...state.modals, [key]: false },
    }));
  },

  toggleSidebar: () => {
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    }));
  },
}));

