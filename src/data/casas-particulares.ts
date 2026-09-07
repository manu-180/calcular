// Personal de casas particulares (Ley 26.844) — escala salarial oficial y reglas del régimen.
//
// POR QUÉ ESTE ARCHIVO EXISTE: «cuánto cobra una empleada doméstica por hora» es una de las
// consultas laborales más buscadas del país, y la SERP son notas de portales que copian la tabla de
// una categoría (la más común) y se olvidan de las otras cuatro, del adicional por zona
// desfavorable y de que el mínimo mensual y el valor hora son dos pisos distintos que conviven.
//
// LA ESCALA NO SE COPIA DE UN MEDIO. Los importes de acá salen del ANEXO IV de la Resolución
// CNTCP 4/2026 (B.O. 10/6/2026), bajado del PDF oficial publicado en argentina.gob.ar/normativa:
//   https://www.argentina.gob.ar/normativa/426540_res4-4_pdf/archivo
// Verificado el 10/8/2026. Control cruzado: el valor de personal para tareas generales con retiro
// ($3.733,72 la hora / $458.053,22 el mes) coincide con lo que publican los medios para agosto, lo
// que confirma que en agosto sigue rigiendo la escala de julio: la CNTCP no dictó una resolución
// posterior a la 4/2026 (verificado contra el Boletín Oficial el 10/8/2026).
//
// CÓMO SE ROTA: cuando la CNTCP publique una resolución nueva, bajar su anexo con
// `npx -y tsx tools/pdf-extraer.ts <url del pdf del anexo>` y reemplazar ESCALA_VIGENTE + vigencia
// + la fuente. El PDF del aviso del BO se baja con
// `https://www.boletinoficial.gob.ar/pdf/aviso/primera/<id>/<AAAAMMDD>`, pero OJO: ese PDF NO trae
// los anexos («se publican en la edición web del BORA»); los anexos están en la ficha de
// argentina.gob.ar/normativa, como `426540_res4-N_pdf/archivo`.

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

/**
 * ANEXO IV de la Resolución CNTCP 4/2026 — escala vigente desde julio de 2026 (y en agosto, por no
 * haber resolución posterior). El orden es el del anexo oficial.
 */
export const ESCALA_VIGENTE: CategoriaCasasParticulares[] = [
  {
    id: "supervisor",
    nombre: "Supervisor/a",
    tareas:
      "Coordinación y control de las tareas efectuadas por dos o más personas a su cargo.",
    horaConRetiro: 4438.77,
    horaSinRetiro: 4829.13,
    mesConRetiro: 553725.91,
    mesSinRetiro: 612673.11,
  },
  {
    id: "tareas-especificas",
    nombre: "Personal para tareas específicas",
    tareas:
      "Cocineros/as contratados en forma exclusiva para desempeñar dicha labor, y toda otra tarea del hogar que requiera especial idoneidad del personal para llevarla a cabo.",
    horaConRetiro: 4223.25,
    horaSinRetiro: 4597.18,
    mesConRetiro: 517006.43,
    mesSinRetiro: 571426.17,
  },
  {
    id: "caseros",
    nombre: "Caseros",
    tareas:
      "Personal que presta tareas inherentes al cuidado general y preservación de una vivienda en donde habita con motivo del contrato de trabajo.",
    // Por definición el casero vive en la vivienda: la categoría sólo existe sin retiro, y en el
    // anexo oficial la columna «con retiro» aparece con un guion.
    horaConRetiro: null,
    horaSinRetiro: 3996.45,
    mesConRetiro: null,
    mesSinRetiro: 505302.76,
  },
  {
    id: "asistencia-personas",
    nombre: "Asistencia y cuidado de personas",
    tareas:
      "Comprende la asistencia y cuidado no terapéutico de personas, tales como: personas enfermas, con discapacidad, niños/as, adolescentes, adultos mayores.",
    horaConRetiro: 3996.45,
    horaSinRetiro: 4435.86,
    mesConRetiro: 505302.76,
    mesSinRetiro: 558972.92,
  },
  {
    id: "tareas-generales",
    nombre: "Personal para tareas generales",
    tareas:
      "Prestación de tareas de limpieza, lavado, planchado, mantenimiento, elaboración y cocción de comidas y, en general, toda otra tarea típica del hogar.",
    horaConRetiro: 3733.72,
    horaSinRetiro: 3996.45,
    mesConRetiro: 458053.22,
    mesSinRetiro: 505302.76,
  },
];

export const VIGENCIA = {
  /** Mes desde el que rige la escala (el anexo la titula «jul-26»). */
  desde: "julio de 2026",
  /** Mes que se está liquidando con ella, por no haber resolución posterior. */
  vigenteEn: "agosto de 2026",
  resolucion: "Resolución CNTCP 4/2026",
  boletinOficial: "B.O. 10/6/2026",
} as const;

/**
 * Adicional por zona desfavorable: 31% sobre el mínimo de cada categoría desde el 1/4/2026
 * (art. 7 de la Resolución 4/2026). Antes de esa resolución era del 30%.
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
  consultadoEl: "2026-08-10",
  lista: [
    {
      nombre: "Resolución CNTCP 4/2026 — ANEXO IV (escala vigente)",
      url: "https://www.argentina.gob.ar/normativa/426540_res4-4_pdf/archivo",
      detalle:
        "Anexo oficial con la escala de julio de 2026 por categoría, con y sin retiro, por hora y por mes, y el adicional por zona desfavorable del 31%. Es el archivo que integra la resolución: los importes de esta página salen de acá, no de un medio.",
    },
    {
      nombre: "Resolución CNTCP 4/2026 (texto completo)",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/342953/20260610",
      detalle:
        "B.O. 10/6/2026 — fija los incrementos escalonados de abril, mayo, junio y julio de 2026 y eleva el adicional por zona desfavorable al 31% desde el 1/4/2026.",
    },
    {
      nombre: "Ley 26.844 — Régimen Especial para el Personal de Casas Particulares",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/210000-214999/210489/texact.htm",
      detalle:
        "Texto actualizado: art. 14 (jornada de 8 horas diarias y 48 semanales), art. 18 (la CNTCP fija el salario mínimo), art. 25 (horas extras al 50% y al 100%), art. 26 (aguinaldo), arts. 29 y 30 (vacaciones) y art. 39 (maternidad, con un piso de 30 días antes del parto, distinto al de la LCT).",
    },
  ],
};
