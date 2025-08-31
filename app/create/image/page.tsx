'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Info, Sparkles, Zap, Settings2, Save, RotateCcw, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StyleOption {
  id: string;
  name: string;
  image: string;
  isNew?: boolean;
}

interface ModelOption {
  id: string;
  name: string;
  images: string[];
}

export default function CreateImagePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const characterId = searchParams.get('character');
  
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [showNegativePrompt, setShowNegativePrompt] = useState(false);
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [safeMode, setSafeMode] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('anime');
  const [selectedModel, setSelectedModel] = useState('ai-anime-art');
  const [numberOfImages, setNumberOfImages] = useState(1);
  
  // 코인 계산 함수
  const calculateCoins = (imageCount: number) => {
    switch (imageCount) {
      case 1: return 6;
      case 2: return 12;
      case 4: return 24;
      case 8: return 48;
      default: return 6;
    }
  };
  const [creativity, setCreativity] = useState(0.5);
  const [activeView, setActiveView] = useState<'intro' | 'generator' | 'features'>('generator');
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);

  useEffect(() => {
    if (characterId) {
      // In a real app, fetch character data
      setSelectedCharacter({
        id: characterId,
        name: 'Sophia Joo',
        image: '/placeholder.jpg'
      });
    }
  }, [characterId]);

  const styles: StyleOption[] = [
    { id: 'anime', name: 'Anime', image: '/placeholder-anime.png', isNew: true },
    { id: 'realistic-pro', name: 'Realistic Pro', image: '/placeholder-realistic.png', isNew: true },
    { id: 'animemix', name: 'AnimeMix', image: '/placeholder-animemix.png', isNew: true },
    { id: 'anime2d', name: 'Anime2D', image: '/placeholder-anime2d.png', isNew: true },
    { id: 'comic', name: 'Comic', image: '/placeholder-comic.png' },
    { id: 'realistic-lite', name: 'Realistic Lite', image: '/placeholder-realistic-lite.png' },
    { id: 'painting', name: 'Painting', image: '/placeholder-painting.png' },
    { id: 'cartoon', name: 'Cartoon', image: '/placeholder-cartoon.png' },
    { id: '3d-cartoon', name: '3D Cartoon', image: '/placeholder-3d-cartoon.png' },
  ];

  const models: ModelOption[] = [
    { id: 'ai-anime-art', name: 'AI Anime Art', images: ['/model1.jpg', '/model2.jpg', '/model3.jpg'] },
    { id: 'hot-ai-anime', name: 'Hot AI Anime Art', images: ['/model4.jpg', '/model5.jpg', '/model6.jpg'] },
    { id: 'realistic-ai', name: 'Realistic AI Art', images: ['/model7.jpg', '/model8.jpg', '/model9.jpg'] },
    { id: 'ai-hentai', name: 'AI Hentai Art', images: ['/model10.jpg', '/model11.jpg', '/model12.jpg'] },
    { id: 'ai-boobs', name: 'AI Boobs Generator', images: ['/model13.jpg', '/model14.jpg', '/model15.jpg'] },
    { id: 'ai-nudes', name: 'AI Nudes Generator', images: ['/model16.jpg', '/model17.jpg', '/model18.jpg'] },
  ];

  // 키워드별 이미지 매핑
  const keywordImages = {
    'anime': [
      { src: '/placeholder-anime-1.png', alt: 'Cute anime girl with colorful hair' },
      { src: '/placeholder-anime-2.png', alt: 'Anime character in school uniform' },
      { src: '/placeholder-anime-3.png', alt: 'Magical anime girl with sparkles' }
    ],
    'anime-hot': [
      { src: '/placeholder-hot-1.png', alt: 'Sexy anime girl in bikini' },
      { src: '/placeholder-hot-2.png', alt: 'Hot anime character in lingerie' },
      { src: '/placeholder-hot-3.png', alt: 'Seductive anime girl pose' }
    ],
    'realistic': [
      { src: '/placeholder-realistic-1.png', alt: 'Realistic beautiful woman portrait' },
      { src: '/placeholder-realistic-2.png', alt: 'Photorealistic female model' },
      { src: '/placeholder-realistic-3.png', alt: 'Realistic woman in elegant dress' }
    ],
    'hentai': [
      { src: '/placeholder-hentai-1.png', alt: 'Adult anime art style 1' },
      { src: '/placeholder-hentai-2.png', alt: 'Adult anime art style 2' },
      { src: '/placeholder-hentai-3.png', alt: 'Adult anime art style 3' }
    ],
    'ai-boobs': [
      { src: '/placeholder-boobs-1.png', alt: 'AI generated feminine figure 1' },
      { src: '/placeholder-boobs-2.png', alt: 'AI generated feminine figure 2' },
      { src: '/placeholder-boobs-3.png', alt: 'AI generated feminine figure 3' }
    ],
    'ai-nude-generator': [
      { src: '/placeholder-nude-1.png', alt: 'Artistic nude AI generation 1' },
      { src: '/placeholder-nude-2.png', alt: 'Artistic nude AI generation 2' },
      { src: '/placeholder-nude-3.png', alt: 'Artistic nude AI generation 3' }
    ]
  };

  const keywordLabels = {
    'anime': 'AI Anime Art',
    'anime-hot': 'Hot AI Anime Art', 
    'realistic': 'Realistic AI Art',
    'hentai': 'AI Hentai Art',
    'ai-boobs': 'AI Boobs Generator',
    'ai-nude-generator': 'AI Nudes Generator'
  };

  // URL에서 keyword 파라미터 확인
  const currentKeyword = searchParams.get('keyword') as keyof typeof keywordImages;
  const hasValidKeyword = currentKeyword && keywordImages[currentKeyword];

  // 이미지 Preloading
  useEffect(() => {
    // 현재 키워드 이미지들 preload
    const imagesToPreload = hasValidKeyword 
      ? keywordImages[currentKeyword] 
      : keywordImages['anime'];
    
    imagesToPreload.forEach((image) => {
      const img = new window.Image();
      img.src = image.src;
    });

    // 다른 키워드 이미지들도 백그라운드에서 preload
    const otherKeywords = Object.keys(keywordImages).filter(key => 
      key !== (hasValidKeyword ? currentKeyword : 'anime')
    );
    
    setTimeout(() => {
      otherKeywords.forEach(keyword => {
        keywordImages[keyword as keyof typeof keywordImages].forEach((image) => {
          const img = new window.Image();
          img.src = image.src;
        });
      });
    }, 1000); // 1초 후에 다른 이미지들 preload
  }, [currentKeyword, hasValidKeyword]);

  if (activeView === 'intro') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Spark Imagination with AI Image Generator
          </h1>
          
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-4xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-zinc-800 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-20" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-8 gap-2 mb-8 max-w-6xl">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => setActiveView('generator')}
                className="text-xs text-zinc-400 hover:text-white transition-colors text-center"
              >
                <div className="aspect-square bg-zinc-800 rounded mb-1" />
                <span>{model.name}</span>
              </button>
            ))}
          </div>

          <Button 
            onClick={() => setActiveView('generator')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
          >
            Start Creating
          </Button>
        </div>
      </div>
    );
  }

  if (activeView === 'features') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="min-h-screen p-8">
          <button
            onClick={() => setActiveView('generator')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h1 className="text-4xl font-bold text-white mb-12 text-center">
            Features Designed for Creativity
          </h1>

          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/10 rounded-2xl p-8 border border-purple-600/20">
              <h3 className="text-xl font-bold text-white mb-4">10 Unique Art Styles</h3>
              <p className="text-zinc-400 mb-6">
                Customize your creations with a diverse range of artistic styles, from realistic to abstract.
              </p>
              <div className="bg-zinc-900 rounded-lg p-4">
                <div className="grid grid-cols-4 gap-2">
                  {styles.slice(0, 8).map((style) => (
                    <div key={style.id} className="text-center">
                      <div className="aspect-square bg-zinc-800 rounded mb-1" />
                      <span className="text-xs text-zinc-500">{style.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/10 rounded-2xl p-8 border border-purple-600/20">
              <h3 className="text-xl font-bold text-white mb-4">Multi-Image Generation</h3>
              <p className="text-zinc-400 mb-6">
                Boost productivity by creating up to 8 images simultaneously with a single prompt.
              </p>
              <div className="bg-zinc-900 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-zinc-800 rounded flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-purple-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/10 rounded-2xl p-8 border border-purple-600/20">
              <h3 className="text-xl font-bold text-white mb-4">Advanced Customization</h3>
              <p className="text-zinc-400 mb-6">
                Fine-tune your results with adjustable creativity levels and other specialized settings.
              </p>
              <div className="bg-zinc-900 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Auto-Enhance</span>
                  <Switch checked disabled />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Safe Mode</span>
                  <Switch checked disabled />
                </div>
                <div>
                  <span className="text-sm text-zinc-400">Creativity</span>
                  <Slider value={[0.5]} max={1} step={0.1} className="mt-2" disabled />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => setActiveView('generator')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            >
              Generate Now!
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-96 bg-zinc-900 border-r border-zinc-800 flex flex-col">
          {/* Back Button */}
          <div className="p-4 border-b border-zinc-800">
            <Link
              href={characterId ? `/character/${characterId}` : "/"}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>

          {/* Selected Character */}
          {selectedCharacter && (
            <div className="p-4 border-b border-zinc-800">
              <div className="text-sm text-zinc-400 mb-2">Selected Character</div>
              <div className="flex items-center gap-3 bg-zinc-800 p-3 rounded-lg">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={selectedCharacter.image} 
                    alt={selectedCharacter.name} 
                    width={40} 
                    height={40} 
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{selectedCharacter.name}</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedCharacter(null);
                    window.history.replaceState({}, '', '/create/image');
                  }}
                  className="p-1 hover:bg-zinc-700 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            </div>
          )}

          {/* Prompt Section */}
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-6">
              <Label className="text-white mb-2 flex items-center gap-2">
                Prompt
                <button className="text-zinc-500 hover:text-zinc-300">
                  <Info className="w-4 h-4" />
                </button>
              </Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={selectedCharacter 
                  ? `Describe your character in the Prompt box or, try the 'Inspire Me' 🎲 button for inspiration.`
                  : "Write what you would like too see in your image. Tip: Start your prompt with a subject (e.g. A fantasy sorcerer standing in a mystical library...)"}
                className="bg-zinc-800 border-zinc-700 text-white min-h-[120px] placeholder:text-zinc-500"
              />
              <button
                onClick={() => setPrompt('')}
                className="text-sm text-zinc-500 hover:text-white mt-2"
              >
                Clear Prompt
              </button>
            </div>

            {/* Negative Prompt */}
            <div className="mb-6">
              <button
                onClick={() => setShowNegativePrompt(!showNegativePrompt)}
                className="text-white mb-2 flex items-center gap-2 hover:text-zinc-300"
              >
                Negative Prompt
                <span className="text-xs">▼</span>
              </button>
              {showNegativePrompt && (
                <Textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="Describe what you do not want to see in your image"
                  className="bg-zinc-800 border-zinc-700 text-white min-h-[80px] placeholder:text-zinc-500"
                />
              )}
            </div>

            {/* Settings */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <Label className="text-white flex items-center gap-2">
                  Auto-Enhance
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-zinc-500 hover:text-zinc-300">
                        <Info className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs bg-[#3f3f47] border-[#3f3f47] text-white">
                      <div className="space-y-2">
                        <div className="font-semibold">Automatic Prompt Refinement</div>
                        <div className="text-sm">This, when enabled, will improve your prompt with the help of AI in the background</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Switch
                  checked={autoEnhance}
                  onCheckedChange={setAutoEnhance}
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-white flex items-center gap-2">
                  Safe Mode
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-zinc-500 hover:text-zinc-300">
                        <Info className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs bg-[#3f3f47] border-[#3f3f47] text-white">
                      <div className="space-y-2">
                        <div className="font-semibold">Keeping Content Appropriate and Safe</div>
                        <div className="text-sm">Safe Mode, when enabled, will ensure that you won't get any unsafe/inappropriate content in your image</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Switch
                  checked={safeMode}
                  onCheckedChange={setSafeMode}
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
            </div>

            {/* Styles */}
            <div className="mb-6">
              <Label className="text-white mb-3 block">Styles</Label>
              <div className="grid grid-cols-3 gap-2">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={cn(
                      "relative p-2 rounded-lg border transition-all",
                      selectedStyle === style.id
                        ? "border-purple-600 bg-purple-600/20"
                        : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                    )}
                  >
                    {style.isNew && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-pink-500 text-xs rounded text-white">
                        New
                      </span>
                    )}
                    <div className="aspect-square bg-zinc-700 rounded mb-1 overflow-hidden">
                      <Image
                        src={style.image}
                        alt={style.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-zinc-300">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Images */}
            <div className="mb-6">
              <Label className="text-white mb-3 block">Number of Images</Label>
              <div className="flex gap-2">
                {[1, 2, 4, 8].map((num) => (
                  <button
                    key={num}
                    onClick={() => setNumberOfImages(num)}
                    className={cn(
                      "px-4 py-2 rounded-lg border transition-all flex-1",
                      numberOfImages === num
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-600"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Creativity Slider */}
            <div className="mb-6">
              <Label className="text-white mb-3 flex items-center gap-2">
                Creativity
                <button className="text-zinc-500 hover:text-zinc-300">
                  <Info className="w-4 h-4" />
                </button>
              </Label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-500">0</span>
                <Slider
                  value={[creativity]}
                  onValueChange={([value]) => setCreativity(value)}
                  max={1}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-sm text-zinc-500">1</span>
                <span className="text-sm text-white w-8">{creativity.toFixed(1)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-4">
              <Button variant="outline" className="flex-1 border-zinc-700 text-zinc-300">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
              <Button variant="outline" className="flex-1 border-zinc-700 text-zinc-300">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Settings
              </Button>
            </div>

            <button className="text-sm text-zinc-500 hover:text-white">
              <Settings2 className="w-4 h-4 inline mr-2" />
              Switch to Basic Image Creator
            </button>
          </div>

          {/* Generate Button */}
          <div className="p-4 border-t border-zinc-800">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
              <Zap className="w-4 h-4 mr-2" />
              Generate Image
              <span className="ml-2 px-2 py-0.5 bg-orange-500 rounded text-xs">
                {calculateCoins(numberOfImages)} 🔥
              </span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-zinc-950 overflow-y-auto">
          {/* Header */}
          <div className="p-8 text-center">
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {selectedCharacter 
                    ? 'Welcome to Your Canvas!'
                    : 'Spark Imagination with AI Image Generator'}
                </h1>
                {selectedCharacter && (
                  <p className="text-zinc-400 mb-2">
                    Describe your character in the Prompt box or,<br />
                    try the 'Inspire Me' 🎲 button for inspiration.
                  </p>
                )}
                {!selectedCharacter && !hasValidKeyword && (
                  <button
                    onClick={() => setActiveView('features')}
                    className="text-purple-500 hover:text-purple-400 text-sm"
                  >
                    Learn about features →
                  </button>
                )}
              </div>
              {hasValidKeyword && (
                <Link href="/create/image" className="text-zinc-400 hover:text-white text-2xl">
                  <X className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>

          {/* Keyword Images Display - Show for both keyword view and default view */}
          {!selectedCharacter && (
            <div className="px-8 pb-8">
              <div className="grid grid-cols-3 gap-10 max-w-4xl mx-auto mb-8">
                {(hasValidKeyword ? keywordImages[currentKeyword] : keywordImages['anime']).map((image, index) => (
                  <div 
                    key={index} 
                    className={`
                      aspect-[3/4] bg-zinc-800 rounded-lg overflow-hidden group cursor-pointer relative transition-all duration-300
                      ${index === 1 ? 'scale-110 z-10 hover:scale-[1.10]' : 'hover:scale-105'}
                    `}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  </div>
                ))}
              </div>
              
              {/* Model Selection Buttons */}
              <div className="grid grid-cols-6 gap-4">
                {models.map((model) => {
                  let keyword = 'anime';
                  if (model.id.includes('hot')) keyword = 'anime-hot';
                  else if (model.id.includes('realistic')) keyword = 'realistic'; 
                  else if (model.id.includes('hentai')) keyword = 'hentai';
                  else if (model.id.includes('boobs')) keyword = 'ai-boobs';
                  else if (model.id.includes('nudes')) keyword = 'ai-nude-generator';
                  
                  const handleKeywordChange = () => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('keyword', keyword);
                    router.push(`${pathname}?${params.toString()}`);
                  };

                  return (
                    <button
                      key={model.id}
                      onClick={handleKeywordChange}
                      className={cn(
                        "group relative rounded-lg overflow-hidden border-2 transition-all w-full",
                        (hasValidKeyword && currentKeyword === keyword) || (!hasValidKeyword && keyword === 'anime')
                          ? "border-purple-600"
                          : "border-zinc-800 hover:border-zinc-700"
                      )}
                    >
                      <div className="grid grid-cols-3 gap-0.5 p-2 bg-zinc-900">
                        {keywordImages[keyword as keyof typeof keywordImages].map((img, i) => (
                          <div key={i} className="aspect-[3/4] bg-zinc-800 rounded overflow-hidden relative">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover"
                              sizes="50px"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="p-2 bg-zinc-900">
                        <p className="text-sm text-white text-center">{model.name}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Character Canvas */}
          {selectedCharacter && (
            <div className="px-8 pb-8 flex justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">✨</div>
                <div className="w-96 h-96 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <div className="text-zinc-600">
                    <Sparkles className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Your image will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Get Started Steps */}
          <div className="px-8 pb-8">
            <div className="bg-zinc-900 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Get Started in 4 Easy Steps
              </h2>
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-white">
                    1
                  </span>
                  <p className="text-zinc-300">
                    Open GQPT AI Image Creator and sign in into your account
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-white">
                    2
                  </span>
                  <p className="text-zinc-300">
                    Describe the visuals you want generate in the Prompt Box
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-white">
                    3
                  </span>
                  <p className="text-zinc-300">
                    Select your preferred art style from Styles
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-white">
                    4
                  </span>
                  <p className="text-zinc-300">
                    Hit "Generate Image" button
                  </p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  Generate Now!
                </Button>
              </div>
            </div>
          </div>

          {/* Sample Gallery */}
          <div className="px-8 pb-8">
            <h3 className="text-3xl font-bold text-white mb-4 text-center">
              Discover the Power of Creativity and<br />
              Explore your Imagination without Boundaries
            </h3>
            <div className="flex justify-center">
              <div className="w-full max-w-6xl">
                <div className="flex">
                  {/* 좌측 공백 */}
                  <div className="flex-1"></div>
                  
                  {/* 중간 컨텐츠 */}
                  <div className="w-5/6">
                    <div className="grid grid-cols-4 gap-5">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="relative group">
                          <div className="aspect-[4/5] bg-zinc-800 rounded-lg overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-20" />
                          </div>
                          <button className="absolute bottom-2 right-2 px-3 py-1 bg-black/50 backdrop-blur rounded text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            Try this prompt
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 우측 공백 */}
                  <div className="flex-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-8 pb-8 text-center">
            <div className="inline-flex items-center gap-4 text-sm text-zinc-500">
              <span>36,633,338 Image Gens</span>
              <span>•</span>
              <span>Still counting...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}