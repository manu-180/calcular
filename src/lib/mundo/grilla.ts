import "server-only";
// Punto de entrada de la grilla de «Tu sueldo en el mundo» para las páginas. No vive en src/motor
// porque necesita el registro de países, calcular.ar y server-only, y check_fronteras no deja que el
// motor importe ninguno de los tres: el motor arma la grilla con lo que se le pasa (motor/mundo/grilla).
import { candidatosDelRegistro, construirGrillaMundo, fuentePpaDe, msHastaCambioDeDia, type CachePuntos, type CandidatoMundo, type ExclusionMundo, type InformeMundo, type TablaPpa } from "@/motor/mundo/grilla";
import tablaPpa from "@/motor/mundo/ppa.json";
import type { GrillaMundo } from "@/motor/mundo/tipos";
import { hoyMasAdelantado } from "@/motor/vigencia";
import { registro } from "@/paises";
import { candidatoAr } from "./ar";

const PPA = tablaPpa as TablaPpa;
// Si la grilla entera no se pudo armar, se reintenta recién después de esto: armarla cuesta unos 2 s y
// sin la espera cada pedido pagaría ese costo para volver a fallar.
const REINTENTO_MS = 10 * 60_000;

export function candidatosMundo(ahora: Date = new Date()): { candidatos: CandidatoMundo[]; excluidos: ExclusionMundo[] } {
  const r = candidatosDelRegistro(registro, ahora);
  try {
    const ar = candidatoAr(registro, PPA);
    if ("netoAnual" in ar) r.candidatos.push(ar);
    else r.excluidos.push(ar);
  } catch (err) {
    r.excluidos.push({ mercado: "ar", iso: "AR", calculadora: "ar.sueldo-neto", metodo: "ar", motivo: `calcular.ar tiró una excepción: ${err instanceof Error ? err.message : String(err)}` });
  }
  return r;
}

export function construirInformeMundo(ahora: Date = new Date(), previos?: CachePuntos, nuevos?: CachePuntos): InformeMundo {
  const inicio = Date.now();
  const { candidatos, excluidos } = candidatosMundo(ahora);
  const informe = construirGrillaMundo({ candidatos, excluidos, ppa: PPA, generadoEl: hoyMasAdelantado(ahora), previos, nuevos });
  return { ...informe, ms: Date.now() - inicio };
}

function informeVacio(motivo: string): InformeMundo {
  let fuentePpa: GrillaMundo["fuentePpa"];
  try {
    fuentePpa = fuentePpaDe(PPA);
  } catch {
    fuentePpa = { organismo: "", indicador: "", url: "", consultadoEl: "", anio: 0 };
  }
  return { grilla: { version: 1, generadoEl: "", fuentePpa, paises: [] }, incluidos: [], excluidos: [{ mercado: "*", iso: "*", motivo }], ms: 0 };
}

let estado: { hasta: number; informe: InformeMundo; puntos: CachePuntos } | null = null;

// Una vez por proceso y por día de cada país: vale hasta la próxima medianoche de alguna de las zonas
// de la grilla, y al rehacerse solo vuelve a correr los países cuyo día cambió. Con CALCULAR_HOY fijo
// no vence nunca. Por pedido es una comparación de números. Si algo tira fuera de lo que el motor ya
// aísla por país, la grilla queda vacía (la página da 404 y las homes no muestran la tarjeta).
export function informeMundo(): InformeMundo {
  const ahora = Date.now();
  if (estado && ahora < estado.hasta) return estado.informe;
  try {
    const momento = new Date(ahora);
    const puntos: CachePuntos = new Map();
    const informe = construirInformeMundo(momento, estado?.puntos, puntos);
    const zonas = new Set([...informe.incluidos.map((i) => registro.pais(i.pais.mercado)?.mercado.zonaHoraria ?? "America/Argentina/Buenos_Aires")]);
    const hasta = process.env.CALCULAR_HOY ? Infinity : ahora + msHastaCambioDeDia(zonas, momento) + 1000;
    estado = { hasta, informe, puntos };
    return informe;
  } catch (err) {
    console.error("[mundo] no se pudo armar la grilla; la página queda sin países hasta el reintento", err);
    const informe = informeVacio(`la grilla tiró una excepción: ${err instanceof Error ? err.message : String(err)}`);
    estado = { hasta: ahora + REINTENTO_MS, informe, puntos: estado?.puntos ?? new Map() };
    return informe;
  }
}

export function grillaMundo(): GrillaMundo {
  return informeMundo().grilla;
}
