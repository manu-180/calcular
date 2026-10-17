// Personal de casas particulares (Ley 26.844) — escala salarial oficial y reglas del régimen.
//
// POR QUÉ ESTE ARCHIVO EXISTE: «cuánto cobra una empleada doméstica por hora» es una de las
// consultas laborales más buscadas del país, y la SERP son notas de portales que copian la tabla de
// una categoría (la más común) y se olvidan de las otras cuatro, del adicional por zona
// desfavorable y de que el mínimo mensual y el valor hora son dos pisos distintos que conviven.
//
// LA ESCALA NO SE COPIA DE UN MEDIO. Los importes salen de los CINCO ANEXOS de la Resolución
// CNTCP 6/2026 (B.O. 3/9/2026), bajados del propio BORA y parseados por coordenadas con
// `tools/pdf-tabla.ts`. Verificado el 15/9/2026.
//
// ═══ LOS DOS HALLAZGOS DE ESTA RESOLUCIÓN, VERIFICADOS CONTRA LOS ANEXOS ═══
//
// 1. **Septiembre NO es «agosto + 1,8%».** El art. 7 incorpora a los básicos de septiembre el 25%
//    de la suma no remunerativa de $20.000 ANTES de aplicar el aumento, así que el mensual de
//    septiembre es `(agosto + $5.000) × 1,018` — reproduce los NUEVE valores mensuales del Anexo 2
//    al centavo. Quien aplique el 1,8% sobre la escala de agosto queda $5.090 corto por mes, en
//    todas las categorías. Lo mismo en octubre con el 50% (`(septiembre + $10.000) × 1,017`).
//
// 2. **Noviembre y diciembre salen de los anexos RECTIFICADOS por la Res. CNTCP 7/2026 (B.O.
//    18/9/2026).** La 6/2026 citó como Anexos 4 y 5 dos documentos equivocados: el "Anexo 4" que
//    se cargó el 15/9 sólo se reproducía con 1,7% aunque el art. 4 dice 1,6%, y así quedó
//    publicado once días (un supervisor con retiro, $604 de más por mes en noviembre). La 7/2026
//    rectificó los números de informe (IF-2026-85628114 y IF-2026-85636281) y sus anexos
//    reproducen el articulado al centavo: noviembre = `(octubre + $5.000) × 1,016` y diciembre =
//    `noviembre × 1,016`, sin nada que incorporar (el $20.000 queda absorbido en noviembre).
//    Lo detectó el semáforo del workflow datos-vivos el 28/9/2026. Lección: una discrepancia entre
//    el articulado y un anexo no es "un hallazgo a publicar", es un aviso de que el anexo puede
//    estar mal; se vigila el B.O. hasta que la norma se corrija.
//
// El valor HORA tiene su propia aritmética y NO se deriva del mensual: en septiembre el mensual
// sube $5.000 planos en todas las categorías, pero la hora sube entre $39,40 y $40,84 según la
// categoría y la modalidad. Por eso acá no se calcula ningún valor hora: se transcribe del anexo.
//
// CÓMO SE ROTA: cuando la CNTCP publique una resolución nueva, la escala se baja del BORA:
//   1. `npx -y tsx tools/boletin-oficial.ts --buscar "CASAS PARTICULARES" --dias 45`
//   2. abrir el aviso con `--aviso <id> --fecha <ISO>` y leer el articulado (los % y las sumas).
//   3. los ANEXOS **no** están en el PDF del aviso («se publican en la edición web del BORA»).
//      Se bajan con un POST a `https://www.boletinoficial.gob.ar/pdf/download_anexo` con
//      `seccion=primera&nroAnexo=<N>&idAnexo=<id del anexo>&fechaPublicacion=<AAAAMMDD>`; el
//      `idAnexo` sale del HTML del aviso, en las llamadas `descargarPDFAnexo(...)`. La respuesta es
//      JSON con el PDF en base64 (`pdfBase64`).
//   4. parsear con `npx -y tsx tools/pdf-tabla.ts <pdf>` (por coordenadas — NUNCA texto plano) y
//      correr `scripts/check_casas_particulares.ts`, que ancla las derivaciones de arriba.

