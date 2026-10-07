// Escala del Impuesto a las Ganancias de las sociedades (art. 73 LIG, t.o. Dec. 824/2019).
//
// La escala de la Ley 27.630 ($5M / $50M) nunca se reescribió: el último párrafo del art. 73 manda
// ajustar sus montos cada año por el IPC de OCTUBRE del año anterior contra octubre del otro, y los
// aplica a los ejercicios que se INICIEN después de cada ajuste. Por eso cada año se DERIVA de
// `ipc-serie.ts` y el año de la escala es el del INICIO del ejercicio, no el del cierre.
//
// EL ANCLA (verificado el 17/9/2026 contra los PDF de ARCA): ARCA no encadena montos redondeados año
// a año. Cada escala es el monto de la ley × IPC oct(año-1) / IPC oct(2020), con toda la precisión,
// redondeado al centavo al final. Así salen AL CENTAVO los nueve montos publicados de 2023 a 2026
// (límites y fijos). Encadenar redondeando —como sí hace ARCA con el tope de seguros del art. 85—
// ya se desvía hasta $0,08 en 2025. No tocar sin correr scripts/check_ganancias_sociedades.ts.
//
// 2022 NO se reproduce: el PDF de ARCA trae $7.604.948,57 y la serie actual del INDEC da
// $7.605.582,54. La escala de 2023 de ARCA sí sale de la serie actual, no de su propio 2022. Se
// publica el número de ARCA para 2022 tal cual y la página lo dice.

import { IPC_SERIE } from "./ipc-serie";

export const ANIO_BASE_ESCALA = 2021;

export type TramoSociedades = {
  desde: number;
  hasta: number | null;
  fijo: number;
  alicuota: number;
};

/** Art. 3º de la Ley 27.630 (B.O. 16/6/2021): la escala para ejercicios iniciados desde el 1/1/2021. */
export const ESCALA_LEY_27630: ReadonlyArray<TramoSociedades> = [
  { desde: 0, hasta: 5_000_000, fijo: 0, alicuota: 0.25 },
  { desde: 5_000_000, hasta: 50_000_000, fijo: 1_250_000, alicuota: 0.3 },
  { desde: 50_000_000, hasta: null, fijo: 14_750_000, alicuota: 0.35 },
];

/** Lo que publica ARCA en sus PDF «Ganancias-Escala-PJ-AAAA»: [límite 1, límite 2, fijo 2, fijo 3]. */
export const ESCALAS_ARCA: Readonly<Record<number, readonly [number, number, number, number]>> = {
  2022: [7_604_948.57, 76_049_485.68, 1_901_237.14, 22_434_598.28],
  2023: [14_301_209.21, 143_012_092.08, 3_575_302.3, 42_188_567.16],
  2024: [34_703_523.08, 347_035_230.79, 8_675_880.77, 102_375_393.08],
  2025: [101_679_575.26, 1_016_795_752.62, 25_419_893.82, 299_954_747.02],
  2026: [133_514_185.74, 1_335_141_857.38, 33_378_546.43, 393_866_847.93],
};

/** Años en que la escala de ARCA no coincide con la derivación desde la serie vigente del INDEC. */
export const ANIOS_SOLO_ARCA: ReadonlyArray<number> = [2022];

export const ALICUOTA_DIVIDENDOS = 0.07;
export const ALICUOTA_JUEGOS_DE_AZAR = 0.415;

function indiceDe(periodo: string): number | undefined {
  return IPC_SERIE.find(([p]) => p === periodo)?.[1];
}

const centavos = (n: number) => Math.round(n * 100) / 100;

export type EscalaAnual = {
  anio: number;
  tramos: TramoSociedades[];
  /** IPC oct(año-1) / IPC oct(2020). Null en la escala de la ley. */
  coeficiente: number | null;
  origen: "ley" | "ipc" | "arca";
};

function escalaDerivada(anio: number): EscalaAnual | undefined {
  if (anio === ANIO_BASE_ESCALA) {
    return { anio, tramos: ESCALA_LEY_27630.map((t) => ({ ...t })), coeficiente: null, origen: "ley" };
  }
  const actual = indiceDe(`${anio - 1}-10`);
  const base = indiceDe(`${ANIO_BASE_ESCALA - 1}-10`);
  if (actual === undefined || base === undefined) return undefined;
  const coeficiente = actual / base;
  const tramos = ESCALA_LEY_27630.map((t) => ({
    desde: centavos(t.desde * coeficiente),
    hasta: t.hasta === null ? null : centavos(t.hasta * coeficiente),
    fijo: centavos(t.fijo * coeficiente),
    alicuota: t.alicuota,
  }));
  return { anio, tramos, coeficiente, origen: "ipc" };
}

