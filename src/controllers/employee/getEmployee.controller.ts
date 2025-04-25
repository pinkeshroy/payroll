import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const getEmployeeController = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const user = req.user!;

  // HR/Admin can view any employee, Employee can view self only
  if (user.role === 'EMPLOYEE' && String(user.id) !== id) {
    return res.sendStatus(403);
  }

  const employee = await prisma.employee.findUnique({ where: { id: Number(id) } });

  if (!employee) return res.sendStatus(404);
  
  res.json(employee);
};
