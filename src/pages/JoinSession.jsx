import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { getDeviceId } from "../utils/device";

export default function JoinSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
const API_BASE = process.env.REACT_APP_API_BASE_URL;
  // const join = async () => {
  //   try {
  //     await axios.post(
  //       `http://localhost:8080/api/session/join/${sessionId}`,
  //       null,
  //       {
  //         params: {
  //           name,
  //           deviceId: getDeviceId()
  //         }
  //       }
  //     );

  //     // ✅ mark this device as joined
  //     localStorage.setItem(`ss-joined-${sessionId}`, "true");

  //     navigate(`/session/${sessionId}`);
  //   } catch (e) {
  //     setMsg(e.response?.data?.message || "❌ Join failed");
  //   }
  // };

  const join = async () => {
  try {
    const res = await axios.post(
      `${API_BASE}/api/session/join/${sessionId}`,
      null,
      {
        params: {
          name,
          deviceId: getDeviceId()
        }
      }
    );

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
