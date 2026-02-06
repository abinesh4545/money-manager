import * as XLSX from "xlsx";

export function exportTransactionsToExcel(transactions) {
  const data = transactions.map(t => ({
    Type: t.type,
    Category: t.category,
    Division: t.division,
    Amount: t.amount,
    Description: t.description,
    Date: new Date(t.createdAt).toLocaleDateString()
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

  XLSX.writeFile(workbook, "Money_Manager_Transactions.xlsx");
}