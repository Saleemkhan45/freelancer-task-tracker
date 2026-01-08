import { useState } from "react";
import taskStore from "../../Store/taskStore"
import clientStore from "../../Store/clientStore";

export default function TaskForm() {
  const addTask = taskStore((state) => state.addTask);
  const clients = clientStore((state) => state.clients);

  const [form, setForm] = useState({
    title: "",
    clientId: "",
    hours: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      ...form,
      id: crypto.randomUUID(),
      status: "pending",
    });
    setForm({ title: "", clientId: "", hours: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded space-y-3">
      <input
        className="w-full border p-2 rounded"
        placeholder="Task Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <select
        className="w-full border p-2 rounded"
        value={form.clientId}
        onChange={(e) => setForm({ ...form, clientId: e.target.value })}
        required
      >
        <option value="">Select Client</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <input
        className="w-full border p-2 rounded"
        placeholder="Hours"
        type="number"
        value={form.hours}
        onChange={(e) => setForm({ ...form, hours: e.target.value })}
        required
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
