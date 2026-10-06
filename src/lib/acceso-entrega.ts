import "server-only";
import { createHmac } from "node:crypto";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { permitido } from "@/lib/limite";
import { claveCliente, dentroDelLimite } from "@/app/api/e/protocolo";

/** Un id de pago de MP es numérico. Cualquier otra cosa no se le manda a la API. */
export const ID_PAGO = /^\d{6,20}$/;

export function ipDelPedido(h: Headers): string | null {
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;
}

// Cada apertura de un enlace de entrega consulta MP con nuestro token: sin cupo, alguien puede
// barrer ids y gastar el rate limit de MP que necesitan las entregas legítimas. 30 cada 10 min
// sobra para quien abre su enlace varias veces. Sin las tablas, el cupo vive en la memoria de la
// instancia (por minuto, como el del checkout).
export async function dentroDelCupoEntrega(ip: string | null): Promise<boolean> {
  if (!ip) return true;
  return CUENTAS_ACTIVAS
    ? permitido(`entrega:${ip}`, 30, 600)
    : dentroDelLimite(`entrega:${claveCliente(ip)}`, Date.now(), 6);
}

// El payment_id es la llave del informe y el informe se muestra en una mediación: el número impreso
// no puede servir para abrirlo. La clave sólo tiene que ser estable y no estar en el documento;
// si rotan el secreto del webhook, los informes ya emitidos cambian de número al reabrirse.
export function numeroDeInforme(paymentId: string): string {
  const clave = process.env.MP_WEBHOOK_SECRET || "calcular.ar:informe-cuota-alimentaria";
  return createHmac("sha256", clave).update(paymentId).digest("hex").slice(0, 10).toUpperCase();
}
