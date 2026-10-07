// DESDE CUÁNDO TE CUBRE LA OBRA SOCIAL DEL MONOTRIBUTO — el acceso progresivo del Decreto 1/2010.
//
// POR QUÉ ESTE ARCHIVO EXISTE (6/9/2026, s108). «El monotributo incluye obra social» es verdad y
// es la mitad de la respuesta. La ley no da la cobertura completa desde el día uno: el art. 42
// inc. c) del Anexo de la Ley 24.977 delega en el Poder Ejecutivo «un número determinado de meses
// de los aportes… que deberán haberse ingresado durante un período anterior a la fecha en que
// corresponda otorgar la cobertura», y el reglamento la parte en TRES escalones. Es el patrón que
// ya pagó tres veces en este sitio: la ley da el derecho, el reglamento dice cómo se ejerce, y la
// segunda mitad casi nunca está publicada.
//
// LOS TRES ESCALONES (Anexo del Decreto 1/2010, «ACCESO PROGRESIVO A LA COBERTURA DE SALUD»):
//   · desde el día uno → nivel ambulatorio del PMOE, con topes propios (30 visitas de salud
//     mental por año y máximo 4 por mes, 25 sesiones de kinesiología, medicamentos al 40%);
//   · a los 3 meses → recién ahí entra la INTERNACIÓN, al 100% y sin límite de tiempo, con los
//     oncológicos, la diálisis, los cuidados paliativos y las prótesis internas;
//   · a los 6 meses → las prestaciones de alto costo: el SURGE (Res. SSS 731/2023) y el mecanismo
//     de Integración del Decreto 904/2016, que es el de DISCAPACIDAD.
//
// O sea: quien se da de alta hoy y mañana necesita una internación no la tiene cubierta por
// derecho, y quien la necesita por discapacidad espera medio año. Eso no está en ninguna nota.
//
// LO QUE CAMBIÓ EN OCTUBRE DE 2024 Y NADIE ACTUALIZÓ. El Decreto 955/2024 (B.O. 28/10/2024)
// incorporó el art. 69 bis: creó en la Superintendencia de Servicios de Salud un REGISTRO de
// agentes que aceptan monotributistas, y esas entidades quedaron «facultadas para distinguir las
// categorías cuyo ingreso permitan». Es la explicación legal de algo que se cuenta como abuso: una
// obra social puede rechazar a un monotributista de categoría A y aceptar a uno de categoría F, y
// está habilitada para hacerlo. El mismo decreto reescribió el art. 74.
//
// LAS DOS ASIMETRÍAS DEL RELOJ, que son lo que decide un caso real:
//   · CAMBIAR de obra social NO reinicia la carencia: el art. 74 inc. c) prohíbe expresamente al
//     agente receptor aplicar los arts. 70 y 71 (rige el régimen de compensaciones del art. 12 del
//     Decreto 504/98). Pero antes hay que quedarse 12 meses en la que se eligió.
//   · REINGRESAR al monotributo SÍ lo reinicia: el art. 73 manda aplicar el art. 70 «en cualquier
//     caso de reincorporación al Régimen Simplificado». Darse de baja y volver cuesta los seis
//     meses de nuevo.
//
// Y el reparto es OTRO que el del empleado en relación de dependencia. El art. 39 inc. b) manda
// el DIEZ por ciento del aporte al Fondo Solidario de Redistribución: al monotributista le llega
// el 90%, no el 85% que rige desde el Decreto 600/2024 para el trabajador dependiente.
//
// FUENTES leídas el 6/9/2026, todas en InfoLEG (texto ACTUALIZADO, no la versión original):
//   · Ley 24.977, Anexo t.o. Ley 26.565 (id 51609) — arts. 39, 40, 42, 43 y 45.
//   · Decreto 1/2010 (id 162518) — arts. 69 a 78 y el Anexo de acceso progresivo, con las
//     sustituciones del Decreto 955/2024.

export const VIGENCIA_MONO_OS = {
  consultadoEl: "6 de septiembre de 2026",
  /** El decreto que reescribió el registro, el art. 74 y el escalón de los 6 meses. */
  reformaReciente: "Decreto 955/2024 (B.O. 28/10/2024)",
} as const;

/** Meses de permanencia mínima antes de poder cambiar de obra social (art. 74 inc. c). */
export const MESES_PARA_CAMBIAR = 12;

/** Del aporte de obra social, esta fracción va al Fondo Solidario de Redistribución. */
export const REPARTO_MONOTRIBUTO = { entidad: 0.9, fondo: 0.1 } as const;

export type Escalon = {
  id: "inicio" | "tres-meses" | "seis-meses";
  /** Meses desde la adhesión en los que se abre este escalón. */
  meses: number;
  titulo: string;
  /** Lo que se gana al abrirse, en la letra del Anexo. */
  prestaciones: string[];
  /** La frase que más importa de este escalón, para el veredicto. */
  resumen: string;
  norma: string;
};

