// Aportes, contribuciones y ART del personal de casas particulares — la tabla oficial de ARCA.
//
// POR QUÉ ESTE ARCHIVO EXISTE: quien tiene empleada doméstica registrada paga DOS cosas por mes —
// el sueldo (que resuelve /empleada-domestica) y los aportes a ARCA, que son un importe fijo por
// rango de horas. La SERP publica sólo el TOTAL de las tres filas de "trabajador activo mayor de
// 18", con datos de meses viejos, y ninguna nota publica: (a) el desglose de los tres conceptos,
// (b) las tablas de menor de 18 años y de jubilado, (c) que la ART es la parte más cara de todas,
// (d) que con menos de 16 horas semanales el trabajador NO accede a la obra social ni computa la
// jubilación, y puede completar la diferencia de su bolsillo.
//
// LOS IMPORTES NO SE COPIAN DE UN MEDIO. Salen del PDF oficial que ARCA publica cada mes:
//   https://www.arca.gob.ar/casasparticulares/aportes-contribuciones-ART/documentos/2026/Casas-particulares-aportes-y-contribuciones-08-26.pdf
//
// MINA QUE MORDIÓ AL CARGARLOS (11/8/2026): el texto plano del PDF devuelve los encabezados en un
// orden que NO es el de las columnas. Leído así, la "Cuota ART" quedaba con $25.694,55 (que en
// realidad es el aporte de obra social de la jornada de 16+ horas). Se resolvió leyendo el PDF con
// coordenadas — `npx -y tsx tools/pdf-tabla.ts <url> --xy` — y cruzando el resultado por tres vías:
//   1. Geometría: el centro de cada columna de datos coincide con el de su encabezado.
//   2. Aritmética: en las 9 filas, "Importe a pagar" = obra social + SIPA + ART, al centavo.
//   3. Semántica oficial: el jubilado no tiene la columna de obra social (tiene PAMI) y el menor de
//      18 no tiene la de SIPA (el sistema no admite aportes antes de los 18); la ART, obligatoria
//      para todos, es idéntica en las tres tablas.
// Regla: si una tabla oficial se carga desde texto plano de PDF, primero se verifica con pdf-tabla.
//
// CÓMO SE ROTA: ARCA sube un PDF por mes con el nombre predecible
// `Casas-particulares-aportes-y-contribuciones-MM-AA.pdf`. `scripts/gen_aportes_casas.ts` baja el
// mes que se le pida, lo parsea por coordenadas y compara contra esta tabla; `check-datos-vencen.ts`
// avisa cuando aparece el mes siguiente. Nada de esto se mira a mano.

/** Los tres rangos de horas semanales del régimen (son los del PDF, en su orden). */
export type RangoHoras = "menos-12" | "12-a-16" | "16-o-mas";

/** Condición del trabajador: define qué conceptos se pagan. */
export type CondicionTrabajador = "activo-mayor-18" | "activo-menor-18" | "jubilado";

export type FilaAportes = {
  rango: RangoHoras;
  /** Total mensual que ingresa la parte empleadora ("Importe a pagar" del PDF). */
  total: number;
  /** Aportes con destino a los Agentes de Seguro de Salud (obra social). Null = no corresponde. */
  obraSocial: number | null;
  /** Contribuciones con destino al SIPA (jubilación). Null = no corresponde. */
  sipa: number | null;
  /** Cuota de la ART. Obligatoria siempre: nunca es null. */
  art: number;
};

export const RANGOS: { id: RangoHoras; etiqueta: string; desde: number; hasta: number | null }[] = [
  { id: "menos-12", etiqueta: "Menos de 12 horas semanales", desde: 0, hasta: 12 },
  { id: "12-a-16", etiqueta: "Desde 12 a menos de 16 horas semanales", desde: 12, hasta: 16 },
  { id: "16-o-mas", etiqueta: "16 horas semanales o más", desde: 16, hasta: null },
];

export const CONDICIONES: { id: CondicionTrabajador; etiqueta: string; detalle: string }[] = [
  {
    id: "activo-mayor-18",
    etiqueta: "Trabajador/a activo, mayor de 18 años",
    detalle: "El caso más común: paga los tres conceptos.",
  },
  {
    id: "activo-menor-18",
    etiqueta: "Trabajador/a de 16 o 17 años",
    detalle: "No se ingresan contribuciones al SIPA: el sistema jubilatorio no las admite antes de los 18.",
  },
  {
    id: "jubilado",
    etiqueta: "Trabajador/a jubilado",
    detalle: "No se ingresan aportes de obra social: la cobertura la da el INSSJP (PAMI).",
  },
];

/**
 * TABLA OFICIAL — "Valores vigentes para agosto 2026, con vencimiento en septiembre 2026", por cada
 * trabajador. Fuente: el PDF de ARCA citado arriba, leído con coordenadas el 5/9/2026.
 */
