import { create } from "zustand";

const useClientStore = create((set) => ({
  clients: JSON.parse(localStorage.getItem("clients")) || [],

  addClient: (client) =>
    set((state) => {
      const updated = [...state.clients, client];
      localStorage.setItem("clients", JSON.stringify(updated));
      return { clients: updated };
    }),

  deleteClient: (id) =>
    set((state) => {
      const updated = state.clients.filter((c) => c.id !== id);
      localStorage.setItem("clients", JSON.stringify(updated));
      return { clients: updated };
    }),

  updateClient: (updatedClient) =>
    set((state) => {
      const updated = state.clients.map((c) =>
        c.id === updatedClient.id ? updatedClient : c
      );
      localStorage.setItem("clients", JSON.stringify(updated));
      return { clients: updated };
    }),
}));

export default useClientStore;
