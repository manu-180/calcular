// Prestación por Desempleo (Ley 24.013) — reglas y escala del SMVM del que cuelgan los topes.
//
// POR QUÉ ESTE ARCHIVO EXISTE: el monto de la prestación por desempleo NO se publica como un
// número propio. Se DERIVA del Salario Mínimo Vital y Móvil vigente: piso = 50% del SMVM,
// techo = 100% del SMVM (Res. CNEPySMVM 4/2026, art. 2, que vuelve a mantener la fórmula de la
// Res. 15/2023). Por eso la fuente única de verdad acá es la escala del SMVM, no un monto suelto
// copiado de una nota. Las notas de medios publican el número del mes y nunca la regla: por eso
// quedan viejas al mes siguiente y esta página no.
//
// VERIFICACIÓN CRUZADA (8/8/2026): ANSES publica para el 1/7/2026 un piso de $186.200 y un techo
// de $372.400. El SMVM de julio de 2026 es $372.400 → 50% = $186.200 y 100% = $372.400. Las dos
// fuentes cierran al peso. Ese cruce es el que valida la derivación, y `check_desempleo.ts` lo
// reproduce para que no se rompa en silencio.
//
// CÓMO SE ROTA: cuando el Consejo del Salario dicta una resolución nueva (la vigente, la 4/2026,
// cubre hasta ABRIL de 2027 inclusive), agregar los meses al final de SMVM_SERIE y actualizar
// DESEMPLEO_FUENTES.smvm. NUNCA cargar un mes desde un blog: la escala se publica completa en el
// Boletín Oficial.
//
// HALLAZGO DEL 2/9/2026 (s102): la Res. 4/2026 NO es un acuerdo del Consejo. El 28/8/2026 la
// reunión terminó sin acuerdo (art. 137 de la Ley 24.013) y la escala salió por LAUDO de la
// presidenta alterna. Dos consecuencias que casi ninguna nota publica: (1) la escala queda fijada
// de una vez hasta ABRIL DE 2027 —ocho meses—, así que el número de cada mes ya está escrito y no
// depende de una negociación futura; (2) el laudo ratifica expresamente la fórmula de la
// prestación por desempleo de la Res. 15/2023 (75% del neto, piso 50% y techo 100% del SMVM), que
// es lo que hace que esta página no envejezca.

/** Un mes de la escala del SMVM. `periodo` es AAAA-MM y rige desde el día 1 de ese mes. */
export type MesSmvm = {
  periodo: string;
  /** Importe mensual para el trabajador mensualizado que cumple la jornada legal completa. */
  mensual: number;
  /** Importe por hora para el trabajador jornalizado. */
  porHora: number;
};

/**
 * Escala del SMVM vigente, mes a mes. Los meses hasta agosto de 2026 vienen de la Resolución
 * 9/2025 (B.O. 3/12/2025); desde septiembre de 2026 y hasta abril de 2027, del artículo 1 de la
 * Resolución 4/2026 del Consejo Nacional del Empleo, la Productividad y el Salario Mínimo, Vital
 * y Móvil (B.O. 2/9/2026), dictada por laudo al no haber acuerdo en la reunión del 28/8/2026.
 * El último mes de esta lista es el último que TIENE norma: no se proyecta hacia adelante.
 */
export const SMVM_SERIE: MesSmvm[] = [
  { periodo: "2025-11", mensual: 328_400, porHora: 1_642 },
  { periodo: "2025-12", mensual: 334_800, porHora: 1_674 },
  { periodo: "2026-01", mensual: 341_000, porHora: 1_705 },
  { periodo: "2026-02", mensual: 346_800, porHora: 1_734 },
  { periodo: "2026-03", mensual: 352_400, porHora: 1_762 },
  { periodo: "2026-04", mensual: 357_800, porHora: 1_789 },
  { periodo: "2026-05", mensual: 363_000, porHora: 1_815 },
  { periodo: "2026-06", mensual: 367_800, porHora: 1_839 },
  { periodo: "2026-07", mensual: 372_400, porHora: 1_862 },
  { periodo: "2026-08", mensual: 376_600, porHora: 1_883 },
  // ── Resolución 4/2026 del Consejo (B.O. 2/9/2026): laudo de la presidencia alterna, sin acuerdo ──
  { periodo: "2026-09", mensual: 383_800, porHora: 1_919 },
  { periodo: "2026-10", mensual: 391_200, porHora: 1_956 },
  { periodo: "2026-11", mensual: 398_800, porHora: 1_994 },
  { periodo: "2026-12", mensual: 406_400, porHora: 2_032 },
  { periodo: "2027-01", mensual: 414_200, porHora: 2_071 },
  { periodo: "2027-02", mensual: 422_000, porHora: 2_110 },
  { periodo: "2027-03", mensual: 429_600, porHora: 2_148 },
  { periodo: "2027-04", mensual: 437_000, porHora: 2_185 },
];

