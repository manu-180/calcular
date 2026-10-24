import "server-only";
import { unstable_cache } from "next/cache";
import { claveServicio } from "@/lib/supabase/servicio";
import { agregadosDeFilas, type FilaAgregada } from "@/motor/sueldos/filas";
import type { AgregadosPais } from "@/motor/sueldos/tipos";
import { simulados } from "./simulados";

export const ETIQUETA_SUELDOS = "ca-sueldos";
export const REVALIDAR_S = 3600;
const ESPERA_MS = 3000;

// Interruptor de emergencia: SUELDOS_APAGADOS=1 esconde el módulo y deja las páginas sin datos, sin
// deploy de código.
export const sueldosApagados = () => process.env.SUELDOS_APAGADOS === "1";

// Solo en `next dev` y a pedido: datos inventados para ver la página llena sin base.
const usarSimulados = () => process.env.NODE_ENV === "development" && process.env.SUELDOS_SIMULADOS === "1";

// La lectura pública va con la clave anon (la función está concedida a anon); la de servicio solo si
// el entorno no tiene la anon. Fetch plano y no supabase-js: el cliente de servicio fuerza no-store.
async function pedir(mercado: string): Promise<AgregadosPais> {
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_ANON_KEY || claveServicio();
  if (!url || !clave) throw new Error("Faltan SUPABASE_URL / clave");
  const r = await fetch(`${url}/rest/v1/rpc/ca_sueldos_agregados?p_mercado=${encodeURIComponent(mercado)}`, {
    headers: { apikey: clave, Authorization: `Bearer ${clave}`, Accept: "application/json" },
    signal: AbortSignal.timeout(ESPERA_MS),
  });
  if (!r.ok) throw new Error(`ca_sueldos_agregados ${r.status}`);
  const filas = (await r.json()) as FilaAgregada[];
  if (!Array.isArray(filas)) throw new Error("ca_sueldos_agregados: respuesta inesperada");
  return agregadosDeFilas(mercado, filas);
}

// Una hora en la caché de datos de Next, por país. Un error tira y unstable_cache no lo guarda: el
// próximo pedido vuelve a intentar.
const cacheado = unstable_cache(pedir, ["ca-sueldos-agregados-v1"], { revalidate: REVALIDAR_S, tags: [ETIQUETA_SUELDOS] });

// null = sin datos (la base no respondió, falta la migración o está apagado). Nunca tira: una página
// que lo usa sigue andando sin el bloque.
export async function agregadosDe(mercado: string): Promise<AgregadosPais | null> {
  if (sueldosApagados()) return null;
  if (usarSimulados()) return simulados(mercado);
  try {
    return await cacheado(mercado);
  } catch (err) {
    console.warn("[sueldos] agregados", mercado, err instanceof Error ? err.message : err);
    return null;
  }
}
