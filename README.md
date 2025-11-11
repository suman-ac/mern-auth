# 🔐 User Authentication & Authorization System

This project demonstrates how to implement **secure user authentication and role-based authorization** in a full-stack web application.  
It’s built using **Node.js**, **Express**, **MongoDB**, and **React**, and includes secure login, signup, JWT-based authentication, and admin-only access routes.

---

## 🧩 Features

- 👤 **User Registration** (with password hashing using bcrypt)
- 🔑 **User Login** (JWT-based authentication)
- 🧱 **Role-Based Authorization** (User & Admin)
- 🗄️ **MongoDB Database Integration**
- 🔐 **Protected API Routes**
- 🧠 **Clear Folder Structure**
- 💬 **Easy Frontend Integration (React)**

---

## 🧠 Project Overview

**Frontend:** React.js  
**Backend:** Node.js + Express  
**Database:** MongoDB (local or Atlas)  
**Authentication:** JWT (JSON Web Token)  
**Hashing:** bcrypt.js

---

## ⚙️ Installation and Setup

Follow the steps below to **clone and run the project locally** on your computer.

### 🪄 Step 1: Clone the Repository

```bash
git clone <repo>
cd mern-auth

🧰 Step 2: Set Up the Backend
cd sever
npm install

Create a .env file inside the backend folder:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/authdemo
JWT_SECRET=supersecretkey

Start the Backend Server:
npm run dev
✅ The backend will run at: http://localhost:5000

🎨 Step 3: Set Up the Frontend

cd ../client
npm install

Start the React App:
npm start
✅ The frontend will run at: http://localhost:3000