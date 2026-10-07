// Motor de la Pensión Honorífica de Veteranos de la Guerra del Atlántico Sur. Puro, sin fetch.
//
// TODO SALE DE DOS NÚMEROS Y UNA TABLA DE REPARTO:
//   · el titular cobra 3 × haber mínimo (art. 2º del Dec. 1357/04);
//   · el grupo de derechohabientes cobra el 100% de eso —no el 70% del régimen general— y se lo
//     reparte según el art. 7º del mismo decreto.
//
// El haber mínimo NO se copia acá: sale de HABER_MINIMO_SERIE, que se reconstruye y verifica
// contra la serie oficial de ANSES en `scripts/gen_jubilaciones.ts`. Por eso esta página no
// envejece: cuando ANSES dicta la resolución del mes, el monto de la pensión ya está calculado.

import { HABER_MINIMO_SERIE, HABER_MINIMO_ULTIMO } from "@/data/jubilaciones";
import {
  HABERES_MINIMOS_TITULAR,
  REPARTO_DERECHOHABIENTES as R,
} from "@/data/veteranos-malvinas";

const r2 = (n: number) => Math.round(n * 100) / 100;

export type AvisoVeteranos = { tono: "info" | "atencion" | "alerta"; texto: string };

/** El haber mínimo de un período AAAA-MM, o null si ese mes todavía no tiene resolución. */
export function haberMinimoDe(periodo: string): number | null {
  return HABER_MINIMO_SERIE.find((m) => m.periodo === periodo)?.haberMinimo ?? null;
}

/** El monto del TITULAR en un mes: tres veces el haber mínimo (art. 2º Dec. 1357/04). */
export function montoTitular(periodo?: string): number {
  const hm = (periodo ? haberMinimoDe(periodo) : null) ?? HABER_MINIMO_ULTIMO.haberMinimo;
  return r2(hm * HABERES_MINIMOS_TITULAR);
}

export type EntradaVeteranos = {
  periodo?: string;
  /** Quién consulta. */
  quien?: "titular" | "derechohabientes";
  /** ¿Hay viuda, viudo o conviviente con derecho a pensión? */
  hayConyuge?: boolean;
  /** Cuántos hijos con derecho a pensión. */
  hijos?: number;
};

export type ParteDerechohabiente = {
  quien: string;
  /** Fracción del beneficio del causante que le toca a esa persona. */
  fraccion: number;
  monto: number;
  /** Cuántas personas comparten esa fracción (los hijos se reparten en partes iguales). */
  personas: number;
  /** Lo que cobra CADA una de esas personas. */
  montoPorPersona: number;
  norma: string;
};

export type ResultadoVeteranos = {
  periodo: string;
  /** El haber mínimo usado; null si ese mes no tiene resolución y se usó el último publicado. */
  haberMinimo: number | null;
  haberMinimoUsado: number;
  /** El beneficio del causante / del titular: 3 haberes mínimos. */
  montoTitular: number;
  /** El total que se reparte entre derechohabientes: el 100% del beneficio del causante. */
  totalDerivado: number;
  partes: ParteDerechohabiente[];
  /** true si se pidió el reparto pero no hay ningún derechohabiente cargado. */
  sinDerechohabientes: boolean;
  avisos: AvisoVeteranos[];
};

