import { useState, useEffect } from "react";
import useClientStore from "../../Store/clientStore";

export default function ClientForm({ editingClient, setEditingClient }) {
  const { addClient, updateClient } = useClientStore();
  const [form, setForm] = useState({ name: "", email: "", rate: "" });

  useEffect(() => {
    if (editingClient) {
      setForm(editingClient);
    }
  }, [editingClient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      updateClient(form);
      setEditingClient(null);
    } else {
      addClient({ ...form, id: crypto.randomUUID() });
    }
    setForm({ name: "", email: "", rate: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded">
      <input
        className="w-full border p-2 rounded"
        placeholder="Client Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Hourly Rate"
        type="number"
        value={form.rate}
        onChange={(e) => setForm({ ...form, rate: e.target.value })}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {editingClient ? "Update Client" : "Add Client"}
      </button>
    </form>
  );
}
