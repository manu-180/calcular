import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Voor een rit van 150 mijl heen en terug met een auto die 30 mpg rijdt, heb je ${formatearNumero(ctx, galones)} gallon brandstof nodig.`,
          `Bij ${m(precio)} per gallon is dat ${m(galones * precio)}. Rij je met z'n tweeën, dan betaalt ieder ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Voor een rit van 300 km heen en terug met een auto die 8 liter per 100 km verbruikt, heb je ${formatearNumero(ctx, litros)} liter brandstof nodig.`,
          `Bij ${m(precio)} per liter is dat ${m(litros * precio)}. Rij je met z'n tweeën, dan betaalt ieder ${m((litros * precio) / 2)}.`,
        ];
      })();
  return {
    h1: "Brandstofkosten berekenen",
    title: tituloQueEntre(`Brandstofkosten berekenen in ${ctx.nombrePais}`, "Brandstofkosten berekenen"),
    description: "Bereken wat een rit kost aan brandstof met de afstand, het verbruik van je auto en de prijs aan de pomp. Ook wat ieder betaalt als je deelt.",
    intro: [
      `Vul de afstand in, het verbruik van je auto en de prijs per ${imperial ? "gallon" : "liter"}. Je ziet hoeveel brandstof je nodig hebt en wat de rit kost.`,
      imperial
        ? "Het verbruik vul je in als mijl per gallon."
        : "Het verbruik vul je in als liter per 100 km of als kilometer per liter. Rijdt je auto 1 op 15, kies dan kilometer per liter en vul 15 in.",
    ],
    comoSeCalcula: imperial
      ? ["Gallon = afstand ÷ mijl per gallon.", "Kosten = gallon × prijs per gallon. Heen en terug verdubbelt de afstand."]
      : [
          "Met liter per 100 km: liter = afstand × verbruik ÷ 100.",
          "Met kilometer per liter: liter = afstand ÷ verbruik.",
          "Kosten = liter × prijs per liter. Heen en terug verdubbelt de afstand.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Hoe reken je 1 op 15 om naar liter per 100 km?",
        respuesta: `Deel 100 door het aantal kilometers per liter. Een auto die 1 op 15 rijdt, verbruikt ${formatearNumero(ctx, 100 / 15, 1)} liter per 100 km.`,
      },
      {
        pregunta: "Zit tol erbij?",
        respuesta: "Nee. Deze rekenhulp telt alleen de brandstof. Tol en parkeren tel je er zelf bij op.",
      },
      {
        pregunta: "Waarom verbruikt mijn auto meer in de stad?",
        respuesta: "Optrekken en remmen kost meer energie dan rustig doorrijden op de snelweg. Daarom is het verbruik in de stad meestal hoger.",
      },
    ],
    glosario: [
      { termino: "Verbruik", definicion: "Hoeveel brandstof een auto nodig heeft voor een bepaalde afstand." },
      { termino: "1 op 15", definicion: "Met 1 liter brandstof rijd je 15 kilometer. Hoe hoger het getal, hoe zuiniger." },
    ],
  };
};
