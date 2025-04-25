import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEmployeeController = async (req: Request, res: Response) => {
  const { firstName, lastName, basicSalary, hra, allowances, otherDeduct } = req.body;

  const employee = await prisma.employee.create({
    data: {
      firstName,
      lastName,
      basicSalary,
      hra,
      allowances,
      otherDeduct: otherDeduct || 0
    }
  });

  res.status(201).json(employee);
};
