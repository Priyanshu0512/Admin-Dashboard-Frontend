import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { exportToCSV, exportToJSON } from "../utils/exportUtils";
import { data, columns } from "../constants/tablesData";
const Tables = () => {
  const { darkMode } = useTheme();
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle numeric values
    if (sortField === "orders") {
      aValue = parseInt(aValue);
      bValue = parseInt(bValue);
    }

    if (sortField === "revenue") {
      aValue = parseFloat(aValue.replace("$", "").replace(",", ""));
      bValue = parseFloat(bValue.replace("$", "").replace(",", ""));
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    exportToCSV(filteredData, "table-data.csv");
  };

  const handleExportJSON = () => {
    exportToJSON(filteredData, "table-data.json");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "Pending":
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

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(filteredData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Data Tables
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Advanced data table with sorting, filtering, and bulk actions.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            className={`flex items-center px-4 py-2 border rounded-lg text-sm transition-colors ${
              darkMode
                ? "border-dark-700 text-gray-300 hover:bg-dark-800"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>

          <div className="relative group">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <div
              className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 ${
                darkMode
                  ? "bg-gray-800 border-dark-700"
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
        </div>
      </div>
      <div
        className={`p-4 rounded-lg border ${
          darkMode ? "bg-gray-800 border-dark-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative">
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
              className={`pl-10 pr-4 py-2 w-64 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-dark-800 border-dark-700 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          {selectedRows.length > 0 && (
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {selectedRows.length} selected
              </span>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Delete Selected
              </button>
            </div>
          )}
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
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === filteredData.length &&
                      filteredData.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    } ${
                      column.sortable
                        ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700"
                        : ""
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp
                            className={`h-3 w-3 ${
                              sortField === column.key &&
                              sortDirection === "asc"
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                          />
                          <ChevronDown
                            className={`h-3 w-3 -mt-1 ${
                              sortField === column.key &&
                              sortDirection === "desc"
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                darkMode ? "bg-gray-800" : "divide-gray-200"
              }`}
            >
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors ${
                    selectedRows.includes(item.id)
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={(e) =>
                        handleSelectRow(item.id, e.target.checked)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
                        item.role
                      )}`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.lastLogin}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.orders}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
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

        <div
          className={`px-6 py-3 border-t flex items-center justify-between ${
            darkMode ? "bg-gray-800 bg-dark-900" : "border-gray-200 bg-gray-50"
          }`}
        >
          <div
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Showing {filteredData.length} of {data.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-1 text-sm border rounded transition-colors ${
                darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-dark-800"
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
                  ? "bg-gray-800 text-gray-300 hover:bg-dark-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              2
            </button>
            <button
              className={`px-3 py-1 text-sm border rounded transition-colors ${
                darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-dark-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