function escalaDeArca(anio: number): EscalaAnual {
  const [l1, l2, f2, f3] = ESCALAS_ARCA[anio];
  return {
    anio,
    tramos: [
      { desde: 0, hasta: l1, fijo: 0, alicuota: 0.25 },
      { desde: l1, hasta: l2, fijo: f2, alicuota: 0.3 },
      { desde: l2, hasta: null, fijo: f3, alicuota: 0.35 },
    ],
    coeficiente: null,
    origen: "arca",
  };
}

/** Derivación pura, sin excepciones: la usa el check para compararla contra ARCA. */
export function escalaDerivadaDe(anio: number): EscalaAnual | undefined {
  return escalaDerivada(anio);
}

/** Escala aplicable a un ejercicio que INICIA en `anio`. Undefined si el INDEC todavía no publicó el IPC. */
export function escalaDe(anio: number): EscalaAnual | undefined {
  if (anio < ANIO_BASE_ESCALA) return undefined;
  if (ANIOS_SOLO_ARCA.includes(anio)) return escalaDeArca(anio);
  return escalaDerivada(anio);
}

/** Todas las escalas disponibles, desde la ley hasta la última que permite la serie del IPC. */
export function escalasDisponibles(): EscalaAnual[] {
  const filas: EscalaAnual[] = [];
  for (let anio = ANIO_BASE_ESCALA; ; anio++) {
    const e = escalaDe(anio);
    if (!e) break;
    filas.push(e);
  }
  return filas;
}

export const ULTIMO_ANIO_ESCALA = escalasDisponibles().at(-1)!.anio;

export const GANANCIAS_SOCIEDADES_TEXTOS = {
  ajuste:
    "Los montos previstos en la escala establecida en el primer párrafo de este artículo se ajustarán anualmente, a partir del 1° de enero de 2022, considerando la variación anual del Índice de Precios al Consumidor (IPC) que suministre el Instituto Nacional de Estadística y Censos (INDEC), organismo desconcentrado en el ámbito del Ministerio de Economía, correspondiente al mes de octubre del año anterior al del ajuste, respecto del mismo mes del año anterior",
  ejerciciosQueSeInicien:
    "Los montos determinados por aplicación del mecanismo descripto resultarán de aplicación para los ejercicios fiscales que se inicien con posterioridad a cada actualización",
  dividendos:
    "La ganancia neta de las personas humanas y sucesiones indivisas, derivada de los dividendos y utilidades a que se refieren los artículos 49 y 50, tributará a la alícuota del siete por ciento (7%)",
  retencion:
    "Dicha retención tendrá el carácter de pago único y definitivo para las personas humanas y sucesiones indivisas residentes en la REPÚBLICA ARGENTINA que no estuvieran inscriptos en el presente impuesto",
  arcaSaldo:
    "Al importe resultante se le deberán restar, de corresponder, los anticipos y pagos a cuenta ingresados y las percepciones y retenciones sufridas durante el período",
} as const;

export const GANANCIAS_SOCIEDADES_FUENTES = {
  consultadoEl: "17 de septiembre de 2026",
  lista: [
    {
      nombre: "Ley de Impuesto a las Ganancias (t.o. Dec. 824/2019), arts. 73 y 97, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
      detalle:
        "quiénes tributan por la escala, el párrafo que ajusta sus montos por el IPC de octubre y los aplica a los ejercicios que se inicien después, y el 7% sobre los dividendos que cobran las personas humanas.",
    },
    {
      nombre: "Ley 27.630 (B.O. 16/6/2021): Boletín Oficial",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/245673/20210616",
      detalle: "la escala original de $5.000.000 y $50.000.000 con los fijos de $1.250.000 y $14.750.000, y el 7% de dividendos.",
    },
    {
      nombre: "ARCA, personas jurídicas: escala",
      url: "https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-juridicas/determinacion/escala.asp",
      detalle:
        "las escalas publicadas para los ejercicios iniciados desde 2021 hasta 2026. Son el control cruzado: la derivación reproduce al centavo las de 2023 a 2026.",
    },
    {
      nombre: "INDEC: IPC nivel general, serie oficial (apis.datos.gob.ar)",
      url: "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&format=json&limit=1000",
      detalle: "los índices de octubre de cada año, de donde sale el coeficiente de la escala.",
    },
  ],
} as const;
