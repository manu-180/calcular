// Qué muestra la vista previa de la Planilla de Ganancias de sociedades: las filas reales de la
// hoja «Mi sociedad» del archivo, con sus números de fila y con los importes del MISMO motor que la
// calculadora gratis de /ganancias-sociedades. La usan la landing (server) y la oferta de abajo de
// la calculadora (cliente), así las dos muestran exactamente lo que se descarga.
//
// Sin importar nada de node: la oferta es un componente de cliente.

import type { FilaHoja, HojaPrevia } from "@/components/HojaCalculo";
import { ALICUOTA_DIVIDENDOS, escalaDe } from "@/data/ganancias-sociedades";
import { calcularGananciasSociedades, type ResultadoGananciasSociedades } from "@/lib/ganancias-sociedades";
import { formatARS } from "@/lib/formato";

/** Los doce meses, como los escribe el desplegable de la planilla. */
export const MESES_CIERRE = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
] as const;

/** Las filas de «Mi sociedad» que se muestran. Son las del archivo: si el generador las mueve, acá
 *  también, y check_planilla_ganancias_sociedades.ts compara los importes contra el motor. */
export const FILAS_SOCIEDADES = {
  mesCierre: 5,
  anioCierre: 6,
  ganancia: 9,
  anioInicio: 15,
  tramo: 17,
  impuesto: 22,
  efectiva: 23,
  dividendos: 28,
  retencion: 29,
  seccionTabla: 34,
  impuestoCierre: 36,
  diferencia: 37,
} as const;

export type CasoSociedades = {
  gananciaNetaImponible: number;
  /** El año que elige la escala: el de INICIO del ejercicio. */
  anioInicioEjercicio: number;
  /** Parte de la ganancia después de impuesto que se reparte a socios personas humanas (0 a 1). */
  porcentajeDistribuido: number;
  /** Mes en que cierra el ejercicio (1 a 12). Diciembre significa que empieza y cierra el mismo año. */
  mesCierre: number;
};

export type PreviaSociedades = {
  hoja: HojaPrevia;
  resultado: ResultadoGananciasSociedades;
  /** Año de cierre derivado del mes: con cierre en diciembre, el mismo que el de inicio. */
  anioCierre: number;
  /** Impuesto con la escala del año de cierre, cuando esa escala existe y no es la misma. */
  conTablaDelCierre: number | null;
  /** Lo que se declararía de MENOS usando la tabla del año de cierre. */
  diferencia: number | null;
};

const pct = (n: number, d = 2) => `${(n * 100).toLocaleString("es-AR", { maximumFractionDigits: d })}%`;

export function anioCierreDe(caso: Pick<CasoSociedades, "anioInicioEjercicio" | "mesCierre">): number {
  return caso.mesCierre === 12 ? caso.anioInicioEjercicio : caso.anioInicioEjercicio + 1;
}

/**
 * La previa de un caso. Devuelve null si no hay escala para ese año de inicio: la planilla tampoco
 * inventa un impuesto, así que la oferta no se muestra.
 */
export function previaSociedades(archivo: string, caso: CasoSociedades): PreviaSociedades | null {
  const resultado = calcularGananciasSociedades({
    gananciaNetaImponible: caso.gananciaNetaImponible,
    anioInicioEjercicio: caso.anioInicioEjercicio,
    porcentajeDistribuido: caso.porcentajeDistribuido,
  });
  if (!resultado) return null;

  const anioCierre = anioCierreDe(caso);
  // La tabla del año de cierre: el error que esta planilla existe para evitar. Sólo se muestra si
  // ese año ya tiene escala publicada y de verdad es otra.
  const otra = anioCierre !== caso.anioInicioEjercicio && escalaDe(anioCierre) ? escalaDe(anioCierre) : undefined;
  const conTablaDelCierre = otra
    ? calcularGananciasSociedades({
        gananciaNetaImponible: caso.gananciaNetaImponible,
        anioInicioEjercicio: anioCierre,
        porcentajeDistribuido: 0,
      })!.impuesto
    : null;
  const diferencia = conTablaDelCierre === null ? null : Math.round((resultado.impuesto - conTablaDelCierre) * 100) / 100;

  const filas: FilaHoja[] = [
    { fila: FILAS_SOCIEDADES.mesCierre, etiqueta: "Mes de cierre del ejercicio", valor: MESES_CIERRE[caso.mesCierre - 1], tono: "input" },
    { fila: FILAS_SOCIEDADES.anioCierre, etiqueta: "Año de cierre del ejercicio", valor: String(anioCierre), tono: "input" },
    { fila: FILAS_SOCIEDADES.ganancia, etiqueta: "Ganancia neta imponible", valor: caso.gananciaNetaImponible, tono: "input" },
    {
      fila: FILAS_SOCIEDADES.anioInicio,
      etiqueta: "Año de INICIO (el que elige la tabla)",
      valor: String(caso.anioInicioEjercicio),
      tono: "total",
    },
    { fila: FILAS_SOCIEDADES.tramo, etiqueta: "Tramo", valor: pct(resultado.tramo.alicuota, 0) },
    { fila: FILAS_SOCIEDADES.impuesto, etiqueta: "IMPUESTO DETERMINADO", valor: resultado.impuesto, tono: "total" },
    { fila: FILAS_SOCIEDADES.efectiva, etiqueta: "Alícuota efectiva", valor: pct(resultado.alicuotaEfectiva) },
  ];

  if (resultado.dividendos > 0) {
    filas.push(
      { fila: FILAS_SOCIEDADES.dividendos, etiqueta: "Dividendos repartidos", valor: resultado.dividendos },
      {
        fila: FILAS_SOCIEDADES.retencion,
        etiqueta: `Retención del ${pct(ALICUOTA_DIVIDENDOS, 0)}`,
        valor: resultado.retencionDividendos,
      },
    );
  }

  if (diferencia !== null && conTablaDelCierre !== null) {
    filas.push(
      { fila: FILAS_SOCIEDADES.seccionTabla, etiqueta: "EL ERROR MÁS CARO: EQUIVOCARSE DE TABLA", tono: "seccion" },
      { fila: FILAS_SOCIEDADES.impuestoCierre, etiqueta: `Con la tabla de ${anioCierre}`, valor: conTablaDelCierre },
      { fila: FILAS_SOCIEDADES.diferencia, etiqueta: "DIFERENCIA que declararías de menos", valor: diferencia, tono: "total" },
    );
  }

  return {
    hoja: {
      archivo,
      pestanas: ["Instrucciones", "Mi sociedad", "Escalas", "Quebrantos", "IPC", "Fuentes"],
      hoja: "Mi sociedad",
      filas,
    },
    resultado,
    anioCierre,
    conTablaDelCierre,
    diferencia,
  };
}

/** El caso emblemático de la landing: una sociedad que cierra en junio, así que liquida con la
 *  tabla del año anterior. Es el caso que la página gratis ya usa para explicar la trampa. */
export const CASO_LANDING = (anioInicio: number): CasoSociedades => ({
  gananciaNetaImponible: 500_000_000,
  anioInicioEjercicio: anioInicio,
  porcentajeDistribuido: 0,
  mesCierre: 6,
});

export const formatoPesos = formatARS;
