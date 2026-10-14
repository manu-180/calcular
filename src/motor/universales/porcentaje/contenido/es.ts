import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculadora de porcentajes",
    title: tituloQueEntre(`Calculadora de porcentajes en ${ctx.nombrePais}`, `Porcentajes en ${ctx.nombrePais}`, "Calculadora de porcentajes"),
    description: t(
      "Calcula el porcentaje de un número, qué porcentaje es una cifra de otra y cuánto da sumar o restar un porcentaje.",
      "Calcule el porcentaje de un número, qué porcentaje es una cifra de otra y cuánto da sumar o restar un porcentaje.",
      "Calculá el porcentaje de un número, qué porcentaje es una cifra de otra y cuánto da sumar o restar un porcentaje.",
    ),
    intro: [
      t(
        "Elige qué quieres saber, escribe los dos números y tienes la respuesta al instante.",
        "Elija qué quiere saber, escriba los dos números y tiene la respuesta al instante.",
        "Elegí qué querés saber, escribí los dos números y tenés la respuesta al instante.",
      ),
      "Resuelve las cuatro cuentas de porcentaje de todos los días: una parte, una proporción, un aumento y una rebaja.",
    ],
    comoSeCalcula: [
      "El X % de Y = X × Y ÷ 100.",
      "Qué porcentaje de Y es X = X ÷ Y × 100.",
      "Y más el X % = Y × (1 + X ÷ 100). Y menos el X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      "El 15 % de 200 es 30.",
      "30 es el 25 % de 120.",
      `Un precio de ${m(precio)} con un aumento del 10 % queda en ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo se saca el porcentaje de un número?",
        respuesta: t(
          "Multiplica el número por el porcentaje y divide por 100. El 20 % de 350 es 350 × 20 ÷ 100 = 70.",
          "Multiplique el número por el porcentaje y divida por 100. El 20 % de 350 es 350 × 20 ÷ 100 = 70.",
          "Multiplicá el número por el porcentaje y dividí por 100. El 20 % de 350 es 350 × 20 ÷ 100 = 70.",
        ),
      },
      {
        pregunta: "¿Cómo sé qué porcentaje representa una cifra?",
        respuesta: t(
          "Divide la parte por el total y multiplica por 100. Si aciertas 45 de 60 preguntas, es 45 ÷ 60 × 100 = 75 %.",
          "Divida la parte por el total y multiplique por 100. Si acierta 45 de 60 preguntas, es 45 ÷ 60 × 100 = 75 %.",
          "Dividí la parte por el total y multiplicá por 100. Si acertás 45 de 60 preguntas, es 45 ÷ 60 × 100 = 75 %.",
        ),
      },
      {
        pregunta: "¿Cómo le sumo un porcentaje a un precio?",
        respuesta: `Se multiplica por 1 más el porcentaje en decimales. Para sumar un 10 %, se multiplica por ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "¿Subir un 10 % y después bajar un 10 % deja el mismo número?",
        respuesta: "No. 100 más el 10 % es 110, y 110 menos el 10 % es 99. La rebaja se calcula sobre un número más grande.",
      },
    ],
    glosario: [
      { termino: "Porcentaje", definicion: "Una cantidad expresada en partes de cada 100." },
      { termino: "Base", definicion: "El número sobre el que se calcula el porcentaje (Y en esta calculadora)." },
    ],
  };
};
