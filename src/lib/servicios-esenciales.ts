// Motor de la página de servicios esenciales y guardias mínimas. Funciones puras, sin fetch.
//
// ⚠️ ENCUADRE — esto NO autoriza ni desautoriza una medida de fuerza. Aplica dos reglas del texto
// oficial sobre datos que declara el usuario: (1) el piso de cobertura del art. 24 de la Ley
// 25.877 según la categoría de la actividad, y (2) el calendario que resulta de encadenar el
// plazo del art. 11 de la Ley 14.786 con los apartados 24.1, 24.2 y 24.4. Quién queda de guardia,
// con qué horarios y en qué funciones se acuerda ante la Autoridad de Aplicación (apartado 24.2):
// eso no lo puede calcular una página.
//
// LAS DOS DECISIONES DE DISEÑO QUE VALE LA PENA DEFENDER:
//
//   1. **El porcentaje es sobre «la prestación normal del servicio», no sobre la dotación.** El
//      artículo habla de la prestación, y en muchas actividades una cosa no es proporcional a la
//      otra (un turno de guardia puede sostener el 75% del servicio con menos del 75% de la
//      gente, o al revés). La calculadora aplica el piso a la dotación afectada porque es el único
//      número que el usuario tiene a mano, y el resultado lo dice con esas palabras.
//
//   2. **Los quince días del art. 11 se cuentan de las dos maneras.** El texto dice «quince días»
//      a secas; el art. 6 de la misma ley dice «10 días hábiles» cuando quiere decir hábiles. La
//      lectura literal es días corridos y es la que se muestra primero, pero la práctica
//      administrativa suele contarlos hábiles y eso mueve la fecha una semana. Publicar una sola
//      fecha sería elegir por el usuario en una cuestión que el texto no resuelve.
//
// TODA LA ARITMÉTICA DE FECHAS ES EN UTC, igual que en lib/licencias.ts y por la misma razón: con
// fechas locales, una zona horaria distinta corre un día entero.

import {
  ACTIVIDADES,
  PISOS,
  PLAZOS,
  type Actividad,
  type Categoria,
} from "@/data/servicios-esenciales";
import { anioCompleto, esHabil } from "@/lib/feriados";
import { aISO, parseFechaISO, sumarDias } from "@/lib/licencias";

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type Hito = {
  /** Qué pasa ese día. */
  titulo: string;
  /** Fecha contando los quince días del art. 11 como corridos (la lectura literal). */
  fechaCorridos: string;
  /** La misma fecha si esos quince días se cuentan hábiles. Null si el año no está completo. */
  fechaHabiles: string | null;
  /** La norma que fija el hito. */
  norma: string;
  detalle: string;
};

export type ResultadoServiciosEsenciales = {
  actividad: Actividad;
  categoria: Categoria;
  /** Piso de cobertura en porcentaje. Cero si la actividad no está enumerada. */
  piso: number;
  /** Piso aplicado a la dotación afectada, redondeado hacia arriba. */
  minimoDeGuardia: number;
  /** Cuántos pueden adherir a la medida sin perforar el piso. */
  puedenAdherir: number;
  /** Si el 6/3/2026 cambió la categoría de esta actividad. */
  cambioDeCategoria: boolean;
  /** Piso que tenía la actividad con el texto anterior, para contrastar. */
  pisoAntes: number;
  cronograma: Hito[];
  /** Si alguna fecha del cronograma no se pudo calcular en días hábiles. */
  habilesIncompleto: boolean;
  avisos: Aviso[];
};

/** Suma días hábiles (sábado NO hábil), saltando feriados y días no laborables. */
function sumarHabiles(desde: Date, dias: number): Date {
  let d = desde;
  let faltan = dias;
  // Cota dura: ningún tramo de feriados argentinos supera dos semanas seguidas.
  for (let i = 0; i < dias * 3 + 30 && faltan > 0; i++) {
    d = sumarDias(d, 1);
    if (esHabil(d, false)) faltan--;
  }
  return d;
}

/** True si el calendario de feriados está cargado para todos los años que toca el cronograma. */
function calendarioCubre(desde: Date, hasta: Date): boolean {
  for (let a = desde.getUTCFullYear(); a <= hasta.getUTCFullYear(); a++) {
    if (!anioCompleto(a)) return false;
  }
  return true;
}

