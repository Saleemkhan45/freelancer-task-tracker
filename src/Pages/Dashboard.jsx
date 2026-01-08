import StatCard from "../Components/StatCard";
import taskStore from "../Store/taskStore";
import clientStore from "../Store/clientStore";
import incomeStore from "../Store/incomeStore";

export default function Dashboard() {
  const { tasks } = taskStore();
  const { clients } = clientStore();
  const { paidTasks } = incomeStore();

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  const unpaidTasks = completedTasks.filter(
    (task) => !paidTasks.includes(task.id)
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Clients" value={clients.length} />
        <StatCard title="Total Tasks" value={tasks.length} />
        <StatCard
          title="Completed Tasks"
          value={completedTasks.length}
        />
        <StatCard
          title="Unpaid Tasks"
          value={unpaidTasks.length}
        />
      </div>
    </div>
  );
}
