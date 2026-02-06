export default function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-5 mt-6">
      <h3 className="text-lg font-semibold mb-4">
        Transaction History
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Category</th>
              <th className="px-3 py-2 text-left">Division</th>
              <th className="px-3 py-2 text-right">Amount</th>
              <th className="px-3 py-2 text-center">Date</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(t => (
              <tr key={t.id} className="border-t hover:bg-gray-50">
                <td
                  className={`px-3 py-2 font-medium ${
                    t.type === "INCOME"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {t.type}
                </td>

                <td className="px-3 py-2">{t.category}</td>

                <td className="px-3 py-2">{t.division}</td>

                <td className="px-3 py-2 text-right font-semibold">
                  ₹ {t.amount}
                </td>

                <td className="px-3 py-2 text-center">
                  {new Date(t.createdAt).toLocaleDateString("en-GB")}
                </td>

                <td className="px-3 py-2 text-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                    onClick={() => onEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    onClick={() => onDelete(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {transactions.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
