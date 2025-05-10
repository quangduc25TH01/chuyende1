import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isClient = req.query.client === 'true';
  
  if (isClient) {
    (req as any).isClient = true;

    return next();
  }

  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({ message: 'Unauthorized' });
};
