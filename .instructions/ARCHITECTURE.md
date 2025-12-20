# EventStack Architecture

## Layer Responsibilities

1. **Presentation Layer (Next.js)**
   - Must be stateless and delegate business logic to API routes
   - Must use Server Components by default
   - Must implement proper loading and error states

2. **API Layer (Next.js API Routes)**
   - Must validate all inputs using Zod
   - Must implement proper error handling and status codes
   - Must use Supabase client for database operations

3. **Data Access Layer (Supabase)**
   - Must use Row Level Security (RLS) for all database tables
   - Must define proper indexes for query performance
   - Must use database functions for complex operations

## Dependency Rules

- Presentation Layer → API Layer (REST/HTTP)
- API Layer → Data Access Layer (Supabase)
- Must never bypass API layer to access database directly from frontend

## Folder Structure

- `/app` - Next.js application routes
- `/components` - Reusable UI components
- `/lib` - Shared utilities and configurations
- `/types` - TypeScript type definitions
- `/tests` - Test files
