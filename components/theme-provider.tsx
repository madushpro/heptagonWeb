import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

type AppTheme = 'dark' | 'light';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function useTheme() {
  const { theme, resolvedTheme, setTheme, ...rest } = useNextTheme();
  const currentTheme = (resolvedTheme ?? theme ?? 'dark') as AppTheme;

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    ...rest,
    theme: currentTheme,
    setTheme,
    toggleTheme,
  };
}
