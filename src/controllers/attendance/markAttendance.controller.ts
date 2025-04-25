import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { AuthRequest } from '../../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const markAttendanceController = async (req: AuthRequest, res: Response) => {
  const { clockIn, clockOut } = req.body;
  const userId = req.user!.id;

  const user = await prisma.user.findUnique({ where: { id: userId }, include: { employee: true } });
  if (!user || !user.employee) return res.sendStatus(403);

  const date = dayjs(clockIn).startOf('day').toDate();
  const hoursWorked = dayjs(clockOut).diff(dayjs(clockIn), 'hour', true);

  await prisma.attendance.upsert({
    where: { employeeId_date: { employeeId: user.employee.id, date } },
    update: { clockIn, clockOut, hoursWorked },
    create: { employeeId: user.employee.id, date, clockIn, clockOut, hoursWorked },
  });

  res.sendStatus(201);
};
