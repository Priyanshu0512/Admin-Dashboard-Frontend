import { TrendingUp, Users, Eye, Clock } from "lucide-react";

export const performanceData = [
  { name: "Mon", value: 2400, users: 400, sessions: 240 },
  { name: "Tue", value: 1398, users: 300, sessions: 139 },
  { name: "Wed", value: 9800, users: 200, sessions: 980 },
  { name: "Thu", value: 3908, users: 278, sessions: 390 },
  { name: "Fri", value: 4800, users: 189, sessions: 480 },
  { name: "Sat", value: 3800, users: 239, sessions: 380 },
  { name: "Sun", value: 4300, users: 349, sessions: 430 },
];

export const trafficSourceData = [
  { name: "Organic Search", value: 4500 },
  { name: "Direct", value: 3200 },
  { name: "Social Media", value: 2100 },
  { name: "Email", value: 1800 },
  { name: "Referral", value: 1200 },
];

export const conversionData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 59 },
  { name: "Mar", value: 80 },
  { name: "Apr", value: 81 },
  { name: "May", value: 56 },
  { name: "Jun", value: 55 },
  { name: "Jul", value: 74 },
];
export const keyMetrics = [
  {
    label: "Page Views",
    value: "247K",
    change: "+12.3%",
    icon: Eye,
    color: "blue",
  },
  {
    label: "Unique Visitors",
    value: "89K",
    change: "+8.7%",
    icon: Users,
    color: "green",
  },
  {
    label: "Avg. Session Duration",
    value: "4m 32s",
    change: "+5.2%",
    icon: Clock,
    color: "purple",
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "+0.8%",
    icon: TrendingUp,
    color: "orange",
  },
];
