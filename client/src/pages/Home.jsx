import React from "react";
import banner from "../assets/supply_chain_banner.png"; // Replace with your asset path

function Home() {
  return (
    <div className="page-container" style={{
        padding: "40px 28px",
        maxWidth: 960,
        margin: "auto",
        background: "#23242b",
        borderRadius: "18px",
        boxShadow: "0 14px 50px #000A"
      }}>
      <div style={{
        display: "flex", flexDirection: "row", alignItems: "center",
        gap: 36, flexWrap: "wrap", justifyContent: "center"
      }}>
        <img
          src={banner}
          alt="Supply chain illustration"
          style={{
            width: 330,
            borderRadius: "14px",
            boxShadow: "0 7px 28px #0003",
            marginBottom: "16px"
          }}
        />
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1 style={{
            fontWeight: 900,
            fontSize: "2.9rem",
            color: "#a480f2",
            marginBottom: "18px",
            letterSpacing: 1,
            fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif"
          }}>
            Welcome to Product Supply Chain
          </h1>
          <p style={{
            fontSize: "1.35rem",
            color: "#ededed",
            lineHeight: 1.6,
            marginBottom: 15,
            fontWeight: 550,
            fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif"
          }}>
            Track, update, and manage your entire product journey in an intuitive, secure, and visually engaging interface. Leverage real-time updates and role-based controls for every stakeholder in the supply chain!
          </p>
        </div>
      </div>
      <div style={{
        marginTop: 28,
        fontStyle: "italic",
        color: "#bbb",
        fontWeight: 600,
        fontSize: "1.18rem",
        textAlign: "center"
      }}>
        Raw Material Supplier → Manufacturer → Distributor → Retailer → Consumer
      </div>
    </div>
  );
}

export default Home;
