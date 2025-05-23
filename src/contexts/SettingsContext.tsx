
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo } from 'react';

interface Settings {
  portfolioItemsPerPage: number; // 0 means show all
}

interface SettingsContextType extends Settings {
  setPortfolioItemsPerPage: (count: number) => void;
}

// Default to 0, meaning "Show All" initially to preserve existing behavior.
const defaultSettings: Settings = {
  portfolioItemsPerPage: 0,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioItemsPerPage, setPortfolioItemsPerPageState] = useState<number>(defaultSettings.portfolioItemsPerPage);

  const setPortfolioItemsPerPage = (count: number) => {
    setPortfolioItemsPerPageState(count);
  };

  const value = useMemo(() => ({
    portfolioItemsPerPage,
    setPortfolioItemsPerPage,
  }), [portfolioItemsPerPage]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
