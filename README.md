# 🎯 Quizz Whizzz

**Quizz Whizzz** is a full-stack quiz application built with the MERN stack.  
It allows users to register, log in, create quizzes, and attempt quizzes in real-time.  
The app features an intuitive UI, dynamic quiz handling, and secure backend API integration.

---

## 🚀 Features

- **User Authentication** – Register and log in securely.
- **Create Quizzes** – Add quiz name, questions, options, and correct answers.
- **Attempt Quizzes** – Join quizzes via a simple click and answer questions interactively.
- **Real-Time Score Calculation** – Immediate feedback after quiz completion.
- **Responsive Design** – Works seamlessly on mobile, tablet, and desktop.
- **Modern UI** – Built using **ShadCN UI** and **TailwindCSS**.

---

## 🛠 Tech Stack

### **Frontend**
- React + TypeScript
- TailwindCSS
- ShadCN UI
- Zod (Form validation)
- React Hook Form
- Zustand (State management)
- React Router DOM

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

---

## 📂 Folder Structure
quizz-whizzz/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middlewares/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── modules/
│ │ │ └── user/
│ │ │ ├── pages/ (login, register, dashboard)
│ │ ├── shared/
│ │ │ ├── components/ (header, footer)
│ │ │ └── routes/ (AppRoutes.tsx)
│ │ ├── App.tsx
│ │ └── main.tsx
│
└── README.md



