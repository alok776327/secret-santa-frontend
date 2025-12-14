import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateSession from "./pages/CreateSession";
import JoinSession from "./pages/JoinSession";
import SessionView from "./pages/SessionView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateSession />} />
        <Route path="/join/:sessionId" element={<JoinSession />} />
        {/* <Route path="/session/:sessionId/:name" element={<SessionView />} /> */}
        <Route path="/session/:sessionId" element={<SessionView />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
