import { Request, Response, NextFunction } from 'express';
import { BlogModel } from '../models/Blog';
import { CreateBlogInput, UpdateBlogInput } from '../types/models';
import { ApiResponse, AppError } from '../types';

export class BlogController {
  // Get all blogs
  static async getAllBlogs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const blogs = await BlogModel.findAll();
      
      const response: ApiResponse = {
        success: true,
        data: blogs,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get blog by ID
  static async getBlogById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        throw new AppError('Invalid blog ID', 400);
      }
      
      const blog = await BlogModel.findById(id);
      
      if (!blog) {
        throw new AppError('Blog not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        data: blog,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Create new blog
  static async createBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const input: CreateBlogInput = req.body;
      
      // Validation
      if (!input.title || !input.content) {
        throw new AppError('Title and content are required', 400);
      }
      
      const blog = await BlogModel.create(input);
      
      const response: ApiResponse = {
        success: true,
        data: blog,
        message: 'Blog created successfully',
      };
      
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  // Update blog
  static async updateBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        throw new AppError('Invalid blog ID', 400);
      }
      
      const input: UpdateBlogInput = req.body;
      
      // Check if there's anything to update
      if (!input.title && !input.content && !input.author) {
        throw new AppError('No fields to update', 400);
      }
      
      const blog = await BlogModel.update(id, input);
      
      if (!blog) {
        throw new AppError('Blog not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        data: blog,
        message: 'Blog updated successfully',
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Delete blog
  static async deleteBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        throw new AppError('Invalid blog ID', 400);
      }
      
      const deleted = await BlogModel.delete(id);
      
      if (!deleted) {
        throw new AppError('Blog not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        message: 'Blog deleted successfully',
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get blog by slug
  static async getBlogBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { slug } = req.params;
      
      const blog = await BlogModel.findBySlug(slug);
      
      if (!blog) {
        throw new AppError('Blog not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        data: blog,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get blogs by category
  static async getBlogsByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { category } = req.params;
      
      const blogs = await BlogModel.findByCategory(category);
      
      const response: ApiResponse = {
        success: true,
        data: blogs,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get blogs by tag
  static async getBlogsByTag(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { tag } = req.params;
      
      const blogs = await BlogModel.findByTag(tag);
      
      const response: ApiResponse = {
        success: true,
        data: blogs,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get all categories
  static async getCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const categories = await BlogModel.getCategories();
      
      const response: ApiResponse = {
        success: true,
        data: categories,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get all tags
  static async getTags(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const tags = await BlogModel.getTags();
      
      const response: ApiResponse = {
        success: true,
        data: tags,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Search blogs
  static async searchBlogs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const searchTerm = req.query.q as string;
      
      if (!searchTerm) {
        throw new AppError('Search query is required', 400);
      }
      
      const blogs = await BlogModel.search(searchTerm);
      
      const response: ApiResponse = {
        success: true,
        data: blogs,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
