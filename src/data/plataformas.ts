// PLATAFORMAS DE REPARTO Y MOVILIDAD - el regimen del Titulo XII de la Ley 27.802
// (arts. 119 a 128), vigente desde el 6 de marzo de 2026, y la cuenta que ese regimen
// vuelve obligatoria: cuanto le queda por mes a un repartidor o conductor de app.
//
// POR QUE ESTE ARCHIVO EXISTE (21/8/2026, s90). El Titulo XII no modifica una ley previa:
// CREA un regimen entero que antes no existia, y la LCT dejo de aplicarse a estas personas
// por via expresa (art. 2 inc. f), incorporado por el art. 1 de la misma ley). La web ya
// explico la parte juridica -que es un "prestador independiente", que no hay relacion de
// dependencia, que la plataforma debe dar un seguro- pero NADIE publica el numero: cuanto
// se lleva por mes quien vive de esto, cuanto le cuesta estar en regla, y cuanto le falta
// respecto de un empleado con el mismo bolsillo. El hueco no es la ley: es la aritmetica.
//
// EL PUNTO QUE CAMBIA LA CUENTA. El art. 125 inc. 2 no dice "podes" inscribirte: pone la
// inscripcion fiscal y el pago de los aportes como OBLIGACION del prestador para poder usar
// la plataforma, y nombra que compra con esos aportes (PBU, retiro por invalidez, pension
// por fallecimiento del art. 17 de la Ley 24.241 y las prestaciones del Sistema Nacional del
// Seguro de Salud). O sea: el costo del monotributo no es opcional en este regimen, es parte
// del trato. Por eso la pagina lo descuenta del ingreso en vez de mencionarlo al pasar.
//
// VIGENCIA, VERIFICADA EN EL TEXTO Y NO EN UNA NOTA: el art. 217 de la Ley 27.802 dice que
// "salvo disposicion en contrario los articulos de la presente ley entraran en vigencia a
// partir de su publicacion en el Boletin Oficial" (6/3/2026). La UNICA prorroga que trae la
// norma es la del Titulo II (Fondo de Asistencia Laboral), llevado al 1/11/2026 por el art. 27
// del Decreto 408/2026. El Titulo XII no esta prorrogado: rige desde el 6/3/2026. Lo que si
// falta es la reglamentacion del art. 127 (autoridad de aplicacion), que no suspende el regimen.
//
// FUENTES leidas el 21/8/2026, todas en InfoLEG (texto oficial, ninguna nota de prensa):
//   - Ley 27.802 - texto original (id 423680, norma.htm): Titulo XII completo, art. 1
//     (art. 2 inc. f) de la LCT) y art. 217 (vigencia).
//   - Ley 24.241 art. 17 - las prestaciones que compran los aportes del art. 125 inc. 2.
//   - Escalas de monotributo de ARCA ya cargadas y verificadas en @/data/monotributo.
//   - LCT arts. 121/122 (SAC) y 150/155 (vacaciones), ya cargados y verificados en
//     @/data/aguinaldo y @/data/vacaciones: son el ancla del contraste con un empleado.

/** B.O. de la Ley 27.802. Desde aca rige el Titulo XII (art. 217). */
export const VIGENCIA_REGIMEN = "6 de marzo de 2026";
export const VIGENCIA_REGIMEN_ISO = "2026-03-06";

/** El regimen ocupa los arts. 119 a 128 de la Ley 27.802. */
export const ARTICULOS_REGIMEN = { desde: 119, hasta: 128 } as const;

/**
 * Textos oficiales del Titulo XII, verbatim y enteros a proposito: son el ancla contra la
 * que `check_plataformas.ts` verifica que la pagina no derive hacia un resumen, y son lo
 * que casi ninguna publicacion reproduce (todas parafrasean).
 */
