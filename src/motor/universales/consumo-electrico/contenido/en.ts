import { formatearMonto, formatearNumero, montoEjemplo, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Electricity cost calculator",
    title: `Electricity cost calculator for ${ctx.nombrePais}`,
    description: "Work out how much electricity an appliance uses and what it costs per day, month and year, from its wattage, hours of use and kWh price.",
    intro: [
      "Enter the appliance's wattage, how many hours you use it and the price per kWh from your bill. You see the energy use and the cost.",
      "Use it to find which appliance weighs most on your bill: air conditioning, a heater, a fridge or a computer.",
    ],
    comoSeCalcula: [
      "kWh per day = watts × hours of use ÷ 1000.",
      "kWh per month = kWh per day × days of use. For a year, the month times 12.",
      "Cost = kWh × price per kWh.",
    ],
    ejemplo: [
      `A 1000 W appliance used 4 hours a day uses 4 kWh a day and ${formatearNumero(ctx, kwhMes)} kWh a month.`,
      `At ${m(precio)} per kWh, it costs ${m(kwhMes * precio)} a month.`,
    ],
    faq: [
      {
        pregunta: "What is a kWh?",
        respuesta: "A kilowatt hour is the energy a 1000 W appliance uses running for one hour. It is the unit on your electricity bill.",
      },
      {
        pregunta: "Does a fridge run at full power all day?",
        respuesta: "No. The compressor switches on and off. For appliances like that, use around 8 to 10 hours a day instead of 24.",
      },
      {
        pregunta: "Why doesn't my bill match exactly?",
        respuesta: "Your bill adds standing charges, taxes and sometimes tiered prices. This shows only what the appliance uses.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "A unit of power: how much energy an appliance uses each second." },
      { termino: "Kilowatt hour (kWh)", definicion: "1000 W for one hour. It is what you pay for on your bill." },
    ],
  };
};
