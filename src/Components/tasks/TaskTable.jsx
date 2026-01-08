import { useState } from "react";
import taskStore from "../../Store/taskStore";
import clientStore from "../../Store/clientStore";

export default function TaskTable() {
  const { tasks, updateTask, deleteTask } = taskStore();
  const clients = clientStore((state) => state.clients);

  const [filter, setFilter] = useState("all");

  // Get client name by id
  const getClientName = (id) =>
    clients.find((c) => c.id === id)?.name || "Unknown";

  // Update task status
  const updateStatus = (task, status) => {
    updateTask({ ...task, status });
  };

  // Filtered tasks
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="bg-white p-4 rounded space-y-4">
      {/* Task Summary */}
      <p className="text-sm text-gray-600">
        Total: {tasks.length} | Completed:{" "}
        {tasks.filter((t) => t.status === "completed").length}
      </p>

      {/* Filters */}
      <div className="space-x-2">
        {["all", "pending", "in-progress", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded text-sm ${
              filter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">Task</th>
            <th>Client</th>
            <th>Hours</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="py-2">{task.title}</td>
              <td>{getClientName(task.clientId)}</td>
              <td>{task.hours}</td>

              {/* Status Badge */}
              <td>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {task.status}
                </span>
              </td>

              {/* Actions */}
              <td className="space-x-2">
                <button
                  disabled={task.status !== "pending"}
                  onClick={() => updateStatus(task, "in-progress")}
                  className="text-blue-500 disabled:opacity-40"
                >
                  Start
                </button>

                <button
                  disabled={task.status === "completed"}
                  onClick={() => updateStatus(task, "completed")}
                  className="text-green-500 disabled:opacity-40"
                >
                  Complete
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredTasks.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
