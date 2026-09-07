// Beneficios para el empleador que contrata a una persona con discapacidad.
//
// POR QUÉ ESTE ARCHIVO EXISTE (verificado el 4/9/2026, s104): el art. 87 de la Ley 24.013 fue
// REESCRITO el 22/9/2025 por el art. 17 de la Ley 27.793 (Emergencia Nacional en Discapacidad) y
// pasó de una exención de UN año a la exención del CINCUENTA POR CIENTO de las contribuciones
// patronales por TRES años. La reforma se descubrió con `tools/ley-reformada-por.ts` (obra O-14):
// la Ley 27.793 es famosa por el veto y la insistencia del Congreso, y todas las notas hablan de
// las pensiones y los aranceles — su artículo 17, que es el único que le pone plata en el bolsillo
// a un empleador, no lo publicó nadie.
//
// LAS CUATRO COSAS QUE CAMBIAN LA RESPUESTA Y NO ESTÁN EN NINGUNA NOTA:
//
//   1. **La exención NO es del 50% de «lo que paga el empleador».** Alcanza exactamente a los
//      cuatro subsistemas que enumera el art. 87 —INSSJP (Ley 19.032), Fondo Nacional de Empleo
//      (Ley 24.013), SIPA (Ley 24.241) y Asignaciones Familiares (Ley 24.714)—, que son los mismos
//      cuatro del art. 19 de la Ley 27.541. La contribución a la obra social (6%, art. 16 inc. a de
//      la Ley 23.660), la cuota de la ART y el seguro colectivo de vida quedan AFUERA y se siguen
//      pagando enteros.
//   2. **La alícuota vigente NO es la que dice el texto ordenado del Decreto 814/2001.** Ese texto
//      sigue mostrando el 19,50% del art. 165 de la Ley 27.430, porque la Ley 27.541 no lo
//      sustituyó: fijó las alícuotas por su cuenta en su art. 19 (20,40% y 18%). Leer el decreto y
//      no la ley da un número mal — es la mina «no falla, miente» aplicada a un texto ordenado.
//   3. **La detracción quedó congelada.** El art. 4 del Dec. 814/2001 mandaba actualizarla por IPC
//      todos los eneros; el art. 22 de la Ley 27.541 la reemplazó por un importe FIJO de $7.003,68
//      que no se actualiza desde 2019. Con los sueldos de hoy es casi irrelevante, y esa es
//      exactamente la razón por la que ninguna nota la menciona: nadie la recalculó nunca.
//   4. **Hay un segundo beneficio y es acumulable.** El propio art. 87 dice «independientemente de
//      las establecidas en la ley 22.431», cuyo art. 23 da una deducción especial en Ganancias
//      equivalente al 70% de las retribuciones del personal con discapacidad, a opción del
//      contribuyente. Es otro impuesto y otra base: no compite con la exención de contribuciones.
//
// EL ESTADO JURÍDICO ES PARTE DEL DATO, no una nota al pie: la Ley 27.793 fue promulgada por el
// Decreto 681/2025, que en su art. 2° la declaró SUSPENDIDA en su ejecución por el art. 5° de la
// Ley 24.629 (falta de financiamiento). El 12/12/2025 el Juzgado Federal de Campana declaró
// inválido ese art. 2° y ordenó su aplicación inmediata; el Estado apeló y el recurso se concedió
// con efecto DEVOLUTIVO (la sentencia se cumple mientras se discute) y la queja para darle efecto
// suspensivo no fue resuelta. En ese marco el Poder Ejecutivo reglamentó la ley por el Decreto
// 84/2026, cuyo Anexo I dice, para el artículo 17, «Sin reglamentar»: el beneficio no espera
// ningún reglamento. Publicar el monto sin este párrafo sería vender una certeza que no existe.

/**
 * Art. 19 de la Ley 27.541 — las dos alícuotas de contribuciones patronales con destino a INSSJP,
 * FNE, SIPA y Asignaciones Familiares. Son las que alcanza la exención del art. 87.
 */
export const ALICUOTAS_ART19 = [
  {
    id: "a",
    alicuota: 0.204,
    titulo: "20,40%",
    quien:
      "Empleadores del sector privado cuya actividad principal encuadre en «Servicios» o «Comercio» (Res. SEPyME 220/2019) y cuyas ventas totales anuales superen el límite de mediana empresa tramo 2.",
  },
  {
    id: "b",
    alicuota: 0.18,
    titulo: "18%",
    quien:
      "Todos los demás empleadores del sector privado. También las entidades y organismos del art. 1° de la Ley 22.016.",
  },
] as const;

export type AlicuotaArt19 = (typeof ALICUOTAS_ART19)[number]["id"];

