# Payroll Management System - Backend

[![GitHub Repo](https://img.shields.io/badge/Repo-Link-blue?logo=github)](https://github.com/your-username/payroll-app)

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

## 📋 Setup Instructions (Local Development)

Follow these steps to setup the Payroll Management backend locally:

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/payroll-app.git
cd payroll-app
```

> Replace `your-username` with your real GitHub username.

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file at the project root:

```env
DATABASE_URL="postgresql://your_local_user@localhost:5432/payroll"
JWT_SECRET="your_jwt_secret_here"
```

- **DATABASE_URL:** 
  - If using local Postgres, make sure database `payroll` exists.
  - Use the correct Postgres user that has access.
- **JWT_SECRET:**
  - Set any secret key for signing JWT tokens.

---

### 4. Setup the Database

First, generate the Prisma Client:

```bash
npx prisma generate
```

Then push the schema to the database:

```bash
npx prisma db push
```

Seed the database with an Admin user:

```bash
npm run seed
```

✅ This will create an admin user:
- **Email:** `admin@corp.io`
- **Password:** `admin@123`

---

### 5. Start Development Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:4000
```

---

### 6. Test the APIs

You can now test the APIs using:
- Postman
- Curl
- Frontend client

Use the login API to authenticate and then access protected routes.

---

## 🛠 Local Development Requirements

| Tool          | Version Recommended |
|:--------------|:--------------------|
| Node.js       | 18+                 |
| PostgreSQL    | 13+                 |
| npm           | 9+                  |
| Prisma        | Latest              |

---

## 👨‍💻 Author

**Pinkesh Roy**

- [GitHub](https://github.com/pinkeshroy)

---