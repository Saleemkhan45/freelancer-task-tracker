import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Clients", path: "/clients" },
  { name: "Tasks", path: "/tasks" },
  { name: "Income", path: "/income" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Freelancer</h2>
      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
