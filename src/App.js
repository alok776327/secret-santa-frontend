import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateSession from "./pages/CreateSession";
import JoinSession from "./pages/JoinSession";
import SessionView from "./pages/SessionView";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateSession />} />

      {/* ✅ FIXED ROUTE */}
      <Route path="/join/:sessionId" element={<JoinSession />} />

      {/* <Route path="/session/:sessionId/:name" element={<SessionView />} /> */}
      <Route path="/session/:sessionId" element={<SessionView />} />
      {/* admin route */}
      <Route path="/admin/:sessionId" element={<AdminDashboard />} />


    </Routes>
  );
}

export default App;

