// Negociación colectiva de buena fe: la multa del art. 4° inc. e) de la Ley 23.546, los plazos de
// la comisión negociadora y la homologación tácita del art. 6°.
//
// Art. 4°, 6° y 7° de la Ley 23.546 (t.o. 2004), sustituidos por los arts. 149, 150 y 151 de la
// Ley 27.802 (B.O. 6/3/2026, vigencia desde la publicación). Leídos el 28/8/2026 en el texto
// oficial de InfoLEG (id 21112) y contrastados contra la captura del 1/2/2026 del mismo texto
// (Internet Archive), que es la versión que rigió hasta el 5/3/2026.
//
// POR QUÉ ESTE ARCHIVO EXISTE (28/8/2026, s97). El Título XVI de la Ley 27.802 figuraba «sin
// auditar». Al abrirlo aparecieron cuatro cambios que la web repite mal porque la multa del 20% ya
// existía desde 2004 —el número no cambió, y por eso todo el mundo dio por sentado que el artículo
// tampoco—. Los cuatro:
//
//   1. **La multa dejó de ser facultativa.** El texto anterior decía que el tribunal «podrá,
//      además, sancionar a la parte incumplidora». El vigente dice que «sancionará». Es una
//      palabra, y es la diferencia entre una sanción posible y una obligatoria.
//   2. **Cesar a tiempo ya no reduce la multa: la borra.** Antes, si los actos cesaban dentro del
//      plazo que fijara la sentencia, el monto «podrá ser reducido por el juez hasta el CINCUENTA
//      POR CIENTO (50%)». Hoy ese plazo es de **diez (10) días** —fijo, y la decisión judicial
//      «debe» establecerlo— y el monto «podrá ser eliminada por el juez». De la mitad a cero.
//   3. **Antes de ir al juez hay una vía administrativa nueva, y viene con un arma.** El texto
//      anterior sólo habilitaba a «promover una acción judicial». El vigente permite pedirle antes
//      a la Secretaría de Trabajo que adopte medidas para concretar la mesa, «pudiendo entre otras
//      facultades **delimitar el alcance de la prórroga en la vigencia de las cláusulas
//      obligacionales** del Convenio Colectivo de Trabajo que se intenta renegociar». O sea: la
//      ultraactividad de las cláusulas obligacionales puede recortarse a quien no se sienta.
//   4. **Quién negocia un convenio de empresa quedó escrito, y es de orden público.** El texto
//      anterior decía apenas «con representantes sindicales». El vigente distingue por nivel: por
//      empresa o por región negocia el sindicato de primer grado o de empresa con personería
//      gremial en ese ámbito, y agrega que «esta disposición es de orden público por cuanto toda
//      disposición establecida por estatuto de la Organización Sindical de Segundo o Primer Grado
//      que se oponga a la misma, no será válida». Un estatuto de federación que reserve la
//      negociación para sí queda sin efecto en ese punto.
//
// Y un quinto, chico pero con consecuencias: la **homologación tácita** del art. 6° dejó de ser
// automática por el mero paso de los 30 días. Hoy exige además que no haya observaciones
// pendientes: «Transcurrido dicho plazo, SIN QUE EXISTAN OBSERVACIONES A CUMPLIR POR LAS PARTES,
// se la considerará tácitamente homologada».
//
// EL DATO QUE HACE FÁCIL LA ARITMÉTICA DE FECHAS: el art. 8° de esta ley —que la reforma NO tocó—
// dice que «los plazos a que se refiere esta Ley se computarán en días hábiles administrativos».
// Es lo contrario de lo que pasa con la Ley 14.786, donde el plazo se escribió sin calificar (ver
// /servicios-esenciales-huelga). Acá no hay que elegir entre dos lecturas: la ley eligió.
//
// LO QUE NO SE PUBLICA, A PROPÓSITO: una multa «que va a salir». El inciso fija un máximo, no un
// importe: dice «hasta un máximo equivalente al veinte por ciento (20%)». Cuánto aplica el juez
// dentro de ese techo no está en la ley. La página calcula el techo y los incrementos por mora, y
// dice con todas las letras que es un tope, no una condena.
//
// FUENTES: sólo texto oficial. Nunca una nota de prensa.

