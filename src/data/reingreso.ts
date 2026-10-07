// REINGRESO DEL TRABAJADOR — art. 255 de la Ley de Contrato de Trabajo 20.744, con el TEXTO
// VIGENTE tras la Ley 27.802 (B.O. 6/3/2026), que lo sustituyó por su art. 53.
//
// POR QUÉ ESTE ARCHIVO EXISTE (18/8/2026, s87): el art. 255 resuelve un caso muy común y muy mal
// publicado — te indemnizaron, después te volvieron a tomar, y ahora te despiden de nuevo. La
// antigüedad se cuenta ENTERA (arts. 18 y 19), pero de la indemnización nueva se descuenta lo que
// ya cobraste. La pregunta que decide la plata es **cuánto vale hoy aquello que cobraste**, y ahí
// están los dos hallazgos:
//
//   1. **Ese descuento se ACTUALIZA POR IPC.** El texto clásico —el que repiten los resúmenes—
//      mandaba deducir "lo pagado oportunamente", a secas: un monto nominal, que con inflación
//      argentina se licúa hasta no descontar nada. Hoy el artículo dice "lo pagado oportunamente,
//      actualizado por el Índice de Precios al Consumidor (IPC)". Con inflación acumulada de tres
//      dígitos, el descuento actualizado puede ser varias veces el nominal: es la diferencia entre
//      cobrar casi toda la indemnización nueva y cobrar el piso.
//   1 bis. **Y antes que nada: puede que no haya nada que contar.** El art. 255 remite al art. 18
//      para computar la antigüedad, y ese artículo TAMBIÉN fue sustituido por la misma reforma (su
//      art. 9º): ahora, si entre el cese y el reingreso pasaron DOS AÑOS, "la antigüedad del tiempo
//      de servicio anterior no será computada". Eso no existía en ninguna versión anterior del
//      artículo —el tiempo viejo se computaba siempre, sin importar cuánto hubiera pasado— y
//      decide el caso completo antes de llegar a ninguna cuenta. Vive en un artículo distinto del
//      que todos citan para este tema, y por eso casi nadie lo publica junto con el 255.
//   2. **La Ley 27.802 le SACÓ el 3% anual que el artículo traía.** La versión inmediatamente
//      anterior (art. 83 del DNU 70/2023) decía "actualizado por el Índice de Precios al Consumidor
//      (IPC) con más una tasa de interés pura del 3% anual". El texto vigente conserva el IPC y
//      elimina esa tasa. Detalle que casi nadie cruza: la MISMA reforma dejó el 3% en el art. 276
//      (actualización de créditos laborales). O sea que hoy la LCT tiene dos fórmulas distintas de
//      repotenciación en dos artículos, y la del 255 —la que juega en contra del trabajador— es la
//      más chica de las dos.
//
// EL PISO QUE PROTEGE: el artículo cierra con que la indemnización resultante NUNCA puede ser
// inferior a la que hubiera correspondido computando SOLO el último período de servicios. Es lo
// que impide que la deducción actualizada se coma el despido nuevo entero.
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552) y texto del DNU 70/2023 (id 395521)
// para la versión anterior, ambos leídos el 18/8/2026. Nunca una nota de prensa.

/** Fecha desde la que rige el texto actual (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** ISO de esa misma fecha. */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que sustituyó el art. 255 de la LCT. */
export const ARTICULO_SUSTITUTIVO = 53;

/**
 * Las indemnizaciones de las que se deduce lo ya cobrado. La lista es taxativa y está en el propio
 * artículo: si el rubro no está acá, no se deduce.
 */
export const INDEMNIZACIONES_ALCANZADAS: { articulo: number; concepto: string }[] = [
  { articulo: 245, concepto: "Despido sin justa causa (indemnización por antigüedad)" },
  { articulo: 246, concepto: "Despido indirecto: el trabajador se considera despedido con causa" },
  { articulo: 247, concepto: "Falta o disminución de trabajo y fuerza mayor (la mitad del 245)" },
  { articulo: 250, concepto: "Extinción del contrato a plazo fijo por vencimiento del plazo" },
  { articulo: 251, concepto: "Quiebra o concurso del empleador" },
  { articulo: 253, concepto: "Trabajador jubilado que sigue o vuelve a prestar servicios" },
  { articulo: 254, concepto: "Incapacidad o inhabilidad del trabajador" },
];

