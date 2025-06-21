import React, { useState } from "react";
import { Calendar, Filter, Download } from "lucide-react";
import ChartWrapper from "../components/charts/ChartWrapper";
import { useTheme } from "../contexts/ThemeContext";
import { exportToPDF, exportToCSV, exportToJSON } from "../utils/exportUtils";
import {
  performanceData,
  trafficSourceData,
  conversionData,
  keyMetrics,
} from "../constants/analyticsData";
const Analytics = () => {
  const { darkMode } = useTheme();
  const [dateRange, setDateRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const handleExportPDF = () => {
    exportToPDF("analytics-dashboard", "analytics-report.pdf");
  };

  const handleExportCSV = () => {
    const csvData = [
      ...performanceData.map((item) => ({ ...item, type: "performance" })),
      ...trafficSourceData.map((item) => ({ ...item, type: "traffic" })),
      ...conversionData.map((item) => ({ ...item, type: "conversion" })),
    ];
    exportToCSV(csvData, "analytics-data.csv");
  };

  const handleExportJSON = () => {
    const jsonData = {
      keyMetrics,
      performanceData,
      trafficSourceData,
      conversionData,
      exportDate: new Date().toISOString(),
    };
    exportToJSON(jsonData, "analytics-data.json");
  };

  return (
    <div className="space-y-6" id="analytics-dashboard">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Analytics Dashboard
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Comprehensive insights into your website performance and user
            behavior.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={`px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-blue-600 border-dark-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          <button
            className={`flex items-center px-4 py-2 rounded-lg border text-sm transition-colors ${
              darkMode
                ? "bg-blue-600 border-dark-700 text-white hover:bg-dark-800"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
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
                  ? "bg-dark-900 border-dark-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={handleExportPDF}
                className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-dark-800 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Export as PDF
              </button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                darkMode
                  ? " bg-gray-800 border-dark-700 hover:shadow-black/20"
                  : "bg-white border-gray-200 hover:shadow-gray-200/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {metric.label}
                  </p>
                  <p
                    className={`text-2xl font-bold mt-1 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {metric.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {metric.change} vs last period
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    metric.color === "blue"
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : metric.color === "green"
                      ? "bg-green-50 dark:bg-green-900/20"
                      : metric.color === "purple"
                      ? "bg-purple-50 dark:bg-purple-900/20"
                      : "bg-orange-50 dark:bg-orange-900/20"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      metric.color === "blue"
                        ? "text-blue-600"
                        : metric.color === "green"
                        ? "text-green-600"
                        : metric.color === "purple"
                        ? "text-purple-600"
                        : "text-orange-600"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChartWrapper
        title="Website Performance Overview"
        data={performanceData}
        defaultType="area"
        className="w-full"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper
          title="Traffic Sources"
          data={trafficSourceData}
          defaultType="pie"
        />

        <ChartWrapper
          title="Conversion Rate Trend"
          data={conversionData}
          defaultType="line"
        />
      </div>

      <div
        className={`rounded-xl border p-6 ${
          darkMode ? "bg-gray-800 border-dark-700" : "bg-white border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Top Pages Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  darkMode ? "bg-gray-800" : "border-gray-200"
                }`}
              >
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Page
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Views
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Unique Visitors
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Bounce Rate
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Avg. Time
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  page: "/dashboard",
                  views: "12,489",
                  visitors: "8,234",
                  bounce: "34.2%",
                  time: "3m 42s",
                },
                {
                  page: "/analytics",
                  views: "8,792",
                  visitors: "6,123",
                  bounce: "28.7%",
                  time: "4m 15s",
                },
                {
                  page: "/users",
                  views: "6,543",
                  visitors: "4,567",
                  bounce: "41.3%",
                  time: "2m 18s",
                },
                {
                  page: "/reports",
                  views: "4,321",
                  visitors: "3,210",
                  bounce: "52.1%",
                  time: "1m 55s",
                },
                {
                  page: "/settings",
                  views: "2,876",
                  visitors: "2,341",
                  bounce: "36.8%",
                  time: "3m 08s",
                },
              ].map((row, index) => (
                <tr
                  key={index}
                  className={`border-b last:border-b-0 ${
                    darkMode ? "border-dark-700" : "border-gray-200"
                  }`}
                >
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {row.page}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {row.views}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {row.visitors}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {row.bounce}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {row.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
