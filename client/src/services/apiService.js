// ✅ Dynamic API base URL (works locally and on Vercel)
const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:10000";

const API_URL = `${BASE_URL}/api/products`;

// 🔹 Fetch all products
export async function getProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// 🔹 Add new product
export async function addProduct(product) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
}

// 🔹 Update product by ID
export async function updateProduct(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

// 🔹 Delete product by ID
export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}
