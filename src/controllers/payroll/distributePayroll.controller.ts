import { Request, Response } from 'express';
import { PrismaClient, Salary } from '@prisma/client';

const prisma = new PrismaClient();

export const distributePayrollController = async (req: Request, res: Response) => {
  const { month } = req.body;

  const salaries: Salary[] = await prisma.salary.findMany({ where: { month } });

  const totalAmount = salaries.reduce((acc: number, sal: Salary) => acc + Number(sal.net), 0);

  const payroll = await prisma.payroll.upsert({
    where: { month },
    update: { amount: totalAmount },
    create: { month, amount: totalAmount }
  });

  res.json(payroll);
};
