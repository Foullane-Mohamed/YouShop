# Copilot Instructions for YouShop

## Project Overview

YouShop is a microservices-based e-commerce platform built with NestJS and TypeScript. The project demonstrates microservices architecture patterns with separate services for authentication, catalog management, order processing, and inventory management, all coordinated through an API Gateway.

## Architecture

This is a microservices architecture with the following services:

1. **API Gateway** (Port 3000) - Entry point for all client requests, routes to appropriate services
2. **Auth Service** (Port 3001) - Handles user authentication and JWT token management
3. **Catalog Service** (Port 3002) - Manages product catalog
4. **Order Service** (Port 3003) - Processes and manages orders
5. **Inventory Service** (Port 3004) - Manages product inventory

### Inter-Service Communication
- Services communicate via HTTP REST APIs
- API Gateway routes requests to backend services
- Order Service communicates with Inventory Service for stock management

## Technology Stack

- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma 5.x
- **Authentication**: JWT with Passport
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose
- **Validation**: class-validator & class-transformer

## Directory Structure

```
/
├── api-gateway/          # API Gateway service
├── auth-service/         # Authentication service
├── catalog-service/      # Product catalog service
├── order-service/        # Order management service
├── inventory-service/    # Inventory management service
├── docker-compose.yml    # Docker orchestration
├── init-databases.sql    # Database initialization
├── package.json          # Root package.json with helper scripts
└── .env.example          # Environment variable template
```

Each service follows this structure:
```
service-name/
├── src/                  # Source code
│   ├── main.ts          # Entry point
│   ├── app.module.ts    # Root module
│   ├── *.controller.ts  # Controllers
│   ├── *.service.ts     # Business logic
│   ├── *.dto.ts         # Data transfer objects
│   └── prisma.service.ts # Prisma client wrapper
├── prisma/
│   └── schema.prisma    # Database schema
├── Dockerfile           # Container definition
├── nest-cli.json        # NestJS CLI configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Development Workflow

### Setup
```bash
# Install all dependencies
npm run install:all

# Start PostgreSQL and all services with Docker
npm run docker:up

# Generate Prisma clients
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Stop all services
npm run docker:down
```

### Working on Individual Services
```bash
# Navigate to service directory
cd <service-name>

# Install dependencies
npm install

# Run in development mode
npm run start:dev

# Build the service
npm run build

# Run in production mode
npm run start:prod
```

### Database Management
- Each service has its own PostgreSQL database
- Prisma is used for database migrations and queries
- Schema files are located at `<service>/prisma/schema.prisma`
- Run migrations: `cd <service> && npx prisma migrate dev`
- Generate Prisma client: `cd <service> && npx prisma generate`

## Coding Conventions

### TypeScript & NestJS Best Practices
- Use TypeScript strict mode
- Follow NestJS module/controller/service pattern
- Use dependency injection for services
- Apply decorators for routes, validation, and guards
- Use DTOs for request/response validation with class-validator

### Naming Conventions
- **Files**: kebab-case (e.g., `auth.service.ts`, `user.controller.ts`)
- **Classes**: PascalCase (e.g., `AuthService`, `UserController`)
- **Interfaces**: PascalCase with 'I' prefix optional (e.g., `User` or `IUser`)
- **Variables/Functions**: camelCase (e.g., `getUserById`, `isAuthenticated`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `JWT_SECRET`, `PORT`)

### Code Organization
- Keep controllers thin - delegate business logic to services
- Use DTOs for all request/response validation
- Implement proper error handling with NestJS exceptions
- Use Prisma service wrapper for database operations
- Apply guards for authentication and authorization

### Database & Prisma
- Define models in Prisma schema using proper types
- Use UUIDs for primary keys: `@id @default(uuid())`
- Add `@@map()` for custom table names
- Include `createdAt` and `updatedAt` timestamps
- Hash passwords with bcrypt before storing

### API Design
- Use RESTful conventions for endpoints
- Apply proper HTTP status codes
- Document endpoints with Swagger decorators
- Validate all inputs using class-validator
- Return consistent response structures

### Environment Variables
- Never commit `.env` files
- Use `.env.example` as template
- Access via `process.env` in NestJS modules
- Required variables:
  - `DATABASE_URL`: PostgreSQL connection string
  - `PORT`: Service port number
  - `JWT_SECRET`: Authentication secret (auth-service & api-gateway)
  - Service URLs for inter-service communication

## Docker & Deployment

### Docker Compose Services
- All services are containerized
- PostgreSQL runs as a shared container
- Services depend on PostgreSQL being ready
- Environment variables are passed through docker-compose.yml

### Building & Running
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f <service-name>

# Rebuild specific service
docker-compose up -d --build <service-name>

# Stop all services
docker-compose down

# Remove volumes (caution: deletes data)
docker-compose down -v
```

## Testing

- Each service should include unit tests for services
- Use NestJS testing utilities
- Test controllers with mock services
- Integration tests should verify database operations
- Test API endpoints with supertest

## Security Considerations

- Passwords must be hashed with bcrypt
- JWT tokens for authentication
- Validate all user inputs
- Use environment variables for secrets
- Implement proper CORS configuration
- Apply role-based access control where needed
- Sanitize database queries (Prisma helps prevent SQL injection)

## Common Patterns

### Creating a New Endpoint
1. Define DTO with validation decorators
2. Add controller method with route decorator
3. Implement service logic
4. Add Swagger documentation
5. Handle errors appropriately

### Adding a New Database Model
1. Define model in `prisma/schema.prisma`
2. Run `npx prisma migrate dev` to create migration
3. Run `npx prisma generate` to update client
4. Update service to use new model

### Inter-Service Communication
- Use HTTP client (axios or @nestjs/axios)
- Configure service URLs via environment variables
- Handle connection errors gracefully
- Consider implementing retry logic for resilience

## Git Workflow

- Use meaningful commit messages
- Keep commits focused and atomic
- Follow conventional commits format preferred
- Branch naming: `feature/`, `bugfix/`, `hotfix/` prefixes

## Notes for Copilot

- This is a learning project for microservices architecture
- Prioritize code clarity and best practices over optimization
- Include comments for complex business logic
- Ensure consistency across all services
- Test changes thoroughly before committing
- Update this documentation when adding new patterns or services
