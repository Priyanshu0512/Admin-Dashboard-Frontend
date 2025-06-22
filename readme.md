# Admin Dashboard

A modern, feature-rich dashboard application built with React 18, Vite, and Tailwind CSS. This comprehensive dashboard includes user management, analytics, **Kanban** boards, calendar functionality, and much more.

---


![Dashboard Preview](https://github.com/user-attachments/assets/d1c3a085-41de-4be7-b4c2-b5e4236bc9eb)


## ✨ Features

### 🎯 Core Features

- **Modern Dashboard** - Clean, responsive dashboard with real-time analytics
- **User Management** - Complete CRUD operations for user accounts
- **Kanban Board** - Drag-and-drop task management system
- **Calendar Integration** - Event scheduling and management
- **Data Tables** - Advanced table functionality with sorting and filtering
- **Analytics & Reports** - Interactive charts and data visualization
- **Settings Panel** - Comprehensive application configuration

---

![Features Overview](https://github.com/user-attachments/assets/48825ba4-b4c9-4d2c-a082-b0ba0146a297)

---


## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Linting**: ESLint
- **State Management**: React Context API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn** (version 1.22.0 or higher)

Verify your installations:

```bash
node --version
npm --version
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-dashboard-app
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Start Development Server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

The application will start on `http://localhost:5173` (or the next available port).

---

![Features Overview](https://github.com/user-attachments/assets/818ca102-ae40-4e26-bce6-04bf46036085)

---


## 📁 Project Structure

```
react-dashboard-app/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # Reusable components
│   │   ├── auth/         # Authentication components
│   │   ├── charts/       # Chart components
│   │   ├── Kanban/       # Kanban board components
│   │   ├── Layout/       # Layout components (Header, Sidebar)
│   │   └── modals/       # Modal components
│   ├── contexts/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── KanbanContext.jsx
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Analytics.jsx
│   │   ├── Calendar.jsx
│   │   ├── Kanban.jsx
│   │   ├── Tables.jsx
│   │   ├── Reports.jsx
│   │   └── Settings.jsx
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles with Tailwind imports
├── .eslintrc.js          # ESLint configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Project dependencies and scripts
```


## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
