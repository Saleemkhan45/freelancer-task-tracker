import taskStore from "../../Store/taskStore";
import clientStore from "../../Store/clientStore";
import incomeStore from "../../Store/incomeStore";

export default function IncomeSummary() {
  const { tasks } = taskStore();
  const clients = clientStore((state) => state.clients);
  const { paidTasks, markAsPaid, markAsUnpaid } = incomeStore();

  const getClientRate = (id) =>
    clients.find((c) => c.id === id)?.rate || 0;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  const totalIncome = completedTasks.reduce((sum, task) => {
    return sum + task.hours * getClientRate(task.clientId);
  }, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Income Summary</h2>

      <p className="text-lg">
        Total Income: <b>${totalIncome}</b>
      </p>

      <div className="bg-white p-4 rounded">
        {completedTasks.map((task) => {
          const amount =
            task.hours * getClientRate(task.clientId);
          const isPaid = paidTasks.includes(task.id);

          return (
            <div
              key={task.id}
              className="flex justify-between border-b py-2"
            >
              <span>{task.title}</span>
              <span>${amount}</span>
              <button
                onClick={() =>
                  isPaid
                    ? markAsUnpaid(task.id)
                    : markAsPaid(task.id)
                }
                className={`px-3 py-1 rounded text-sm ${
                  isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {isPaid ? "Paid" : "Unpaid"}
              </button>
            </div>
          );
        })}

        {completedTasks.length === 0 && (
          <p className="text-gray-500">No completed tasks yet</p>
        )}
      </div>
    </div>
  );
}
