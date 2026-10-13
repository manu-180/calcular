import { timingSafeEqual } from "node:crypto";

// Sin CRON_SECRET el cron queda cerrado: comparar contra `Bearer ${process.env.CRON_SECRET}` sin
// la variable dejaba entrar a cualquiera que mandara «Bearer undefined».
export function cronAutorizado(headers: Headers, secreto: string | undefined = process.env.CRON_SECRET): boolean {
  if (!secreto) return false;
  const recibido = Buffer.from(headers.get("authorization") ?? "");
  const esperado = Buffer.from(`Bearer ${secreto}`);
  return recibido.length === esperado.length && timingSafeEqual(recibido, esperado);
}
