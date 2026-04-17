"use client";
import { Status, Task } from "@/lib/types";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Plus, Edit2, Trash2 } from "lucide-react";
import TaskModal from "./TaskModal";

const COLUMNS: { id: Status; title: string; color: string }[] = [
  { id: "Pending", title: "Pending", color: "bg-yellow-100 border-yellow-400" },
  {
    id: "In Progress",
    title: "In Progress",
    color: "bg-blue-100 border-blue-400",
  },
  {
    id: "Completed",
    title: "Completed",
    color: "bg-green-100 border-green-400",
  },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<"All" | Status>("All");
  // Load from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("kanban-tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);
  // Filter tasks based on selected status

  const addTask = (title: string, description: string, status: Status) => {
    const newTask: Task = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      title,
      description: description || undefined,
      status,
    };
    setTasks((prev) => [...prev, newTask]);
    setIsModalOpen(false);
  };

  const updateTask = (title: string, description: string, status: Status) => {
    if (!editingTask) return;
    const updatedTask: Task = {
      ...editingTask,
      title,
      description: description || undefined,
      status,
    };
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const deleteTask = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If dropped outside or no change
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const newStatus = destination.droppableId as Status;

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === draggableId) {
          return { ...task, status: newStatus }; // Optimistic update
        }
        return task;
      });
      return updatedTasks;
    });
  };

  // Filter tasks based on selected status
  const filteredTasks =
    filterStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  // Group tasks - this is the key fix
  const tasksByStatus = COLUMNS.reduce(
    (acc, column) => {
      if (filterStatus !== "All" && column.id !== filterStatus) {
        acc[column.id] = []; // Hide tasks in other columns
      } else {
        acc[column.id] = filteredTasks.filter(
          (task) => task.status === column.id,
        );
      }
      return acc;
    },
    {} as Record<Status, Task[]>,
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Mini Kanban Board
          </h1>

          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-3 ">
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "All" | Status)
              }
              className="border border-gray-300 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Tasks</option>
              <option value="Pending">Pending Only</option>
              <option value="In Progress">In Progress Only</option>
              <option value="Completed">Completed Only</option>
            </select>

            <button
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
              className="border border-gray-300 rounded-xl px-4 py-2.5 bg-white text-nowrap focus:outline-none  focus:border-blue-500"
            >
              <div className="flex items-center gap-2">
                <Plus size={20} /> Add New Card
              </div>
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLUMNS.map((column) => (
              <div
                key={column.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className={`p-4 border-b ${column.color}`}>
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800">
                      {column.title}
                    </h2>
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                      {tasksByStatus[column.id].length}
                    </span>
                  </div>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-height: 500px; p-4 transition-colors ${
                        snapshot.isDraggingOver ? "bg-gray-100" : ""
                      }`}
                    >
                      {tasksByStatus[column.id].map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white border border-gray-200 rounded-xl p-5 mb-3 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${
                                snapshot.isDragging ? "scale-105 shadow-lg" : ""
                              }`}
                            >
                              <div className="flex justify-between items-start gap-3">
                                <h3 className="font-medium text-lg text-gray-900 flex-1">
                                  {task.title}
                                </h3>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingTask(task);
                                      setIsModalOpen(true);
                                    }}
                                    className="text-gray-400 hover:text-blue-600 transition p-1"
                                  >
                                    <Edit2 size={18} />
                                  </button>
                                  <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-gray-400 hover:text-red-600 transition p-1"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>

                              {task.description && (
                                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                  {task.description}
                                </p>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={editingTask ? updateTask : addTask}
        initialTask={editingTask}
      />
    </div>
  );
}
