// Motor de líneas de indigencia y pobreza de un hogar concreto (metodología INDEC N° 22).
//
// ⚠️ ENCUADRE — leer antes de tocar esto. Esto NO declara pobre a nadie ni da acceso a ningún
// beneficio: reproduce el umbral estadístico con el que el INDEC mide la pobreza por ingresos.
//
//   1. Cada integrante del hogar vale una fracción de "adulto equivalente" (AE) según sexo y edad
//      (tabla oficial en src/data/adulto-equivalente.ts).
//   2. Línea de indigencia del hogar = CBA del adulto equivalente × AE del hogar.
//      Línea de pobreza del hogar    = CBT del adulto equivalente × AE del hogar.
//   3. Se compara el INGRESO TOTAL del hogar contra esas dos líneas. Debajo de la de indigencia:
//      hogar indigente. Entre ambas: hogar pobre no indigente. Por encima: hogar no pobre.
//
// LÍMITES QUE HAY QUE DECIR EN LA UI, no esconder:
//   · La CBA/CBT que publica el INDEC mes a mes es la del **Gran Buenos Aires**. Para el resto del
//     país el INDEC aplica coeficientes regionales que no se publican en esta serie mensual, así
//     que este cálculo es una referencia nacional aproximada, no el umbral exacto de cada región.
//   · El INDEC mide el ingreso total familiar de la EPH (incluye todos los ingresos de todos los
//     miembros, laborales y no laborales). Un cálculo con un solo sueldo subestima el ingreso real.
//   · No contempla el valor locativo de la vivienda propia ni el acceso gratuito a servicios.

import { CANASTA_BASICA_ULTIMO, type MesCanastaBasica } from "@/data/canasta-basica";
import { adultoEquivalente, type SexoAE } from "@/data/adulto-equivalente";

export type IntegranteHogar = { edad: number; sexo: SexoAE };

export type EntradaCanastaBasica = {
  integrantes: IntegranteHogar[];
  /** Ingreso mensual TOTAL del hogar (todos los ingresos de todos los miembros). null = no informado. */
  ingresoHogar: number | null;
  /** Mes de la canasta a usar. Por defecto, el último publicado. */
  mes?: MesCanastaBasica;
};

export type SituacionHogar = "indigente" | "pobre" | "no-pobre";

export type ResultadoCanastaBasica = {
  periodo: string;
  /** Adultos equivalentes del hogar, redondeados a 2 decimales como los publica el INDEC. */
  adultosEquivalentes: number;
  /** Umbral mensual de indigencia del hogar (CBA × AE). */
  lineaIndigencia: number;
  /** Umbral mensual de pobreza del hogar (CBT × AE). */
  lineaPobreza: number;
  /** Detalle por integrante, en el orden en que se pasaron. */
  detalle: { edad: number; sexo: SexoAE; ae: number }[];
  /** null cuando no se informó el ingreso: las líneas valen igual, la clasificación no. */
  situacion: SituacionHogar | null;
  /**
   * Diferencia entre el ingreso y la línea de pobreza. Positiva = por encima.
   * null si no se informó el ingreso.
   */
  brechaPobreza: number | null;
  /** Cuántas veces la línea de pobreza cubre el ingreso del hogar (1 = justo en la línea). */
  vecesLineaPobreza: number | null;
};

const r2 = (n: number) => Math.round(n * 100) / 100;

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "2026-06" → "junio 2026". La serie guarda sólo el período: la etiqueta se deriva. */
export function etiquetaPeriodo(periodo: string): string {
  const [anio, mes] = periodo.split("-");
  return `${MESES[Number(mes) - 1]} ${anio}`;
}

/** Variación mensual del total de la CBT (o de la CBA), en %. null si no hay mes previo. */
export function varMensual(
  serie: MesCanastaBasica[],
  periodo: string,
  campo: "cba" | "cbt",
): number | null {
  const i = serie.findIndex((m) => m.periodo === periodo);
  if (i <= 0) return null;
  return (serie[i][campo] / serie[i - 1][campo] - 1) * 100;
}

/** Variación interanual (12 meses) de la CBA o la CBT, en %. null si no hay 12 meses atrás. */
export function varInteranual(
  serie: MesCanastaBasica[],
  periodo: string,
  campo: "cba" | "cbt",
): number | null {
  const i = serie.findIndex((m) => m.periodo === periodo);
  if (i < 12) return null;
  return (serie[i][campo] / serie[i - 12][campo] - 1) * 100;
}

/**
 * Calcula las líneas del hogar y, si hay ingreso, su situación.
 * Devuelve null si el hogar está vacío o si alguna edad no es válida — nunca inventa un tramo.
 */
export function calcularCanastaBasica(e: EntradaCanastaBasica): ResultadoCanastaBasica | null {
  const mes = e.mes ?? CANASTA_BASICA_ULTIMO;
  if (!Array.isArray(e.integrantes) || e.integrantes.length === 0) return null;
  if (e.ingresoHogar !== null && (!Number.isFinite(e.ingresoHogar) || e.ingresoHogar < 0)) return null;

  const detalle: { edad: number; sexo: SexoAE; ae: number }[] = [];
  for (const i of e.integrantes) {
    const ae = adultoEquivalente(i.edad, i.sexo);
    if (ae === null) return null;
    detalle.push({ edad: i.edad, sexo: i.sexo, ae });
  }

  // El INDEC publica los AE de sus hogares de ejemplo con 2 decimales; se redondea antes de
  // multiplicar para que los ejemplos oficiales reconstruyan exacto.
  const adultosEquivalentes = r2(detalle.reduce((a, d) => a + d.ae, 0));
  const lineaIndigencia = r2(mes.cba * adultosEquivalentes);
  const lineaPobreza = r2(mes.cbt * adultosEquivalentes);

  let situacion: SituacionHogar | null = null;
  let brechaPobreza: number | null = null;
  let vecesLineaPobreza: number | null = null;

  if (e.ingresoHogar !== null) {
    situacion =
      e.ingresoHogar < lineaIndigencia
        ? "indigente"
        : e.ingresoHogar < lineaPobreza
          ? "pobre"
          : "no-pobre";
    brechaPobreza = r2(e.ingresoHogar - lineaPobreza);
    vecesLineaPobreza = lineaPobreza > 0 ? r2(e.ingresoHogar / lineaPobreza) : null;
  }

  return {
    periodo: mes.periodo,
    adultosEquivalentes,
    lineaIndigencia,
    lineaPobreza,
    detalle,
    situacion,
    brechaPobreza,
    vecesLineaPobreza,
  };
}
