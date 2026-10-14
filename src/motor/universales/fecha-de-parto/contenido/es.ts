import { aDia, aFecha, fechaLarga } from "../../dias-entre-fechas/fechas";
import { segunTrato, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Calculadora de fecha probable de parto",
    title: `Fecha probable de parto: calculadora en ${ctx.nombrePais}`,
    description: t(
      "Calcula tu fecha probable de parto con la última menstruación o la concepción, y cuántas semanas de embarazo tienes hoy.",
      "Calcule su fecha probable de parto con la última menstruación o la concepción, y cuántas semanas de embarazo tiene hoy.",
      "Calculá tu fecha probable de parto con la última menstruación o la concepción, y cuántas semanas de embarazo tenés hoy.",
    ),
    intro: [
      t(
        "Escribe el primer día de tu última menstruación (o la fecha de concepción, si la sabes). Ves la fecha probable de parto, tus semanas de embarazo y el trimestre.",
        "Escriba el primer día de su última menstruación (o la fecha de concepción, si la sabe). Verá la fecha probable de parto, sus semanas de embarazo y el trimestre.",
        "Escribí el primer día de tu última menstruación (o la fecha de concepción, si la sabés). Ves la fecha probable de parto, tus semanas de embarazo y el trimestre.",
      ),
      "Es una estimación. El control con un profesional de la salud y la ecografía dan la fecha más precisa.",
    ],
    comoSeCalcula: [
      "Se usa la regla de Naegele: la fecha probable de parto es la última menstruación más 280 días (40 semanas).",
      "Si el ciclo dura más o menos de 28 días, la fecha se corre esa diferencia.",
      "Desde la concepción, se suman 266 días (38 semanas).",
      "Las semanas de embarazo se cuentan desde la última menstruación, no desde la concepción.",
    ],
    ejemplo: [
      `Con la última menstruación el ${f(fum)} y un ciclo de 28 días, la fecha probable de parto es el ${f(fpp)}.`,
      `Con un ciclo de 32 días, se corre 4 días: el ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo se calcula la fecha probable de parto?",
        respuesta: "Al primer día de la última menstruación se le suman 280 días. Una regla rápida que da casi lo mismo: sumar 7 días, restar 3 meses y sumar un año.",
      },
      {
        pregunta: "¿Por qué las semanas se cuentan desde la última menstruación?",
        respuesta: "Porque es una fecha que casi todas las personas conocen. Por eso, en la semana 2 todavía no hubo concepción.",
      },
      {
        pregunta: "¿Cuántos bebés nacen en la fecha probable de parto?",
        respuesta: "Pocos. Lo habitual es nacer entre la semana 37 y la 42, así que la fecha es una referencia y no un día exacto.",
      },
    ],
    glosario: [
      { termino: "FUM", definicion: "Fecha de la última menstruación: el primer día del último sangrado." },
      { termino: "Regla de Naegele", definicion: "Método para estimar la fecha de parto sumando 280 días a la FUM." },
    ],
  };
};
