// Asignaciones familiares (Ley 24.714), AUH y Asignación por Embarazo — valores del mes VIGENTE.
//
// FUENTE: la resolución mensual de ANSES en el Boletín Oficial, y como control cruzado la cartilla
// oficial «MONTOS DE ASIGNACIONES FAMILIARES, ASIGNACIÓN UNIVERSAL POR HIJO Y POR EMBARAZO PARA
// PROTECCIÓN SOCIAL», que la transcribe. Nunca de blogs ni de notas de medios: los rangos por zona y
// los montos de monotributo casi nunca se publican completos, y los que circulan suelen ser sólo la
// columna «valor general».
//
// LA RESOLUCIÓN NO PUBLICA LA TABLA: PUBLICA LA REGLA (verificado el 1/9/2026). Los anexos de la
// Res. ANSES 260/2026 son documentos GDE que el aviso no incluye, pero su articulado alcanza para
// reconstruir la tabla entera sin ellos: el art. 1 fija el incremento (2,11%) sobre los valores
// publicados del mes anterior, con excepción de los incisos d) y e) del art. 6 de la Ley 24.714
// (ayuda escolar y maternidad), y el art. 3 fija el redondeo AL ENTERO SIGUIENTE. Eso es una
// derivación, no una estimación — y tiene ancla propia: el art. 4 publica de su puño el tope
// individual ($3.157.449), que es exactamente lo que da la derivación. El método además reproduce
// al peso los 11 valores de la rotación julio→agosto. Y no es un atajo por impaciencia: al reintentar
// la cartilla esa misma madrugada, el 403 del WAF se volvió **404** — el PDF de septiembre todavía NO
// EXISTE. ANSES publica la resolución en el B.O. el día 1 y la cartilla varios días después, así que
// esperarla es publicar el dato una semana tarde. La resolución es además la fuente PRIMARIA: la
// cartilla la transcribe. Cuando el PDF aparezca, cruzarlo contra estos valores.
//
// CÓMO SE ROTA (mensual, ~último día hábil del mes anterior, junto con prestaciones.ts):
//   1. Leer la resolución del mes en el B.O. (`npx -y tsx tools/boletin-oficial.ts --buscar "ANSES"`)
//      y bajar la cartilla como control cruzado:
//      https://www.anses.gob.ar/sites/default/files/cartilla/YYYY-MM/Montos-AAFF-MM-YYYY.pdf
//      (`npx -y tsx tools/pdf-extraer.ts <url>` desde la raíz del repo).
//   2. Mover el bloque VIGENTE a ASIGNACIONES_MES_ANTERIOR y cargar el nuevo en ASIGNACIONES_VIGENTES.
//   3. Correr `npx -y tsx scripts/check_asignaciones.ts`: verifica que TODOS los valores nuevos salgan
//      de aplicar la movilidad del mes a los del mes anterior. Un número mal tipeado no llega a prod.
//
// POR QUÉ EL MES ANTERIOR VIVE ACÁ: es el ancla anti-tipeo. La cartilla es un PDF que se transcribe
// a mano; sin un valor previo contra el cual cruzar, un dígito cambiado pasa desapercibido.

/** Las 5 columnas de la cartilla. La zona la fija el lugar de explotación declarado ante ARCA. */
export type Zona = "general" | "zona1" | "zona2" | "zona3" | "zona4";

export type MontosPorZona = {
  general: number;
  zona1: number;
  zona2: number;
  zona3: number;
  zona4: number;
};

/** Un rango de Ingreso del Grupo Familiar con sus montos. `hasta: null` = sin tope superior. */
export type TramoIgf = {
  desde: number;
  hasta: number | null;
  montos: MontosPorZona;
};

