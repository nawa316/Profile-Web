import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';

// Validate blog creation
export const validateBlogCreation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, content } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    throw new AppError('Title is required and must be a non-empty string', 400);
  }

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    throw new AppError('Content is required and must be a non-empty string', 400);
  }

  if (title.length > 255) {
    throw new AppError('Title must not exceed 255 characters', 400);
  }

  next();
};

// Validate blog update
export const validateBlogUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, content, author } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      throw new AppError('Title must be a non-empty string', 400);
    }
    if (title.length > 255) {
      throw new AppError('Title must not exceed 255 characters', 400);
    }
  }

  if (content !== undefined) {
    if (typeof content !== 'string' || content.trim().length === 0) {
      throw new AppError('Content must be a non-empty string', 400);
    }
  }

  if (author !== undefined && author !== null) {
    if (typeof author !== 'string' || author.trim().length === 0) {
      throw new AppError('Author must be a non-empty string', 400);
    }
    if (author.length > 100) {
      throw new AppError('Author must not exceed 100 characters', 400);
    }
  }

  next();
};

// Validate portfolio creation
export const validatePortfolioCreation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    throw new AppError('Title is required and must be a non-empty string', 400);
  }

  if (title.length > 255) {
    throw new AppError('Title must not exceed 255 characters', 400);
  }

  next();
};

// Validate portfolio update
export const validatePortfolioUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, description, image_url, project_url } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      throw new AppError('Title must be a non-empty string', 400);
    }
    if (title.length > 255) {
      throw new AppError('Title must not exceed 255 characters', 400);
    }
  }

  if (image_url !== undefined && image_url !== null) {
    if (typeof image_url !== 'string') {
      throw new AppError('Image URL must be a string', 400);
    }
    if (image_url.length > 500) {
      throw new AppError('Image URL must not exceed 500 characters', 400);
    }
  }

  if (project_url !== undefined && project_url !== null) {
    if (typeof project_url !== 'string') {
      throw new AppError('Project URL must be a string', 400);
    }
    if (project_url.length > 500) {
      throw new AppError('Project URL must not exceed 500 characters', 400);
    }
  }

  next();
};

// Validate ID parameter
export const validateId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || id <= 0) {
    throw new AppError('Invalid ID parameter', 400);
  }

  next();
};
