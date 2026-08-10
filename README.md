# 🚀 Enterprise AI Helpdesk & Incident Management System

An AI-powered enterprise helpdesk platform that automates ticket management using **ASP.NET Core**, **SQL Server**, and **Ollama LLM**.

This project is built using **Clean Architecture** and demonstrates enterprise-level backend development with authentication, authorization, AI-powered ticket processing, and modern software engineering practices.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User Registration
- User Login
- JWT Authentication
- Password Hashing
- Role-Based Authorization (Admin / Employee)

### 🎫 Ticket Management
- Create Ticket
- View My Tickets
- View Ticket by ID
- Update Ticket
- Delete Ticket (Admin)
- Assign Tickets

### 🤖 AI Features
- AI-powered Ticket Category Prediction
- AI-powered Ticket Priority Prediction
- AI-generated Ticket Summary
- Ollama Local LLM Integration

### 💬 Comments
- Add Comments to Tickets
- View Ticket Comments

---

## 🏗️ Architecture

```
                ASP.NET Core Web API
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
 SQL Server      Ollama AI      JWT Authentication
        │
        ▼
 Entity Framework Core
```

The project follows **Clean Architecture**:

```
EnterpriseAIHelpdesk
│
├── EnterpriseAIHelpdesk.API
├── EnterpriseAIHelpdesk.Application
├── EnterpriseAIHelpdesk.Domain
├── EnterpriseAIHelpdesk.Infrastructure
├── EnterpriseAIHelpdesk.Persistence
└── EnterpriseAIHelpdesk.Tests
```

---

## 🛠️ Tech Stack

### Backend
- ASP.NET Core 9 Web API
- C#
- Entity Framework Core
- SQL Server

### Frontend

- React
- React Router
- JavaScript
- HTML
- CSS

### Authentication
- JWT
- ASP.NET Identity Password Hashing

### AI
- Ollama
- Llama 3.2

### Development Tools
- Visual Studio 2022
- VS Code
- Swagger
- Git
- GitHub

---

## 📂 Current Modules

- ✅ JWT Authentication & Authorization
- ✅ React Frontend
- ✅ Ticket Management
- ✅ Ticket Details
- ✅ Comments
- ✅ AI Category Prediction
- ✅ AI Priority Prediction
- ✅ AI Ticket Summarization
- ✅ React ↔ ASP.NET Core API Integration

---

## 🚀 Future Roadmap

- 📚 RAG Knowledge Assistant
- 🐳 Docker
- ☁️ Azure Deployment
- 🚀 GitHub Actions CI/CD

---

## 📸 API Preview

Swagger provides endpoints for:

### Authentication

```
POST /api/Auth/register
POST /api/Auth/login
```

### Tickets

```
POST   /api/Ticket
GET    /api/Ticket
GET    /api/Ticket/{id}
PUT    /api/Ticket/{id}
DELETE /api/Ticket/{id}
```

### Comments

```
POST /api/tickets/{ticketId}/comments
GET  /api/tickets/{ticketId}/comments
```

### AI Summary

```
GET /api/summary/{ticketId}
```

---

## 📁 Project Structure

```
EnterpriseAIHelpdesk
│
├── API
│   ├── Controllers
│   └── Program.cs
│
├── Application
│   ├── DTOs
│   ├── Interfaces
│
├── Domain
│   ├── Entities
│   ├── Enums
│
├── Infrastructure
│   ├── AI
│   ├── Services
│
├── Persistence
│   ├── Context
│   ├── Migrations
│
└── Tests
```

---

## ⚙️ Getting Started

### Clone the repository

```bash
git clone https://github.com/SujithVarma-ai/EnterpriseAIHelpdesk.git
```

### Navigate to the project

```bash
cd EnterpriseAIHelpdesk
```

### Restore packages

```bash
dotnet restore
```

### Apply database migrations

```bash
dotnet ef database update
```

### Run the application

```bash
dotnet run --project EnterpriseAIHelpdesk.API
```

Open Swagger:

```
https://localhost:5001/swagger
```

---

## 👨‍💻 Author

**Nadimpalli Raja Sujith Varma**

- GitHub: https://github.com/SujithVarma-ai

---
