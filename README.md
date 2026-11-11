# 🚀 TestPilot – Agentic AI-Powered QA Testing Platform

TestPilot is an AI-powered software testing platform built using **Node.js, Express.js, PostgreSQL, and Google Gemini API**. It uses a multi-agent workflow to transform application requirements into structured test scenarios and detailed test cases.

The platform aims to simplify software quality assurance by using AI agents to assist with test planning and test case generation.

## 🎯 Project Objective

Traditional software testing requires testers to manually analyse requirements and prepare test cases. TestPilot addresses this challenge by introducing AI-powered agents that automate parts of the test design process.

## ✨ Features

- **AI-Powered Test Planning:** Analyses application requirements and generates structured testing scenarios.
- **Automated Test Case Generation:** Generates positive and negative test cases based on planned scenarios.
- **Multi-Agent Architecture:** Uses specialised AI agents to perform different testing tasks.
- **REST API Integration:** Provides backend endpoints for managing requirements and generated test cases.
- **Database Integration:** Stores application requirements and generated test cases using PostgreSQL.
- **AI Model Integration:** Uses Google Gemini API for intelligent requirement analysis and test generation.

## 🤖 Multi-Agent Architecture

TestPilot follows a sequential multi-agent workflow.

### 1. Test Planner Agent
- Analyses application requirements.
- Identifies important testing scenarios.
- Generates structured test plans.

### 2. Test Generator Agent
- Receives the test plan from the Test Planner Agent.
- Generates detailed test cases.
- Creates positive and negative test scenarios.

### Workflow

Application Requirements → Test Planner Agent → Test Generator Agent → Generated Test Cases → PostgreSQL Database

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Backend | Node.js, Express.js |
| Frontend | HTML, CSS, JavaScript |
| AI Integration | Google Gemini API |
| Database | PostgreSQL |
| API Architecture | REST APIs |
| Development Tools | VS Code, Postman, Git, GitHub |
| Package Management | npm |

## 📂 Project Structure

```text
TestPilot/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── requirementController.js
│   │   └── testCaseController.js
│   │
│   ├── repositories/
│   │   ├── requirementRepository.js
│   │   └── testCaseRepository.js
│   │
│   ├── routes/
│   │   ├── requirementRoutes.js
│   │   └── testCaseRoutes.js
│   │
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── requirementService.js
│   │   ├── testCaseService.js
│   │   ├── testGeneratorService.js
│   │   └── testPlannerService.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- PostgreSQL
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/TestPilot.git
```

```bash
cd TestPilot
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Use the actual environment variable names expected by your application. Never share your API keys publicly.

### 4. Configure PostgreSQL

Create a PostgreSQL database and configure its connection details in the environment variables.

Ensure the required database tables are created before running the application.

### 5. Start the Backend

```bash
node server.js
```

The backend server will run at:

```text
http://localhost:3000
```

### 6. Launch the Frontend

Open `frontend/index.html` in your browser using VS Code Live Server or another local static server.

## 🔄 Application Workflow

1. User enters application requirements.
2. Test Planner Agent analyses the requirements.
3. Structured test scenarios are generated.
4. Test Generator Agent converts scenarios into detailed test cases.
5. Generated test cases are stored in PostgreSQL.
6. Users can access the generated testing information through the frontend.

## 🔮 Future Enhancements

- Test Executor Agent for automated test execution.
- Automated API testing.
- Automated UI testing.
- Bug Investigator Agent for analysing test failures.
- AI-powered defect analysis and reporting.
- Test execution reports and dashboards.

## 👨‍💻 Developer

**Gokul Kumar A**

Information Science and Engineering Graduate

- GitHub: https://github.com/Gokulkumara2003
- LinkedIn: https://linkedin.com/in/gokulkumara

---

⭐ If you find this project interesting, consider giving the repository a star!