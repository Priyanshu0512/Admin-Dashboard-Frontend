import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

const BarChartComponent = ({ data }) => {
  const { darkMode } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={darkMode ? '#374151' : '#e5e7eb'} 
        />
        <XAxis 
          dataKey="name" 
          stroke={darkMode ? '#9ca3af' : '#6b7280'}
          fontSize={12}
        />
        <YAxis 
          stroke={darkMode ? '#9ca3af' : '#6b7280'}
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            borderRadius: '8px',
            color: darkMode ? '#ffffff' : '#000000'
          }}
        />
        <Bar 
          dataKey="value" 
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;