import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          username: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      characters: {
        Row: {
          id: string
          slug: string
          name: string
          age: number
          avatar_url: string
          synopsis: string
          description: string | null
          creator_id: string
          nsfw: boolean
          premium: boolean
          has_video: boolean
          likes_count: number
          comments_count: number
          views_count: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          age: number
          avatar_url: string
          synopsis: string
          description?: string | null
          creator_id: string
          nsfw?: boolean
          premium?: boolean
          has_video?: boolean
          likes_count?: number
          comments_count?: number
          views_count?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          age?: number
          avatar_url?: string
          synopsis?: string
          description?: string | null
          creator_id?: string
          nsfw?: boolean
          premium?: boolean
          has_video?: boolean
          likes_count?: number
          comments_count?: number
          views_count?: string
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          slug: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          created_at?: string
        }
      }
      character_tags: {
        Row: {
          id: string
          character_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          id?: string
          character_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          id?: string
          character_id?: string
          tag_id?: string
          created_at?: string
        }
      }
      chats: {
        Row: {
          id: string
          user_id: string
          character_id: string
          last_message: string | null
          message_count: number
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          character_id: string
          last_message?: string | null
          message_count?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          character_id?: string
          last_message?: string | null
          message_count?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          sender_type: 'user' | 'character'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          sender_type: 'user' | 'character'
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          sender_type?: 'user' | 'character'
          content?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          character_id: string
          user_id: string
          rating: 'like' | 'dislike'
          content: string | null
          created_at: string
        }
        Insert: {
          id?: string
          character_id: string
          user_id: string
          rating: 'like' | 'dislike'
          content?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          character_id?: string
          user_id?: string
          rating?: 'like' | 'dislike'
          content?: string | null
          created_at?: string
        }
      }
    }
  }
}