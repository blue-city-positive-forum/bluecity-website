import { create } from 'zustand';
import type { MatrimonyProfile, MatrimonyFilters } from '../types/matrimony.types';

interface MatrimonyState {
  profiles: MatrimonyProfile[];
  myProfiles: MatrimonyProfile[];
  currentProfile: MatrimonyProfile | null;
  filters: MatrimonyFilters;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  isLoading: boolean;
  
  setProfiles: (profiles: MatrimonyProfile[]) => void;
  setMyProfiles: (profiles: MatrimonyProfile[]) => void;
  setCurrentProfile: (profile: MatrimonyProfile | null) => void;
  setFilters: (filters: MatrimonyFilters) => void;
  setPagination: (page: number, total: number, totalPages: number) => void;
  setLoading: (loading: boolean) => void;
  resetFilters: () => void;
}

const initialFilters: MatrimonyFilters = {};

export const useMatrimonyStore = create<MatrimonyState>((set) => ({
  profiles: [],
  myProfiles: [],
  currentProfile: null,
  filters: initialFilters,
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 0,
  isLoading: false,

  setProfiles: (profiles) => set({ profiles }),
  
  setMyProfiles: (profiles) => set({ myProfiles: profiles }),
  
  setCurrentProfile: (profile) => set({ currentProfile: profile }),
  
  setFilters: (filters) => set({ filters, page: 1 }),
  
  setPagination: (page, total, totalPages) => 
    set({ page, total, totalPages }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  resetFilters: () => set({ filters: initialFilters, page: 1 }),
}));

