export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
