// Quién responde cuando el empleador no tiene la ART en regla — Ley 24.557, arts. 27 ap. 6, 28 y 29.
//
// POR QUÉ ESTE ARCHIVO EXISTE (8/9/2026, s110). Tercera fila de la cola de delegaciones abierta en
// s108: los arts. 5 y 12 de la Ley 27.348. El art. 12 de esa ley incorporó el **apartado 6 al
// art. 27 de la Ley 24.557**, y al abrirlo apareció que la pregunta que decide un caso real no es
// «¿se puede extinguir el contrato?» sino **«y entonces quién me paga a mí»** — que la ley contesta
// en cuatro apartados distintos del art. 28, con resultados muy distintos entre sí. Ninguno estaba
// publicado en el sitio: el art. 28 ap. 1 se citaba en `/comision-medica`, pero sólo como la
// excepción que exime de la instancia previa.
//
// LOS TRES HALLAZGOS QUE JUSTIFICAN LA PÁGINA:
//
//   1. TRABAJAR EN NEGRO NO ES LO MISMO QUE TRABAJAR SIN ART, Y LA DIFERENCIA ES QUIÉN PAGA. Si el
//      empleador tiene ART pero no declaró al trabajador, manda el art. 28 ap. 2: **«la ART otorgará
//      las prestaciones, y podrá repetir del empleador el costo de éstas»**. La aseguradora atiende
//      igual y después le cobra a la empresa. Si el empleador nunca se afilió, manda el ap. 1 y no
//      hay aseguradora: **responde él directamente**. La misma persona, con o sin recibo, tiene dos
//      caminos completamente distintos según lo que hizo la empresa, no según lo que hizo ella.
//
//   2. LA FALTA DE PAGO NO CORTA LA COBERTURA POR SÍ SOLA. El ap. 4 del art. 28 es terminante: si el
//      empleador omitió —total o parcialmente— el pago de las cuotas, **«la ART otorgará las
//      prestaciones»** y ejecutará las cotizaciones adeudadas. Lo que corta es la **extinción** del
//      contrato, que la ART puede declarar recién con dos cuotas impagas (art. 27 ap. 6) y
//      «ajustándose a los requisitos, modalidades y plazos que determine la reglamentación».
//
//   3. Y AUN EXTINGUIDO EL CONTRATO HAY TRES MESES DE COBERTURA MÉDICA. El mismo apartado 6:
//      «**la aseguradora deberá otorgar prestaciones en especie** […] **por las contingencias
//      ocurridas dentro de los tres (3) meses posteriores a la extinción por falta de pago**». Es
//      una red que casi nadie publica — y es parcial, y por eso se dice cuál es su límite: son las
//      del Capítulo V (asistencia médica y farmacéutica, prótesis y ortopedia, rehabilitación,
//      recalificación profesional y servicio funerario), **no** las dinerarias.
//
// EL PISO QUE QUEDA SIEMPRE. Si el empleador que debe responder no puede, el art. 29 manda al Fondo
// de Garantía de la SRT — pero la insuficiencia patrimonial hay que declararla judicialmente, por el
// procedimiento sumarísimo de las acciones meramente declarativas. No es automático y se dice así.
//
// FUENTE: texto ACTUALIZADO de la Ley 24.557 en InfoLEG (id 27971), leído el 8/9/2026, y el art. 12
// de la Ley 27.348 (id 272119) que incorporó el apartado 6. Nunca una nota.
//
// NO-GO ESCRITO (no re-auditar sin motivo): la **reglamentación de la extinción** que el ap. 6
// delega («los requisitos, modalidades y plazos que determine la reglamentación»). El art. 18 del
// Decreto 334/96 regula la falta de pago de dos cuotas con su propio procedimiento, pero es anterior
// a la Ley 27.348 y no se pudo verificar qué resolución de la SRT lo adecuó — InfoLEG no devuelve por
// número las resoluciones viejas de ese organismo (mina de s109). Se publica la ley, que es lo
// verificado, y se dice que el procedimiento lo fija una reglamentación que no citamos.

export const VIGENCIA_SIN_ART = {
  norma: "Ley 24.557, arts. 27 ap. 6, 28 y 29",
  incorporadoPor: "art. 12 de la Ley 27.348",
  boletin: "B.O. 24 de febrero de 2017",
  /** El propio artículo declara su ámbito temporal: importa la fecha del accidente, no la del reclamo. */
  aplicacion:
    "de aplicación a las contingencias cuya primer manifestación invalidante resulte posterior a la entrada en vigencia de la ley",
  consultadoEl: "8 de septiembre de 2026",
} as const;

