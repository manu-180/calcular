// Sin imports de React a propósito: lo importan proxy.ts y Server Components, donde los hooks
// no existen.
export const COOKIE_PISTA = "ca_sesion";

export function haySesion(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c === `${COOKIE_PISTA}=1`);
}
