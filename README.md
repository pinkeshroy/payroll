# Payroll Management System - Backend

A complete payroll backend built with Node.js, TypeScript, Express.js, PostgreSQL, and Prisma ORM.

---

## 🏛️ High-Level Architecture

- Authentication System (JWT, HTTP-only cookies)
- Employee Management
- Attendance Tracking (Clock In/Clock Out)
- Salary Calculation (based on attendance, tax, PF, deductions)
- Payroll Distribution and History

---

## ⚙️ Tech Stack
```
| Layer             | Technology                |
|-------------------|----------------------------|
| Server            | Node.js (TypeScript)       |
| Framework         | Express.js                 |
| ORM               | Prisma ORM                 |
| Database          | PostgreSQL (Render Hosted) |
| Authentication    | JWT (Cookies)              |
| Password Security | bcrypt                     |
| Environment Vars  | dotenv                     |
```
---

## 📂 Folder Structure

```
/payroll-app
├── prisma/
│   ├── schema.prisma   # Database schema
│   ├── seed.ts         # Seed admin user
├── src/
│   ├── config/         # Configurations
│   ├── controllers/    # Controllers (One API one controller)
│   ├── middlewares/    # Middlewares (Auth, Role, Error Handling)
│   ├── routes/         # API Routes
│   ├── services/       # Salary calculation logic
│   ├── types/          # Express TypeScript extensions
│   ├── app.ts          # Main Express App
│   └── index.ts        # Server entry
├── .env                # Environment Variables
├── package.json        # NPM Dependencies
├── tsconfig.json       # TypeScript Config
└── README.md           # Project Documentation
```

---

## 🔥 API Endpoints

### 🔐 Authentication APIs

| Method | Endpoint      | Description             | Access       |
|--------|----------------|-------------------------|--------------|
| POST   | /auth/login    | Login and get cookie     | Public       |
| POST   | /auth/logout   | Clear auth cookie        | Public       |

---

### 👤 Employee Management APIs

| Method | Endpoint          | Description               | Access       |
|--------|--------------------|----------------------------|--------------|
| POST   | /employees          | Create employee            | Admin/HR     |
| GET    | /employees/:id      | View employee by ID         | Admin/HR/Employee (self) |

---

### 📅 Attendance APIs

| Method | Endpoint         | Description          | Access     |
|--------|------------------|----------------------|------------|
| POST   | /attendance/mark  | Mark attendance       | Employee   |

---

### 💵 Salary APIs

| Method | Endpoint            | Description                       | Access     |
|--------|----------------------|-----------------------------------|------------|
| POST   | /salary/calculate     | Calculate salaries for month     | Admin/HR   |
| GET    | /salary/:employeeId?month=YYYY-MM | View salary slip | Admin/HR/Employee |

---

### 💸 Payroll APIs

| Method | Endpoint            | Description               | Access     |
|--------|---------------------|---------------------------|------------|
| POST   | /payroll/distribute  | Distribute salaries       | Admin/HR   |
| GET    | /payroll/history?month=YYYY-MM | View payroll history | Admin/HR   |

---

## 🧮 Salary Calculation Logic

1. Gross Salary = Basic Salary + HRA + Allowances
2. Tax Deduction = Based on tax slabs
3. PF Deduction = 12% of Basic Salary
4. Daily Wage = Gross Salary / Working Days
5. Full Day Salary = Daily Wage
6. Half Day Salary = Daily Wage / 2
7. Total Salary = (Full Days × Full Day Salary) + (Half Days × Half Day Salary)
8. Net Salary = Total Salary - Tax - PF - Other Deductions

---

## 📋 Setup Instructions

### 1. Install Dependencies

```
npm install
```

### 2. Setup Environment Variables

```
DATABASE_URL="your-database-url?sslmode=require"
JWT_SECRET="your-jwt-secret"
```

### 3. Prisma Database Migration

```
npx prisma generate
npx prisma db push
npm run seed
```

### 4. Start Development Server

```
npm run dev
```

Server running at: http://localhost:4000

---
