import { Request, Response } from 'express';
import { PrismaClient, Employee, Attendance, Salary } from '@prisma/client';
import dayjs from 'dayjs';
import { calculateSalary } from '../../services/salary.service';

const prisma = new PrismaClient();

export const calculateSalaryController = async (req: Request, res: Response): Promise<void> => {
  const { month } = req.body as { month: string }; 
  
  const start: Date = dayjs(month).startOf('month').toDate();
  const end: Date = dayjs(month).endOf('month').toDate();
  const workingDays: number = dayjs(end).diff(start, 'day') + 1;

  const employees: Employee[] = await prisma.employee.findMany();
  const salaries: Salary[] = []; 

  for (const emp of employees) {
    const attendance: Attendance[] = await prisma.attendance.findMany({
      where: { employeeId: emp.id, date: { gte: start, lte: end } }
    });

    const fullDays: number = attendance.filter((a: Attendance) => 
        a.hoursWorked.greaterThanOrEqualTo(8)
      ).length;
      
      const halfDays: number = attendance.filter((a: Attendance) => 
        a.hoursWorked.greaterThan(0) && a.hoursWorked.lessThan(8)
      ).length;

    const calc = calculateSalary({
      basic: Number(emp.basicSalary),
      hra: Number(emp.hra),
      allowances: Number(emp.allowances),
      otherDeduct: Number(emp.otherDeduct),
      fullDays,
      halfDays,
      workingDays
    });

    const salary: Salary = await prisma.salary.upsert({
      where: { employeeId_month: { employeeId: emp.id, month } },
      update: { ...calc, fullDays, halfDays, totalDays: workingDays },
      create: { employeeId: emp.id, month, ...calc, fullDays, halfDays, totalDays: workingDays }
    });

    salaries.push(salary);
  }

  res.json(salaries);
};
