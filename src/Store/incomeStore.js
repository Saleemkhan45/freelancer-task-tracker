import { create } from "zustand";

const useIncomeStore = create((set) => ({
  paidTasks: JSON.parse(localStorage.getItem("paidTasks")) || [],

  markAsPaid: (taskId) =>
    set((state) => {
      const updated = [...state.paidTasks, taskId];
      localStorage.setItem("paidTasks", JSON.stringify(updated));
      return { paidTasks: updated };
    }),

  markAsUnpaid: (taskId) =>
    set((state) => {
      const updated = state.paidTasks.filter((id) => id !== taskId);
      localStorage.setItem("paidTasks", JSON.stringify(updated));
      return { paidTasks: updated };
    }),
}));

export default useIncomeStore;
