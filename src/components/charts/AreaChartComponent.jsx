import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../contexts/ThemeContext";

const AreaChartComponent = ({ data }) => {
  const { darkMode } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={darkMode ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey="name"
          stroke={darkMode ? "#9ca3af" : "#6b7280"}
          fontSize={12}
        />
        <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
            borderRadius: "8px",
            color: darkMode ? "#ffffff" : "#000000",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          fill="url(#colorGradient)"
          strokeWidth={2}
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
