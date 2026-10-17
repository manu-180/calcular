import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Calculadora de punto de equilibrio",
    title: tituloQueEntre(`Calculadora de punto de equilibrio en ${ctx.nombrePais}`, `Punto de equilibrio en ${ctx.nombrePais}`, "Calculadora de punto de equilibrio"),
    description: t(
      "Calcula cuántas unidades tienes que vender y cuánto facturar por mes para cubrir tus costos. También cuánto vender para ganar lo que te propones.",
      "Calcule cuántas unidades tiene que vender y cuánto facturar por mes para cubrir sus costos. También cuánto vender para ganar lo que se propone.",
      "Calculá cuántas unidades tenés que vender y cuánto facturar por mes para cubrir tus costos. También cuánto vender para ganar lo que te proponés.",
    ),
    intro: [
      "El punto de equilibrio es el nivel de ventas en el que el negocio no gana ni pierde. Por debajo hay pérdida, por encima empieza la ganancia.",
      t(
        "Escribe tus costos fijos, el precio y el costo de cada unidad. Te decimos cuánto tienes que vender para no perder y para llegar a tu meta.",
        "Escriba sus costos fijos, el precio y el costo de cada unidad. Le decimos cuánto tiene que vender para no perder y para llegar a su meta.",
        "Escribí tus costos fijos, el precio y el costo de cada unidad. Te decimos cuánto tenés que vender para no perder y para llegar a tu meta.",
      ),
    ],
    comoSeCalcula: [
      "Margen de contribución = precio − costo variable por unidad.",
      "Unidades de equilibrio = costos fijos ÷ margen de contribución, redondeado hacia arriba.",
      "Ventas de equilibrio = costos fijos ÷ (margen de contribución ÷ precio).",
      "Con una ganancia buscada, se suma a los costos fijos y se repite la cuenta.",
    ],
    ejemplo: [
      `Con ${m(fijos)} de costos fijos, un precio de ${m(precio)} y un costo variable de ${m(variable)}, cada venta deja ${m(precio - variable)}.`,
      `Hay que vender ${formatearNumero(ctx, base.unidades)} unidades (${m(base.facturacion)}) para cubrir los costos, y ${formatearNumero(ctx, meta.unidades)} para ganar ${m(objetivo)} por mes.`,
    ],
    faq: [
      {
        pregunta: "¿Qué son los costos fijos y los variables?",
        respuesta:
          "Los fijos se pagan igual aunque no se venda nada: alquiler, sueldos fijos, servicios. Los variables crecen con cada venta: mercadería, materiales, comisiones, envíos.",
      },
      {
        pregunta: "¿Cómo bajo el punto de equilibrio?",
        respuesta: "Hay tres caminos: subir el precio, bajar el costo variable de cada unidad o recortar costos fijos. El primero suele ser el que más mueve la aguja.",
      },
      {
        pregunta: "¿Sirve para un servicio?",
        respuesta: t(
          "Sí. La unidad puede ser una hora, una sesión o un cliente por mes. Usa como costo variable lo que te cuesta atender cada una.",
          "Sí. La unidad puede ser una hora, una sesión o un cliente por mes. Use como costo variable lo que le cuesta atender cada una.",
          "Sí. La unidad puede ser una hora, una sesión o un cliente por mes. Usá como costo variable lo que te cuesta atender cada una.",
        ),
      },
    ],
    glosario: [
      { termino: "Punto de equilibrio", definicion: "Las ventas con las que los ingresos igualan a los costos." },
      { termino: "Margen de contribución", definicion: "Lo que deja cada venta para pagar los costos fijos." },
    ],
  };
};

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const cero = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    description:
      "Calcula cuántas unidades tienes que vender y cuánto facturar al mes para cubrir tus costes. También cuánto vender para ganar lo que te propones.",
    intro: [
      "El punto de equilibrio es el nivel de ventas en el que el negocio no gana ni pierde. Por debajo hay pérdidas; por encima empieza el beneficio.",
      "Escribe tus costes fijos, el precio y el coste de cada unidad. Te decimos cuánto tienes que vender para no perder y para llegar a tu meta.",
    ],
    comoSeCalcula: [
      "Margen de contribución = precio − coste variable por unidad.",
      "Unidades de equilibrio = costes fijos ÷ margen de contribución, redondeado hacia arriba.",
      "Ventas de equilibrio = costes fijos ÷ (margen de contribución ÷ precio).",
      "Con un beneficio objetivo, se suma a los costes fijos y se repite la cuenta.",
    ],
    ejemplo: [
      `Con ${m(fijos)} de costes fijos, un precio de ${m(precio)} y un coste variable de ${m(variable)}, cada venta deja ${m(precio - variable)}.`,
      `Hay que vender ${formatearNumero(ctx, cero.unidades)} unidades (${m(cero.facturacion)}) para cubrir los costes, y ${formatearNumero(ctx, meta.unidades)} para ganar ${m(objetivo)} al mes.`,
    ],
    faq: [
      {
        pregunta: "¿Qué son los costes fijos y los variables?",
        respuesta:
          "Los fijos se pagan igual aunque no se venda nada: alquiler, sueldos fijos, suministros. Los variables crecen con cada venta: mercancía, materiales, comisiones, envíos.",
      },
      {
        pregunta: "¿Cómo bajo el punto de equilibrio?",
        respuesta: "Hay tres caminos: subir el precio, bajar el coste variable de cada unidad o recortar costes fijos. El primero suele ser el que más se nota.",
      },
      {
        pregunta: "¿Sirve para un servicio?",
        respuesta:
          "Sí. La unidad puede ser una hora, una sesión o un cliente al mes. Usa como coste variable lo que te cuesta atender cada una.",
      },
    ],
    glosario: [
      { termino: "Punto de equilibrio", definicion: "Las ventas con las que los ingresos igualan a los costes. También se llama umbral de rentabilidad." },
      { termino: "Margen de contribución", definicion: "Lo que deja cada venta para pagar los costes fijos." },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
