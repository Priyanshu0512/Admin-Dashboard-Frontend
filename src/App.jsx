import React, { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Calendar from "./pages/Calendar";
import Tables from "./pages/Tables";
import Settings from "./pages/Settings";
import KanbanBoard from "./components/Kanban/KanbanBoard";
import { KanbanProvider } from "./contexts/KanbanContext";
function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "analytics":
        return <Analytics />;
      case "users":
        return <Users />;
      case "reports":
        return <Reports />;
      case "calendar":
        return <Calendar />;
      case "kanban":
        return <KanbanBoard />;
      case "tables":
        return <Tables />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <ThemeProvider>
      <AuthProvider>
        <KanbanProvider>
          <ProtectedRoute>
            <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
              {renderContent()}
            </Layout>
          </ProtectedRoute>
        </KanbanProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
