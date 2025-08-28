'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { CharacterGrid } from '@/components/ui/character-grid';
import { NsfwBanner } from '@/components/ui/nsfw-banner';
import { DataRepository } from '@/lib/data';
import { useUIStore } from '@/lib/stores/ui-store';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export default function TagPage({ params }: TagPageProps) {
  const { slug } = use(params);
  const { showNsfw } = useUIStore();
  
  const tag = DataRepository.getTagBySlug(slug);
  if (!tag) {
    notFound();
  }

  const allCharacters = DataRepository.getCharactersByTag(slug);
  const filteredCharacters = showNsfw 
    ? allCharacters 
    : allCharacters.filter(character => !character.nsfw);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {tag.name}
        </h1>
        <p className="text-gray-400">
          {allCharacters.length}개의 캐릭터 ({!showNsfw && filteredCharacters.length}개 표시됨)
        </p>
      </div>

      {/* NSFW Banner */}
      {!showNsfw && allCharacters.some(c => c.nsfw) && <NsfwBanner />}

      {/* Character Grid */}
      <CharacterGrid characters={filteredCharacters} />
    </div>
  );
}