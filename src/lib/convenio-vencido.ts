import {
  type Ambito,
  PLAZO_ART_137,
  VIGENCIA_DNU_70_ISO,
  VIGENCIA_REFORMA_ISO,
} from "@/data/convenio-vencido";

// Las dos reglas de la Ley 14.250 que se pueden APLICAR sin doctrina, y por eso son las dos que
// esta calculadora resuelve:
//
//   1. **Art. 6 — qué sobrevive a un convenio vencido.** La ley parte las cláusulas en dos y les da
//      destinos distintos: las normativas siguen hasta que haya convenio nuevo, las obligacionales
//      caen salvo acuerdo de partes. Lo que la función NO hace es encuadrar una cláusula concreta
//      en una de las dos cajas: eso es discusión judicial. Lo que sí hace —y es lo que nadie
//      publica— es aplicar el texto que regía EN la fecha que se consulta, porque entre el
//      21/12/2023 y el 5/3/2026 rigió otro, más chico.
//
//   2. **Art. 19 — cuál de dos convenios prevalece.** Acá no hay nada que interpretar: el texto
//      vigente resuelve por ÁMBITO, y el anterior resolvía por FAVORABILIDAD. Dos reglas
//      incompatibles, y la fecha decide cuál corre. El resultado suele darse vuelta.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

/** Qué redacción del art. 6 regía en una fecha. */
export function regimenEn(fechaIso: string): "vigente" | "dnu70" | "original" {
  if (fechaIso >= VIGENCIA_REFORMA_ISO) return "vigente";
  if (fechaIso >= VIGENCIA_DNU_70_ISO) return "dnu70";
  return "original";
}

export type Clausula = {
  clave: string;
  etiqueta: string;
  tipo: "normativa" | "obligacional";
  /** Por qué cae de ese lado, con el anclaje en el texto de la ley. */
  porQue: string;
  /** true si la Ley 27.802 cambió el resultado respecto del texto del DNU 70/2023. */
  cambiaConLaReforma: boolean;
};

/**
 * Las cláusulas típicas, encuadradas con el criterio del art. 6 —«condiciones y beneficios
 * individuales directos del trabajo y los beneficios otorgados para el trabajador»— y no con una
 * clasificación doctrinaria propia. Las obligacionales son las que la ley define por resta: las
 * que obligan a las partes SIGNATARIAS entre sí, no al trabajador individual.
 */
export const CLAUSULAS: Clausula[] = [
  {
    clave: "escala",
    etiqueta: "Escala salarial y básicos de convenio",
    tipo: "normativa",
    porQue:
      "Es una condición del trabajo del art. 6 en las dos redacciones: fija lo que cobra cada trabajador por su categoría.",
    cambiaConLaReforma: false,
  },
  {
    clave: "jornada",
    etiqueta: "Jornada, francos y descansos del convenio",
    tipo: "normativa",
    porQue: "Condición de trabajo en sentido estricto: define cómo y cuándo se presta la tarea.",
    cambiaConLaReforma: false,
  },
  {
    clave: "categorias",
    etiqueta: "Categorías profesionales y encuadre",
    tipo: "normativa",
    porQue: "Determina la condición individual de cada trabajador dentro del convenio.",
    cambiaConLaReforma: false,
  },
  {
    clave: "antiguedad",
    etiqueta: "Adicionales por antigüedad, presentismo, título",
    tipo: "normativa",
    porQue:
      "Son beneficios individuales directos: los cobra el trabajador por su propia situación, no la asociación.",
    cambiaConLaReforma: false,
  },
  {
    clave: "beneficio",
    etiqueta: "Beneficios otorgados al trabajador (guardería, ropa, refrigerio, ayuda escolar)",
    tipo: "normativa",
    porQue:
      "Es justamente lo que el art. 131 de la Ley 27.802 AGREGÓ al texto: «los beneficios otorgados para el trabajador». Bajo la redacción del DNU 70/2023, que sólo hablaba de «condiciones de trabajo», su supervivencia era discutible.",
    cambiaConLaReforma: true,
  },
  {
    clave: "licencias",
    etiqueta: "Licencias convencionales por encima de la LCT",
    tipo: "normativa",
    porQue:
      "Beneficio individual directo del trabajador. Ojo: el piso de la LCT rige igual, con convenio o sin él.",
    cambiaConLaReforma: false,
  },
  {
    clave: "aportes",
    etiqueta: "Aportes y contribuciones a la asociación o a la cámara",
    tipo: "obligacional",
    porQue:
      "No es un beneficio individual directo del trabajador: obliga al empleador frente a una entidad. Además tiene tope propio en el art. 9° (0,5% empleadores, 2% trabajadores).",
    cambiaConLaReforma: false,
  },
  {
    clave: "paritaria",
    etiqueta: "Comisiones paritarias y mecanismos de autocomposición",
    tipo: "obligacional",
    porQue: "Regula la relación entre las partes signatarias, no la del trabajador con su empleador.",
    cambiaConLaReforma: false,
  },
  {
    clave: "paz",
    etiqueta: "Cláusula de paz social y compromisos de no conflicto",
    tipo: "obligacional",
    porQue: "Es un compromiso de las partes firmantes entre sí: el caso de manual de lo obligacional.",
    cambiaConLaReforma: false,
  },
  {
    clave: "sindical",
    etiqueta: "Cartelera, local sindical, licencias gremiales, delegados por encima de la ley",
    tipo: "obligacional",
    porQue:
      "Facilita la acción de la asociación, no es un beneficio individual directo. Y el art. 132 sacó del art. 7° el párrafo que validaba especialmente estas cláusulas.",
    cambiaConLaReforma: false,
  },
];

