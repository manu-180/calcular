import {
  JORNADA_INSALUBRE_DIARIA,
  JORNADA_INSALUBRE_SEMANAL,
  JORNADA_MAXIMA_DIARIA,
  JORNADA_MAXIMA_SEMANAL,
  PAUSA_ENTRE_JORNADAS,
  RECARGO_COMUN,
  SEMANAS_POR_MES,
} from "@/data/trabajo-mujeres";

// Qué calcula esta página, y por qué no es otra calculadora de horas extras.
//
// La derogación del art. 174 de la LCT (descanso de dos horas al mediodía) no cambia cuántas
// HORAS SE TRABAJAN: los topes de jornada nunca estuvieron en ese artículo, están en el 196 (que
// remite a la Ley 11.544) y valen igual. Lo que cambia es la AMPLITUD de la jornada: el tiempo
// total que la persona pasa afuera de su casa entre la primera entrada y la última salida. Ese
// número —el que decide si llegás a buscar a un chico al colegio— no lo publica nadie, porque no
// aparece en ningún recibo.
//
//   amplitud con jornada partida = horas trabajadas + descanso del mediodía
//   amplitud con horario continuo = horas trabajadas
//
// Por eso el resultado principal es la diferencia de amplitud (por día, por semana y por mes), y
// no un importe. La plata sólo aparece cuando el horario nuevo, además de sacar el descanso, SUMA
// horas por encima del tope legal: ahí sí son horas suplementarias con el recargo del 50% del
// art. 201, y se valorizan con el valor de la hora normal (sueldo mensual ÷ jornada × 52/12). El
// cálculo fino de las extras vive en /horas-extras: acá sólo se avisa y se muestra el orden de
// magnitud, para no publicar dos veces el mismo número con dos criterios distintos.
//
// El tope aplicable depende de UNA declaración administrativa, no de la tarea: el art. 200 dice
// que «la insalubridad no existirá sin declaración previa de la autoridad de aplicación». Por eso
// el formulario pregunta si está DECLARADA y no si la tarea "es" insalubre — y si no lo está, el
// tope que corre es el general de 8 y 48, aunque el trabajo sea pesado.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoTrabajoMujeres = {
  /** Horas efectivamente trabajadas por día y por semana, según lo cargado. */
  horasDiarias: number;
  horasSemanales: number;
  /** Amplitud diaria con el descanso del mediodía (lo que regía hasta el 6/3/2026). */
  amplitudAntes: number;
  /** Amplitud diaria con horario continuo (lo que puede disponer hoy el empleador). */
  amplitudAhora: number;
  /** Horas de permanencia que se liberan: por día, por semana y por mes. */
  liberadasPorDia: number;
  liberadasPorSemana: number;
  liberadasPorMes: number;
  /** Topes que rigen el caso (art. 196 o art. 200 según la declaración de insalubridad). */
  topeDiario: number;
  topeSemanal: number;
  /** Régimen aplicado, para que la página no tenga que re-derivarlo. */
  regimen: "general" | "insalubre";
  /** Excedente sobre el tope, en horas por semana (0 si no hay). */
  excedenteSemanal: number;
  /** Valor de la hora normal (sueldo mensual ÷ horas mensuales). 0 si no se cargó sueldo. */
  valorHora: number;
  /** Lo que valdrían esas horas excedentes en un mes, ya con el recargo del art. 201. */
  excedenteMensualEnPesos: number;
  avisos: Aviso[];
};

const redondear = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

