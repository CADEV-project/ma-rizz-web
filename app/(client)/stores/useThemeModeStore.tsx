'use client';

import { createContext, useContext, useRef } from 'react';

import { StoreApi, useStore } from 'zustand';

import { ThemeModeStore, createThemeModeStore } from './themeModeStore';

import { ThemeMode } from '@/constant';

export const ThemeModeStoreContext = createContext<StoreApi<ThemeModeStore> | null>(null);

export type ThemeModeProviderProps = {
  themeMode: ThemeMode;
  children: React.ReactNode;
};

export const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({ themeMode, children }) => {
  const storeRef = useRef<StoreApi<ThemeModeStore>>();

  if (!storeRef.current) {
    storeRef.current = createThemeModeStore({ themeMode });
  }

  return (
    <ThemeModeStoreContext.Provider value={storeRef.current}>
      {children}
    </ThemeModeStoreContext.Provider>
  );
};

export const useThemeModeStore = <T,>(selector: (store: ThemeModeStore) => T): T => {
  const themeModeStoreContext = useContext(ThemeModeStoreContext);

  if (!themeModeStoreContext) {
    throw new Error('Theme mode store context is not found');
  }

  return useStore(themeModeStoreContext, selector);
};
