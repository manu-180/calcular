import {
  ANIOS_CONSERVACION,
  LIBRO_TEXTOS,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "@/data/libro-sueldos";

// ¿Te ampara la presunción del art. 55 de la LCT? — el motor de la página /libro-de-sueldos.
//
// NO ES UNA CALCULADORA DE PLATA: es una calculadora de REGLA, del mismo tipo que /licencias-especiales.
// Devuelve, para el mismo caso, qué presunción se dispara HOY y cuál se hubiera disparado antes del
// 6/3/2026, porque la Ley 27.802 no ajustó el art. 55: le cambió el disparador.
//
//   · Texto anterior — «Omisión de su EXHIBICIÓN»: la presunción nacía de "la falta de exhibición o
//     requerimiento judicial o administrativo del libro, registro, planilla u otros elementos de
//     contralor previstos por los artículos 52 y 54". Castigaba una CONDUCTA PROCESAL.
//   · Texto vigente — «Omisión de REGISTRACIÓN»: nace de "la falta de registración en los términos
//     del artículo 52". Castiga un HECHO SUSTANTIVO.
//
// LA CELDA QUE CAMBIÓ DE SIGNO, y que es la razón de ser de esta página: el empleador que SÍ te
// registró en ARCA pero NO exhibe la documentación en el juicio. Antes caía bajo la presunción por
// esa sola negativa; hoy el texto del art. 55 no lo alcanza, y el art. 54 —que extendía la regla a
// registros, planillas y elementos de contralor— fue derogado el mismo día.
//
// LÍMITE DECLARADO, no escondido: esto se lee del TEXTO de la ley. Que la negativa a exhibir siga
// pesando en un juicio por otras vías (los arts. 53, 56 y 57, la carga dinámica de la prueba, el
// derecho procesal de cada provincia) es discusión abierta, y la página lo dice. Lo que la ley ya
// no dice es que esa negativa, por sí sola, constituya la presunción del art. 55.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

/** Cómo estaba registrado el trabajador ante ARCA (antes, ante el organismo recaudador). */
export type EstadoRegistracion = "registrado" | "mal_registrado" | "sin_registrar";

/** Qué hizo el empleador con los libros y registros ante el requerimiento. */
export type Exhibicion = "exhibio" | "no_exhibio";

export type Escenario = {
  /** true si la presunción del art. 55 se dispara en ese régimen. */
  aplica: boolean;
  /** El epígrafe del artículo en ese régimen. */
  epigrafe: string;
  /** Por qué se dispara (o por qué no). */
  motivo: string;
  /** Sobre qué recae la presunción, con las palabras del artículo. */
  alcance: string;
};

export type ResultadoLibro = {
  /** Régimen aplicable según la fecha del hecho. */
  regimen: "vigente" | "anterior";
  /** El hecho cae antes del 6/3/2026. */
  esAnteriorALaReforma: boolean;
  hoy: Escenario;
  antes: Escenario;
  /** true si las dos lecturas dan resultados distintos: es el caso que la reforma dio vuelta. */
  cambiaElResultado: boolean;
  /** El escenario que efectivamente rige el caso cargado. */
  aplicable: Escenario;
  /** Hasta cuándo hay que conservar los libros de papel, si se cargó la fecha del último asiento. */
  conservacionHasta: string | null;
  avisos: Aviso[];
};

function sumarAnios(iso: string, anios: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const f = new Date(Date.UTC(y + anios, m - 1, d));
  return f.toISOString().slice(0, 10);
}

const ALCANCE_VIGENTE =
  "«las circunstancias que debieron constar en el pertinente registro» — o sea, lo que la registración ante ARCA tendría que haber dicho: fecha de ingreso, remuneración, categoría.";
const ALCANCE_ANTERIOR =
  "«las circunstancias que debían constar en tales asientos» — las del libro, los registros, las planillas y los demás elementos de contralor de los arts. 52 y 54.";

export function evaluarPresuncion(params: {
  /** Fecha del despido, del reclamo o del hecho que se discute, ISO YYYY-MM-DD. */
  fechaHecho: string;
  registracion: EstadoRegistracion;
  exhibicion: Exhibicion;
  /** Fecha del último asiento en el libro de papel, para el plazo de conservación (opcional). */
  ultimoAsientoPapel?: string;
}): ResultadoLibro | null {
  const { fechaHecho, registracion, exhibicion, ultimoAsientoPapel } = params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaHecho)) return null;

  const esAnteriorALaReforma = fechaHecho < VIGENCIA_REFORMA_ISO;
  const regimen: ResultadoLibro["regimen"] = esAnteriorALaReforma ? "anterior" : "vigente";

  // Texto VIGENTE: la presunción nace de la falta de registración, y de nada más.
  const faltaRegistracion = registracion !== "registrado";
  const hoy: Escenario = {
    aplica: faltaRegistracion,
    epigrafe: "Omisión de registración",
    motivo: faltaRegistracion
      ? registracion === "sin_registrar"
        ? "El trabajador no estaba registrado ante ARCA: es exactamente «la falta de registración en los términos del artículo 52» que el texto vigente exige."
        : "La registración existía pero no reflejaba la realidad (fecha de ingreso o remuneración falsas). La presunción cubre «las circunstancias que debieron constar en el pertinente registro», que es justamente lo que se registró mal."
      : "El trabajador estaba registrado ante ARCA. El texto vigente del art. 55 sólo se dispara por la falta de registración, y no menciona la exhibición de libros ni de ningún otro elemento de contralor.",
    alcance: ALCANCE_VIGENTE,
  };

  // Texto ANTERIOR: la presunción nacía de no exhibir.
  const noExhibio = exhibicion === "no_exhibio";
  const antes: Escenario = {
    aplica: noExhibio,
    epigrafe: "Omisión de su exhibición",
    motivo: noExhibio
      ? "El empleador no exhibió el libro, los registros o las planillas ante el requerimiento. El texto anterior hacía nacer la presunción de esa sola falta de exhibición, sin preguntar si el trabajador estaba registrado."
      : "El empleador exhibió lo que se le requirió. El texto anterior no hacía nacer la presunción de la falta de registración en sí, sino de la falta de exhibición.",
    alcance: ALCANCE_ANTERIOR,
  };

  const cambiaElResultado = hoy.aplica !== antes.aplica;
  const aplicable = esAnteriorALaReforma ? antes : hoy;

  const conservacionHasta =
    ultimoAsientoPapel && /^\d{4}-\d{2}-\d{2}$/.test(ultimoAsientoPapel)
      ? sumarAnios(ultimoAsientoPapel, ANIOS_CONSERVACION)
      : null;

  const avisos: Aviso[] = [];

  avisos.push({
    tono: esAnteriorALaReforma ? "atencion" : "ok",
    texto: esAnteriorALaReforma
      ? `El hecho que cargaste es anterior al ${VIGENCIA_REFORMA}, así que le rige el texto ANTERIOR del art. 55 («${antes.epigrafe}»). La reforma no es retroactiva: la nota de vigencia del artículo dice «a partir de su publicación en el Boletín Oficial».`
      : `El hecho que cargaste es posterior al ${VIGENCIA_REFORMA}, así que le rige el texto VIGENTE del art. 55 («${hoy.epigrafe}»), sustituido por el art. 22 de la Ley 27.802.`,
  });

  if (cambiaElResultado) {
    avisos.push({
      tono: "bloqueante",
      texto: hoy.aplica
        ? "Tu caso da distinto en cada texto, y a favor del texto NUEVO: hoy la falta de registración dispara la presunción por sí sola, sin depender de que el empleador exhiba o no los libros."
        : "Tu caso es exactamente el que la reforma dio vuelta: el empleador te tenía registrado y NO exhibió la documentación. Con el texto anterior, esa sola negativa hacía nacer la presunción a tu favor. El texto vigente del art. 55 ya no la menciona — y el art. 54, que extendía la regla a «registros, planillas u otros elementos de contralor», fue derogado el mismo día por el art. 207.",
    });
  }

  if (!hoy.aplica && !antes.aplica) {
    avisos.push({
      tono: "atencion",
      texto:
        "Con los datos cargados no se dispara la presunción del art. 55 en ninguno de los dos textos. Eso no significa que no haya nada que reclamar: significa que la prueba corre por otras vías (los arts. 56 y 57 de la LCT, la prueba testimonial, la pericia contable).",
    });
  }

  avisos.push({
    tono: "atencion",
    texto: `Cita bien la norma: hasta el ${VIGENCIA_REFORMA} el art. 55 remitía a «los artículos 52 y 54». Hoy el art. 54 está derogado y el art. 55 remite sólo al 52. Cualquier escrito, modelo o resumen que siga diciendo «arts. 52 y 54 LCT» está invocando la mitad de una remisión que ya no existe.`,
  });

  avisos.push({
    tono: "atencion",
    texto: `El art. 52 nuevo dice que la registración ante ARCA «será suficiente a todos los efectos, sin que puedan exigirse requisitos adicionales por parte de ninguna otra autoridad»: se terminaron las rúbricas y planillas propias de cada autoridad local. Y manda conservar los libros preexistentes ${ANIOS_CONSERVACION} años, con las copias digitales valiendo igual que el papel. El artículo no dice desde qué día se cuentan esos ${ANIOS_CONSERVACION} años: la calculadora los cuenta desde la fecha que cargues, y conviene chequearlo con un profesional.`,
  });

  avisos.push({
    tono: "atencion",
    texto:
      "Lo que esta página lee es el TEXTO de la ley. Que la negativa a exhibir documentación siga pesando en un juicio por otras vías —el art. 53, la carga dinámica de la prueba, el código procesal de tu provincia— es una discusión abierta, y la reforma es de marzo de 2026: todavía no hay jurisprudencia. Orientativo, no reemplaza a un profesional.",
  });

  return {
    regimen,
    esAnteriorALaReforma,
    hoy,
    antes,
    cambiaElResultado,
    aplicable,
    conservacionHasta,
    avisos,
  };
}

/** Las cuatro combinaciones posibles, para la matriz que publica la página. */
export const MATRIZ_CASOS: {
  registracion: EstadoRegistracion;
  exhibicion: Exhibicion;
  etiqueta: string;
}[] = [
  { registracion: "sin_registrar", exhibicion: "no_exhibio", etiqueta: "Sin registrar y no exhibió" },
  { registracion: "sin_registrar", exhibicion: "exhibio", etiqueta: "Sin registrar pero exhibió" },
  { registracion: "registrado", exhibicion: "no_exhibio", etiqueta: "Registrado y no exhibió" },
  { registracion: "registrado", exhibicion: "exhibio", etiqueta: "Registrado y exhibió" },
];

/** Texto del art. 55 en cada régimen, para citarlo sin duplicarlo. */
export const TEXTO_ART55 = {
  vigente: LIBRO_TEXTOS.art55Vigente,
  anterior: LIBRO_TEXTOS.art55Anterior,
} as const;
