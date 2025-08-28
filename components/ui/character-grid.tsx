'use client';

import type { Character } from '@/types';
import { CharacterCard } from './character-card';
import { EmptyState } from './empty-state';

interface CharacterGridProps {
  characters: Character[];
  showToast?: (message: string) => void;
}

export function CharacterGrid({ characters, showToast }: CharacterGridProps) {
  if (characters.length === 0) {
    return (
      <EmptyState
        title="캐릭터를 찾을 수 없습니다"
        description="다른 필터를 시도해보거나 새로운 캐릭터를 만들어보세요."
        actionLabel="캐릭터 만들기"
        actionHref="/create"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          showToast={showToast}
        />
      ))}
    </div>
  );
}