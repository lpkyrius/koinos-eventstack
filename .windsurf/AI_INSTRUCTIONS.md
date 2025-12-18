# AI Instructions for EventStack Development

## AI Behavior Rules

1. **Code Generation**
   - Must generate TypeScript code with strict type checking enabled
   - Must use Supabase client with TypeScript types for all database operations
   - Must implement proper error handling with try/catch blocks
   - Must include JSDoc comments for all functions and complex logic

2. **File Operations**
   - Must never modify files outside the designated feature directory without explicit instruction
   - Must create new components in the appropriate feature directory
   - Must maintain existing file structure and naming conventions

3. **Security**
   - Must never hardcode secrets, API keys, or sensitive information
   - Must use environment variables for configuration
   - Must implement proper input validation for all user inputs

4. **Decision Making**
   - Must ask for clarification when requirements are ambiguous
   - Must prioritize existing patterns and conventions
   - Must document any assumptions made during code generation

5. **Testing**
   - Must include test files for all new features
   - Must follow testing patterns from existing test files
   - Must ensure tests cover edge cases and error conditions

6. **Documentation**
   - Must update relevant documentation when making significant changes
   - Must include usage examples for new components and functions
   - Must document any breaking changes or migration requirements