export const ZONAS: { id: Zona; nombre: string; detalle: string }[] = [
  {
    id: "general",
    nombre: "Valor general (resto del país)",
    detalle: "Todo el país salvo las localidades comprendidas en las zonas 1 a 4.",
  },
  {
    id: "zona1",
    nombre: "Zona 1",
    detalle:
      "La Pampa, Río Negro y Neuquén; los departamentos Bermejo, Ramón Lista y Matacos (Formosa); zonas de Mendoza (Las Heras, Luján de Cuyo, Tupungato, Tunuyán, San Carlos, San Rafael, Malargüe, Maipú y Rivadavia, por distritos) y Orán (Salta, salvo la ciudad de San Ramón de la Nueva Orán y su ejido urbano).",
  },
  {
    id: "zona2",
    nombre: "Zona 2",
    detalle: "Provincia de Chubut.",
  },
  {
    id: "zona3",
    nombre: "Zona 3",
    detalle:
      "Antofagasta de la Sierra (Catamarca, actividad minera); Cochinoca, Humahuaca, Rinconada, Santa Catalina, Susques y Yavi (Jujuy); Los Andes, Santa Victoria, Rivadavia y Gral. San Martín (Salta, salvo la ciudad de Tartagal y su ejido urbano).",
  },
  {
    id: "zona4",
    nombre: "Zona 4",
    detalle: "Santa Cruz y Tierra del Fuego, Antártida e Islas del Atlántico Sur.",
  },
];

/** Categorías de monotributo tal como las agrupa la cartilla. */
export type GrupoMonotributo = "A" | "B" | "C" | "D_H" | "I_K";

export const GRUPOS_MONOTRIBUTO: { id: GrupoMonotributo; etiqueta: string }[] = [
  { id: "A", etiqueta: "A" },
  { id: "B", etiqueta: "B" },
  { id: "C", etiqueta: "C" },
  { id: "D_H", etiqueta: "D a H" },
  { id: "I_K", etiqueta: "I, J y K" },
];

export const ASIGNACIONES_VIGENTES = {
  periodo: "2026-09",
  vigencia: "septiembre de 2026",

  /** Movilidad del mes, en % — la misma que la previsional (variación del IPC de dos meses antes). */
  movilidad: 2.11,

  /**
   * Tope de Ingreso del Grupo Familiar: por encima de esto el grupo no cobra asignaciones.
   * El IGF es la suma de los ingresos brutos de TODOS los integrantes del grupo familiar,
   * excluyendo horas extras, plus por zona desfavorable y aguinaldo.
   */
  topeIgfGrupo: 6_314_897,

  /**
   * Tope INDIVIDUAL: si UN SOLO integrante cobra más que esto, se excluye del cobro a TODO el grupo,
   * aunque la suma del grupo esté por debajo del tope grupal. Es la regla que más plata cuesta y la
   * que menos se explica.
   */
  topeIgfIndividual: 3_157_449,

  /** La ayuda escolar conserva su propio tope de IGF, que este mes NO se actualizó. */
  topeIgfAyudaEscolar: 6_069_688,

  /** Pago único por el hecho; el tope que rige es el del IGF grupal. */
  nacimiento: 89_782,
  adopcion: 536_774,
  matrimonio: 134_430,

  /** Asignación por HIJO (menor de 18) y PRENATAL: comparten la misma tabla de tramos. */
  hijo: [
    {
      desde: 0,
      hasta: 1_192_505,
      montos: { general: 77_025, zona1: 77_025, zona2: 166_080, zona3: 153_826, zona4: 166_080 },
    },
    {
      desde: 1_192_505.01,
      hasta: 1_748_924,
      montos: { general: 51_958, zona1: 68_619, zona2: 102_780, zona3: 136_676, zona4: 136_676 },
    },
    {
      desde: 1_748_924.01,
      hasta: 2_019_189,
      montos: { general: 31_427, zona1: 61_850, zona2: 92_809, zona3: 123_510, zona4: 123_510 },
    },
    {
      desde: 2_019_189.01,
      hasta: 6_314_897,
      montos: { general: 16_217, zona1: 31_704, zona2: 47_444, zona3: 62_776, zona4: 62_776 },
    },
  ] as TramoIgf[],

  /**
   * Asignación por HIJO CON DISCAPACIDAD. Tres tramos y —lo importante— el último NO tiene tope:
   * con la autorización de ANSES vigente no rigen topes de ingreso, ni individuales ni del grupo.
   */
  hijoDiscapacidad: [
    {
      desde: 0,
      hasta: 1_192_505,
      montos: { general: 250_780, zona1: 250_780, zona2: 375_801, zona3: 500_919, zona4: 500_919 },
    },
    {
      desde: 1_192_505.01,
      hasta: 1_748_924,
      montos: { general: 177_412, zona1: 241_905, zona2: 362_505, zona3: 483_181, zona4: 483_181 },
    },
    {
      desde: 1_748_924.01,
      hasta: null,
      montos: { general: 111_970, zona1: 232_906, zona2: 349_070, zona3: 465_289, zona4: 465_289 },
    },
  ] as TramoIgf[],

  /** Ayuda escolar anual: pago único por ciclo lectivo. No depende del tramo, sólo de la zona. */
  ayudaEscolar: {
    base: { general: 55_672, zona1: 74_257, zona2: 92_877, zona3: 110_967, zona4: 110_967 },
    /** Refuerzo extraordinario del Decreto 115/26: sólo general y zona 1. */
    refuerzo: { general: 29_328, zona1: 10_743, zona2: 0, zona3: 0, zona4: 0 },
    total: { general: 85_000, zona1: 85_000, zona2: 92_877, zona3: 110_967, zona4: 110_967 },
  },

  /** Asignación por CÓNYUGE: sólo jubilados y pensionados del SIPA (y PNC por invalidez/trasplante). */
  conyuge: { general: 18_691, zona1: 37_079 },

  /** Monotributistas: no hay tramos por IGF, el monto lo fija la categoría. */
  monotributo: {
    /** Prenatal e hijo. Las categorías I, J y K no perciben esta asignación. */
    hijo: { A: 77_025, B: 51_958, C: 31_427, D_H: 16_217, I_K: null },
    hijoDiscapacidad: { A: 250_780, B: 177_412, C: 111_970, D_H: 111_970, I_K: 111_970 },
    ayudaEscolarTotal: 85_000,
  } as {
    hijo: Record<GrupoMonotributo, number | null>;
    hijoDiscapacidad: Record<GrupoMonotributo, number>;
    ayudaEscolarTotal: number;
  },

  /**
   * AUH / Asignación por Embarazo. Dos columnas (general y zona 1) y el 80/20: ANSES deposita el 80%
   * todos los meses y acumula el 20% restante, que se cobra una vez al año contra la presentación de
   * la Libreta AUH (o del formulario y la constancia del Plan Nacer/Sumar, en el caso del embarazo).
   */
  universales: {
    porcentajeMensual: 0.8,
    embarazo: { general: 154_031, zona1: 200_241 },
    hijo: { general: 154_031, zona1: 200_241 },
    hijoDiscapacidad: { general: 501_537, zona1: 651_998 },
    ayudaEscolarTotal: { general: 85_000, zona1: 85_000 },
    nacimiento: 89_782,
    adopcion: 536_774,
    cuidadoSaludHijo: { general: 154_031, zona1: 200_241 },
    cuidadoSaludHijoDiscapacidad: { general: 501_537, zona1: 651_998 },
    apoyoAlimentarioMilDias: 58_098,
  },

  resolucion: "Resolución ANSES 260/2026",
  resolucionUrl: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346684/20260901",
  resolucionBO: "Boletín Oficial del 1 de septiembre de 2026",
  cartillaUrl:
    "https://www.anses.gob.ar/sites/default/files/cartilla/2026-09/Montos-AAFF-09-2026.pdf",
} as const;

