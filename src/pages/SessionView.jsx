import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getDeviceId } from "../utils/device";
import "../App.css";

export default function SessionView() {
  const { sessionId } = useParams();
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");
  const API_BASE = process.env.REACT_APP_API_BASE_URL;



  // useEffect(() => {
  //   const fetchAssignment = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8080/api/session/assignment/${sessionId}`,
  //         {
  //           params: { deviceId: getDeviceId() }
  //         }
  //       );
  //       setTarget(res.data.target);
  //     } catch (e) {
  //       setError(e.response?.data?.message || "Access denied");
  //     }
  //   };

  //   fetchAssignment();
  // }, []);

    useEffect(() => {
  const stored = localStorage.getItem(`ss-${sessionId}`);

  if (!stored) {
    setError("❌ This link has already been used");
    return;
  }

  const { token } = JSON.parse(stored);

  axios.get(`${API_BASE}/api/session/assignment/${sessionId}`,
    {
      params: {
        deviceId: getDeviceId(),
        token
      }
    }
  )
  .then(res => {
    setTarget(res.data.target);
    localStorage.removeItem(`ss-${sessionId}`); // 🔥 burn after reading
  })
  .catch(e =>
    setError(e.response?.data?.message || "❌ Access denied")
  );
}, []);


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
