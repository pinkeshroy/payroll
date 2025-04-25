import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEmployeeSalaryController = async (req: Request, res: Response) => {
  const { employeeId } = req.params;
  const { month } = req.query as { month: string };

  const salary = await prisma.salary.findUnique({
    where: { employeeId_month: { employeeId: Number(employeeId), month } }
  });

  if (!salary) return res.sendStatus(404);
  res.json(salary);
};