export const REINGRESO_TEXTOS = {
  vigente:
    "Reingreso del trabajador. Deducción de las indemnizaciones percibidas. La antigüedad del trabajador se establecerá conforme a lo dispuesto en los artículos 18 y 19 de esta ley, pero si hubiera mediado reingreso a las órdenes del mismo empleador se deducirá de las indemnizaciones de los artículos 245, 246, 247, 250, 251, 253 y 254 lo pagado oportunamente, actualizado por el Índice de Precios al Consumidor (IPC), por la causal de cese anterior. En ningún caso la indemnización resultante podrá ser inferior a la que hubiera correspondido al trabajador si su período de servicios hubiera sido solo el último y con prescindencia de los períodos anteriores al reingreso.",
  vigenteNota:
    "(Artículo sustituido por art. 53 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  anteriorDnu:
    "Reingreso del trabajador. Deducción de las indemnizaciones percibidas. La antigüedad del trabajador se establecerá conforme a lo dispuesto en los artículos 18 y 19 de esta ley, pero si hubiera mediado reingreso a las órdenes del mismo empleador se deducirá de las indemnizaciones de los artículos 245, 246, 247, 250, 251, 253 y 254 lo pagado oportunamente, actualizado por el Índice de Precios al Consumidor (IPC) con más una tasa de interés pura del 3% anual, por la causal de cese anterior. En ningún caso la indemnización resultante podrá ser inferior a la que hubiera correspondido al trabajador si su período de servicios hubiera sido solo el último y con prescindencia de los períodos anteriores al reingreso.",
  anteriorDnuNota:
    "(Texto que le dio el art. 83 del Decreto de Necesidad y Urgencia 70/2023, B.O. 21/12/2023.)",
  /**
   * El art. 255 remite al art. 18 para contar la antigüedad — y el art. 18 TAMBIÉN fue sustituido
   * por la misma reforma (su art. 9º). Ahí está el cambio que decide el caso: el corte de los dos
   * años, que no existía en ninguna versión anterior del artículo.
   */
  art18:
    "Antigüedad del trabajador. Cuando se reconozcan derechos al trabajador en función de su antigüedad, se considerará como tiempo de servicio aquel efectivamente trabajado desde el inicio de la relación laboral, incluyendo el correspondiente a los sucesivos contratos a plazo que las partes hubieran celebrado. Asimismo, se computará como antigüedad el tiempo de servicio anterior, en los casos en que el trabajador hubiese cesado por cualquier causa y reingrese bajo las órdenes del mismo empleador. Si transcurriese un plazo de dos (2) años entre el cese del vínculo laboral, cualquiera fuera la causa, y el trabajador reingresara a prestar servicios con el mismo empleador, la antigüedad del tiempo de servicio anterior no será computada.",
  art18Nota:
    "(Artículo sustituido por art. 9º de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art19:
    "Plazo de preaviso. Se considerará igualmente tiempo de servicio el que corresponde al plazo de preaviso que se fija por esta ley o por los estatutos especiales, cuando el mismo hubiere sido concedido.",
} as const;

/**
 * El corte nuevo del art. 18: si entre el cese y el reingreso pasan DOS AÑOS, el tiempo de servicio
 * anterior no se computa. Es la pieza que cambia el resultado entero y la que no publica casi nadie,
 * porque vive en un artículo distinto del que todos citan para este caso.
 */
export const CORTE_ANIOS = 2;
export const ARTICULO_ANTIGUEDAD = 18;
export const ARTICULO_SUSTITUTIVO_ANTIGUEDAD = 9;

export type FuenteReingreso = { nombre: string; url: string; detalle: string };

export const REINGRESO_FUENTES: { consultadoEl: string; lista: FuenteReingreso[] } = {
  consultadoEl: "2026-08-18",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 255 con el texto sustituido por el art. 53 de la Ley 27.802: la deducción actualizada por IPC y el piso del último período. También los arts. 18 y 19 (cómo se computa la antigüedad, que la reforma no tocó) y el art. 245 (la indemnización de la que se deduce).",
    },
    {
      nombre: "Decreto de Necesidad y Urgencia 70/2023 (B.O. 21/12/2023), art. 83",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/395000-399999/395521/norma.htm",
      detalle:
        "El texto inmediatamente anterior del art. 255, que además del IPC mandaba sumar «una tasa de interés pura del 3% anual». La Ley 27.802 conservó el IPC y eliminó esa tasa.",
    },
    {
      nombre: "Ley 27.802 (B.O. 6/3/2026)",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La reforma que sustituyó ~54 artículos de la LCT. Su art. 53 reescribió el art. 255 y su art. 54 el art. 276, que sí conserva el IPC más el 3% anual: dos fórmulas distintas en la misma ley.",
    },
    {
      nombre: "INDEC: Índice de Precios al Consumidor, Nivel General",
      url: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31",
      detalle:
        "La serie con la que se actualiza la suma cobrada. El INDEC publica con unos 40 días de atraso: el índice del mes en curso todavía no existe, y por eso la actualización llega hasta el último mes publicado.",
    },
  ],
};
