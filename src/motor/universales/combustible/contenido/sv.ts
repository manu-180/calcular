import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `En resa på 150 miles tur och retur med en bil som går 30 mpg drar ${formatearNumero(ctx, galones)} gallon.`,
          `Med ${m(precio)} per gallon blir det ${m(galones * precio)}. Delat på 2 personer betalar var och en ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `En resa på 300 km tur och retur med en bil som drar 8 liter per 100 km (${formatearNumero(ctx, 8 / 10, 1)} liter per mil) kräver ${formatearNumero(ctx, litros)} liter.`,
          `Med ${m(precio)} per liter blir det ${m(litros * precio)}. Delat på 2 personer betalar var och en ${m((litros * precio) / 2)}.`,
        ];
      })();
  return {
    h1: "Räkna ut bensinkostnaden för resan",
    title: tituloQueEntre(
      `Bensinkostnad: vad kostar resan i bränsle | ${ctx.nombrePais}`,
      `Bensinkostnad | ${ctx.nombrePais}`,
      "Bensinkostnad",
    ),
    description: "Räkna ut vad en resa kostar i bensin eller diesel utifrån sträckan, bilens förbrukning och bränslepriset, och vad var och en betalar.",
    intro: [
      `Fyll i sträckan, bilens förbrukning och priset per ${imperial ? "gallon" : "liter"}. Du ser hur mycket bränsle som går åt och vad resan kostar.`,
      imperial
        ? "Förbrukningen anges i miles per gallon, som på bilens dekal."
        : "Förbrukningen kan anges i liter per 100 km eller kilometer per liter. Har du liter per mil, gånger 10 ger liter per 100 km.",
    ],
    comoSeCalcula: imperial
      ? ["Gallon = sträcka ÷ miles per gallon.", "Kostnad = gallon × pris per gallon. Tur och retur dubblar sträckan."]
      : [
          "Med liter per 100 km: liter = sträcka × förbrukning ÷ 100.",
          "Med kilometer per liter: liter = sträcka ÷ förbrukning.",
          "Kostnad = liter × pris per liter. Tur och retur dubblar sträckan.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Hur räknar jag om liter per mil till liter per 100 km?",
        respuesta: `En mil är 10 km, så du multiplicerar med 10. En bil som drar ${formatearNumero(ctx, 0.6, 1)} liter per mil drar ${formatearNumero(ctx, 6)} liter per 100 km.`,
      },
      {
        pregunta: "Ingår vägtullar och parkering?",
        respuesta: "Nej. Beräkningen gäller bara bränslet. Lägg till tullar, broavgifter och parkering separat.",
      },
      {
        pregunta: "Varför drar bilen mer i stan?",
        respuesta: "Att stanna och starta kräver mer energi än att köra i jämn fart på landsväg, så förbrukningen i stadstrafik blir oftast högre.",
      },
    ],
    glosario: [
      { termino: "Bränsleförbrukning", definicion: "Hur mycket bränsle bilen drar på en viss sträcka." },
      { termino: "Mil", definicion: "Svensk mil, 10 kilometer. Förbrukning anges ofta i liter per mil." },
    ],
  };
};