export function calcularVeteranos(e: EntradaVeteranos = {}): ResultadoVeteranos {
  const periodo = e.periodo ?? HABER_MINIMO_ULTIMO.periodo;
  const haberMinimo = haberMinimoDe(periodo);
  const haberMinimoUsado = haberMinimo ?? HABER_MINIMO_ULTIMO.haberMinimo;
  const titular = r2(haberMinimoUsado * HABERES_MINIMOS_TITULAR);

  const avisos: AvisoVeteranos[] = [];
  if (haberMinimo === null) {
    avisos.push({
      tono: "atencion",
      texto: `Ese mes todavía no tiene resolución de haberes de ANSES. La cuenta usa el último haber mínimo publicado (${HABER_MINIMO_ULTIMO.periodo}): acá no se proyecta ningún monto.`,
    });
  }

  const quien = e.quien ?? "titular";
  const hayConyuge = e.hayConyuge === true;
  const hijos = Math.max(0, Math.floor(Number.isFinite(e.hijos) ? (e.hijos as number) : 0));

  if (quien === "titular") {
    return {
      periodo,
      haberMinimo,
      haberMinimoUsado,
      montoTitular: titular,
      totalDerivado: titular,
      partes: [],
      sinDerechohabientes: false,
      avisos,
    };
  }

  // Reparto del art. 7º del Dec. 1357/04. El total repartido es SIEMPRE el 100% del beneficio del
  // causante: el régimen general reparte el 70%, este no.
  const partes: ParteDerechohabiente[] = [];

  if (hayConyuge && hijos === 0) {
    partes.push({
      quien: "Viuda, viudo o conviviente",
      fraccion: R.soloConyuge,
      monto: r2(titular * R.soloConyuge),
      personas: 1,
      montoPorPersona: r2(titular * R.soloConyuge),
      norma: "art. 7º inc. a) Dec. 1357/04",
    });
  } else if (hayConyuge && hijos > 0) {
    partes.push({
      quien: "Viuda, viudo o conviviente",
      fraccion: R.conyugeConHijos,
      monto: r2(titular * R.conyugeConHijos),
      personas: 1,
      montoPorPersona: r2(titular * R.conyugeConHijos),
      norma: "art. 7º inc. b) Dec. 1357/04",
    });
    const total = r2(titular * R.hijosConConyuge);
    partes.push({
      quien: hijos === 1 ? "El hijo con derecho a pensión" : `Los ${hijos} hijos con derecho a pensión`,
      fraccion: R.hijosConConyuge,
      monto: total,
      personas: hijos,
      montoPorPersona: r2(total / hijos),
      norma: "art. 7º inc. b) Dec. 1357/04",
    });
  } else if (!hayConyuge && hijos > 0) {
    const total = r2(titular * R.hijosSolos);
    partes.push({
      quien: hijos === 1 ? "El hijo con derecho a pensión" : `Los ${hijos} hijos con derecho a pensión`,
      fraccion: R.hijosSolos,
      monto: total,
      personas: hijos,
      montoPorPersona: r2(total / hijos),
      norma: "art. 7º inc. c) Dec. 1357/04",
    });
  }

  const sinDerechohabientes = partes.length === 0;
  if (sinDerechohabientes) {
    avisos.push({
      tono: "info",
      texto:
        "No cargaste ningún derechohabiente. A falta de los enumerados en el art. 53 de la Ley 24.241, el beneficio pasa a los padres incapacitados para el trabajo y a cargo del causante. Los padres de quienes murieron en combate acceden con la sola acreditación del vínculo.",
    });
  } else {
    avisos.push({
      tono: "info",
      texto:
        "La pensión derivada es el 100% del beneficio del causante, no el 70% del régimen general. Y si se extingue el derecho de alguno de los copartícipes, el beneficio de los demás se recalcula con exclusión de ese.",
    });
  }

  return {
    periodo,
    haberMinimo,
    haberMinimoUsado,
    montoTitular: titular,
    totalDerivado: titular,
    partes,
    sinDerechohabientes,
    avisos,
  };
}

/** La serie del monto del titular, mes a mes, para todos los meses con resolución dictada. */
export function serieMontos(): { periodo: string; haberMinimo: number; monto: number }[] {
  return HABER_MINIMO_SERIE.map((m) => ({
    periodo: m.periodo,
    haberMinimo: m.haberMinimo,
    monto: r2(m.haberMinimo * HABERES_MINIMOS_TITULAR),
  }));
}
