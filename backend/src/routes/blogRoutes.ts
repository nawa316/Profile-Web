import { Router } from 'express';
import { BlogController } from '../controllers/blogController';

const router = Router();

// GET /api/blogs - Get all blogs
router.get('/', BlogController.getAllBlogs);

// GET /api/blogs/search?q=searchTerm - Search blogs
router.get('/search', BlogController.searchBlogs);

// GET /api/blogs/categories - Get all categories
router.get('/categories', BlogController.getCategories);

// GET /api/blogs/tags - Get all tags
router.get('/tags', BlogController.getTags);

// GET /api/blogs/category/:category - Get blogs by category
router.get('/category/:category', BlogController.getBlogsByCategory);

// GET /api/blogs/tag/:tag - Get blogs by tag
router.get('/tag/:tag', BlogController.getBlogsByTag);

// GET /api/blogs/slug/:slug - Get blog by slug
router.get('/slug/:slug', BlogController.getBlogBySlug);

// GET /api/blogs/:id - Get blog by ID
router.get('/:id', BlogController.getBlogById);

// POST /api/blogs - Create new blog
router.post('/', BlogController.createBlog);

// PUT /api/blogs/:id - Update blog
router.put('/:id', BlogController.updateBlog);

// DELETE /api/blogs/:id - Delete blog
router.delete('/:id', BlogController.deleteBlog);

export default router;