/**
 * Snapshot del mes anterior. NO se muestra en la web: existe sólo para que check_asignaciones.ts
 * pueda verificar que cada valor vigente es el del mes previo movido por la movilidad del mes.
 * Fuente: cartilla oficial Montos-AAFF-08-2026.pdf (Resolución ANSES 233/2026).
 */
export const ASIGNACIONES_MES_ANTERIOR = {
  periodo: "2026-08",
  topeIgfGrupo: 6_184_406,
  topeIgfIndividual: 3_092_203,
  nacimiento: 87_926,
  adopcion: 525_682,
  matrimonio: 131_652,
  hijo: [
    {
      desde: 0,
      hasta: 1_167_863,
      montos: { general: 75_433, zona1: 75_433, zona2: 162_648, zona3: 150_647, zona4: 162_648 },
    },
    {
      desde: 1_167_863.01,
      hasta: 1_712_784,
      montos: { general: 50_884, zona1: 67_201, zona2: 100_656, zona3: 133_851, zona4: 133_851 },
    },
    {
      desde: 1_712_784.01,
      hasta: 1_977_464,
      montos: { general: 30_777, zona1: 60_571, zona2: 90_891, zona3: 120_957, zona4: 120_957 },
    },
    {
      desde: 1_977_464.01,
      hasta: 6_184_406,
      montos: { general: 15_881, zona1: 31_048, zona2: 46_463, zona3: 61_478, zona4: 61_478 },
    },
  ] as TramoIgf[],
  hijoDiscapacidad: [
    {
      desde: 0,
      hasta: 1_167_863,
      montos: { general: 245_597, zona1: 245_597, zona2: 368_035, zona3: 490_568, zona4: 490_568 },
    },
    {
      desde: 1_167_863.01,
      hasta: 1_712_784,
      montos: { general: 173_745, zona1: 236_906, zona2: 355_014, zona3: 473_196, zona4: 473_196 },
    },
    {
      desde: 1_712_784.01,
      hasta: null,
      montos: { general: 109_656, zona1: 228_093, zona2: 341_856, zona3: 455_674, zona4: 455_674 },
    },
  ] as TramoIgf[],
  conyuge: { general: 18_304, zona1: 36_312 },
  universales: {
    embarazo: { general: 150_848, zona1: 196_103 },
    hijo: { general: 150_848, zona1: 196_103 },
    hijoDiscapacidad: { general: 491_173, zona1: 638_525 },
    apoyoAlimentarioMilDias: 56_897,
  },
  /** Conceptos que la resolución NO movió este mes (se verifican iguales, no por coeficiente). */
  congelados: {
    /** El tope de IGF propio de la ayuda escolar: excluido del incremento, no acompaña al grupal. */
    topeIgfAyudaEscolar: 6_069_688,
    ayudaEscolarBase: { general: 55_672, zona1: 74_257, zona2: 92_877, zona3: 110_967, zona4: 110_967 },
    ayudaEscolarRefuerzo: { general: 29_328, zona1: 10_743, zona2: 0, zona3: 0, zona4: 0 },
  },
} as const;

