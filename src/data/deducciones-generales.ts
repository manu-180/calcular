// Deducciones generales del Impuesto a las Ganancias (art. 85 LIG, t.o. Dec. 824/2019): prepaga,
// honorarios médicos, seguros de vida y de retiro, donaciones, intereses hipotecarios y sepelio.
//
// POR QUÉ ESTE ARCHIVO EXISTE. Quien lee el art. 85 en InfoLEG se encuentra con que el tope de los
// seguros de vida es «PESOS CUATRO CENTAVOS ($ 0,04) anuales». No es un error de tipeo ni un tope
// vigente: la Ley 27.430 le pasó la cifra al PEN, el art. 11 del Dec. 18/2023 la fijó en
// $42.921,24 para 2022, y el art. 78 de la Ley 27.743 (B.O. 8/7/2024) sustituyó el último párrafo
// del artículo para que desde el 1/1/2023 se ajuste sola todos los años por el IPC de OCTUBRE del
// año anterior contra octubre del otro. O sea que el número de cada año no hay que copiarlo: se
// DERIVA de la serie del INDEC que ya vive en `ipc-serie.ts` (regla de s74/s78).
//
// EL ANCLA. ARCA publica la tabla de topes en su ayuda de deducciones generales. La derivación
// —coeficiente con toda la precisión del índice, encadenado año a año y redondeado al centavo—
// reproduce los cuatro años publicados AL CENTAVO (verificado el 16/9/2026):
//   2023 $80.707,25 · 2024 $195.845,39 · 2025 $573.817,13 · 2026 $753.472,14.
// Redondear el coeficiente a 4 decimales ya se desvía (2025 da $573.807,41). No tocar el cálculo
// sin correr scripts/check_deducciones_generales.ts, que ancla los cuatro.
//
// LA BASE DEL 5%. Prepaga (inc. f), honorarios médicos (inc. g) y donaciones (inc. c) tienen cada
// uno su propio límite del 5% de la ganancia neta, pero el penúltimo párrafo del artículo define
// esa ganancia neta ANTES de restar esos mismos conceptos, los quebrantos y las deducciones
// personales del art. 30. Es una base más grande que la «ganancia neta» del recibo.

import { IPC_SERIE } from "./ipc-serie";
import { GANANCIAS_VIGENCIA } from "./ganancias";

export const PORCENTAJE_TOPE_GANANCIA_NETA = 0.05;
export const PORCENTAJE_HONORARIOS_FACTURADOS = 0.4;

/** Art. 85 inc. a) — texto vigente, no se actualiza. */
export const TOPE_INTERESES_HIPOTECARIOS = 20_000;

/** Tope de sepelio que ARCA sigue publicando en su ayuda; tampoco se actualiza. */
export const TOPE_SEPELIO = 996.23;

/** Art. 11 del Dec. 18/2023: monto de los incs. b) e i) para el período fiscal 2022. */
export const TOPE_SEGUROS_BASE = { anio: 2022, monto: 42_921.24 } as const;

/** Años anteriores al régimen de ajuste por IPC, tal como los publica ARCA. */
export const TOPES_SEGUROS_ANTERIORES: ReadonlyArray<{ anio: number; monto: number }> = [
  { anio: 2018, monto: 996.23 },
  { anio: 2019, monto: 12_000 },
  { anio: 2020, monto: 18_000 },
  { anio: 2021, monto: 24_000 },
];

/** Lo que publica ARCA para los años con ajuste: sólo se usa como control cruzado en el check. */
export const TOPES_SEGUROS_ARCA: Readonly<Record<number, number>> = {
  2022: 42_921.24,
  2023: 80_707.25,
  2024: 195_845.39,
  2025: 573_817.13,
  2026: 753_472.14,
};

function indiceDe(periodo: string): number | undefined {
  return IPC_SERIE.find(([p]) => p === periodo)?.[1];
}

export type TopeSeguros = {
  anio: number;
  monto: number;
  /** Coeficiente IPC oct(año-1)/oct(año-2) aplicado sobre el año anterior. Null en el año base. */
  coeficiente: number | null;
};

/**
 * Topes de los incs. b) e i) desde 2022 hasta el último año cuyo IPC de octubre ya publicó el
 * INDEC. Cuando la serie traiga octubre de 2026, aparece solo el tope de 2027.
 */
export function topesSegurosDerivados(): TopeSeguros[] {
  const filas: TopeSeguros[] = [
    { anio: TOPE_SEGUROS_BASE.anio, monto: TOPE_SEGUROS_BASE.monto, coeficiente: null },
  ];
  for (let anio = TOPE_SEGUROS_BASE.anio + 1; ; anio++) {
    const actual = indiceDe(`${anio - 1}-10`);
    const previo = indiceDe(`${anio - 2}-10`);
    if (actual === undefined || previo === undefined) break;
    const coeficiente = actual / previo;
    const anterior = filas[filas.length - 1].monto;
    filas.push({ anio, monto: Math.round(anterior * coeficiente * 100) / 100, coeficiente });
  }
  return filas;
}

const DERIVADOS = topesSegurosDerivados();

export const ANIO_FISCAL_VIGENTE = 2026;

