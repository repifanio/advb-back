import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';

const errors = (
  err: Error,
  req: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  });
};

export default errors;
