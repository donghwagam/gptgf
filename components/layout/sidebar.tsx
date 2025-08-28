'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Heart, 
  Trophy, 
  User, 
  MessageCircle, 
  Users, 
  Image, 
  BookHeart, 
  Coins, 
  Crown,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/lib/stores/ui-store';
import { DataRepository } from '@/lib/data';

const navigationItems = [
  {
    section: 'primary',
    items: [
      { href: '/', label: '홈', icon: Home },
      { href: '/following', label: '팔로잉', icon: Heart },
      { href: '/creators', label: '톱 크리에이터', icon: Trophy },
    ]
  },
  {
    section: 'you',
    title: 'You',
    items: [
      { href: '/for-you', label: 'For You', icon: User },
      { href: '/profile', label: '프로필', icon: User },
      { href: '/chats', label: '채팅', icon: MessageCircle },
      { href: '/characters', label: '캐릭터', icon: Users },
      { href: '/gallery', label: '갤러리', icon: Image },
      { href: '/favorites', label: '즐겨찾기', icon: BookHeart },
      { href: '/coins', label: '코인', icon: Coins },
      { href: '/membership', label: '멤버십', icon: Crown, badge: 'SALE' },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore();
  const tags = DataRepository.getTags();

  return (
    <>
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-[#151822] border-r border-[#23283A] transition-all duration-300 z-50",
        sidebarCollapsed ? "w-20" : "w-80"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#23283A]">
          {!sidebarCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#8A63F1] bg-clip-text text-transparent">
                AICo.Chat
              </div>
            </Link>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-xl bg-[#23283A] hover:bg-[#2A2F45] transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          {navigationItems.map((section, sectionIndex) => (
            <div key={section.section} className={cn("mb-8", sectionIndex > 0 && "px-6")}>
              {section.title && !sidebarCollapsed && (
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  {section.title}
                </div>
              )}
              <nav className="space-y-2">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-2xl transition-all duration-200",
                      pathname === item.href
                        ? "bg-[#6C5CE7] text-white"
                        : "text-gray-300 hover:text-white hover:bg-[#23283A]",
                      sidebarCollapsed && "justify-center"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", !sidebarCollapsed && "mr-3")} />
                    {!sidebarCollapsed && (
                      <>
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto px-2 py-1 text-xs font-bold bg-[#EF4444] text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Categories */}
          {!sidebarCollapsed && (
            <div className="px-6">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                카테고리
              </div>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className={cn(
                      "block px-4 py-2 rounded-xl text-sm transition-all duration-200",
                      pathname === `/tag/${tag.slug}`
                        ? "bg-[#6C5CE7] text-white"
                        : "text-gray-400 hover:text-white hover:bg-[#23283A]"
                    )}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        {!sidebarCollapsed && (
          <div className="p-6 border-t border-[#23283A] space-y-3">
            <button className="flex items-center w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-[#23283A] rounded-2xl transition-all duration-200">
              <Smartphone className="w-5 h-5 mr-3" />
              <span className="font-medium">앱 설치하기</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-[#23283A] rounded-2xl transition-all duration-200">
              <Share2 className="w-5 h-5 mr-3" />
              <span className="font-medium">제휴 링크 신청</span>
            </button>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "w-20" : "w-80"
      )} />
    </>
  );
}