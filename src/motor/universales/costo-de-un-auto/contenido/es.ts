import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
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
  const unidad = imperial ? "milla" : "kilómetro";
  return {
    h1: "Calculadora del costo de tener un auto",
    title: `Cuánto cuesta tener un auto en ${ctx.nombrePais}`,
    description: t(
      "Calcula el costo real de tu auto por mes, por año y por kilómetro: combustible, seguro, mantenimiento, estacionamiento y lo que pierde de valor.",
      "Calcule el costo real de su auto por mes, por año y por kilómetro: combustible, seguro, mantenimiento, estacionamiento y lo que pierde de valor.",
      "Calculá el costo real de tu auto por mes, por año y por kilómetro: combustible, seguro, mantenimiento, estacionamiento y lo que pierde de valor.",
    ),
    intro: [
      "Casi todos sabemos cuánto gastamos en combustible. Pocos suman el seguro, el mantenimiento, el estacionamiento y, sobre todo, lo que el auto pierde de valor cada año.",
      t(
        "Completa tus gastos y te mostramos cuánto te cuesta de verdad el auto. Sirve para decidir si conviene comprarlo, cambiarlo o moverte de otra forma.",
        "Complete sus gastos y le mostramos cuánto le cuesta de verdad el auto. Sirve para decidir si conviene comprarlo, cambiarlo o moverse de otra forma.",
        "Completá tus gastos y te mostramos cuánto te cuesta de verdad el auto. Sirve para decidir si conviene comprarlo, cambiarlo o moverte de otra forma.",
      ),
    ],
    comoSeCalcula: [
      imperial
        ? "Combustible por mes = millas por mes ÷ millas por galón × precio del galón."
        : "Combustible por mes = kilómetros por mes × litros cada 100 km ÷ 100 × precio del litro.",
      "Pérdida de valor por mes = valor del auto × pérdida anual ÷ 12.",
      "Costo real = combustible + seguro + mantenimiento + estacionamiento + otros + pérdida de valor.",
      `Costo por ${unidad} = costo real por mes ÷ distancia recorrida en el mes.`,
    ],
    ejemplo: [
      `Un auto de ${m(g.precio)} que recorre ${formatearNumero(ctx, g.distancia)} ${imperial ? "millas" : "km"} por mes cuesta ${m(mensual)} por mes, contando lo que pierde de valor.`,
      `Son ${m(mensual * 12)} por año y ${formatearMonto(ctx, mensual / g.distancia)} por ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es la depreciación de un auto?",
        respuesta:
          "Es lo que pierde de valor con el tiempo. No se paga todos los meses, pero se nota al venderlo. Suele ser el gasto más grande de un auto nuevo.",
      },
      {
        pregunta: "¿Por qué no se suma la cuota del préstamo?",
        respuesta:
          "Porque una parte de la cuota paga el auto, que ya está contado en la pérdida de valor. Sumar las dos cosas contaría el auto dos veces. Los intereses del préstamo sí son un gasto extra.",
      },
      {
        pregunta: "¿Cómo bajo el costo de mi auto?",
        respuesta: t(
          "Compara seguros cada año, mantén la presión de los neumáticos y el mantenimiento al día, y evita cambiar de auto seguido: los primeros años son los que más valor pierde.",
          "Compare seguros cada año, mantenga la presión de los neumáticos y el mantenimiento al día, y evite cambiar de auto seguido: los primeros años son los que más valor pierde.",
          "Compará seguros cada año, mantené la presión de los neumáticos y el mantenimiento al día, y evitá cambiar de auto seguido: los primeros años son los que más valor pierde.",
        ),
      },
    ],
    glosario: [
      { termino: "Depreciación", definicion: "Lo que un auto pierde de valor con el paso del tiempo y el uso." },
      { termino: "Costo por kilómetro", definicion: "Cuánto cuesta en promedio cada kilómetro recorrido, con todos los gastos incluidos." },
    ],
  };
};
