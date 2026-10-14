import { formatearNumero, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Calculadora de tasa efectiva anual",
    title: tituloQueEntre(`Calculadora de tasa efectiva anual en ${ctx.nombrePais}`, `Tasa efectiva anual en ${ctx.nombrePais}`, "Calculadora de tasa efectiva anual"),
    description: t(
      "Pasa una tasa nominal anual a tasa efectiva anual y al revés, con capitalización mensual, trimestral, semestral o diaria.",
      "Pase una tasa nominal anual a tasa efectiva anual y al revés, con capitalización mensual, trimestral, semestral o diaria.",
      "Pasá una tasa nominal anual a tasa efectiva anual y al revés, con capitalización mensual, trimestral, semestral o diaria.",
    ),
    intro: [
      "Dos ofertas con la misma tasa pueden costar distinto. La diferencia está en cada cuánto se cobran o se pagan los intereses.",
      t(
        "La tasa efectiva anual pone todo en la misma vara: es lo que de verdad pagas o ganas en un año. Elige qué tasa tienes y te mostramos la otra.",
        "La tasa efectiva anual pone todo en la misma vara: es lo que de verdad paga o gana en un año. Elija qué tasa tiene y le mostramos la otra.",
        "La tasa efectiva anual pone todo en la misma vara: es lo que de verdad pagás o ganás en un año. Elegí qué tasa tenés y te mostramos la otra.",
      ),
    ],
    comoSeCalcula: [
      "Efectiva = (1 + nominal ÷ m) elevado a m, menos 1. La m es la cantidad de capitalizaciones por año: 12 si es mensual, 4 si es trimestral.",
      "Nominal = m × ((1 + efectiva) elevado a 1 ÷ m, menos 1).",
      "La tasa de cada período es la nominal dividida por m.",
    ],
    ejemplo: [
      `Una tasa nominal del 12 % con capitalización mensual equivale a una efectiva de ${p(aEfectiva(12, 12))}.`,
      `Una efectiva del 10 % equivale a una nominal de ${p(aNominal(10, 12))} si capitaliza todos los meses.`,
    ],
    faq: [
      {
        pregunta: "¿Qué diferencia hay entre tasa nominal y tasa efectiva?",
        respuesta:
          "La nominal es la tasa de referencia que se divide entre los períodos del año. La efectiva incluye el efecto de que los intereses también generan intereses. Por eso la efectiva siempre es igual o más alta.",
      },
      {
        pregunta: "¿Cuál tengo que mirar para comparar préstamos?",
        respuesta: "La efectiva anual, porque pone todas las ofertas en la misma base. Y además el costo total, que suma seguros y comisiones.",
      },
      {
        pregunta: "¿Por qué capitalizar más seguido sube la tasa efectiva?",
        respuesta:
          "Porque los intereses se suman antes al capital y empiezan a generar sus propios intereses. Con capitalización anual, nominal y efectiva son iguales.",
      },
    ],
    glosario: [
      { termino: "Tasa nominal anual", definicion: "La tasa anual de referencia, sin contar que los intereses se capitalizan." },
      { termino: "Tasa efectiva anual", definicion: "Lo que rinde o cuesta de verdad un año, con la capitalización incluida." },
      { termino: "Capitalización", definicion: "El momento en que los intereses se suman al capital." },
    ],
  };
};
