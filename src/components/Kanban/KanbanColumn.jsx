import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

const KanbanColumn = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col h-full">
      <div className={`${column.color} rounded-lg p-4 mb-4`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {column.title}
          </h3>
          <span className="bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-200 px-2 py-1 rounded-full text-xs font-medium">
            {tasks.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 space-y-3 min-h-[200px] p-2 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50"
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
