import type { Tag, Character, Creator, HeroSlide } from '@/types';

export const mockTags: Tag[] = [
  { id: '1', slug: 'nsfw', name: 'NSFW' },
  { id: '2', slug: 'female', name: 'Female' },
  { id: '3', slug: 'male', name: 'Male' },
  { id: '4', slug: 'scenario', name: 'Scenario' },
  { id: '5', slug: 'dominant', name: 'Dominant' },
  { id: '6', slug: 'submissive', name: 'Submissive' },
  { id: '7', slug: 'futa', name: 'Futa' },
  { id: '8', slug: 'fictional', name: 'Fictional' },
  { id: '9', slug: 'multiple', name: 'Multiple' },
  { id: '10', slug: 'oc', name: 'OC' },
  { id: '11', slug: 'petite', name: 'Petite' },
  { id: '12', slug: 'rpg', name: 'RPG' },
  { id: '13', slug: 'monster-girl', name: 'Monster Girl' },
  { id: '14', slug: 'non-human', name: 'Non-human' },
  { id: '15', slug: 'non-binary', name: 'Non-binary' },
  { id: '16', slug: 'object', name: 'Object' },
  { id: '17', slug: 'myth', name: 'Myth' },
  { id: '18', slug: 'queer', name: 'Queer' },
  { id: '19', slug: 'hentai', name: 'Hentai' },
  { id: '20', slug: 'magical', name: 'Magical' },
  { id: '21', slug: 'anime', name: 'Anime' },
  { id: '22', slug: 'bbw', name: 'BBW' },
  { id: '23', slug: 'monster', name: 'Monster' },
  { id: '24', slug: 'tomboy', name: 'Tomboy' },
  { id: '25', slug: 'game', name: 'Game' },
  { id: '26', slug: 'villain', name: 'Villain' },
  { id: '27', slug: 'chastity', name: 'Chastity' },
  { id: '28', slug: 'historical', name: 'Historical' },
  { id: '29', slug: 'giant', name: 'Giant' },
  { id: '30', slug: 'lesbian', name: 'Lesbian' },
  { id: '31', slug: 'action', name: 'Action' },
  { id: '32', slug: 'alien', name: 'Alien' },
  { id: '33', slug: 'vtuber', name: 'VTuber' },
  { id: '34', slug: 'non-english', name: 'Non-English' },
  { id: '35', slug: 'fandom', name: 'Fandom' },
  { id: '36', slug: 'books', name: 'Books' },
  { id: '37', slug: 'philosophy', name: 'Philosophy' },
  { id: '38', slug: 'manga', name: 'Manga' },
  { id: '39', slug: 'politics', name: 'Politics' },
  { id: '40', slug: 'hero', name: 'Hero' },
  { id: '41', slug: 'elf', name: 'Elf' },
];

