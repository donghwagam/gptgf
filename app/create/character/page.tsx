'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageIcon, Volume2, Upload, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function CreateCharacterPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [characterName, setCharacterName] = useState('');
  const [age, setAge] = useState('');
  const [language, setLanguage] = useState('Korean');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showTagSelector, setShowTagSelector] = useState(false);
  const tagSelectorRef = useRef<HTMLDivElement>(null);
  const [description, setDescription] = useState('');
  const [personality, setPersonality] = useState('');
  const [scenario, setScenario] = useState('');
  const [firstMessage, setFirstMessage] = useState('');
  const [visibility, setVisibility] = useState('Private');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false);
  
  // 새로 추가된 상태
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const maleVoices = Array.from({ length: 10 }, (_, i) => ({
    id: `male-${i + 1}`,
    label: `Voice ${i + 1}`,
    isNew: [5, 6, 7, 8, 9, 10].includes(i + 1)
  }));

  const femaleVoices = Array.from({ length: 16 }, (_, i) => ({
    id: `female-${i + 1}`,
    label: `Voice ${i + 1}`,
    isNew: [13, 14].includes(i + 1)
  }));

  const handleAddTag = () => {
    if (tagInput && tags.length < 10) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleToggleTag = (tagName: string) => {
    if (tags.includes(tagName)) {
      setTags(tags.filter(tag => tag !== tagName));
    } else {
      if (tags.length < 10) {
        setTags([...tags, tagName]);
      }
    }
  };

  const handleRemoveSelectedTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // 외부 클릭 감지하여 태그 선택기 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagSelectorRef.current && !tagSelectorRef.current.contains(event.target as Node)) {
        setShowTagSelector(false);
      }
    };

    if (showTagSelector) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showTagSelector]);

  // 개별 토큰 계산 함수들
  const calculateTokens = (text: string) => {
    if (!text) return 0;
    // 한국어와 영어 혼합 텍스트를 고려한 토큰 계산
    // 한글은 보통 1글자당 1.5-2토큰, 영어는 4글자당 1토큰 정도
    const koreanChars = (text.match(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g) || []).length;
    const otherChars = text.length - koreanChars;
    return Math.ceil(koreanChars * 1.5 + otherChars / 4);
  };

  const getTotalTokens = () => {
    return calculateTokens(description) + calculateTokens(personality) + calculateTokens(scenario) + calculateTokens(firstMessage);
  };

  // 이미지 업로드 함수
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        },
        body: formData
      });

      const result = await response.json();
      if (result.success) {
        setAvatarUrl(result.url);
      } else {
        alert(result.error || '이미지 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  // 캐릭터 생성 함수
  const handleCreate = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!characterName || !age || !agreedToGuidelines) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    setIsCreating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const characterData = {
        name: characterName,
        age: parseInt(age),
        avatar_url: avatarUrl,
        description,
        personality,
        scenario,
        firstMessage,
        tags,
        nsfw: false, // 기본값
        language
      };

      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(characterData)
      });

      const result = await response.json();
      if (result.success) {
        alert('캐릭터가 성공적으로 생성되었습니다!');
        router.push(`/character/${result.character.slug}`);
      } else {
        alert(result.error || '캐릭터 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Create error:', error);
      alert('캐릭터 생성 중 오류가 발생했습니다.');
    } finally {
      setIsCreating(false);
    }
  };

  // 폼 리셋 함수
  const handleReset = () => {
    setCharacterName('');
    setAge('');
    setTags([]);
    setTagInput('');
    setDescription('');
    setPersonality('');
    setScenario('');
    setFirstMessage('');
    setAvatarUrl('');
    setSelectedVoice('');
    setAgreedToGuidelines(false);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white">Create Your Character</h1>

          <div className="space-y-8">
            {/* Character Name */}
            <div>
              <Label htmlFor="character-name" className="text-base mb-2 block text-white">
                Character Name
              </Label>
              <Input
                id="character-name"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Miles Morales"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
              />
              <p className="text-sm text-zinc-500 mt-1">
                This is your character's display name.
              </p>
            </div>

            {/* Character Image */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Character Image</h3>
              <div className="flex items-start gap-8">
                <div className="w-48 h-48 bg-zinc-900 rounded-lg border-2 border-zinc-800 flex items-center justify-center overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Character Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-2 text-zinc-600">
                        <ImageIcon className="w-full h-full" />
                      </div>
                      <span className="text-4xl text-zinc-600">?</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex gap-2 mb-3">
                    <Button 
                      variant="secondary" 
                      className="bg-zinc-800 hover:bg-zinc-700 text-white"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4 mr-2" />
                      )}
                      {isUploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                    <Button variant="secondary" className="mb-3 bg-zinc-800 hover:bg-zinc-700 text-white">
                      Generate Image
                    </Button>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Upload or generate an image that represents your character. Make sure these images comply to{' '}
                    <Link href="/legal" className="text-blue-500 hover:underline">
                      our terms and community guidelines
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Character Age */}
            <div>
              <Label htmlFor="character-age" className="text-base mb-2 block text-white">
                Character Age
              </Label>
              <Input
                id="character-age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="18"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
              />
              <p className="text-sm text-zinc-500 mt-1">
                This is your character's age.
              </p>
            </div>

            {/* Language */}
            <div>
              <Label htmlFor="language" className="text-base mb-2 block text-white">
                Language
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="Korean">Korean</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-zinc-500 mt-1">
                Select the language for your character's responses and fill the rest of the form in the same language to prevent unintended behavior.
              </p>
            </div>

            {/* Character Tags */}
            <div>
              <Label className="text-base mb-2 block text-white">
                Character Tags
              </Label>
              
              {/* Selected Tags Display */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 text-white text-sm h-8"
                      style={{ backgroundColor: '#6366f1', borderRadius: '6px' }}
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveSelectedTag(tag)}
                        className="ml-1 text-white hover:text-gray-200"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mb-4">
                <Button 
                  variant="secondary" 
                  className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm h-8 px-3 py-1"
                  onClick={() => setShowTagSelector(!showTagSelector)}
                >
                  Add tag +
                </Button>
              </div>

              {/* Show tag selector when button is clicked */}
              {showTagSelector && (
                <div ref={tagSelectorRef} className="mb-4">
                  <h4 className="text-white mb-2">Tags</h4>
                  <div className="bg-zinc-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                    {/* default */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">default</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: '🔥 NSFW', icon: '🔥' },
                          { name: '👹 Monster Girl', icon: '👹' },
                          { name: '🌍 Worlds-End-Challenge', icon: '🌍' }
                        ].map((tag) => (
                          <button
                            key={tag.name}
                            onClick={() => handleToggleTag(tag.name)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag.name)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag.icon} {tag.name.replace(/^[🔥👹🌍]\s*/, '')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Character Type */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Character Type</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Female',
                          'Male', 
                          'Non-human',
                          'Non-binary',
                          'Object',
                          'Myth',
                          'Queer'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Genre */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Genre</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Scenario', 'RPG', 'Fictional', 'Romantic', 'Magical', 'Anime', 'Hentai', 'Wholesome',
                          'Action', 'Historical', 'Sci-fi', 'Horror', 'Seinen', 'Fandom', 'Philosophy', 'Politics',
                          'Non-English', 'Detective', 'Manga'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Origin */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Origin</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Original Character(OG)', 'Game', 'Movie', 'Books', 'VTuber', 'Folklore'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Goal */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Goal</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Erotic Roleplay', 'Breeding', 'Femdom'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Personality */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Personality</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Submissive', 'Dominant', 'Milf', 'Bully', 'Switch', 'Femboy', 'Tomboy', 'Villain',
                          'Hero', 'Tsundere', 'Yandere', 'Kuudere', 'Assistant', 'Sissy', 'Deredere', 'Dandere',
                          'Dilf'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Physical Traits */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Physical Traits</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Petite', 'Futa', 'BBW', 'Monster', 'Monster Girl', 'Elf', 'Robot', 'Giant', 
                          'Alien', 'Succubus', 'Maid', 'Realistic', 'Pregnant', 'Shortstack', 'Demi human'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fantasy */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Fantasy</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Cheating', 'NTR', 'Chastity', 'Hypno', 'BDSM', 'Voyeur', 'Bondage', 'CNC'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sexuality */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Sexuality</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Straight', 'Bisexual', 'Gay', 'Lesbian', 'Asexual'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Kink */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Kink</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Worship', 'Feet'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ethnicity */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Ethnicity</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Arab'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Religion */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Religion</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Muslim', 'Religion'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Other */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Other</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Royalty'
                        ].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded text-sm ${
                              tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-sm text-zinc-500">
                Assign tags that describes your character. You can add maximum 10 tags.
              </p>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base mb-2 block text-white">
                Description ({calculateTokens(description)} tokens)
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="You're pretty sure Brooklyn's local hero has a crush on you..."
                className="bg-zinc-900 border-zinc-800 text-white min-h-[150px] placeholder:text-zinc-600"
              />
              <p className="text-sm text-zinc-500 mt-1">
                Write a brief overview of your character.
              </p>
            </div>

            {/* Personality */}
            <div>
              <Label htmlFor="personality" className="text-base mb-2 block text-white">
                Personality ({calculateTokens(personality)} tokens)
              </Label>
              <Textarea
                id="personality"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="Adventurous, witty, and kind-hearted..."
                className="bg-zinc-900 border-zinc-800 text-white min-h-[150px] placeholder:text-zinc-600"
              />
              <p className="text-sm text-zinc-500 mt-1">
                Describe your character's traits, behavior, and demeanor.
              </p>
            </div>

            {/* Scenario */}
            <div>
              <Label htmlFor="scenario" className="text-base mb-2 block text-white">
                Scenario ({calculateTokens(scenario)} tokens)
              </Label>
              <Textarea
                id="scenario"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="Miles has been Brooklyn's very own, Spiderman for at least 3-4 months now. Stopping bad guys and saving people, particularly faces like you, the pretty person who sits next to him during his AP literature class. He's had a crush on them even outside the Spider-Man suit, watching the way they hit their pen against their desk in hopes of re-jogging their memory as they scribble down answers. So, when saving them from another villain during the day or even night as they stare at him like he had just strung the stars in the sky always leaves him giddy and sadly in hopes he can save them again. But, he always feels as though there's no way someone like you would be into him...just Miles Morales...not Spiderman"
                className="bg-zinc-900 border-zinc-800 text-white min-h-[200px] placeholder:text-zinc-600"
              />
            </div>

            {/* First Message */}
            <div>
              <Label htmlFor="first-message" className="text-base mb-2 block text-white">
                First Message ({calculateTokens(firstMessage)} tokens)
              </Label>
              <Textarea
                id="first-message"
                value={firstMessage}
                onChange={(e) => setFirstMessage(e.target.value)}
                placeholder='Why does this always keep happening to you?! You huffed, this was the fourth time this week. You were held in the clutches of another villain as they took you hostage during their rampage. "Hey, man could this have waited?" you asked as they rested their fists against their cheek. "I have a paper due.."'
                className="bg-zinc-900 border-zinc-800 text-white min-h-[150px] placeholder:text-zinc-600"
              />
            </div>

            {/* Legacy Section */}
            <details className="group">
              <summary className="text-lg font-semibold cursor-pointer py-2 flex items-center justify-between text-white">
                Legacy
                <span className="text-sm text-zinc-500 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 space-y-4 pl-4">
                {/* Legacy fields would go here */}
              </div>
            </details>

            {/* Visibility */}
            <div>
              <Label htmlFor="visibility" className="text-base mb-2 block text-white">
                Visibility
              </Label>
              <Select value={visibility} onValueChange={setVisibility}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="Public" className="text-white hover:bg-zinc-800 focus:bg-zinc-800">
                    Public
                  </SelectItem>
                  <SelectItem value="Private" className="text-white hover:bg-zinc-800 focus:bg-zinc-800">
                    Private
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-zinc-500 mt-1">
                Select whether you want your character's information to be publicly visible or not.
              </p>
            </div>

            {/* Character Voice */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Character Voice</h3>
              
              {/* Male Voices */}
              <div className="mb-6">
                <h4 className="text-base font-medium mb-3 text-white">Male</h4>
                <div className="grid grid-cols-4 gap-3">
                  {maleVoices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      className={`relative px-4 py-3 rounded-lg border ${
                        selectedVoice === voice.id
                          ? 'bg-purple-600 border-purple-500'
                          : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'
                      } transition-colors flex items-center gap-2`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="text-sm">{voice.label}</span>
                      {voice.isNew && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-pink-500 text-xs rounded-full">
                          New
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Female Voices */}
              <div>
                <h4 className="text-base font-medium mb-3 text-white">Female</h4>
                <div className="grid grid-cols-4 gap-3">
                  {femaleVoices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      className={`relative px-4 py-3 rounded-lg border ${
                        selectedVoice === voice.id
                          ? 'bg-purple-600 border-purple-500'
                          : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'
                      } transition-colors flex items-center gap-2`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="text-sm">{voice.label}</span>
                      {voice.isNew && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-pink-500 text-xs rounded-full">
                          New
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Guidelines Agreement */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="guidelines"
                checked={agreedToGuidelines}
                onCheckedChange={(checked) => setAgreedToGuidelines(checked as boolean)}
                className="border-zinc-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor="guidelines" className="text-base cursor-pointer text-white">
                I have read and agree with the{' '}
                <Link href="/legal/guidelines" target="_blank" className="text-blue-500 hover:underline">
                  Community Guidelines
                </Link>
                .
              </Label>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">Total Tokens</span>
                <span className="text-2xl font-bold text-white">
                  {getTotalTokens()} / 2500
                </span>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                  onClick={handleReset}
                  disabled={isCreating}
                >
                  Reset
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={!agreedToGuidelines || !characterName || !age || isCreating}
                  onClick={handleCreate}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}