// LA COMISIÓN MÉDICA — la instancia obligatoria previa a demandar a la ART (Ley 27.348).
//
// POR QUÉ ESTE ARCHIVO EXISTE (7/9/2026, s109). `/indemnizacion-art` calcula CUÁNTO se cobra por
// un accidente de trabajo. Lo que no estaba en el sitio es CÓMO se cobra: nadie llega a esa
// indemnización sin pasar antes por una comisión médica. El art. 1° de la Ley 27.348 la convierte
// en «instancia administrativa previa, de carácter obligatorio y excluyente de toda otra
// intervención» — o sea que un juicio iniciado sin agotarla se cae, y el art. 15 (que sustituyó el
// 4º párrafo del art. 4° de la Ley 26.773) extiende esa valla incluso a la acción civil.
//
// LO QUE LA LEY DICE Y CASI NADIE PUBLICA — los cuatro hallazgos que justifican la página:
//
//   1. LA INSTANCIA TIENE PUERTA DE SALIDA, Y ES UN RELOJ. El art. 3° le da a la comisión médica
//      SESENTA días hábiles administrativos «contados a partir de la primera presentación
//      debidamente cumplimentada», y cierra: «Todos los plazos resultarán perentorios y su
//      vencimiento dejará expedita la vía prevista en el artículo 2°». Vencido el plazo, NO hace
//      falta esperar el dictamen: se puede ir al fuero laboral. Es una fecha calculable, y es el
//      dato más accionable de todo el trámite. (El plazo se prorroga sólo «por cuestiones de hecho
//      relacionadas con la acreditación» y «debidamente fundadas»: la prórroga tiene que estar
//      motivada, no es automática.)
//
//   2. EL TRABAJADOR NO PAGA NADA. Tres cláusulas distintas, en dos artículos: los honorarios del
//      patrocinio letrado y los demás gastos «estarán a cargo de la respectiva aseguradora»
//      (art. 1°, último párrafo); «Todas las medidas de prueba producidas en cualquier instancia
//      serán gratuitas para el trabajador» (art. 2°); y —la que casi nunca se cuenta— «No podrán
//      ser objeto de pactos de cuota litis los procesos judiciales que se sustancien en el marco
//      del presente Título» (art. 2°, último párrafo). El porcentaje sobre lo que cobre el
//      trabajador está prohibido por la ley en estos juicios.
//
//   3. HAY QUIEN NO ESTÁ OBLIGADO A PASAR POR ACÁ, y es justo el caso más frecuente de las
//      consultas: el trabajador NO REGISTRADO cuyo empleador está en el apartado 1 del art. 28 de
//      la Ley 24.557 (el que no contrató ART) «no está obligado a cumplir con lo dispuesto en el
//      presente artículo y cuenta con la vía judicial expedita» (art. 1°, párrafo 3). Publicar la
//      instancia como obligatoria sin la excepción manda a un trabajador en negro a un trámite que
//      la ley no le exige.
//
//   4. LA HOMOLOGACIÓN TIENE PISO Y TIENE RELOJ. El Anexo I —el procedimiento del Servicio de
//      Homologación que el art. 3° crea— prohíbe homologar por menos: «En ningún caso se
//      homologará una propuesta de convenio que contenga un monto de reparación dineraria menor a
//      la que surja de la estricta aplicación de la normativa de la ley 24.557» (Anexo I, art. 3°).
//      Y una vez homologado, la plata tiene que estar «dentro de los cinco (5) días de notificado
//      el acto» (Anexo I, art. 4°). El acuerdo homologado hace cosa juzgada administrativa en los
//      términos del art. 15 de la LCT: se firma una sola vez.
//
// EL RELOJ PARALELO QUE SE CUENTA MAL: LA ILT. El art. 10 de la 27.348 sustituyó el art. 7° de la
// Ley 24.557 y dejó DOS topes distintos, no uno:
//   · sin recaídas → la incapacidad temporaria cesa por «transcurso de dos (2) años desde la
//     primera manifestación invalidante»: es un plazo de CALENDARIO;
//   · con reincorporación y nueva baja por la misma contingencia (ap. 3) → continúa «hasta
//     completar dos (2) años EFECTIVOS de baja, sumándose todos los períodos». Ahí el tope ya no
//     es una fecha del almanaque: son 730 días de baja acumulados, y cae mucho más tarde.
// Casi todas las notas publican sólo el primero. Para quien tuvo una recaída, el segundo es el que
// decide cuántos meses más le sigue pagando la ART.
//
// LO QUE NO SE PUBLICA ACÁ, A PROPÓSITO (NO-GO escrito para no re-buscarlo). El art. 3° delega en
// la SRT el dictado de «las normas del procedimiento de actuación ante las comisiones médicas»
// —el reglamento donde viven los plazos de cada paso interno—. No se publica ninguno de esos
// plazos porque esa resolución no se pudo verificar contra fuente oficial en esta sesión: InfoLEG
// no devuelve resoluciones de la SRT de 2017 en su buscador por número, y una resolución
// PROCEDIMENTAL sustituida diría plazos que ya no corren, que es peor que no decir nada. Lo que se
// publica son los plazos que están en la LEY y en su ANEXO, que son los que no envejecen con cada
// resolución. Si algún día se consigue el texto vigente de esa resolución, ese es el próximo filón.
//
// FUENTE leída el 7/9/2026: Ley 27.348 (InfoLEG id 272119), TEXTO ACTUALIZADO — incluye el art. 4°
// bis incorporado por el art. 154 de la Ley 27.802 (B.O. 6/3/2026) — más su Anexo I completo.

