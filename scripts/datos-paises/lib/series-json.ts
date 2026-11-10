import { fusionarPuntos } from "../../../src/motor/bandas";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "../../../src/motor/tipos";

interface SerieCruda {
  id: string;
  altas?: [FechaISO, FechaISO][];
  puntos: PuntoSerieTupla[];
}
interface ArchivoCrudo {
  series: SerieCruda[];
}

function cierreDeLista(texto: string, apertura: number): number {
  let prof = 0;
  let enTexto = false;
  for (let i = apertura; i < texto.length; i++) {
    const c = texto[i];
    if (enTexto) {
      if (c === "\\") i++;
      else if (c === '"') enTexto = false;
      continue;
    }
    if (c === '"') enTexto = true;
    else if (c === "[") prof++;
    else if (c === "]" && --prof === 0) return i;
  }
  return -1;
}

const linea = (p: PuntoSerie) => `["${p.fecha}", ${JSON.stringify(p.valor)}]`;

// Inserta los puntos al final de la lista sin tocar el texto de los que ya están: el diff del commit
// automático muestra solo lo agregado y un "100.0" publicado no pasa a "100". Si los puntos no van
// todos al final o el archivo tiene otra forma, devuelve null y se reescribe entero.
function insertarAlFinal(texto: string, id: string, nuevos: readonly PuntoSerie[]): string | null {
  const idEsc = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const mId = new RegExp(`"id"\\s*:\\s*"${idEsc}"`).exec(texto);
  if (!mId) return null;
  const resto = texto.slice(mId.index);
  const mPuntos = /"puntos"\s*:\s*\[/.exec(resto);
  if (!mPuntos) return null;
  const siguienteId = resto.slice(1).search(/"id"\s*:/);
  if (siguienteId !== -1 && siguienteId + 1 < mPuntos.index) return null;
  const apertura = mId.index + mPuntos.index + mPuntos[0].length - 1;
  const cierre = cierreDeLista(texto, apertura);
  if (cierre === -1) return null;
  const interior = texto.slice(apertura + 1, cierre);
  const lineas = interior.split(/\r?\n/);
  const eol = interior.includes("\r\n") ? "\r\n" : "\n";
  const ultimaConPunto = [...lineas].reverse().find((l) => l.trim().startsWith("["));
  if (!ultimaConPunto) return null;
  const sangria = /^\s*/.exec(ultimaConPunto)?.[0] ?? "";
  const sinFinal = interior.replace(/\s*$/, "");
  const finalOriginal = interior.slice(sinFinal.length);
  const agregado = nuevos.map((p) => `,${eol}${sangria}${linea(p)}`).join("");
  return texto.slice(0, apertura + 1) + sinFinal + agregado + finalOriginal + texto.slice(cierre);
}

const primero = (puntos: readonly PuntoSerie[]): FechaISO => puntos.reduce((m, p) => (p.fecha < m ? p.fecha : m), puntos[0].fecha);

// El alta va en la misma serie, en una sola línea, antes de "puntos": es lo que deja que un caso fechado
// antes de hoy no vea los puntos de esta tanda (serieConocidaAl).
function insertarAlta(texto: string, id: string, par: readonly [FechaISO, FechaISO]): string | null {
  const idEsc = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const mId = new RegExp(`"id"\\s*:\\s*"${idEsc}"`).exec(texto);
  if (!mId) return null;
  const resto = texto.slice(mId.index);
  const mPuntos = /(\r?\n)([ \t]*)"puntos"\s*:/.exec(resto);
  if (!mPuntos) return null;
  const tramo = resto.slice(0, mPuntos.index);
  if (/"id"\s*:/.test(tramo.slice(1))) return null;
  const nuevo = `["${par[0]}", "${par[1]}"]`;
  const mAltas = /"altas"\s*:\s*\[(.*)\]/.exec(tramo);
  if (mAltas) {
    const fin = mId.index + mAltas.index + mAltas[0].length - 1;
    return texto.slice(0, fin) + (mAltas[1].trim() ? ", " : "") + nuevo + texto.slice(fin);
  }
  const pos = mId.index + mPuntos.index;
  return texto.slice(0, pos) + `${mPuntos[1]}${mPuntos[2]}"altas": [${nuevo}],` + texto.slice(pos);
}

function reescribir(json: ArchivoCrudo, nuevos: ReadonlyMap<string, readonly PuntoSerie[]>, eol: string, alta?: FechaISO): string {
  const copia: ArchivoCrudo = JSON.parse(JSON.stringify(json));
  copia.series = copia.series.map((s) => {
    const n = nuevos.get(s.id);
    if (!n?.length) return s;
    const { puntos: _p, altas, ...resto } = s;
    const conAltas = alta ? { ...resto, altas: [...(altas ?? []), [alta, primero(n)] as [FechaISO, FechaISO]] } : altas ? { ...resto, altas } : resto;
    return { ...conAltas, puntos: fusionarPuntos(s, n) as PuntoSerieTupla[] };
  });
  const marcas = new Map<string, string>();
  let k = 0;
  const conMarcas = JSON.parse(JSON.stringify(copia), function (clave, valor) {
    if (clave === "puntos" && Array.isArray(valor)) {
      return valor.map((p: [FechaISO, number]) => {
        const m = `@@punto${k++}@@`;
        marcas.set(m, linea({ fecha: p[0], valor: p[1] }));
        return m;
      });
    }
    return valor;
  });
  const marcasAltas = new Map<string, string>();
  const conMarcasAltas = JSON.parse(JSON.stringify(conMarcas), function (clave, valor) {
    if (clave === "altas" && Array.isArray(valor)) {
      const m = `@@altas${k++}@@`;
      marcasAltas.set(m, `[${valor.map((a: [string, string]) => `["${a[0]}", "${a[1]}"]`).join(", ")}]`);
      return m;
    }
    return valor;
  });
  let texto = JSON.stringify(conMarcasAltas, null, 2);
  for (const [m, l] of marcasAltas) texto = texto.replace(`"${m}"`, l);
  for (const [m, l] of marcas) texto = texto.replace(`"${m}"`, l);
  return `${texto}\n`.replace(/\n/g, eol);
}

export interface Escritura {
  texto: string;
  agregados: number;
  modo: "insercion" | "reescritura";
}

// Garantía que no depende de revisarPuntos: el archivo nuevo tiene exactamente los puntos viejos,
// con el mismo valor, más los agregados. Si algo de eso no se cumple, se lanza y no se escribe nada.
export function verificarSoloAgrega(viejo: ArchivoCrudo, nuevoTexto: string, nuevos: ReadonlyMap<string, readonly PuntoSerie[]>, alta?: FechaISO): void {
  const nuevo = JSON.parse(nuevoTexto) as ArchivoCrudo;
  if (nuevo.series.length !== viejo.series.length) throw new Error("series.json: cambió la cantidad de series");
  for (const sv of viejo.series) {
    const sn = nuevo.series.find((s) => s.id === sv.id);
    if (!sn) throw new Error(`series.json: desapareció la serie ${sv.id}`);
    const { puntos: _pv, altas: altasViejas, ...restoViejo } = sv;
    const { puntos: _pn, altas: altasNuevas, ...restoNuevo } = sn;
    if (JSON.stringify(restoViejo) !== JSON.stringify(restoNuevo)) throw new Error(`series.json: cambió algo de ${sv.id} que no son sus puntos`);
    const n = nuevos.get(sv.id) ?? [];
    const altasEsperadas = alta && n.length ? [...(altasViejas ?? []), [alta, primero(n)]] : altasViejas;
    if (JSON.stringify(altasEsperadas ?? null) !== JSON.stringify(altasNuevas ?? null)) throw new Error(`series.json: las altas de ${sv.id} no son las de antes más la de hoy`);
    const mapa = new Map(sn.puntos.map(([f, v]) => [f, v]));
    for (const [f, v] of sv.puntos) {
      if (mapa.get(f) !== v) throw new Error(`series.json: el punto publicado ${sv.id} ${f} cambió o desapareció`);
    }
    const esperados = sv.puntos.length + (nuevos.get(sv.id)?.length ?? 0);
    if (sn.puntos.length !== esperados) throw new Error(`series.json: ${sv.id} tiene ${sn.puntos.length} puntos y esperaba ${esperados}`);
    for (const p of nuevos.get(sv.id) ?? []) if (mapa.get(p.fecha) !== p.valor) throw new Error(`series.json: falta el punto nuevo ${sv.id} ${p.fecha}`);
  }
}

export function agregarPuntos(textoOriginal: string, nuevos: ReadonlyMap<string, readonly PuntoSerie[]>, alta?: FechaISO): Escritura {
  const viejo = JSON.parse(textoOriginal.replace(/^﻿/, "")) as ArchivoCrudo;
  const eol = textoOriginal.includes("\r\n") ? "\r\n" : "\n";
  let texto: string | null = textoOriginal;
  let agregados = 0;
  for (const [id, puntos] of nuevos) {
    if (puntos.length === 0) continue;
    const serie = viejo.series.find((s) => s.id === id);
    if (!serie) throw new Error(`series.json: no existe la serie ${id}`);
    for (const p of puntos) if (serie.puntos.some(([f]) => f === p.fecha)) throw new Error(`series.json: ${id} ${p.fecha} ya está publicado`);
    agregados += puntos.length;
    const ultima = serie.puntos[serie.puntos.length - 1]?.[0] ?? "";
    const ordenados = [...puntos].sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
    texto = texto !== null && ordenados[0].fecha > ultima ? insertarAlFinal(texto, id, ordenados) : null;
    if (texto !== null && alta) texto = insertarAlta(texto, id, [alta, ordenados[0].fecha]);
  }
  let modo: Escritura["modo"] = "insercion";
  if (texto !== null) {
    try {
      verificarSoloAgrega(viejo, texto, nuevos, alta);
    } catch {
      texto = null;
    }
  }
  if (texto === null) {
    modo = "reescritura";
    texto = reescribir(viejo, nuevos, eol, alta);
  }
  verificarSoloAgrega(viejo, texto, nuevos, alta);
  return { texto, agregados, modo };
}