/** Art. 22 de la Ley 27.541 — detracción mensual por trabajador, importe fijo desde 2019. */
export const DETRACCION_MENSUAL = 7003.68;

/**
 * Art. 22 in fine — de la base del SAC se detrae el 50% de la detracción mensual. Por eso el año
 * no son 12 detracciones sino 12,5.
 */
export const DETRACCION_SAC = 0.5;

/** Art. 87 de la Ley 24.013 (texto según art. 17 de la Ley 27.793) — el porcentaje y el plazo. */
export const EXENCION_PORCENTAJE = 0.5;
export const EXENCION_ANIOS = 3;

/** Art. 23 de la Ley 22.431 — deducción especial en Ganancias, acumulable con lo anterior. */
export const DEDUCCION_GANANCIAS = 0.7;

/** Art. 16 inc. a) de la Ley 23.660 — la contribución que el beneficio NO toca. */
export const OBRA_SOCIAL_EMPLEADOR = 0.06;

/** Textos verbatim. `check_contratacion_discapacidad.ts` verifica que nadie los "mejore". */
export const DISCAPACIDAD_TEXTOS = {
  /** Ley 24.013, art. 87, texto vigente según art. 17 de la Ley 27.793. */
  art87Vigente:
    "Los empleadores que contraten trabajadores con discapacidad por tiempo indeterminado serán eximidos del pago del cincuenta por ciento (50%) de las contribuciones patronales y a las cajas de jubilaciones correspondientes al INSSJP, a las Cajas de Asignaciones y Subsidios Familiares y al Fondo Nacional de Empleo por el período de tres (3) años, independientemente de las establecidas en la ley 22.431.",
  /** El texto ANTERIOR, el que sigue publicado en toda la web. */
  art87Anterior:
    "Los empleadores que contraten trabajadores discapacitados por tiempo indeterminado gozarán de la exención prevista en el artículo 46 sobre dichos contratos por el período de un año, independientemente de las que establecen las leyes 22.431 y 23.031.",
  /** Ley 27.541, art. 19 — el encabezado que fija el destino de las contribuciones alcanzadas. */
  art19Destino:
    "Establécense las alícuotas que se describen a continuación, correspondientes a las contribuciones patronales sobre la nómina salarial con destino a los subsistemas de Seguridad Social regidos por las leyes 19.032 (INSSJP), 24.013 (Fondo Nacional de Empleo), 24.241 (Sistema Integrado Previsional Argentino) y 24.714 (Régimen de Asignaciones Familiares)",
  /** Ley 27.541, art. 22 — la detracción congelada. */
  art22Detraccion:
    "De la base imponible sobre la que corresponda aplicar la alícuota prevista en el primer párrafo del artículo 19, se detraerá mensualmente, por cada uno de los trabajadores, un importe de pesos siete mil tres con sesenta y ocho centavos ($ 7.003,68) en concepto de remuneración bruta.",
  /** Ley 22.431, art. 23 — el segundo beneficio. */
  art23Ganancias:
    "Los empleadores que concedan empleo a personas discapacitadas tendrán derecho al cómputo, a opción del contribuyente, de una deducción especial en la determinación del Impuesto a las ganancias o sobre los capitales, equivalente al SETENTA POR CIENTO (70%) de las retribuciones correspondientes al personal discapacitado en cada período fiscal.",
  /** Decreto 681/2025, considerandos — la suspensión. */
  suspension:
    "corresponde que el PODER EJECUTIVO NACIONAL promulgue la Ley N° 27.793 la que, sin embargo, por imperio de lo dispuesto por el artículo 5° de la Ley N° 24.629, se encuentra suspendida en su ejecución hasta tanto el H. CONGRESO DE LA NACIÓN determine las fuentes de su financiamiento e incluya en el presupuesto nacional las partidas que permitan afrontar las erogaciones que ella misma prevé.",
  /** Decreto 84/2026, considerandos — la sentencia que ordenó aplicarla. */
  sentencia:
    "el Juzgado Federal de Primera Instancia de Campana, mediante sentencia dictada el 12 de diciembre de 2025 en la causa caratulada “J., O.G (EN REP. DE SUS HIJOS) Y OTRO C/ ESTADO NACIONAL- MINISTERIO DE SALUD DE LA NACIÓN Y OTRO S/AMPARO COLECTIVO LEY 16.986” (Expte. FSM N° 44035/2025) declaró la invalidez del artículo 2° del Decreto N° 681/25 y ordenó la inmediata aplicación de la Ley N° 27.793.",
  /** Decreto 84/2026, Anexo I — el artículo que crea el beneficio no necesita reglamento. */
  sinReglamentar: "ARTÍCULO 17.- Sin reglamentar.",
} as const;