export const mockCharacters: Character[] = [
  {
    id: '1',
    slug: 'luna-starweaver',
    name: 'Luna Starweaver',
    age: 25,
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['female', 'magical', 'anime'],
    synopsis: 'A mystical sorceress with the power to weave starlight into reality.',
    nsfw: false,
    premium: true,
    hasVideo: true,
    stats: { likes: 15420, comments: 892, views: '34.2K' }
  },
  {
    id: '2',
    slug: 'alex-shadowbane',
    name: 'Alex Shadowbane',
    age: 28,
    avatarUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['male', 'dominant', 'villain'],
    synopsis: 'A dark warrior with mysterious powers and a complex past.',
    nsfw: true,
    premium: false,
    hasVideo: false,
    stats: { likes: 8934, comments: 567, views: '21.5K' }
  },
  {
    id: '3',
    slug: 'sakura-dreamkeeper',
    name: 'Sakura Dreamkeeper',
    age: 22,
    avatarUrl: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['female', 'anime', 'submissive'],
    synopsis: 'A gentle soul who guards the realm of dreams and nightmares.',
    nsfw: false,
    premium: true,
    hasVideo: true,
    stats: { likes: 12750, comments: 734, views: '28.9K' }
  },
  {
    id: '4',
    slug: 'kai-stormrider',
    name: 'Kai Stormrider',
    age: 30,
    avatarUrl: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['male', 'action', 'hero'],
    synopsis: 'An adventurous pilot who commands the winds and soars through storms.',
    nsfw: false,
    premium: false,
    hasVideo: false,
    stats: { likes: 6789, comments: 423, views: '18.3K' }
  },
  {
    id: '5',
    slug: 'elena-moonwhisper',
    name: 'Elena Moonwhisper',
    age: 26,
    avatarUrl: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['female', 'myth', 'magical'],
    synopsis: 'A lunar priestess who communes with celestial beings.',
    nsfw: true,
    premium: true,
    hasVideo: true,
    stats: { likes: 19234, comments: 1205, views: '45.7K' }
  },
  {
    id: '6',
    slug: 'rex-ironforge',
    name: 'Rex Ironforge',
    age: 35,
    avatarUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['male', 'dominant', 'historical'],
    synopsis: 'A master blacksmith from an ancient kingdom with incredible strength.',
    nsfw: true,
    premium: false,
    hasVideo: false,
    stats: { likes: 5643, comments: 298, views: '14.2K' }
  },
  {
    id: '7',
    slug: 'aria-cybernova',
    name: 'Aria CyberNova',
    age: 24,
    avatarUrl: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['female', 'game', 'fictional'],
    synopsis: 'A cyberpunk hacker navigating the digital underworld.',
    nsfw: false,
    premium: true,
    hasVideo: true,
    stats: { likes: 11567, comments: 689, views: '26.4K' }
  },
  {
    id: '8',
    slug: 'zara-voidwalker',
    name: 'Zara Voidwalker',
    age: 27,
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['female', 'alien', 'mysterious'],
    synopsis: 'An enigmatic being from the void between dimensions.',
    nsfw: true,
    premium: true,
    hasVideo: false,
    stats: { likes: 8921, comments: 445, views: '22.1K' }
  },
  {
    id: '9',
    slug: 'magnus-dragonheart',
    name: 'Magnus Dragonheart',
    age: 32,
    avatarUrl: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['male', 'rpg', 'hero'],
    synopsis: 'A legendary dragon slayer with an ancient lineage.',
    nsfw: false,
    premium: false,
    hasVideo: true,
    stats: { likes: 7234, comments: 367, views: '19.8K' }
  },
  {
    id: '10',
    slug: 'nova-starlight',
    name: 'Nova Starlight',
    age: 23,
    avatarUrl: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['female', 'vtuber', 'anime'],
    synopsis: 'A virtual streamer from the constellation realm.',
    nsfw: false,
    premium: true,
    hasVideo: true,
    stats: { likes: 16789, comments: 923, views: '38.5K' }
  },
  {
    id: '11',
    slug: 'dante-shadowmancer',
    name: 'Dante Shadowmancer',
    age: 29,
    avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['male', 'villain', 'magical'],
    synopsis: 'A master of shadow magic with questionable morals.',
    nsfw: true,
    premium: false,
    hasVideo: false,
    stats: { likes: 9876, comments: 542, views: '23.7K' }
  },
  {
    id: '12',
    slug: 'mira-forestguard',
    name: 'Mira Forestguard',
    age: 21,
    avatarUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['female', 'elf', 'hero'],
    synopsis: 'An elven ranger protecting the ancient woodlands.',
    nsfw: false,
    premium: false,
    hasVideo: true,
    stats: { likes: 13245, comments: 678, views: '29.3K' }
  },
  {
    id: '13',
    slug: 'vex-techno',
    name: 'Vex Techno',
    age: 26,
    avatarUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['non-binary', 'game', 'fictional'],
    synopsis: 'A tech-savvy rebel fighting against corporate dystopia.',
    nsfw: true,
    premium: true,
    hasVideo: false,
    stats: { likes: 10543, comments: 612, views: '25.1K' }
  },
  {
    id: '14',
    slug: 'cleo-desert-rose',
    name: 'Cleo Desert Rose',
    age: 28,
    avatarUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['female', 'historical', 'dominant'],
    synopsis: 'An ancient Egyptian queen with timeless beauty and wisdom.',
    nsfw: true,
    premium: true,
    hasVideo: true,
    stats: { likes: 18765, comments: 1134, views: '42.8K' }
  },
  {
    id: '15',
    slug: 'orion-starforge',
    name: 'Orion Starforge',
    age: 31,
    avatarUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['male', 'alien', 'rpg'],
    synopsis: 'An intergalactic explorer discovering new worlds and civilizations.',
    nsfw: false,
    premium: false,
    hasVideo: false,
    stats: { likes: 7892, comments: 398, views: '17.9K' }
  },
  {
    id: '16',
    slug: 'yuki-snow-fox',
    name: 'Yuki Snow Fox',
    age: 20,
    avatarUrl: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=400&h=533',
    tags: ['female', 'anime', 'petite'],
    synopsis: 'A playful fox spirit from the snowy mountains of Japan.',
    nsfw: false,
    premium: true,
    hasVideo: true,
    stats: { likes: 14523, comments: 821, views: '31.6K' }
  }
];

