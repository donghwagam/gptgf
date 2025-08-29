'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageIcon, Volume2 } from 'lucide-react';
import Link from 'next/link';

export default function CreateCharacterPage() {
  const [characterName, setCharacterName] = useState('');
  const [age, setAge] = useState('');
  const [language, setLanguage] = useState('Korean');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [description, setDescription] = useState('');
  const [personality, setPersonality] = useState('');
  const [scenario, setScenario] = useState('');
  const [firstMessage, setFirstMessage] = useState('');
  const [visibility, setVisibility] = useState('Private');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false);

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

  const calculateTokens = () => {
    const totalText = description + personality + scenario + firstMessage;
    return Math.floor(totalText.length / 4);
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
                <div className="w-48 h-48 bg-zinc-900 rounded-lg border-2 border-zinc-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-2 text-zinc-600">
                      <ImageIcon className="w-full h-full" />
                    </div>
                    <span className="text-4xl text-zinc-600">?</span>
                  </div>
                </div>
                <div className="flex-1">
                  <Button variant="secondary" className="mb-3 bg-zinc-800 hover:bg-zinc-700 text-white">
                    Generate Image
                  </Button>
                  <p className="text-sm text-zinc-400">
                    Generate an image that represents your character. Make sure these images comply to{' '}
                    <Link href="#" className="text-blue-500 hover:underline">
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
              <Label htmlFor="tags" className="text-base mb-2 block text-white">
                Character Tags
              </Label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tag"
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                />
                <Button onClick={handleAddTag} variant="secondary" size="icon" className="bg-zinc-800 hover:bg-zinc-700">
                  +
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-zinc-800 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(index)}
                      className="text-zinc-500 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <p className="text-sm text-zinc-500">
                Assign tags that describes your character. You can add maximum 10 tags.
              </p>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base mb-2 block text-white">
                Description ({calculateTokens()} tokens)
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
                Personality (0 tokens)
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
                Scenario (0 tokens)
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
                First Message (0 tokens)
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
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Unlisted">Unlisted</SelectItem>
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
                <Link href="#" className="text-blue-500 hover:underline">
                  Community Guidelines
                </Link>
                .
              </Label>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">Token</span>
                <span className="text-2xl font-bold text-white">
                  {calculateTokens()} / 2500
                </span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                  Reset
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={!agreedToGuidelines || !characterName}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}