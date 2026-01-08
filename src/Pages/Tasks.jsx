import TaskForm from ".././Components/tasks/TaskForm";
import TaskTable from ".././Components/tasks/TaskTable";

export default function Tasks() {
  return (
    <div className="space-y-6">
      <TaskForm />
      <TaskTable />
    </div>
  );
}