export const TABLA_APORTES: Record<CondicionTrabajador, FilaAportes[]> = {
  "activo-mayor-18": [
    { rango: "menos-12", total: 10352.01, obraSocial: 2084.85, sipa: 729.9, art: 7537.26 },
    { rango: "12-a-16", total: 16279.36, obraSocial: 3863.3, sipa: 1459.48, art: 10956.58 },
    { rango: "16-o-mas", total: 43733, obraSocial: 25694.55, sipa: 2128.79, art: 15909.66 },
  ],
  "activo-menor-18": [
    { rango: "menos-12", total: 9622.11, obraSocial: 2084.85, sipa: null, art: 7537.26 },
    { rango: "12-a-16", total: 14819.88, obraSocial: 3863.3, sipa: null, art: 10956.58 },
    { rango: "16-o-mas", total: 41604.21, obraSocial: 25694.55, sipa: null, art: 15909.66 },
  ],
  jubilado: [
    { rango: "menos-12", total: 8267.16, obraSocial: null, sipa: 729.9, art: 7537.26 },
    { rango: "12-a-16", total: 12416.06, obraSocial: null, sipa: 1459.48, art: 10956.58 },
    { rango: "16-o-mas", total: 18038.45, obraSocial: null, sipa: 2128.79, art: 15909.66 },
  ],
};

export const VIGENCIA_APORTES = {
  /** Mes de devengamiento que cubren los importes. */
  mesVigente: "agosto de 2026",
  /** Mes en que se pagan (el régimen es a mes vencido, salvo la ART). */
  mesDeVencimiento: "septiembre de 2026",
  /** Nombre del archivo del PDF, para armar la URL del mes siguiente. */
  archivoPdf: "Casas-particulares-aportes-y-contribuciones-08-26.pdf",
} as const;

/**
 * Reglas del régimen tomadas TEXTUALMENTE del micrositio de ARCA (no parafraseadas de un medio).
 * Son la parte que ninguna tabla publicada explica, y la que hace que el número sirva para decidir.
 */
export const REGLAS_APORTES = {
  /** arca.gob.ar/casasparticulares/aportes-contribuciones-ART/conceptos.asp */
  cuandoSePaga:
    "Los pagos de los aportes son siempre a mes vencido: cada mes se paga por lo trabajado en el mes anterior. La excepción es la ART, que se paga a mes en curso.",
  /** arca.gob.ar/casasparticulares/ayuda/empleador/obra-social.asp */
  pisoObraSocial:
    "Para tener acceso a las prestaciones, los aportes de obra social tienen que ser iguales o superiores a la cuota establecida para la categoría de 16 o más horas trabajadas semanalmente.",
  /** arca.gob.ar/casasparticulares/ayuda/empleador/jubilacion.asp */
  pisoJubilacion:
    "Para tener derecho a gozar de una jubilación al final de la etapa laboral, las contribuciones al sistema jubilatorio tienen que ser iguales o superiores a la cuota establecida para la categoría de 16 o más horas trabajadas semanalmente. Si las contribuciones abonadas por la parte empleadora no alcanzaran esa suma, el trabajador podrá pagar la diferencia.",
  /** La obra social de la actividad, según el mismo micrositio. */
  obraSocialDeLaActividad: "Obra Social del Personal Auxiliar de Casas Particulares",
} as const;

export type FuenteAportes = { nombre: string; url: string; detalle: string };

export const APORTES_FUENTES: { consultadoEl: string; lista: FuenteAportes[] } = {
  consultadoEl: "2026-09-05",
  lista: [
    {
      nombre: "ARCA — Aportes, contribuciones y ART de casas particulares (tabla oficial)",
      url: "https://www.arca.gob.ar/casasparticulares/aportes-contribuciones-ART/documentos/2026/Casas-particulares-aportes-y-contribuciones-08-26.pdf",
      detalle:
        "PDF oficial con los importes vigentes para agosto de 2026 (vencimiento en septiembre): las tres tablas —activo mayor de 18, de 16 a 17 años y jubilado— con el desglose de obra social, SIPA y cuota ART. Es de acá que salen todos los números de esta página.",
    },
    {
      nombre: "ARCA — Conceptos y valores del pago mensual",
      url: "https://www.arca.gob.ar/casasparticulares/aportes-contribuciones-ART/conceptos.asp",
      detalle:
        "Explica qué habilita el pago (obra social, jubilación y cobertura por accidentes) y la regla de oportunidad: los aportes se pagan a mes vencido y la ART a mes en curso.",
    },
    {
      nombre: "ARCA — Obra social del personal de casas particulares",
      url: "https://www.arca.gob.ar/casasparticulares/ayuda/empleador/obra-social.asp",
      detalle:
        "Fija el piso para acceder a las prestaciones: el aporte debe igualar o superar la cuota de la categoría de 16 o más horas semanales.",
    },
    {
      nombre: "ARCA — Jubilación del personal de casas particulares",
      url: "https://www.arca.gob.ar/casasparticulares/ayuda/empleador/jubilacion.asp",
      detalle:
        "Mismo piso para el cómputo jubilatorio, con el agregado de que el trabajador puede pagar la diferencia si las contribuciones del empleador no alcanzan.",
    },
    {
      nombre: "Ley 26.844 — Régimen Especial para el Personal de Casas Particulares",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/210000-214999/210489/texact.htm",
      detalle:
        "Texto actualizado del régimen. El art. 14.1 inc. e) pone en cabeza del empleador la obligación de contratar un seguro por los riesgos del trabajo a favor del personal, «conforme lo establecido en el artículo 74 de la presente ley»: la ART no es opcional ni negociable.",
    },
  ],
};
