// RIMI — Régimen de Incentivo para Medianas Inversiones, Título XXIII de la Ley 27.802 (arts. 177
// a 188), leído el 27/8/2026 en el texto oficial de InfoLEG (id 423680).
//
// POR QUÉ ESTE ARCHIVO EXISTE (27/8/2026, s96): el RIMI es un régimen NUEVO —no sustituye ni deroga
// ninguna norma previa— y por eso era invisible para `tools/ley-mapa-reformas.ts`, que sólo ubica
// modificaciones. Con el inventario por artículo en 65/65, el Título XXIII seguía sin auditar.
// Rige desde el 6/3/2026 por el art. 217 («salvo disposición en contrario los artículos de la
// presente ley entrarán en vigencia a partir de su publicación»): a diferencia del Título II, no
// tiene fecha propia ni prórroga.
//
// EL HALLAZGO QUE CAMBIA QUIÉN ENTRA (art. 180, última oración): el régimen tiene montos mínimos de
// inversión en dólares —y son altos—, pero **cuatro tipos de bien están exceptuados de ese piso**:
//
//   «Sin perjuicio de los compromisos relativos a los montos mínimos establecidos en el artículo
//   siguiente, las inversiones productivas efectuadas en sistemas y/o equipos de riego, bienes de
//   alta eficiencia energética, mallas antigranizo para el sector agropecuario y en bienes
//   semovientes, serán susceptibles de promoción, INDEPENDIENTEMENTE DEL MONTO de la inversión
//   involucrada, en cada caso.»
//
// O sea: un productor que instala riego por USD 20.000 entra, aunque el piso de su categoría sea
// USD 150.000. Es la oración que decide si el régimen es para cuatro multinacionales o para
// cualquier chacra — y está en el artículo ANTERIOR al de los montos, que es justo donde nadie la
// busca.
//
// Y ESOS MISMOS CUATRO BIENES SE AMORTIZAN EN UNA SOLA CUOTA (art. 182, incisos c), d) y e)):
// riego agrícola y alta eficiencia energética, semovientes amortizables y mallas antigranizo. El
// resto de los bienes muebles va en dos cuotas y las obras en la cantidad que surja de reducir su
// vida útil al 60%.
//
// LO QUE NO SE PUBLICA ACÁ, A PROPÓSITO:
//   · **El beneficio en pesos.** La amortización acelerada adelanta un escudo fiscal cuyo valor
//     depende de la alícuota de Ganancias del contribuyente y de su tasa de descuento. No hay un
//     número legal: lo que sí es aritmética verificable es el CRONOGRAMA de cuotas, y es lo que se
//     calcula.
//   · **La conversión a pesos.** La ley fija los mínimos en dólares estadounidenses y no dice con
//     qué tipo de cambio se miden. Inventar uno sería fabricar un dato.
//
// ESTADO DE LA REGLAMENTACIÓN (verificado el 27/8/2026): el art. 188 manda a ARCA dictar «las
// normas complementarias, aclaratorias y operativas necesarias», y el art. 179 remite a la
// reglamentación para el cómputo de los dos primeros años del régimen. El texto de la ley en
// InfoLEG **no trae nota de reglamentación para este Título** —a diferencia del Título II, donde sí
// figura la del Decreto 408/2026—. Antes de adherir hay que verificar en ARCA si ya salió la
// resolución general: la página lo dice y no afirma más que eso.
//
// FUENTES: texto oficial de la Ley 27.802 (InfoLEG id 423680), Título XXIII y art. 217. Nunca una
// nota de prensa.

/** Fecha desde la que rige el Título XXIII (art. 217: publicación en el B.O.). */
export const VIGENCIA_RIMI = "6 de marzo de 2026";

/** ISO de esa misma fecha. */
export const VIGENCIA_RIMI_ISO = "2026-03-06";

export type CategoriaPyme = "micro" | "pequena" | "mediana1" | "mediana2";

/** Montos mínimos de inversión del art. 181, en dólares estadounidenses. */
export const MONTOS_MINIMOS: Record<CategoriaPyme, number> = {
  micro: 150_000,
  pequena: 600_000,
  mediana1: 3_500_000,
  mediana2: 9_000_000,
};

export const ETIQUETAS_CATEGORIA: Record<CategoriaPyme, string> = {
  micro: "Micro empresa",
  pequena: "Pequeña empresa",
  mediana1: "Mediana empresa, Tramo 1",
  mediana2: "Mediana empresa, Tramo 2",
};

export type TipoBien = "mueble" | "obra" | "riego" | "semoviente" | "malla";

