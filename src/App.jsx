import React from "react";
import { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/dashboard";
function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <div>hi</div>;
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
        <ProtectedRoute>
          <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderContent()}
          </Layout>
        </ProtectedRoute>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
