'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MoreHorizontal, RefreshCw, Send, Mic, Paperclip, Smile, Info, Settings, ChevronDown, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ChatPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState('')
  const [isAudioMode, setIsAudioMode] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image src="/placeholder.jpg" alt="Sophia Joo" width={40} height={40} className="object-cover" />
                </div>
                <div>
                  <h2 className="font-semibold">Sophia Joo</h2>
                  <p className="text-xs text-gray-400">Created by @Seysey9988</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-orange-900/20 border border-orange-700/30 px-6 py-3">
          <div className="flex items-start gap-3">
            <span className="text-orange-500 mt-1">⚠️</span>
            <p className="text-sm text-orange-300">
              Remember: You're entering the realm of AI-driven, fictional roleplay, where every scenario unfolds with explicit consent. Treat this as a creative space, detached from reality. Engaging here means you commit to our{' '}
              <Link href="#" className="text-orange-400 underline">safe chat</Link> rules and legal boundaries, avoiding any forbidden topics. Dive into your story, safely and imaginatively!
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Character Profile */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image src="/placeholder.jpg" alt="Sophia Joo" width={128} height={128} className="object-cover" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Sophia Joo</h1>
              <p className="text-gray-400 mb-4">Single Elementary school Korean class teacher</p>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>

            {/* Initial Message */}
            <div className="mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/placeholder.jpg" alt="Sophia Joo" width={40} height={40} className="object-cover" />
                </div>
                <div className="bg-gray-900 rounded-2xl px-4 py-3 max-w-md">
                  <p className="mb-1">Sophia Joo</p>
                  <p>Hi 👋 my name is Sophia I go by Sophie, what's your name...? 😊</p>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Play
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Reply */}
        <div className="border-t border-gray-800 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Here's a Suggested Reply for You</p>
                <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <p className="text-gray-300">Hi there! I'm Donghwa, nice to meet you Sophie.</p>
                <button className="ml-auto">
                  <Edit3 className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <Button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2">
                💡 Suggest Reply
              </Button>
              <Button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2">
                🎬 Ask Video <span className="text-xs bg-purple-600 px-1 rounded">BETA</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-800 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <button 
                  onClick={() => setIsAudioMode(!isAudioMode)}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="text-gray-400">Ask</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-gray-900 rounded-full px-4 py-3 pr-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1">
                <span className="text-xs text-gray-400">SFW</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function Edit3({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  )
}