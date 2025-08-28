'use client';

import { Shield, Eye } from 'lucide-react';
import { useUIStore } from '@/lib/stores/ui-store';

export function NsfwBanner() {
  const { setShowNsfw } = useUIStore();

  return (
    <div className="mb-12 p-6 bg-gradient-to-r from-[#23283A] to-[#2A2F45] rounded-2xl border border-[#3A3F55]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#6C5CE7]/20 rounded-xl">
            <Shield className="w-6 h-6 text-[#6C5CE7]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              SFW 모드가 활성화되었습니다
            </h3>
            <p className="text-gray-400">
              성인 콘텐츠가 숨겨져 있습니다. 모든 캐릭터를 보려면 NSFW를 활성화하세요.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowNsfw(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-[#6C5CE7] hover:bg-[#8A63F1] text-white font-medium rounded-2xl transition-all duration-200"
        >
          <Eye className="w-4 h-4" />
          <span>NSFW 켜기</span>
        </button>
      </div>
    </div>
  );
}