/** Lo que la exención NO alcanza: se sigue pagando entero. */
export const FUERA_DEL_BENEFICIO = [
  {
    que: "Contribución a la obra social — 6%",
    detalle:
      "Art. 16 inc. a) de la Ley 23.660. No está entre los cuatro subsistemas que enumera el art. 87, así que la exención no la toca.",
  },
  {
    que: "Cuota de la ART",
    detalle:
      "Ley 24.557. Se pacta con la aseguradora según la actividad y la siniestralidad: no es una contribución de la seguridad social y queda fuera del beneficio.",
  },
  {
    que: "Seguro colectivo de vida obligatorio",
    detalle: "Decreto 1567/74. Tampoco integra los subsistemas alcanzados.",
  },
  {
    que: "Los aportes del trabajador",
    detalle:
      "El 11% jubilatorio, el 3% de PAMI y el 3% de obra social los aporta la persona empleada y se le siguen descontando igual: el beneficio es del empleador y no le baja el sueldo de bolsillo a nadie.",
  },
] as const;

/** Los requisitos que la norma escribe — no los que se suponen. */
export const REQUISITOS = [
  "El contrato tiene que ser POR TIEMPO INDETERMINADO. El art. 87 lo dice con esas palabras: un contrato a plazo fijo, eventual o de temporada no habilita la exención.",
  "La persona contratada tiene que ser trabajadora con discapacidad. El instrumento con el que se acredita es el Certificado Único de Discapacidad (CUD) de la Ley 22.431 y sus modificatorias.",
  "El plazo del beneficio son tres años contados desde la contratación, y corre por cada contrato: no es un cupo anual de la empresa.",
] as const;

export type FuenteDiscapacidad = { nombre: string; url: string; detalle: string };

export const DISCAPACIDAD_FUENTES: { consultadoEl: string; lista: FuenteDiscapacidad[] } = {
  consultadoEl: "2026-09-04",
  lista: [
    {
      nombre: "Ley 24.013, art. 87 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/412/texact.htm",
      detalle:
        "El texto vigente lleva la nota «Artículo sustituido por art. 17 de la Ley Nº 27.793 B.O. 22/9/2025». La versión anterior —la que sigue publicada en buena parte de la web— remitía a la exención del art. 46 por un año.",
    },
    {
      nombre: "Ley 27.793 — Emergencia Nacional en Discapacidad (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/415000-419999/417788/norma.htm",
      detalle:
        "B.O. 22/9/2025. Su art. 17 es el que reescribe el art. 87 de la Ley 24.013. Sancionada por insistencia de ambas cámaras tras el veto del Decreto 534/2025.",
    },
    {
      nombre: "Decreto 681/2025 — promulgación y suspensión de la ejecución (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/415000-419999/417790/norma.htm",
      detalle:
        "B.O. 22/9/2025. Promulga la ley y, en sus considerandos y su art. 2°, la declara suspendida en su ejecución por el art. 5° de la Ley 24.629 hasta que el Congreso determine las fuentes de financiamiento.",
    },
    {
      nombre: "Decreto 84/2026 — reglamentación de la Ley 27.793 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/422915/norma.htm",
      detalle:
        "B.O. 4/2/2026. Sus considerandos relatan la sentencia del Juzgado Federal de Campana del 12/12/2025 que invalidó el art. 2° del Decreto 681/25 y ordenó aplicar la ley, y que la apelación del Estado se concedió con efecto devolutivo. Su Anexo I resuelve el artículo 17 con dos palabras: «Sin reglamentar».",
    },
    {
      nombre: "Ley 27.541, arts. 19 y 22 — alícuotas y detracción vigentes (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/333564/texact.htm",
      detalle:
        "Fija el 20,40% y el 18% con destino a los cuatro subsistemas alcanzados por la exención, y la detracción fija de $7.003,68 por trabajador. NO sustituyó el texto del Decreto 814/2001, que por eso sigue exhibiendo el 19,50% del art. 165 de la Ley 27.430.",
    },
    {
      nombre: "Ley 22.431, art. 23 — deducción del 70% en Ganancias (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/20620/texact.htm",
      detalle:
        "El segundo beneficio, acumulable con el anterior porque el propio art. 87 lo declara «independiente». Es a opción del contribuyente entre Ganancias y capitales, y se computa al cierre de cada período fiscal.",
    },
    {
      nombre: "Ley 23.660, art. 16 inc. a) — la contribución que el beneficio no toca (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm",
      detalle:
        "El 6% de obra social a cargo del empleador. Queda fuera de los cuatro subsistemas del art. 87 y se sigue pagando entero.",
    },
  ],
};
