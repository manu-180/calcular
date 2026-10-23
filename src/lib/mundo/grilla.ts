import "server-only";
// Punto de entrada de la grilla de «Tu sueldo en el mundo» para las páginas. No vive en src/motor
// porque necesita el registro de países, calcular.ar y server-only, y check_fronteras no deja que el
// motor importe ninguno de los tres: el motor arma la grilla con lo que se le pasa (motor/mundo/grilla).
import { candidatosDelRegistro, construirGrillaMundo, msHastaCambioDeDia, type CachePuntos, type CandidatoMundo, type ExclusionMundo, type InformeMundo, type TablaPpa } from "@/motor/mundo/grilla";
import tablaPpa from "@/motor/mundo/ppa.json";
import type { GrillaMundo } from "@/motor/mundo/tipos";
import { hoyMasAdelantado } from "@/motor/vigencia";
import { registro } from "@/paises";
import { candidatoAr } from "./ar";

const PPA = tablaPpa as TablaPpa;

export function candidatosMundo(ahora: Date = new Date()): { candidatos: CandidatoMundo[]; excluidos: ExclusionMundo[] } {
  const r = candidatosDelRegistro(registro, ahora);
  const ar = candidatoAr(registro, PPA);
  if ("netoAnual" in ar) r.candidatos.push(ar);
  else r.excluidos.push(ar);
  return r;
}

export function construirInformeMundo(ahora: Date = new Date(), previos?: CachePuntos, nuevos?: CachePuntos): InformeMundo {
  const inicio = Date.now();
  const { candidatos, excluidos } = candidatosMundo(ahora);
  const informe = construirGrillaMundo({ candidatos, excluidos, ppa: PPA, generadoEl: hoyMasAdelantado(ahora), previos, nuevos });
  return { ...informe, ms: Date.now() - inicio };
}

let estado: { hasta: number; informe: InformeMundo; puntos: CachePuntos } | null = null;

// Una vez por proceso y por día de cada país: vale hasta la próxima medianoche de alguna de las zonas
// de la grilla, y al rehacerse solo vuelve a correr los países cuyo día cambió. Con CALCULAR_HOY fijo
// no vence nunca. Por pedido es una comparación de números.
export function informeMundo(): InformeMundo {
  const ahora = Date.now();
  if (estado && ahora < estado.hasta) return estado.informe;
  const momento = new Date(ahora);
  const puntos: CachePuntos = new Map();
  const informe = construirInformeMundo(momento, estado?.puntos, puntos);
  const zonas = new Set([...informe.incluidos.map((i) => registro.pais(i.pais.mercado)?.mercado.zonaHoraria ?? "America/Argentina/Buenos_Aires")]);
  const hasta = process.env.CALCULAR_HOY ? Infinity : ahora + msHastaCambioDeDia(zonas, momento) + 1000;
  estado = { hasta, informe, puntos };
  return informe;
}

export function grillaMundo(): GrillaMundo {
  return informeMundo().grilla;
}