import { hoyAR } from "../lib/hoy";

export type CategoriaCasasParticulares = {
  id: string;
  nombre: string;
  /** Descripción textual del ANEXO de la resolución, no una paráfrasis. */
  tareas: string;
  /** Valor hora con retiro. Null cuando la categoría no admite esa modalidad (caseros). */
  horaConRetiro: number | null;
  horaSinRetiro: number;
  /** Mínimo mensual con retiro. Null cuando la categoría no admite esa modalidad. */
  mesConRetiro: number | null;
  mesSinRetiro: number;
};

/** Identidad de cada categoría: es la misma en los cinco anexos, sólo cambian los importes. */
const CATEGORIAS_META = [
  {
    id: "supervisor",
    nombre: "Supervisor/a",
    tareas: "Coordinación y control de las tareas efectuadas por dos o más personas a su cargo.",
  },
  {
    id: "tareas-especificas",
    nombre: "Personal para tareas específicas",
    tareas:
      "Cocineros/as contratados en forma exclusiva para desempeñar dicha labor, y toda otra tarea del hogar que requiera especial idoneidad del personal para llevarla a cabo.",
  },
  {
    id: "caseros",
    nombre: "Caseros",
    tareas:
      "Personal que presta tareas inherentes al cuidado general y preservación de una vivienda en donde habita con motivo del contrato de trabajo.",
  },
  {
    id: "asistencia-personas",
    nombre: "Asistencia y cuidado de personas",
    tareas:
      "Comprende la asistencia y cuidado no terapéutico de personas, tales como: personas enfermas, con discapacidad, niños/as, adolescentes, adultos mayores.",
  },
  {
    id: "tareas-generales",
    nombre: "Personal para tareas generales",
    tareas:
      "Prestación de tareas de limpieza, lavado, planchado, mantenimiento, elaboración y cocción de comidas y, en general, toda otra tarea típica del hogar.",
  },
] as const;

/**
 * Los cuatro importes de cada categoría, en el orden del anexo:
 * [hora con retiro, hora sin retiro, mes con retiro, mes sin retiro].
 * `null` donde el anexo trae un guion (los caseros sólo existen sin retiro).
 */
type Fila = [number | null, number, number | null, number];

type MesEscala = {
  id: string;
  /** Como lo titula el propio anexo, en castellano. */
  etiqueta: string;
  /** Primer día del mes desde el que rige. Se compara contra la fecha de build. */
  desdeISO: string;
  /** Qué anexo de la Resolución 6/2026 lo publica, y el artículo que lo fija. */
  anexo: string;
  articulo: string;
  /** Incremento que el ARTICULADO declara para ese mes, en %. */
  incrementoDeclarado: number | null;
  /**
   * Incremento que REPRODUCE el anexo al centavo. Distinto del declarado sólo en noviembre
   * (el art. 4 dice 1,6% y el Anexo 4 sólo sale con 1,7%).
   */
  incrementoDelAnexo: number | null;
  /** Suma no remunerativa que se incorpora a los mensuales ANTES de aplicar el incremento. */
  incorporaAlBasico: number;
  filas: Record<string, Fila>;
};