export const CM_VIGENCIA = {
  consultadoEl: "7 de septiembre de 2026",
  norma: "Ley 27.348 (B.O. 24/2/2017), texto actualizado con la Ley 27.802",
} as const;

/** Art. 3°: la comisión médica debe expedirse dentro de este plazo. Días HÁBILES administrativos. */
export const PLAZO_DICTAMEN_HABILES = 60;

/** Anexo I, art. 4°: días para poner la indemnización a disposición tras la homologación. */
export const DIAS_PAGO_HOMOLOGACION = 5;

/** Art. 7° ap. 2 inc. c) de la Ley 24.557 (según art. 10 de la 27.348): tope de la ILT, en años. */
export const ANIOS_ILT = 2;

/** El mismo tope, medido en días efectivos de baja cuando hubo recaída (art. 7° ap. 3). */
export const DIAS_ILT_EFECTIVOS = 730;

/** Art. 27 ap. 6 de la 24.557: meses de prestaciones en especie tras extinguirse la afiliación. */
export const MESES_ESPECIE_TRAS_EXTINCION = 3;

/** Cuotas impagas que habilitan a la ART a extinguir el contrato (art. 27 ap. 6). */
export const CUOTAS_PARA_EXTINGUIR = 2;

/** Citas textuales del texto actualizado. No se parafrasean: se muestran entre comillas. */
export const CM_TEXTOS = {
  obligatoria:
    "Dispónese que la actuación de las comisiones médicas jurisdiccionales creadas por el artículo 51 de la ley 24.241 y sus modificatorias, constituirá la instancia administrativa previa, de carácter obligatorio y excluyente de toda otra intervención, para que el trabajador afectado, contando con el debido patrocinio letrado, solicite la determinación del carácter profesional de su enfermedad o contingencia, la determinación de su incapacidad y las correspondientes prestaciones dinerarias previstas en la Ley de Riesgos del Trabajo.",
  noRegistrado:
    "Los trabajadores vinculados por relaciones laborales no registradas con empleadores alcanzados por lo estatuido en el apartado primero del artículo 28 de la ley 24.557 no están obligados a cumplir con lo dispuesto en el presente artículo y cuentan con la vía judicial expedita.",
  honorarios:
    "Los honorarios profesionales que correspondan por patrocinio letrado y demás gastos en que incurra el trabajador a consecuencia de su participación ante las comisiones médicas estarán a cargo de la respectiva aseguradora de riesgos del trabajo (A.R.T.).",
  plazo:
    "La comisión médica jurisdiccional deberá expedirse dentro de los sesenta (60) días hábiles administrativos, contados a partir de la primera presentación debidamente cumplimentada y la reglamentación establecerá los recaudos a dichos efectos. Dicho plazo será prorrogable por cuestiones de hecho relacionadas con la acreditación del accidente de trabajo o de la enfermedad profesional, debidamente fundadas. Todos los plazos resultarán perentorios y su vencimiento dejará expedita la vía prevista en el artículo 2° de la presente ley.",
  pruebaGratuita:
    "Todas las medidas de prueba producidas en cualquier instancia serán gratuitas para el trabajador.",
  cuotaLitis:
    "No podrán ser objeto de pactos de cuota litis los procesos judiciales que se sustancien en el marco del presente Título.",
  pisoHomologacion:
    "En ningún caso se homologará una propuesta de convenio que contenga un monto de reparación dineraria menor a la que surja de la estricta aplicación de la normativa de la ley 24.557 y sus modificatorias.",
  pagoHomologacion:
    "Las prestaciones dinerarias que se liquiden como consecuencia de la homologación deberán ser puestas a disposición del trabajador o de sus derechohabientes dentro de los cinco (5) días de notificado el acto.",
  accionCivil:
    "Las acciones judiciales con fundamento en otros sistemas de responsabilidad sólo podrán iniciarse una vez recibida la notificación fehaciente prevista en este artículo y agotada la vía administrativa mediante la resolución de la respectiva comisión médica jurisdiccional o cuando se hubiere vencido el plazo legalmente establecido para su dictado.",
  iltEfectiva:
    "Si el trabajador damnificado, dentro del plazo previsto en el inciso c) del apartado anterior, se hubiera reincorporado al trabajo y volviera a estar de baja por idéntico accidente o enfermedad profesional, su situación de Incapacidad Laboral Temporaria (ILT) continuará hasta el alta médica, declaración de Incapacidad Laboral Permanente, en caso de corresponder, su deceso o hasta completar dos (2) años efectivos de baja, sumándose todos los períodos en los cuales se hubiera visto impedido de trabajar.",
} as const;

