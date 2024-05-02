import { ThemeModeProvider, ThemeModeProviderProps } from '@/(client)/stores';

type StoreProviderProps = {
  children: React.ReactNode;
} & Omit<ThemeModeProviderProps, 'children'>;

export const StoreProvider: React.FC<StoreProviderProps> = ({ themeMode, children }) => {
  return <ThemeModeProvider themeMode={themeMode}>{children}</ThemeModeProvider>;
};