export function topeSegurosDe(anio: number): number | undefined {
  return (
    DERIVADOS.find((t) => t.anio === anio)?.monto ??
    TOPES_SEGUROS_ANTERIORES.find((t) => t.anio === anio)?.monto
  );
}

export const TOPE_SEGUROS_VIGENTE = topeSegurosDe(ANIO_FISCAL_VIGENTE) ?? 0;

export const DEDUCCIONES_GENERALES_VIGENCIA = GANANCIAS_VIGENCIA;

/** Citas textuales del TEXTO ACTUALIZADO de InfoLEG (t.o. Dec. 824/2019) y de la ayuda de ARCA. */
export const DEDUCCIONES_GENERALES_TEXTOS = {
  cuatroCentavos:
    "Fíjase como importe máximo a deducir por los conceptos indicados en este inciso la suma de PESOS CUATRO CENTAVOS ($ 0,04) anuales, se trate o no de prima única",
  ajusteIpc:
    "se ajustarán anualmente a partir del 1° de enero de 2023, inclusive, considerando la variación anual del Índice de Precios al Consumidor (IPC) que suministre el Instituto Nacional de Estadística y Censos (INDEC), organismo desconcentrado en el ámbito del Ministerio de Economía, correspondiente al mes de octubre del año anterior al del ajuste respecto del mismo mes del año anterior",
  baseCincoPorCiento:
    "los referidos porcentajes se aplicarán sobre las ganancias netas del ejercicio que resulten antes de deducir el importe de los conceptos comprendidos en las citadas normas, el de los quebrantos de años anteriores y, cuando corresponda, las sumas a que se refiere el artículo 30 de la ley",
  prepaga:
    "serán deducibles los importes abonados en concepto de cuotas o abonos a instituciones que presten cobertura médico asistencial, correspondientes al contribuyente y a las personas que revistan para éste el carácter de cargas de familia. Esta deducción no podrá superar el CINCO POR CIENTO (5 %) de la ganancia neta del ejercicio",
  honorarios:
    "La deducción se admitirá siempre que se encuentre efectivamente facturada por el respectivo prestador del servicio y hasta un máximo del CUARENTA POR CIENTO (40 %) del total de la facturación del período fiscal de que se trate, siempre y en la medida en que los importes no se encuentren alcanzados por sistemas de reintegro incluidos en planes de cobertura médica",
  diferimiento:
    "Los excedentes del importe máximo mencionado precedentemente serán deducibles en los años de vigencia del contrato de seguro posteriores al del pago, hasta cubrir el total abonado por el asegurado",
  hipotecario:
    "los intereses correspondientes a créditos hipotecarios que les hubieren sido otorgados por la compra o la construcción de inmuebles destinados a casa habitación del contribuyente, o del causante en el caso de sucesiones indivisas, hasta la suma de PESOS VEINTE MIL ($ 20.000) anuales",
  arcaPrepaga:
    "Cargá los importes que abonaste por cuota o abono a medicina prepaga o aportes complementarios a obras sociales",
  arcaSepelio:
    "Los gastos de sepelio pueden deducirse cuando ocurran en el país y se originen en el fallecimiento del empleado o de alguna de las personas informadas como carga de familia, hasta el tope de $ 996,23",
} as const;

export const DEDUCCIONES_GENERALES_FUENTES = {
  consultadoEl: "16 de septiembre de 2026",
  lista: [
    {
      nombre: "Ley de Impuesto a las Ganancias (t.o. Dec. 824/2019), art. 85 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
      detalle:
        "los incisos a) intereses hipotecarios, b) seguros de vida y mixtos, c) donaciones, f) prepaga, g) honorarios médicos e i) seguros de retiro; el párrafo que define la base del 5% y el que manda ajustar los topes de seguros por el IPC de octubre.",
    },
    {
      nombre: "Ley 27.743 (B.O. 8/7/2024), art. 78",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/400000-404999/401268/norma.htm",
      detalle:
        "sustituyó el último párrafo del art. 85 con efecto desde el año fiscal 2023: los montos del Dec. 18/2023 se ajustan cada año por la variación del IPC de octubre contra octubre.",
    },
    {
      nombre: "Decreto 18/2023 (B.O. 13/1/2023), art. 11 — según la nota de InfoLEG al art. 85",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm#dec18",
      detalle:
        "fijó en $42.921,24 el tope de los incisos b) e i) para el período fiscal 2022: la base del ajuste. ARCA publica el mismo número para 2022.",
    },
    {
      nombre: "INDEC — IPC nivel general, serie oficial (apis.datos.gob.ar)",
      url: "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&format=json&limit=1000",
      detalle: "los índices de octubre de cada año, de donde sale el coeficiente del ajuste.",
    },
    {
      nombre: "ARCA — Deducciones generales (conceptos y topes)",
      url: "https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/deducciones/deducciones-generales.asp",
      detalle:
        "la tabla de topes de seguros por año, los $20.000 de intereses hipotecarios y los $996,23 de sepelio. Sirve de control cruzado: la derivación reproduce al centavo los cuatro años publicados con ajuste.",
    },
  ],
} as const;