export const ESCALONES: Escalon[] = [
  {
    id: "inicio",
    meses: 0,
    titulo: "Nivel ambulatorio",
    resumen: "consultas, especialidades, estudios ambulatorios y odontología del PMOE",
    norma: "Decreto 1/2010, Anexo, inc. a)",
    prestaciones: [
      "Consulta en consultorio y de urgencia y emergencia en domicilio (programada en domicilio para mayores de 65 que no puedan movilizarse).",
      "Atención ambulatoria de todas las especialidades reconocidas por la autoridad sanitaria.",
      "Prácticas y estudios complementarios ambulatorios del Anexo II del PMOE, con el material de diagnóstico y los medios de contraste incluidos.",
      "Salud mental: hasta 30 visitas por año calendario, sin exceder 4 consultas por mes.",
      "Kinesiología hasta 25 sesiones por año y fonoaudiología hasta 25 por año; estimulación temprana.",
      "Odontología conforme al PMOE y traslados de pacientes ambulatorios.",
      "Medicamentos ambulatorios del Anexo III del PMOE con el 40% de cobertura, por nombre genérico.",
      "Anteojos con lentes estándar al 100% en niños hasta los 15 años.",
      "Plan materno infantil (ambulatorio), prevención de cánceres femeninos, cobertura de pacientes diabéticos y piridostigmina al 100%.",
    ],
  },
  {
    id: "tres-meses",
    meses: 3,
    titulo: "Nivel internación",
    resumen:
      "internación al 100% y sin límite de tiempo, con oncológicos, diálisis y prótesis internas",
    norma: "Decreto 1/2010, Anexo, inc. b)",
    prestaciones: [
      "Internación al 100% en cualquiera de sus modalidades, sin límite de tiempo.",
      "Medicamentos al 100% durante la internación y traslados de pacientes internados.",
      "Prótesis e implantes de colocación interna al 100%.",
      "Medicamentos oncológicos según protocolos nacionales al 100% (los no oncológicos, al 40%).",
      "Cuidados paliativos al 100%.",
      "Hemodiálisis y diálisis peritoneal continua ambulatoria al 100%; eritropoyetina al 100% en insuficiencia renal crónica.",
      "Salud mental en internación: hasta 30 días por año calendario en patologías agudas.",
      "Plan materno infantil (prestaciones en internación) y otoamplífonos al 100% en niños hasta 15 años.",
      "Prótesis y órtesis de colocación externa al 50% (no se reconocen las miogénicas ni bioeléctricas).",
    ],
  },
  {
    id: "seis-meses",
    meses: 6,
    titulo: "Alto costo, Integración y discapacidad",
    resumen: "las prestaciones del SURGE y del mecanismo de Integración (discapacidad)",
    norma: "Decreto 1/2010, Anexo, inc. c), sustituido por el Decreto 955/2024",
    prestaciones: [
      "Prestaciones subsidiadas por el Sistema Único de Reintegro por Gestión de Enfermedades (SURGE), Res. SSS 731/2023. Son de cobertura obligatoria para el agente del seguro de salud.",
      "Prestaciones del mecanismo de «Integración» del Decreto 904/2016, que es el de discapacidad.",
      "Prestaciones gestionables mediante el Fondo Solidario de Redistribución.",
    ],
  },
];

