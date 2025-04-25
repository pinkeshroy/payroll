import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { Role } from '@prisma/client'; 

export interface AuthRequest extends Request {
  user?: { id: number; role: Role };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };

    const userRole = decoded.role as Role;

    req.user = {
      id: decoded.id,
      role: userRole
    };

    next();
  } catch {
    return res.sendStatus(401);
  }
};