/**
 * Los tres pagos por única vez (nacimiento, adopción y matrimonio) y —lo que casi nadie publica—
 * las CONDICIONES para cobrarlos. Aplicación de la regla de s81: la cartilla del organismo tiene
 * requisitos propios que la ley no enuncia, y son los que deciden el trámite.
 *
 * LA VENTANA DE 2 MESES A 2 AÑOS NO ESTÁ EN LA LEY. Los arts. 12 y 13 de la Ley 24.714 dicen sólo
 * que la asignación «se abonará una vez acreditado tal hecho ante ANSES», sin plazo; el art. 14
 * (matrimonio) tampoco lo trae. El plazo aparece únicamente en las cartillas de ANSES, en las dos
 * con la misma redacción: no se puede pedir antes de los 2 meses y se pierde a los 2 años. Una
 * familia que publica su derecho leyendo sólo la ley llega tarde.
 *
 * LA OTRA MITAD VA AL REVÉS: la antigüedad de 3 meses que toda la web sigue pidiendo para el
 * nacimiento YA NO EXISTE — los arts. 12 y 13 fueron sustituidos por los arts. 8 y 9 de la Ley
 * 27.611 (B.O. 15/1/2021) y el requisito desapareció del texto. El único que conserva antigüedad
 * es el matrimonio: seis meses, y está en la ley (art. 14).
 *
 * VERIFICADO EL 17/8/2026 contra: texto actualizado de la Ley 24.714 en InfoLEG (id 39880, arts.
 * 12, 13 y 14 leídos enteros) y las dos cartillas oficiales de ANSES en PDF.
 */
