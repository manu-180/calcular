import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Calculadora de margen de ganancia",
    title: `Calculadora de margen de ganancia en ${ctx.nombrePais}`,
    description: t(
      "Calcula el margen y el markup de un producto a partir del costo y el precio, o el precio de venta que necesitas para ganar el margen que buscas.",
      "Calcule el margen y el markup de un producto a partir del costo y el precio, o el precio de venta que necesita para ganar el margen que busca.",
      "Calculá el margen y el markup de un producto a partir del costo y el precio, o el precio de venta que necesitás para ganar el margen que buscás.",
    ),
    intro: [
      "Margen y markup se confunden todo el tiempo, y la diferencia puede costar dinero. Los dos miden la misma ganancia, pero sobre bases distintas.",
      t(
        "Escribe el costo y el precio y te mostramos los dos. O elige un margen y te decimos a cuánto vender.",
        "Escriba el costo y el precio y le mostramos los dos. O elija un margen y le decimos a cuánto vender.",
        "Escribí el costo y el precio y te mostramos los dos. O elegí un margen y te decimos a cuánto vender.",
      ),
    ],
    comoSeCalcula: [
      "Ganancia = precio − costo.",
      "Margen = ganancia ÷ precio × 100.",
      "Markup = ganancia ÷ costo × 100.",
      "Precio para un margen = costo ÷ (1 − margen ÷ 100).",
    ],
    ejemplo: [
      `Un producto que cuesta ${m(costo)} y se vende a ${m(precio)} deja ${m(precio - costo)} de ganancia: un margen del ${p(((precio - costo) / precio) * 100)} y un markup del ${p(((precio - costo) / costo) * 100)}.`,
      `Para ganar un margen del 50 % sobre ese costo, hay que vender a ${m(precioConMargen(costo, 50))}. Sumarle un 50 % al costo da solo un margen del ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "¿Qué diferencia hay entre margen y markup?",
        respuesta:
          "El margen es la ganancia sobre el precio de venta. El markup es la ganancia sobre el costo. Con la misma ganancia, el markup siempre da un número más alto.",
      },
      {
        pregunta: "¿Cómo calculo el precio de venta con un margen?",
        respuesta: t(
          `Divide el costo por (1 − margen). Para un 30 % de margen, divide el costo por ${formatearNumero(ctx, 0.7, 2)}. No sumes el 30 % al costo: así ganarías menos de lo que piensas.`,
          `Divida el costo por (1 − margen). Para un 30 % de margen, divida el costo por ${formatearNumero(ctx, 0.7, 2)}. No sume el 30 % al costo: así ganaría menos de lo que piensa.`,
          `Dividí el costo por (1 − margen). Para un 30 % de margen, dividí el costo por ${formatearNumero(ctx, 0.7, 2)}. No sumes el 30 % al costo: así ganarías menos de lo que pensás.`,
        ),
      },
      {
        pregunta: "¿El costo incluye impuestos?",
        respuesta: t(
          "Usa costo y precio sin los impuestos que se trasladan al cliente, como el IVA. Si no, el margen sale inflado.",
          "Use costo y precio sin los impuestos que se trasladan al cliente, como el IVA. Si no, el margen sale inflado.",
          "Usá costo y precio sin los impuestos que se trasladan al cliente, como el IVA. Si no, el margen sale inflado.",
        ),
      },
    ],
    glosario: [
      { termino: "Margen", definicion: "La ganancia como porcentaje del precio de venta." },
      { termino: "Markup", definicion: "La ganancia como porcentaje del costo. También se le dice recargo." },
    ],
  };
};
