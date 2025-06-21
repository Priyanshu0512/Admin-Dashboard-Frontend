import React, { createContext, useContext, useState } from "react";

const KanbanContext = createContext();

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error("useKanban must be used within a KanbanProvider");
  }
  return context;
};

const initialTasks = [
  {
    id: "1",
    title: "Design System Updates",
    description: "Update the design system components with new color palette",
    status: "todo",
    priority: "high",
    assignee: "Sarah Chen",
    dueDate: "2024-01-15",
    tags: ["design", "ui"],
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate the new payment gateway API",
    status: "in-progress",
    priority: "medium",
    assignee: "Mike Johnson",
    dueDate: "2024-01-20",
    tags: ["backend", "api"],
  },
  {
    id: "3",
    title: "User Testing",
    description: "Conduct user testing for the new dashboard",
    status: "review",
    priority: "low",
    assignee: "Emily Davis",
    dueDate: "2024-01-25",
    tags: ["testing", "ux"],
  },
  {
    id: "4",
    title: "Mobile Optimization",
    description: "Optimize the application for mobile devices",
    status: "done",
    priority: "high",
    assignee: "Alex Wilson",
    dueDate: "2024-01-10",
    tags: ["mobile", "frontend"],
  },
  {
    id: "5",
    title: "Database Migration",
    description: "Migrate user data to the new database schema",
    status: "todo",
    priority: "high",
    assignee: "David Brown",
    dueDate: "2024-01-18",
    tags: ["database", "backend"],
  },
  {
    id: "6",
    title: "Performance Optimization",
    description: "Improve application loading times and performance",
    status: "in-progress",
    priority: "medium",
    assignee: "Lisa Garcia",
    dueDate: "2024-01-22",
    tags: ["performance", "optimization"],
  },
];

const columns = [
  { id: "todo", title: "To Do", color: "bg-gray-100 dark:bg-gray-800" },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-blue-100 dark:bg-gray-700",
  },
  { id: "review", title: "Review", color: "bg-yellow-100 dark:bg-gray-700" },
  { id: "done", title: "Done", color: "bg-green-100 dark:bg-gray-700" },
];

export const KanbanProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      status: "todo",
    };
    setAllTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (taskId, updates) => {
    setAllTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (taskId) => {
    setAllTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const getFilteredTasks = () => {
    if (filter === "all") return allTasks;
    return allTasks.filter((task) => task.priority === filter);
  };

  return (
    <KanbanContext.Provider
      value={{
        tasks: getFilteredTasks(),
        allTasks,
        columns,
        filter,
        setFilter,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};
