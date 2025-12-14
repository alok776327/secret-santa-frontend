const API_BASE = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE) {
  throw new Error("REACT_APP_API_BASE_URL is not defined");
}

export async function createSession(members) {
  const res = await fetch(`${API_BASE}/session/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ members }),
  });

  if (!res.ok) throw new Error("Failed to create session");
  return res.json();
}

export async function joinSession(sessionId, name, deviceId) {
  const res = await fetch(
    `${API_BASE}/session/join/${sessionId}?name=${encodeURIComponent(
      name
    )}&deviceId=${deviceId}`,
    { method: "POST" }
  );

  if (!res.ok) throw new Error("Invalid session or duplicate name");
  return res.json();
}

export async function fetchMyAssignment(sessionId, deviceId, token) {
  const url = new URL(`${API_BASE}/session/assignment/${sessionId}`);
  url.searchParams.append("deviceId", deviceId);
  if (token) url.searchParams.append("token", token);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Not allowed or session missing");

  return res.json();
}
