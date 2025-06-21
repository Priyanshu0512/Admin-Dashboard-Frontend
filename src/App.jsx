import React from "react";
import { useState } from "react";
function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };
  return <h1 className="p-4">hi</h1>;
}

export default App;