// Las dos constantes del art. 27 ap. 6 —cuotas para extinguir y meses de prestaciones en especie—
// ya viven en `data/comision-medica.ts`, que fue la primera página en citar ese apartado. Se
// re-exportan desde acá para que esta página no las escriba de nuevo: una constante duplicada es
// una fuente de verdad partida en dos, y la mitad que nadie mira es la que queda vieja.
export { CUOTAS_PARA_EXTINGUIR, MESES_ESPECIE_TRAS_EXTINCION } from "@/data/comision-medica";

export const SIN_ART_TEXTOS = {
  art27ap6Extincion:
    "La Aseguradora de Riesgos del Trabajo podrá extinguir el contrato de afiliación de un empleador en caso que se verifique la falta de pago de dos (2) cuotas mensuales, consecutivas o alternadas, o la acumulación de una deuda total equivalente a dos (2) cuotas, tomando como referencia la de mayor valor en el último año.",
  art27ap6Reglamentacion:
    "La extinción del contrato deberá ajustarse a los requisitos, modalidades y plazos que determine la reglamentación. A partir de la extinción, el empleador se considerará no asegurado y estará en la situación prevista en el apartado 1 del artículo 28 de esta ley.",
  art27ap6TresMeses:
    "Sin perjuicio de ello, la aseguradora deberá otorgar prestaciones en especie, con los alcances previstos en el Capítulo V de esta ley, por las contingencias ocurridas dentro de los tres (3) meses posteriores a la extinción por falta de pago. La aseguradora podrá repetir del empleador el costo de las prestaciones otorgadas conforme lo dispuesto en el párrafo anterior.",
  art28ap1:
    "Si el empleador no incluido en el régimen de autoseguro omitiera afiliarse a una ART, responderá directamente ante los beneficiarios por las prestaciones previstas en esta ley.",
  art28ap2:
    "Si el empleador omitiera declarar su obligación de pago o la contratación de un trabajador, la ART otorgará las prestaciones, y podrá repetir del empleador el costo de éstas.",
  art28ap3:
    "En el caso de los apartados anteriores el empleador deberá depositar las cuotas omitidas en la cuenta del Fondo de Garantía de la ART.",
  art28ap4:
    "Si el empleador omitiera —total o parcialmente— el pago de las cuotas a su cargo, la ART otorgará las prestaciones, y podrá ejecutar contra el empleador las cotizaciones adeudadas.",
  art29:
    "Declarada judicialmente la insuficiencia patrimonial del empleador no asegurado, o en su caso autoasegurado, para asumir las obligaciones a su cargo, las prestaciones serán financiadas por la SRT con cargo al Fondo de Garantía de la LRT. La insuficiencia patrimonial del empleador será probada a través del procedimiento sumarísimo previsto para las acciones meramente declarativas conforme se encuentre regulado en las distintas jurisdicciones donde la misma deba acreditarse.",
  art20Especie:
    "Las ART otorgaran a los trabajadores que sufran algunas de las contingencias previstas en esta ley las siguientes prestaciones en especie: a) Asistencia médica y farmacéutica; b) Prótesis y ortopedia; c) Rehabilitación; d) Recalificación profesional; y e) Servicio funerario.",
} as const;

/** Las cinco prestaciones en especie del Capítulo V — las únicas que sobreviven a la extinción. */
export const PRESTACIONES_EN_ESPECIE = [
  "Asistencia médica y farmacéutica",
  "Prótesis y ortopedia",
  "Rehabilitación",
  "Recalificación profesional",
  "Servicio funerario",
] as const;

export const SIN_ART_FUENTES = [
  {
    nombre: "Ley 24.557, arts. 27, 28 y 29 — texto actualizado",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=27971",
    detalle:
      "El apartado 6 del art. 27 (extinción del contrato por falta de pago, incorporado por el art. 12 de la Ley 27.348), los cuatro apartados del art. 28 (responsabilidad por omisiones) y el art. 29 (insuficiencia patrimonial y Fondo de Garantía).",
  },
  {
    nombre: "Ley 27.348, art. 12 — texto actualizado",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=272119",
    detalle:
      "La norma que incorporó el apartado 6, con su regla de aplicación temporal: rige para las contingencias cuya primera manifestación invalidante sea posterior a su entrada en vigencia.",
  },
  {
    nombre: "Ley 24.557, art. 20 — prestaciones en especie",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=27971",
    detalle:
      "Las cinco prestaciones del Capítulo V: asistencia médica y farmacéutica, prótesis y ortopedia, rehabilitación, recalificación profesional y servicio funerario. Son las que sobreviven tres meses a la extinción del contrato — no las dinerarias.",
  },
] as const;