export type ResultadoUltraactividad = {
  clausula: Clausula;
  fechaIso: string;
  regimen: "vigente" | "dnu70" | "original";
  /** ¿Sigue aplicándose después del vencimiento? */
  sobrevive: boolean;
  /** Sólo para las obligacionales: qué haría falta para que siguieran. */
  condicion: string | null;
  avisos: Aviso[];
};

export function evaluarUltraactividad(
  claveClausula: string,
  fechaIso: string,
  hayAcuerdoDePartes: boolean,
  hayConvenioNuevo: boolean,
): ResultadoUltraactividad | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaIso)) return null;
  const clausula = CLAUSULAS.find((c) => c.clave === claveClausula);
  if (!clausula) return null;

  const regimen = regimenEn(fechaIso);
  const avisos: Aviso[] = [];

  // Con convenio nuevo homologado no hay ultraactividad que discutir: rige el nuevo, y punto.
  if (hayConvenioNuevo) {
    avisos.push({
      tono: "ok",
      texto:
        "Si ya entró en vigencia una convención colectiva nueva, la ultraactividad terminó: el art. 6 la sostiene «hasta tanto entre en vigencia una nueva convención colectiva». Lo que te aplica es el convenio nuevo.",
    });
    return { clausula, fechaIso, regimen, sobrevive: false, condicion: null, avisos };
  }

  const normativa = clausula.tipo === "normativa";
  const sobrevive = normativa || hayAcuerdoDePartes;

  if (normativa) {
    avisos.push({
      tono: "ok",
      texto:
        "Es una cláusula normativa: el art. 6 la mantiene subsistente aunque el convenio esté vencido, hasta que haya convenio nuevo o un acuerdo de partes que lo prorrogue.",
    });
    if (clausula.cambiaConLaReforma && regimen === "dnu70")
      avisos.push({
        tono: "atencion",
        texto:
          "Para esa fecha regía el texto del DNU 70/2023, que sólo dejaba subsistentes «las condiciones de trabajo». Los beneficios otorgados al trabajador entraron recién con el art. 131 de la Ley 27.802: antes del 6/3/2026 su supervivencia era discutible.",
      });
    if (clausula.cambiaConLaReforma && regimen === "vigente")
      avisos.push({
        tono: "ok",
        texto:
          "Esto lo sumó la reforma: donde el texto anterior decía sólo «condiciones de trabajo», el vigente agrega «y beneficios individuales directos del trabajo y los beneficios otorgados para el trabajador».",
      });
  } else {
    avisos.push({
      tono: hayAcuerdoDePartes ? "ok" : "bloqueante",
      texto: hayAcuerdoDePartes
        ? "Es una cláusula obligacional, y con acuerdo de partes mantiene su vigencia: es la única vía que dejó el texto vigente."
        : "Es una cláusula obligacional: vencido el convenio, cae. El art. 6 vigente la sostiene «sólo por acuerdo de partes».",
    });
    if (regimen === "dnu70")
      avisos.push({
        tono: "atencion",
        texto:
          "Para esa fecha había una segunda vía que hoy no existe: el texto del DNU 70/2023 admitía además «la específica prórroga dispuesta por el Poder Ejecutivo Nacional». La Ley 27.802 la eliminó.",
      });
    else if (regimen === "vigente" && !hayAcuerdoDePartes)
      avisos.push({
        tono: "atencion",
        texto:
          "Antes del 6/3/2026 el Poder Ejecutivo podía prorrogarlas por decreto. Ya no: el texto vigente dice «sólo por acuerdo de partes».",
      });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "El encuadre de una cláusula concreta como normativa u obligacional se discute en cada caso: la ley da el criterio, no la lista. Acá se aplica el criterio del art. 6, no una clasificación propia.",
  });

  if (regimen === "original")
    avisos.push({
      tono: "atencion",
      texto:
        "Esa fecha es anterior al 21/12/2023: regía el texto original del t.o. 2004, que esta página no resuelve porque la reforma que le importa a alguien hoy es la de 2026.",
    });

  return {
    clausula,
    fechaIso,
    regimen,
    sobrevive,
    condicion: normativa ? null : "acuerdo de partes que prorrogue la cláusula (art. 6, texto vigente)",
    avisos,
  };
}

