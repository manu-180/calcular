// Quién está obligado a aportar al sistema previsional, quién puede entrar voluntariamente y quién
// queda exceptuado — Ley 24.241, arts. 2º, 3º y 4º.
//
// POR QUÉ ESTE ARCHIVO EXISTE (8/9/2026, s110). Siguiente fila de la cola de delegaciones de s108
// («Ley 24.241 art. 3 — quiénes entran al SIPA»). Al abrirla apareció que la cola estaba mal
// rotulada y que el filón era mejor de lo anotado: el art. 3º es la afiliación VOLUNTARIA, la
// obligatoria es el art. 2º, y el contenido calculable —el que decide un caso real— está en el
// inciso d) del art. 2º, que casi nadie publica entero.
//
// LOS TRES HALLAZGOS QUE JUSTIFICAN LA PÁGINA:
//
//   1. HAY UN UMBRAL ARITMÉTICO Y ES 100 DIVIDIDO LA CANTIDAD DE SOCIOS. El art. 2º inc. d) ap. 1.1
//      dice que NO se incluyen obligatoriamente como dependientes «los socios de sociedades de
//      cualquier tipo cuya participación en el capital sea igual o superior al porcentual que
//      resulte de dividir el número cien (100) por el número total de socios». Con 4 socios el
//      umbral es 25 %; con 3, 33,33 %. Es un número que se calcula, y se publica como si fuera una
//      regla de dedo.
//
//   2. Y EL UMBRAL NO EXIME DE APORTAR: CAMBIA POR QUÉ PUERTA SE APORTA. El mismo inciso d) sigue:
//      «Sin perjuicio de su inclusión en el inciso b)». Quedar fuera del inciso a) significa no
//      entrar obligatoriamente como trabajador en relación de dependencia — pero si esa persona
//      dirige, administra o conduce la sociedad, el inciso b) ap. 1 la alcanza igual como autónomo,
//      «aunque por esas actividades no obtengan retribución, utilidad o ingreso alguno». El error
//      caro es leer el umbral como una exención.
//
//   3. EL DIRECTOR DE S.A. ESTÁ EN EL ARTÍCULO DE LOS VOLUNTARIOS, NO EN EL DE LOS OBLIGADOS. Por
//      las asignaciones que percibe en la misma sociedad por actividades especialmente remuneradas
//      que configuren relación de dependencia, la incorporación es VOLUNTARIA (art. 3º inc. a ap. 1)
//      — lo que no lo saca de su obligación como autónomo por la dirección (art. 2º inc. b ap. 1).
//      Son dos cosas distintas que se mezclan todo el tiempo.
//
// SIJP Y SIPA. El texto de la ley dice «SIJP» porque es el nombre con el que nació en 1993. La
// Ley 26.425 (B.O. 9/12/2008) unificó el sistema en el SIPA, de reparto. Los artículos de afiliación
// no fueron sustituidos: siguen rigiendo con el nombre viejo adentro. La página lo dice en vez de
// corregir la cita, porque una cita corregida deja de ser una cita.
//
// FUENTE: texto ACTUALIZADO de la Ley 24.241 en InfoLEG (id 639), leído el 8/9/2026. Nunca una nota.
//
// NO-GO ESCRITO (no re-auditar sin motivo): los MONTOS de las categorías de autónomos. Los fija
// ARCA por resolución y se mueven con la movilidad; esta página determina si hay obligación de
// aportar y por qué inciso, no cuánto se paga. Mezclar las dos cosas obligaría a rotar esta página
// cada trimestre para no mentir, y el contenido que la hace útil no vence.

export const VIGENCIA_AFILIACION = {
  norma: "Ley 24.241, arts. 2º, 3º y 4º",
  nombreOriginal: "SIJP",
  nombreActual: "SIPA",
  normaUnificacion: "Ley 26.425",
  boletinUnificacion: "B.O. 9 de diciembre de 2008",
  consultadoEl: "8 de septiembre de 2026",
} as const;

/** Edad desde la que la ley alcanza a una persona, tanto para la obligatoria como para la voluntaria. */
export const EDAD_MINIMA = 18;

/** Los dos límites del art. 4º: años de contrato y cuántas veces se puede usar la excepción. */
export const EXCEPCION_ANIOS = 2;
export const EXCEPCION_VECES = 1;

/** Grado de parentesco que, si alcanza a TODOS los socios, saca a la sociedad del inciso a). */
export const GRADO_PARENTESCO = 2;