export const BIENES: {
  id: TipoBien;
  etiqueta: string;
  /** Inciso del art. 182 que fija su amortización. */
  inciso: string;
  /** Cuotas anuales de la amortización acelerada. `null` = se deriva de la vida útil (obras). */
  cuotas: number | null;
  /** Si el art. 180 lo exceptúa del monto mínimo del art. 181. */
  exentoDelMinimo: boolean;
  detalle: string;
}[] = [
  {
    id: "mueble",
    etiqueta: "Bien mueble amortizable nuevo",
    inciso: "art. 182 inc. a)",
    cuotas: 2,
    exentoDelMinimo: false,
    detalle:
      "Maquinaria, equipamiento e instalaciones nuevas, excepto automóviles. Dos cuotas anuales, iguales y consecutivas.",
  },
  {
    id: "obra",
    etiqueta: "Obra",
    inciso: "art. 182 inc. b)",
    cuotas: null,
    exentoDelMinimo: false,
    detalle:
      "Se amortiza, como mínimo, en la cantidad de cuotas anuales iguales y consecutivas que surja de considerar su vida útil reducida al 60% de la estimada.",
  },
  {
    id: "riego",
    etiqueta: "Riego agrícola o bien de alta eficiencia energética",
    inciso: "art. 182 inc. c)",
    cuotas: 1,
    exentoDelMinimo: true,
    detalle:
      "Una sola cuota. Y el art. 180 lo exceptúa del monto mínimo: entra «independientemente del monto de la inversión involucrada».",
  },
  {
    id: "semoviente",
    etiqueta: "Bien semoviente amortizable",
    inciso: "art. 182 inc. d)",
    cuotas: 1,
    exentoDelMinimo: true,
    detalle:
      "Hacienda reproductora amortizable. Una sola cuota, y también exceptuada del monto mínimo por el art. 180.",
  },
  {
    id: "malla",
    etiqueta: "Malla antigranizo (sector agropecuario)",
    inciso: "art. 182 inc. e)",
    cuotas: 1,
    exentoDelMinimo: true,
    detalle:
      "Una sola cuota, y exceptuada del monto mínimo. Es el caso testigo de por qué conviene leer el art. 180 antes que el 181.",
  },
];

/** Vida útil reducida al 60% para las obras (art. 182 inc. b)). */
export const FACTOR_VIDA_UTIL_OBRA = 0.6;

/** Períodos fiscales mensuales que hay que esperar para pedir la devolución de IVA (art. 183). */
export const PERIODOS_IVA = 3;

/** Años fiscales de permanencia del bien antes de que caduquen los beneficios (art. 186). */
export const ANIOS_PERMANENCIA = 2;

/** Múltiplo máximo de la multa del art. 187, sobre la franquicia usufructuada. */
export const MULTA_MULTIPLO = 2;

/** Años desde la vigencia del régimen durante los que la inversión califica (art. 179). */
export const ANIOS_VENTANA = 2;

export const RIMI_TEXTOS = {
  /** La oración del art. 180 que exceptúa cuatro bienes del monto mínimo. */
  excepcionDelMinimo:
    "Sin perjuicio de los compromisos relativos a los montos mínimos establecidos en el artículo siguiente, las inversiones productivas efectuadas en sistemas y/o equipos de riego, bienes de alta eficiencia energética, mallas antigranizo para el sector agropecuario y en bienes semovientes, serán susceptibles de promoción, independientemente del monto de la inversión involucrada, en cada caso.",
  /** Qué es una inversión productiva, y qué queda expresamente afuera. */
  inversionProductiva:
    "A los fines del Régimen de Incentivo para Medianas Inversiones se consideran inversiones productivas a aquellas destinadas a la adquisición, elaboración, fabricación y/o importación de bienes muebles nuevos -excepto automóviles-, amortizables en el impuesto a las ganancias, así como a la realización de obras, a ser afectadas directamente al desarrollo de actividades productivas en el territorio de la República Argentina. Están expresamente excluidos del presente régimen las inversiones en activos financieros, de portfolio y bienes de cambio.",
  /** Quiénes pueden ser beneficiarios (art. 179). */
  sujetos:
    "Podrán ser beneficiarios del Régimen de Incentivo para Medianas Inversiones los sujetos comprendidos en el artículo 53 de la Ley de Impuesto a las Ganancias, texto ordenado en 2019 y sus modificaciones, que califiquen como Micro, Pequeñas o Medianas Empresas —hasta la categoría de Mediana Empresa Tramo 2 inclusive— en los términos del artículo 2° de la ley 24.467, sus modificatorias y reglamentarias, por las inversiones productivas que realicen en el país durante los dos (2) primeros años contados a partir de la fecha de entrada en vigencia del régimen, conforme lo establezca la reglamentación.",
  /** Devolución de créditos fiscales de IVA (art. 183). */
  iva:
    "Los créditos fiscales a que se refiere el primer artículo sin número a continuación del artículo 24 de la Ley del Impuesto al Valor Agregado, generados por las inversiones productivas comprendidas en el artículo 180 de la presente ley, podrán computarse a los efectos de su devolución prevista en este régimen, luego de transcurridos tres (3) períodos fiscales mensuales contados a partir de aquél en que haya resultado procedente su cómputo.",
  /** Caducidad por vender el bien antes de tiempo (art. 186). */
  caducidad:
    "Si los bienes que dieron origen al goce de los beneficios previstos en los artículos 182 y 183, dejaran de integrar el patrimonio del beneficiario dentro de los dos (2) años fiscales de que fueran afectados, se producirá la caducidad de los mismos, excepto cuando: a) Se debiera al reemplazo de un bien por otro -siempre que el valor de este último fuera igual o mayor al precio de venta del bien reemplazado-; b) Se produjera su destrucción por caso fortuito o fuerza mayor; o c) Hubiera transcurrido un tercio de la vida útil del bien que se trate, en los términos y condiciones que establezca la reglamentación.",
  /** La incompatibilidad con el RIGI (art. 184 inc. f). */
  incompatibilidadRigi:
    "Las personas jurídicas que accedan a los beneficios previstos en el Título VII - Régimen de Incentivo para Grandes Inversiones (RIGI) de la Ley de Bases y Puntos de Partida para la Libertad de los Argentinos 27.742 y/o a cualquier otro régimen de incentivos, por las mismas inversiones productivas.",
  /** Sanción por revocación (art. 187). */
  sanciones:
    "Dispuesta la revocación de los beneficios acordados, mediante acto administrativo expreso, previa instrucción del respectivo sumario administrativo y salvaguardando el derecho de defensa del beneficiario, este último deberá restituir al Fisco: los créditos fiscales devueltos y/o, en su caso, el Impuesto a las Ganancias ingresado en defecto, más los intereses resarcitorios correspondientes, quedando alcanzado además por una multa que no podrá exceder de dos (2) veces el monto de la franquicia usufructuada.",
  /** El art. 185: cuándo se considera realizada la inversión. */
  momentoDeLaInversion:
    "A los efectos de lo establecido en este Régimen, las inversiones productivas se consideran realizadas en el ejercicio fiscal anual en el que se verifique su puesta en marcha y su afectación a la producción de ganancias gravadas, de acuerdo con la Ley de Impuesto a las Ganancias texto ordenado en 2019 y sus modificaciones.",
  /** El art. 188: quién tiene que reglamentar. */
  reglamentacion:
    "La Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía, dictará las normas complementarias, aclaratorias y operativas necesarias para la efectiva aplicación de lo dispuesto en el presente Título.",
  /** El art. 217: por qué el Título XXIII rige desde la publicación. */
  art217:
    "Salvo disposición en contrario los artículos de la presente ley entrarán en vigencia a partir de su publicación en el Boletín Oficial.",
} as const;

