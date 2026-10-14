import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const mil = formatearNumero(ctx, 1000);
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculadora de regla de tres",
    title: `Regla de tres simple: calculadora en ${ctx.nombrePais}`,
    description: t(
      "Resuelve una regla de tres simple, directa o inversa, en un segundo. Escribe tres valores y obtienes el cuarto con la cuenta a la vista.",
      "Resuelva una regla de tres simple, directa o inversa, en un segundo. Escriba tres valores y obtiene el cuarto con la cuenta a la vista.",
      "Resolvé una regla de tres simple, directa o inversa, en un segundo. Escribí tres valores y obtenés el cuarto con la cuenta a la vista.",
    ),
    intro: [
      "La regla de tres sirve cuando dos cantidades cambian juntas y conoces tres de los cuatro valores.",
      t(
        "Elige si es directa o inversa, completa A, B y C, y la calculadora te da X.",
        "Elija si es directa o inversa, complete A, B y C, y la calculadora le da X.",
        "Elegí si es directa o inversa, completá A, B y C, y la calculadora te da X.",
      ),
    ],
    comoSeCalcula: [
      "Directa: X = B × C ÷ A. Se usa cuando las dos cantidades crecen juntas (más kilos, más precio).",
      "Inversa: X = A × B ÷ C. Se usa cuando una crece y la otra baja (más personas, menos días).",
    ],
    ejemplo: [
      `Si 3 kilos cuestan ${m(precio3)}, 5 kilos cuestan ${m((precio3 * 5) / 3)}.`,
      "Si 4 personas pintan una casa en 12 días, 6 personas la pintan en 8 días.",
    ],
    faq: [
      {
        pregunta: "¿Cómo sé si la regla de tres es directa o inversa?",
        respuesta: "Si al aumentar una cantidad la otra también aumenta, es directa. Si al aumentar una la otra baja, es inversa.",
      },
      {
        pregunta: "¿Cómo se hace una regla de tres directa a mano?",
        respuesta: t(
          `Multiplica en cruz los dos valores conocidos que están en diagonal y divide por el que queda. Si 3 es a 600, 5 es a 600 × 5 ÷ 3 = ${mil}.`,
          `Multiplique en cruz los dos valores conocidos que están en diagonal y divida por el que queda. Si 3 es a 600, 5 es a 600 × 5 ÷ 3 = ${mil}.`,
          `Multiplicá en cruz los dos valores conocidos que están en diagonal y dividí por el que queda. Si 3 es a 600, 5 es a 600 × 5 ÷ 3 = ${mil}.`,
        ),
      },
      {
        pregunta: "¿Sirve para porcentajes?",
        respuesta: "Sí. Si 200 es el 100 %, 50 es el 25 %: es una regla de tres directa con A = 200, B = 100 y C = 50.",
      },
    ],
    glosario: [
      { termino: "Regla de tres directa", definicion: "Proporción en la que las dos cantidades suben o bajan juntas." },
      { termino: "Regla de tres inversa", definicion: "Proporción en la que una cantidad sube cuando la otra baja." },
    ],
  };
};
