import { createStore } from 'zustand';

import { DEFAULT_THEME_MODE, ThemeMode } from '@/constant';

type ThemeModeStoreState = {
  themeMode: ThemeMode;
};

interface ThemeModeStoreActions {
  changeMode: (themeMode: ThemeMode) => void;
}

const DEFAULT_THEME_MODE_STORE_STATE: ThemeModeStoreState = {
  themeMode: DEFAULT_THEME_MODE,
};

export type ThemeModeStore = ThemeModeStoreState & ThemeModeStoreActions;

export const createThemeModeStore = (
  initialState: ThemeModeStoreState = DEFAULT_THEME_MODE_STORE_STATE
) =>
  createStore<ThemeModeStore>()((set, get) => ({
    ...initialState,
    changeMode: themeMode => {
      const { themeMode: currentThemeMode } = get();

      if (currentThemeMode === themeMode) return;

      set({ themeMode });
    },
  }));
