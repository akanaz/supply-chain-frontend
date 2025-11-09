import React, { useEffect, useState } from "react";
import { getProducts } from "../services/apiService";
import ordered from "../assets/ordered.png";
import rms from "../assets/rms.png";
import manufacturing from "../assets/manufacturing.png";
import distribution from "../assets/distribution.png";
import retail from "../assets/retail.png";
import sold from "../assets/sold.png";

const stageLabels = [
  "Ordered",
  "RMS Processing",
  "Manufacturing",
  "Distribution",
  "Retail",
  "Sold",
];
const stageIcons = [ordered, rms, manufacturing, distribution, retail, sold];

function Track() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts().then((prods) => {
      setProducts(prods);
      if (prods.length) {
        setSelectedProductId(prods[0].id || prods[0]._id);
        setSelectedProduct(prods[0]);
      }
    });
  }, []);

  useEffect(() => {
    setSelectedProduct(
      products.find((p) => (p.id || p._id) === selectedProductId)
    );
  }, [selectedProductId, products]);

  return (
    <div className="page-container" style={{ maxWidth: 770, margin: "auto" }}>
      <h1 className="main-title" style={{ marginBottom: 28 }}>
        Track Product Status
      </h1>

      {products.length === 0 ? (
        <div className="feedback">No products found. Please add one.</div>
      ) : (
        <>
          <label
            htmlFor="productSelect"
            style={{
              color: "#ccc",
              fontWeight: 700,
              fontSize: "1.23rem",
            }}
          >
            Select Product:
          </label>
          <select
            id="productSelect"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            style={{
              width: "100%",
              fontSize: "1.22rem",
              padding: "14px 18px",
              margin: "14px 0 40px",
              borderRadius: "14px",
              background: "#1e1e2d",
              color: "#eee",
              border: "none",
              boxShadow: "inset 0 2px 8px #0008",
              cursor: "pointer",
            }}
          >
            {products.map((p) => (
              <option key={p.id || p._id} value={p.id || p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {selectedProduct && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                background: "#242434",
                borderRadius: 20,
                boxShadow: "0 10px 45px #000c",
                padding: "36px 24px",
                flexWrap: "wrap",
                gap: "46px",
                marginBottom: 22,
              }}
            >
              {stageLabels.map((stage, idx) => {
                const done = idx <= (selectedProduct.stage || 0);
                const completedBy =
                  selectedProduct.completedBy?.[stage] || null;

                return (
                  <div
                    key={stage}
                    style={{
                      maxWidth: 110,
                      textAlign: "center",
                      color: done ? "#cfb4ff" : "#555",
                      fontWeight: done ? 700 : 400,
                      userSelect: "none",
                      transition: "color 0.3s",
                    }}
                  >
                    <img
                      src={stageIcons[idx]}
                      alt={stage}
                      style={{
                        width: 66,
                        height: 66,
                        filter: done
                          ? "drop-shadow(0 0 25px #cfb4ff)"
                          : "grayscale(100%)",
                        marginBottom: 14,
                        borderRadius: 14,
                        transition: "filter 0.3s",
                      }}
                    />
                    <div style={{ fontSize: "1.13rem", marginBottom: 4 }}>
                      {stage}
                    </div>

                    {/* ✅ Show who completed this stage */}
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "0.9rem",
                        lineHeight: "1.3",
                        color: done ? "#ddd" : "#777",
                        minHeight: 35,
                      }}
                    >
                      {completedBy
                        ? completedBy // username saved by Supply.jsx
                        : done
                        ? "Completed"
                        : "-"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Track;