export const PAGO_UNICO = {
  /** Meses que hay que esperar desde el hecho generador antes de poder pedirlo (cartillas ANSES). */
  esperaMeses: 2,
  /** Años desde el hecho generador después de los cuales ya no se puede pedir (cartillas ANSES). */
  caducidadAnios: 2,
  /** Semanas de gestación desde las que se paga la asignación por «nacimiento sin vida». */
  nacimientoSinVidaSemanas: 26,
  /** Su equivalente en días, como lo enuncia la propia cartilla. */
  nacimientoSinVidaDias: 180,
  /** Antigüedad mínima y continuada en el empleo que exige la ley para el matrimonio (art. 14). */
  antiguedadMatrimonioMeses: 6,
  reglas: [
    {
      clave: "ventana",
      titulo: "Hay una ventana: ni antes de 2 meses ni después de 2 años",
      detalle:
        "Las tres se piden entre los 2 meses y los 2 años de ocurrido el nacimiento, dictada la sentencia de adopción o celebrado el matrimonio. Este plazo no está en la Ley 24.714: sale de las cartillas de ANSES, y es el que hace que un derecho existente se pierda por llegar tarde.",
      fuente: "Cartillas de ANSES «Nacimiento/Adopción» (nov. 2024) y «Matrimonio»",
    },
    {
      clave: "antiguedad",
      titulo: "Sólo el matrimonio exige antigüedad, y son 6 meses",
      detalle:
        "El art. 14 de la Ley 24.714 pide una antigüedad mínima y continuada en el empleo de seis meses a la fecha del matrimonio. Para nacimiento y adopción no hay antigüedad: los arts. 12 y 13 fueron sustituidos por la Ley 27.611 en 2021 y el requisito de tres meses que todavía circula quedó fuera del texto.",
      fuente: "Ley 24.714, arts. 12, 13 y 14 (texto actualizado en InfoLEG)",
    },
    {
      clave: "dos-conyuges",
      titulo: "El matrimonio lo cobran LOS DOS cónyuges",
      detalle:
        "Lo dice el propio art. 14: «Esta asignación se abonará a los dos cónyuges cuando ambos se encuentren en las disposiciones de la presente ley». Si los dos trabajan en relación de dependencia y cada uno cumple los seis meses de antigüedad, el matrimonio cobra el importe dos veces, no una.",
      fuente: "Ley 24.714, art. 14",
    },
    {
      clave: "quien-puede",
      titulo: "No es sólo para quien trabaja en relación de dependencia",
      detalle:
        "También pueden cobrarlas quienes perciben la prestación por desempleo, la prestación de una ART de empresas incorporadas al régimen, la Pensión Honorífica de Veteranos de Guerra del Atlántico Sur y —para nacimiento y adopción— los titulares de la AUH y de la Asignación por Embarazo. En esos casos la condición es haber tenido derecho al cobro en el mes en que ocurrió el hecho.",
      fuente: "Cartilla de ANSES «Nacimiento/Adopción» (nov. 2024)",
    },
    {
      clave: "sin-vida",
      titulo: "El nacimiento sin vida también se paga",
      detalle:
        "La asignación por nacimiento se abona igual cuando el nacimiento se produce sin vida después de los 180 días o 26 semanas de gestación, y para las titulares de la Asignación por Embarazo se paga siempre que hayan tenido derecho al cobro del mes de la interrupción.",
      fuente: "Cartilla de ANSES «Nacimiento/Adopción» (nov. 2024)",
    },
    {
      clave: "topes",
      titulo: "El tope se mide en la fecha del hecho, no en la del trámite",
      detalle:
        "Para el matrimonio, la cartilla es explícita: los ingresos del grupo familiar tienen que estar dentro de los topes «dispuestos por la normativa vigente a la fecha de celebrado el matrimonio». Si el sueldo subió entre el hecho y el trámite, lo que se mira es el de entonces.",
      fuente: "Cartilla de ANSES «Matrimonio»",
    },
  ] as { clave: string; titulo: string; detalle: string; fuente: string }[],
} as const;

export const ASIGNACIONES_FUENTES = {
  consultadoEl: "2026-09-01",
  resolucion: {
    nombre: "Resolución ANSES 260/2026 — montos y rangos de asignaciones familiares",
    url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346684/20260901",
  },
  cartilla: {
    nombre: "ANSES — Montos de asignaciones familiares, AUH y embarazo (septiembre 2026)",
    url: "https://www.anses.gob.ar/sites/default/files/cartilla/2026-09/Montos-AAFF-09-2026.pdf",
  },
  ley: {
    nombre: "Ley 24.714 — Régimen de Asignaciones Familiares",
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-24714-39880",
  },
  discapacidadSinTope: {
    nombre: "ANSES — Cartilla «Asignación por hijo / hijo con discapacidad» (sin topes de ingreso)",
    url: "https://www.anses.gob.ar/sites/default/files/cartilla/2024-11/Cartilla-AAFF-HIJO-HIJO-CON-DISCAPACIDAD.pdf",
  },
  cartillaNacimiento: {
    nombre:
      "ANSES — Cartilla «Asignación por Nacimiento/Adopción» (actualizada a noviembre de 2024)",
    url: "https://www.anses.gob.ar/sites/default/files/cartilla/2024-11/Cartilla-Nacimiento_adopcion.pdf",
  },
  cartillaMatrimonio: {
    nombre: "ANSES — Cartilla «Asignación Familiar por Matrimonio»",
    url: "https://www.anses.gob.ar/sites/default/files/cartilla/2019-10/matrimonio.pdf",
  },
} as const;