/** Reglas de cálculo. Cada una con el artículo exacto del que sale. */
export const REGLAS_DESEMPLEO = {
  /** Art. 2 Res. CNEPySMVM 4/2026: 75% del NETO de la mejor remuneración de los 6 meses previos. */
  porcentajeBase: 0.75,
  /** Art. 2 Res. CNEPySMVM 4/2026: la prestación mensual nunca es menor al 50% del SMVM. */
  pisoSobreSmvm: 0.5,
  /** Art. 2 Res. CNEPySMVM 4/2026: la prestación mensual nunca supera el 100% del SMVM. */
  techoSobreSmvm: 1,
  /** Art. 118 Ley 24.013: la prestación se degrada por tramos de cuotas. */
  escalonamiento: [
    { desdeCuota: 1, hastaCuota: 4, porcentaje: 1 },
    { desdeCuota: 5, hastaCuota: 8, porcentaje: 0.85 },
    { desdeCuota: 9, hastaCuota: 12, porcentaje: 0.7 },
  ],
  /** Art. 117 Ley 24.013: cuotas según meses cotizados en los 3 años anteriores al cese. */
  duracion: [
    { desdeMeses: 6, hastaMeses: 11, cuotas: 2 },
    { desdeMeses: 12, hastaMeses: 23, cuotas: 4 },
    { desdeMeses: 24, hastaMeses: 35, cuotas: 8 },
    { desdeMeses: 36, hastaMeses: null, cuotas: 12 },
  ],
  /** Art. 113 inc. b) Ley 24.013: piso de cotización para acceder al beneficio. */
  mesesMinimosCotizados: 6,
  /** Ventana en la que se miran esos meses de cotización (art. 113 inc. b). */
  aniosVentanaCotizacion: 3,
  /** Art. 4 Dec. 267/2006: 45 años o más suma 6 cuotas al 70% de la prestación original. */
  extension45: { edadMinima: 45, cuotasExtra: 6, porcentaje: 0.7 },
  /** Art. 115 Ley 24.013: 90 días para pedirla; pasado el plazo se descuentan los días de exceso. */
  diasParaSolicitar: 90,
} as const;

/**
 * SITUACIÓN LEGAL DE DESEMPLEO — art. 114 de la Ley 24.013, texto actualizado.
 *
 * POR QUÉ ESTÁ ACÁ (20/8/2026, s89): el art. 99 de la Ley 27.802 le **incorporó el inciso i)**, y
 * es el cambio que da vuelta la respuesta más repetida del tema. Hasta el 5/3/2026, terminar el
 * contrato **por mutuo acuerdo** (art. 241 de la LCT) dejaba al trabajador **sin** prestación por
 * desempleo: no figuraba en la lista del art. 114. Desde el 6/3/2026 figura, con nombre y con
 * remisión al artículo. Toda la información publicada —incluida la nuestra hasta hoy— sigue
 * enumerando los ocho incisos viejos.
 *
 * Lo que NO cambió: la renuncia lisa y llana (art. 240 LCT) sigue fuera de la lista.
 *
 * Fuente: texto actualizado de la Ley 24.013 en InfoLEG (id 412), leído el 20/8/2026.
 */
export const SITUACION_LEGAL_DESEMPLEO: {
  inciso: string;
  supuesto: string;
  norma: string;
  esNuevo: boolean;
}[] = [
  { inciso: "a", supuesto: "Despido sin justa causa", norma: "art. 245 LCT · art. 46 inc. g) Ley 26.844", esNuevo: false },
  { inciso: "b", supuesto: "Despido por fuerza mayor o falta o disminución de trabajo no imputable al empleador", norma: "art. 247 LCT", esNuevo: false },
  { inciso: "c", supuesto: "Denuncia del contrato por el trabajador con justa causa (despido indirecto)", norma: "arts. 242 y 246 LCT · art. 46 inc. h) Ley 26.844", esNuevo: false },
  { inciso: "d", supuesto: "Extinción colectiva total por motivo económico o tecnológico", norma: "Ley 24.013", esNuevo: false },
  { inciso: "e", supuesto: "Quiebra o concurso del empleador", norma: "art. 251 LCT", esNuevo: false },
  { inciso: "f", supuesto: "Expiración del tiempo convenido, o fin de la obra, tarea o servicio contratado", norma: "Ley 24.013", esNuevo: false },
  { inciso: "g", supuesto: "Muerte, jubilación o invalidez del empleador que extinguen el contrato", norma: "Ley 24.013", esNuevo: false },
  { inciso: "h", supuesto: "No reiniciación o interrupción del contrato de temporada por causas ajenas al trabajador", norma: "Ley 24.013", esNuevo: false },
  { inciso: "i", supuesto: "Extinción por mutuo acuerdo de las partes", norma: "art. 241 LCT · inciso incorporado por el art. 99 de la Ley 27.802", esNuevo: true },
];

