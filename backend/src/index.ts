import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import pool from './config/database';
import blogRoutes from './routes/blogRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import experienceRoutes from './routes/experienceRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Profile Web API (TypeScript)',
    environment: process.env.NODE_ENV || 'development',
  });
});

// API info endpoint
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Profile Web API - TypeScript Edition',
    version: process.env.API_VERSION || 'v1',
    endpoints: {
      blogs: {
        list: 'GET /api/blogs',
        get: 'GET /api/blogs/:id',
        bySlug: 'GET /api/blogs/slug/:slug',
        byCategory: 'GET /api/blogs/category/:category',
        byTag: 'GET /api/blogs/tag/:tag',
        categories: 'GET /api/blogs/categories',
        tags: 'GET /api/blogs/tags',
        search: 'GET /api/blogs/search?q=term',
        create: 'POST /api/blogs',
        update: 'PUT /api/blogs/:id',
        delete: 'DELETE /api/blogs/:id',
      },
      portfolios: {
        list: 'GET /api/portfolios',
        get: 'GET /api/portfolios/:id',
        byCategory: 'GET /api/portfolios/category/:category',
        categories: 'GET /api/portfolios/categories',
        search: 'GET /api/portfolios/search?q=term',
        create: 'POST /api/portfolios',
        update: 'PUT /api/portfolios/:id',
        delete: 'DELETE /api/portfolios/:id',
      },
      experiences: {
        list: 'GET /api/experiences',
        get: 'GET /api/experiences/:id',
        byType: 'GET /api/experiences/type/:type',
        current: 'GET /api/experiences/current',
        search: 'GET /api/experiences/search?q=term',
        create: 'POST /api/experiences',
        update: 'PUT /api/experiences/:id',
        delete: 'DELETE /api/experiences/:id',
      },
    },
  });
});

// API Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/experiences', experienceRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Test database connection on startup
const startServer = async (): Promise<void> => {
  try {
    // Test database connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API Documentation: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (): Promise<void> => {
  console.log('\n🛑 SIGTERM signal received: closing HTTP server');
  
  try {
    await pool.end();
    console.log('✅ Database pool closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start the server
startServer();

export default app;
