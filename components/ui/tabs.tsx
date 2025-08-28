'use client';

import { useState, ReactNode } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string;
}

interface TabsProps {
  tabs: Tab[];
  children: (activeTab: string) => ReactNode;
  defaultTab?: string;
}

export const defaultHomeTabs: Tab[] = [
  {
    id: 'for-you',
    label: 'For You',
  },
  {
    id: 'deluxe',
    label: 'Deluxe',
    badge: 'NEW',
  },
  {
    id: 'recent-hits',
    label: 'Recent Hits',
    icon: <Heart className="w-4 h-4" />,
  },
];

export function Tabs({ tabs, children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="mb-12">
      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200 whitespace-nowrap",
              activeTab === tab.id
                ? "bg-[#6C5CE7] text-white"
                : "bg-[#23283A] text-gray-300 hover:bg-[#2A2F45] hover:text-white"
            )}
          >
            {tab.icon && tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="px-2 py-1 bg-[#EF4444] text-white text-xs font-bold rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {children(activeTab)}
      </div>
    </div>
  );
}