/** Las reglas que no son un plazo pero deciden un caso real. */
export const REGLAS = [
  {
    id: "al-dia",
    titulo: "Tenés que estar al día, y te pueden pedir los comprobantes",
    norma: "Ley 24.977, Anexo, art. 42 in fine · Decreto 1/2010, art. 76",
    texto:
      "La ley condiciona el acceso a las prestaciones a que el contribuyente esté al día con los aportes del régimen simplificado, y el reglamento faculta expresamente a los agentes del seguro de salud a requerir los comprobantes de pago (los propios y los del grupo familiar) como condición para prestar el servicio.",
  },
  {
    id: "registro",
    titulo: "La obra social puede elegir qué categorías acepta",
    norma: "Decreto 1/2010, art. 69 bis, incorporado por el Decreto 955/2024",
    texto:
      "Desde octubre de 2024 existe en la Superintendencia de Servicios de Salud un registro de agentes que aceptan monotributistas, y las entidades inscriptas quedan «facultadas para distinguir las categorías cuyo ingreso permitan». Que una obra social rechace una categoría baja no es un abuso: es una facultad que le dio el decreto.",
  },
  {
    id: "cambio",
    titulo: "Cambiar de obra social no reinicia el reloj, pero hay que esperar 12 meses",
    norma: "Decreto 1/2010, art. 74 inc. c), sustituido por el Decreto 955/2024",
    texto:
      "La opción de cambio se puede ejercer recién después de 12 meses de permanencia en el agente elegido. A cambio, el agente receptor tiene prohibido aplicar el acceso progresivo de los arts. 70 y 71: la carencia ya cumplida no se vuelve a cumplir. Rige el régimen de compensaciones del art. 12 del Decreto 504/98.",
  },
  {
    id: "reingreso",
    titulo: "Volver al monotributo sí lo reinicia",
    norma: "Decreto 1/2010, art. 73",
    texto:
      "En cualquier caso de reincorporación al régimen simplificado vuelve a aplicarse el acceso progresivo del art. 70. Darse de baja y volver a inscribirse cuesta de nuevo los tres meses de internación y los seis de alto costo.",
  },
  {
    id: "viejos",
    titulo: "Los que ya estaban antes de la Ley 26.565 no tienen carencia",
    norma: "Decreto 1/2010, art. 72",
    texto:
      "El acceso progresivo no se aplica a quienes adhirieron al régimen simplificado antes de la vigencia de las modificaciones de la Ley 26.565. Sí se aplica a la incorporación de su grupo familiar posterior a esa fecha.",
  },
  {
    id: "familia",
    titulo: "El grupo familiar cumple su propia carencia",
    norma: "Ley 24.977, Anexo, art. 39 inc. c) · Decreto 1/2010, art. 71 y Anexo, II",
    texto:
      "Sumar a la familia es optativo y se paga un aporte adicional por cada integrante del grupo familiar primario, del que también un 10% va al Fondo Solidario de Redistribución. El reloj de cada uno arranca en su propia fecha de inscripción, no en la del titular: el Anexo dice que ingresan progresivamente «a partir de su inscripción».",
  },
  {
    id: "coseguro",
    titulo: "La obra social puede venderte la cobertura completa durante la carencia",
    norma: "Ley 24.977, Anexo, art. 42 inc. c)",
    texto:
      "La propia ley habilita al agente del seguro de salud a ofrecer la cobertura plena durante el período de carencia «mediante el cobro del pertinente coseguro». Que te cobren un extra por adelantar la internación no es una irregularidad: está previsto en la norma.",
  },
  {
    id: "exentos",
    titulo: "Hay monotributistas que no pagan obra social",
    norma: "Ley 24.977, Anexo, art. 40",
    texto:
      "Quedan eximidos de todas las cotizaciones del art. 39 (incluida la de obra social) los menores de 18 años, los profesionales con aportes obligatorios a una caja provincial, los trabajadores autónomos del primer párrafo del art. 13 de la Ley 24.476 y quienes además trabajan en relación de dependencia y aportan por esa vía.",
  },
];

export const MONO_OS_TEXTOS = {
  art42:
    "El Poder Ejecutivo nacional dispondrá un número determinado de meses de los aportes indicados en el inciso b y, en su caso, el c) del artículo 39, que deberán haberse ingresado durante un período anterior a la fecha en que corresponda otorgar la cobertura, como requisito para el goce de las prestaciones previstas en este inciso. La obra social respectiva podrá ofrecer al afiliado la plena cobertura, durante el período de carencia que fije la reglamentación, mediante el cobro del pertinente coseguro;",
  art42Cierre:
    "Para acceder a las prestaciones establecidas en el inciso c), el contribuyente deberá estar al día con los aportes al presente régimen simplificado (RS).",
  art69bis:
    "En dicho Registro se inscribirán las entidades del Sistema Nacional del Seguro de Salud que acepten recibir, como parte integrante de su población beneficiaria, a los Pequeños Contribuyentes adheridos al mencionado régimen, quedando facultadas para distinguir las categorías cuyo ingreso permitan.",
  art76:
    "Los Agentes del Seguro de Salud quedan facultados para requerir, a los pequeños contribuyentes, los comprobantes de pago de su aporte y el de los integrantes del grupo familiar, si correspondiere, como condición para la prestación del servicio médico-asistencial.",
} as const;

export const MONO_OS_FUENTES = {
  consultadoEl: VIGENCIA_MONO_OS.consultadoEl,
  principal: {
    nombre: "Decreto 1/2010, texto actualizado en InfoLEG",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/160000-164999/162518/texact.htm",
  },
  lista: [
    {
      nombre: "Decreto 1/2010: reglamentación del Anexo de la Ley 24.977",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/160000-164999/162518/texact.htm",
      detalle:
        "Arts. 69 a 78 y el Anexo «Acceso progresivo a la cobertura de salud» (los tres escalones), con el art. 69 bis incorporado y los arts. 74 y el inc. c) del Anexo sustituidos por el Decreto 955/2024.",
    },
    {
      nombre: "Ley 24.977, Anexo t.o. Ley 26.565, texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/50000-54999/51609/texact.htm",
      detalle:
        "Art. 39 (el aporte de obra social por categoría, con el 10% al Fondo Solidario de Redistribución, según el art. 92 de la Ley 27.743), art. 40 (exenciones), art. 42 inc. c) (la delegación de la carencia y el coseguro) y art. 45 (supletoriedad de las leyes 23.660 y 23.661).",
    },
  ],
} as const;