/**
 * El umbral del art. 2º inc. d) ap. 1.1: cien dividido el número total de socios. Un socio con
 * participación IGUAL O SUPERIOR a ese porcentaje no se incluye obligatoriamente en el inciso a).
 * Se expone como función y no como tabla porque depende de un dato que carga el usuario.
 */
export function umbralParticipacion(totalSocios: number): number {
  if (!Number.isFinite(totalSocios) || totalSocios <= 0) return 100;
  return 100 / totalSocios;
}

export const AFILIACION_TEXTOS = {
  art2Encabezado:
    "Están obligatoriamente comprendidas en el SIJP y sujetas a las disposiciones que sobre afiliación establece esta ley y las normas reglamentarias que se dicten, las personas físicas mayores de dieciocho (18) años de edad que a continuación se detallan:",
  art2aPrivada:
    "Las personas que en cualquier lugar del territorio del país presten en forma permanente, transitoria o eventual, servicios remunerados en relación de dependencia en la actividad privada.",
  art2aExterior:
    "Las personas que en virtud de un contrato de trabajo celebrado o relación laboral iniciada en la República, o de un traslado o comisión dispuestos por el empleador, presten en el extranjero servicios de la naturaleza prevista en el apartado anterior, siempre que dichas personas tuvieran domicilio real en el país al tiempo de celebrarse el contrato, iniciarse la relación laboral o disponerse el traslado o comisión.",
  art2aProvincial:
    "Los funcionarios, empleados y agentes civiles dependientes de los gobiernos y municipalidades provinciales, a condición que previamente las autoridades respectivas adhieran al SIJP, mediante convenio con el Poder Ejecutivo Nacional.",
  art2bEncabezado:
    "Personas que por sí solas o conjunta o alternativamente con otras, asociadas o no, ejerzan habitualmente en la República alguna de las actividades que a continuación se enumeran, siempre que éstas no configuren una relación de dependencia:",
  art2bDireccion:
    "Dirección, administración o conducción de cualquier empresa, organización, establecimiento o explotación con fines de lucro, o sociedad comercial o civil, aunque por esas actividades no obtengan retribución, utilidad o ingreso alguno.",
  art2bProfesion:
    "Profesión desempeñada por graduado en universidad nacional o en universidad provincial o privada autorizada para funcionar por el Poder Ejecutivo, o por quien tenga especial habilitación legal para el ejercicio de profesión universitaria reglamentada.",
  art2bResidual:
    "Cualquier otra actividad lucrativa no comprendida en los apartados precedentes.",
  art2dUmbral:
    "Los socios de sociedades de cualquier tipo cuya participación en el capital sea igual o superior al porcentual que resulte de dividir el número cien (100) por el número total de socios.",
  art2dComanditado:
    "El socio comanditado único de las sociedades en comandita simple o por acciones. Si hubiera más de un socio comanditado se aplicará lo dispuesto en el punto anterior, tomando en consideración solamente el capital comanditado.",
  art2dIrregulares:
    "Los socios de las sociedades civiles y de las sociedades comerciales irregulares o de hecho, aunque no se cumpla el requisito a que se refiere el punto 1.1.",
  art2dParentesco:
    "Los socios de sociedades de cualquier tipo —aunque no estuvieran comprendidos en los puntos anteriores—, cuando la totalidad de los integrantes de la sociedad estén ligados por un vínculo de parentesco de hasta el segundo grado de consanguinidad y/o afinidad.",
  art2dSinPerjuicio:
    "Sin perjuicio de su inclusión en el inciso b), cuando un socio quede incluido obligatoriamente en el inciso a) la sociedad y el socio estarán sujetos a las obligaciones de aportes y contribuciones",
  art3Encabezado:
    "La incorporación al SIJP es voluntaria para las personas mayores de dieciocho (18) años de edad que a continuación se detallan:",
  art3Directores:
    "Los directores de sociedades anónimas por las asignaciones que perciban en la misma sociedad por actividades especialmente remuneradas que configuren una relación de dependencia.",
  art3Sindicos:
    "Los miembros de consejos de administración de cooperativas que no perciban retribución alguna por esas funciones, socios no gerentes de sociedades de responsabilidad limitada, síndicos de cualquier sociedad y fiduciarios.",
  art3Condominos:
    "Los titulares de condominios y de sucesiones indivisas que no ejerzan la dirección, administración o conducción de la explotación común.",
  art3Clero:
    "Los miembros del clero y de organizaciones religiosas pertenecientes al culto católico apostólico romano, u otros inscriptos en el Registro Nacional de Cultos.",
  art3CajaProvincial:
    "Las personas que ejerzan las actividades mencionadas en el artículo 2º, inciso b), apartado 2, y que por ellas se encontraren obligatoriamente afiliadas a uno o más regímenes jubilatorios provinciales para profesionales, como asimismo aquellas que ejerzan una profesión no académica autorizada con anterioridad a la promulgación de esta ley. Esta incorporación no modificará la obligatoriedad que dimana de los respectivos regímenes locales.",
  art3AmasDeCasa:
    "Las amas de casa que decidan incorporarse voluntariamente al Sistema Integrado de Jubilaciones y Pensiones lo harán en la categoría mínima de aportes, pudiendo optar por cualquier otra categoría superior.",
  art4Excepcion:
    "Quedan exceptuados del SIJP los profesionales, investigadores, científicos y técnicos contratados en el extranjero para prestar servicios en el país por un plazo no mayor de dos (2) años y por una sola vez, a condición que no tengan residencia permanente en la República y estén amparados contra las contingencias de vejez, invalidez y muerte por las leyes del país de su nacionalidad o residencia permanente.",
  art4Solicitud:
    "La solicitud de exención deberá ser formulada ante la autoridad de aplicación por el interesado o su empleador. La precedente exención no impedirá la afiliación a este sistema, si el contratado y el empleador manifestaren su voluntad expresa en tal sentido, o aquél efectuare su propio aporte y la contribución correspondiente al empleador.",
} as const;

