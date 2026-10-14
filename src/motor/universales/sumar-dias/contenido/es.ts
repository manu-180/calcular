import { contenidoConVariantes } from "../../comun/locales";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Sumar o restar días a una fecha",
    title: tituloQueEntre(`Sumar días a una fecha en ${ctx.nombrePais}`, `Sumar días en ${ctx.nombrePais}`, "Sumar días a una fecha"),
    description: t(
      "Suma o resta días corridos o hábiles a una fecha y descubre qué día cae: útil para plazos, vencimientos y entregas.",
      "Sume o reste días corridos o hábiles a una fecha y vea qué día cae: útil para plazos, vencimientos y entregas.",
      "Sumá o restá días corridos o hábiles a una fecha y fijate qué día cae: útil para plazos, vencimientos y entregas.",
    ),
    intro: [
      t(
        "Elige una fecha, la cantidad de días y si se suman o se restan. Ves la fecha que resulta y el día de la semana.",
        "Elija una fecha, la cantidad de días y si se suman o se restan. Verá la fecha que resulta y el día de la semana.",
        "Elegí una fecha, la cantidad de días y si se suman o se restan. Ves la fecha que resulta y el día de la semana.",
      ),
      "Con días hábiles, la cuenta salta los sábados y domingos.",
    ],
    comoSeCalcula: [
      "Con días corridos, se avanza o retrocede un día del calendario por cada día pedido.",
      "Con días hábiles, solo cuentan los días de lunes a viernes. El día de partida no se cuenta.",
      "Los feriados no se descuentan, porque cambian según el país y la región.",
    ],
    ejemplo: [`El ${f(inicio)} más 90 días corridos es el ${f(mas90)}.`, `El ${f(inicio)} más 15 días hábiles es el ${f(aFecha(habil))}.`],
    faq: [
      {
        pregunta: "¿El día de partida cuenta como el primer día?",
        respuesta: "No. Sumar 1 día a un lunes da el martes. Es la forma en que se cuentan la mayoría de los plazos.",
      },
      {
        pregunta: "¿Qué pasa si sumo días hábiles desde un sábado?",
        respuesta: "El primer día hábil es el lunes siguiente. Sumar 1 día hábil a un sábado da el lunes.",
      },
      {
        pregunta: "¿Tiene en cuenta los años bisiestos?",
        respuesta: "Sí. Si el período pasa por un 29 de febrero, se cuenta como un día más.",
      },
    ],
    glosario: [
      { termino: "Días corridos", definicion: "Todos los días del calendario, sin saltear ninguno." },
      { termino: "Días hábiles", definicion: "En esta calculadora, los días de lunes a viernes." },
    ],
  };
};

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    description: "Suma o resta días naturales o hábiles a una fecha y descubre qué día cae: útil para plazos, vencimientos y entregas.",
    comoSeCalcula: [
      "Con días naturales, se avanza o retrocede un día del calendario por cada día pedido.",
      "Con días hábiles, solo cuentan los días de lunes a viernes. El día de partida no se cuenta.",
      "Los festivos no se descuentan, porque cambian según la comunidad autónoma y el municipio.",
    ],
    ejemplo: [`El ${f(inicio)} más 90 días naturales es el ${f(mas90)}.`, `El ${f(inicio)} más 15 días hábiles es el ${f(aFecha(habil))}.`],
    glosario: [
      { termino: "Días naturales", definicion: "Todos los días del calendario, sin saltarse ninguno." },
      { termino: "Días hábiles", definicion: "En esta calculadora, los días de lunes a viernes." },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