/** Fecha desde la que rige el texto actual (art. 217 de la Ley 27.802: publicación en el B.O.). */
export const VIGENCIA = "6 de marzo de 2026";
export const VIGENCIA_ISO = "2026-03-06";

export const REGLAS = {
  /** Tope de la multa, en % de la masa salarial del mes (art. 4° inc. e). */
  topePorcentaje: 20,
  /** Tope agravado en caso de reincidencia, en % de esos mismos montos. */
  topeReincidenciaPorcentaje: 100,
  /** Incremento por mora en acatar la decisión judicial. */
  incrementoPorcentaje: 10,
  /** Cada cuántos días de mora se aplica ese incremento. */
  incrementoCadaDias: 5,
  /** Días para que cesen los actos y el juez pueda eliminar la multa. */
  diasParaEliminar: 10,
  /** Plazo para constituir la comisión negociadora desde la notificación del art. 2°. */
  diasComisionNegociadora: 15,
  /** Plazo de homologación o registración de la convención colectiva (art. 6°). */
  diasHomologacion: 30,
} as const;

/** Los cambios del 6/3/2026, uno por uno, con el texto de antes y el de ahora. */
export type Cambio = {
  id: string;
  titulo: string;
  antes: string;
  ahora: string;
  porQue: string;
};

export const CAMBIOS: Cambio[] = [
  {
    id: "multa-obligatoria",
    titulo: "La multa pasó de facultativa a obligatoria",
    antes:
      "El tribunal dispondrá el cese inmediato del comportamiento violatorio del deber de negociar de buena fe y podrá, además, sancionar a la parte incumplidora con una multa…",
    ahora:
      "El tribunal dispondrá el cese inmediato del comportamiento violatorio del deber de negociar de buena fe y sancionará a la parte incumplidora con una multa…",
    porQue:
      "Es una palabra: «podrá sancionar» pasó a «sancionará». Con el texto anterior el juez podía ordenar el cese y no multar; con el vigente la sanción viene junto con el cese. El porcentaje —20% de la masa salarial— es el mismo desde 2004, y por eso casi nadie miró el verbo.",
  },
  {
    id: "eliminacion",
    titulo: "Cesar a tiempo ya no reduce la multa a la mitad: la borra",
    antes:
      "Cuando cesaren los actos que dieron origen a la acción entablada, dentro del plazo que al efecto establezca la decisión judicial, el monto de la sanción podrá ser reducido por el juez hasta el CINCUENTA POR CIENTO (50%).",
    ahora:
      "Cuando cesaren los actos que dieron origen a la acción entablada, dentro del plazo de diez (10) días que al efecto debe establecer la decisión judicial, el monto de la sanción podrá ser eliminada por el juez.",
    porQue:
      "Dos cambios en una oración. El plazo dejó de quedar a criterio del juez y quedó fijo en diez días —y la sentencia «debe» establecerlo, no «puede»—. Y el premio por cumplir pasó de una quita de hasta la mitad a la eliminación total de la multa.",
  },
  {
    id: "via-administrativa",
    titulo: "Hay una vía administrativa previa, y puede recortar la ultraactividad",
    antes:
      "…la parte afectada por el incumplimiento podrá promover una acción judicial ante el tribunal laboral competente, mediante el proceso sumarísimo…",
    ahora:
      "…la parte afectada por el incumplimiento podrá solicitar a la Secretaría de Trabajo, Empleo y Seguridad Social del Ministerio de Capital Humano que adopte las medidas conducentes para la concreción de la mesa de negociación pudiendo entre otras facultades delimitar el alcance de la prórroga en la vigencia de las cláusulas obligacionales del Convenio Colectivo de Trabajo que se intenta renegociar si a ese momento aún se encontrasen vigentes, como también la de promover una acción judicial…",
    porQue:
      "El texto anterior sólo ofrecía el juzgado. El vigente agrega un camino administrativo con una facultad que pesa: delimitar hasta dónde siguen prorrogadas las cláusulas obligacionales del convenio que se está renegociando. Para quien se beneficia de que el convenio viejo siga vigente, sentarse a negociar dejó de ser gratis.",
  },
  {
    id: "quien-negocia",
    titulo: "Quién negocia según el nivel, y es de orden público",
    antes:
      "…se constituirá la comisión negociadora con representantes sindicales, la que deberá integrarse respetando lo establecido en la Ley N° 25.674, y la representación de los empleadores.",
    ahora:
      "Si se trata de una negociación por empresa o por región, la representación sindical será la del o de los sindicatos de primer grado o de empresa con personería gremial en el ámbito territorial y personal que se pretenda negociar. Esta disposición es de orden público por cuanto toda disposición establecida por estatuto de la Organización Sindical de Segundo o Primer Grado que se oponga a la misma, no será válida. En el supuesto de una negociación por actividad, la representación será de la Federación u Organización Gremial de Primer Grado con alcance nacional de acuerdo a la personería gremial otorgada.",
    porQue:
      "El texto anterior no distinguía por nivel: decía «representantes sindicales» y nada más. El vigente asigna la representación según se negocie por empresa, por región o por actividad, y blinda esa asignación declarándola de orden público: un estatuto de federación que reserve para sí la negociación por empresa «no será válida» en ese punto.",
  },
  {
    id: "homologacion-tacita",
    titulo: "La homologación tácita dejó de ser automática",
    antes:
      "La homologación deberá producirse dentro de un plazo no mayor de TREINTA (30) días de recibida la solicitud, siempre que la convención reúna todos los requisitos establecidos a tal efecto. Transcurrido dicho plazo se la considerará tácitamente homologada.",
    ahora:
      "La homologación o registración deberá producirse dentro de un plazo no mayor de treinta (30) días de recibida la solicitud, siempre que la convención reúna todos los requisitos establecidos a tal efecto. Transcurrido dicho plazo, sin que existan observaciones a cumplir por las partes, se la considerará tácitamente homologada.",
    porQue:
      "Antes bastaba con que pasaran los treinta días. Ahora hay una condición más: que no haya observaciones pendientes de cumplir. Y el artículo distingue homologación de registración, que antes iban juntas bajo una sola palabra.",
  },
];

