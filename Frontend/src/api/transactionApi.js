const BASE_URL = "http://localhost:8080/api/transactions";

export async function getAllTransactions() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function addTransaction(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateTransaction(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteTransaction(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
}
