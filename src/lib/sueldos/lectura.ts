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

// Todo pasa por funciones que solo ejecuta la service role (anon no lee nada de «Sueldos reales»: la
// lectura pública es este módulo detrás del Route Handler cacheado). POST porque ca_sueldos_leer es
// volátil (la primera lectura del día publica la foto) y PostgREST solo acepta GET para funciones
// estables. Fetch plano y no supabase-js: el cliente de servicio fuerza no-store.
async function rpc<T>(funcion: string, cuerpo: Record<string, string>): Promise<T> {
  const url = process.env.SUPABASE_URL;
  const clave = claveServicio();
  if (!url || !clave) throw new Error("Faltan SUPABASE_URL / clave de servicio");
  const r = await fetch(`${url}/rest/v1/rpc/${funcion}`, {
    method: "POST",
    headers: { apikey: clave, Authorization: `Bearer ${clave}`, Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo),
    cache: "no-store",
    signal: AbortSignal.timeout(ESPERA_MS),
  });
  if (!r.ok) throw new Error(`${funcion} ${r.status}`);
  return (await r.json()) as T;
}

async function pedir(mercado: string): Promise<AgregadosPais> {
  const filas = await rpc<FilaAgregada[]>("ca_sueldos_leer", { p_mercado: mercado });
  if (!Array.isArray(filas)) throw new Error("ca_sueldos_leer: respuesta inesperada");
  return agregadosDeFilas(mercado, filas);
}

async function pedirPaises(): Promise<string[]> {
  const filas = await rpc<{ mercado: string }[]>("ca_sueldos_paises", {});
  if (!Array.isArray(filas)) throw new Error("ca_sueldos_paises: respuesta inesperada");
  return filas.map((f) => f.mercado).filter((m) => typeof m === "string");
}

// Una hora en la caché de datos de Next, por país (la foto cambia una vez por día). Un error tira y
// unstable_cache no lo guarda: el próximo pedido vuelve a intentar.
const cacheado = unstable_cache(pedir, ["ca-sueldos-leer-v2"], { revalidate: REVALIDAR_S, tags: [ETIQUETA_SUELDOS] });
const paisesCacheados = unstable_cache(pedirPaises, ["ca-sueldos-paises-v1"], { revalidate: REVALIDAR_S, tags: [ETIQUETA_SUELDOS] });

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

// Países (edición principal, "ar" = calcular.ar) con al menos una ocupación publicada: los que van al
// sitemap. Sin base o con error, ninguno: el sitemap sale igual, sin estas páginas, y nunca espera más
// que ESPERA_MS.
export async function paisesConSueldos(): Promise<ReadonlySet<string>> {
  if (sueldosApagados() || usarSimulados()) return new Set();
  if (!process.env.SUPABASE_URL || !claveServicio()) return new Set();
  try {
    return new Set(await paisesCacheados());
  } catch (err) {
    console.warn("[sueldos] países", err instanceof Error ? err.message : err);
    return new Set();
  }
}
