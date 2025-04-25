export interface SalaryParams {
    basic: number;
    hra: number;
    allowances: number;
    otherDeduct: number;
    fullDays: number;
    halfDays: number;
    workingDays: number;
  }
  
  const slabs = [
    { upTo: 250000, rate: 0 },
    { upTo: 500000, rate: 0.05 },
    { upTo: 1000000, rate: 0.2 },
    { upTo: Infinity, rate: 0.3 },
  ];
  
  export function calculateSalary(p: SalaryParams) {
    const gross = p.basic + p.hra + p.allowances;
    const dailyWage = gross / p.workingDays;
    const totalSalary = (p.fullDays * dailyWage) + (p.halfDays * (dailyWage / 2));
  
    let taxable = totalSalary;
    let tax = 0;
    for (const slab of slabs) {
      const slabAmount = Math.min(taxable, slab.upTo);
      tax += slabAmount * slab.rate;
      taxable -= slabAmount;
      if (taxable <= 0) break;
    }
  
    const pf = 0.12 * p.basic;
    const net = totalSalary - tax - pf - p.otherDeduct;
  
    return { gross, tax, pf, totalSalary, net };
  }
  