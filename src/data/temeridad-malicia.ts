// TEMERIDAD Y MALICIA — art. 275 de la Ley de Contrato de Trabajo 20.744, DEROGADO por el art. 207
// de la Ley 27.802 (B.O. 6/3/2026), y el art. 20 SUSTITUIDO por el art. 10 de la misma ley.
//
// POR QUÉ ESTE ARCHIVO EXISTE (24/8/2026, s93). Los dos movimientos se hicieron el mismo día, en
// el mismo Boletín, y apuntan en direcciones opuestas. Leídos por separado son dos notas más;
// leídos juntos son la página:
//
//   · **Se derogó la sanción contra el EMPLEADOR.** El art. 275 condenaba al empleador que
//     perdiera el juicio con conducta maliciosa o temeraria a pagar «un interés de hasta dos veces
//     y media el que cobren los bancos oficiales». Y desde 2011 (art. 1° de la Ley 26.696, que lo
//     incorporó como TERCER párrafo) tenía algo más filoso todavía: si el trabajador tenía que seguir o promover el
//     juicio porque no se cumplió un acuerdo YA HOMOLOGADO, esa conducta «será calificada como
//     ‘temeraria y maliciosa’» —calificación automática, no facultad del juez— y la deuda
//     devengaba el MÁXIMO del interés desde la mora. Todo eso desapareció.
//   · **Se creó una sanción contra el TRABAJADOR y su abogado.** El art. 20 es el artículo de la
//     GRATUIDAD —el que garantiza que litigar no le cueste al trabajador—, y la reforma le agregó
//     un párrafo final: si del proceso resulta «pluspetición inexcusable, configurándose ésta de
//     manera objetiva en caso de sobreestimación de los créditos reclamados», las costas «deberán
//     ser soportadas solidariamente entre la parte y el profesional actuante».
//
// El resultado, en una línea: **reclamar de más ahora tiene costo; litigar de mala fe, no.** Y el
// techo de ese costo no es abstracto: el art. 277 vigente dice que las costas de primera o única
// instancia «no excederán del veinticinco por ciento (25%) del monto de la sentencia».
//
// LO QUE ACÁ NO SE INVENTA, Y ES LA RAZÓN DE QUE LA CALCULADORA PIDA UN DATO:
// el art. 275 nunca publicó una tasa. Decía «el que cobren los bancos oficiales, para operaciones
// corrientes de descuento de documentos comerciales», que no es una serie que publique el BCRA
// con ese nombre ni un número que se pueda derivar de la ley. Y el multiplicador era «de hasta»
// dos veces y media, «graduado por los jueces». Publicar un importe único sería fabricarlo: la
// página pide la tasa de referencia y muestra el efecto del multiplicador en un abanico de 1× a
// 2,5×. Se publica la REGLA, no un número que la norma no da.
//
// LO QUE SÍ ESTÁ EN LA LEY Y SE CALCULA CON DATO OFICIAL: lo que rige HOY. El art. 276 (texto del
// art. 54 de la misma reforma) actualiza el crédito por IPC Nivel General del INDEC más el 3%
// anual, y ese motor ya vive en `lib/actualizacion-creditos.ts` con la serie oficial. Por eso la
// comparación es honesta: de un lado un número calculado con dato publicado, del otro un abanico
// declarado como abanico.
//
// FUENTE: texto actualizado de la LCT en InfoLEG (id 25552) leído el 24/8/2026, y el texto que
// estuvo vigente hasta el 6/3/2026 recuperado de la misma página oficial capturada el 15/12/2025
// (`npx -y tsx tools/infoleg.ts 25552 --fecha 20251215 --art "Art. 275"`).

/** Fecha desde la que rige la reforma (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que derogó el art. 275 de la LCT. */
export const ARTICULO_DEROGATORIO = 207;

/** Artículo de la Ley 27.802 que sustituyó el art. 20 de la LCT (gratuidad + pluspetición). */
export const ARTICULO_SUSTITUTIVO_ART20 = 10;

/** El artículo de la LCT que quedó derogado. */
export const ARTICULO_DEROGADO = 275;