/** Citas textuales del texto vigente. */
export const TEXTOS = {
  multa:
    "El tribunal dispondrá el cese inmediato del comportamiento violatorio del deber de negociar de buena fe y sancionará a la parte incumplidora con una multa de hasta un máximo equivalente al veinte por ciento (20%) del total de la masa salarial del mes en que se produzca el hecho, correspondiente a los trabajadores comprendidos en el ámbito personal de la negociación. Si la parte infractora mantuviera su actitud, el importe de la sanción se incrementará en un diez por ciento (10%) por cada cinco (5) días de mora en acatar la decisión judicial. En el supuesto de reincidencia el máximo previsto en el presente inciso podrá elevarse hasta el equivalente al cien por ciento (100%) de esos montos.",
  eliminacion:
    "Cuando cesaren los actos que dieron origen a la acción entablada, dentro del plazo de diez (10) días que al efecto debe establecer la decisión judicial, el monto de la sanción podrá ser eliminada por el juez. Todos los importes que así se devenguen tendrán como exclusivo destino programas de inspección de la Secretaría de Trabajo, Empleo y Seguridad Social del Ministerio de Capital Humano.",
  buenaFe:
    "Las partes están obligadas a negociar de buena fe. Ello implica: I. Concurrir a las reuniones acordadas o fijadas por la Autoridad de Aplicación. II. Designar negociadores con mandato suficiente. III. Intercambiar la información necesaria a los fines del examen de las cuestiones en debate, para entablar una discusión fundada y obtener un acuerdo. Dicho intercambio deberá obligatoriamente incluir la información relativa a la distribución de los beneficios de la productividad, la situación actual del empleo y las previsiones sobre su futura evolución. IV. Realizar esfuerzos conducentes a lograr acuerdos.",
  quienNegocia:
    "Si se trata de una negociación por empresa o por región, la representación sindical será la del o de los sindicatos de primer grado o de empresa con personería gremial en el ámbito territorial y personal que se pretenda negociar. Esta disposición es de orden público por cuanto toda disposición establecida por estatuto de la Organización Sindical de Segundo o Primer Grado que se oponga a la misma, no será válida. En el supuesto de una negociación por actividad, la representación será de la Federación u Organización Gremial de Primer Grado con alcance nacional de acuerdo a la personería gremial otorgada.",
  homologacion:
    "Las convenciones colectivas de trabajo son homologadas y/o registradas por la Secretaría de Trabajo, Empleo y Seguridad Social del Ministerio de Capital Humano, en su carácter de Autoridad de Aplicación. La homologación o registración deberá producirse dentro de un plazo no mayor de treinta (30) días de recibida la solicitud, siempre que la convención reúna todos los requisitos establecidos a tal efecto. Transcurrido dicho plazo, sin que existan observaciones a cumplir por las partes, se la considerará tácitamente homologada.",
  plazosHabiles:
    "Los plazos a que se refiere esta Ley se computarán en días hábiles administrativos.",
  diferendos:
    "En los diferendos que se susciten en el curso de las negociaciones se aplicará la ley 14.786. Sin perjuicio de ello las partes podrán, de común acuerdo, someterse a la intervención de un servicio de mediación, conciliación y arbitraje que funcionará en el ámbito de la Secretaría de Trabajo, Empleo y Seguridad Social del Ministerio de Capital Humano.",
} as const;

