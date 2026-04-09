export function removeStoredToken() {
  localStorage.removeItem("token");
}

function parseJwtPayload(token) {
  if (!token || token.split(".").length !== 3) {
    return null;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return JSON.parse(window.atob(padded));
  } catch {
    return null;
  }
}

export function isTokenValid(token) {
  const payload = parseJwtPayload(token);

  if (!payload) {
    return false;
  }

  if (!payload.exp) {
    return true;
  }

  return payload.exp * 1000 > Date.now();
}