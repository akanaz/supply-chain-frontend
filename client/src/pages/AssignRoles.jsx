import React, { useState, useEffect } from "react";

// Helper function to generate random credentials
const generateCredentials = (username) => {
  const id =
    username.toLowerCase().replace(/\s+/g, "") +
    "_" +
    Math.floor(1000 + Math.random() * 9000);
  const password = Math.random().toString(36).slice(-8); // random 8-char password
  return { id, password };
};

// Map short stage codes to full descriptive roles
const stageRoleMap = {
  RMS: "RMS Processing",
  MAN: "Manufacturing",
  DIS: "Distribution",
  RET: "Retail",
};

function AssignRoles() {
  // Load existing roles from localStorage or initialize defaults
  const [roles, setRoles] = useState(() => {
    const saved = localStorage.getItem("roles");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        username: "owner",
        role: "owner",
        supplyChainType: "Owner",
        password: "owner123",
      },
      {
        id: 2,
        username: "rmsUser",
        role: "RMS Processing",
        supplyChainType: "RMS",
        password: "rms@123",
      },
      {
        id: 3,
        username: "manUser",
        role: "Manufacturing",
        supplyChainType: "MAN",
        password: "man@123",
      },
      {
        id: 4,
        username: "disUser",
        role: "Distribution",
        supplyChainType: "DIS",
        password: "dis@123",
      },
      {
        id: 5,
        username: "retUser",
        role: "Retail",
        supplyChainType: "RET",
        password: "ret@123",
      },
    ];
  });

  const [newUser, setNewUser] = useState("");
  const [newRole, setNewRole] = useState("RMS");
  const [message, setMessage] = useState("");
  const [newCredentials, setNewCredentials] = useState(null);

  const supplyChainStages = ["RMS", "MAN", "DIS", "RET"];

  // ✅ Sync roles to localStorage
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  const handleAddRole = () => {
    if (!newUser.trim()) {
      setMessage("❌ Please enter a username.");
      return;
    }

    const exists = roles.find(
      (r) => r.username.toLowerCase() === newUser.toLowerCase()
    );
    if (exists) {
      setMessage("❌ User already exists.");
      return;
    }

    const { id, password } = generateCredentials(newUser);

    const stageRole = stageRoleMap[newRole] || "Member";

    const newEntry = {
      id: Math.max(...roles.map((r) => r.id)) + 1,
      username: newUser,
      role: stageRole,
      supplyChainType: newRole,
      userId: id,
      password,
    };

    setRoles([...roles, newEntry]);
    setNewCredentials({
      username: newUser,
      id,
      password,
      role: stageRole,
    });
    setMessage("✅ User role assigned successfully!");
    setNewUser("");
    setNewRole("RMS");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleRemoveRole = (id) => {
    const updated = roles.filter((r) => r.id !== id);
    setRoles(updated);
    setMessage("🗑️ User removed successfully!");
    setNewCredentials(null);
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <div className="page-container">
      <h1 className="main-title">👥 Assign Supply Chain Roles</h1>

      {/* Add new user */}
      <div
        style={{
          background: "#23233c",
          borderRadius: "22px",
          maxWidth: 540,
          margin: "40px auto 0",
          boxShadow: "0 10px 45px #000b",
          padding: "40px 36px",
          marginBottom: 32,
        }}
      >
        <h3 style={{ color: "#bb86fc", fontSize: "1.4rem", marginBottom: 20 }}>
          Add New User
        </h3>

        <div style={{ marginBottom: 18 }}>
          <label
            style={{
              fontWeight: 700,
              marginBottom: 9,
              color: "#c0b8e8",
              fontSize: "1.12rem",
              display: "block",
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            placeholder="Enter username"
            style={{
              width: "100%",
              background: "#1e1e2d",
              color: "#fff",
              border: "none",
              borderRadius: "11px",
              padding: "14px 16px",
              fontSize: "1.12rem",
              boxShadow: "inset 0 2px 7px #0007",
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              fontWeight: 700,
              marginBottom: 9,
              color: "#c0b8e8",
              fontSize: "1.12rem",
              display: "block",
            }}
          >
            Supply Chain Stage
          </label>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            style={{
              width: "100%",
              background: "#1e1e2d",
              color: "#fff",
              border: "none",
              borderRadius: "11px",
              padding: "14px 16px",
              fontSize: "1.12rem",
              boxShadow: "inset 0 2px 7px #0007",
            }}
          >
            {supplyChainStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage} ({stageRoleMap[stage]})
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn-submit"
          onClick={handleAddRole}
          style={{
            width: "100%",
            fontSize: "1.15rem",
            padding: "15px 0",
            marginTop: 0,
          }}
        >
          Assign Role
        </button>

        {message && (
          <div
            style={{
              marginTop: 18,
              padding: "12px",
              borderRadius: "10px",
              backgroundColor: message.includes("❌") ? "#3c2020" : "#1c3c2c",
              color: message.includes("❌") ? "#ff6b6b" : "#12eec0",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            {message}
          </div>
        )}

        {/* ✅ Display new user credentials */}
        {newCredentials && (
          <div
            style={{
              backgroundColor: "#1e1e2d",
              marginTop: 20,
              padding: "15px",
              borderRadius: "10px",
              color: "#eee",
              textAlign: "center",
              boxShadow: "inset 0 2px 6px #0006",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: 5 }}>
              🆕 New User Created:
            </p>
            <p>
              <b>Username:</b> {newCredentials.username}
            </p>
            <p>
              <b>User ID:</b> {newCredentials.id}
            </p>
            <p>
              <b>Password:</b> {newCredentials.password}
            </p>
            <p>
              <b>Role:</b> {newCredentials.role}
            </p>
          </div>
        )}
      </div>

      {/* Existing Users */}
      <div
        style={{
          background: "#23233c",
          borderRadius: "22px",
          maxWidth: 540,
          margin: "0 auto",
          boxShadow: "0 10px 45px #000b",
          padding: "40px 36px",
        }}
      >
        <h3 style={{ color: "#bb86fc", fontSize: "1.4rem", marginBottom: 22 }}>
          Current Users & Roles
        </h3>

        {roles.length === 0 ? (
          <p style={{ color: "#888", fontSize: "1.1rem" }}>
            No users assigned yet.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {roles.map((role) => (
              <div
                key={role.id}
                style={{
                  background: "#1e1e2d",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "inset 0 2px 7px #0007",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      color: "#eee",
                    }}
                  >
                    {role.username}
                  </div>
                  <div style={{ fontSize: "0.98rem", color: "#b2b2b2" }}>
                    Stage:{" "}
                    <span
                      style={{ color: "#bb86fc", fontWeight: 600 }}
                    >
                      {role.role}
                    </span>
                    <br />
                    <span style={{ color: "#999" }}>
                      ID: {role.userId || "N/A"} | PW:{" "}
                      {role.password || "N/A"}
                    </span>
                  </div>
                </div>
                {role.role !== "owner" && (
                  <button
                    onClick={() => handleRemoveRole(role.id)}
                    style={{
                      background: "#c94c4c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 18px",
                      fontWeight: 700,
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#e74c3c")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "#c94c4c")
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignRoles;
