# TypeScript Development Guidelines

## Language Features

- Must use TypeScript strict mode
- Must define types for all function parameters and return values
- Must use `interface` for public API definitions
- Must use `type` for complex type operations

## Naming Conventions

- Use PascalCase for React components and TypeScript interfaces
- Use camelCase for variables, functions, and methods
- Use UPPER_SNAKE_CASE for constants
- Prefix boolean variables with is/has/should (e.g., `isLoading`, `hasError`)

## Error Handling

- Must use try/catch blocks for async operations
- Must create custom error classes for different error types
- Must include meaningful error messages
- Must log errors appropriately

## Async/Await

- Must use async/await instead of promise chains
- Must handle promise rejections
- Must use Promise.all for parallel operations when possible

## Code Organization

- Keep files under 300 lines
- Export only one component per file
- Group related functionality in the same directory
- Keep test files next to the code they test
