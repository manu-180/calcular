import "server-only";
import { createHash, randomBytes } from "node:crypto";

// Como el de /api/e: en memoria de la instancia, con la IP hasheada con una sal que nunca sale del
// proceso. Nada de esto llega a la base. Con varias instancias el tope real es N veces este; frena el
// abuso burdo, y el filtro de atípicos y el tope por celda (la migración) cubren el resto.
const SAL = randomBytes(16);

export function claveDeIp(ip: string | null): string {
  return createHash("sha256").update(SAL).update(ip ?? "").digest("base64url").slice(0, 16);
}

export function crearLimite(max: number, ventanaMs: number) {
  const cuenta = new Map<string, number>();
  let inicio = 0;
  return (clave: string, ahora = Date.now()): boolean => {
    if (ahora - inicio >= ventanaMs || cuenta.size > 20_000) {
      cuenta.clear();
      inicio = ahora;
    }
    const n = (cuenta.get(clave) ?? 0) + 1;
    cuenta.set(clave, n);
    return n <= max;
  };
}

export function ipDe(h: Headers): string | null {
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip");
}
