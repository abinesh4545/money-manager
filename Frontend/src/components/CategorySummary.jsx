export default function CategorySummary({ transactions }) {
  const summary = {};

  transactions.forEach(t => {
    summary[t.category] = (summary[t.category] || 0) + t.amount;
  });

  return (
    <div className="bg-white p-5 mt-6 rounded shadow">
      {Object.entries(summary).map(([cat, amt]) => (
        <div key={cat} className="flex justify-between">
          <span>{cat}</span>
          <span>₹ {amt}</span>
        </div>
      ))}
    </div>
  );
}
