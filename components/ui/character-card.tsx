'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Eye, Crown, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Character } from '@/types';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  showToast?: (message: string) => void;
}

export function CharacterCard({ character, showToast }: CharacterCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleChatClick = () => {
    if (showToast) {
      showToast('채팅 기능이 곧 출시됩니다!');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300",
        isHovered && "ring-2 ring-[#6C5CE7]/50"
      )}>
        {/* Character Image */}
        <img
          src={character.avatarUrl}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {character.hasVideo && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
              <Video className="w-3 h-3 text-white" />
              <span className="text-xs font-medium text-white">VIDEO</span>
            </div>
          )}
        </div>

        <div className="absolute top-3 right-3">
          {character.premium && (
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl">
              <Crown className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Hover Chat Button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleChatClick}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 bg-[#6C5CE7] hover:bg-[#8A63F1] text-white font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-[0_6px_30px_rgba(108,92,231,0.6)]"
            >
              채팅하기
            </motion.button>
          )}
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
            {character.name}
          </h3>
          <p className="text-sm text-gray-200 mb-3 line-clamp-2 drop-shadow-lg">
            {character.synopsis}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-[#EF4444]" />
                <span className="text-sm font-medium text-white drop-shadow-lg">
                  {character.stats.likes.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4 text-gray-300" />
                <span className="text-sm font-medium text-white drop-shadow-lg">
                  {character.stats.views}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4 text-gray-300" />
                <span className="text-sm font-medium text-white drop-shadow-lg">
                  {character.stats.comments}
                </span>
              </div>
            </div>
            {character.nsfw && (
              <span className="px-2 py-1 bg-[#EF4444] text-white text-xs font-bold rounded-lg drop-shadow-lg">
                NSFW
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Re-export AnimatePresence from framer-motion for use in other components
export { AnimatePresence } from 'framer-motion';