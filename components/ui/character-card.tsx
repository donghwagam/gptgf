'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Crown, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Character } from '@/types';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleChatClick = () => {
    // Navigate to character detail page
    router.push(`/character/${character.id}`);
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-[#FF6B9D] hover:bg-[#FF5A8D] text-white font-semibold text-sm rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              채팅하기
            </motion.button>
          )}
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-end justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white mb-1 drop-shadow-lg truncate">
                {character.name}
              </h3>
              <p className="text-xs text-gray-300 mb-2 line-clamp-2 drop-shadow-lg opacity-90">
                {character.synopsis}
              </p>
              
              {/* Stats - simplified */}
              <div className="flex items-center space-x-3 text-xs text-gray-300">
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span className="drop-shadow-lg">
                    {character.stats.likes > 1000 
                      ? `${(character.stats.likes / 1000).toFixed(1)}K`
                      : character.stats.likes.toLocaleString()
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span className="drop-shadow-lg">
                    {character.stats.comments > 1000 
                      ? `${(character.stats.comments / 1000).toFixed(1)}K`
                      : character.stats.comments
                    }
                  </span>
                </div>
              </div>
            </div>
            
            {character.nsfw && (
              <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded drop-shadow-lg flex-shrink-0">
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