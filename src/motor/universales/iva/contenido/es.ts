import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Calculadora de IVA en ${ctx.nombrePais}`,
    title: tituloQueEntre(`Calculadora de IVA del ${tasa} en ${ctx.nombrePais}`, `IVA del ${tasa} en ${ctx.nombrePais}`, `Calculadora de IVA del ${tasa}`),
    description: t(
      `Agrega o quita el IVA del ${tasa} a cualquier precio en un paso: precio sin IVA, IVA y precio final, al centavo.`,
      `Agregue o quite el IVA del ${tasa} a cualquier precio en un paso: precio sin IVA, IVA y precio final, al centavo.`,
      `Agregá o quitá el IVA del ${tasa} a cualquier precio en un paso: precio sin IVA, IVA y precio final, al centavo.`,
    ),
    intro: [
      `La tasa general del IVA en ${ctx.nombrePais} es del ${tasa}.`,
      t(
        "Elige si quieres sumar el IVA a un precio neto o sacarlo de un precio que ya lo incluye, y escribe el monto.",
        "Elija si quiere sumar el IVA a un precio neto o sacarlo de un precio que ya lo incluye, y escriba el monto.",
        "Elegí si querés sumar el IVA a un precio neto o sacarlo de un precio que ya lo incluye, y escribí el monto.",
      ),
    ],
    comoSeCalcula: [
      "Agregar el IVA: IVA = precio sin IVA × tasa ÷ 100. Precio final = precio sin IVA + IVA.",
      "Quitar el IVA: precio sin IVA = precio con IVA ÷ (1 + tasa ÷ 100). El IVA es la diferencia.",
      "Si un producto paga una tasa reducida, se puede escribir en «Otra tasa de IVA».",
    ],
    ejemplo: [
      `Para agregar el IVA a ${precio}, se multiplica por el ${tasa} y se suma al precio.`,
      `Para saber cuánto IVA tiene un precio final de ${precio}, se divide por 1 más la tasa y se resta.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo le quito el IVA a un precio?",
        respuesta: t(
          "Divide el precio por 1 más la tasa escrita en decimales. Lo que queda es el precio sin IVA, y la diferencia es el impuesto.",
          "Divida el precio por 1 más la tasa escrita en decimales. Lo que queda es el precio sin IVA, y la diferencia es el impuesto.",
          "Dividí el precio por 1 más la tasa escrita en decimales. Lo que queda es el precio sin IVA, y la diferencia es el impuesto.",
        ),
      },
      {
        pregunta: "¿Por qué no se resta el porcentaje directo del precio final?",
        respuesta: "Porque el IVA se calculó sobre el precio sin impuesto, que es más chico. Restar el porcentaje al precio final saca de más.",
      },
      {
        pregunta: `¿Todos los productos pagan el ${tasa}?`,
        respuesta: "No siempre. Algunos alimentos, medicamentos o servicios pagan una tasa reducida o están exentos. En ese caso, se usa «Otra tasa de IVA».",
      },
    ],
    glosario: [
      { termino: "IVA", definicion: "Impuesto al valor agregado (o añadido). Se suma al precio de bienes y servicios." },
      { termino: "Precio neto", definicion: "El precio antes de sumar el impuesto." },
    ],
  };
};
