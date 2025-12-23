# Task Management Application

## Overview

This is a frontend-only task management UI with user authentication screens and task management pages. It is designed to be used with a separate Go backend service.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state management
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared/ for shared)

### Backend
- **Backend repo**: Runs separately (Go). Configure the frontend to talk to it via environment variables.

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/ui/  # Shadcn UI components
│       ├── pages/          # Route pages (Login, Register, Tasks)
│       ├── hooks/          # Custom React hooks
│       └── lib/            # Utilities and query client
├── shared/           # Shared types / API contract
└── attached_assets/  # Design assets / docs
```

### Key Design Decisions

1. **Frontend-only**: This repository only contains the UI. All server/database logic lives in the separate Go backend repository.

2. **Shared types**: `shared/` contains request/response types and Zod schemas for frontend validation.

3. **Component Library**: Shadcn/ui provides accessible, customizable components without vendor lock-in since components are copied into the codebase.

## External Dependencies

### Backend API
- **Configuration**: Set `VITE_TASK_APP_BASE_URL` to your backend base URL (e.g. `http://localhost:8080`).

### Key NPM Packages
- **@tanstack/react-query**: Server state and caching
- **zod**: Runtime type validation
- **wouter**: Client-side routing
- **lucide-react**: Icon library

### Development Tools
- **Vite**: Development server and build tool
- **@replit/vite-plugin-***: Replit-specific development enhancements