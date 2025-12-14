const API_BASE = "http://localhost:8080/api";

export async function createSession(members) {
  const res = await fetch(`${API_BASE}/session/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ members }),
  });
  if (!res.ok) throw new Error("Failed to create session");
  return res.json();
}

export async function joinSession(sessionId, name) {
  const res = await fetch(`${API_BASE}/session/join/${sessionId}?name=${encodeURIComponent(name)}`);

  if (!res.ok) throw new Error("Invalid session or duplicate name");
  return res.json(); // returns your assignment
}

export async function fetchMyAssignment(sessionId, name) {
  const res = await fetch(
    `${API_BASE}/session/assignment/${sessionId}?name=${encodeURIComponent(name)}`
  );

  if (!res.ok) throw new Error("Not allowed or session missing");
  return res.json();
}
