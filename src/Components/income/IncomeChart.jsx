import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import taskStore from "../../Store/taskStore";
import clientStore from "../../Store/clientStore";

export default function IncomeChart() {
  const { tasks } = taskStore();
  const { clients } = clientStore();

  const getRate = (id) =>
    clients.find((c) => c.id === id)?.rate || 0;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  const data = completedTasks.map((task) => ({
    name: task.title,
    income: task.hours * getRate(task.clientId),
  }));

  return (
    <div className="bg-white p-4 rounded">
      <h3 className="font-semibold mb-4">Income per Task</h3>

      {data.length === 0 ? (
        <p className="text-gray-500">No completed tasks</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
