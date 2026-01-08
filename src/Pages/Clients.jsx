import { useState } from "react";
import ClientForm from "../Components/clients/ClientForm";
import ClientList from "../Components/clients/ClientList";

export default function Clients() {
  const [editingClient, setEditingClient] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ClientForm
        editingClient={editingClient}
        setEditingClient={setEditingClient}
      />
      <ClientList setEditingClient={setEditingClient} />
    </div>
  );
}
