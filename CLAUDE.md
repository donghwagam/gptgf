# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 13.5 application with TypeScript that serves as an AI character interaction and image generation platform. The application features character creation, chat functionality, AI image generation with various styles, and comprehensive user authentication through Supabase.

## Development Commands

```bash
# Start development server
npm run dev

# Start development server on specific port
npm run dev -- --port 3001

# Build for production (static export)
npm run build

# Run production server
npm start

# Run ESLint
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 13.5 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand for UI state
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom shadcn/ui components

### Key Features
- **Character Management**: Create, browse, and interact with AI characters
- **AI Image Generation**: Multiple art styles (anime, realistic, etc.) with dynamic coin pricing system
- **Chat System**: Real-time messaging with characters
- **User Authentication**: Complete auth flow with signup, login, and password reset
- **Content Filtering**: NSFW content management and safe mode
- **Multi-language Support**: English and Korean localization

### Database Schema
The application uses a comprehensive PostgreSQL schema with the following main entities:
- `users`: Extended user profiles linked to Supabase auth
- `characters`: AI character definitions with metadata
- `tags`: Categorization system for characters
- `chats`: Chat sessions between users and characters  
- `messages`: Individual chat messages
- `reviews`: Character ratings and feedback

All tables implement Row Level Security (RLS) policies for secure data access.

### Key Directories
- `/app`: Next.js App Router pages and layouts
  - `/auth`: Authentication pages
  - `/character/[id]`: Dynamic character detail pages
  - `/chat/[id]`: Chat interface pages
  - `/create`: Character and image creation tools
  - `/legal`: Legal and policy pages
  - `(marketing)`: Marketing pages group
- `/components`: React components
  - `/ui`: shadcn/ui components library
  - `/layout`: Layout components (sidebar, topbar)
  - `/auth`: Authentication-related components
- `/lib`: Utilities, stores, and database client
  - `/stores`: Zustand state stores
  - `supabase.ts`: Database client and type definitions
- `/hooks`: Custom React hooks (including useAuth)
- `/context`: React context providers (AuthContext)

### Authentication Flow
The application implements a complete authentication system using Supabase:
- User registration/login through AuthContext
- Automatic user profile creation via database triggers
- Protected routes and RLS policies
- Password reset functionality

### Image Generation System
The AI image generation feature includes:
- Multiple art styles with preview images in `/public` folder
- Dynamic coin pricing: 1 image (6 coins), 2 images (12 coins), 4 images (24 coins), 8 images (48 coins)
- Keyword-based content filtering and categorization
- Style selection with visual previews

### Import Aliases
- `@/*`: Root directory imports
- Components use the shadcn/ui pattern with a components.json configuration

### Build Configuration
- Output mode: Static export (`output: 'export'`)
- ESLint errors are ignored during builds
- Images are unoptimized for static export compatibility

### UI State Management
The application uses Zustand for UI state management (`lib/stores/ui-store.ts`), tracking:
- Sidebar collapsed state
- NSFW content visibility
- Language preference (en/ko)
- Onboarding modal visibility
- Notification and PWA install prompts

### Environment Variables
Required environment variables for Supabase integration:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`