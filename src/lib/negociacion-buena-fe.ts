// Motor de la página de negociación colectiva de buena fe. Funciones puras, sin fetch.
//
// ⚠️ ENCUADRE — esto NO liquida una condena. El inciso e) del art. 4° de la Ley 23.546 fija un
// TECHO («una multa de hasta un máximo equivalente al veinte por ciento (20%)»), no un importe.
// Cuánto aplica el juez dentro de ese techo no está en la ley. Lo que sí es aritmética verificable
// es el techo mismo, los incrementos por mora y las fechas de los plazos — y es lo que se calcula.
//
// LAS DOS AMBIGÜEDADES DEL INCISO, QUE SE MUESTRAN EN VEZ DE RESOLVERSE:
//
//   1. **«Se incrementará en un diez por ciento (10%) por cada cinco (5) días de mora».** No dice
//      si ese 10% se aplica siempre sobre el importe original (acumulación simple) o sobre el
//      importe ya incrementado (compuesto). Las dos lecturas son defendibles y dan números
//      distintos apenas pasan un par de semanas. Se calculan las dos.
//   2. **«En el supuesto de reincidencia el máximo previsto en el presente inciso podrá elevarse
//      hasta el equivalente al cien por ciento (100%) de esos montos».** Lo que sube es el máximo
//      del inciso —del 20% al 100% de la masa salarial—, y el texto no aclara si los incrementos
//      por mora quedan adentro de ese techo o corren por encima. El resultado publica el techo y
//      el importe acumulado por separado, sin inventar una regla de tope.
//
// LAS FECHAS SÍ TIENEN UNA SOLA LECTURA, y eso es un lujo: el art. 8° de esta ley —que la reforma
// no tocó— dice que «los plazos a que se refiere esta Ley se computarán en días hábiles
// administrativos». No hay que elegir entre corridos y hábiles como en la Ley 14.786.

import { REGLAS } from "@/data/negociacion-buena-fe";
import { anioCompleto, esHabil } from "@/lib/feriados";
import { aISO, parseFechaISO, sumarDias } from "@/lib/licencias";

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoMulta = {
  /** Masa salarial mensual del ámbito personal de la negociación. */
  masaSalarial: number;
  /** Techo de la multa según el inciso: 20%, o 100% si hay reincidencia. */
  topePorcentaje: number;
  /** Ese techo llevado a pesos. */
  topeImporte: number;
  /** Bloques completos de cinco días de mora. */
  bloquesDeMora: number;
  /** Techo con los incrementos acumulados de forma simple (10% del original por bloque). */
  conMoraSimple: number;
  /** Lo mismo, capitalizando cada incremento sobre el importe ya incrementado. */
  conMoraCompuesta: number;
  /** True si los actos cesaron dentro de los diez días y el juez puede eliminar la multa. */
  puedeEliminarse: boolean;
  avisos: Aviso[];
};

