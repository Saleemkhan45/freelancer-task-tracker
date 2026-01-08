import taskStore from '../../Store/taskStore'
import clientStore from "../../Store/clientStore";

export default function TaskTable() {
  const { tasks, updateTask, deleteTask } = taskStore();
  const clients = clientStore((state) => state.clients);

  const getClientName = (id) =>
    clients.find((c) => c.id === id)?.name || "Unknown";

  const updateStatus = (task, status) => {
    updateTask({ ...task, status });
  };

  return (
    <div className="bg-white p-4 rounded">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Task</th>
            <th>Client</th>
            <th>Hours</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td>{task.title}</td>
              <td>{getClientName(task.clientId)}</td>
              <td>{task.hours}</td>
              <td>{task.status}</td>
              <td className="space-x-2">
                <button
                  onClick={() => updateStatus(task, "in-progress")}
                  className="text-blue-500"
                >
                  Start
                </button>
                <button
                  onClick={() => updateStatus(task, "completed")}
                  className="text-green-500"
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
        </tbody>
      </table>
    </div>
  );
}
