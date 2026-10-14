import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Een man van 35 die 180 lb weegt en 5 ft 10 in lang is, heeft een ruststofwisseling van ongeveer ${n(basal)} kcal.`,
          `Beweegt hij weinig, dan blijft hij op gewicht met ongeveer ${n(basal * FACTORES.sedentaria)} kcal per dag.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Een vrouw van 30 die 60 kg weegt en 165 cm lang is, heeft een ruststofwisseling van ongeveer ${n(basal)} kcal.`,
          `Is ze gemiddeld actief, dan blijft ze op gewicht met ongeveer ${n(basal * FACTORES.moderada)} kcal per dag.`,
        ];
      })();
  return {
    h1: "Calorieën berekenen",
    title: tituloQueEntre(`Calorieën berekenen in ${ctx.nombrePais}`, "Calorieën berekenen"),
    description: "Bereken hoeveel calorieën je per dag verbruikt op basis van leeftijd, gewicht, lengte en beweging, en hoeveel je nodig hebt om af te vallen of aan te komen.",
    intro: [
      "Vul je gegevens in en hoe actief je bent. Je ziet je ruststofwisseling en hoeveel calorieën je op een gewone dag verbruikt.",
      "Het is een schatting. Het vervangt niet het advies van een arts of diëtist.",
    ],
    comoSeCalcula: [
      `Ruststofwisseling (Mifflin-St Jeor): 10 × gewicht in kg + ${n(6.25, 2)} × lengte in cm − 5 × leeftijd, plus 5 voor mannen of min 161 voor vrouwen.`,
      `Calorieën om op gewicht te blijven = ruststofwisseling × activiteitsfactor, van ${n(1.2, 1)} (weinig beweging) tot ${n(1.9, 1)} (heel veel).`,
      `Om af te vallen gaat er ${DEFICIT} kcal per dag af, om aan te komen komt er ${SUPERAVIT} bij. Dat is een rustige verandering die je volhoudt.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Wat is ruststofwisseling?",
        respuesta: "Dat is de energie die je lichaam in volledige rust gebruikt om te ademen, warm te blijven en je organen te laten werken.",
      },
      {
        pregunta: "Hoeveel calorieën moet ik eten om af te vallen?",
        respuesta: `Een veelgebruikt begin is ongeveer ${DEFICIT} kcal per dag minder dan wat je nodig hebt om op gewicht te blijven. Stem het liefst af met een diëtist.`,
      },
      {
        pregunta: "Hoe nauwkeurig is de formule?",
        respuesta: "Mifflin-St Jeor is een van de meest gebruikte formules, maar geeft een gemiddelde. Erfelijkheid, spiermassa en gezondheid bepalen wat je echt verbruikt.",
      },
    ],
    glosario: [
      { termino: "Calorie (kcal)", definicion: "De eenheid voor de energie in voeding en voor wat je lichaam verbruikt." },
      { termino: "Ruststofwisseling", definicion: "De calorieën die je lichaam in volledige rust verbruikt. Ook wel basaal metabolisme genoemd." },
    ],
  };
};
