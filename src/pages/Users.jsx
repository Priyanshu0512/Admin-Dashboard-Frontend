import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import AddUserModal from "../components/modals/AddUserModal";
import { exportToCSV, exportToJSON } from "../utils/exportUtils";

const Users = () => {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      phone: "+1 (555) 123-4567",
      lastActive: "2 hours ago",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "active",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      phone: "+1 (555) 987-6543",
      lastActive: "1 day ago",
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Editor",
      status: "inactive",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      phone: "+1 (555) 456-7890",
      lastActive: "1 week ago",
      joinDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "User",
      status: "pending",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      phone: "+1 (555) 321-0987",
      lastActive: "Never",
      joinDate: "2023-04-05",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      role: "User",
      status: "active",
      avatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      phone: "+1 (555) 654-3210",
      lastActive: "5 minutes ago",
      joinDate: "2023-04-12",
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredUsers, "users-data.csv");
  };

  const handleExportJSON = () => {
    exportToJSON(filteredUsers, "users-data.json");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "Editor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "User":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            User Management
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage and monitor all user accounts in your system.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative group">
            <button
              className={`flex items-center px-4 py-2 rounded-lg border text-sm transition-colors ${
                darkMode
                  ? "bg-gray-800 border-dark-700 text-white hover:bg-dark-800"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Export
            </button>
            <div
              className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 ${
                darkMode
                  ? "bg-dark-900 border-dark-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={handleExportCSV}
                className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-dark-800 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Export as CSV
              </button>
              <button
                onClick={handleExportJSON}
                className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-dark-800 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Export as JSON
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      <div
        className={`p-4 rounded-lg border ${
          darkMode ? "bg-gray-800 border-dark-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-800 border-dark-700 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-800 border-dark-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-800 border-dark-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="role">Sort by Role</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      <div
        className={`rounded-lg border overflow-hidden ${
          darkMode ? "bg-gray-800 border-dark-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <tr>
                <th
                  className={`text-left py-3 px-6 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  User
                </th>
                <th
                  className={`text-left py-3 px-6 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Role
                </th>
                <th
                  className={`text-left py-3 px-6 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Status
                </th>
                <th
                  className={`text-left py-3 px-6 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Contact
                </th>
                <th
                  className={`text-left py-3 px-6 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Last Active
                </th>
                <th
                  className={`text-left py-3 px-6 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors ${
                    darkMode ? "border-dark-700" : "border-gray-200"
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {user.name}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span
                          className={`${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {user.email}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span
                          className={`${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {user.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`py-4 px-6 text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {user.lastActive}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors ${
                          darkMode
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors ${
                          darkMode
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`flex items-center justify-between px-4 py-3 border rounded-lg ${
          darkMode ? "bg-gray-800 border-dark-700" : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Showing {filteredUsers.length} of {users.length} users
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={`px-3 py-1 text-sm border rounded transition-colors ${
              darkMode
                ? "border-dark-700 text-gray-300 hover:bg-dark-800"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            1
          </button>
          <button
            className={`px-3 py-1 text-sm border rounded transition-colors ${
              darkMode
                ? "border-dark-700 text-gray-300 hover:bg-dark-800"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            2
          </button>
          <button
            className={`px-3 py-1 text-sm border rounded transition-colors ${
              darkMode
                ? "border-dark-700 text-gray-300 hover:bg-dark-800"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Users;