export type Situacion = {
  id: string;
  etiqueta: string;
  /** Grupo para agrupar el selector, no entra en ninguna regla. */
  grupo: "dependencia" | "autonomo" | "societario" | "otros";
};

/** Las situaciones que el selector ofrece. Cada una tiene su regla en `lib/aportes-obligatorios.ts`. */
export const SITUACIONES: Situacion[] = [
  { id: "privada", etiqueta: "Trabajo en relación de dependencia en la actividad privada", grupo: "dependencia" },
  { id: "publica-nacional", etiqueta: "Soy empleado o funcionario del Estado nacional", grupo: "dependencia" },
  { id: "publica-provincial", etiqueta: "Soy empleado de un gobierno o municipio provincial", grupo: "dependencia" },
  { id: "exterior", etiqueta: "Me trasladaron al exterior con un contrato iniciado acá", grupo: "dependencia" },
  { id: "direccion", etiqueta: "Dirijo, administro o conduzco una empresa o sociedad", grupo: "autonomo" },
  { id: "profesion", etiqueta: "Ejerzo una profesión universitaria por mi cuenta", grupo: "autonomo" },
  { id: "otra-lucrativa", etiqueta: "Tengo otra actividad lucrativa por mi cuenta", grupo: "autonomo" },
  { id: "socio", etiqueta: "Soy socio de una sociedad", grupo: "societario" },
  { id: "director-sa", etiqueta: "Soy director de una S.A. y cobro por tareas técnico-administrativas", grupo: "societario" },
  { id: "sindico", etiqueta: "Soy síndico, fiduciario, socio no gerente de una S.R.L. o consejero de cooperativa sin retribución", grupo: "societario" },
  { id: "condominio", etiqueta: "Soy condómino o parte de una sucesión indivisa, y no administro", grupo: "societario" },
  { id: "caja-provincial", etiqueta: "Soy profesional y aporto a una caja provincial", grupo: "otros" },
  { id: "clero", etiqueta: "Soy miembro del clero o de una organización religiosa registrada", grupo: "otros" },
  { id: "ama-de-casa", etiqueta: "Soy ama de casa", grupo: "otros" },
  { id: "contratado-exterior", etiqueta: "Me contrataron en el exterior para trabajar acá por un tiempo", grupo: "otros" },
];

export const AFILIACION_FUENTES = [
  {
    nombre: "Ley 24.241, arts. 2º, 3º y 4º, texto actualizado",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=639",
    detalle:
      "Afiliación obligatoria (art. 2º, con el inciso d) que fija el umbral de participación societaria), voluntaria (art. 3º, incorporado el inciso de las amas de casa por la Ley 24.347) y las excepciones del art. 4º.",
  },
  {
    nombre: "Ley 26.425: unificación en el SIPA",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=148141",
    detalle:
      "La ley que en diciembre de 2008 unificó el sistema en el SIPA, de reparto. No sustituyó los artículos de afiliación: por eso el texto vigente sigue diciendo «SIJP».",
  },
  {
    nombre: "Ley 24.347 (B.O. 28/6/1994)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=729",
    detalle:
      "Su art. 1º sustituyó el inciso b) del art. 3º y es la que sumó a las amas de casa a la afiliación voluntaria, en la categoría mínima de aportes.",
  },
] as const;
