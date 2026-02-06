import { useEffect, useState } from "react";

export default function AddTransactionModal({ onClose, onSave, editData }) {
  const [type, setType] = useState("EXPENSE");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [division, setDivision] = useState("PERSONAL");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // Prefill data when editing
  useEffect(() => {
    if (editData) {
      setType(editData.type);
      setAmount(editData.amount);
      setCategory(editData.category);
      setDivision(editData.division);
      setDescription(editData.description || "");
      setDate(editData.createdAt?.substring(0, 10));
    }
  }, [editData]);

  function submit() {
    if (!amount || !category || !date) {
      alert("Please fill all required fields");
      return;
    }

    onSave({
      type,
      amount: Number(amount),
      category,
      division,
      description,
      createdAt: `${date}T00:00:00`
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            {editData ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button onClick={onClose} className="text-gray-500 text-xl">✕</button>
        </div>

        <div className="space-y-4">
          
          {/* Type */}
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="INCOME">INCOME</option>
            <option value="EXPENSE">EXPENSE</option>
          </select>

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          {/* Category */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
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

          {/* Division */}
          <select
            value={division}
            onChange={e => setDivision(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="PERSONAL">PERSONAL</option>
            <option value="OFFICE">OFFICE</option>
          </select>

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          {/* Description */}
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="3"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}