/** Escalas mensuales de la Resolución CNTCP 6/2026 (Anexos 1 a 5). Transcriptas, no calculadas. */
export const ESCALAS_POR_MES: MesEscala[] = [
  {
    id: "2026-08",
    etiqueta: "agosto de 2026",
    desdeISO: "2026-08-01",
    anexo: "Anexo 1",
    articulo: "art. 1",
    incrementoDeclarado: 1.9,
    incrementoDelAnexo: 1.9,
    incorporaAlBasico: 0,
    filas: {
      supervisor: [4523.11, 4920.89, 564246.7, 624313.9],
      "tareas-especificas": [4303.5, 4684.53, 526829.56, 582283.26],
      caseros: [null, 4072.38, null, 514903.51],
      "asistencia-personas": [4072.38, 4520.15, 514903.51, 569593.41],
      "tareas-generales": [3804.66, 4072.38, 466756.24, 514903.51],
    },
  },
  {
    id: "2026-09",
    etiqueta: "septiembre de 2026",
    desdeISO: "2026-09-01",
    anexo: "Anexo 2",
    articulo: "art. 2",
    incrementoDeclarado: 1.8,
    incrementoDelAnexo: 1.8,
    incorporaAlBasico: 5000,
    filas: {
      supervisor: [4645.33, 5049.58, 579493.14, 640641.55],
      "tareas-especificas": [4422.54, 4809.8, 541402.49, 597854.36],
      caseros: [null, 4185.94, null, 529261.78],
      "asistencia-personas": [4185.94, 4641.9, 529261.78, 584936.09],
      "tareas-generales": [3914.64, 4185.94, 480247.85, 529261.78],
    },
  },
  {
    id: "2026-10",
    etiqueta: "octubre de 2026",
    desdeISO: "2026-10-01",
    anexo: "Anexo 3",
    articulo: "art. 3",
    incrementoDeclarado: 1.7,
    incrementoDelAnexo: 1.7,
    incorporaAlBasico: 10000,
    filas: {
      supervisor: [4805.82, 5215.59, 599514.52, 661702.46],
      "tareas-especificas": [4580.8, 4973.38, 560776.33, 618187.89],
      caseros: [null, 4337.53, null, 548429.23],
      "asistencia-personas": [4337.53, 4801.52, 548429.23, 605050.0],
      "tareas-generales": [4064.08, 4337.53, 498582.06, 548429.23],
    },
  },
  {
    id: "2026-11",
    etiqueta: "noviembre de 2026",
    desdeISO: "2026-11-01",
    anexo: "Anexo 4",
    articulo: "art. 4",
    incrementoDeclarado: 1.6,
    incrementoDelAnexo: 1.6,
    incorporaAlBasico: 5000,
    filas: {
      supervisor: [4923.44, 5339.08, 614186.76, 677369.7],
      "tareas-especificas": [4695.59, 5093.82, 574828.75, 633158.89],
      caseros: [null, 4447.11, null, 562284.09],
      "asistencia-personas": [4447.11, 4918.66, 562284.09, 619810.8],
      "tareas-generales": [4170.52, 4447.11, 511639.37, 562284.09],
    },
  },
  {
    id: "2026-12",
    etiqueta: "diciembre de 2026",
    desdeISO: "2026-12-01",
    anexo: "Anexo 5",
    articulo: "art. 5",
    incrementoDeclarado: 1.6,
    incrementoDelAnexo: 1.6,
    incorporaAlBasico: 0,
    filas: {
      supervisor: [5002.21, 5424.5, 624013.75, 688207.61],
      "tareas-especificas": [4770.72, 5175.33, 584026.01, 643289.43],
      caseros: [null, 4518.27, null, 571280.64],
      "asistencia-personas": [4518.27, 4997.36, 571280.64, 629727.77],
      "tareas-generales": [4237.25, 4518.27, 519825.6, 571280.64],
    },
  },
];

export function escalaDe(mesId: string): CategoriaCasasParticulares[] {
  const mes = ESCALAS_POR_MES.find((m) => m.id === mesId) ?? ESCALAS_POR_MES[0];
  return CATEGORIAS_META.map((c) => {
    const [horaConRetiro, horaSinRetiro, mesConRetiro, mesSinRetiro] = mes.filas[c.id];
    return { ...c, horaConRetiro, horaSinRetiro, mesConRetiro, mesSinRetiro };
  });
}

/**
 * El último mes de la serie cuya vigencia ya empezó, resuelto en cada render.
 *
 * POR QUÉ SE DERIVA Y NO SE ESCRIBE (15/9/2026): hasta hoy `vigenciaCasas().vigenteEn` era una constante
 * a mano («agosto de 2026») y el sitio estuvo liquidando septiembre con la escala de julio, porque
 * la resolución salió el 3/9 y nadie movió la constante. Con la serie completa cargada, el mes
 * vigente es una consecuencia de la fecha, no una decisión que alguien puede olvidar. Cuando la
 * serie se agote (después de diciembre) el último mes queda fijo, que es lo correcto: la escala
 * vieja sigue rigiendo hasta que haya una nueva.
 */
