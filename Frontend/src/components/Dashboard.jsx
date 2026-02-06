import { useState, useMemo } from "react";

export default function Dashboard({ transactions }) {
  const [period, setPeriod] = useState("MONTHLY");

  // filter transactions based on period
  const filteredByPeriod = useMemo(() => {
    const now = new Date();

    return transactions.filter(t => {
      const d = new Date(t.createdAt);

      if (period === "WEEKLY") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return d >= weekAgo;
      }

      if (period === "MONTHLY") {
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }

      if (period === "YEARLY") {
        return d.getFullYear() === now.getFullYear();
      }

      return true;
    });
  }, [transactions, period]);

  // calculate totals
  const totalIncome = filteredByPeriod
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredByPeriod
    .filter(t => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Income</p>
          <h3 className="text-2xl font-bold text-green-600">
            ₹ {totalIncome}
          </h3>
          <p className="text-sm text-gray-400">{period}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Expense</p>
          <h3 className="text-2xl font-bold text-red-600">
            ₹ {totalExpense}
          </h3>
          <p className="text-sm text-gray-400">{period}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Balance</p>
          <h3 className="text-2xl font-bold text-blue-600">
            ₹ {balance}
          </h3>
          <p className="text-sm text-gray-400">{period}</p>
        </div>
      </div>
    </div>
  );
}
