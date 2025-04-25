import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPayrollHistoryController = async (req: Request, res: Response) => {
  const { month } = req.query as { month: string };

  const payroll = await prisma.payroll.findUnique({ where: { month } });

  if (!payroll) return res.sendStatus(404);
  res.json(payroll);
};