export function calcularServiciosEsenciales(params: {
  actividadId: string;
  /** Trabajadores de la dotación afectada por la medida. */
  dotacion: number;
  /** Día en que la autoridad administrativa toma conocimiento del conflicto (art. 2 Ley 14.786). */
  fechaNotificacionISO: string;
  /** Si el conciliador usó la prórroga de cinco días del art. 11. */
  conProrroga: boolean;
}): ResultadoServiciosEsenciales | null {
  const { actividadId, dotacion, fechaNotificacionISO, conProrroga } = params;

  const actividad = ACTIVIDADES.find((a) => a.id === actividadId);
  if (!actividad) return null;

  const inicio = parseFechaISO(fechaNotificacionISO);
  if (!inicio) return null;
  if (!(dotacion > 0)) return null;

  const piso = PISOS[actividad.categoria];
  const pisoAntes = PISOS[actividad.categoriaAntes];
  const minimoDeGuardia = Math.ceil((dotacion * piso) / 100);
  const puedenAdherir = Math.max(0, dotacion - minimoDeGuardia);

  const diasConciliacion = PLAZOS.conciliacionDias + (conProrroga ? PLAZOS.prorrogaDias : 0);

  // Corridos: la lectura literal del art. 11.
  const finConciliacionC = sumarDias(inicio, diasConciliacion);
  const preavisoC = sumarDias(finConciliacionC, 1);
  const acuerdoC = sumarDias(preavisoC, PLAZOS.acuerdoDiasDespuesDelPreaviso);
  const medidaC = sumarDias(preavisoC, PLAZOS.preavisoDias);
  const avisoUsuariosC = sumarDias(medidaC, -Math.round(PLAZOS.avisoUsuariosHoras / 24));

  // Hábiles: la lectura de la práctica administrativa. Sólo el plazo del art. 11 se cuenta así;
  // los cinco días del apartado 24.1 los escribió la Ley 27.802 sin calificarlos, igual que el 11.
  const cubre = calendarioCubre(inicio, sumarDias(inicio, diasConciliacion * 2 + 20));
  const finConciliacionH = cubre ? sumarHabiles(inicio, diasConciliacion) : null;
  const preavisoH = finConciliacionH ? sumarDias(finConciliacionH, 1) : null;
  const acuerdoH = preavisoH ? sumarDias(preavisoH, PLAZOS.acuerdoDiasDespuesDelPreaviso) : null;
  const medidaH = preavisoH ? sumarDias(preavisoH, PLAZOS.preavisoDias) : null;
  const avisoUsuariosH = medidaH
    ? sumarDias(medidaH, -Math.round(PLAZOS.avisoUsuariosHoras / 24))
    : null;

  const cronograma: Hito[] = [
    {
      titulo: "La autoridad toma conocimiento del conflicto",
      fechaCorridos: aISO(inicio),
      fechaHabiles: aISO(inicio),
      norma: "Art. 2° de la Ley 14.786",
      detalle:
        "Antes de recurrir a medidas de acción directa, cualquiera de las partes debe comunicar el conflicto a la autoridad administrativa para formalizar la instancia obligatoria de conciliación. El Ministerio también puede intervenir de oficio.",
    },
    {
      titulo: `Vence el plazo de la conciliación${conProrroga ? " (con la prórroga de 5 días)" : ""}`,
      fechaCorridos: aISO(finConciliacionC),
      fechaHabiles: finConciliacionH ? aISO(finConciliacionH) : null,
      norma: "Art. 11 de la Ley 14.786",
      detalle: `Desde que la autoridad toma conocimiento hasta que pone fin a la gestión conciliatoria no pueden mediar más de ${PLAZOS.conciliacionDias} días, prorrogables por ${PLAZOS.prorrogaDias} más. Mientras ese plazo corre, el art. 8 prohíbe las medidas de acción directa.`,
    },
    {
      titulo: "Primer día en que se puede preavisar la medida",
      fechaCorridos: aISO(preavisoC),
      fechaHabiles: preavisoH ? aISO(preavisoH) : null,
      norma: "Apartado 24.1 (incorporado por el art. 102 de la Ley 27.802)",
      detalle:
        "El preaviso se hace recién «vencido el plazo de quince (15) días previsto en el artículo 11», a la otra parte y a la Autoridad de Aplicación, en forma fehaciente. Este apartado no existía antes del 6 de marzo de 2026.",
    },
    {
      titulo: "Acuerdo de servicios mínimos ante la Autoridad de Aplicación",
      fechaCorridos: aISO(acuerdoC),
      fechaHabiles: acuerdoH ? aISO(acuerdoH) : null,
      norma: "Apartado 24.2",
      detalle:
        "Dentro del día inmediato siguiente al preaviso hay que acordar qué servicios mínimos se mantienen, «señalando concreta y detalladamente» personal involucrado, pautas horarias, funciones y equipos. Si no se acuerda o lo acordado es insuficiente, los fija la Autoridad de Aplicación en consulta con la Comisión de Garantías (apartado 24.3).",
    },
    {
      titulo: "Aviso a los usuarios por medios de difusión masiva",
      fechaCorridos: aISO(avisoUsuariosC),
      fechaHabiles: avisoUsuariosH ? aISO(avisoUsuariosH) : null,
      norma: "Apartado 24.4",
      detalle: `${PLAZOS.avisoUsuariosHoras} horas antes del inicio de la medida hay que informar a los usuarios cómo va a funcionar el servicio: cuándo empieza, cuánto dura, cómo se distribuyen los servicios mínimos y cuándo se reactivan las prestaciones.`,
    },
    {
      titulo: "Fecha más temprana posible de la medida de acción directa",
      fechaCorridos: aISO(medidaC),
      fechaHabiles: medidaH ? aISO(medidaH) : null,
      norma: "Apartados 24.1 y 24.4 + art. 11 de la Ley 14.786",
      detalle:
        "Es el resultado de encadenar los tres plazos. Cualquier fecha posterior también sirve: lo que la ley fija son mínimos, no una fecha exacta.",
    },
  ];

  const avisos: Aviso[] = [];

  if (actividad.categoria === "no-listada") {
    avisos.push({
      tono: "atencion",
      texto:
        "Esta actividad no está enumerada en el artículo 24, así que la ley no le fija un piso de cobertura. Eso no significa que nunca vaya a tenerlo: la Autoridad de Aplicación, a propuesta de la Comisión de Garantías, puede calificarla como esencial o de importancia trascendental por resolución fundada si se da alguna de las cuatro circunstancias del artículo (peligro para la vida, la salud o la seguridad; servicio público de importancia trascendental o utilidad pública; crisis nacional aguda; o riesgo para el abastecimiento de productos críticos).",
    });
  }

  if (actividad.categoria === "seguridad") {
    avisos.push({
      tono: "bloqueante",
      texto:
        "El piso del 100% no deja margen: la cobertura tiene que ser igual a la prestación normal del servicio. Es una regla que el texto anterior no tenía.",
    });
  }

  if (actividad.categoriaAntes !== actividad.categoria) {
    avisos.push({
      tono: "atencion",
      texto: `Esta actividad cambió de categoría el 6 de marzo de 2026. ${actividad.cambio} Casi todas las notas que circulan reproducen la lista anterior, que rigió hasta el 5 de marzo de 2026.`,
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "El porcentaje del artículo 24 es sobre «la prestación normal del servicio», no sobre la dotación. Acá se aplica a los trabajadores afectados porque es el número que se tiene a mano, pero lo que se acuerda ante la Autoridad de Aplicación es la prestación: puede requerir más gente o menos que este cálculo según cómo esté organizado el servicio.",
  });

  avisos.push({
    tono: "atencion",
    texto: `Los ${PLAZOS.conciliacionDias} días del artículo 11 de la Ley 14.786 están escritos «quince días», sin decir si son hábiles o corridos. Que el legislador sabía distinguir lo prueba el artículo 6 de esa misma ley, que dice «10 días hábiles». Por eso el cronograma muestra las dos cuentas: la literal (corridos) y la de la práctica administrativa (hábiles).`,
  });

  avisos.push({
    tono: "bloqueante",
    texto:
      "Un paro nacional o una medida de una central sindical no queda afuera: el apartado 24.5 dice expresamente que se le aplican las mismas reglas. Y el 24.6 remite a las sanciones de las leyes 14.786, 23.551 y 25.212 para quien no cumpla el procedimiento.",
  });

  return {
    actividad,
    categoria: actividad.categoria,
    piso,
    minimoDeGuardia,
    puedenAdherir,
    cambioDeCategoria: actividad.categoriaAntes !== actividad.categoria,
    pisoAntes,
    cronograma,
    habilesIncompleto: !cubre,
    avisos,
  };
}
