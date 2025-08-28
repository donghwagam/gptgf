'use client';

import { Layout } from '@/components/layout/layout';
import { HeroCarousel } from '@/components/ui/hero-carousel';
import { Tabs, defaultHomeTabs } from '@/components/ui/tabs';
import { CharacterGrid } from '@/components/ui/character-grid';
import { NsfwBanner } from '@/components/ui/nsfw-banner';
import { DataRepository } from '@/lib/data';
import { useUIStore } from '@/lib/stores/ui-store';

export default function HomePage() {
  const { showNsfw } = useUIStore();
  const characters = DataRepository.getCharactersFiltered(showNsfw);

  const getCharactersByTab = (tabId: string) => {
    switch (tabId) {
      case 'for-you':
        return characters.slice(0, 12);
      case 'deluxe':
        return characters.filter(c => c.premium).slice(0, 12);
      case 'recent-hits':
        return characters.sort((a, b) => b.stats.likes - a.stats.likes).slice(0, 12);
      default:
        return characters.slice(0, 12);
    }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Hero Section */}
        <HeroCarousel />

        {/* Video Experiences Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <h2 className="text-3xl font-bold text-white">비디오 경험</h2>
            <span className="px-3 py-1 bg-gradient-to-r from-[#6C5CE7] to-[#8A63F1] text-white text-sm font-bold rounded-full">
              NEW
            </span>
          </div>
          <CharacterGrid 
            characters={characters.filter(c => c.hasVideo).slice(0, 8)} 
          />
        </div>

        {/* NSFW Banner */}
        {!showNsfw && <NsfwBanner />}

        {/* Main Content Tabs */}
        <Tabs tabs={defaultHomeTabs}>
          {(activeTab) => (
            <CharacterGrid characters={getCharactersByTab(activeTab)} />
          )}
        </Tabs>
      </div>
    </Layout>
  );
}