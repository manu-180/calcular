import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `A 150-mile trip there and back in a car that does 30 mpg uses ${formatearNumero(ctx, galones)} gallons.`,
          `At ${m(precio)} a gallon, that is ${m(galones * precio)}. Split between 2 people, ${m((galones * precio) / 2)} each.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `A 300 km trip there and back in a car that uses 8 litres per 100 km needs ${formatearNumero(ctx, litros)} litres.`,
          `At ${m(precio)} a litre, that is ${m(litros * precio)}. Split between 2 people, ${m((litros * precio) / 2)} each.`,
        ];
      })();
  return {
    h1: "Fuel cost calculator",
    title: tituloQueEntre(`Fuel cost calculator for ${ctx.nombrePais}`, "Fuel cost calculator"),
    description: "Work out what a trip costs in fuel from the distance, your car's fuel economy and the fuel price, and what each person pays.",
    intro: [
      `Enter the distance, your vehicle's fuel economy and the price per ${imperial ? "gallon" : "litre"}. You see how much fuel you need and what the trip costs.`,
      imperial ? "Fuel economy goes in miles per gallon, as on the window sticker." : "Fuel economy can go in litres per 100 km or kilometres per litre.",
    ],
    comoSeCalcula: imperial
      ? ["Gallons = distance ÷ miles per gallon.", "Cost = gallons × price per gallon. A round trip doubles the distance."]
      : [
          "With litres per 100 km: litres = distance × economy ÷ 100.",
          "With kilometres per litre: litres = distance ÷ economy.",
          "Cost = litres × price per litre. A round trip doubles the distance.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "How do I convert mpg to litres per 100 km?",
        respuesta: `Divide ${formatearNumero(ctx, 235.215, 1)} by the mpg (US gallons). A car that does 30 mpg uses about ${formatearNumero(ctx, 235.215 / 30, 1)} litres per 100 km.`,
      },
      {
        pregunta: "Does it include tolls?",
        respuesta: "No. It only covers fuel. Add tolls and parking separately.",
      },
      {
        pregunta: "Why does my car use more fuel in town?",
        respuesta: "Stopping and starting takes more energy than steady highway driving, so city economy is usually worse.",
      },
    ],
    glosario: [
      { termino: "Fuel economy", definicion: "How far a vehicle goes on a given amount of fuel." },
      { termino: "mpg", definicion: "Miles per gallon. The higher, the better." },
    ],
  };
};
