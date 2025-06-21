import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  Moon,
  Sun,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { notifications } from "../../constants/notifications";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleMode } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;
  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        darkMode
          ? "bg-gray-900/95 backdrop-blur border-gray-700"
          : "bg-white/95 backdrop-blur border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg transition-colors lg:hidden ${
              darkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <div className="relative hidden md:block">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 w-64 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMode}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`p-2 rounded-lg transition-colors relative ${
                darkMode
                  ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div
                className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border overflow-hidden ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <h3
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Notifications
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b last:border-b-0 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        darkMode ? "border-gray-700" : "border-gray-100"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`h-2 w-2 rounded-full mt-2 ${
                            notification.unread ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm ${
                              darkMode ? "text-gray-200" : "text-gray-900"
                            }`}
                          >
                            {notification.message}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="hidden md:block text-left">
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user?.name}
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {user?.role}
                </p>
              </div>
            </button>

            {userMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border overflow-hidden ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user?.name}
                  </p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {user?.email}
                  </p>
                </div>

                <button
                  className={`w-full flex items-center px-4 py-3 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </button>

                <button
                  className={`w-full flex items-center px-4 py-3 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>

                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(userMenuOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setUserMenuOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