export function calcularMulta(params: {
  /** Masa salarial del mes del hecho, de los trabajadores del ámbito personal de la negociación. */
  masaSalarial: number;
  /** Días de mora en acatar la decisión judicial. */
  diasDeMora: number;
  reincidencia: boolean;
  /** Si los actos cesaron dentro del plazo de diez días que fija la sentencia. */
  cesoEnDiez: boolean;
}): ResultadoMulta | null {
  const { masaSalarial, diasDeMora, reincidencia, cesoEnDiez } = params;
  if (!(masaSalarial > 0)) return null;
  if (!(diasDeMora >= 0)) return null;

  const topePorcentaje = reincidencia
    ? REGLAS.topeReincidenciaPorcentaje
    : REGLAS.topePorcentaje;
  const topeImporte = (masaSalarial * topePorcentaje) / 100;

  const bloquesDeMora = Math.floor(diasDeMora / REGLAS.incrementoCadaDias);
  const paso = REGLAS.incrementoPorcentaje / 100;
  const conMoraSimple = topeImporte * (1 + paso * bloquesDeMora);
  const conMoraCompuesta = topeImporte * Math.pow(1 + paso, bloquesDeMora);

  const avisos: Aviso[] = [];

  avisos.push({
    tono: "bloqueante",
    texto:
      "Esto es un techo, no una condena. El inciso dice «una multa de hasta un máximo equivalente al veinte por ciento (20%)»: fija el máximo y deja el importe concreto al juez. Ninguna página puede anticipar cuánto va a aplicar dentro de ese margen.",
  });

  if (cesoEnDiez) {
    avisos.push({
      tono: "ok",
      texto: `Si los actos que dieron origen a la acción cesan dentro de los ${REGLAS.diasParaEliminar} días que la sentencia debe fijar, el juez puede eliminar la multa entera. Con el texto anterior al 6 de marzo de 2026 sólo podía reducirla hasta el 50%, y el plazo lo fijaba él.`,
    });
  } else {
    avisos.push({
      tono: "atencion",
      texto: `El plazo para que cesen los actos y la multa pueda eliminarse es de ${REGLAS.diasParaEliminar} días, y la decisión judicial «debe» establecerlo. Antes del 6 de marzo de 2026 cumplir a tiempo sólo permitía una quita de hasta el 50%: hoy permite que no quede nada.`,
    });
  }

  if (bloquesDeMora > 0) {
    avisos.push({
      tono: "atencion",
      texto: `El inciso dice que el importe «se incrementará en un ${REGLAS.incrementoPorcentaje}% por cada ${REGLAS.incrementoCadaDias} días de mora», pero no aclara si ese porcentaje se calcula siempre sobre el importe original o sobre el ya incrementado. Por eso se muestran las dos cuentas: con ${bloquesDeMora} bloque(s) de mora la diferencia entre una y otra ya es visible.`,
    });
  }

  if (reincidencia) {
    avisos.push({
      tono: "atencion",
      texto: `En caso de reincidencia el máximo del inciso «podrá elevarse hasta el equivalente al ${REGLAS.topeReincidenciaPorcentaje}% de esos montos». Lo que sube es el techo, del ${REGLAS.topePorcentaje}% al ${REGLAS.topeReincidenciaPorcentaje}% de la masa salarial del mes; el texto no dice si los incrementos por mora quedan dentro de ese techo o se suman por encima, así que acá se informan por separado.`,
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "La base es «el total de la masa salarial del mes en que se produzca el hecho, correspondiente a los trabajadores comprendidos en el ámbito personal de la negociación». No es la nómina entera de la empresa ni la del sindicato: es la del ámbito que se está negociando.",
  });

  avisos.push({
    tono: "atencion",
    texto:
      "Además de la multa, el juez puede aplicar a pedido de parte las sanciones conminatorias del artículo 804 del Código Civil y Comercial. El texto anterior remitía al artículo 666 bis del Código Civil, ya derogado: la reforma actualizó la remisión.",
  });

  return {
    masaSalarial,
    topePorcentaje,
    topeImporte,
    bloquesDeMora,
    conMoraSimple,
    conMoraCompuesta,
    puedeEliminarse: cesoEnDiez,
    avisos,
  };
}

export type Plazo = {
  titulo: string;
  fecha: string | null;
  norma: string;
  detalle: string;
};

/** Suma días hábiles administrativos: no cuentan sábados, domingos ni feriados. */
function sumarHabilesAdministrativos(desde: Date, dias: number): Date {
  let d = desde;
  let faltan = dias;
  for (let i = 0; i < dias * 3 + 30 && faltan > 0; i++) {
    d = sumarDias(d, 1);
    if (esHabil(d, false)) faltan--;
  }
  return d;
}

export type ResultadoPlazos = {
  plazos: Plazo[];
  /** True si el calendario de feriados no cubre todo el período consultado. */
  calendarioIncompleto: boolean;
};

export function calcularPlazos(params: {
  /** Día en que se recibió la notificación del art. 2° (la que abre la negociación). */
  fechaNotificacionISO: string;
  /** Día en que se recibió la solicitud de homologación, si ya se presentó. */
  fechaSolicitudHomologacionISO?: string;
}): ResultadoPlazos | null {
  const inicio = parseFechaISO(params.fechaNotificacionISO);
  if (!inicio) return null;

  const solicitud = params.fechaSolicitudHomologacionISO
    ? parseFechaISO(params.fechaSolicitudHomologacionISO)
    : null;

  // La ventana que hay que tener cargada es la que el cómputo puede llegar a tocar: en el peor
  // caso, el doble de días del plazo más un colchón de feriados encadenados. Mirar un año entero
  // de más apagaba el cálculo en septiembre porque el calendario del año siguiente todavía no
  // está publicado — y ese año nunca se alcanza.
  const finPosible = sumarDias(
    solicitud && solicitud > inicio ? solicitud : inicio,
    Math.max(REGLAS.diasComisionNegociadora, REGLAS.diasHomologacion) * 2 + 20,
  );
  let calendarioIncompleto = false;
  for (let a = inicio.getUTCFullYear(); a <= finPosible.getUTCFullYear(); a++) {
    if (!anioCompleto(a)) calendarioIncompleto = true;
  }

  const comision = calendarioIncompleto
    ? null
    : sumarHabilesAdministrativos(inicio, REGLAS.diasComisionNegociadora);
  const homologacion =
    solicitud && !calendarioIncompleto
      ? sumarHabilesAdministrativos(solicitud, REGLAS.diasHomologacion)
      : null;

  const plazos: Plazo[] = [
    {
      titulo: "Se recibe la notificación que abre la negociación",
      fecha: aISO(inicio),
      norma: "Art. 2° de la Ley 23.546",
      detalle:
        "La comunicación por escrito de la parte que promueve la negociación, con la representación que inviste, el alcance personal y territorial de la convención pretendida y las materias a negociar.",
    },
    {
      titulo: "Vence el plazo para constituir la comisión negociadora",
      fecha: comision ? aISO(comision) : null,
      norma: "Art. 4° de la Ley 23.546 + art. 8° (días hábiles administrativos)",
      detalle: `${REGLAS.diasComisionNegociadora} días hábiles administrativos desde la recepción de la notificación. Quién integra la representación sindical depende del nivel: por empresa o por región, el sindicato de primer grado o de empresa con personería gremial en ese ámbito; por actividad, la federación u organización gremial de primer grado con alcance nacional.`,
    },
  ];

  if (solicitud) {
    plazos.push(
      {
        titulo: "Se recibe la solicitud de homologación o registración",
        fecha: aISO(solicitud),
        norma: "Art. 6° de la Ley 23.546",
        detalle:
          "Desde acá corre el plazo de la Autoridad de Aplicación para homologar o registrar la convención.",
      },
      {
        titulo: "Vence el plazo de homologación (y puede operar la tácita)",
        fecha: homologacion ? aISO(homologacion) : null,
        norma: "Art. 6° de la Ley 23.546 + art. 8°",
        detalle: `${REGLAS.diasHomologacion} días hábiles administrativos. Pasado el plazo se considera tácitamente homologada, pero desde el 6 de marzo de 2026 con una condición nueva: «sin que existan observaciones a cumplir por las partes». Si quedaron observaciones pendientes, el silencio ya no homologa.`,
      },
    );
  }

  return { plazos, calendarioIncompleto };
}
