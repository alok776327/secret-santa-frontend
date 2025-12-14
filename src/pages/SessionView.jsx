import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { getDeviceId } from "../utils/device";
import "../App.css";

export default function SessionView() {
  const { sessionId } = useParams();
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(`ss-${sessionId}`);

    if (!stored) {
      setError("❌ This link has already been used");
      return;
    }

    const { token } = JSON.parse(stored);

    api.get(`/api/session/assignment/${sessionId}`, {
      params: {
        deviceId: getDeviceId(),
        token
      }
    })
      .then(res => {
        setTarget(res.data.target);
        localStorage.removeItem(`ss-${sessionId}`); // 🔥 burn after read
      })
      .catch(e =>
        setError(e.response?.data?.message || "❌ Access denied")
      );
  }, [sessionId]);

  return (
    <div className="card">
      <h2>🎁 Your Secret Santa</h2>

      {error && <p>{error}</p>}

      {target && (
        <div className="assignment-box reveal">
          <h3>You got 🎄</h3>
          <h2>{target}</h2>
          <span className="emoji">🎅🎁</span>
        </div>
      )}
    </div>
  );
}