export const PLATAFORMAS_TEXTOS = {
  art119:
    "Objeto. El presente régimen tiene por objeto establecer reglas adecuadas para promover el desarrollo de la economía de plataformas tecnológicas en el país, asegurando la independencia de quienes ofrecen o prestan a través de dichas plataformas, los servicios de movilidad de personas y/o reparto de bienes, productos u objetos.",
  art120:
    "Definiciones. A los fines del presente régimen se entiende por: 1. Servicio de Reparto a través de plataformas tecnológicas: comprende el retiro, traslado o entrega de bienes, productos u objetos, sin tratamiento o procesamiento, utilizando cualquier medio de transporte, incluyendo la prestación del servicio a pie, contratados a través de una plataforma tecnológica. 2. Servicio de movilidad de personas a través de plataformas tecnológicas: comprende el traslado de personas, concertado a través de una plataforma que conecta a usuarios y prestadores independientes por un precio de traslado convenido. 3. Prestador independiente de plataformas tecnológicas: persona humana que conviene la prestación del servicio privado de reparto y/o de movilidad de personas a usuarios a través de las plataformas tecnológicas de forma independiente. 4. Contrato de prestación del servicio de reparto a través de plataformas tecnológicas: contrato que se perfecciona con la aceptación a través de la plataforma entre un usuario consumidor que solicita un traslado y/o compra un bien a un particular y/o a un comercio adherido y/o solicita un servicio de reparto y un prestador independiente de plataformas que presta dicho servicio por el que recibe una retribución dineraria a través de la plataforma en la cual se registra este último. 5. Plataforma Tecnológica: aquella persona jurídica que, a título oneroso, administra o gestiona un código ejecutable en aplicaciones tecnológicas de dispositivos móviles o fijos que permite al prestador independiente de plataformas ofrecer y ser contratado por un usuario para ejecutar sus servicios de movilidad de personas y/o reparto de bienes, productos u objetos en un territorio geográfico específico y de forma independiente.",
  art121:
    "Libertad de conexión del prestador independiente a la plataforma tecnológica del servicio de movilidad de personas y reparto. El prestador independiente será libre de conectarse a cualquiera de las plataformas, a través de sus respectivas aplicaciones, ofreciendo sus servicios de reparto y/o movilidad de personas durante los horarios y en el tiempo que estime convenientes, pudiendo el prestador libremente aceptar y/o rechazar solicitudes según su conveniencia y oportunidad. También será libre de definir el medio de transporte en que preste el servicio, siempre que cumpla con los requisitos legales y convencionales para ellos. Los prestadores independientes tendrán derecho a conocer los criterios utilizados por las plataformas para la agrupación de los mismos. Los criterios deberán ser expresados en lenguaje claro y deben estar disponibles de manera digital para su consulta en la máxima medida en que el derecho al secreto comercial de la plataforma lo permita.",
  art122:
    "Ámbito de Aplicación. El presente régimen rige en todo el territorio de la República Argentina respecto de las relaciones que se establezcan entre prestadores independientes que prestan sus servicios a través de plataformas, en tanto éstas tengan como objeto principal intermediar en el servicio de reparto y/o movilidad de personas.",
  art123:
    "Principio de libertad de formas. Las partes podrán acordar libremente los términos del contrato.",
  art124:
    "Obligaciones de las plataformas tecnológicas. Son obligaciones específicas de las plataformas tecnológicas: 1. Brindar a los prestadores independientes la información necesaria a efectos que pueda decidir aceptar o rechazar la prestación del servicio de movilidad de personas y/o reparto requerida por un usuario. 2. Respetar la libertad de conexión del prestador independiente. 3. Ofrecer, a través de medios digitales, información vinculada a la normativa en seguridad vial y a la prestación del servicio, destinadas a los prestadores independientes. 4. Facilitar el acceso a los elementos de seguridad vial aplicables según el tipo de vehículo. 5. Contar con un mecanismo digital de reporte de quejas de manera simple, accesible y constantemente disponible para los usuarios, debiendo establecer un procedimiento eficaz para solucionar o dar respuesta a los reclamos. 6. Arbitrar los medios para que los prestadores independientes tengan instancias de atención a través de operadores y/o recepcionistas, con un rol estrictamente de soporte auxiliar, en la cual puedan obtener justificaciones respecto a las decisiones que afecten su operatoria con las plataformas.",
  art125:
    "Obligaciones de los prestadores independientes. A los efectos de poder utilizar las plataformas, los prestadores independientes deben cumplir las siguientes obligaciones: 1. Ser titular de la cuenta de usuario necesaria para prestar sus servicios a través de las diferentes plataformas de intermediación digital que utilice. 2. Estar inscripto debidamente ante las autoridades fiscales correspondientes y cumplir con todas sus obligaciones tributarias y de seguridad social, notificando cualquier alteración en su situación fiscal. Asimismo, deberán hacer los pagos de los aportes respectivos a través de los cuales tendrán acceso a la Prestación Básica Universal (PBU), el retiro por invalidez o la pensión por fallecimiento, previstas en el artículo 17 de la ley 24.241 y sus modificaciones y a las prestaciones del Sistema Nacional del Seguro de Salud, entre otras, según corresponda en cada caso. 3. Tener cuenta bancaria o billetera electrónica cuya Clave Bancaria Uniforme (CBU) o Clave Virtual Uniforme (CVU) sea debidamente informada a la plataforma tecnológica, a fin de recibir las transferencias que correspondan por sus servicios. 4. Respetar las normas de tránsito al momento de la prestación del servicio. 5. Cumplir su prestación debidamente y realizar los viajes que libremente decida en beneficio de tantos usuarios como decida.",
  art126:
    "Derechos de los prestadores independientes. Los prestadores independientes de plataformas tecnológicas del servicio de movilidad de personas y/o reparto, tendrán derecho, sin que éstos impliquen un indicio de relación laboral, subordinación o dependencia, a: 1. Rechazar cualquiera de los pedidos y/o solicitudes que reciba por la aplicación, sin obligación de brindar justificativo alguno. 2. Recibir una explicación de los motivos por los cuales la plataforma suspenda o imposibilite, parcial o totalmente, el acceso a la infraestructura digital. A su vez, tendrán derecho a interactuar con operadores y/o recepcionistas y podrán ejercer su derecho a réplica. 3. Solicitar la portabilidad de sus datos en un formato estructurado, genérico y de uso común. 4. Acceder a una capacitación en la cual se detalle el uso de la infraestructura digital, la interacción con los diferentes usuarios y a todo aquel conocimiento relevante para la prestación de sus servicios independientes. La misma será de acceso libre para los prestadores independientes, debiendo las plataformas asumir los costos asociados. 5. Acceder a una capacitación en aspectos de seguridad vial, con el objetivo de conocer las normativas de tránsito, las mejores prácticas de convivencia vial, y el correcto uso de los elementos de seguridad vial necesarios para su prestación de servicios. La misma será de acceso libre para los prestadores independientes, debiendo las plataformas asumir los costos asociados. 6. Acceder a un seguro de accidentes personales proporcionado por las plataformas, el cual, en su cobertura mínima, deberá contemplar los riesgos asociados al fallecimiento accidental, la incapacidad total y/o parcial permanente derivada de la prestación del servicio, los gastos médicos y farmacéuticos, así como los costos funerarios. La responsabilidad de la provisión de este seguro y los gastos asociados al mismo serán objeto de libre acuerdo entre las partes involucradas, sin establecer una responsabilidad exclusiva para ninguna de ellas, ni un indicio de relación laboral o dependencia entre las plataformas y repartidores. La ampliación de las prestaciones o la implementación de seguros adicionales no implicarán incumplimiento de lo dispuesto en esta normativa, ni serán considerados como indicio de laboralidad. 7. Recibir una retribución dineraria por la prestación de sus servicios de parte del usuario consumidor, a través de la plataforma por la que ofrece o presta los servicios de movilidad de personas y/o reparto; asimismo también tiene derecho a percibir el cien por ciento (100%) del monto que los usuarios agreguen en concepto de gratificación, recompensa o propina. Dicho monto puede ser sugerido por la plataforma, a efectos ilustrativos y preservando la posibilidad de modificarlo por parte del usuario. 8. Conectarse sin tener la exigibilidad de una periodicidad o frecuencia mínima. 9. Registrarse en la aplicación sin que ello implique asumir la obligación de conectarse y/o aceptar pedidos. 10. Interrumpir la utilización de la aplicación, sin tener que dar previo aviso a la plataforma, sin perjuicio de la responsabilidad civil que pueda tener frente al usuario. 11. Prestar servicios durante el tiempo que el prestador independiente estime conveniente. 12. Conectarse a la aplicación y prestar los servicios dentro del ámbito de cobertura establecido por la plataforma tecnológica. 13. Decidir el mejor trayecto o recorrido, pudiendo valerse de la sugerencia de ruta que muestra la aplicación o utilizar otras aplicaciones de navegación de Sistemas de Posicionamiento Global (GPS), siempre que ello no perjudique al usuario.",
  art127:
    "Autoridad de Aplicación. El Poder Ejecutivo nacional, vía reglamentación, determinará la autoridad de aplicación del presente régimen.",
  art128:
    "Aplicación supletoria. Para los casos no previstos en este régimen y su reglamentación, en lo que respecta a la vinculación entre la plataforma digital y el prestador independiente de plataformas digitales, serán de aplicación supletoria las disposiciones del Código Civil y Comercial de la Nación.",
  art2IncFLct:
    "f. A los prestadores independientes de plataformas tecnológicas conforme la regulación específica;",
  art217Vigencia:
    "Salvo disposición en contrario los artículos de la presente ley entrarán en vigencia a partir de su publicación en el Boletín Oficial.",
};