export type Etapa = {
  id: string;
  titulo: string;
  texto: string;
  norma: string;
};

/** El trámite, en el orden en que ocurre. Cada paso, con el artículo que lo manda. */
export const ETAPAS: Etapa[] = [
  {
    id: "presentacion",
    titulo: "1 · Se presenta ante la comisión médica jurisdiccional",
    texto:
      "Con patrocinio letrado obligatorio. El trabajador elige entre tres comisiones: la de su domicilio, la del lugar donde efectivamente prestaba servicios, o la del lugar donde habitualmente se reporta. La elección es suya, no de la ART.",
    norma: "Ley 27.348, art. 1°",
  },
  {
    id: "dictamen",
    titulo: "2 · La comisión tiene 60 días hábiles administrativos para expedirse",
    texto:
      "El plazo corre desde la primera presentación «debidamente cumplimentada». Es prorrogable sólo por cuestiones de hecho de la acreditación del accidente o la enfermedad, y debidamente fundadas. Todos los plazos son perentorios: vencidos, queda expedita la vía judicial sin esperar el dictamen.",
    norma: "Ley 27.348, art. 3°",
  },
  {
    id: "homologacion",
    titulo: "3 · El Servicio de Homologación cita a una audiencia",
    texto:
      "El dictamen se notifica a las partes y al empleador, y en la misma notificación se cita a audiencia ante un funcionario letrado de la SRT. Ahí se informa el importe que corresponde. Si hay conformidad, se homologa; si la disconformidad es por el porcentaje de incapacidad, se labra acta y queda abierta la vía recursiva; si es por el importe, las partes pueden acordar por un monto MAYOR.",
    norma: "Ley 27.348, Anexo I, arts. 1° y 2°",
  },
  {
    id: "pago",
    titulo: "4 · Homologado, la plata va a la cuenta sueldo en 5 días",
    texto:
      "Las prestaciones dinerarias se depositan en la cuenta sueldo del trabajador (Ley 26.590) y deben estar a disposición dentro de los cinco días de notificado el acto de homologación. El acto homologatorio hace cosa juzgada administrativa en los términos del art. 15 de la LCT.",
    norma: "Ley 27.348, arts. 17 y 2° · Anexo I, art. 4°",
  },
  {
    id: "recurso",
    titulo: "5 · Si no hay acuerdo: revisión o justicia laboral",
    texto:
      "Agotada la instancia, las partes pueden pedir revisión ante la Comisión Médica Central. El trabajador además tiene la opción de recurrir directamente ante la justicia ordinaria del fuero laboral del domicilio de la comisión que intervino. Su recurso atrae al que interponga la ART, y la sentencia laboral es vinculante para todas las partes.",
    norma: "Ley 27.348, art. 2° · art. 46 ap. 1 de la Ley 24.557",
  },
];

