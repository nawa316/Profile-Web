import { Request, Response, NextFunction } from 'express';
import { PortfolioModel } from '../models/Portfolio';
import { CreatePortfolioInput, UpdatePortfolioInput } from '../types/models';
import { ApiResponse, AppError } from '../types';

export class PortfolioController {
  // Get all portfolios
  static async getAllPortfolios(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const portfolios = await PortfolioModel.findAll();
      
      const response: ApiResponse = {
        success: true,
        data: portfolios,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get portfolio by ID
  static async getPortfolioById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        throw new AppError('Invalid portfolio ID', 400);
      }
      
      const portfolio = await PortfolioModel.findById(id);
      
      if (!portfolio) {
        throw new AppError('Portfolio not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        data: portfolio,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Create new portfolio
  static async createPortfolio(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const input: CreatePortfolioInput = req.body;
      
      // Validation
      if (!input.title) {
        throw new AppError('Title is required', 400);
      }
      
      const portfolio = await PortfolioModel.create(input);
      
      const response: ApiResponse = {
        success: true,
        data: portfolio,
        message: 'Portfolio created successfully',
      };
      
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  // Update portfolio
  static async updatePortfolio(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        throw new AppError('Invalid portfolio ID', 400);
      }
      
      const input: UpdatePortfolioInput = req.body;
      
      // Check if there's anything to update
      if (!input.title && !input.description && !input.image_url && !input.project_url) {
        throw new AppError('No fields to update', 400);
      }
      
      const portfolio = await PortfolioModel.update(id, input);
      
      if (!portfolio) {
        throw new AppError('Portfolio not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        data: portfolio,
        message: 'Portfolio updated successfully',
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Delete portfolio
  static async deletePortfolio(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        throw new AppError('Invalid portfolio ID', 400);
      }
      
      const deleted = await PortfolioModel.delete(id);
      
      if (!deleted) {
        throw new AppError('Portfolio not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        message: 'Portfolio deleted successfully',
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get portfolios by category
  static async getPortfoliosByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { category } = req.params;
      
      const portfolios = await PortfolioModel.findByCategory(category);
      
      const response: ApiResponse = {
        success: true,
        data: portfolios,
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
      const categories = await PortfolioModel.getCategories();
      
      const response: ApiResponse = {
        success: true,
        data: categories,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Search portfolios
  static async searchPortfolios(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const searchTerm = req.query.q as string;
      
      if (!searchTerm) {
        throw new AppError('Search query is required', 400);
      }
      
      const portfolios = await PortfolioModel.search(searchTerm);
      
      const response: ApiResponse = {
        success: true,
        data: portfolios,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
