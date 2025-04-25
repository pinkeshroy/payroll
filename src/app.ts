import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes";
import employeeRouter from "./routes/employee.routes";
import attendanceRouter from "./routes/attendance.routes";
import salaryRouter from "./routes/salary.routes";
import payrollRouter from "./routes/payroll.routes";

import { errorHandler } from "./middlewares/error.middleware";

export const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/employees", employeeRouter);
app.use("/attendance", attendanceRouter);
app.use("/salary", salaryRouter);
app.use("/payroll", payrollRouter);

app.use("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Payroll API is live!",
    endpoints: {
      auth: "/api/auth",
      employee: "/api/employees",
      salary: "/api/salary",
      payroll: "/api/payroll",
      attendance: "/api/attendance",
    },
    docs: "Refer to the README.md or API docs for more details.",
  });
});

app.use(errorHandler);
