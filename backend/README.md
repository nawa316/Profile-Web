# TypeScript Backend - Profile Web API

Backend API dengan Express.js dan TypeScript untuk CRUD Blog dan Portfolio.

## 🏗️ Struktur Proyek

```
backend/
├── src/
│   ├── index.ts              # Entry point aplikasi
│   ├── config/
│   │   └── database.ts       # Konfigurasi PostgreSQL
│   ├── types/
│   │   ├── index.ts          # Common types
│   │   └── models.ts         # Model types
│   ├── models/
│   │   ├── Blog.ts           # Blog model
│   │   └── Portfolio.ts      # Portfolio model
│   ├── controllers/
│   │   ├── blogController.ts
│   │   └── portfolioController.ts
│   ├── routes/
│   │   ├── blogRoutes.ts
│   │   └── portfolioRoutes.ts
│   └── middleware/
│       ├── errorHandler.ts
│       └── validation.ts
├── dist/                     # Compiled JavaScript
├── tsconfig.json
└── package.json
```

## 🚀 Quick Start

### Development (Local)

```bash
# Install dependencies
npm install

# Run in development mode (with hot reload)
npm run dev

# Type check
npm run typecheck

# Build
npm run build

# Run production build
npm start
```

### Development (Docker)

```bash
# Dari root project
docker-compose -f docker-compose.dev.yml up backend
```

## 📋 Available Scripts

- `npm run dev` - Development dengan ts-node-dev (hot reload)
- `npm run build` - Compile TypeScript ke JavaScript
- `npm start` - Run production build
- `npm run typecheck` - Check TypeScript errors tanpa compile
- `npm run clean` - Hapus folder dist

## 🔌 API Endpoints

### Blogs

| Method | Endpoint                   | Description     |
| ------ | -------------------------- | --------------- |
| GET    | `/api/blogs`               | Get all blogs   |
| GET    | `/api/blogs/:id`           | Get blog by ID  |
| GET    | `/api/blogs/search?q=term` | Search blogs    |
| POST   | `/api/blogs`               | Create new blog |
| PUT    | `/api/blogs/:id`           | Update blog     |
| DELETE | `/api/blogs/:id`           | Delete blog     |

### Portfolios

| Method | Endpoint                        | Description         |
| ------ | ------------------------------- | ------------------- |
| GET    | `/api/portfolios`               | Get all portfolios  |
| GET    | `/api/portfolios/:id`           | Get portfolio by ID |
| GET    | `/api/portfolios/search?q=term` | Search portfolios   |
| POST   | `/api/portfolios`               | Create portfolio    |
| PUT    | `/api/portfolios/:id`           | Update portfolio    |
| DELETE | `/api/portfolios/:id`           | Delete portfolio    |

### System

| Method | Endpoint  | Description       |
| ------ | --------- | ----------------- |
| GET    | `/health` | Health check      |
| GET    | `/api`    | API documentation |

## 📝 Example Requests

### Create Blog

```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog",
    "content": "This is the content of my blog post.",
    "author": "John Doe"
  }'
```

### Update Blog

```bash
curl -X PUT http://localhost:5000/api/blogs/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content"
  }'
```

### Create Portfolio

```bash
curl -X POST http://localhost:5000/api/portfolios \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Portfolio Project",
    "description": "A cool project I built",
    "image_url": "https://example.com/image.jpg",
    "project_url": "https://github.com/username/project"
  }'
```

## 🎯 TypeScript Features

- **Strict Type Checking**: Full type safety dengan strict mode
- **Type Definitions**: Interface untuk semua models dan API responses
- **Error Handling**: Custom error class dengan proper typing
- **Async/Await**: Modern async patterns dengan proper error handling
- **Models**: Class-based models dengan static methods
- **Controllers**: Typed request/response handlers
- **Validation**: Input validation dengan type guards

## 🔧 Environment Variables

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=profile_web_db
DB_USER=postgres
DB_PASSWORD=postgres
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your-secret-key
API_VERSION=v1
```

## 📦 Dependencies

### Production

- `express` - Web framework
- `pg` - PostgreSQL client
- `cors` - CORS middleware
- `helmet` - Security headers
- `morgan` - HTTP logger
- `dotenv` - Environment variables

### Development

- `typescript` - TypeScript compiler
- `ts-node-dev` - Development server dengan hot reload
- `@types/*` - Type definitions untuk dependencies

## 🏭 Production Build

```bash
# Build TypeScript
npm run build

# Run production
NODE_ENV=production npm start
```

## 🐳 Docker

Dockerfile menggunakan multi-stage build:

1. **Builder stage**: Compile TypeScript
2. **Production stage**: Hanya compiled JS + production dependencies

## 🔍 Type Safety Examples

```typescript
// Model dengan proper typing
const blog = await BlogModel.findById(1);
// blog memiliki type Blog | null

// Controller dengan typed request/response
static async createBlog(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  // TypeScript akan catch error jika ada typo atau wrong type
}

// Custom error dengan status code
throw new AppError('Blog not found', 404);
```

## 📊 Error Responses

Semua error dikembalikan dalam format konsisten:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Success responses:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

## 🎓 Best Practices

- ✅ Separation of Concerns (MVC pattern)
- ✅ Type safety dengan TypeScript
- ✅ Centralized error handling
- ✅ Input validation
- ✅ Async/await untuk database operations
- ✅ Connection pooling untuk PostgreSQL
- ✅ Graceful shutdown
- ✅ Health checks
- ✅ Environment-based configuration

## 🚧 Future Improvements

- [ ] Add authentication (JWT)
- [ ] Add pagination
- [ ] Add unit tests
- [ ] Add API rate limiting
- [ ] Add request logging
- [ ] Add Swagger/OpenAPI documentation
- [ ] Add database migrations
- [ ] Add data seeding
