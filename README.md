# YouShop - Microservices E-Commerce Platform

A learning project demonstrating microservices architecture using NestJS, TypeScript, PostgreSQL, and Docker.

## 🏗️ Architecture

YouShop is built using a microservices architecture with the following services:

- **API Gateway** (Port 3000) - Routes all client requests to appropriate services
- **Auth Service** (Port 3001) - User authentication and JWT management
- **Catalog Service** (Port 3002) - Product catalog management
- **Order Service** (Port 3003) - Order processing and management
- **Inventory Service** (Port 3004) - Product inventory tracking

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Foullane-Mohamed/YouShop.git
cd YouShop
```

2. Install dependencies for all services:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
# Copy .env.example to .env in each service directory
cp .env.example auth-service/.env
cp .env.example catalog-service/.env
cp .env.example order-service/.env
cp .env.example inventory-service/.env
cp .env.example api-gateway/.env
```

4. Start all services with Docker:
```bash
npm run docker:up
```

5. Generate Prisma clients:
```bash
npm run prisma:generate
```

6. Run database migrations:
```bash
npm run prisma:migrate
```

## 📋 Available Scripts

### Root Level Scripts

- `npm run install:all` - Install dependencies for all services
- `npm run docker:up` - Start all services with Docker Compose
- `npm run docker:down` - Stop all Docker services
- `npm run prisma:generate` - Generate Prisma clients for all services
- `npm run prisma:migrate` - Run migrations for all services

### Service Level Scripts

Navigate to any service directory and run:

- `npm run start:dev` - Start service in development mode with hot reload
- `npm run build` - Build the service
- `npm run start:prod` - Start service in production mode

## 🛠️ Technology Stack

- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma 5.x
- **Authentication**: JWT with Passport
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose
- **Validation**: class-validator & class-transformer

## 📁 Project Structure

```
YouShop/
├── api-gateway/          # API Gateway service
├── auth-service/         # Authentication service
├── catalog-service/      # Product catalog service
├── order-service/        # Order management service
├── inventory-service/    # Inventory management service
├── docker-compose.yml    # Docker orchestration
├── init-databases.sql    # Database initialization
├── package.json          # Root package with helper scripts
└── .env.example          # Environment variables template
```

## 🔐 Environment Variables

Each service requires its own `.env` file. See `.env.example` for the complete list of required variables.

Key environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens (auth-service and api-gateway)
- `PORT` - Service port number
- Service URLs for inter-service communication

## 🐳 Docker

All services are containerized and can be run together using Docker Compose:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart a specific service
docker-compose up -d --build auth-service
```

## 🧪 Testing

Each service includes its own test suite. Navigate to a service directory and run:

```bash
npm test
```

## 🤖 GitHub Copilot Agent

This repository is configured for GitHub Copilot coding agent. The agent instructions are located at `.github/copilot-instructions.md` and include:

- Project architecture and structure
- Coding conventions and best practices
- Development workflow
- Technology stack details
- Common patterns and examples

When working with Copilot on this repository, refer to these instructions for consistent code generation and assistance.

## 📚 API Documentation

Once the services are running, you can access the Swagger API documentation at:

- API Gateway: http://localhost:3000/api
- Auth Service: http://localhost:3001/api
- Catalog Service: http://localhost:3002/api
- Order Service: http://localhost:3003/api
- Inventory Service: http://localhost:3004/api

## 🤝 Contributing

This is a learning project. Feel free to fork, experiment, and learn!

## 📝 License

This project is licensed under the MIT License.

## 🎯 Learning Goals

This project demonstrates:
- Microservices architecture patterns
- Service-to-service communication
- API Gateway pattern
- Database per service pattern
- Docker containerization
- NestJS best practices
- TypeScript in production
- JWT authentication
- RESTful API design
- Prisma ORM usage
