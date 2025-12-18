# Security Requirements

## Authentication & Authorization

- Must use Supabase Auth for all authentication
- Must implement proper session management
- Must validate user permissions for all sensitive operations

## Data Protection

- Must encrypt sensitive data at rest
- Must use HTTPS for all API calls
- Must implement rate limiting on authentication endpoints

## Input Validation

- Must validate all user inputs on both client and server
- Must use parameterized queries to prevent SQL injection
- Must sanitize all user-generated content

## Secrets Management

- Must store secrets in environment variables
- Must never commit .env files
- Must use different secrets for development and production

## Logging & Monitoring

- Must log all security-relevant events
- Must not log sensitive information
- Must implement proper log rotation and retention
