'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/layout';
import Link from 'next/link';
import { 
  Grid3x3,
  Eye,
  UserCircle,
  User,
  ScrollText,
  Sword,
  Shield,
  Users,
  Sparkles,
  Star,
  Baby,
  HeartHandshake,
  Crown,
  Heart,
  Gamepad2,
  Ghost,
  Skull,
  Bot,
  Zap,
  Tv,
  Wand2,
  GamepadIcon,
  ShieldCheck,
  HeartCrack,
  Footprints,
  Film,
  Globe,
  Mountain,
  BookOpen,
  Scroll,
  Rocket,
  Brain,
  Book,
  BabyIcon,
  Search,
  Glasses,
  Link2,
  Box
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  count: string;
  characters: string[];
}

const categoryTabs = [
  'Character Type', 'Genre', 'Personality', 'Physical Traits', 
  'Origin', 'Goal', 'Sexuality', 'Fantasy', 'default', 
  'Kink', 'Religion', 'Ethnicity'
];

const categories: Record<string, Category[]> = {
  'Character Type': [
    { id: 'female', name: 'Female', icon: UserCircle, iconBg: 'bg-yellow-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'male', name: 'Male', icon: User, iconBg: 'bg-orange-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'non-human', name: 'Non-human', icon: Bot, iconBg: 'bg-purple-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'object', name: 'Object', icon: Box, iconBg: 'bg-gray-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'non-binary', name: 'Non-binary', icon: Users, iconBg: 'bg-rainbow', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'myth', name: 'Myth', icon: Mountain, iconBg: 'bg-indigo-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'queer', name: 'Queer', icon: Heart, iconBg: 'bg-pink-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
  ],
  'Genre': [
    { id: 'scenario', name: 'Scenario', icon: ScrollText, iconBg: 'bg-red-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'fictional', name: 'Fictional', icon: Sparkles, iconBg: 'bg-cyan-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'multiple', name: 'Multiple', icon: Users, iconBg: 'bg-orange-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'rpg', name: 'RPG', icon: Gamepad2, iconBg: 'bg-gray-600', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'anime', name: 'Anime', icon: Tv, iconBg: 'bg-purple-600', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'magical', name: 'Magical', icon: Wand2, iconBg: 'bg-purple-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'hentai', name: 'Hentai', icon: Heart, iconBg: 'bg-red-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'royalty', name: 'Royalty', icon: Crown, iconBg: 'bg-yellow-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'assistant', name: 'Assistant', icon: Bot, iconBg: 'bg-blue-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
  ],
  'Personality': [
    { id: 'dominant', name: 'Dominant', icon: Sword, iconBg: 'bg-gray-600', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'submissive', name: 'Submissive', icon: Shield, iconBg: 'bg-yellow-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'milf', name: 'Milf', icon: UserCircle, iconBg: 'bg-pink-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'bully', name: 'Bully', icon: Skull, iconBg: 'bg-gray-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'switch', name: 'Switch', icon: Zap, iconBg: 'bg-purple-500', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'femboy', name: 'Femboy', icon: Sparkles, iconBg: 'bg-pink-400', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'tomboy', name: 'Tomboy', icon: Users, iconBg: 'bg-blue-400', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'villain', name: 'Villain', icon: Skull, iconBg: 'bg-red-700', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'hero', name: 'Hero', icon: Shield, iconBg: 'bg-blue-600', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'tsundere', name: 'Tsundere', icon: Heart, iconBg: 'bg-red-400', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'yandere', name: 'Yandere', icon: HeartCrack, iconBg: 'bg-red-700', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'kuudere', name: 'Kuudere', icon: Heart, iconBg: 'bg-blue-400', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'sissy', name: 'Sissy', icon: Users, iconBg: 'bg-pink-300', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'deredere', name: 'Deredere', icon: Heart, iconBg: 'bg-pink-400', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'dandere', name: 'Dandere', icon: Heart, iconBg: 'bg-gray-400', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
    { id: 'dilf', name: 'Dilf', icon: User, iconBg: 'bg-blue-700', count: '99+', characters: ['/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48', '/api/placeholder/48/48'] },
  ],
};

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState('Character Type');

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">Find Your Perfect AI Companion</h1>
          <p className="text-gray-400 text-lg">
            Browse our extensive collection of AI personalities, backgrounds, and traits to
            discover a companion that fits your unique preferences.
          </p>
        </div>

        {/* Jump to category tabs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Jump to category</h2>
          <div className="flex flex-wrap gap-3">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#6C5CE7] text-white'
                    : 'bg-[#1A1F2E] text-gray-400 hover:bg-[#23283A] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Category Section */}
        <div className="pb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#6C5CE7]">{activeTab}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories[activeTab]?.map((category) => (
              <Link
                key={category.id}
                href={`/tag/${category.id}`}
                className="bg-[#1A1F2E] rounded-2xl p-6 hover:bg-[#23283A] transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${category.iconBg}`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>
                  <span className="text-sm text-gray-400 bg-[#0A0E1A] px-3 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  {category.characters.map((char, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-lg bg-gray-700 overflow-hidden"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600" />
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}