import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Calculadora de horas trabajadas",
    title: tituloQueEntre(`Calculadora de horas trabajadas en ${ctx.nombrePais}`, `Horas trabajadas en ${ctx.nombrePais}`, "Calculadora de horas trabajadas"),
    description: t(
      "Suma tus horas trabajadas de la semana con entrada, salida y pausa, y calcula cuánto te corresponde cobrar con horas extra incluidas.",
      "Sume sus horas trabajadas de la semana con entrada, salida y pausa, y calcule cuánto le corresponde cobrar con horas extra incluidas.",
      "Sumá tus horas trabajadas de la semana con entrada, salida y pausa, y calculá cuánto te corresponde cobrar con horas extra incluidas.",
    ),
    intro: [
      t(
        "Elige la hora de entrada y de salida de cada día, la pausa sin goce y lo que cobras por hora. Te mostramos el total de horas, las extra y el pago de la semana.",
        "Elija la hora de entrada y de salida de cada día, la pausa sin goce y lo que cobra por hora. Le mostramos el total de horas, las extra y el pago de la semana.",
        "Elegí la hora de entrada y de salida de cada día, la pausa sin goce y lo que cobrás por hora. Te mostramos el total de horas, las extra y el pago de la semana.",
      ),
      "Sirve para controlar el recibo de sueldo, armar una planilla de horas o cobrar un trabajo por hora.",
    ],
    comoSeCalcula: [
      "Horas del día = salida − entrada − pausa. Si la salida es antes que la entrada, el turno termina al día siguiente.",
      "Horas extra = total de la semana − horas normales, si el total las supera.",
      "Pago = horas normales × pago por hora + horas extra × pago por hora × (1 + recargo).",
    ],
    ejemplo: [
      `De ${hora("09:00")} a ${hora("17:30")} con 30 minutos de pausa son ${n(jornada)} horas por día. De lunes a viernes, ${n(jornada * 5)} horas: a ${m(pago)} la hora, ${m(jornada * 5 * pago)}.`,
      `De ${hora("08:00")} a ${hora("18:00")} con una hora de pausa son ${n(larga * 5)} horas en la semana: ${n(extra)} son extra. Con un recargo del 50 %, se cobran ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo se calculan las horas trabajadas?",
        respuesta: "Se resta la hora de entrada a la de salida y se descuenta la pausa. Después se suman todos los días de la semana.",
      },
      {
        pregunta: "¿Cómo paso los minutos a horas decimales?",
        respuesta: `Se dividen los minutos por 60. Media hora es ${n(0.5, 1)}; 15 minutos, ${n(0.25, 2)}; 45 minutos, ${n(0.75, 2)}. Así 7 horas y 45 minutos son ${n(7.75, 2)} horas.`,
      },
      {
        pregunta: "¿Cuántas horas extra se pueden hacer y cuánto se pagan?",
        respuesta: t(
          "Depende de la ley de tu país y de tu convenio. Esta calculadora usa el recargo y las horas normales que escribas, sin aplicar ninguna norma en particular.",
          "Depende de la ley de su país y de su convenio. Esta calculadora usa el recargo y las horas normales que escriba, sin aplicar ninguna norma en particular.",
          "Depende de la ley de tu país y de tu convenio. Esta calculadora usa el recargo y las horas normales que escribas, sin aplicar ninguna norma en particular.",
        ),
      },
    ],
    glosario: [
      { termino: "Horas extra", definicion: "Las horas trabajadas por encima de la jornada normal, que se pagan con recargo." },
      { termino: "Recargo", definicion: "El porcentaje que se suma al valor de la hora normal." },
    ],
  };
};