/** Citas textuales: el ancla contra la que `check_desempleo.ts` verifica que no se resuma. */
export const DESEMPLEO_TEXTOS = {
  art114IncisoI:
    "i) Extinción por mutuo acuerdo de las partes en los términos del artículo 241 de la ley 20.744 (t.o. 1976) y sus modificaciones.",
  notaVigenciaIncisoI:
    "(Inciso incorporado por art. 99 de la Ley N° 27.802 B.O. 06/03/2026. Vigencia: a partir de su publicación en el Boletín Oficial)",
  art114Encabezado:
    "Se encontrarán bajo situación legal de desempleo los trabajadores y las trabajadoras comprendidos y comprendidas en los siguientes supuestos:",
} as const;

/** B.O. de la Ley 27.802: desde acá el mutuo acuerdo da derecho a la prestación. */
export const VIGENCIA_MUTUO_ACUERDO = "6 de marzo de 2026";
export const VIGENCIA_MUTUO_ACUERDO_ISO = "2026-03-06";

export type FuenteDesempleo = { nombre: string; url: string; detalle: string };

export const DESEMPLEO_FUENTES: {
  consultadoEl: string;
  smvm: FuenteDesempleo;
  smvmAnterior: FuenteDesempleo;
  ley: FuenteDesempleo;
  decreto267: FuenteDesempleo;
  anses: FuenteDesempleo;
  ley27802: FuenteDesempleo;
} = {
  consultadoEl: "2026-09-02",
  smvm: {
    nombre: "Resolución 4/2026 — Consejo Nacional del Empleo, la Productividad y el SMVM",
    url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346775/20260902",
    detalle:
      "B.O. 2/9/2026 — laudo dictado al no haber acuerdo el 28/8/2026: fija el SMVM mes a mes desde septiembre de 2026 hasta abril de 2027 (art. 1) y ratifica la fórmula de la prestación por desempleo (art. 2).",
  },
  smvmAnterior: {
    nombre: "Resolución 9/2025 — Consejo Nacional del Empleo, la Productividad y el SMVM",
    url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/335463/20251203",
    detalle: "B.O. 3/12/2025 — escala del SMVM de noviembre de 2025 a agosto de 2026.",
  },
  ley: {
    nombre: "Ley 24.013, arts. 111 a 120 (texto actualizado)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/412/texact.htm",
    detalle: "Requisitos, duración según cotizaciones y escalonamiento de las cuotas.",
  },
  decreto267: {
    nombre: "Decreto 267/2006, art. 4",
    url: "https://www.argentina.gob.ar/normativa/nacional/decreto-267-2006-114578/texto",
    detalle: "B.O. 13/3/2006 — extensión de 6 cuotas al 70% para trabajadores de 45 años o más.",
  },
  anses: {
    nombre: "ANSES — Prestación por Desempleo para trabajadores en relación de dependencia",
    url: "https://www.anses.gob.ar/trabajo/desempleo/desempleo-para-trabajadores-en-relacion-de-dependencia",
    detalle: "Trámite, documentación y montos vigentes publicados por el organismo.",
  },
  ley27802: {
    nombre: "Ley 27.802 — Ley de Modernización Laboral (B.O. 6/3/2026)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
    detalle:
      "Su art. 99 incorporó el inciso i) al art. 114 de la Ley 24.013: la extinción por mutuo acuerdo del art. 241 de la LCT pasó a ser situación legal de desempleo. Antes no figuraba en la lista.",
  },
};

/** Las fuentes en orden de publicación, para listarlas sin filtrar el objeto. */
export const DESEMPLEO_FUENTES_LISTA: FuenteDesempleo[] = [
  DESEMPLEO_FUENTES.smvm,
  DESEMPLEO_FUENTES.smvmAnterior,
  DESEMPLEO_FUENTES.ley,
  DESEMPLEO_FUENTES.ley27802,
  DESEMPLEO_FUENTES.decreto267,
  DESEMPLEO_FUENTES.anses,
];

/** El último mes con norma dictada. Después de este, la escala necesita resolución nueva. */
export const SMVM_ULTIMO = SMVM_SERIE[SMVM_SERIE.length - 1];