export const mockCreators: Creator[] = [
  {
    id: '1',
    handle: '@mystique_ai',
    avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 45230,
    characters: 23,
    score: '98.5K'
  },
  {
    id: '2',
    handle: '@dream_architect',
    avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 38920,
    characters: 18,
    score: '87.3K'
  },
  {
    id: '3',
    handle: '@pixel_goddess',
    avatarUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 42156,
    characters: 31,
    score: '94.7K'
  },
  {
    id: '4',
    handle: '@shadow_weaver',
    avatarUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 29847,
    characters: 15,
    score: '76.2K'
  },
  {
    id: '5',
    handle: '@cyber_artist',
    avatarUrl: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 33521,
    characters: 27,
    score: '82.1K'
  },
  {
    id: '6',
    handle: '@void_painter',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 26734,
    characters: 12,
    score: '68.9K'
  },
  {
    id: '7',
    handle: '@stellar_creator',
    avatarUrl: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 31289,
    characters: 19,
    score: '79.4K'
  },
  {
    id: '8',
    handle: '@fantasy_forge',
    avatarUrl: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 28456,
    characters: 21,
    score: '73.8K'
  },
  {
    id: '9',
    handle: '@anime_master',
    avatarUrl: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 35678,
    characters: 24,
    score: '85.6K'
  },
  {
    id: '10',
    handle: '@myth_maker',
    avatarUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 39124,
    characters: 16,
    score: '91.2K'
  },
  {
    id: '11',
    handle: '@digital_dreams',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 25890,
    characters: 14,
    score: '67.4K'
  },
  {
    id: '12',
    handle: '@world_builder',
    avatarUrl: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100',
    followers: 32567,
    characters: 20,
    score: '81.3K'
  }
];

export const mockHeroSlides: HeroSlide[] = [
  {
    id: '1',
    title: '무한한 가능성의 세계',
    description: '당신만의 완벽한 캐릭터를 만나보세요',
    imageUrl: 'https://images.pexels.com/photos/1666912/pexels-photo-1666912.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ctaText: '지금 시작하기',
    ctaLink: '/onboarding'
  },
  {
    id: '2',
    title: 'Premium Characters',
    description: '독점 콘텐츠와 고품질 경험을 즐기세요',
    imageUrl: 'https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ctaText: '프리미엄 체험',
    ctaLink: '/membership'
  },
  {
    id: '3',
    title: 'Create Your Story',
    description: '나만의 캐릭터를 만들고 이야기를 시작하세요',
    imageUrl: 'https://images.pexels.com/photos/1484915/pexels-photo-1484915.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ctaText: '캐릭터 만들기',
    ctaLink: '/create'
  },
  {
    id: '4',
    title: '새로운 경험의 시작',
    description: 'AI와 함께하는 혁신적인 롤플레이',
    imageUrl: 'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ctaText: '체험해보기',
    ctaLink: '/'
  },
  {
    id: '5',
    title: 'Join the Community',
    description: '수천 명의 창작자들과 함께하세요',
    imageUrl: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ctaText: '커뮤니티 참여',
    ctaLink: '/creators'
  }
];