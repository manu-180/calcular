// Pensión Honorífica de Veteranos de la Guerra del Atlántico Sur — Ley 23.848 y sus decretos.
//
// POR QUÉ ESTE ARCHIVO EXISTE (verificado el 3/9/2026, s103): el monto de esta pensión NO EXISTE
// como número oficial propio. La resolución mensual de ANSES —la que fija haber mínimo, máximo,
// bases imponibles, PBU y PUAM— ni la nombra. El monto es DERIVADO: tres veces el haber mínimo, por
// el art. 2º del Decreto 1357/2004. Es el mismo olor que hizo valiosa a /desempleo (50%/100% del
// SMVM) y a /puam (80% del haber mínimo): publicar la REGLA en vez del número del mes es lo que
// hace que la página no envejezca.
//
// LAS CUATRO COSAS QUE CASI NADIE PUBLICA, todas leídas en el texto de la norma:
//
//   1. **La pensión derivada es el 100% del beneficio del causante**, no el 70% del régimen general
//      (art. 7º del Dec. 1357/04). Y el reparto entre copartícipes tiene su propia tabla: 100% para
//      la viuda/o o conviviente sin hijos; 50%/50% cuando hay hijos; 100% para los hijos si no hay
//      viuda/o. Si se extingue el derecho de un copartícipe, el beneficio de los otros SE RECALCULA.
//   2. **La compatibilidad es casi total desde el Dec. 886/2005**, que SUSTITUYÓ el art. 3º del
//      Dec. 1357/04: se cobra junto con cualquier otro beneficio previsional permanente **o de
//      retiro** —nacional, provincial o municipal—, con otro ingreso, con el subsidio de la Ley
//      22.674 y con las pensiones graciables de las Leyes 23.598 y 24.310. La versión original del
//      art. 3º excluía las prestaciones no contributivas nacionales; esa excepción ya no está.
//   3. **Los padres de los caídos en combate acceden con la sola acreditación del vínculo** (art. 7º
//      in fine del Dec. 1357/04): sin los requisitos de incapacidad y estar a cargo que se les pide
//      a los demás padres.
//   4. **Hay causales de pérdida del derecho** (art. 6º del Dec. 1357/04): condena por violación de
//      derechos humanos, traición a la Patria o delitos contra el orden constitucional y la vida
//      democrática. Es una condición del beneficio escrita en la norma, no una nota al pie.
//
// LA MINA DE LOS DOS "ARTÍCULO 3º": el art. 3º de la LEY 23.848 y el art. 3º del DECRETO 1357/04
// dicen cosas parecidas pero no iguales, y el del decreto fue sustituido en 2005. Al citar, decir
// siempre de cuál de los dos se habla.
//
// EL HABER MÍNIMO NO VIVE ACÁ: sale de `prestaciones.ts` / `jubilaciones.ts`, fuente única.

/** Art. 2º del Dec. 1357/2004: el monto del titular es tres veces el haber mínimo. */
export const HABERES_MINIMOS_TITULAR = 3;

/** Art. 7º del Dec. 1357/2004: la pensión derivada es el 100% del beneficio del causante. */
export const PORCENTAJE_DERIVADA = 1;

/**
 * Art. 7º del Dec. 1357/2004 — cómo se reparte el beneficio del causante entre los copartícipes.
 * No es el reparto del régimen general: acá el total repartido es siempre el 100%.
 */
export const REPARTO_DERECHOHABIENTES = {
  /** inc. a) — viuda, viudo o conviviente cuando NO hay hijos con derecho a pensión. */
  soloConyuge: 1,
  /** inc. b) — con hijos: la mitad para la viuda/o o conviviente… */
  conyugeConHijos: 0.5,
  /** …y la otra mitad se distribuye entre los hijos. */
  hijosConConyuge: 0.5,
  /** inc. c) — sin viuda/o ni conviviente: el 100% se distribuye entre los hijos por partes iguales. */
  hijosSolos: 1,
} as const;

