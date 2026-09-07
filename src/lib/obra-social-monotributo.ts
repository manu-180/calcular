import { CATEGORIAS } from "@/data/monotributo";
import {
  ESCALONES,
  MESES_PARA_CAMBIAR,
  REPARTO_MONOTRIBUTO,
  type Escalon,
} from "@/data/obra-social-monotributo";
import { sumarMeses } from "@/lib/obra-social-continuidad";

export type EntradaMonoOS = {
  /** Fecha de adhesión al régimen simplificado (o de reincorporación: el art. 73 la reinicia). */
  adhesionISO: string;
  /** Fecha contra la que se evalúa la cobertura. */
  hoyISO: string;
  /** Categoría del monotributo: define el aporte de obra social (escala desde la D). */
  categoria: string;
  /** Art. 72: quien adhirió antes de la Ley 26.565 no tiene acceso progresivo. */
  anteriorA26565: boolean;
};

export type EscalonResuelto = {
  escalon: Escalon;
  /** Fecha desde la que se accede a este escalón. */
  desdeISO: string;
  abierto: boolean;
  /** Días que faltan para abrirlo. 0 si ya está abierto. */
  diasQueFaltan: number;
};

export type ResultadoMonoOS = {
  escalones: EscalonResuelto[];
  /** El primer escalón todavía cerrado, o null si ya están los tres. */
  proximo: EscalonResuelto | null;
  /** Desde cuándo se puede ejercer la opción de cambio de obra social (art. 74 inc. c). */
  cambioDesdeISO: string;
  puedeCambiar: boolean;
  /** Aporte mensual de obra social del titular, según la categoría (art. 39 inc. b). */
  aporteTitular: number;
  /** De ese aporte, lo que llega a la obra social elegida (90%). */
  aEntidad: number;
  /** Y lo que va al Fondo Solidario de Redistribución (10%). */
  aFondo: number;
  veredicto: string;
};

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const DIA_MS = 86_400_000;

function aUTC(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Días enteros entre dos fechas ISO (positivo si `hasta` es posterior). */
export function diasEntre(desdeISO: string, hastaISO: string): number {
  return Math.round((aUTC(hastaISO) - aUTC(desdeISO)) / DIA_MS);
}

export function calcularMonoOS(e: EntradaMonoOS): ResultadoMonoOS | null {
  if (!ISO.test(e.adhesionISO) || !ISO.test(e.hoyISO)) return null;
  if (e.adhesionISO > e.hoyISO) return null;

  const cat = CATEGORIAS.find((c) => c.cat === e.categoria);
  if (!cat) return null;

  const escalones: EscalonResuelto[] = ESCALONES.map((escalon) => {
    // Art. 72: quien ya estaba antes de la Ley 26.565 no cumple carencia — los tres escalones
    // están abiertos desde la adhesión, y la fecha que se muestra es esa misma.
    const desdeISO = e.anteriorA26565 ? e.adhesionISO : sumarMeses(e.adhesionISO, escalon.meses);
    const abierto = desdeISO <= e.hoyISO;
    return {
      escalon,
      desdeISO,
      abierto,
      diasQueFaltan: abierto ? 0 : diasEntre(e.hoyISO, desdeISO),
    };
  });

  const proximo = escalones.find((x) => !x.abierto) ?? null;

  const cambioDesdeISO = sumarMeses(e.adhesionISO, MESES_PARA_CAMBIAR);
  const puedeCambiar = cambioDesdeISO <= e.hoyISO;

  const aporteTitular = cat.obraSocial;
  const aFondo = Math.round(aporteTitular * REPARTO_MONOTRIBUTO.fondo * 100) / 100;
  const aEntidad = Math.round((aporteTitular - aFondo) * 100) / 100;

  const veredicto = e.anteriorA26565
    ? "No tenés carencia: adheriste antes de la Ley 26.565 y el art. 72 del Decreto 1/2010 te deja fuera del acceso progresivo."
    : proximo === null
      ? "Ya tenés los tres escalones abiertos: ambulatorio, internación y las prestaciones de alto costo e Integración."
      : proximo.escalon.id === "tres-meses"
        ? `Todavía no tenés la internación cubierta por derecho: ese escalón se abre dentro de ${proximo.diasQueFaltan} día(s).`
        : `Tenés ambulatorio e internación. Falta el escalón de alto costo, SURGE e Integración: se abre dentro de ${proximo.diasQueFaltan} día(s).`;

  return {
    escalones,
    proximo,
    cambioDesdeISO,
    puedeCambiar,
    aporteTitular,
    aEntidad,
    aFondo,
    veredicto,
  };
}
