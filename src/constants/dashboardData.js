import { TrendingUp, Users, DollarSign, ShoppingCart } from "lucide-react";
export const stats = [
  {
    title: "Total Revenue",
    value: "$54,239",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Active Users",
    value: "2,847",
    change: "+5.2%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Orders",
    value: "1,234",
    change: "-2.1%",
    trend: "down",
    icon: ShoppingCart,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    title: "Growth Rate",
    value: "23.1%",
    change: "+8.3%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
];

export const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
];

export const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Books", value: 200 },
  { name: "Home", value: 278 },
  { name: "Sports", value: 189 },
];

export const userGrowthData = [
  { name: "Week 1", value: 1200 },
  { name: "Week 2", value: 1900 },
  { name: "Week 3", value: 1700 },
  { name: "Week 4", value: 2400 },
  { name: "Week 5", value: 2100 },
  { name: "Week 6", value: 2800 },
];
