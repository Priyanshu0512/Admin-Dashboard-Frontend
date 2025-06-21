import {
  FileText,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
} from "lucide-react";
export const reportTypes = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "sales", label: "Sales Report", icon: DollarSign },
  { id: "users", label: "User Analytics", icon: Users },
  { id: "products", label: "Product Performance", icon: ShoppingCart },
];

export const salesData = [
  { name: "Jan", value: 4000, profit: 2400, expenses: 1600 },
  { name: "Feb", value: 3000, profit: 1398, expenses: 1602 },
  { name: "Mar", value: 2000, profit: 9800, expenses: 2000 },
  { name: "Apr", value: 2780, profit: 3908, expenses: 2000 },
  { name: "May", value: 1890, profit: 4800, expenses: 2181 },
  { name: "Jun", value: 2390, profit: 3800, expenses: 2500 },
];

export const categoryData = [
  { name: "Electronics", value: 4500 },
  { name: "Clothing", value: 3200 },
  { name: "Books", value: 2100 },
  { name: "Home & Garden", value: 1800 },
  { name: "Sports", value: 1200 },
];

export const userGrowthData = [
  { name: "Week 1", value: 1200 },
  { name: "Week 2", value: 1900 },
  { name: "Week 3", value: 1700 },
  { name: "Week 4", value: 2400 },
];

export const reportMetrics = [
  {
    title: "Total Sales",
    value: "$45,231",
    change: "+12.5%",
    icon: DollarSign,
    color: "green",
  },
  {
    title: "New Customers",
    value: "1,234",
    change: "+8.2%",
    icon: Users,
    color: "blue",
  },
  {
    title: "Orders",
    value: "892",
    change: "+5.7%",
    icon: ShoppingCart,
    color: "purple",
  },
  {
    title: "Growth Rate",
    value: "15.3%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "orange",
  },
];