export type ReglaCM = { id: string; titulo: string; texto: string; norma: string };

/** Las reglas que deciden un caso real y que la web copiada casi nunca trae. */
export const REGLAS_CM: ReglaCM[] = [
  {
    id: "no-registrado",
    titulo: "Si el empleador no tenía ART, no hay que pasar por la comisión médica",
    texto:
      "El trabajador de una relación no registrada con un empleador del apartado 1 del art. 28 de la Ley 24.557 —el que no contrató aseguradora— no está obligado a la instancia administrativa y tiene la vía judicial expedita. Es una excepción escrita en el mismo artículo que crea la obligación.",
    norma: "Ley 27.348, art. 1°, párrafo 3",
  },
  {
    id: "paga-la-art",
    titulo: "El abogado y los gastos los paga la ART, no el trabajador",
    texto:
      "El patrocinio letrado es obligatorio, y sus honorarios y los demás gastos en que incurra el trabajador por participar del trámite están a cargo de la aseguradora. Toda la prueba producida en cualquier instancia es gratuita para el trabajador.",
    norma: "Ley 27.348, art. 1° último párrafo y art. 2°",
  },
  {
    id: "cuota-litis",
    titulo: "El pacto de cuota litis está prohibido en estos juicios",
    texto:
      "La ley prohíbe expresamente que los procesos judiciales del Título I sean objeto de pactos de cuota litis. El acuerdo por el cual un profesional se queda con un porcentaje de lo que cobre el trabajador no es válido en estos procesos.",
    norma: "Ley 27.348, art. 2°, último párrafo",
  },
  {
    id: "piso-homologacion",
    titulo: "No se puede homologar un acuerdo por menos de lo que manda la ley",
    texto:
      "El Servicio de Homologación tiene prohibido homologar una propuesta cuyo monto sea menor al que surge de la estricta aplicación de la Ley 24.557. Se puede acordar por MÁS —el Anexo lo prevé expresamente cuando la disconformidad es sobre el importe—, nunca por menos.",
    norma: "Ley 27.348, Anexo I, art. 3°",
  },
  {
    id: "cosa-juzgada",
    titulo: "Lo homologado, y lo no recurrido, hace cosa juzgada administrativa",
    texto:
      "Tanto las resoluciones homologatorias como los dictámenes que ninguna parte recurra pasan en autoridad de cosa juzgada administrativa en los términos del art. 15 de la LCT. Firmar en la audiencia cierra el reclamo por esa contingencia.",
    norma: "Ley 27.348, art. 2°",
  },
  {
    id: "accion-civil",
    titulo: "La acción civil también espera: no se puede saltear la instancia",
    texto:
      "Las acciones fundadas en otros sistemas de responsabilidad —la civil— sólo pueden iniciarse una vez agotada la vía administrativa o vencido el plazo legal para dictar la resolución. La valla no es sólo para el reclamo sistémico.",
    norma: "Ley 27.348, art. 15 (sustituye el 4º párr. del art. 4° de la Ley 26.773)",
  },
  {
    id: "efecto-recursos",
    titulo: "Los recursos suspenden el pago, salvo en dos casos",
    texto:
      "Los recursos proceden en relación y con efecto SUSPENSIVO. Hay dos excepciones donde el efecto es devolutivo —o sea, se cumple igual mientras se discute—: cuando la ART apela ante la Comisión Médica Central en el supuesto del art. 6° ap. 2 pto. c) de la Ley 24.557, y cuando apela por reagravamiento del accidente o la enfermedad.",
    norma: "Ley 27.348, art. 2°",
  },
  {
    id: "peritos",
    titulo: "Los peritos médicos del juicio no cobran un porcentaje del pleito",
    texto:
      "Los peritos que intervienen en las controversias judiciales deben integrar el cuerpo médico forense de la jurisdicción, y sus honorarios «no serán variables ni estarán vinculados a la cuantía del respectivo juicio»: se regulan sólo por la labor realizada en el pleito.",
    norma: "Ley 27.348, art. 2°",
  },
  {
    id: "extincion-afiliacion",
    titulo: "Si el empleador dejó de pagar la ART, la cobertura no cae el mismo día",
    texto:
      "La aseguradora puede extinguir el contrato por dos cuotas impagas, consecutivas o alternadas. Pero aun extinguido, debe otorgar prestaciones EN ESPECIE por las contingencias ocurridas dentro de los tres meses posteriores —después repite el costo del empleador—. Desde la extinción, el empleador queda como no asegurado.",
    norma: "Art. 27 ap. 6 de la Ley 24.557 (incorporado por el art. 12 de la 27.348)",
  },
  {
    id: "ingreso-base",
    titulo: "El ingreso base devenga intereses desde el primer día",
    texto:
      "Desde la primera manifestación invalidante y hasta la liquidación, el ingreso base devenga la tasa activa cartera general nominal anual vencida a 30 días del Banco Nación. En mora, se capitalizan los intereses conforme el art. 770 del Código Civil y Comercial.",
    norma: "Art. 12 de la Ley 24.557 (sustituido por el art. 11 de la 27.348)",
  },
];

export const CM_FUENTES = {
  consultadoEl: CM_VIGENCIA.consultadoEl,
  principal: {
    nombre: "Ley 27.348 — texto actualizado (InfoLEG)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/272119/texact.htm",
  },
  lista: [
    {
      nombre: "Ley 27.348 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/272119/texact.htm",
      detalle:
        "Complementaria de la Ley sobre Riesgos del Trabajo. Título I (comisiones médicas), arts. 1° a 4° bis; Título III, arts. 10 a 21; y el Anexo I con el procedimiento del Servicio de Homologación.",
    },
    {
      nombre: "Ley 24.557 — Riesgos del Trabajo (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=27971",
      detalle:
        "Art. 7° (incapacidad temporaria), art. 12 (ingreso base), art. 27 ap. 6 (extinción de la afiliación), art. 28 ap. 1 (empleador no asegurado) y art. 46 (competencia judicial).",
    },
    {
      nombre: "Ley 26.773 — ordenamiento de la reparación (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=203798",
      detalle:
        "Art. 4° (opción excluyente, con su 4º párrafo sustituido por el art. 15 de la 27.348) y art. 17 bis (actualización por RIPTE de pisos y compensaciones).",
    },
  ],
} as const;
