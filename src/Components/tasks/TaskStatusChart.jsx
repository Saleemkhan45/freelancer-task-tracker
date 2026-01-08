import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import taskStore from "../../Store/taskStore";

export default function TaskStatusChart() {
  const { tasks } = taskStore();

  const data = [
    {
      name: "Pending",
      value: tasks.filter((t) => t.status === "pending").length,
    },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
    },
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
    },
  ];

  return (
    <div className="bg-white p-4 rounded">
      <h3 className="font-semibold mb-4">Task Status Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
