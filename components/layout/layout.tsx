'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { OnboardingModal } from '../modals/onboarding-modal';
import { NotificationPrompt } from '../ui/notification-prompt';
import { PwaInstallPrompt } from '../ui/pwa-install-prompt';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F1014] text-white">
      <Topbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
      
      {/* Global Components */}
      <OnboardingModal />
      <NotificationPrompt />
      <PwaInstallPrompt />
    </div>
  );
}