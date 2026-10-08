# Cashnivo - Personal Finance Tracker

> Take control of your finances with a modern, intuitive, and secure expense tracking platform.

<div align="center">

<img src="public/logo.png" alt="Cashnivo Logo" width="200" />

**A modern, intuitive expense tracking application that helps you take control of your finances**

[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.13.0-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.3.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.5.19-5A0EF8?style=flat&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#-license--contributions)

<div align="center">
<a href="https://expensetracker-2ab95.web.app/" target="_blank">

![Live Demo](https://img.shields.io/badge/CASHNIVO-LIVE%20DEMO-6366F1?style=for-the-badge&logo=firefox-browser&logoColor=white&labelColor=111827)

</a>
</div>

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Real-World Problem & Solution](#-real-world-problem--solution)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Software Architecture](#️-software-architecture)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Deployment](#-deployment)
- [License & Contributions](#-license--contributions)

---

## 🎯 About The Project

**Cashnivo** is a comprehensive personal finance management application designed to help individuals track their income and expenses effortlessly. Built with modern web technologies, it provides an intuitive dashboard with real-time insights into your financial health, customizable categories, and detailed transaction history.

### Why Choose Cashnivo?

- **Real-time Insights**: Instant visualization of your spending patterns and savings rate
- **Fully Customizable**: Create and manage categories that match your unique lifestyle
- **Data Persistence**: Cloud-based storage via Firebase and custom REST APIs ensures your data is secure and accessible anywhere
- **Responsive Design**: A seamless and beautiful experience across desktop, tablet, and mobile devices with integrated dark mode

---

## 🧠 Real-World Problem & Solution

### The Problem
Managing personal finances can be chaotic. Without proper tracking, individuals struggle with:
1. **Unstructured Spending** — Difficulty knowing exactly where money is going each month
2. **Scattered Data** — Spreadsheets are tedious and manual tracking is prone to errors
3. **Lack of Insights** — Hard to visualize savings rates and categorical expenses over time

### The Solution
Cashnivo streamlines financial tracking:
- **Centralized Dashboard**: A unified view of balances, total income, and expenses
- **Interactive Visualizations**: Recharts-powered pie and bar charts break down expenses instantly
- **Frictionless Entry**: Quick and easy transaction forms with automatic categorization

---

## ✨ Key Features

### 🏠 Intelligent Dashboards
- **Financial Summary Cards**: View current balance, total income, total expenses, and savings rate at a glance
- **Income vs Expense Chart**: Interactive bar charts comparing monthly income against expenses
- **Expense Breakdown Chart**: Interactive pie charts showing a clear breakdown of expenses by category
- **Insights & Quick Actions**: Smart automated feedback and recent income overview

### 📊 Budget Management
- **Set Budgets**: Create budget limits for specific categories
- **Progress Tracking**: Visual indicators to monitor spending against your budget limits
- **Alerts**: Stay informed when you approach or exceed your budget

### 🤖 AI Financial Advisor
- **Context-Aware Assistance**: Chat with an AI (gpt-oss-120b) that understands your transaction history
- **Smart Recommendations**: Get real-time budgeting advice based on your spending habits
- **Persistent Chat**: Chat history is saved securely to the cloud and spans across sessions
- **Full Control**: Option to instantly clear your AI chat history from the UI and database

### 💳 Complete Transaction Lifecycle
- **Add Transactions**: Record income and expenses with amount, date, category, and description
- **Full CRUD Controls**: Edit and delete records with ease
- **Smart Filtering & Pagination**: Filter by type, search through history, and browse with paginated performance
- **Export Data**: Download your transaction history in PDF and Excel formats

### 📁 Custom Category Management
- **Type-Specific Management**: Separate controls for income vs. expense categories
- **System Defaults + Customization**: Start quickly with default categories, or build your own unlimited custom categories

### 🔐 Security & User Profiles
- **Firebase Authentication**: Email/Password and Google OAuth 2.0 integration
- **Role-Based Protected Routes**: Dashboards accessible only to authenticated users
- **User Avatars**: ImgBB integration for custom profile picture uploads

---

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.5 | Modern UI library with latest hooks and features |
| **Vite** | 8.0.10 | Lightning-fast build tool and dev server |
| **React Router** | 7.15.0 | Client-side routing and protected navigation |
| **TailwindCSS** | 4.3.0 | Utility-first CSS framework for rapid styling |
| **DaisyUI** | 5.5.19 | Beautiful accessible component library |
| **Recharts** | 3.8.1 | Composable charting library for data visualization |
| **React Markdown**| 10.1.0 | Parses and renders markdown from the AI Chatbot |
| **SweetAlert2** | 11.26.24 | Beautiful, responsive, customizable popup boxes |
| **React Toastify**| 11.1.0 | Lightweight toast notifications |

### Backend & Services

| Service | Version | Purpose |
|---------|---------|-------------|
| **Firebase** | 12.13.0 | Authentication and high-performance hosting |
| **Axios** | 1.16.0 | Promise-based HTTP client for API requests |
| **Groq API** | gpt-oss-120b | Ultra-fast AI inference for the financial advisor |
| **REST API** | Custom | Backend endpoints for data persistence |
| **ImgBB API** | REST | Cloud storage for user profile avatars |

---

## 💻 Software Architecture

Cashnivo follows a robust **Component-Based Architecture** with a clear separation of concerns, built entirely on modern React patterns. The architecture is designed for scalability, maintainability, and high performance.

### Architecture Overview

```mermaid
graph TD
    subgraph PresentationLayer [Presentation Layer]
        UI[React Components]
        Styles[TailwindCSS & DaisyUI]
        Charts[Recharts]
    end

    subgraph StateManagement [State Management]
        Context[React Context API]
        Hooks[Custom Hooks]
        Local[Local State]
    end

    subgraph BusinessLogic [Business Logic]
        Validation[Form Validation]
        Format[Data Formatting]
        Math[Math Aggregation]
    end

    subgraph APIIntegration [API Integration]
        Axios[Axios HTTP Client]
        AuthSDK[Firebase Auth SDK]
    end

    subgraph ExternalServices [External Services]
        Firebase[Firebase Authentication]
        Backend[REST API]
        ImgBB[ImgBB Cloud]
    end

    PresentationLayer --> StateManagement
    StateManagement --> BusinessLogic
    BusinessLogic --> APIIntegration
    APIIntegration --> ExternalServices
    
    UI --> Context
    UI --> Hooks
    Styles -.-> UI
    Charts -.-> UI
    Context --> Validation
    Hooks --> Validation
    Hooks --> Format
    Validation --> Axios
    Validation --> AuthSDK
    Axios --> Backend
    AuthSDK --> Firebase
    UI --> ImgBB
```

### Component Hierarchy

```mermaid
graph TD
    App[App Wrapper] --> Router[React Router]
    Router --> Public[Public Routes]
    Router --> Private[Private Route Guard]
    
    Public --> Home[Home]
    Public --> Auth[Login / Register]
    
    Private --> DashboardLayout[Dashboard Layout]
    DashboardLayout --> Sidebar[Sidebar / Navbar]
    DashboardLayout --> DashboardModules[Dashboard Modules]
    
    DashboardModules --> DashHome[Dashboard Home]
    DashboardModules --> AddTrans[Add Transaction]
    DashboardModules --> TransList[Transactions List]
    DashboardModules --> Categories[Categories Management]
    
    DashHome --> Summary[Financial Summary]
    DashHome --> Recent[Recent Transactions]
```

### Key Data Flows

#### 1. Authentication Lifecycle
```mermaid
sequenceDiagram
    participant User
    participant Client
    participant AuthProvider
    participant Firebase
    
    User->>Client: Enters Credentials
    Client->>Firebase: Validate via SDK
    Firebase-->>Client: Session Token
    Client->>AuthProvider: Update Global State
    AuthProvider->>Client: Unlock Protected Routes
```

#### 2. Transaction Management Flow
```mermaid
sequenceDiagram
    participant User
    participant Component
    participant Validation
    participant API
    participant Database
    
    User->>Component: Submit Transaction Form
    Component->>Validation: Client-side Check
    Validation-->>Component: Success
    Component->>API: Axios POST /transactions
    API->>Database: Insert Record
    Database-->>API: 201 Created
    API-->>Component: Response Data
    Component->>User: Toast Notification & Update UI
```

### Design Patterns Used

| Pattern | Implementation | Benefits |
|---|---|---|
| **Context Provider** | `AuthProvider` encapsulates global authentication states | Eliminates prop drilling, centralized security |
| **Higher-Order Component** | `PrivateRoute` securely wraps and protects dashboard routes | Reusable route protection |
| **Compound Components** | Modular dashboard construction (`FinancialSummary` + `RecentTransactions`) | Improved maintainability and decoupling |
| **Controlled Components** | Form inputs strictly bound to React local state (`useState`) | Single source of truth for form data |

---

## 📁 Project Structure

Cashnivo is a primary React + Vite application.

```text
cashnivo/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images and icons
│   ├── Components/          # Reusable React components
│   │   ├── Footer/          # Shared site footer
│   │   └── Navbar/          # Top navigation bar
│   ├── Dashboard/           # Protected application modules
│   │   ├── AiChatbot/       # Groq AI Floating Widget
│   │   ├── Aside/           # Sidebar navigation
│   │   ├── Budgets/         # Budget management module
│   │   ├── DashboardHome/   # Main overview & charts
│   │   ├── DashboardLayout/ # Dashboard shell wrapper
│   │   └── Transactions/    # Transaction records & forms
│   ├── Pages/               # Public and Auth pages
│   │   ├── Home/            # Landing page components
│   │   ├── AboutUs.jsx      # About info
│   │   ├── Categories.jsx   # Category management
│   │   ├── ContactUs.jsx    # Contact info
│   │   ├── Login.jsx        # Authentication
│   │   ├── Register.jsx     # User registration
│   │   ├── Profile.jsx      # User profile management
│   │   ├── ErrorPage.jsx    # 404 Error page
│   │   ├── Forgetpassword.jsx # Password recovery
│   │   └── TermsConditions.jsx # Legal terms page
│   ├── Provider/            # React Context (AuthProvider)
│   ├── RootLayout/          # Main application layout wrapper
│   ├── firebase/            # Firebase SDK configuration
│   ├── routes/              # Client-side routing logic
│   ├── App.css              # App specific styles
│   ├── App.jsx              # Main App wrapper
│   ├── index.css            # Tailwind global styles
│   └── main.jsx             # React entry point
├── .env.local               # Environment variables
├── package.json             # Frontend dependencies
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite bundler config
└── README.md                # Project documentation
```

---

## 💾 Database Schema

### Transactions Collection
```json
{
  "_id": "ObjectId",
  "type": "expense",
  "amount": 50.00,
  "category": "Groceries",
  "date": "2026-05-16",
  "description": "Weekly grocery shopping",
  "email": "user@example.com",
  "createdAt": "2026-05-16T10:30:00.000Z"
}
```

### Categories Collection
```json
{
  "_id": "ObjectId",
  "name": "Groceries",
  "type": "expense",
  "email": "user@example.com",
  "isDefault": false,
  "createdAt": "2026-05-16T10:30:00.000Z"
}
```

---

## ⚡ API Documentation

Cashnivo integrates with a custom REST API. All endpoints return JSON responses.

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/transactions?email={email}` | Fetch all transactions for a user | Yes |
| `POST` | `/transactions` | Create a new transaction | Yes |
| `PUT` | `/transactions/{id}` | Update an existing transaction | Yes |
| `DELETE` | `/transactions/{id}` | Delete a transaction | Yes |
| `GET` | `/categories?email={email}` | Fetch default + custom user categories | Yes |
| `POST` | `/categories` | Create a new custom category | Yes |
| `GET` | `/budgets?email={email}` | Fetch all budgets for a user | Yes |
| `POST` | `/budgets` | Create or update a budget | Yes |
| `DELETE` | `/budgets/{id}` | Delete a budget | Yes |
| `GET` | `/chats?email={email}` | Fetch AI chat history for a user | Yes |
| `POST` | `/chats` | Update/Create AI chat history | Yes |
| `DELETE` | `/chats?email={email}` | Delete AI chat history | Yes |
| `GET` | `/stats` | Fetch overall global platform stats | No |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Firebase Account** for Authentication
- **ImgBB Account** for API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SiratimMChy/cashnivo.git
   cd cashnivo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment

This project is configured for seamless deployment on **Vercel** and **Firebase Hosting**.

### Vercel Deployment
The project includes a `vercel.json` configuration file. Simply connect your GitHub repository to Vercel for automatic deployments with proper client-side routing.

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Authenticate and set project
firebase login
firebase init

# Build and deploy
npm run build
firebase deploy
```

---

## License & Contributions

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

This project is open-source and welcoming. Anyone is free to view, explore, and contribute to this repository. However, proper credit and attribution must be given to the original creator.

Distributed under the **MIT License**. 

*Copyright © 2026 Cashnivo. All rights reserved.*

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Update documentation for any new features
- Add tests for new functionality when applicable
- Ensure all tests pass before submitting PR
- Keep pull requests focused on a single feature/fix

---
## ✍️ Acknowledgments

- [React Documentation](https://react.dev/) - Comprehensive React guides
- [Vite Documentation](https://vitejs.dev/) - Fast build tool documentation
- [Firebase Documentation](https://firebase.google.com/docs) - Authentication and hosting
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Beautiful Tailwind components
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library
- [React Router](https://reactrouter.com/) - Client-side routing
- [Recharts](https://recharts.org/) - Data visualization library

---

<div align="center">

**Made by Siratim Mustakim Chowdhury**

[![GitHub](https://img.shields.io/badge/GitHub-SiratimMChy-181717?style=flat&logo=github)](https://github.com/SiratimMChy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Siratim%20Mustakim-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/siratim-mustakim-chowdhury/)
[![Email](https://img.shields.io/badge/Email-chowdhurysiratimmustakim@gmail.com-D14836?style=flat&logo=gmail&logoColor=white)](mailto:chowdhurysiratimmustakim@gmail.com)
</div>
