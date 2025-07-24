# 💸 Expense Tracker

A full-featured **Expense Tracking Application** built with the **MERN Stack**. Designed for remote teams and organizations, it supports **Role-Based Access Control (RBAC)**, **visual charts for insights**, and **audit logs** for tracking admin actions. The app is styled using **Tailwind CSS + ShadCN UI**, and global state is managed with **Zustand**.

## ✨ Features

### 👥 Roles & Authentication

- 🔐 **Register / Login** using JWT Authentication
- 👔 **Role-based access** (Employee or Admin)
- 🧑‍💼 **Dropdown Role Selection** on signup (for testing/demo)

### 🧾 Expense Management

- ➕ Employees can **Add/View** their own expenses
- 🧮 Admins can **View/Filter/Update** status of all expenses

### 📊 Admin Dashboard & Charts

- 📈 **Monthly Expenses Bar Chart**
- 📊 **Expenses by Category Chart**
- 📌 **Overview cards**: total spend, tasks status count

### 🕵️ Audit Logs (Admin)

- 🗃️ View logs of **status changes**, **user actions**
- ⏱️ Sorted by **timestamp** with **user details**

## 🛠️ Tech Stack

### ⚙️ Frontend

- React.js
- React Router
- Tailwind CSS
- ShadCN UI
- Zustand (State Management)
- Axios
- Recharts (for Charts)
- React Hot Toast

### 🔧 Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt.js
- Express Middleware (RBAC)

## 📦 App Logic

- **RBAC**: Middleware to protect routes by user role
- **JWT Auth**: Token is stored in cookies, verified on each request
- **Zustand Stores**: Clean state management for auth and expenses
- **Admin Status Updates**: Approve, reject, or mark expense as pending
- **Audit Logs**: Automatically created when expense is created/status updated
- **Dynamic Dashboard**: Role-specific UI with dynamic data
- **Dropdown Role Selection**: Easily demo both roles on one app

## 🌐 Live Demo

🔗 **[Expense Tracker]()**