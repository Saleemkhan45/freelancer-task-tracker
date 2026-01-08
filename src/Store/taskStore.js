import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],

  addTask: (task) =>
    set((state) => {
      const updated = [...state.tasks, task];
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  updateTask: (updatedTask) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  deleteTask: (id) =>
    set((state) => {
      const updated = state.tasks.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),
}));

export default useTaskStore;
