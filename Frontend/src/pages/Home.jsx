import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import AddTransactionModal from "../components/AddTransactionModal";
import TransactionList from "../components/TransactionList";
import DateFilter from "../components/DateFilter";
import CategorySummary from "../components/CategorySummary";
import FilterBar from "../components/FilterBar";
import { exportTransactionsToExcel } from "../utils/exportExcel";
import {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction
} from "../api/transactionApi";
import Graphs from "../components/Graphs";
export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  
  const [division, setDivision] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const data = await getAllTransactions();
    setTransactions(data);
    setFiltered(data);
  }

  useEffect(() => {
    let temp = [...transactions];

    if (division !== "ALL")
      temp = temp.filter(t => t.division === division);

    if (category !== "ALL")
      temp = temp.filter(t => t.category === category);

    if (fromDate && toDate) {
      temp = temp.filter(t => {
        const d = new Date(t.createdAt);
        return d >= new Date(fromDate) && d <= new Date(toDate);
      });
    }

    setFiltered(temp);
  }, [division, category, fromDate, toDate, transactions]);

  async function handleSave(data) {
    if (editData) {
      await updateTransaction(editData.id, data);
    } else {
      await addTransaction(data);
    }
    setOpen(false);
    setEditData(null);
    loadTransactions();
  }

  async function handleDelete(id) {
    if (window.confirm("Delete transaction?")) {
      await deleteTransaction(id);
      loadTransactions();
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1
  className="
    text-5xl
    font-extrabold
    leading-relaxed
    tracking-tight
    bg-gradient-to-r from-blue-600 to-emerald-500
    bg-clip-text
    text-transparent
    pb-2
  "
>
  Money Manager
</h1>
  <div className="flex gap-3">
    <button
      onClick={() => exportTransactionsToExcel(filtered)}
      className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded text-sm"
    >
      Export Excel
    </button>

    <button
      onClick={() => setOpen(true)}
      className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
    >
      + Add
    </button>
  </div>
</div>

      <Dashboard transactions={filtered} />
      
      <div className="filter-container">
  <DateFilter
    setFromDate={setFromDate}
    setToDate={setToDate}
  />

  <FilterBar
    setDivision={setDivision}
    setCategory={setCategory}
  />
</div>
      <TransactionList
        transactions={filtered}
        onEdit={t => {
          setEditData(t);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      <CategorySummary transactions={filtered} />
      <Graphs transactions={filtered} />

      {open && (
        <AddTransactionModal
          onClose={() => {
            setOpen(false);
            setEditData(null);
          }}
          onSave={handleSave}
          editData={editData}
        />
      )}
    </div>
  );
}
