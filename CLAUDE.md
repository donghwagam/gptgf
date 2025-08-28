# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 13.5 application with TypeScript, configured for static export. The project appears to be a character or content browsing platform with features for displaying character cards, handling NSFW content, and supporting multiple languages (English and Korean).

## Development Commands

```bash
# Start development server
npm run dev

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
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand for UI state
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom shadcn/ui components

### Key Directories
- `/app`: Next.js App Router pages and layouts
  - `(marketing)`: Marketing pages group
  - `tag/[slug]`: Dynamic tag pages
- `/components`: React components
  - `/ui`: shadcn/ui components library
  - `/layout`: Layout components (sidebar, topbar)
  - `/modals`: Modal components
- `/lib`: Utilities and stores
  - `/stores`: Zustand state stores
- `/hooks`: Custom React hooks
- `/types`: TypeScript type definitions

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