export default function DateFilter({ setFromDate, setToDate }) {
  return (
    <div className="filter-card">
      <h3 className="font-semibold mb-3">Filter by Date</h3>

      <div className="filter-row">
        {/* FROM */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">From</label>
          <input
            type="date"
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* TO */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">To</label>
          <input
            type="date"
            onChange={(e) => setToDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>
      </div>
    </div>
  );
}