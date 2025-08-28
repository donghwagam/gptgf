import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  showNsfw: boolean;
  language: 'en' | 'ko';
  showOnboarding: boolean;
  showNotificationPrompt: boolean;
  showPwaInstall: boolean;
  isLoggedIn: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setShowNsfw: (show: boolean) => void;
  setLanguage: (lang: 'en' | 'ko') => void;
  setShowOnboarding: (show: boolean) => void;
  setShowNotificationPrompt: (show: boolean) => void;
  setShowPwaInstall: (show: boolean) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

// Development: user@example.com is always logged in
const isDevelopment = process.env.NODE_ENV === 'development';

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  showNsfw: false,
  language: 'en',
  showOnboarding: true,
  showNotificationPrompt: true,
  showPwaInstall: true,
  isLoggedIn: isDevelopment ? true : false, // Always logged in as user@example.com in development
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setShowNsfw: (show) => set({ showNsfw: show }),
  setLanguage: (lang) => set({ language: lang }),
  setShowOnboarding: (show) => set({ showOnboarding: show }),
  setShowNotificationPrompt: (show) => set({ showNotificationPrompt: show }),
  setShowPwaInstall: (show) => set({ showPwaInstall: show }),
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}));