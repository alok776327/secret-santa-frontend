import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { getDeviceId } from "../utils/device";

export default function JoinSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const join = async () => {
    try {
      const res = await api.post(`/api/session/join/${sessionId}`, null, {
        params: {
          name,
          deviceId: getDeviceId()
        }
      });

      // 🔐 store one-time token
      localStorage.setItem(
        `ss-${sessionId}`,
        JSON.stringify({ token: res.data.token })
      );

      navigate(`/session/${sessionId}`);
    } catch (e) {
      setMsg(e.response?.data?.message || "❌ Join failed");
    }
  };

  return (
    <div className="card">
      <h2>🎄 Join Secret Santa</h2>
      <input
        placeholder="Enter your name 🎅"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={join}>🎁 I am Secret Santa of</button>
      <p>{msg}</p>
    </div>
  );
}
