import { Request, Response, NextFunction } from 'express';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Custom Error Type
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Express async handler type
export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

// Database query result
export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
}

// Pagination params
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Sort params
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}
