import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "mile" : "kilometer";
  return {
    h1: "Car cost calculator",
    title: tituloQueEntre(`Car cost calculator for ${ctx.nombrePais}`, `Car costs in ${ctx.nombrePais}`, "Car cost calculator"),
    description: `Work out what your car really costs per month, per year and per ${unidad}: fuel, insurance, maintenance, parking and the value it loses.`,
    intro: [
      "Most people know what they spend on fuel. Few add up insurance, maintenance, parking and, above all, the value the car loses every year.",
      "Fill in your costs and we show what your car really costs you. It helps you decide whether to buy, switch or get around another way.",
    ],
    comoSeCalcula: [
      imperial
        ? "Fuel per month = miles per month ÷ miles per gallon × price per gallon."
        : "Fuel per month = kilometers per month × liters per 100 km ÷ 100 × price per liter.",
      "Value lost per month = car value × yearly loss ÷ 12.",
      "Real cost = fuel + insurance + maintenance + parking + other costs + value lost.",
      `Cost per ${unidad} = real monthly cost ÷ distance driven in the month.`,
    ],
    ejemplo: [
      `A car worth ${m(g.precio)} driven ${formatearNumero(ctx, g.distancia)} ${imperial ? "miles" : "km"} a month costs ${m(mensual)} a month, counting the value it loses.`,
      `That is ${m(mensual * 12)} a year and ${formatearMonto(ctx, mensual / g.distancia)} per ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "What is car depreciation?",
        respuesta: "It is the value a car loses over time. You don't pay it every month, but you feel it when you sell. It is often the biggest cost of a new car.",
      },
      {
        pregunta: "Why isn't my loan payment added?",
        respuesta:
          "Part of the payment pays for the car itself, which is already counted as lost value. Adding both would count the car twice. The loan interest is an extra cost on top.",
      },
      {
        pregunta: "How can I lower what my car costs?",
        respuesta:
          "Shop around for insurance every year, keep tire pressure and maintenance up to date, and avoid switching cars often: the first years are when it loses the most value.",
      },
    ],
    glosario: [
      { termino: "Depreciation", definicion: "The value a car loses with time and use." },
      { termino: `Cost per ${unidad}`, definicion: `The average cost of each ${unidad} driven, with every cost included.` },
    ],
  };
};