/** Multiplicador máximo del interés que fijaba el art. 275: «hasta dos veces y media». */
export const MULTIPLICADOR_MAXIMO = 2.5;

/** Tope de costas de primera o única instancia sobre el monto de la sentencia (art. 277). */
export const TOPE_COSTAS = 0.25;

/** Nota de derogación del art. 275, tal como la publica InfoLEG. */
export const NOTA_DEROGACION_275 =
  "(Artículo derogado por art. 207 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)";

/**
 * Citas textuales. Las dos primeras son el texto DEROGADO (que el texact ya no muestra); las demás
 * son texto vigente. Se guardan enteras a propósito: son el ancla contra la que
 * check_temeridad_malicia.ts verifica que la página no derive hacia un resumen que diga otra cosa.
 */
export const TEMERIDAD_TEXTOS = {
  /** Primer párrafo del art. 275 derogado: la sanción y su multiplicador. */
  art275Primero:
    "Conducta maliciosa y temeraria. Cuando se declarara maliciosa o temeraria la conducta asumida por el empleador que perdiere total o parcialmente el juicio, será condenado a pagar un interés de hasta dos veces y media el que cobren los bancos oficiales, para operaciones corrientes de descuento de documentos comerciales, el que será graduado por los jueces, atendiendo a la conducta procesal asumida.",
  /** Los supuestos que el propio artículo enumeraba como «especialmente comprendidos». */
  art275Supuestos:
    "Se considerarán especialmente comprendidos en esta disposición los casos en que se evidenciaren propósitos obstruccionistas o dilatorios en reclamos por accidente de trabajo, atendiendo a las exigencias más o menos perentorias provenientes del estado de la víctima, la omisión de los auxilios indispensables en tales casos, o cuando sin fundamento, y teniendo conciencia de la propia sin razón, se cuestionase la existencia de la relación laboral, se hiciesen valer actos cometidos en fraude del trabajador, abusando de su necesidad o inexperiencia, o se opusiesen defensas manifiestamente incompatibles o contradictorias de hecho o de derecho.",
  /** Párrafo incorporado por el art. 1° de la Ley 26.696 (B.O. 29/8/2011): la calificación automática. */
  art275AcuerdoHomologado:
    "Cuando por falta de cumplimiento de un acuerdo homologado en sede judicial o administrativa el trabajador se vea precisado a continuar y/o promover la acción judicial, independientemente de las sanciones que tal actitud genere, dicha conducta será calificada como ‘temeraria y maliciosa’ y la suma adeudada devengará a favor del trabajador, desde la fecha de la mora y hasta su efectiva cancelación, el máximo del interés contemplado en el presente artículo.",
  /** Art. 20 VIGENTE, con el párrafo que agregó la reforma. */
  art20:
    "Gratuidad. El trabajador o sus derecho-habientes gozarán del beneficio de la gratuidad en los procedimientos judiciales o administrativos derivados de la aplicación de esta ley, estatutos profesionales o convenciones colectivas de trabajo. Su vivienda no podrá ser afectada al pago de costas en caso alguno. En cuanto si de los antecedentes del proceso resultase pluspetición inexcusable, configurándose ésta de manera objetiva en caso de sobreestimación de los créditos reclamados, las costas deberán ser soportadas solidariamente entre la parte y el profesional actuante.",
  art20Nota:
    "(Artículo sustituido por art. 10 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  /** Art. 276 VIGENTE: lo único que le queda a un crédito laboral por el paso del tiempo. */
  art276:
    "Actualización y repotenciación de los créditos laborales por depreciación monetaria. Los créditos provenientes de las relaciones individuales de trabajo serán actualizados por la variación que resulte del Índice de Precios al Consumidor (IPC) - Nivel General, elaborado por el Instituto Nacional de Estadística y Censos (INDEC), con más una tasa de interés del tres por ciento (3%) anual, desde que cada suma sea debida y hasta el momento del efectivo pago.",
  /** Art. 277 VIGENTE: el techo de las costas, que es el techo del riesgo del art. 20. */
  art277Costas:
    "La responsabilidad por el pago de las costas procesales, incluidos los honorarios profesionales de todo tipo allí devengados y correspondientes a la primera o única instancia, no excederán del veinticinco por ciento (25%) del monto de la sentencia, laudo, transacción o instrumento que ponga fin al diferendo.",
} as const;