/** Causales de exclusión del art. 184, en corto. */
export const EXCLUSIONES: { titulo: string; detalle: string }[] = [
  {
    titulo: "Condena firme en segunda instancia por la Ley 27.401",
    detalle: "Responsabilidad penal empresaria: alcanza también a los socios o accionistas.",
  },
  {
    titulo: "Quiebra declarada",
    detalle: "En los términos de las leyes 19.551 y 24.522.",
  },
  {
    titulo: "Condena firme en materia penal tributaria, aduanera o cambiaria",
    detalle:
      "Ley 24.769 y el Régimen Penal Tributario de la Ley 27.430, el Código Aduanero (Título I, Sección XII) o el Régimen Penal Cambiario de la Ley 19.359. Alcanza también a directores, síndicos y representantes legales.",
  },
  {
    titulo: "Deudas fiscales, aduaneras o previsionales firmes, exigibles e impagas",
    detalle: "Es la causal más común y la más fácil de verificar antes de adherir.",
  },
  {
    titulo: "Haber accedido al RIGI o a otro régimen de incentivos por la misma inversión",
    detalle:
      "El art. 184 inc. f) lo dice expresamente y faculta a la Autoridad de Aplicación a ampliar la exclusión. Una inversión, un régimen.",
  },
];

export type FuenteRimi = { nombre: string; url: string; detalle: string };

export const RIMI_FUENTES: { consultadoEl: string; lista: FuenteRimi[] } = {
  consultadoEl: "2026-08-27",
  lista: [
    {
      nombre: "Ley 27.802, texto oficial, Título XXIII (arts. 177 a 188)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "De acá salen los cuatro montos mínimos del art. 181, la excepción del art. 180 para riego, alta eficiencia energética, mallas antigranizo y semovientes, el régimen de amortización acelerada del art. 182 con sus cinco incisos, los tres períodos fiscales del IVA (art. 183), las exclusiones del art. 184 (incluida la incompatibilidad con el RIGI), la permanencia de dos años del art. 186 y la multa del art. 187. El art. 217 fija la vigencia desde la publicación.",
    },
    {
      nombre: "Ley 27.802 (B.O. 6/3/2026)",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia. El Título XXIII no tiene fecha propia ni prórroga: rige desde ese día, a diferencia del Título II (Fondo de Asistencia Laboral), que sí la tiene.",
    },
    {
      nombre: "Ley 24.467: estatuto PyME, art. 2° (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/15932/texact.htm",
      detalle:
        "La norma a la que remite el art. 179 para definir Micro, Pequeña y Mediana Empresa. La categorización concreta (tramos, topes de facturación por sector) la fija la autoridad de aplicación y se consulta en el Registro MiPyME, no en esta página.",
    },
  ],
};
