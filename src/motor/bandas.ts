import { esFechaISO, sumarDias } from "./vigencia";
import type { BandaSerie, FechaISO, PuntoSerie, PuntoSerieTupla, Serie } from "./tipos";

// La UF se publica hasta el día 9 del mes siguiente: unos 40 días por adelantado como mucho.
const MAX_DIAS_ADELANTO = 62;

// Tolerancia de redondeo de punto flotante: 100.08 leído de un XML y 100.08 de un JSON pueden no ser
// el mismo double. Más que esto ya es otro valor.
export const iguales = (a: number, b: number) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

export interface RevisionPuntos {
  aceptados: PuntoSerie[];
  rechazos: string[];
}

// Carril 2 (D5): una serie se publica sola solo si cada punto nuevo cae en la banda y no salta más
// que saltoRelativoMax contra el último valor bueno. Un rechazo no escribe nada de esa corrida.
export function revisarPuntos(serie: Pick<Serie, "id" | "puntos">, nuevos: readonly PuntoSerie[], banda: BandaSerie, hoy: FechaISO): RevisionPuntos {
  const rechazos: string[] = [];
  const existentes = new Map(serie.puntos.map(([f, v]) => [f, v]));
  const ordenados = [...nuevos].sort((x, y) => (x.fecha < y.fecha ? -1 : 1));
  let anterior: number | undefined = serie.puntos.length ? serie.puntos[serie.puntos.length - 1][1] : undefined;
  const aceptados: PuntoSerie[] = [];
  for (const p of ordenados) {
    const donde = `${serie.id} ${p.fecha}`;
    if (!esFechaISO(p.fecha)) rechazos.push(`${donde}: fecha inválida`);
    else if (!Number.isFinite(p.valor)) rechazos.push(`${donde}: valor no numérico`);
    else if (p.valor < banda.min || p.valor > banda.max) rechazos.push(`${donde}: ${p.valor} fuera de la banda [${banda.min}, ${banda.max}]`);
    else if (anterior !== undefined && anterior !== 0 && Math.abs(p.valor / anterior - 1) > banda.saltoRelativoMax) {
      rechazos.push(`${donde}: salto de ${(Math.abs(p.valor / anterior - 1) * 100).toFixed(2)} % contra ${anterior} (máximo ${(banda.saltoRelativoMax * 100).toFixed(2)} %)`);
    } else if (existentes.has(p.fecha) && !iguales(existentes.get(p.fecha)!, p.valor)) {
      rechazos.push(`${donde}: ya existe con otro valor (${existentes.get(p.fecha)}); una serie publicada no se reescribe sola`);
    } else if (p.fecha > sumarDias(hoy, MAX_DIAS_ADELANTO)) {
      rechazos.push(`${donde}: más de ${MAX_DIAS_ADELANTO} días en el futuro`);
    } else {
      if (!existentes.has(p.fecha)) aceptados.push(p);
      anterior = p.valor;
    }
  }
  return { aceptados: rechazos.length ? [] : aceptados, rechazos };
}

export function fusionarPuntos(serie: Pick<Serie, "puntos">, nuevos: readonly PuntoSerie[]): PuntoSerieTupla[] {
  const mapa = new Map<FechaISO, number>(serie.puntos.map(([f, v]) => [f, v]));
  for (const p of nuevos) mapa.set(p.fecha, p.valor);
  return [...mapa.entries()].sort(([a], [b]) => (a < b ? -1 : 1)).map(([f, v]) => [f, v] as const);
}