/** Textos verbatim. `check_veteranos_malvinas.ts` verifica que nadie los "mejore". */
export const VETERANOS_TEXTOS = {
  /** Dec. 1357/2004, art. 2º — el monto. */
  decMonto:
    "El monto de las pensiones de guerra a que se refiere el artículo precedente será, para los titulares de las mismas, el equivalente a la suma de TRES (3) veces el haber mínimo de las prestaciones a cargo del Régimen Previsional Público del SISTEMA INTEGRADO DE JUBILACIONES Y PENSIONES, instituido por la Ley Nº 24.241, sus modificatorias y complementarias. En todos los casos, se abonarán a los titulares de las pensiones de que se trata las asignaciones familiares, con los mismos requisitos y derechos con que se reconocen a los beneficiarios del citado Régimen Previsional.",
  /** Dec. 1357/2004, art. 3º SUSTITUIDO por el art. 2º del Dec. 886/2005 — la compatibilidad vigente. */
  decCompatibilidad:
    "El cobro de la pensión de guerra instituida por la Ley Nº 23.848, su modificatoria y complementaria, es compatible con cualquier otro beneficio de carácter previsional permanente o de retiro otorgado en jurisdicción nacional, provincial o municipal, con la percepción de otro ingreso, con el subsidio extraordinario instituido por la Ley Nº 22.674 o con las pensiones graciables vitalicias otorgadas por las Leyes Nº 23.598 y Nº 24.310.",
  /** Dec. 1357/2004, art. 7º — el 100% y el reparto. */
  decDerivada:
    "Las pensiones otorgadas y/o a otorgar a los derechohabientes de los beneficiarios mencionados en el artículo 1º, incluidos los padres que reúnan los requisitos citados precedentemente, serán fijadas en el CIEN POR CIEN (100%) del beneficio del causante.",
  /** Dec. 1357/2004, art. 7º in fine — los padres de los caídos. */
  decPadres:
    "Los padres de los veteranos de guerra muertos en combate podrán acceder al beneficio con la sola acreditación del vínculo.",
  /** Dec. 1357/2004, art. 6º — las causales de pérdida del derecho. */
  decPerdida:
    "Los veteranos de guerra que hubieran sido condenados, o resultaren condenados, por violación de los derechos humanos, por delitos de traición a la Patria, o por delitos contra el orden constitucional, la vida democrática u otros tipificados en los Títulos IX, Cap. l; y X, Cap. I y II, del Código Penal, no podrán ser beneficiarios de las pensiones de guerra a que se refiere el presente decreto.",
  /** Dec. 886/2005, art. 1º — el nombre. */
  decNombre:
    "Las pensiones no contributivas a los veteranos de la Guerra del Atlántico Sur a que se refieren la Ley Nº 23.848, su modificatoria y complementaria y el artículo 1º del Decreto Nº 1357/04, pasarán a denominarse \"Pensiones Honoríficas de Veteranos de la Guerra del Atlántico Sur\".",
  /** Dec. 886/2005, art. 7º — el peaje de los retirados de las FFAA. */
  decDesistimiento:
    "A los efectos de la percepción de las Pensiones Honoríficas de Veteranos de la Guerra del Atlántico Sur, el personal de las Fuerzas Armadas y de Seguridad en situación de retiro deberá desistir de las acciones y del eventual derecho que tuvieren a percibir el complemento instituido por el Decreto Nº 1244/98.",
  /** Ley 23.848, art. 1º (texto Ley 24.652) — a quiénes alcanza. */
  leyAlcance:
    "Otórgase una pensión de guerra, cuyo monto será equivalente al cien por ciento (100 %) de la remuneración mensual, integrada por los rubros \"sueldos y regas\" que percibe el grado de cabo del Ejército Argentino, a los ex-soldados conscriptos de las fuerzas armadas que hayan estado destinados en el teatro de Operaciones Malvinas (TOM) o entrado efectivamente en combate en el área del Teatro de Operaciones del Atlántico Sur (TOAS), y a los civiles que se encontraban cumpliendo funciones de servicio y/o apoyo en los lugares antes mencionados, entre el 2 de abril y el 14 de junio de 1982, debidamente certificado según lo establecido en el decreto 2634/90.",
  /** Dec. 886/2005, art. 3º — sustituye el art. 1º de la Ley 24.892: oficiales y suboficiales. */
  decOficiales:
    "Extiéndese el beneficio establecido por las Leyes Nº 23.848 y Nº 24.652 al personal de oficiales y suboficiales de las Fuerzas Armadas y de Seguridad que se encuentren en situación de retiro o baja voluntaria u obligatoria, esta última en tanto no se hubieran dado las situaciones a que se refiere el artículo 6º del Decreto Nº 1357/04, y que hubieran estado destinados en el Teatro de Operaciones Malvinas o entrado efectivamente en combate en el área del Teatro de Operaciones del Atlántico Sur.",
} as const;

