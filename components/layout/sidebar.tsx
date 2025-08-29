'use client';

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
  Share2,
  UserPlus,
  ImagePlus,
  Grid3x3,
  Eye,
  UserCircle,
  GamepadIcon,
  Sword,
  Shield,
  Sparkles,
  Book,
  Cat,
  Gamepad2,
  Wand2,
  Baby,
  HeartHandshake,
  Skull,
  Bot,
  Castle,
  Zap,
  Film,
  ScrollText,
  Mountain,
  Ghost,
  Glasses,
  Rocket,
  Tv,
  BookOpen,
  Search,
  Brain,
  Scroll,
  Globe,
  BabyIcon,
  ShieldCheck,
  HeartCrack,
  Footprints,
  Link2,
  FlaskConical,
  Star,
  Box
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/lib/stores/ui-store';
import { DataRepository } from '@/lib/data';

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  iconColor?: string;
}

interface NavigationSection {
  section: string;
  title?: string;
  items: NavigationItem[];
}

const navigationItems: NavigationSection[] = [
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
  },
  {
    section: 'create',
    title: '만들기',
    items: [
      { href: '/create', label: '캐릭터 생성', icon: UserPlus, badge: 'NEW' },
      { href: '/create/image', label: '이미지 생성', icon: ImagePlus, badge: 'NEW' },
    ]
  },
  {
    section: 'explore',
    title: '탐색',
    items: [
      { href: '/explore/categories', label: 'Categories', icon: Grid3x3, iconColor: 'text-blue-500' },
      { href: '/explore/nsfw', label: 'NSFW', icon: Eye, iconColor: 'text-red-500' },
      { href: '/explore/female', label: 'Female', icon: UserCircle, iconColor: 'text-pink-500' },
      { href: '/explore/male', label: 'Male', icon: User, iconColor: 'text-blue-500' },
      { href: '/explore/scenario', label: 'Scenario', icon: ScrollText, iconColor: 'text-green-500' },
      { href: '/explore/dominant', label: 'Dominant', icon: Sword, iconColor: 'text-red-600' },
      { href: '/explore/submissive', label: 'Submissive', icon: Shield, iconColor: 'text-purple-500' },
      { href: '/explore/futa', label: 'Futa', icon: Users, iconColor: 'text-purple-600' },
      { href: '/explore/fictional', label: 'Fictional', icon: Sparkles, iconColor: 'text-cyan-500' },
      { href: '/explore/og', label: 'Original Character(OG)', icon: Star, iconColor: 'text-yellow-500' },
      { href: '/explore/petite', label: 'Petite', icon: Baby, iconColor: 'text-pink-400' },
      { href: '/explore/breeding', label: 'Breeding', icon: HeartHandshake, iconColor: 'text-red-400' },
      { href: '/explore/femdom', label: 'Femdom', icon: Crown, iconColor: 'text-purple-600' },
      { href: '/explore/milf', label: 'Milf', icon: UserCircle, iconColor: 'text-pink-600' },
      { href: '/explore/straight', label: 'Straight', icon: Users },
      { href: '/explore/cheating', label: 'Cheating', icon: HeartCrack, iconColor: 'text-red-600' },
      { href: '/explore/bisexual', label: 'Bisexual', icon: Heart, iconColor: 'text-purple-500' },
      { href: '/explore/rpg', label: 'RPG', icon: Gamepad2, iconColor: 'text-green-600' },
      { href: '/explore/monster-girl', label: 'Monster Girl', icon: Ghost, iconColor: 'text-purple-400' },
      { href: '/explore/bully', label: 'Bully', icon: Skull, iconColor: 'text-gray-600' },
      { href: '/explore/non-human', label: 'Non-human', icon: Bot, iconColor: 'text-cyan-600' },
      { href: '/explore/switch', label: 'Switch', icon: Zap, iconColor: 'text-yellow-600' },
      { href: '/explore/anime', label: 'Anime', icon: Tv, iconColor: 'text-red-500' },
      { href: '/explore/femboy', label: 'Femboy', icon: Sparkles, iconColor: 'text-pink-500' },
      { href: '/explore/magical', label: 'Magical', icon: Wand2, iconColor: 'text-purple-500' },
      { href: '/explore/bbw', label: 'BBW', icon: UserCircle },
      { href: '/explore/monster', label: 'Monster', icon: Ghost, iconColor: 'text-green-600' },
      { href: '/explore/tomboy', label: 'Tomboy', icon: Users, iconColor: 'text-blue-400' },
      { href: '/explore/game', label: 'Game', icon: GamepadIcon, iconColor: 'text-green-500' },
      { href: '/explore/hentai', label: 'Hentai', icon: Heart, iconColor: 'text-red-500' },
      { href: '/explore/villain', label: 'Villain', icon: Skull, iconColor: 'text-red-700' },
      { href: '/explore/chastity', label: 'Chastity', icon: ShieldCheck, iconColor: 'text-gray-500' },
      { href: '/explore/hero', label: 'Hero', icon: Shield, iconColor: 'text-blue-600' },
      { href: '/explore/elf', label: 'Elf', icon: Sparkles, iconColor: 'text-green-400' },
      { href: '/explore/tsundere', label: 'Tsundere', icon: Heart, iconColor: 'text-red-400' },
      { href: '/explore/yandere', label: 'Yandere', icon: HeartCrack, iconColor: 'text-red-700' },
      { href: '/explore/kuudere', label: 'Kuudere', icon: Heart, iconColor: 'text-blue-400' },
      { href: '/explore/royalty', label: 'Royalty', icon: Crown, iconColor: 'text-yellow-500' },
      { href: '/explore/assistant', label: 'Assistant', icon: Bot, iconColor: 'text-blue-500' },
      { href: '/explore/robot', label: 'Robot', icon: Bot, iconColor: 'text-gray-500' },
      { href: '/explore/sissy', label: 'Sissy', icon: Users },
      { href: '/explore/gay', label: 'Gay', icon: Heart, iconColor: 'text-rainbow' },
      { href: '/explore/object', label: 'Object', icon: Box },
      { href: '/explore/non-binary', label: 'Non-binary', icon: Users, iconColor: 'text-purple-400' },
      { href: '/explore/deredere', label: 'Deredere', icon: Heart, iconColor: 'text-pink-400' },
      { href: '/explore/feet', label: 'Feet', icon: Footprints, iconColor: 'text-brown-500' },
      { href: '/explore/movie', label: 'Movie', icon: Film, iconColor: 'text-blue-600' },
      { href: '/explore/muslim', label: 'Muslim', icon: Users },
      { href: '/explore/arab', label: 'Arab', icon: Globe },
      { href: '/explore/myth', label: 'Myth', icon: Mountain, iconColor: 'text-purple-700' },
      { href: '/explore/religion', label: 'Religion', icon: BookOpen },
      { href: '/explore/historical', label: 'Historical', icon: Scroll, iconColor: 'text-amber-600' },
      { href: '/explore/giant', label: 'Giant', icon: Mountain, iconColor: 'text-gray-700' },
      { href: '/explore/succubus', label: 'Succubus', icon: Ghost, iconColor: 'text-red-600' },
      { href: '/explore/lesbian', label: 'Lesbian', icon: Heart, iconColor: 'text-pink-600' },
      { href: '/explore/action', label: 'Action', icon: Zap, iconColor: 'text-orange-500' },
      { href: '/explore/alien', label: 'Alien', icon: Rocket, iconColor: 'text-green-500' },
      { href: '/explore/vtuber', label: 'VTuber', icon: Tv, iconColor: 'text-purple-500' },
      { href: '/explore/dandere', label: 'Dandere', icon: Heart, iconColor: 'text-gray-400' },
      { href: '/explore/non-english', label: 'Non-English', icon: Globe, iconColor: 'text-blue-500' },
      { href: '/explore/fandom', label: 'Fandom', icon: Users, iconColor: 'text-purple-600' },
      { href: '/explore/books', label: 'Books', icon: BookOpen, iconColor: 'text-brown-600' },
      { href: '/explore/queer', label: 'Queer', icon: Heart, iconColor: 'text-rainbow' },
      { href: '/explore/philosophy', label: 'Philosophy', icon: Brain, iconColor: 'text-gray-600' },
      { href: '/explore/manga', label: 'Manga', icon: Book, iconColor: 'text-black' },
      { href: '/explore/politics', label: 'Politics', icon: Globe },
      { href: '/explore/asexual', label: 'Asexual', icon: Heart, iconColor: 'text-purple-300' },
      { href: '/explore/folklore', label: 'Folklore', icon: ScrollText, iconColor: 'text-amber-700' },
      { href: '/explore/dilf', label: 'Dilf', icon: User, iconColor: 'text-blue-700' },
      { href: '/explore/detective', label: 'Detective', icon: Search, iconColor: 'text-gray-700' },
      { href: '/explore/seinen', label: 'Seinen', icon: Book },
      { href: '/explore/worship', label: 'Worship', icon: Crown, iconColor: 'text-yellow-600' },
      { href: '/explore/maid', label: 'Maid', icon: Users, iconColor: 'text-black' },
      { href: '/explore/realistic', label: 'Realistic', icon: Glasses, iconColor: 'text-gray-600' },
      { href: '/explore/pregnant', label: 'Pregnant', icon: BabyIcon, iconColor: 'text-pink-300' },
      { href: '/explore/ntr', label: 'NTR', icon: HeartCrack, iconColor: 'text-red-800' },
      { href: '/explore/romantic', label: 'Romantic', icon: Heart, iconColor: 'text-red-400' },
      { href: '/explore/wholesome', label: 'Wholesome', icon: HeartHandshake, iconColor: 'text-green-400' },
      { href: '/explore/cnc', label: 'CNC', icon: Link2 },
      { href: '/explore/shortstack', label: 'Shortstack', icon: Users },
      { href: '/explore/hypno', label: 'Hypno', icon: Eye, iconColor: 'text-purple-700' },
      { href: '/explore/voyeur', label: 'Voyeur', icon: Eye, iconColor: 'text-gray-600' },
      { href: '/explore/demi-human', label: 'Demi human', icon: Users, iconColor: 'text-cyan-500' },
      { href: '/explore/sci-fi', label: 'Sci-fi', icon: Rocket, iconColor: 'text-blue-700' },
      { href: '/explore/bdsm', label: 'BDSM', icon: Link2, iconColor: 'text-black' },
      { href: '/explore/bondage', label: 'Bondage', icon: Link2, iconColor: 'text-gray-800' },
      { href: '/explore/horror', label: 'Horror', icon: Skull, iconColor: 'text-red-900' },
      { href: '/explore/goth', label: 'Goth', icon: Skull, iconColor: 'text-black' },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed, isLoggedIn } = useUIStore();
  const tags = DataRepository.getTags();

  return (
    <>
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-screen bg-[#151822] border-r border-[#23283A] transition-all duration-300 z-50",
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
        <div className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-[#23283A] scrollbar-track-transparent max-h-[calc(100vh-140px)]">
          {navigationItems.map((section, sectionIndex) => {
            // Hide 'you' section if not logged in
            if (section.section === 'you' && !isLoggedIn) {
              return null;
            }
            
            return (
              <div key={section.section} className={cn("mb-8", sectionIndex > 0 && "px-6")}>
                {section.title && !sidebarCollapsed && (
                  <div className="text-base font-bold text-gray-300 mb-4">
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
                    <item.icon className={cn("w-5 h-5", item.iconColor || "text-gray-400", !sidebarCollapsed && "mr-3")} />
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
            );
          })}

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