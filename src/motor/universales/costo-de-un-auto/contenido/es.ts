import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

function ejemplo(ctx: ContextoUniversal): { g: GastosAuto; mensual: number } {
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
  return { g, mensual: costoMensual(g, imperial) };
}

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const { g, mensual } = ejemplo(ctx);
  const unidad = imperial ? "milla" : "kilómetro";
  return {
    h1: "Calculadora del costo de tener un auto",
    title: tituloQueEntre(`Cuánto cuesta tener un auto en ${ctx.nombrePais}`, `Costo de tener auto en ${ctx.nombrePais}`, "Cuánto cuesta tener un auto"),
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

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const m = (n: number) => formatearMonto(ctx, n);
  const { g, mensual } = ejemplo(ctx);
  return {
    h1: "Calculadora del coste de tener coche",
    title: tituloQueEntre(`Cuánto cuesta tener coche en ${ctx.nombrePais}`, `Coste de tener coche en ${ctx.nombrePais}`, "Cuánto cuesta tener coche"),
    description:
      "Calcula el coste real de tu coche al mes, al año y por kilómetro: combustible, seguro, mantenimiento, aparcamiento y lo que pierde de valor.",
    intro: [
      "Casi todos sabemos cuánto gastamos en gasolina. Pocos suman el seguro, el mantenimiento, el aparcamiento y, sobre todo, lo que el coche pierde de valor cada año.",
      "Rellena tus gastos y te mostramos cuánto te cuesta de verdad el coche. Sirve para decidir si te compensa comprarlo, cambiarlo o moverte de otra forma.",
    ],
    comoSeCalcula: [
      "Combustible al mes = kilómetros al mes × litros cada 100 km ÷ 100 × precio del litro.",
      "Pérdida de valor al mes = valor del coche × pérdida anual ÷ 12.",
      "Coste real = combustible + seguro + mantenimiento + aparcamiento + otros + pérdida de valor.",
      "Coste por kilómetro = coste real al mes ÷ kilómetros recorridos en el mes.",
    ],
    ejemplo: [
      `Un coche de ${m(g.precio)} que recorre ${formatearNumero(ctx, g.distancia)} km al mes cuesta ${m(mensual)} al mes, contando lo que pierde de valor.`,
      `Son ${m(mensual * 12)} al año y ${formatearMonto(ctx, mensual / g.distancia)} por kilómetro.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es la depreciación de un coche?",
        respuesta:
          "Es lo que pierde de valor con el tiempo. No se paga cada mes, pero se nota al venderlo. Suele ser el gasto más grande de un coche nuevo.",
      },
      {
        pregunta: "¿Por qué no se suma la cuota del préstamo?",
        respuesta:
          "Porque una parte de la cuota paga el coche, que ya está contado en la pérdida de valor. Sumar las dos cosas contaría el coche dos veces. Los intereses del préstamo sí son un gasto extra.",
      },
      {
        pregunta: "¿Cómo bajo el coste de mi coche?",
        respuesta:
          "Compara seguros cada año, lleva la presión de los neumáticos y el mantenimiento al día, y no cambies de coche a menudo: los primeros años son los que más valor pierde.",
      },
    ],
    glosario: [
      { termino: "Depreciación", definicion: "Lo que un coche pierde de valor con el paso del tiempo y el uso." },
      { termino: "Coste por kilómetro", definicion: "Cuánto cuesta de media cada kilómetro recorrido, con todos los gastos incluidos." },
      { termino: "ITV", definicion: "La inspección técnica obligatoria del coche. Su tasa entra en «Impuestos, peajes y otros»." },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
