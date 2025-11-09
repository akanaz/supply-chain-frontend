import React, { useState } from "react";
import { addProduct } from "../services/apiService";

function AddMed() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [supplier, setSupplier] = useState("Supplier Co.");
  const [feedback, setFeedback] = useState("");

  const suppliers = [
    "Supplier Co.", "Raw Materials Inc", "Manufacturing Co", "Quick Dispatch", "Retail Store 1"
  ];

  const handleAdd = async () => {
    if (!name || !description) {
      setFeedback("Fill all fields.");
      return;
    }
    await addProduct({ name, description, supplier });
    setFeedback("Added!");
    setName(""); setDescription(""); setSupplier(suppliers[0]);
    setTimeout(() => setFeedback(""), 1200);
  };

  return (
    <div className="page-container">
      <h1 className="main-title">Add New Product</h1>
      <div className="add-product-box">
        <label>Product Name</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <label>Supplier</label>
        <select value={supplier} onChange={e => setSupplier(e.target.value)}>
          {suppliers.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="btn-submit" onClick={handleAdd}>Add Product</button>
        {feedback && <div className="feedback">{feedback}</div>}
      </div>
    </div>
  );
}
export default AddMed;
