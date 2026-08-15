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
                  React Frontend
                         │
                         │ REST API
                         ▼
                 ASP.NET Core Web API
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     SQL Server      Ollama AI      JWT Auth
          │              │
          ▼              ▼
   Entity Framework   Llama 3.2
          Core
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
├── EnterpriseAIHelpdesk.Tests
│
└── frontend
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
- JWT Authentication
- Password Hashing with `PasswordHasher<T>`
- Role-Based Authorization

### AI
- Ollama
- Llama 3.2

### Development Tools
- Visual Studio 2022
- VS Code
- Swagger
- Git
- GitHub

### DevOps & Deployment
- Docker
- Docker Compose

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
GET /api/Ticket/{id}/summary
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

## 🐳 Docker Deployment

The Enterprise AI Helpdesk is containerized using Docker to provide a consistent and isolated environment for the application.

The project uses separate Docker containers for:

- React Frontend
- ASP.NET Core Backend
- SQL Server
- Ollama runs on the host machine and is accessed by the backend container

### Docker files

EnterpriseAIHelpdesk
│
├── EnterpriseAIHelpdesk.API
│   └── Dockerfile
│
├── frontend
│   └── dockerfile
│
└── docker-compose.yml

### Docker Architecture

```text
                        Host Machine
                             │
              ┌──────────────┴──────────────┐
              │                             │
         Ollama LLM                    Docker Engine
       Llama 3.2                           │
              │                            │
              │                   ┌────────┴─────────┐
              │                   │                  │
              │              Frontend            Backend
              │              Container           Container
              │              :5173                :5244
              │                   │                  │
              │                   └────────┬─────────┘
              │                            │
              │                         SQL Server
              │                         Container
              │                            :14333
              │
              └── Backend accesses Ollama
                  through host.docker.internal
```

## Running the Application Without Docker

```text
                React Frontend
                      │
                      ▼
              ASP.NET Core Backend
                      │
                      ▼
                  SQL Server
                      │
                      ▼
                    Ollama
```

### Start Ollama

Make sure Ollama is installed and the Llama 3.2 model is available:

```bash
ollama pull llama3.2
```

Start Ollama if it is not already running.

### Run Ollama

Install Ollama and pull the Llama 3.2 model:

```bash
ollama pull llama3.2
```

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
http://localhost:5244/swagger
```

---



## 👨‍💻 Author

**Nadimpalli Raja Sujith Varma**

- GitHub: https://github.com/SujithVarma-ai

---