/**
 * Lo que el régimen DA (art. 126) y lo que NO da, en una sola tabla. El "no" no es una
 * opinión: sale del art. 2° inc. f) de la LCT (que excluye a estas personas de la Ley de
 * Contrato de Trabajo) y del art. 128 (supletorio: Código Civil y Comercial, no la LCT).
 */
export type ItemRegimen = { concepto: string; tiene: boolean; fuente: string; detalle: string };

export const QUE_DA_Y_QUE_NO: ItemRegimen[] = [
  {
    concepto: "El 100% de las propinas",
    tiene: true,
    fuente: "art. 126 inc. 7",
    detalle:
      "Derecho a percibir «el cien por ciento (100%) del monto que los usuarios agreguen en concepto de gratificación, recompensa o propina». La plataforma puede sugerir el monto, pero el usuario puede modificarlo.",
  },
  {
    concepto: "Seguro de accidentes personales",
    tiene: true,
    fuente: "art. 126 inc. 6",
    detalle:
      "Lo provee la plataforma y su cobertura mínima debe contemplar fallecimiento accidental, incapacidad total y/o parcial permanente derivada de la prestación, gastos médicos y farmacéuticos y costos funerarios. NO es una ART: quién paga el seguro «será objeto de libre acuerdo entre las partes».",
  },
  {
    concepto: "Capacitación gratis (uso de la app y seguridad vial)",
    tiene: true,
    fuente: "art. 126 incs. 4 y 5",
    detalle:
      "De acceso libre para el prestador, «debiendo las plataformas asumir los costos asociados».",
  },
  {
    concepto: "Explicación si te bloquean la cuenta",
    tiene: true,
    fuente: "art. 126 inc. 2",
    detalle:
      "Derecho a recibir los motivos de una suspensión parcial o total del acceso a la infraestructura digital, a interactuar con un operador y a ejercer derecho a réplica.",
  },
  {
    concepto: "Portabilidad de tus datos",
    tiene: true,
    fuente: "art. 126 inc. 3",
    detalle: "En un formato «estructurado, genérico y de uso común».",
  },
  {
    concepto: "Rechazar pedidos y elegir tus horarios",
    tiene: true,
    fuente: "arts. 121 y 126 incs. 1, 8 a 13",
    detalle:
      "Sin justificar el rechazo, sin frecuencia mínima exigible y sin obligación de conectarte por estar registrado. Es el núcleo de la independencia: ejercerlos no puede leerse como indicio de relación laboral.",
  },
  {
    concepto: "Aguinaldo (SAC)",
    tiene: false,
    fuente: "art. 2° inc. f) LCT",
    detalle:
      "El SAC es el art. 121 de la Ley de Contrato de Trabajo, y la LCT no se aplica a los prestadores independientes de plataformas desde el 6 de marzo de 2026.",
  },
  {
    concepto: "Vacaciones pagas",
    tiene: false,
    fuente: "art. 2° inc. f) LCT",
    detalle:
      "Misma razón: la licencia anual ordinaria y su plus vienen de los arts. 150 y 155 de la LCT.",
  },
  {
    concepto: "Indemnización por despido",
    tiene: false,
    fuente: "arts. 2° inc. f) LCT y 128",
    detalle:
      "No hay despido porque no hay contrato de trabajo. Para lo no previsto, el art. 128 remite al Código Civil y Comercial, no a la LCT.",
  },
  {
    concepto: "ART (Ley 24.557)",
    tiene: false,
    fuente: "art. 126 inc. 6",
    detalle:
      "Lo que la ley manda es un seguro de accidentes personales, que es otra cosa: no tiene prestaciones dinerarias por incapacidad temporaria ni recalificación, y la propia norma aclara que darlo no implica «indicio de laboralidad».",
  },
  {
    concepto: "Obra social y jubilación pagadas por otro",
    tiene: false,
    fuente: "art. 125 inc. 2",
    detalle:
      "Las pagás vos: el artículo pone «hacer los pagos de los aportes respectivos» como obligación del prestador, y son los que dan acceso a la PBU, al retiro por invalidez, a la pensión por fallecimiento (art. 17 de la Ley 24.241) y al Seguro de Salud.",
  },
];

