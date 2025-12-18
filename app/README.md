# App Directory

This directory contains the main application routes and API endpoints for the Next.js application. It is structured to support the Next.js App Router with server components by default.

## Structure
- `layout.tsx`: Defines the layout for the application.
- `page.tsx`: The main entry page for the application.
- `api/`: Contains API routes, such as health checks.

## Module Boundaries
- Only import components and utilities from the `lib/` directory.
- Avoid direct database access; use API routes for data fetching.
