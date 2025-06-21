import React, { createContext, useContext, useState } from "react";
import { initialTasks } from "../constants/kanbanTask";
const KanbanContext = createContext();

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error("useKanban must be used within a KanbanProvider");
  }
  return context;
};

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