export type FuentePlataformas = { nombre: string; url: string; detalle: string };

export const PLATAFORMAS_FUENTES: {
  consultadoEl: string;
  lista: FuentePlataformas[];
} = {
  consultadoEl: "2026-08-21",
  lista: [
    {
      nombre: "Ley 27.802 — Ley de Modernización Laboral (B.O. 6/3/2026), texto oficial en InfoLEG",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Título XII «Régimen de los Servicios Privados de Movilidad de Personas y/o Reparto que utilizan plataformas tecnológicas», arts. 119 a 128. Su art. 1º sustituyó el art. 2° de la LCT e incorporó el inc. f) que excluye a estas personas de la Ley de Contrato de Trabajo. Su art. 217 fija la vigencia: publicación en el Boletín Oficial.",
    },
    {
      nombre: "Decreto 408/2026 (B.O. 1/6/2026), art. 27 — nota de vigencia en InfoLEG",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "La única prórroga de vigencia que trae la Ley 27.802: lleva al 1° de noviembre de 2026 el Título II (Fondo de Asistencia Laboral). No alcanza al Título XII, que rige desde el 6 de marzo de 2026.",
    },
    {
      nombre: "Monotributo — categorías y valores vigentes (ARCA)",
      url: "https://www.afip.gob.ar/monotributo/categorias.asp",
      detalle:
        "La escala con la que se calcula la cuota: impuesto integrado + aportes al SIPA + aportes a la obra social, por categoría de facturación anual. Es la misma tabla que usa la calculadora de monotributo del sitio.",
    },
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 2° con el inc. f) vigente; arts. 121 y 122 (sueldo anual complementario) y 150 y 155 (licencia anual y su forma de pago) — los tres conceptos que el prestador independiente no cobra y que la comparación pone en pesos.",
    },
  ],
};
