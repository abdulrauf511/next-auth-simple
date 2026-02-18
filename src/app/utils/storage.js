const KEY = "auth_token";

export function getToken() {
  if (typeof window === "undefined") return null;
  const t = localStorage.getItem(KEY);

  // 🚫 treat these as NO token
  if (!t || t === "undefined" || t === "null") return null;

  return t;
}

export function setToken(token) {
  // ✅ only store valid string token
  if (
    typeof token !== "string" ||
    token.trim() === "" ||
    token === "undefined" ||
    token === "null"
  ) {
    localStorage.removeItem(KEY);
    return false;
  }

  localStorage.setItem(KEY, token);
  return true;
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