/** Los supuestos que el art. 275 enumeraba, desarmados para mostrarlos como lista. */
export const SUPUESTOS_ART_275: { titulo: string; detalle: string }[] = [
  {
    titulo: "Dilatar un reclamo por accidente de trabajo",
    detalle:
      "«propósitos obstruccionistas o dilatorios en reclamos por accidente de trabajo, atendiendo a las exigencias más o menos perentorias provenientes del estado de la víctima». El artículo medía la demora contra la urgencia de la persona accidentada.",
  },
  {
    titulo: "Omitir los auxilios indispensables",
    detalle:
      "«la omisión de los auxilios indispensables en tales casos». No hacía falta una defensa procesal: bastaba con no haber socorrido.",
  },
  {
    titulo: "Negar la relación laboral sabiendo que existía",
    detalle:
      "«cuando sin fundamento, y teniendo conciencia de la propia sin razón, se cuestionase la existencia de la relación laboral». Es el supuesto más frecuente del trabajo no registrado.",
  },
  {
    titulo: "Hacer valer actos cometidos en fraude del trabajador",
    detalle:
      "«se hiciesen valer actos cometidos en fraude del trabajador, abusando de su necesidad o inexperiencia». Firmar un recibo o una renuncia obtenida así, y después invocarla en juicio.",
  },
  {
    titulo: "Oponer defensas contradictorias",
    detalle:
      "«se opusiesen defensas manifiestamente incompatibles o contradictorias de hecho o de derecho». Negar el vínculo y a la vez alegar que se pagó todo, por ejemplo.",
  },
];

export type FuenteTemeridad = { nombre: string; url: string; detalle: string };

/**
 * De dónde sale el texto DEROGADO. Va aparte de las fuentes vivas y con nombre propio porque es la
 * única cita que no puede salir del texto actualizado: el texact.htm de hoy sólo muestra la nota.
 * Es la MISMA página oficial de InfoLEG, capturada antes de que la reforma entrara en vigencia.
 */
export const FUENTE_TEXTO_ANTERIOR = {
  capturaDel: "2025-12-15",
  urlArchivada:
    "https://web.archive.org/web/20251215041122/https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
  urlOriginal:
    "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
  detalle:
    "Captura del texto actualizado oficial de la LCT del 15/12/2025, anterior al 6/3/2026. Se baja con «npx -y tsx tools/infoleg.ts 25552 --fecha 20251215 --art \"Art. 275\"». El artículo figura ahí con sus tres párrafos y con la nota del párrafo incorporado por el art. 1° de la Ley 26.696 (B.O. 29/8/2011), que es la única modificación que registran los «Antecedentes Normativos» de la LCT para este artículo: el resto del texto llega intacto desde 1976.",
} as const;

export const TEMERIDAD_FUENTES: { consultadoEl: string; lista: FuenteTemeridad[] } = {
  consultadoEl: "2026-08-24",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 275 con la nota de derogación por el art. 207 de la Ley 27.802; art. 20 con el párrafo de pluspetición inexcusable que le agregó el art. 10 de la misma ley; art. 276 (actualización por IPC más 3% anual) y art. 277 (tope del 25% de costas de primera o única instancia).",
    },
    {
      nombre: "Ley 27.802 — texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Art. 10 (sustitución del art. 20 de la LCT), art. 54 (sustitución del art. 276) y art. 207 (la derogación de los nueve artículos de la LCT, sin fecha diferida).",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia. La nota del art. 275 dice «a partir de su publicación en el Boletín Oficial»: no espera al 1/1/2027.",
    },
    {
      nombre: "Ley 26.696 — B.O. 29/8/2011",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/185000-189999/186021/norma.htm",
      detalle:
        "El artículo 1° incorporó como TERCER párrafo del art. 275 de la LCT el texto que calificaba automáticamente como «temeraria y maliciosa» la falta de cumplimiento de un acuerdo homologado, con el máximo del interés desde la mora. Es la única modificación que el art. 275 tuvo desde 1976, y cayó junto con el artículo.",
    },
  ],
};
