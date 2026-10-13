// Lado países del cron de datos vivos: lo que calcularya SIRVE (las series horneadas en el build)
// contra lo que las fuentes publican hoy. Igual que el lado AR, solo detecta y avisa: los puntos los
// escribe scripts/datos-paises/correr.ts con sus bandas y su puerta de checks, y pasan por git.
//
// Solo se consultan los detectores de las series diarias (tipos de cambio, UF, UDIS): son las que
// envejecen en días y las que más rápido dejan una calculadora sin publicar. El resto de las series
// se juzga solo por su antigüedad, sin red.

import { registro } from "@/paises";
import { ultimoPunto, hoyEn } from "@/motor/vigencia";
import type { DetectorSerie, PuntoSerie } from "@/motor/tipos";
import { crearHttpReal, httpParaDetector } from "../../scripts/datos-paises/lib/http";
import { compararSerie, type FuenteSerie, type Hallazgo } from "@/lib/datos-vivos";

function conLimite<T>(p: Promise<T>, ms: number): Promise<T> {
  let t: ReturnType<typeof setTimeout> | undefined;
  return Promise.race([
    p,
    new Promise<never>((_, rej) => {
      t = setTimeout(() => rej(new Error(`sin respuesta en ${Math.round(ms / 1000)} s`)), ms);
    }),
  ]).finally(() => clearTimeout(t));
}

async function consultar(det: DetectorSerie, timeoutMs: number): Promise<FuenteSerie> {
  try {
    const http = httpParaDetector(crearHttpReal(timeoutMs), det, []);
    const puntos = await conLimite(det.traer(http), timeoutMs);
    const validos = (puntos ?? []).filter((p): p is PuntoSerie => typeof p?.fecha === "string" && Number.isFinite(p?.valor));
    if (!validos.length) return { tipo: "caida", detalle: "la fuente respondió sin puntos" };
    const ultimo = validos.reduce((a, b) => (b.fecha > a.fecha ? b : a));
    return { tipo: "punto", fecha: ultimo.fecha, valor: ultimo.valor };
  } catch (err) {
    return { tipo: "caida", detalle: (err as Error).message };
  }
}

export async function revisarPaises(opciones: { ahora?: Date; timeoutMs: number }): Promise<Hallazgo[]> {
  const ahora = opciones.ahora ?? new Date();
  const tareas: Promise<Hallazgo>[] = [];
  for (const pais of registro.paises) {
    const { codigo, estado } = pais.mercado;
    if (codigo === "global" || estado !== "publicado") continue;
    const hoy = hoyEn(pais.mercado, ahora);
    for (const serie of pais.series) {
      const det = pais.detectores.find((d): d is DetectorSerie => d.carril === "serie" && d.serie === serie.id);
      const punto = ultimoPunto(serie);
      const ultimo = punto ? { fecha: punto.fecha, valor: punto.valor } : null;
      const fuente: Promise<FuenteSerie> =
        serie.frecuencia === "diaria" && det ? consultar(det, opciones.timeoutMs) : Promise.resolve({ tipo: "sin-consultar" });
      tareas.push(fuente.then((f) => compararSerie({ mercado: codigo, serie, ultimo, hoy, fuente: f })));
    }
  }
  return Promise.all(tareas);
}
