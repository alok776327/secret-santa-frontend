import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function AdminDashboard() {
  const { sessionId } = useParams();
  const [stats, setStats] = useState(null);
const API_BASE = process.env.REACT_APP_API_BASE_URL;
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}api/session/admin/${sessionId}`
      );
      setStats(res.data);
    } catch {
      alert("Failed to load admin data");
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="card">
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <div className="card admin">
      <h2>🎅 Admin Dashboard</h2>

      <p><b>Session ID:</b> {stats.sessionId}</p>
      <p><b>Total Members:</b> {stats.totalMembers}</p>
      <p><b>Joined:</b> {stats.joinedCount}</p>
      <p>
        <b>Assignments:</b>{" "}
        {stats.assignmentsGenerated ? "✅ Generated" : "⏳ Not yet"}
      </p>
      <p>
        <b>Locked:</b> {stats.locked ? "🔒 Yes" : "🔓 No"}
      </p>
      <p><b>Created At:</b> {stats.createdAt}</p>

      <small style={{ opacity: 0.7 }}>
        Auto-refresh every 5 seconds
      </small>
    </div>
  );
}
