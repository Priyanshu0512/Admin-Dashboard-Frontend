import React, { useState } from "react";
import { Download } from "lucide-react";
import ChartWrapper from "../components/charts/ChartWrapper";
import { useTheme } from "../contexts/ThemeContext";
import { exportToPDF, exportToCSV, exportToJSON } from "../utils/exportUtils";
import {
  reportMetrics,
  reportTypes,
  categoryData,
  userGrowthData,
  salesData,
} from "../constants/reportsData";
const Reports = () => {
  const { darkMode } = useTheme();
  const [selectedReport, setSelectedReport] = useState("overview");
  const [dateRange, setDateRange] = useState("30d");

  const handleExportPDF = () => {
    exportToPDF("reports-dashboard", `${selectedReport}-report.pdf`);
  };

  const handleExportCSV = () => {
    let csvData = [];
    switch (selectedReport) {
      case "sales":
        csvData = salesData;
        break;
      case "users":
        csvData = userGrowthData;
        break;
      case "products":
        csvData = categoryData;
        break;
      default:
        csvData = [...salesData, ...categoryData, ...userGrowthData];
    }
    exportToCSV(csvData, `${selectedReport}-data.csv`);
  };

  const handleExportJSON = () => {
    const jsonData = {
      reportType: selectedReport,
      dateRange,
      metrics: reportMetrics,
      salesData,
      categoryData,
      userGrowthData,
      exportDate: new Date().toISOString(),
    };
    exportToJSON(jsonData, `${selectedReport}-data.json`);
  };

  return (
    <div className="space-y-6" id="reports-dashboard">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Reports & Analytics
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Comprehensive reporting and business intelligence dashboard.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={`px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-dark-900 border-dark-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          <div className="relative group">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
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

      <div
        className={`p-4 rounded-lg border ${
          darkMode ? "bg-dark-900 border-dark-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedReport === type.id
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "bg-dark-800 text-gray-300 hover:bg-dark-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                darkMode
                  ? "bg-dark-900 border-dark-700 hover:shadow-black/20"
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
                    {metric.title}
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
                    metric.color === "green"
                      ? "bg-green-50 dark:bg-green-900/20"
                      : metric.color === "blue"
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : metric.color === "purple"
                      ? "bg-purple-50 dark:bg-purple-900/20"
                      : "bg-orange-50 dark:bg-orange-900/20"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      metric.color === "green"
                        ? "text-green-600"
                        : metric.color === "blue"
                        ? "text-blue-600"
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

      {selectedReport === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWrapper
            title="Sales vs Profit Trend"
            data={salesData}
            defaultType="area"
          />
          <ChartWrapper
            title="Sales by Category"
            data={categoryData}
            defaultType="pie"
          />
        </div>
      )}

      {selectedReport === "sales" && (
        <div className="space-y-6">
          <ChartWrapper
            title="Sales Performance Overview"
            data={salesData}
            defaultType="bar"
            className="w-full"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWrapper
              title="Monthly Sales Trend"
              data={salesData}
              defaultType="line"
            />
            <ChartWrapper
              title="Category Distribution"
              data={categoryData}
              defaultType="pie"
            />
          </div>
        </div>
      )}

      {selectedReport === "users" && (
        <div className="space-y-6">
          <ChartWrapper
            title="User Growth Analytics"
            data={userGrowthData}
            defaultType="area"
            className="w-full"
          />
        </div>
      )}

      {selectedReport === "products" && (
        <div className="space-y-6">
          <ChartWrapper
            title="Product Performance"
            data={categoryData}
            defaultType="bar"
            className="w-full"
          />
        </div>
      )}

      <div
        className={`rounded-xl border p-6 ${
          darkMode ? "bg-dark-900 border-dark-700" : "bg-white border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Detailed Report Summary
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  darkMode ? "border-dark-700" : "border-gray-200"
                }`}
              >
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Metric
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Current Period
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Previous Period
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Change
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Target
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  metric: "Revenue",
                  current: "$45,231",
                  previous: "$40,189",
                  change: "+12.5%",
                  target: "$50,000",
                  positive: true,
                },
                {
                  metric: "Orders",
                  current: "892",
                  previous: "845",
                  change: "+5.6%",
                  target: "1,000",
                  positive: true,
                },
                {
                  metric: "Conversion Rate",
                  current: "3.24%",
                  previous: "3.18%",
                  change: "+0.06%",
                  target: "3.5%",
                  positive: true,
                },
                {
                  metric: "Customer Acquisition Cost",
                  current: "$34",
                  previous: "$38",
                  change: "-10.5%",
                  target: "$30",
                  positive: true,
                },
                {
                  metric: "Churn Rate",
                  current: "2.1%",
                  previous: "2.8%",
                  change: "-0.7%",
                  target: "2.0%",
                  positive: true,
                },
              ].map((row, index) => (
                <tr
                  key={index}
                  className={`border-b last:border-b-0 ${
                    darkMode ? "border-dark-700" : "border-gray-200"
                  }`}
                >
                  <td
                    className={`py-3 px-4 font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {row.metric}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {row.current}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {row.previous}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      row.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {row.change}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {row.target}
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

export default Reports;
