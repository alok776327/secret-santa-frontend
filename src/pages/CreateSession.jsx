import React, { useState } from "react";
import { createSession } from "../services/api";
import "../App.css";

export default function CreateSession() {
  const [namesText, setNamesText] = useState("");
  const [sessionId, setSessionId] = useState(null);

  const handleCreate = async () => {
    const raw = namesText
      .split("\n")
      .map(n => n.trim())
      .filter(n => n.length > 0);

    const unique = [...new Set(raw)];

    if (unique.length !== raw.length) {
      alert("❌ Duplicate names found. Please remove them.");
      return;
    }

    try {
      const data = await createSession(unique);
      setSessionId(data.sessionId);
    } catch {
      alert("Error creating session");
    }
  };

  const copyLink = () => {
    const url = `${window.location.origin}/join/${sessionId}`;
    navigator.clipboard.writeText(url);
    alert("Join link copied! 🎉");
  };

  return (
    <div className="card">
      <h2>🎅 Create Secret Santa Session 🎁</h2>

      {!sessionId && (
        <>
          <textarea
            rows="6"
            placeholder="Enter one name per line 🎄"
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
          />
          <button onClick={handleCreate}>Create Session 🌟</button>
        </>
      )}

      {sessionId && (
        <>
          <h3>Session Created Successfully! 🎉</h3>

          <p><b>Session ID:</b> {sessionId}</p>

          <button onClick={copyLink} className="btn secondary">
            📋 Copy Join Link
          </button>

          <p style={{ marginTop: 10 }}>
            Share with players:
          </p>
          <code>{`${window.location.origin}/join/${sessionId}`}</code>

          {/* ✅ ADMIN LINK */}
          <p style={{ marginTop: 15 }}>
            🔐 <b>Admin Dashboard:</b>
          </p>
          <code>{`${window.location.origin}/admin/${sessionId}`}</code>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span className="emoji">🎄🎅🎁</span>
          </div>
        </>
      )}
    </div>
  );
}
