export default function FilterBar({ setDivision, setCategory }) {
  return (
    <div className="filter-card">
      <h3 className="font-semibold mb-2">Filter Transactions</h3>

      <div className="filter-row">
        <select
          onChange={(e) => setDivision(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="ALL">All Divisions</option>
          <option value="PERSONAL">Personal</option>
          <option value="OFFICE">Office</option>
        </select>

        <select
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="ALL">All Categories</option>
          <option value="Food">Food</option>
          <option value="Fuel">Fuel</option>
          <option value="Movie">Movie</option>
          <option value="Medical">Medical</option>
          <option value="Salary">Salary</option>
          <option value="House Appliances">House Appliances</option>
          <option value="Electronics">Electronics</option>
          <option value="LifeStyle Fashion">LifeStyle Fashion</option>
          <option value="Others">Others</option>
        </select>
      </div>
    </div>
  );
}