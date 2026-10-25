// Refresca src/lib/horas/cotidianos-ar.json: los precios oficiales de «¿Cuántas horas de trabajo te
// cuesta?» en calcular.ar.
//   npx tsx scripts/horas/actualizar_cotidianos_ar.ts
//
// - INDEC: una serie por pedido (pedidas juntas, la API devuelve columnas en null: issue #27).
// - Nafta: el CSV de precios vigentes de la Secretaría de Energía; mediana de las estaciones de la Ciudad
//   que informaron precio en los últimos DIAS_SURTIDOR días.
// - Un pedido que falla conserva el precio anterior con su fecha vieja: el vencimiento lo saca solo.
// - Un salto de más del 35 % contra el valor anterior aborta ese ítem (casi siempre es la fuente que
//   cambió de significado, no un precio real).
import http from "node:http";
import https from "node:https";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  API_SERIES,
  CSV_SURTIDOR,
  DIAS_SURTIDOR,
  finDeVigenciaPeriodo,
  ITEMS_COTIDIANOS,
  MINIMO_ESTACIONES,
  PRODUCTO_SURTIDOR,
  PROVINCIA_SURTIDOR,
  sumarDias,
  type ArchivoCotidianos,
  type PrecioIndec,
  type PrecioNafta,
} from "../../src/lib/horas-ar/catalogo";

const ARCHIVO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src/lib/horas/cotidianos-ar.json");
const SALTO_MAX = 0.35;
const hoy = new Date().toISOString().slice(0, 10);

// Varios .gob.ar sirven la cadena de certificados incompleta: se reintenta sin verificar TLS, como
// src/lib/datos-vivos.ts. El contenido igual se valida con bandas.
function bajar(url: string, inseguro = false, saltos = 4): Promise<string> {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("http://") ? http : https;
    const req = mod.get(url, { headers: { "User-Agent": "calcular.ar/horas", Accept: "*/*" }, rejectUnauthorized: !inseguro, timeout: 120_000 }, (res) => {
      const s = res.statusCode ?? 0;
      if (s >= 301 && s <= 308 && res.headers.location && saltos > 0) {
        res.resume();
        bajar(new URL(res.headers.location, url).toString(), inseguro, saltos - 1).then(resolve, reject);
        return;
      }
      if (s !== 200) {
        res.resume();
        reject(new Error(`HTTP ${s} en ${url}`));
        return;
      }
      const partes: Buffer[] = [];
      res.on("data", (d: Buffer) => partes.push(d));
      res.on("end", () => resolve(Buffer.concat(partes).toString("utf8")));
      res.on("error", reject);
    });
    req.on("timeout", () => req.destroy(new Error(`timeout en ${url}`)));
    req.on("error", reject);
  });
}

async function bajarConReintento(url: string): Promise<string> {
  let ultimo: unknown;
  for (let i = 0; i < 3; i++) {
    try {
      return await bajar(url, i > 0);
    } catch (err) {
      ultimo = err;
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
  throw ultimo;
}

function leerAnterior(): ArchivoCotidianos {
  try {
    return JSON.parse(readFileSync(ARCHIVO, "utf8")) as ArchivoCotidianos;
  } catch {
    return { version: 1, actualizadoEl: "", indec: {}, nafta: null };
  }
}

function saltoRaro(nuevo: number, viejo: number | undefined): boolean {
  return viejo !== undefined && viejo > 0 && Math.abs(nuevo / viejo - 1) > SALTO_MAX;
}

async function leerIndec(serie: string): Promise<{ monto: number; periodo: string }> {
  const json = JSON.parse(await bajarConReintento(API_SERIES(serie))) as { data?: [string, number | null][] };
  const fila = (json.data ?? []).find(([f, v]) => /^\d{4}-\d{2}-01$/.test(f) && typeof v === "number" && v > 0);
  if (!fila) throw new Error("la serie no trae un valor positivo");
  return { monto: Math.round((fila[1] as number) * 100) / 100, periodo: fila[0].slice(0, 7) };
}

// CSV con comillas (la última columna es un GeoJSON con comas adentro).
function filasCsv(texto: string): string[][] {
  const filas: string[][] = [];
  let fila: string[] = [];
  let campo = "";
  let comillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (comillas) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (c === '"') comillas = false;
      else campo += c;
    } else if (c === '"') comillas = true;
    else if (c === ",") {
      fila.push(campo);
      campo = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = "";
    } else campo += c;
  }
  if (campo || fila.length) {
    fila.push(campo);
    filas.push(fila);
  }
  return filas;
}

