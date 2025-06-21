import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import ChartWrapper from "../components/charts/ChartWrapper";
import { useTheme } from "../contexts/ThemeContext";
import {
  stats,
  revenueData,
  categoryData,
  userGrowthData,
} from "../constants/dashboardData";

export const Dashboard = () => {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Dashboard Overview
        </h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:shadow-gray-900/20"
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
                    {stat.title}
                  </p>
                  <p
                    className={`text-2xl font-bold mt-1 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ml-1 ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper
          title="Revenue Trend"
          data={revenueData}
          defaultType="area"
          className="lg:col-span-1"
        />

        <ChartWrapper
          title="Sales by Category"
          data={categoryData}
          defaultType="pie"
          className="lg:col-span-1"
        />
      </div>

      <ChartWrapper
        title="User Growth Analytics"
        data={userGrowthData}
        defaultType="line"
        className="w-full"
      />

      <div
        className={`rounded-xl border p-6 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              action: "New user registration",
              time: "2 minutes ago",
              user: "John Doe",
            },
            {
              action: "Order completed",
              time: "15 minutes ago",
              user: "Jane Smith",
            },
            {
              action: "Payment received",
              time: "1 hour ago",
              user: "Mike Johnson",
            },
            {
              action: "Product review posted",
              time: "2 hours ago",
              user: "Sarah Wilson",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b last:border-b-0 border-gray-200 dark:border-gray-700"
            >
              <div>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {activity.action}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  by {activity.user}
                </p>
              </div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