export function mesVigente(hoy: Date | string = hoyAR()): MesEscala {
  const iso = typeof hoy === "string" ? hoy : hoy.toISOString().slice(0, 10);
  const empezados = ESCALAS_POR_MES.filter((m) => m.desdeISO <= iso);
  return empezados.at(-1) ?? ESCALAS_POR_MES[0];
}

/** La escala del mes que se está liquidando hoy. Misma forma que siempre: el resto del sitio la usa así. */
export function escalaVigente(): CategoriaCasasParticulares[] {
  return escalaDe(mesVigente().id);
}

export function vigenciaCasas() {
  const mes = mesVigente();
  return {
    /** Mes desde el que rige la escala que se muestra. */
    desde: mes.etiqueta,
    /** Mes que se está liquidando con ella. Con la serie cargada, son el mismo. */
    vigenteEn: mes.etiqueta,
    mesId: mes.id,
    anexo: mes.anexo,
    resolucion: "Resolución CNTCP 6/2026",
    boletinOficial: "B.O. 3/9/2026",
    /** Rectificó los anexos de noviembre y diciembre. El rastreador la cuenta como ya cargada. */
    rectificadaPor: "Resolución CNTCP 7/2026",
    /** Último mes con escala publicada: después de éste hay que buscar resolución nueva. */
    ultimoMesPublicado: ESCALAS_POR_MES.at(-1)!.etiqueta,
  } as const;
}

/**
 * Suma no remunerativa por única vez del art. 6 de la Resolución 6/2026: se paga con los salarios
 * de agosto de 2026 y NO es parte del básico. Los tramos son por horas semanales, no por categoría.
 */
export const SUMA_NO_REMUNERATIVA = {
  articulo: "Resolución CNTCP 6/2026, art. 6",
  pagaderaCon: "los salarios del mes de agosto de 2026",
  tramos: [
    { desdeHorasSemanales: 16, hasta: null, monto: 20000, detalle: "16 horas semanales o más" },
    { desdeHorasSemanales: 12, hasta: 16, monto: 11500, detalle: "de 12 a menos de 16 horas semanales" },
    { desdeHorasSemanales: 0, hasta: 12, monto: 8000, detalle: "menos de 12 horas semanales" },
  ],
  /** Arts. 7, 8 y 9: qué porcentaje de esa suma se incorpora al básico y en qué mes. */
  incorporacion: [
    { mes: "septiembre de 2026", porcentaje: 25, articulo: "art. 7" },
    { mes: "octubre de 2026", porcentaje: 50, articulo: "art. 8" },
    { mes: "noviembre de 2026", porcentaje: 25, articulo: "art. 9" },
  ],
} as const;

/** Monto de la suma no remunerativa del art. 6 según las horas semanales trabajadas. */
export function sumaNoRemunerativaPorHoras(horasSemanales: number): number {
  const tramo = SUMA_NO_REMUNERATIVA.tramos.find((t) => horasSemanales >= t.desdeHorasSemanales);
  return tramo?.monto ?? 0;
}

/**
 * Adicional por zona desfavorable: 31% sobre el mínimo de cada categoría desde el 1/4/2026
 * (art. 7 de la Resolución 4/2026; los anexos de la 6/2026 lo reproducen sin cambios).
 */
export const ZONA_DESFAVORABLE = {
  porcentaje: 31,
  desde: "1 de abril de 2026",
  provincias: [
    "La Pampa",
    "Río Negro",
    "Chubut",
    "Neuquén",
    "Santa Cruz",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  ],
  /** El único partido bonaerense alcanzado. */
  partidoBonaerense: "Patagones",
} as const;

/** Jornada máxima del art. 14.1 inc. a) de la Ley 26.844. */
export const JORNADA = {
  horasDiarias: 8,
  horasSemanales: 48,
  /** Con distribución semanal desigual, el tope diario es de 9 horas. */
  horasDiariasMaximoDesigual: 9,
  articulo: "Ley 26.844, art. 14.1 inc. a)",
} as const;

