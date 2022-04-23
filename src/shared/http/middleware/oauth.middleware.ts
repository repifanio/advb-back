/* eslint-disable max-len */
import { AppError } from '@/shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError('Token not found', 401);

  const [, token] = authHeader.split(' ');

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) throw new AppError('Fail on auth', 403);
    req.user = {
      userId: user.id,
    };

    return next();
  });
};
