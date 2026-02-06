import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#f97316"];

export default function Graphs({ transactions }) {

  // 1️⃣ Income vs Expense
  const income = transactions
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const incomeExpenseData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense }
  ];

  // 2️⃣ Category-wise Expense
  const categoryMap = {};
  transactions
    .filter(t => t.type === "EXPENSE")
    .forEach(t => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    });

  const categoryData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  // 3️⃣ Date Trend
  const trendMap = {};
  transactions.forEach(t => {
    const date = t.createdAt?.slice(0, 10);
    trendMap[date] = (trendMap[date] || 0) + t.amount;
  });

  const trendData = Object.keys(trendMap).map(date => ({
    date,
    amount: trendMap[date]
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

      {/* Income vs Expense */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={incomeExpenseData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Pie */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Category Wise Expense</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
            >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Trend */}
      <div className="bg-white p-4 rounded shadow md:col-span-2">
        <h3 className="font-semibold mb-3">Spending Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#22c55e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}