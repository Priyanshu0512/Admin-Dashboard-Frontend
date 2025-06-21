import React from "react";
import { LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { menuItems } from "../../constants/menuItems";

const Sidebar = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
}) => {
  const { darkMode } = useTheme();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-30 h-full transition-all duration-300 ease-in-out border-r ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        } ${
          sidebarOpen || window.innerWidth >= 1024
            ? "translate-x-0"
            : "-translate-x-full"
        } ${collapsed ? "w-16" : "w-64"}`}
      >
        <div
          className={`flex items-center justify-between p-4 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <h1
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Dashboard
              </h1>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-lg transition-colors hidden lg:flex ${
              darkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center text-left p-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? darkMode
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-blue-50 text-blue-700 shadow-sm"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                } ${collapsed ? "justify-center" : "justify-start"}`}
                title={collapsed ? item.label : ""}
              >
                <Icon
                  className={`h-5 w-5 ${collapsed ? "w-20 h-20" : "mr-2"} ${
                    isActive
                      ? "text-current"
                      : "group-hover:scale-110 transition-transform"
                  }`}
                />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {!collapsed && (
          <div
            className={`absolute bottom-4 left-4 right-4 p-4 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  System Status
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  All systems operational
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
