import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const precio = montoEjemplo(ctx, 80);
  const final = precio * 0.75;
  const doble = precio * 0.7 * 0.9;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculadora de descuentos",
    title: tituloQueEntre(`Calculadora de descuentos en ${ctx.nombrePais}`, `Descuentos en ${ctx.nombrePais}`, "Calculadora de descuentos"),
    description: t(
      "Calcula el precio final con descuento y cuánto ahorras. También con dos descuentos seguidos, como el 30 % más 10 %.",
      "Calcule el precio final con descuento y cuánto ahorra. También con dos descuentos seguidos, como el 30 % más 10 %.",
      "Calculá el precio final con descuento y cuánto ahorrás. También con dos descuentos seguidos, como el 30 % más 10 %.",
    ),
    intro: [
      t(
        "Escribe el precio y el porcentaje de descuento y ves al instante cuánto pagas y cuánto te ahorras.",
        "Escriba el precio y el porcentaje de descuento y verá al instante cuánto paga y cuánto se ahorra.",
        "Escribí el precio y el porcentaje de descuento y ves al instante cuánto pagás y cuánto te ahorrás.",
      ),
      "Si la promoción tiene un segundo descuento encima del primero, también lo calcula: dos descuentos seguidos nunca se suman.",
    ],
    comoSeCalcula: [
      "Precio final = precio original × (1 − descuento ÷ 100).",
      "Con un segundo descuento, se aplica sobre el precio que ya tiene el primero.",
      "Lo que se ahorra es la diferencia entre el precio original y el final.",
    ],
    ejemplo: [
      `Un producto de ${m(precio)} con 25 % de descuento queda en ${m(final)}.`,
      `Con 30 % y después 10 % más, queda en ${m(doble)}: es un 37 % menos en total, no un 40 %.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo se saca el descuento de un precio?",
        respuesta: t(
          "Multiplica el precio por el porcentaje y divide por 100. Eso es lo que ahorras. Réstalo del precio y tienes lo que pagas.",
          "Multiplique el precio por el porcentaje y divida por 100. Eso es lo que ahorra. Réstelo del precio y tiene lo que paga.",
          "Multiplicá el precio por el porcentaje y dividí por 100. Eso es lo que ahorrás. Restalo del precio y tenés lo que pagás.",
        ),
      },
      {
        pregunta: "¿30 % más 10 % es lo mismo que 40 %?",
        respuesta: "No. El segundo descuento se aplica sobre el precio ya rebajado, así que en total es un 37 %.",
      },
      {
        pregunta: "¿Cómo sé el precio original si solo tengo el precio con descuento?",
        respuesta: t(
          `Divide el precio con descuento por (1 − descuento ÷ 100). Con 25 % de descuento, divide por ${formatearNumero(ctx, 0.75, 2)}.`,
          `Divida el precio con descuento por (1 − descuento ÷ 100). Con 25 % de descuento, divida por ${formatearNumero(ctx, 0.75, 2)}.`,
          `Dividí el precio con descuento por (1 − descuento ÷ 100). Con 25 % de descuento, dividí por ${formatearNumero(ctx, 0.75, 2)}.`,
        ),
      },
    ],
    glosario: [
      { termino: "Descuento", definicion: "Porcentaje que se resta del precio original." },
      { termino: "Descuento efectivo", definicion: "El porcentaje total que se ahorra cuando hay más de un descuento." },
    ],
  };
};
