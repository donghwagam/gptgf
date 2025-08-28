'use client';

import { useState } from 'react';
import { Search, Plus, Bell, ChevronDown } from 'lucide-react';
import { useUIStore } from '@/lib/stores/ui-store';

export function Topbar() {
  const { showNsfw, setShowNsfw, language, setLanguage } = useUIStore();
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="fixed top-0 right-0 left-0 h-16 bg-[#151822]/95 backdrop-blur-sm border-b border-[#23283A] z-40">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Click to open Search..."
              className="w-full pl-12 pr-4 py-3 bg-[#23283A] border border-[#2A2F45] rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Create Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCreateDropdown(!showCreateDropdown)}
              className="flex items-center px-4 py-2 bg-[#6C5CE7] hover:bg-[#8A63F1] text-white rounded-2xl font-medium transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              만들기
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            
            {showCreateDropdown && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-[#151822] border border-[#23283A] rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,.35)] overflow-hidden">
                <a
                  href="/create"
                  className="block px-4 py-3 text-white hover:bg-[#23283A] transition-colors"
                  onClick={() => setShowCreateDropdown(false)}
                >
                  새 캐릭터 만들기
                </a>
                <a
                  href="/create-image"
                  className="block px-4 py-3 text-white hover:bg-[#23283A] transition-colors"
                  onClick={() => setShowCreateDropdown(false)}
                >
                  새 이미지 만들기
                </a>
              </div>
            )}
          </div>

          {/* NSFW Toggle */}
          <button
            onClick={() => setShowNsfw(!showNsfw)}
            className={cn(
              "px-4 py-2 rounded-2xl font-medium transition-all duration-200",
              showNsfw
                ? "bg-[#EF4444] hover:bg-[#DC2626] text-white"
                : "bg-[#23283A] hover:bg-[#2A2F45] text-gray-300"
            )}
          >
            NSFW {showNsfw ? 'ON' : 'OFF'}
          </button>

          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
            className="px-4 py-2 bg-[#23283A] hover:bg-[#2A2F45] text-gray-300 rounded-2xl font-medium transition-all duration-200"
          >
            {language.toUpperCase()}
          </button>

          {/* Notifications */}
          <button className="relative p-3 bg-[#23283A] hover:bg-[#2A2F45] rounded-2xl transition-all duration-200">
            <Bell className="w-5 h-5 text-gray-300" />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#EF4444] text-white text-xs font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 bg-[#23283A] hover:bg-[#2A2F45] rounded-2xl transition-all duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#6C5CE7] to-[#8A63F1] rounded-xl"></div>
              <div className="text-left">
                <div className="text-sm font-medium text-white">User</div>
                <div className="text-xs text-[#8A63F1] font-bold">FREE</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#151822] border border-[#23283A] rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,.35)] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#23283A]">
                  <div className="text-white font-medium">User</div>
                  <div className="text-sm text-gray-400">user@example.com</div>
                </div>
                <a href="/profile" className="block px-4 py-3 text-white hover:bg-[#23283A] transition-colors">
                  프로필
                </a>
                <a href="/settings" className="block px-4 py-3 text-white hover:bg-[#23283A] transition-colors">
                  설정
                </a>
                <hr className="border-[#23283A]" />
                <button className="block w-full text-left px-4 py-3 text-[#EF4444] hover:bg-[#23283A] transition-colors">
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}