function mediana(v: number[]): number {
  const o = [...v].sort((a, b) => a - b);
  const m = o.length >> 1;
  return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2;
}

async function leerNafta(): Promise<PrecioNafta> {
  const [cabeza, ...resto] = filasCsv((await bajarConReintento(CSV_SURTIDOR)).replace(/^﻿/, ""));
  const col = (n: string) => {
    const i = cabeza.indexOf(n);
    if (i < 0) throw new Error(`el CSV de surtidores no trae la columna ${n}`);
    return i;
  };
  const [cProv, cProd, cHorario, cPrecio, cFecha] = ["provincia", "producto", "tipohorario", "precio", "fecha_vigencia"].map(col);
  const desde = sumarDias(hoy, -DIAS_SURTIDOR);
  const precios: number[] = [];
  let masVieja = hoy;
  for (const f of resto) {
    if (f[cProv] !== PROVINCIA_SURTIDOR || f[cProd] !== PRODUCTO_SURTIDOR || f[cHorario] !== "Diurno") continue;
    const fecha = (f[cFecha] ?? "").slice(0, 10);
    const p = Number(f[cPrecio]);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || fecha < desde || fecha > hoy || !(p > 0)) continue;
    precios.push(p);
    if (fecha < masVieja) masVieja = fecha;
  }
  if (precios.length < MINIMO_ESTACIONES) throw new Error(`solo ${precios.length} estaciones de la Ciudad informaron en ${DIAS_SURTIDOR} días`);
  const monto = Math.round(mediana(precios) * 100) / 100;
  if (monto < 300 || monto > 30_000) throw new Error(`la mediana dio ${monto} por litro, fuera de banda`);
  return { monto, consultadoEl: hoy, estaciones: precios.length, desde: masVieja };
}

async function main() {
  const anterior = leerAnterior();
  const indec: Record<string, PrecioIndec> = { ...anterior.indec };
  let fallas = 0;
  for (const item of ITEMS_COTIDIANOS) {
    if (item.fuente !== "indec" || !item.serie) continue;
    try {
      const { monto, periodo } = await leerIndec(item.serie);
      if (finDeVigenciaPeriodo(periodo) < hoy) throw new Error(`la API trae hasta ${periodo}: la serie está cortada o atrasada`);
      const viejo = anterior.indec[item.id];
      if (viejo && periodo < viejo.periodo) throw new Error(`la API devolvió ${periodo}, más viejo que el guardado (${viejo.periodo})`);
      if (saltoRaro(monto, viejo?.monto) && periodo !== viejo?.periodo) {
        const meses = (Number(periodo.slice(0, 4)) - Number(viejo!.periodo.slice(0, 4))) * 12 + Number(periodo.slice(5)) - Number(viejo!.periodo.slice(5));
        if (meses <= 2) throw new Error(`salto de ${viejo!.monto} a ${monto} en ${meses} meses`);
      }
      indec[item.id] = { monto, periodo, serie: item.serie, consultadoEl: hoy };
      console.log(`OK   ${item.id}: $${monto} (${periodo})`);
    } catch (err) {
      fallas++;
      console.log(`⚠️  ${item.id}: ${err instanceof Error ? err.message : String(err)}; queda el anterior`);
    }
  }
  let nafta = anterior.nafta;
  try {
    const n = await leerNafta();
    if (saltoRaro(n.monto, anterior.nafta?.monto)) throw new Error(`salto de ${anterior.nafta?.monto} a ${n.monto}`);
    nafta = n;
    console.log(`OK   nafta: $${n.monto} por litro, mediana de ${n.estaciones} estaciones (desde ${n.desde})`);
  } catch (err) {
    fallas++;
    console.log(`⚠️  nafta: ${err instanceof Error ? err.message : String(err)}; queda el anterior`);
  }
  const salida: ArchivoCotidianos = { version: 1, actualizadoEl: hoy, indec, nafta };
  writeFileSync(ARCHIVO, `${JSON.stringify(salida, null, 2)}\n`);
  console.log(`${fallas ? "FALLAS" : "TODO OK"}: escrito ${path.relative(process.cwd(), ARCHIVO)}`);
  if (fallas && !Object.keys(indec).length) process.exit(1);
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
