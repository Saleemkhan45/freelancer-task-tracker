import useClientStore from "../../Store/clientStore";

export default function ClientList({ setEditingClient }) {
  const { clients, deleteClient } = useClientStore();

  return (
    <div className="space-y-3">
      {clients.map((client) => (
        <div
          key={client.id}
          className="bg-white p-4 rounded flex justify-between"
        >
          <div>
            <p className="font-semibold">{client.name}</p>
            <p className="text-sm text-gray-500">{client.email}</p>
            <p className="text-sm">Rate: ${client.rate}/hr</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => setEditingClient(client)}
              className="text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => deleteClient(client.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
