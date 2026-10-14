import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Calculadora de consumo eléctrico",
    title: tituloQueEntre(`Consumo eléctrico de un aparato en ${ctx.nombrePais}`, `Consumo eléctrico en ${ctx.nombrePais}`, "Calculadora de consumo eléctrico"),
    description: t(
      "Calcula cuánta luz gasta un aparato y cuánto te cuesta por día, por mes y por año, con su potencia, las horas de uso y el precio del kWh.",
      "Calcule cuánta luz gasta un aparato y cuánto le cuesta por día, por mes y por año, con su potencia, las horas de uso y el precio del kWh.",
      "Calculá cuánta luz gasta un aparato y cuánto te cuesta por día, por mes y por año, con su potencia, las horas de uso y el precio del kWh.",
    ),
    intro: [
      t(
        "Escribe la potencia del aparato, cuántas horas lo usas y el precio del kWh de tu factura. Ves el consumo y el costo.",
        "Escriba la potencia del aparato, cuántas horas lo usa y el precio del kWh de su factura. Verá el consumo y el costo.",
        "Escribí la potencia del aparato, cuántas horas lo usás y el precio del kWh de tu factura. Ves el consumo y el costo.",
      ),
      "Sirve para saber qué aparato pesa más en la factura: un aire acondicionado, una estufa, el refrigerador o una computadora.",
    ],
    comoSeCalcula: [
      "kWh por día = potencia en W × horas de uso ÷ 1000.",
      "kWh por mes = kWh por día × días de uso. Por año, el mes por 12.",
      "Costo = kWh × precio del kWh.",
    ],
    ejemplo: [
      `Un aparato de 1000 W usado 4 horas por día gasta 4 kWh por día y ${formatearNumero(ctx, kwhMes)} kWh por mes.`,
      `Con el kWh a ${m(precio)}, cuesta ${m(kwhMes * precio)} por mes.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es un kWh?",
        respuesta: "Un kilovatio hora es la energía que usa un aparato de 1000 W funcionando una hora. Es la unidad que cobra la factura de luz.",
      },
      {
        pregunta: "¿El refrigerador (o la heladera) consume todo el día a su potencia máxima?",
        respuesta: "No. El motor se prende y se apaga. Para aparatos así, conviene usar unas 8 a 10 horas por día en lugar de 24.",
      },
      {
        pregunta: "¿Por qué mi factura no coincide exacto?",
        respuesta: "La factura suma cargos fijos, impuestos y a veces precios por tramo de consumo. Este cálculo muestra solo lo que gasta el aparato.",
      },
    ],
    glosario: [
      { termino: "Vatio (W)", definicion: "Unidad de potencia: cuánta energía usa un aparato por segundo." },
      { termino: "Kilovatio hora (kWh)", definicion: "Energía de 1000 W durante una hora. Es lo que se paga en la factura." },
    ],
  };
};

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    description:
      "Calcula cuánta luz gasta un aparato y cuánto te cuesta al día, al mes y al año, con su potencia, las horas de uso y el precio del kWh.",
    intro: [
      "Escribe la potencia del aparato, cuántas horas lo usas y el precio del kWh de tu factura. Ves el consumo y el coste.",
      "Sirve para saber qué aparato pesa más en la factura: el aire acondicionado, un radiador, el frigorífico o el ordenador.",
    ],
    comoSeCalcula: [
      "kWh al día = potencia en W × horas de uso ÷ 1000.",
      "kWh al mes = kWh al día × días de uso. Al año, el mes por 12.",
      "Coste = kWh × precio del kWh.",
    ],
    ejemplo: [
      `Un aparato de 1000 W usado 4 horas al día gasta 4 kWh al día y ${formatearNumero(ctx, kwhMes)} kWh al mes.`,
      `Con el kWh a ${m(precio)}, cuesta ${m(kwhMes * precio)} al mes.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es un kWh?",
        respuesta: "Un kilovatio hora es la energía que usa un aparato de 1000 W funcionando una hora. Es la unidad que cobra la factura de la luz.",
      },
      {
        pregunta: "¿El frigorífico consume todo el día a su potencia máxima?",
        respuesta: "No. El motor se enciende y se apaga. Para aparatos así, conviene poner unas 8 a 10 horas al día en lugar de 24.",
      },
      {
        pregunta: "¿Por qué mi factura no coincide exactamente?",
        respuesta: "La factura suma el término de potencia, impuestos y, según la tarifa, precios distintos por franja horaria. Este cálculo muestra solo lo que gasta el aparato.",
      },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
