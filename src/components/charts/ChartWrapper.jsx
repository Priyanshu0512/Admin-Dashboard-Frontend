import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, TrendingUp } from 'lucide-react';
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';
import PieChartComponent from './PieChartComponent';
import AreaChartComponent from './AreaChartComponent';

const ChartWrapper = ({ 
  title, 
  data, 
  className = '',
  defaultType = 'bar',
  showTypeSelector = true 
}) => {
  const [chartType, setChartType] = useState(defaultType);

  const chartTypes = [
    { key: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { key: 'line', label: 'Line Chart', icon: LineChart },
    { key: 'pie', label: 'Pie Chart', icon: PieChart },
    { key: 'area', label: 'Area Chart', icon: TrendingUp }
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChartComponent data={data} />;
      case 'line':
        return <LineChartComponent data={data} />;
      case 'pie':
        return <PieChartComponent data={data} />;
      case 'area':
        return <AreaChartComponent data={data} />;
      default:
        return <BarChartComponent data={data} />;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        
        {showTypeSelector && (
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {chartTypes.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setChartType(key)}
                className={`p-2 rounded-md transition-colors ${
                  chartType === key
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                title={label}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="h-80">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartWrapper;