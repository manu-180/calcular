// APORTES A LA OBRA SOCIAL Y DERIVACIÓN A UNA PREPAGA — cuánto se recauda sobre tu sueldo,
// cuánto se queda el Fondo Solidario de Redistribución y cuánto llega a la entidad que elegiste.
// Ley 23.660 arts. 9, 16 y 19 · Decreto 600/2024 · Decreto 70/2023 · Decreto 576/93 (Anexos I y II)
// · Ley 26.682 arts. 9, 10, 12 y 23 · Ley 24.241 art. 9 (texto del Decreto 491/2004).
//
// POR QUÉ ESTE ARCHIVO EXISTE (5/9/2026, s107). «Cuánto de mi sueldo va a la obra social» parece
// el tema más cubierto de internet: 3% del trabajador, 6% del empleador, y listo. El reparto que
// viene después —cuánto de esos nueve puntos llega de verdad a la entidad y cuánto se queda el
// Fondo Solidario de Redistribución— casi nadie lo publica con el texto vigente, y el que lo
// publica repite una escala que dejó de existir el 1º de agosto de 2024:
//
//   1. **El 15% es plano desde el Decreto 600/2024.** Hasta el 31/7/2024 el art. 19 de la Ley
//      23.660 tenía una escala doble: 10% o 15% al Fondo según la remuneración, y 15% o 20% para
//      las obras sociales del personal de dirección. El umbral que partía esa escala eran PESOS
//      MIL mensuales, congelados desde el Decreto 486/2002. El propio decreto lo dice en sus
//      considerandos: el monto «resulta inadecuado pues su desactualización no refleja eficazmente
//      la realidad económica actual».
//
//   2. **Y por eso el cambio NO es el que parece.** Como cualquier sueldo real supera los mil pesos
//      desde hace veinte años, la escala vieja ya venía aplicando el 15% a la obra social común:
//      para el grueso de los trabajadores el reparto no se movió. Lo que sí cambió, y es lo que
//      hay que decir sin adornos, es el tramo del **personal de dirección y de las entidades del
//      inciso i)** —las prepagas incorporadas como agentes del seguro por el art. 270 del Decreto
//      70/2023—: pasaron del 20% al 15%, o sea que a esa entidad le llegan **cinco puntos más**.
//
//   3. **El art. 19 bis vivió siete meses y se llevó puesto el bolsillo.** El Decreto 70/2023 lo
//      incorporó el 21/12/2023: cuando la entidad recibía adicionales por encima de los aportes
//      del art. 16 —o sea, cuando el afiliado pagaba de más para mejorar el plan—, el Fondo se
//      quedaba con el 20% de esa suma. El art. 2° del Decreto 600/2024 lo derogó. Toda explicación
//      que lo siga mencionando no está incompleta: describe un régimen que ya no existe.
//
//   4. **La letra chica invierte la protección, y es la que decide.** El art. 4° del Decreto
//      600/2024 reescribió el art. 1° del Anexo II del Decreto 576/93: los agentes del seguro no
//      pueden pedir requisitos extra, discriminar, tomar examen psicofísico ni fijar carencias
//      —«los supuestos previstos en los incisos a), b), c) y d) NO son aplicables» a las entidades
//      del inciso i) que operan bajo la Ley 26.682—. Traducido: la obra social sindical no te puede
//      pedir declaración jurada de salud; la prepaga a la que derivás los aportes, sí, y la
//      autoridad de aplicación le puede autorizar un valor diferencial por preexistencias (art. 10
//      de la Ley 26.682). Es exactamente el dato que no aparece en ninguna nota sobre «cómo derivar
//      los aportes».
//
//   5. **Se puede cambiar sin esperar un año.** El mismo decreto cerró el art. 3° del Anexo I del
//      Decreto 576/93 con una frase que vale plata: «Cuando, por cualquier motivo, finalice la
//      contratación del plan el beneficiario podrá optar por cualquier otro Agente del Seguro sin
//      limitación temporal».
//
// FUENTES leídas el 5/9/2026, todas en InfoLEG, ninguna nota de prensa:
//   · Ley 23.660 texto actualizado (id 62) — arts. 9, 16 y 19, y sus Antecedentes Normativos.
//   · Ley 23.660 capturas del 1/12/2023 y del 1/6/2024 (id 62 vía Internet Archive) — el art. 19
//     anterior al Decreto 70/2023 y el art. 19 bis, que ya no están en el texto vigente.
//   · Decreto 600/2024 texto original (id 401319) — los cinco artículos y los considerandos.
//   · Decreto 491/2004 texto original (id 94384) — el tope de la base imponible queda SOLO para
//     los aportes de los incisos a) y c) del art. 10 de la Ley 24.241.
//   · Ley 26.682 texto actualizado (id 182180) — arts. 9, 10, 12 y 23.

import { PRESTACIONES_VIGENTES } from "./prestaciones";

/** Desde cuándo rige el reparto plano 85/15. Dec. 600/2024, art. 6°: el 1° del mes siguiente al B.O. */
export const VIGENCIA_REPARTO = "1 de agosto de 2024";
export const VIGENCIA_REPARTO_ISO = "2024-08-01";

/** Ley 23.660, art. 16 inc. b): aporte del trabajador en relación de dependencia. */
export const APORTE_TRABAJADOR = 0.03;

/**
 * Ley 23.660, art. 16 inc. b), 2ª oración: aporte adicional por CADA persona que la SSS autorice a
 * incluir según el último apartado del art. 9 (otros ascendientes o descendientes por consanguinidad
 * a cargo). NO se paga por el grupo familiar primario —cónyuge e hijos del inc. a)—, que va sin
 * adicional. Confundir las dos cosas es el error más común del tema.
 */
export const APORTE_ADICIONAL_FAMILIAR = 0.015;

/**
 * Ley 23.660, art. 16 inc. a): contribución del empleador. El texto de la ley dice 5% (art. 23 de
 * la Ley 25.239) pero el art. 80 de la Ley 25.565 restituyó el 6%, y así se liquida. El art. 165 de
 * la Ley 27.802 lo escribe en el propio inciso con efecto para las contribuciones que se devenguen
 * desde el 1/1/2027: mismo número, y además faculta a la SSS a auditar su destino.
 */
export const CONTRIBUCION_EMPLEADOR = 0.06;

/** Ley 23.660, art. 19 (texto del art. 1° del Decreto 600/2024): reparto plano, para todos. */
export const REPARTO_VIGENTE = { entidad: 0.85, fondo: 0.15 } as const;

/**
 * El reparto anterior al Decreto 600/2024 (art. 19 incs. a] y b], texto del art. 21 del Decreto
 * 486/2002, mantenido por el art. 284 del Decreto 70/2023). El umbral de mil pesos quedó congelado
 * en 2002: en la práctica, desde hace dos décadas todo sueldo cae en el tramo "supera el tope".
 */
export const REPARTO_ANTERIOR = {
  umbralRemuneracion: 1000,
  obraSocial: { hastaUmbral: 0.9, sobreUmbral: 0.85 },
  personalDireccion: { hastaUmbral: 0.85, sobreUmbral: 0.8 },
} as const;

/** Cuánto duró el art. 19 bis: incorporado por el Dec. 70/2023, derogado por el Dec. 600/2024. */
export const ART_19_BIS = {
  desde: "21 de diciembre de 2023",
  hasta: "31 de julio de 2024",
  coeficiente: 0.2,
} as const;

export const TIPOS_ENTIDAD = [
  {
    id: "obra-social",
    nombre: "Obra social sindical (la de tu convenio)",
    detalle:
      "Ley 23.660, art. 1° incisos a) a h). No puede pedirte declaración jurada de salud, examen psicofísico ni imponerte carencias sobre el Programa Médico Obligatorio.",
  },
  {
    id: "direccion-o-prepaga",
    nombre: "Personal de dirección, o prepaga como agente del seguro",
    detalle:
      "Ley 23.660, art. 1° inciso i), incorporado por el art. 270 del Decreto 70/2023. Es la vía por la que se derivan los aportes a una prepaga: puede cobrarte una cuota y tomar a cuenta los aportes obligatorios para un plan superador.",
  },
] as const;

export type TipoEntidad = (typeof TIPOS_ENTIDAD)[number]["id"];

/** Citas textuales. Se muestran entre comillas en la página: no se parafrasean. */
export const OBRA_SOCIAL_TEXTOS = {
  art19Vigente:
    "El OCHENTA Y CINCO POR CIENTO (85 %) de la suma de la contribución y los aportes que prevén los incisos a) y b) del artículo 16 de esta ley serán depositados a la entidad seleccionada por el beneficiario y a través del mecanismo que establezca el organismo responsable de la recaudación de fondos. El QUINCE POR CIENTO (15 %) de la contribución y los aportes que prevén los incisos a) y b) del artículo 16 de la presente ley será destinado al Fondo Solidario de Redistribución a la orden de las cuentas recaudadoras que determine la Reglamentación.",
  art19bisDerogado:
    "Cuando las entidades reciban aportes adicionales a los de la suma de la contribución y los aportes que prevén los incisos a) y b) del artículo 16 de esta Ley, deberán depositar el VEINTE (20 %) al Fondo Solidario de Redistribución.",
  considerandoUmbral:
    "el monto de PESOS MIL ($1000) establecido en el inciso a) del artículo 19 de la Ley Nº 23.660 como límite para diferenciar las remuneraciones brutas mensuales resulta inadecuado pues su desactualización no refleja eficazmente la realidad económica actual, por lo que resulta necesario eliminar dicho diferencial salarial",
  tomarACuenta:
    "Las entidades inscriptas comprendidas en el inciso i) del artículo 1° de la Ley N° 23.660 podrán solicitar el pago de una cuota y tomar a cuenta los aportes y contribuciones obligatorios para ofrecer a sus beneficiarios planes superadores. En estos casos, será de aplicación la Ley N° 26.682, en particular los artículos 9°, 10 y 12 de dicha norma.",
  sinLimitacionTemporal:
    "Cuando, por cualquier motivo, finalice la contratación del plan el beneficiario podrá optar por cualquier otro Agente del Seguro sin limitación temporal.",
  proteccionesQueNoAplican:
    "Los supuestos previstos en los incisos a), b), c) y d) no son aplicables para los Agentes del Seguro de Salud comprendidos en el inciso i) del artículo 1° de la Ley N° 23.660 que ofrezcan sus servicios en el Sistema de Salud dentro del marco de la Ley N° 26.682. En virtud de ello, para los referidos Agentes se aplicarán los artículos 9°, 10 y 12 de la última de las leyes citadas.",
  preexistencias:
    "Las enfermedades preexistentes solamente pueden establecerse a partir de la declaración jurada del usuario y no pueden ser criterio del rechazo de admisión de los usuarios. La Autoridad de Aplicación autorizará valores diferenciales debidamente justificados para la admisión de usuarios que presenten enfermedades preexistentes, de acuerdo a lo que establezca la reglamentación.",
  mayores65:
    "A los usuarios mayores a sesenta y cinco (65) años que tengan una antigüedad mayor a diez (10) años en uno de los sujetos comprendidos en el artículo 1º de la presente ley, no se les puede aplicar el aumento en razón de su edad.",
  adicional15:
    "La Superintendencia de Servicios de Salud (SSS) podrá autorizar, con los requisitos que ella establezca, la inclusión como beneficiarios, de otros ascendientes o descendientes por consanguinidad del beneficiario titular y que se encuentren a su cargo, en cuyo caso se fija un aporte adicional del uno y medio por ciento (1,5%) por cada una de las personas que se incluyan.",
  adhesionVoluntaria:
    "Los planes de adhesión voluntaria comercializados por las Entidades de Medicina Prepaga y todas las entidades comprendidas en el artículo 1° de esta ley no realizarán aportes al Fondo Solidario de Redistribución ni participarán del mismo.",
  contribucion2027:
    "Sustitúyese, con efecto para las contribuciones que se devenguen a partir del 1º de enero de 2027, el inciso a) del artículo 16 de la ley 23.660 y sus modificaciones, por el siguiente: a) Una contribución a cargo del empleador equivalente al seis por ciento (6%) de la remuneración de los trabajadores que presten servicios en relación de dependencia. La Superintendencia de Servicios de Salud (SSS) estará facultada para auditar el destino de las contribuciones referenciadas en el párrafo precedente.",
} as const;

export const OBRA_SOCIAL_FUENTES = {
  consultadoEl: "5 de septiembre de 2026",
  principal: {
    nombre: "Ley 23.660, art. 19 — texto actualizado en InfoLEG",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm",
  },
  lista: [
    {
      nombre: "Ley 23.660 — texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm",
      detalle:
        "Arts. 9 (beneficiarios y el adicional del 1,5%), 16 (aportes y contribuciones) y 19 (el reparto 85/15).",
    },
    {
      nombre: "Decreto 600/2024 (B.O. 10/7/2024) — texto original",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/400000-404999/401319/norma.htm",
      detalle:
        "Sustituye el art. 19, deroga el art. 19 bis, reescribe los Anexos I y II del Decreto 576/93 y sustituye el art. 23 de la Ley 26.682. Rige desde el 1/8/2024.",
    },
    {
      nombre: "Ley 26.682 — marco regulatorio de la medicina prepaga",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/180000-184999/182180/texact.htm",
      detalle:
        "Arts. 9 (rescisión), 10 (carencias, declaración jurada y valores diferenciales), 12 (mayores de 65) y 23 (planes de adhesión voluntaria).",
    },
    {
      nombre: "Decreto 491/2004 (B.O. 21/4/2004)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/90000-94999/94384/norma.htm",
      detalle:
        "Deja el tope de la base imponible del art. 9 de la Ley 24.241 sólo para los aportes de los incisos a) y c) del art. 10: la contribución del empleador dejó de tener límite máximo.",
    },
    {
      nombre: `${PRESTACIONES_VIGENTES.resolucion} — bases imponibles vigentes`,
      url: PRESTACIONES_VIGENTES.resolucionUrl,
      detalle: "La base máxima sobre la que se calculan los aportes personales.",
    },
  ],
} as const;
