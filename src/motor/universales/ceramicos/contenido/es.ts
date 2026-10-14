import { formatearNumero, segunTrato, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const pieza = 0.6 * 0.6;
  const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
  return {
    h1: "¿Cuántos cerámicos necesito?",
    title: `Calculadora de cerámicos en ${ctx.nombrePais}`,
    description: t(
      "Calcula cuántas piezas de cerámico, porcelanato o baldosa necesitas para un piso o una pared, con el desperdicio y las cajas a comprar.",
      "Calcule cuántas piezas de cerámico, porcelanato o baldosa necesita para un piso o una pared, con el desperdicio y las cajas a comprar.",
      "Calculá cuántas piezas de cerámico, porcelanato o baldosa necesitás para un piso o una pared, con el desperdicio y las cajas a comprar.",
    ),
    intro: [
      t(
        "Escribe la superficie, la medida de cada pieza y cuántas trae la caja. Ves cuántas piezas y cuántas cajas comprar.",
        "Escriba la superficie, la medida de cada pieza y cuántas trae la caja. Verá cuántas piezas y cuántas cajas comprar.",
        "Escribí la superficie, la medida de cada pieza y cuántas trae la caja. Ves cuántas piezas y cuántas cajas comprar.",
      ),
      "El desperdicio cubre los cortes en los bordes y alguna pieza que se rompa.",
    ],
    comoSeCalcula: [
      "Superficie de una pieza = largo × ancho, pasado a metros cuadrados.",
      "Piezas = superficie × (1 + desperdicio ÷ 100) ÷ superficie de una pieza, redondeado hacia arriba.",
      "Cajas = piezas ÷ piezas por caja, redondeado hacia arriba.",
    ],
    ejemplo: [
      `Para 20 m² con piezas de 60 × 60 cm (${n(pieza)} m² cada una) y 10 % de desperdicio, hacen falta ${piezas} piezas.`,
      `Si la caja trae 4 piezas, son ${Math.ceil(piezas / 4)} cajas.`,
    ],
    faq: [
      {
        pregunta: "¿Cuánto desperdicio hay que calcular?",
        respuesta: "Un 10 % en colocación recta. Con colocación en diagonal, en espiga o en ambientes con muchos recortes, entre 15 % y 20 %.",
      },
      {
        pregunta: "¿Se tiene en cuenta la junta?",
        respuesta: "No hace falta. La junta es de pocos milímetros y el desperdicio ya cubre esa diferencia.",
      },
      {
        pregunta: "¿Conviene comprar de más?",
        respuesta: "Sí, unas piezas extra del mismo lote. Si más adelante se rompe una, puede ser difícil conseguir el mismo tono.",
      },
    ],
    glosario: [
      { termino: "Desperdicio", definicion: "El porcentaje extra que se compra por cortes y roturas." },
      { termino: "Lote", definicion: "La partida de fabricación. Piezas de lotes distintos pueden variar un poco de tono." },
    ],
  };
};
