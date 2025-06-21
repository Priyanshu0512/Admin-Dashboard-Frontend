import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

const COLORS = ['#3b82f6', '#14b8a6', '#f97316', '#ef4444', '#8b5cf6', '#06b6d4'];

const PieChartComponent = ({ data }) => {
  const { darkMode } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            borderRadius: '8px',
            color: darkMode ? '#ffffff' : '#000000'
          }}
        />
        <Legend 
          wrapperStyle={{
            color: darkMode ? '#ffffff' : '#000000'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;