/** La información que hay que intercambiar sí o sí, según el nivel de la negociación. */
export const INFORMACION_OBLIGATORIA = {
  siempre: [
    "Distribución de los beneficios de la productividad",
    "Situación actual del empleo",
    "Previsiones sobre la futura evolución del empleo",
  ],
  aNivelEmpresa: [
    "Situación económica de la empresa, del sector y del entorno",
    "Costo laboral unitario",
    "Causales e indicadores de ausentismo",
    "Innovaciones tecnológicas y organizacionales previstas",
    "Organización, duración y distribución del tiempo de trabajo",
    "Siniestralidad laboral y medidas de prevención",
    "Planes y acciones en materia de formación profesional",
  ],
  enCrisis: [
    "Mantenimiento del empleo",
    "Movilidad funcional, horaria o salarial",
    "Innovación tecnológica y cambio organizacional",
    "Recalificación y formación profesional de los trabajadores",
    "Reubicación interna o externa y programas de reinserción laboral",
    "Aportes convenidos al Sistema Integrado de Jubilaciones y Pensiones",
    "Programas de apoyo a microemprendimientos para los trabajadores afectados",
  ],
  enConcurso: [
    "Causas de la crisis y sus repercusiones sobre el empleo",
    "Situación económico financiera de la empresa y del entorno",
    "Propuesta de acuerdo con los acreedores",
    "Rehabilitación de la actividad productiva",
    "Situación de los créditos laborales",
  ],
} as const;

export type Fuente = { nombre: string; url: string; detalle: string };

export const FUENTES: { consultadoEl: string; lista: Fuente[] } = {
  consultadoEl: "2026-08-28",
  lista: [
    {
      nombre: "Ley 23.546 (t.o. 2004) — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/21112/texact.htm",
      detalle:
        "El texto vigente de los arts. 4°, 6° y 7°, con la nota que los atribuye a los arts. 149, 150 y 151 de la Ley 27.802. De acá salen el tope del 20%, el incremento del 10% cada 5 días, el 100% de la reincidencia, los 10 días para que la multa pueda eliminarse, los 15 días de la comisión negociadora y los 30 de la homologación. El art. 8° —intacto— es el que manda contar todos esos plazos en días hábiles administrativos.",
    },
    {
      nombre: "Ley 23.546 — el mismo texto oficial, capturado el 1/2/2026 (Internet Archive)",
      url: "https://web.archive.org/web/20260201/https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/21112/texact.htm",
      detalle:
        "La versión que rigió hasta el 5/3/2026. Es la que permite comprobar que la multa era facultativa («podrá, además, sancionar»), que cesar a tiempo sólo la reducía hasta el 50% y que el art. 4° no distinguía quién negocia según el nivel.",
    },
    {
      nombre: "Ley 27.802 — texto oficial, Título XVI (arts. 149 a 151)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "La norma que sustituyó los tres artículos. El art. 217 fija la vigencia desde la publicación en el Boletín Oficial: este Título no tiene fecha diferida ni prórroga.",
    },
    {
      nombre: "Ley 14.786 — conciliación obligatoria (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/115000-119999/115423/norma.htm",
      detalle:
        "La ley a la que remite el art. 7° para los diferendos que aparezcan durante la negociación. Ojo con el contraste: su art. 11 dice «quince días» sin calificarlos, mientras que el art. 8° de la Ley 23.546 sí manda contar en días hábiles administrativos.",
    },
  ],
};
