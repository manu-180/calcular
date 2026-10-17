import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Calculadora de días fértiles y ovulación",
    title: tituloQueEntre(`Días fértiles y ovulación en ${ctx.nombrePais}`, `Ovulación en ${ctx.nombrePais}`, "Días fértiles y ovulación"),
    description: t(
      "Calcula tu día de ovulación, tus días fértiles y la fecha de tu próxima menstruación, con los próximos tres ciclos.",
      "Calcule su día de ovulación, sus días fértiles y la fecha de su próxima menstruación, con los próximos tres ciclos.",
      "Calculá tu día de ovulación, tus días fértiles y la fecha de tu próxima menstruación, con los próximos tres ciclos.",
    ),
    intro: [
      t(
        "Escribe el primer día de tu última menstruación y cuánto dura tu ciclo. Ves la ovulación estimada, los días fértiles y la próxima menstruación.",
        "Escriba el primer día de su última menstruación y cuánto dura su ciclo. Verá la ovulación estimada, los días fértiles y la próxima menstruación.",
        "Escribí el primer día de tu última menstruación y cuánto dura tu ciclo. Ves la ovulación estimada, los días fértiles y la próxima menstruación.",
      ),
      "Es una estimación para ciclos regulares. No sirve como método anticonceptivo y no reemplaza la consulta con un profesional de la salud.",
    ],
    comoSeCalcula: [
      `La ovulación suele ocurrir ${FASE_LUTEA} días antes de la menstruación siguiente: primer día de la última menstruación + duración del ciclo − ${FASE_LUTEA}.`,
      "Los días fértiles van de 5 días antes de la ovulación hasta el día siguiente, porque los espermatozoides viven hasta 5 días.",
      "La próxima menstruación llega un ciclo después de la última.",
    ],
    ejemplo: [
      `Con la última menstruación el ${f(fum)} y un ciclo de 28 días, la ovulación estimada es el ${f(aFecha(v.ovulacion))}.`,
      `Los días fértiles van del ${f(aFecha(v.desde))} al ${f(aFecha(v.hasta))}, y la próxima menstruación llega el ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "¿Cuáles son los días más fértiles?",
        respuesta: "Los dos o tres días antes de la ovulación y el día de la ovulación. La ventana completa dura unos 6 días.",
      },
      {
        pregunta: "¿Sirve si mi ciclo es irregular?",
        respuesta: "Da una idea, pero menos precisa. Con ciclos irregulares, la ovulación puede moverse varios días de un mes a otro.",
      },
      {
        pregunta: "¿Puedo usar esta calculadora para evitar un embarazo?",
        respuesta: "No. El cálculo es aproximado y la ovulación puede adelantarse o atrasarse. Para cuidarse hace falta un método anticonceptivo.",
      },
    ],
    glosario: [
      { termino: "Ovulación", definicion: "El momento en que el ovario libera un óvulo." },
      { termino: "Ventana fértil", definicion: "Los días del ciclo en que es posible un embarazo." },
    ],
  };
};
