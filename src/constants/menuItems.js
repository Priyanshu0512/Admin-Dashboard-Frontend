import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Calendar,
  Trello,
  Table,
  Settings,
} from "lucide-react";

export const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "kanban", label: "Kanban", icon: Trello },
  { id: "tables", label: "Tables", icon: Table },
  { id: "settings", label: "Settings", icon: Settings },
];
