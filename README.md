# Next.js + Supabase Project

This project is a production-ready foundation for a Next.js application using TypeScript and Supabase. It focuses on structure, configuration, and boundaries, not business features.

## Project Structure

- **app/**: Contains the main application routes and API endpoints.
  - `layout.tsx`: Defines the layout for the application.
  - `page.tsx`: The main entry page for the application.
  - `api/`: Contains API routes, such as health checks.
- **lib/**: Shared utilities and client configurations.
- **config/**: Environment and application configuration files.


# Testing Pages
http://localhost:3000/
http://localhost:3000/auth
http://localhost:3000/dashboard

## Getting Started

### Prerequisites

- Docker
- Node.js 18+
- npm

### Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build the application**
   ```bash
   npm run build
   ```

5. **Start the application**
   ```bash
   npm start
   ```

### Docker

1. **Build and run the Docker container**
   ```bash
   docker-compose up --build
   ```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: The URL for the Supabase instance.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous key for Supabase.

## Testing

- Testing setup is defined in the `tests/` directory.
- Use Jest and React Testing Library for testing.

## Contributing

Please follow the coding guidelines and ensure all tests pass before submitting a pull request.

## License

This project is licensed under the MIT License.