export type ResultadoPrelacion = {
  fechaIso: string;
  /** Qué convenio prevalece con la regla que rige en esa fecha. */
  prevalece: Ambito | "depende";
  regla: string;
  /** Qué habría pasado con la otra redacción — el corazón de la página. */
  contraste: string;
  avisos: Aviso[];
};

/**
 * Art. 19: cuál de dos convenios prevalece. `menorEsPosterior` sólo importa bajo el texto anterior,
 * donde la regla miraba cuál era posterior; el vigente resuelve por ámbito, «anterior o posterior».
 */
export function evaluarPrelacion(
  fechaIso: string,
  menorEsPosterior: boolean,
  menorEsMasFavorable: boolean,
): ResultadoPrelacion | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaIso)) return null;
  const reformado = fechaIso >= VIGENCIA_REFORMA_ISO;
  const avisos: Aviso[] = [];

  if (reformado) {
    avisos.push({
      tono: "ok",
      texto:
        "El texto vigente resuelve por ÁMBITO y nada más: «Un convenio de ámbito menor, prevalece, dentro de su ámbito de representación personal y territorial, frente a otro convenio de ámbito mayor, anterior o posterior».",
    });
    if (!menorEsMasFavorable)
      avisos.push({
        tono: "atencion",
        texto:
          "Prevalece igual aunque sea menos favorable: el test de favorabilidad entre convenios desapareció del art. 19. Lo que no desaparece es el piso de la ley ni el del contrato individual (art. 8).",
      });
    return {
      fechaIso,
      prevalece: "menor",
      regla: "Art. 19 inc. b), texto del art. 136 de la Ley 27.802: prevalece el de ámbito menor.",
      contraste: menorEsMasFavorable
        ? "Con el texto anterior el resultado habría sido el mismo, pero por otro motivo: porque era más favorable, no porque fuera de ámbito menor."
        : "Con el texto anterior habría prevalecido el de ámbito MAYOR: el de otro ámbito sólo desplazaba al anterior «en tanto establezca condiciones más favorables para el trabajador».",
      avisos,
    };
  }

  // Texto anterior (t.o. 2004): manda la favorabilidad, comparada por instituciones.
  avisos.push({
    tono: "ok",
    texto:
      "Para esa fecha regía el texto anterior: un convenio de ámbito distinto sólo modificaba al anterior «en tanto establezca condiciones más favorables para el trabajador», y la comparación debía hacerse «por instituciones» — institución por institución, no por el total.",
  });
  const prevalece: Ambito | "depende" = menorEsPosterior
    ? menorEsMasFavorable
      ? "menor"
      : "mayor"
    : "depende";
  if (!menorEsPosterior)
    avisos.push({
      tono: "atencion",
      texto:
        "El texto anterior resolvía mirando cuál era POSTERIOR. Si el de ámbito menor es el anterior, la regla del inc. b) no lo desplaza: sigue el de ámbito mayor salvo que se dé alguno de los supuestos de articulación del art. 18 en su redacción vieja.",
    });
  return {
    fechaIso,
    prevalece,
    regla: "Art. 19 inc. b), t.o. 2004: prevalece el posterior sólo si es más favorable, comparado por instituciones.",
    contraste:
      "Con el texto vigente el resultado sería directo: prevalece el de ámbito menor, sea anterior o posterior y sea o no más favorable.",
    avisos,
  };
}

/** Días que faltan para el vencimiento del plazo del art. 137, contado desde la promulgación. */
export function diasHastaPlazo137(hoyIso: string): number {
  const dia = 24 * 60 * 60 * 1000;
  return Math.round(
    (new Date(`${PLAZO_ART_137}T12:00:00Z`).getTime() - new Date(`${hoyIso}T12:00:00Z`).getTime()) / dia,
  );
}
