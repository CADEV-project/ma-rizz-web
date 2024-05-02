'use client';

import { useStore } from 'zustand';

import { themeModeStore } from './themeModeStore';

export const useThemeModeStore = () => useStore(themeModeStore);
