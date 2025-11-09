import React, { useState, useEffect } from "react";
import { getProducts, updateProduct, deleteProduct } from "../services/apiService";
import { useAuth } from "../context/AuthContext";

const stages = [
  "Ordered",
  "RMS Processing",
  "Manufacturing",
  "Distribution",
  "Retail",
  "Sold",
];

function Supply() {
  const [products, setProducts] = useState([]);
  const [updates, setUpdates] = useState({});
  const [feedback, setFeedback] = useState("");
  const { user } = useAuth() || {};
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");

  // ✅ Load user info (from context or localStorage)
  useEffect(() => {
    if (user) {
      setUserRole(user.role);
      setUsername(user.username);
    } else {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserRole(parsed.role);
        setUsername(parsed.username);
      }
    }
  }, [user]);

  // ✅ Fetch all products
  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const handleStatusChange = (id, value) => {
    setUpdates((prev) => ({ ...prev, [id]: parseInt(value) }));
  };

  // ✅ Handle update logic
  const handleUpdate = async (product) => {
    const nextStage = updates[product.id || product._id];
    const currentStage = product.stage || 0;

    if (nextStage !== currentStage + 1) {
      setFeedback("⚠️ Please select the correct next stage.");
      setTimeout(() => setFeedback(""), 2000);
      return;
    }

    // Restrict updates
    if (userRole !== "owner" && userRole !== stages[currentStage]) {
      setFeedback("🚫 You can only update your assigned stage.");
      setTimeout(() => setFeedback(""), 2500);
      return;
    }

    try {
      // ✅ Store username of who updated this stage
      await updateProduct(product.id || product._id, {
        stage: nextStage,
        completedBy: {
          ...product.completedBy,
          [stages[nextStage]]: username || userRole,
        },
      });

      setFeedback("✅ Updated successfully!");
      const refreshed = await getProducts();
      setProducts(refreshed);
      setTimeout(() => setFeedback(""), 1500);
    } catch (error) {
      console.error(error);
      setFeedback("❌ Update failed");
    }
  };

  // ✅ Delete (owner only)
  const handleDelete = async (id) => {
    if (userRole !== "owner") {
      setFeedback("🚫 Only the owner can delete products.");
      setTimeout(() => setFeedback(""), 2000);
      return;
    }

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => (p.id || p._id) !== id));
      setFeedback("🗑️ Deleted successfully!");
      setTimeout(() => setFeedback(""), 1500);
    } catch (error) {
      console.error(error);
      setFeedback("❌ Delete failed");
    }
  };

  // ✅ Permission check
  const canUpdate = (product) => {
    const currentStage = stages[product.stage || 0];
    if (userRole === "owner") return true;
    return userRole === currentStage;
  };

  return (
    <div
      className="page-container"
      style={{
        fontFamily: "Poppins, sans-serif",
        padding: "30px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1
        className="main-title"
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "20px",
        }}
      >
        Supply Chain Management
      </h1>

      {feedback && (
        <div
          className="feedback"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          {feedback}
        </div>
      )}

      <table
        className="styled-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.95rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#f5f5f5" }}>
          <tr>
            <th style={{ padding: "12px" }}>Product</th>
            <th style={{ padding: "12px" }}>Description</th>
            <th style={{ padding: "12px" }}>Current Stage</th>
            <th style={{ padding: "12px" }}>Timestamp</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
                No products found
              </td>
            </tr>
          )}

          {products.map((p) => (
            <tr
              key={p.id || p._id}
              style={{
                borderBottom: "1px solid #ddd",
                textAlign: "center",
                lineHeight: "1.6",
              }}
            >
              <td style={{ padding: "10px" }}>{p.name}</td>
              <td style={{ padding: "10px" }}>{p.description}</td>
              <td style={{ padding: "10px" }}>{stages[p.stage || 0]}</td>
              <td style={{ padding: "10px" }}>
                {p.timestamp ? new Date(p.timestamp).toLocaleDateString() : ""}
              </td>
              <td style={{ padding: "10px" }}>
                {canUpdate(p) && (p.stage || 0) < stages.length - 1 ? (
                  <>
                    <select
                      value={updates[p.id || p._id] || ""}
                      onChange={(e) =>
                        handleStatusChange(p.id || p._id, e.target.value)
                      }
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        fontSize: "0.9rem",
                        border: "1px solid #ccc",
                        outline: "none",
                      }}
                    >
                      <option value="">Next Stage</option>
                      <option value={(p.stage || 0) + 1}>
                        {stages[(p.stage || 0) + 1]}
                      </option>
                    </select>
                    <button
                      onClick={() => handleUpdate(p)}
                      disabled={updates[p.id || p._id] !== (p.stage || 0) + 1}
                      style={{
                        marginLeft: 10,
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "none",
                        cursor:
                          updates[p.id || p._id] === (p.stage || 0) + 1
                            ? "pointer"
                            : "not-allowed",
                        opacity:
                          updates[p.id || p._id] === (p.stage || 0) + 1 ? 1 : 0.6,
                        fontSize: "0.9rem",
                      }}
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <span style={{ fontSize: "0.9rem", color: "#777" }}>
                    No action
                  </span>
                )}

                {userRole === "owner" && (
                  <button
                    onClick={() => handleDelete(p.id || p._id)}
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      border: "none",
                      padding: "6px 10px",
                      marginLeft: 12,
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p style={{ fontSize: "0.95rem", color: "#555" }}>
          Logged in as: <b>{username || "guest"}</b> ({userRole || "guest"})
        </p>
      </div>
    </div>
  );
}

export default Supply;
