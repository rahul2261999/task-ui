# Task Management Application

## Overview

This is a full-stack task management application with user authentication. The project features a React frontend with a modern UI component library and an Express backend with PostgreSQL database support. Users can register, log in, and manage their personal tasks with categories and due dates.

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

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: HTTP server with development hot-reload via Vite middleware
- **API Design**: RESTful endpoints prefixed with /api
- **Build**: esbuild for production bundling

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: shared/schema.ts (shared between frontend and backend)
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Storage Abstraction**: IStorage interface in server/storage.ts allows swapping between MemStorage (in-memory) and database implementations

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/ui/  # Shadcn UI components
│       ├── pages/          # Route pages (Login, Register, Tasks)
│       ├── hooks/          # Custom React hooks
│       └── lib/            # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data access layer
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between frontend/backend
│   └── schema.ts     # Drizzle database schema
└── migrations/       # Drizzle database migrations
```

### Key Design Decisions

1. **Monorepo Structure**: Single repository with client, server, and shared directories enables type sharing between frontend and backend.

2. **Storage Interface Pattern**: The IStorage interface abstracts data operations, currently using in-memory storage (MemStorage) but designed for easy database integration.

3. **Shared Schema**: Database schema in shared/schema.ts is used by both the server for database operations and can be imported by the client for type safety.

4. **Component Library**: Shadcn/ui provides accessible, customizable components without vendor lock-in since components are copied into the codebase.

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via @neondatabase/serverless driver
- **Connection**: Requires DATABASE_URL environment variable
- **Migrations**: Run `npm run db:push` to sync schema to database

### Key NPM Packages
- **@tanstack/react-query**: Server state and caching
- **drizzle-orm** / **drizzle-kit**: Database ORM and migration tooling
- **zod**: Runtime type validation
- **wouter**: Client-side routing
- **lucide-react**: Icon library
- **express-session** with **connect-pg-simple**: Session management (configured for PostgreSQL sessions)

### Development Tools
- **Vite**: Development server and build tool
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling for server code