export function calcularTrabajoMujeres(params: {
  /** Horas efectivamente trabajadas por día. */
  horasDiarias: number;
  /** Días trabajados por semana. */
  diasPorSemana: number;
  /** Duración del descanso del mediodía que se pierde, en horas (el art. 174 fijaba 2). */
  descansoMediodia: number;
  /** ¿La autoridad de aplicación declaró insalubre la tarea o el lugar? (art. 200) */
  insalubreDeclarada: boolean;
  /** ¿El descanso está previsto en el convenio colectivo o en el contrato individual? (art. 8) */
  enConvenio: boolean;
  /** Remuneración mensual bruta, sólo para valorizar el excedente. Opcional. */
  sueldoMensual?: number;
}): ResultadoTrabajoMujeres {
  const horasDiarias = Math.max(0, params.horasDiarias || 0);
  const diasPorSemana = Math.max(0, params.diasPorSemana || 0);
  const descanso = Math.max(0, params.descansoMediodia || 0);
  const sueldo = Math.max(0, params.sueldoMensual || 0);

  const horasSemanales = horasDiarias * diasPorSemana;

  const amplitudAntes = horasDiarias + descanso;
  const amplitudAhora = horasDiarias;
  const liberadasPorDia = amplitudAntes - amplitudAhora;
  const liberadasPorSemana = liberadasPorDia * diasPorSemana;
  const liberadasPorMes = liberadasPorSemana * SEMANAS_POR_MES;

  const regimen: "general" | "insalubre" = params.insalubreDeclarada ? "insalubre" : "general";
  const topeDiario = params.insalubreDeclarada ? JORNADA_INSALUBRE_DIARIA : JORNADA_MAXIMA_DIARIA;
  const topeSemanal = params.insalubreDeclarada
    ? JORNADA_INSALUBRE_SEMANAL
    : JORNADA_MAXIMA_SEMANAL;

  const excedenteSemanal = Math.max(0, horasSemanales - topeSemanal);

  // Valor de la hora normal: el divisor es la jornada REALMENTE pactada, no el tope legal, porque
  // quien trabaja menos horas por el mismo sueldo tiene una hora más cara.
  const horasMensuales = horasSemanales > 0 ? horasSemanales * SEMANAS_POR_MES : 0;
  const valorHora = horasMensuales > 0 ? sueldo / horasMensuales : 0;
  const excedenteMensualEnPesos =
    excedenteSemanal * SEMANAS_POR_MES * valorHora * (1 + RECARGO_COMUN);

  const avisos: Aviso[] = [];

  if (params.enConvenio) {
    avisos.push({
      tono: "ok",
      texto:
        "Si el descanso al mediodía está escrito en el convenio colectivo o en tu contrato, la derogación de la ley no lo borra: el art. 8 de la LCT dice que las convenciones con normas más favorables «serán válidas y de aplicación». Lo que cayó es el piso legal, no la cláusula.",
    });
  } else {
    avisos.push({
      tono: "atencion",
      texto:
        "Sin cláusula en el convenio ni en el contrato, no queda pausa legal obligatoria al mediodía: desde el 6 de marzo de 2026 la distribución de las horas es facultad del empleador (art. 197) dentro de los topes de jornada.",
    });
  }

  if (params.insalubreDeclarada) {
    avisos.push({
      tono: "atencion",
      texto:
        "Con insalubridad declarada por la autoridad de aplicación, la jornada no puede pasar de 6 horas diarias ni de 36 semanales (art. 200), y el propio artículo aclara que esa reducción no importa disminución de las remuneraciones.",
    });
    avisos.push({
      tono: "bloqueante",
      texto:
        "Ojo con el art. 176 derogado: además de prohibir la tarea, remitía al art. 195, que presume —sin admitir prueba en contrario— que el accidente o la enfermedad causados por una tarea prohibida son responsabilidad del empleador. Al caer el 176 cayó esa presunción para el trabajo de mujeres: hoy hay que probar la responsabilidad por la vía común.",
    });
  } else {
    avisos.push({
      tono: "atencion",
      texto:
        "La insalubridad no existe sin declaración previa de la autoridad de aplicación (art. 200). Mientras no esté declarada, el tope que corre es el general de 8 horas diarias y 48 semanales, por pesada que sea la tarea.",
    });
  }

  if (horasDiarias > topeDiario) {
    avisos.push({
      tono: "bloqueante",
      texto: `La jornada diaria cargada (${redondear(horasDiarias)} h) supera el tope de ${topeDiario} horas del régimen ${regimen === "insalubre" ? "de tareas insalubres (art. 200)" : "general (art. 196 y Ley 11.544)"}.`,
    });
  }

  if (excedenteSemanal > 0) {
    avisos.push({
      tono: "bloqueante",
      texto: `Hay ${redondear(excedenteSemanal)} hora(s) por semana por encima del tope de ${topeSemanal}: son horas suplementarias y se pagan con el recargo del 50% del art. 201 (100% después de las 13 del sábado, domingos y feriados). Sacar el descanso del mediodía no habilita a estirar la jornada.`,
    });
  }

  if (amplitudAhora + PAUSA_ENTRE_JORNADAS > 24) {
    avisos.push({
      tono: "bloqueante",
      texto: `Entre el cese de una jornada y el comienzo de la otra tiene que mediar una pausa no inferior a ${PAUSA_ENTRE_JORNADAS} horas (arts. 197 y 198). Con esta amplitud no entra en el día.`,
    });
  }

  return {
    horasDiarias: redondear(horasDiarias),
    horasSemanales: redondear(horasSemanales),
    amplitudAntes: redondear(amplitudAntes),
    amplitudAhora: redondear(amplitudAhora),
    liberadasPorDia: redondear(liberadasPorDia),
    liberadasPorSemana: redondear(liberadasPorSemana),
    liberadasPorMes: redondear(liberadasPorMes, 1),
    topeDiario,
    topeSemanal,
    regimen,
    excedenteSemanal: redondear(excedenteSemanal),
    valorHora: redondear(valorHora),
    excedenteMensualEnPesos: redondear(excedenteMensualEnPesos),
    avisos,
  };
}
