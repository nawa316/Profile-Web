import { Request, Response, NextFunction } from 'express';
import { ExperienceModel } from '../models/Experience';
import { CreateExperienceInput, UpdateExperienceInput } from '../types/models';
import { ApiResponse, AppError } from '../types';

export class ExperienceController {
  // Get all experiences
  static async getAllExperiences(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const experiences = await ExperienceModel.findAll();
      
      const response: ApiResponse = {
        success: true,
        data: experiences,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get experience by ID
  static async getExperienceById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        throw new AppError('Invalid experience ID', 400);
      }
      
      const experience = await ExperienceModel.findById(id);
      
      if (!experience) {
        throw new AppError('Experience not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        data: experience,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get experiences by type
  static async getExperiencesByType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { type } = req.params;
      
      if (!['organization', 'work', 'volunteer'].includes(type)) {
        throw new AppError('Invalid type. Must be: organization, work, or volunteer', 400);
      }
      
      const experiences = await ExperienceModel.findByType(type as 'organization' | 'work' | 'volunteer');
      
      const response: ApiResponse = {
        success: true,
        data: experiences,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Get current/ongoing experiences
  static async getCurrentExperiences(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const experiences = await ExperienceModel.findCurrent();
      
      const response: ApiResponse = {
        success: true,
        data: experiences,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Create new experience
  static async createExperience(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const input: CreateExperienceInput = req.body;
      
      // Validation
      if (!input.organization || !input.role || !input.description || !input.start_date || !input.type) {
        throw new AppError('Organization, role, description, start_date, and type are required', 400);
      }
      
      const experience = await ExperienceModel.create(input);
      
      const response: ApiResponse = {
        success: true,
        data: experience,
        message: 'Experience created successfully',
      };
      
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  // Update experience
  static async updateExperience(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        throw new AppError('Invalid experience ID', 400);
      }
      
      const input: UpdateExperienceInput = req.body;
      
      const experience = await ExperienceModel.update(id, input);
      
      if (!experience) {
        throw new AppError('Experience not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        data: experience,
        message: 'Experience updated successfully',
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Delete experience
  static async deleteExperience(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        throw new AppError('Invalid experience ID', 400);
      }
      
      const deleted = await ExperienceModel.delete(id);
      
      if (!deleted) {
        throw new AppError('Experience not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        message: 'Experience deleted successfully',
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  // Search experiences
  static async searchExperiences(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const searchTerm = req.query.q as string;
      
      if (!searchTerm) {
        throw new AppError('Search query is required', 400);
      }
      
      const experiences = await ExperienceModel.search(searchTerm);
      
      const response: ApiResponse = {
        success: true,
        data: experiences,
      };
      
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
