import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";

const base: ContenidoUniversal = (ctx) => {
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
        "Elige si quieres sumar el IVA a un precio neto o sacarlo de un precio que ya lo incluye, y escribe el precio.",
        "Elija si quiere sumar el IVA a un precio neto o sacarlo de un precio que ya lo incluye, y escriba el precio.",
        "Elegí si querés sumar el IVA a un precio neto o sacarlo de un precio que ya lo incluye, y escribí el precio.",
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

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    description: `Añade o quita el IVA del ${tasa} a cualquier precio en un paso: base imponible, cuota de IVA y precio final, al céntimo.`,
    intro: [
      `El tipo general del IVA en ${ctx.nombrePais} es del ${tasa}.`,
      "Elige si quieres sumar el IVA a una base imponible o sacarlo de un precio que ya lo incluye, y escribe el precio.",
    ],
    comoSeCalcula: [
      "Añadir el IVA: cuota de IVA = base imponible × tipo ÷ 100. Precio final = base + cuota.",
      "Quitar el IVA: base imponible = precio con IVA ÷ (1 + tipo ÷ 100). El IVA es la diferencia.",
      "Si un producto tiene un tipo reducido, se puede escribir en «Otro tipo de IVA».",
    ],
    ejemplo: [
      `Para añadir el IVA a ${precio}, se multiplica por el ${tasa} y se suma al precio.`,
      `Para saber cuánto IVA lleva un precio final de ${precio}, se divide entre 1 más el tipo y se resta.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo le quito el IVA a un precio?",
        respuesta: "Divide el precio entre 1 más el tipo escrito en decimales. Lo que queda es la base imponible, y la diferencia es el impuesto.",
      },
      {
        pregunta: "¿Por qué no se resta el porcentaje directamente del precio final?",
        respuesta: "Porque el IVA se calculó sobre la base sin impuesto, que es más pequeña. Restar el porcentaje al precio final quita de más.",
      },
      {
        pregunta: `¿Todos los productos llevan el ${tasa}?`,
        respuesta: "No. Algunos alimentos, medicamentos o servicios tienen un tipo reducido o superreducido, y otros están exentos. En ese caso, usa «Otro tipo de IVA».",
      },
    ],
    glosario: [
      { termino: "IVA", definicion: "Impuesto sobre el valor añadido. Se suma al precio de bienes y servicios." },
      { termino: "Base imponible", definicion: "El precio antes de sumar el impuesto." },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