/** Con qué SÍ se puede cobrar a la vez (art. 3º del Dec. 1357/04, texto del Dec. 886/2005). */
export const COMPATIBILIDADES = [
  {
    que: "Cualquier otro beneficio previsional permanente o de retiro",
    detalle:
      "Otorgado en jurisdicción nacional, provincial o municipal. Se cobra la jubilación (o el retiro) Y la pensión honorífica, completas las dos.",
  },
  {
    que: "Otro ingreso",
    detalle:
      "Incluido el trabajo personal. La norma no le pone tope ni exige dejar de trabajar.",
  },
  {
    que: "El subsidio extraordinario de la Ley 22.674",
    detalle: "Se percibe además de la pensión honorífica.",
  },
  {
    que: "Las pensiones graciables vitalicias de las Leyes 23.598 y 24.310",
    detalle:
      "La 24.310 es la de quienes sufrieron incapacidades por las acciones bélicas en el Atlántico Sur.",
  },
] as const;

/** Quiénes pueden ser titulares (Ley 23.848 art. 1º + Ley 24.892 art. 1º, texto Dec. 886/2005). */
export const TITULARES = [
  "Ex soldados conscriptos de las Fuerzas Armadas destinados en el Teatro de Operaciones Malvinas (TOM), o que entraron efectivamente en combate en el área del Teatro de Operaciones del Atlántico Sur (TOAS).",
  "Civiles que cumplían funciones de servicio y/o apoyo en esos lugares, entre el 2 de abril y el 14 de junio de 1982.",
  "Personal de oficiales y suboficiales de las Fuerzas Armadas y de Seguridad en situación de retiro o baja (voluntaria u obligatoria; esta última, salvo las causales del art. 6º del Dec. 1357/04) que estuvo destinado en el TOM o entró en combate en el TOAS.",
] as const;

export type FuenteVeteranos = { nombre: string; url: string; detalle: string };

export const VETERANOS_FUENTES: { consultadoEl: string; lista: FuenteVeteranos[] } = {
  consultadoEl: "2026-09-03",
  lista: [
    {
      nombre: "Decreto 1357/2004: ANSES a cargo, monto y derechohabientes (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/95000-99999/99383/norma.htm",
      detalle:
        "B.O. 6/10/2004. Su art. 2º fija el monto del titular en tres veces el haber mínimo del Régimen Previsional Público; el art. 6º, las causales de pérdida del derecho; el art. 7º, que la pensión derivada es el 100% del beneficio del causante y cómo se reparte. Su validez fue declarada por ambas cámaras del Congreso en 2007.",
    },
    {
      nombre: "Decreto 886/2005: el nombre actual y la compatibilidad vigente (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/105000-109999/108081/norma.htm",
      detalle:
        "B.O. 2005. Le pone el nombre de «Pensiones Honoríficas», SUSTITUYE el art. 3º del Dec. 1357/04 por la compatibilidad amplia que rige hoy, extiende el beneficio a oficiales y suboficiales retirados (art. 3º), agrega las asignaciones por prenatal, nacimiento, adopción y matrimonio (art. 4º) y exige a los retirados de las FFAA desistir del complemento del Dec. 1244/98 (art. 7º).",
    },
    {
      nombre: "Ley 23.848, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/248/texact.htm",
      detalle:
        "Crea la pensión vitalicia. Su art. 1º (texto según la Ley 24.652) define a quiénes alcanza y las fechas del conflicto; el art. 2º remite al art. 53 de la Ley 24.241 para los derechohabientes; el art. 3º la declara compatible con cualquier otro beneficio previsional permanente.",
    },
    {
      nombre: "Resolución ANSES 257/2026: haber mínimo garantizado de septiembre de 2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346683/20260901",
      detalle:
        "B.O. 1/9/2026. Fija el haber mínimo del que se derivan estos montos. Nótese que la resolución NO menciona la pensión honorífica: su importe no se publica, se calcula.",
    },
  ],
};
