import https from "node:https";
import tls from "node:tls";
import type { SupabaseClient } from "@supabase/supabase-js";
import { INTERMEDIO_BCRA } from "./certs-bcra";

// Cotizaciones oficiales del BCRA (Comunicación A 3500 para el dólar y el resto de las monedas en
// pesos). De ahí sale ca_tipo_cambio: cuántos dólares vale una unidad de cada moneda ese día. La carga
// el cron de /api/cron/panel-mantenimiento; ca_compras.monto_usd se recalcula en la base al cargar.

export const URL_COTIZACIONES = "https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones";

export type Cotizaciones = { fecha: string; tasas: Record<string, number> };

const FECHA = /^\d{4}-\d{2}-\d{2}$/;

// tipoCotizacion = pesos por unidad de la moneda. Dividido por los pesos del dólar da dólares por unidad
// sin depender de tipoPase, que el BCRA expresa al derecho o al revés según la moneda.
export function tasasDelBcra(json: unknown): Cotizaciones | null {
  const r = (json as { results?: { fecha?: unknown; detalle?: unknown } } | null)?.results;
  if (!r || typeof r.fecha !== "string" || !FECHA.test(r.fecha.slice(0, 10)) || !Array.isArray(r.detalle)) return null;
  const filas = r.detalle as { codigoMoneda?: unknown; tipoCotizacion?: unknown }[];
  const dolar = filas.find((f) => f.codigoMoneda === "USD")?.tipoCotizacion;
  if (typeof dolar !== "number" || !(dolar > 50 && dolar < 1_000_000)) return null;
  const tasas: Record<string, number> = { ARS: 1 / dolar };
  for (const f of filas) {
    const codigo = f.codigoMoneda;
    const cot = f.tipoCotizacion;
    if (typeof codigo !== "string" || !/^[A-Z]{3}$/.test(codigo) || codigo === "USD" || codigo === "ARS" || codigo.startsWith("X")) continue;
    if (typeof cot !== "number" || !(cot > 0)) continue;
    const usd = cot / dolar;
    if (usd > 1e-7 && usd < 100_000) tasas[codigo] = Number(usd.toPrecision(10));
  }
  tasas.ARS = Number(tasas.ARS.toPrecision(10));
  return { fecha: r.fecha.slice(0, 10), tasas };
}

// El BCRA sirvió a veces la cadena de certificados incompleta. En vez de apagar la verificación TLS
// (permitiría cargar cotizaciones falsas), se suma su intermedio a las raíces de Node.
let agente: https.Agent | null = null;
function agenteBcra(): https.Agent {
  agente ??= new https.Agent({ ca: [...tls.rootCertificates, INTERMEDIO_BCRA] });
  return agente;
}

function pedir(url: string, timeoutMs: number): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { "User-Agent": "calcular.ar/panel", Accept: "application/json" }, agent: agenteBcra(), timeout: timeoutMs },
      (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const partes: Buffer[] = [];
        res.on("data", (c: Buffer) => partes.push(c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(Buffer.concat(partes).toString("utf8")));
          } catch {
            reject(new Error("la respuesta no es JSON"));
          }
        });
      },
    );
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

export async function traerCotizaciones(fecha: string | null, timeoutMs = 8000): Promise<Cotizaciones | null> {
  const url = fecha ? `${URL_COTIZACIONES}?fecha=${fecha}` : URL_COTIZACIONES;
  return tasasDelBcra(await pedir(url, timeoutMs));
}

function diaAnterior(fecha: string, dias: number): string {
  const d = new Date(`${fecha}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - dias);
  return d.toISOString().slice(0, 10);
}

export type ResultadoTipoCambio = { cargados: string[]; pendientes: number; omitido?: string; error?: string };

type Traer = (fecha: string | null) => Promise<Cotizaciones | null>;

// La cotización de hoy y la de los días con ventas sin monto en dólares (fines de semana y feriados no
// tienen: se busca el día hábil anterior). Sin la migración 20261014120000 no hace nada.
export async function actualizarTipoCambio(db: SupabaseClient, traer: Traer = (f) => traerCotizaciones(f)): Promise<ResultadoTipoCambio> {
  const { data, error } = await db.rpc("ca_usd_pendientes", { p_max: 3 });
  if (error) {
    if (error.code === "PGRST202" || error.code === "42883") return { cargados: [], pendientes: 0, omitido: "falta la migración 20261014120000" };
    return { cargados: [], pendientes: 0, error: `${error.code} ${error.message}` };
  }
  const pendientes = ((data ?? []) as { dia: string }[]).map((f) => String(f.dia).slice(0, 10)).filter((d) => FECHA.test(d));
  const pedidos: (string | null)[] = [null, ...new Set(pendientes)];
  const cargados = new Set<string>();
  for (const pedido of pedidos) {
    let cot: Cotizaciones | null = null;
    try {
      for (let atras = 0; atras < 6 && !cot; atras++) {
        cot = await traer(pedido ? diaAnterior(pedido, atras) : null);
        if (!pedido) break;
      }
    } catch (e) {
      return { cargados: [...cargados], pendientes: pendientes.length, error: e instanceof Error ? e.message : String(e) };
    }
    if (!cot || cargados.has(cot.fecha)) continue;
    const { error: e } = await db.rpc("ca_tipo_cambio_cargar", { p_dia: cot.fecha, p_tasas: cot.tasas, p_fuente: "bcra" });
    if (e) return { cargados: [...cargados], pendientes: pendientes.length, error: `${e.code} ${e.message}` };
    cargados.add(cot.fecha);
  }
  return { cargados: [...cargados], pendientes: pendientes.length };
}
