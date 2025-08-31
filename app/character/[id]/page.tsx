'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MessageCircle, Image as ImageIcon, Clock, Star, Brain, Heart, Share2, MoreVertical, ChevronDown, Plus, Edit3, Send, Mic, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Layout } from '@/components/layout/layout'

interface TabContent {
  id: string
  label: string
  icon: React.ReactNode
}

const tabs: TabContent[] = [
  { id: 'media', label: 'Media Gallery', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'recent', label: 'Recent Chats', icon: <Clock className="w-4 h-4" /> },
  { id: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> },
  { id: 'ai-generator', label: 'AI Image Generator', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'memories', label: 'Memories', icon: <Brain className="w-4 h-4" /> },
]

export default function CharacterDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('media')
  const router = useRouter()

  const handleStartChat = () => {
    router.push(`/chat/${params.id}`)
  }

  const handleGeneratePictures = () => {
    router.push(`/create/image?character=${params.id}`)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Header */}
        <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Character Info Section */}
          <div className="flex gap-8">
            {/* Character Image */}
            <div className="relative w-96 h-96 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/placeholder.jpg"
                alt="Sophia Joo"
                fill
                className="object-cover"
              />
              <button className="absolute bottom-4 left-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Character Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Sophia Joo</h1>
                  <div className="flex items-center gap-6 text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>57.0K</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>💬 1.8K</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👍 14</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👎</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Creator Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-sm">👤</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Creator</p>
                    <p className="text-sm">@Seysey9988</p>
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm">
                  Follow
                </Button>
                <div className="ml-auto flex gap-4 text-sm text-gray-400">
                  <div>
                    <p>Published At</p>
                    <p className="text-white">Apr 05, 2024</p>
                  </div>
                  <div>
                    <p>Last Updated</p>
                    <p className="text-white">8 months ago</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6">
                Single Elementary school Korean class teacher
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">👩 Female</Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">👤 Submissive</Badge>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">🔥 NSFW</Badge>
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">🏷️ Petite</Badge>
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">Deredere</Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  onClick={handleStartChat}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2"
                >
                  Start New Chat <MessageCircle className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleGeneratePictures}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full flex items-center gap-2"
                >
                  Generate Pictures ✨
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'media' && <MediaGalleryTab />}
        {activeTab === 'recent' && <RecentChatsTab characterId={params.id} />}
        {activeTab === 'reviews' && <ReviewsTab />}
        {activeTab === 'ai-generator' && <AIGeneratorTab characterId={params.id} />}
        {activeTab === 'memories' && <MemoriesTab />}
      </div>
      </div>
    </Layout>
  )
}

function MediaGalleryTab() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="text-2xl font-semibold mb-2">No images yet.</p>
      <p className="text-gray-400 mb-6">Click on Generate Pictures button to start generating pictures.</p>
      <Button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full flex items-center gap-2">
        Generate Pictures ✨
      </Button>
    </div>
  )
}

function RecentChatsTab({ characterId }: { characterId: string }) {
  const [hasChats, setHasChats] = useState(false)
  const router = useRouter()

  if (!hasChats) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-2xl font-semibold mb-2">No chats yet.</p>
        <p className="text-gray-400 mb-6">You do not have any chat with Sophia Joo. Start on by clicking Start Chatting button.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Your Recent Chats with Sophia Joo(1)</h2>
      <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image src="/placeholder.jpg" alt="Sophia Joo" width={48} height={48} className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">Sophia Joo</h3>
              <button className="p-1 hover:bg-gray-700 rounded">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              "Hi 👋 my name is Sophia I go by Sophie, what's your name...? 😊"
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                1
              </span>
              <span>Aug 31, 2025</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={() => router.push(`/chat/${characterId}`)}
            className="bg-transparent hover:bg-gray-700 text-white px-4 py-1 rounded-full text-sm border border-gray-600"
          >
            Open Chat →
          </Button>
        </div>
      </div>
    </div>
  )
}

function ReviewsTab() {
  const [hasReviews, setHasReviews] = useState(true)

  if (!hasReviews) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-2xl font-semibold mb-2">No reviews yet</p>
        <p className="text-gray-400 mb-6">Be the first one to add review by clicking Leave a Review button.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">1 review</h2>
          <div className="flex items-center gap-2 text-gray-400">
            <span>14 👍</span>
            <span>1 👎</span>
          </div>
        </div>
        <Button className="bg-transparent hover:bg-gray-800 text-purple-400 px-4 py-2 rounded-lg border border-gray-700 flex items-center gap-2">
          <Edit3 className="w-4 h-4" />
          Leave a review
        </Button>
      </div>

      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-semibold">
            M
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">MacAKM</span>
              <span className="text-green-500">👍</span>
            </div>
            <p className="text-gray-300">good</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AIGeneratorTab({ characterId }: { characterId: string }) {
  const router = useRouter()
  
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-6xl mb-4">✨</div>
      <p className="text-2xl font-semibold mb-2">AI Image Generator</p>
      <p className="text-gray-400 mb-6">Create custom images with Sophia Joo using AI</p>
      <Button 
        onClick={() => router.push(`/create/image?character=${characterId}`)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
      >
        Start Generating
      </Button>
    </div>
  )
}

function MemoriesTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Sophia Joo's Memories (0)</h2>
        <div className="flex gap-2">
          <Button className="bg-transparent hover:bg-gray-800 text-white px-4 py-1 rounded-lg border border-gray-700">
            All
          </Button>
          <Button className="bg-transparent hover:bg-gray-800 text-gray-400 px-4 py-1 rounded-lg">
            Mine
          </Button>
          <Button className="bg-transparent hover:bg-gray-800 text-gray-400 px-4 py-1 rounded-lg">
            Liked
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-2xl font-semibold mb-2">No public chats yet.</p>
        <p className="text-gray-400">Sophia Joo does not have any public (shared) chat yet.</p>
      </div>
    </div>
  )
}