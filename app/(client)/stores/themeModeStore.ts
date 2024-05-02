import { createStore } from 'zustand';

import { DEFAULT_THEME_MODE, ThemeMode } from '@/constant';

type ThemeModeStoreState = {
  themeMode: ThemeMode;
};

type ThemeModeStoreActions = {
  initialize: (themeMode: ThemeMode) => void;
  changeMode: (themeMode: ThemeMode) => void;
};

const DEFAULT_THEME_MODE_STORE_STATE: ThemeModeStoreState = {
  themeMode: DEFAULT_THEME_MODE,
};

export type ThemeModeStore = ThemeModeStoreState & ThemeModeStoreActions;

export const themeModeStore = createStore<ThemeModeStore>()((set, get) => ({
  ...DEFAULT_THEME_MODE_STORE_STATE,
  initialize: themeMode => {
    const { themeMode: currentMode } = get();

    if (currentMode === themeMode) return;

    set({ themeMode });
  },
  changeMode: themeMode => {
    const { themeMode: currentMode } = get();

    if (currentMode === themeMode) return;

    const html = document.querySelector('html');

    if (!html) return;

    const currentHTMLMode = html.getAttribute('data-theme');

    if (currentHTMLMode === themeMode) return;

    html.setAttribute('data-theme', themeMode);

    set({ themeMode });
  },
}));
