// Actualización y repotenciación de los créditos laborales — art. 276 de la Ley de Contrato de
// Trabajo 20.744, con el TEXTO SUSTITUIDO por el art. 54 de la Ley 27.802 (B.O. 6/3/2026).
//
// POR QUÉ ESTE ARCHIVO EXISTE (15/8/2026, s82): la Ley 27.802 reformó ~54 artículos de la LCT
// hace cinco meses y el art. 276 es el que más plata mueve: fijó por LEY cómo se actualiza un
// crédito laboral —IPC Nivel General del INDEC más una tasa del 3% anual— y con eso desplazó a
// la discusión jurisprudencial que venía decidiendo el tema (tasa activa, actas de la CNAT,
// CER + %). Toda calculadora publicada antes de marzo de 2026 aplica el criterio viejo, y las
// notas siguen explicando el viejo. Acá se aplica el texto vigente, leído del texto actualizado
// de InfoLEG (no de una nota).
//
// EL DATO NO SE ROTA A MANO: el índice sale de `data/ipc-serie.ts`, que se regenera solo con
// `scripts/gen_ipc_serie.ts` desde la API oficial de series de tiempo. Este archivo sólo guarda
// las CONSTANTES de la norma (que no cambian hasta que cambie la ley) y las citas textuales.
//
// LO QUE HAY QUE MIRAR CON LUPA (y por eso está escrito acá y verificado en check_actualizacion_creditos.ts):
//   1. La ley dice "una tasa de interés del tres por ciento (3%) anual" y NO dice si se capitaliza.
//      La página muestra el interés SIMPLE (tasa pura sobre el capital ya actualizado) como número
//      principal y publica el compuesto al lado, porque la diferencia existe y el lector la merece.
//   2. El IPC se publica con ~40 días de atraso. Un pago de hoy no se puede actualizar "hasta hoy":
//      se actualiza hasta el último índice PUBLICADO. Ese desfasaje es plata y casi nadie lo dice.
//   3. La serie oficial del IPC Nacional arranca en diciembre de 2016. Un crédito anterior no se
//      puede actualizar con este índice: la página lo dice en vez de inventar un empalme.
//   4. El art. 277 (sustituido por el art. 56 de la misma ley) permite pagar la sentencia en cuotas
//      y dice "ajustadas conforme la pauta establecida en el artículo 276" SÓLO en el supuesto de
//      las grandes empresas (6 cuotas). Para las MiPyME (12 cuotas) el texto no lo repite.

/** Tasa de interés anual que fija el art. 276 LCT, además de la actualización por IPC. */
export const TASA_PURA_ANUAL = 0.03;

/** Art. 277: tope del pacto de cuota litis sobre el monto del proceso. */
export const CUOTA_LITIS_MAXIMA = 0.2;

/** Art. 277: tope de las costas de primera o única instancia sobre el monto de la sentencia. */
export const COSTAS_MAXIMAS = 0.25;

/** Art. 277: cuotas mensuales en que puede cancelarse la sentencia según el condenado. */
export const CUOTAS_GRANDES_EMPRESAS = 6;
export const CUOTAS_PYME = 12;

/** Fecha desde la que rige el texto actual del art. 276 (B.O. de la Ley 27.802). */
export const VIGENCIA_ART_276 = "6 de marzo de 2026";

/**
 * Citas textuales del texto ACTUALIZADO en InfoLEG. Se guardan enteras a propósito: son el ancla
 * contra la que `check_actualizacion_creditos.ts` verifica que la página no derive hacia un
 * resumen que diga otra cosa que la norma.
 */
export const CREDITOS_TEXTOS = {
  art276:
    "Actualización y repotenciación de los créditos laborales por depreciación monetaria. Los créditos provenientes de las relaciones individuales de trabajo serán actualizados por la variación que resulte del Índice de Precios al Consumidor (IPC) - Nivel General, elaborado por el Instituto Nacional de Estadística y Censos (INDEC), con más una tasa de interés del tres por ciento (3%) anual, desde que cada suma sea debida y hasta el momento del efectivo pago.",
  cuotaLitis:
    "Todo pacto de cuota litis requerirá ratificación personal y homologación judicial, y en ningún caso podrá exceder del veinte por ciento (20%) del monto del proceso.",
  cuotasGrandes:
    "Las sentencias judiciales condenatorias de personas humanas y/o jurídicas cuando se trate de grandes empresas podrán ser canceladas en hasta un máximo de seis (6) cuotas mensuales consecutivas, ajustadas conforme la pauta establecida en el artículo 276 de la presente ley.",
  cuotasPyme:
    "En el caso de las Micro, Pequeñas y Medianas Empresas la cancelación de las sentencias judiciales condenatorias de personas humanas y/o jurídicas podrán ser realizadas en hasta un máximo de doce (12) cuotas mensuales consecutivas.",
  costas:
    "La responsabilidad por el pago de las costas procesales, incluidos los honorarios profesionales de todo tipo allí devengados y correspondientes a la primera o única instancia, no excederán del veinticinco por ciento (25%) del monto de la sentencia, laudo, transacción o instrumento que ponga fin al diferendo.",
} as const;

export const CREDITOS_FUENTES = {
  consultadoEl: "15 de agosto de 2026",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744, texto actualizado, arts. 276 y 277",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "El texto consolidado que ya incorpora la sustitución. Es la fuente que se leyó, artículo por artículo, para esta página.",
    },
    {
      nombre: "Ley 27.802: arts. 54 y 56 (B.O. 6/3/2026)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680",
      detalle:
        "La reforma que sustituyó los arts. 276 y 277 de la LCT. Rige desde su publicación en el Boletín Oficial.",
    },
    {
      nombre: "IPC Nacional: Nivel General (INDEC), serie oficial",
      url: "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&format=json&limit=1000",
      detalle:
        "El índice que nombra el art. 276. Se baja de la API de series de tiempo del Estado y se regenera en cada actualización mensual.",
    },
  ],
} as const;
