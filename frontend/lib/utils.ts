export function getLocalCart(): [] {
  return JSON.parse(localStorage.getItem("cart") ?? "[]");
}