/** Recargos por horas suplementarias (art. 25 de la Ley 26.844). */
export const HORAS_EXTRAS = {
  comunes: 50,
  /** Sábados después de las 13, domingos y feriados. */
  finDeSemanaYFeriados: 100,
  articulo: "Ley 26.844, art. 25",
} as const;

/** Aguinaldo del régimen: 50% de la mayor remuneración del semestre (art. 26). */
export const SAC = {
  porcentaje: 50,
  base: "la mayor remuneración mensual devengada, por todo concepto, dentro del semestre",
  articulo: "Ley 26.844, art. 26",
} as const;

/** Vacaciones por antigüedad (art. 29 de la Ley 26.844) — se miden al 31 de diciembre. */
export const VACACIONES = [
  { hastaAnios: 5, dias: 14, detalle: "más de 6 meses y hasta 5 años" },
  { hastaAnios: 10, dias: 21, detalle: "más de 5 y hasta 10 años" },
  { hastaAnios: 20, dias: 28, detalle: "más de 10 y hasta 20 años" },
  { hastaAnios: Infinity, dias: 35, detalle: "más de 20 años" },
] as const;

/**
 * Sin los 6 meses de servicio del art. 30 no hay licencia ordinaria completa: corresponde un día de
 * descanso cada 20 días efectivamente trabajados.
 */
export const VACACIONES_PROPORCIONAL = { diasTrabajadosPorDiaDeDescanso: 20, articulo: "Ley 26.844, art. 30" } as const;

/** Semanas promedio por mes (52/12). Se usa para pasar de horas semanales a horas mensuales. */
export const SEMANAS_POR_MES = 52 / 12;

export type FuenteCasasParticulares = { nombre: string; url: string; detalle: string };

export const CASAS_PARTICULARES_FUENTES: {
  consultadoEl: string;
  lista: FuenteCasasParticulares[];
} = {
  consultadoEl: "2026-09-28",
  lista: [
    {
      nombre: "Resolución CNTCP 7/2026: rectifica los Anexos 4 y 5 (noviembre y diciembre)",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/347648/20260918",
      detalle:
        "B.O. 18/9/2026. Corrige los números de informe de los anexos de noviembre y diciembre de la 6/2026: los anexos correctos aplican el 1,6% del articulado. De acá salen los importes de esos dos meses.",
    },
    {
      nombre: "Resolución CNTCP 6/2026 (texto completo)",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346855/20260903",
      detalle:
        "B.O. 3/9/2026: fija los incrementos de agosto (1,9%), septiembre (1,8%), octubre (1,7%), noviembre (1,6%) y diciembre (1,6%) de 2026, la suma no remunerativa por única vez de $20.000 / $11.500 / $8.000 según horas semanales, y su incorporación al básico en tres tramos (25%, 50% y 25%).",
    },
    {
      nombre: "Resolución CNTCP 6/2026: Anexos 1 a 5 (las escalas)",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346855/20260903",
      detalle:
        "Un anexo por mes, con las cinco categorías, con y sin retiro, por hora y por mes. No vienen en el PDF del aviso: se publican en la edición web del BORA y se bajan aparte. Los importes de esta página salen de ahí, parseados por coordenadas, no de un medio.",
    },
    {
      nombre: "Resolución CNTCP 4/2026: la escala anterior (abril a julio de 2026)",
      url: "https://www.argentina.gob.ar/normativa/426540_res4-4_pdf/archivo",
      detalle:
        "B.O. 10/6/2026. Es la base sobre la que la 6/2026 calcula agosto, y la que fijó el adicional por zona desfavorable en el 31% desde el 1/4/2026.",
    },
    {
      nombre: "Ley 26.844: Régimen Especial para el Personal de Casas Particulares",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/210000-214999/210489/texact.htm",
      detalle:
        "Texto actualizado: art. 14 (jornada de 8 horas diarias y 48 semanales), art. 18 (la CNTCP fija el salario mínimo), art. 25 (horas extras al 50% y al 100%), art. 26 (aguinaldo), arts. 29 y 30 (vacaciones) y art. 39 (maternidad, con un piso de 30 días antes del parto, distinto al de la LCT).",
    },
  ],
};
