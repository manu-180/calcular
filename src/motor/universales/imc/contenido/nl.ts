import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Weeg je 160 lb en ben je 5 ft 9 in lang, dan is je BMI ${n((160 * KG_POR_LB) / (m * m))}. Dat is een gezond gewicht.`,
        `Bij die lengte ligt een gezond gewicht tussen ${n((18.5 * m * m) / KG_POR_LB)} en ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Weeg je 70 kg en ben je ${n(1.75, 2)} m lang, dan is je BMI ${n(70 / (1.75 * 1.75))}. Dat is een gezond gewicht.`,
        `Bij die lengte ligt een gezond gewicht tussen ${n(18.5 * 1.75 * 1.75)} en ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "BMI berekenen",
    title: tituloQueEntre(`BMI berekenen in ${ctx.nombrePais}`, "BMI berekenen"),
    description: "Bereken je BMI met je gewicht en lengte. Je ziet je categorie volgens de WHO en welk gewicht bij jouw lengte gezond is.",
    intro: [
      "Vul je gewicht en je lengte in. Je ziet je BMI, de categorie volgens de Wereldgezondheidsorganisatie (WHO) en het gezonde gewicht bij jouw lengte.",
      "Het BMI is een algemene richtlijn voor volwassenen. Het vervangt niet het advies van een arts.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = gewicht in pond × 703 ÷ (lengte in inch × lengte in inch)." : "BMI = gewicht in kilo ÷ (lengte in meter × lengte in meter).",
      `Onder ${n(18.5)} is ondergewicht. ${n(18.5)} tot ${n(24.9)} is een gezond gewicht. 25 tot ${n(29.9)} is overgewicht. Vanaf 30 is het obesitas.`,
      `Een gezond gewicht is het gewicht waarbij je BMI bij jouw lengte tussen ${n(18.5)} en ${n(24.9)} ligt.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Wat is een gezond BMI?",
        respuesta: `Volgens de WHO een BMI tussen ${n(18.5)} en ${n(24.9)} bij volwassenen. Die grenzen zijn voor vrouwen en mannen hetzelfde.`,
      },
      {
        pregunta: "Klopt het BMI voor iedereen?",
        respuesta: "Nee. Het ziet geen verschil tussen spieren en vet, dus wie heel gespierd is, kan een hoog BMI hebben. Bij zwangerschap en bij kinderen en tieners werkt het ook anders.",
      },
      {
        pregunta: "Hoe reken je je BMI met de hand uit?",
        respuesta: `Deel je gewicht in kilo door je lengte in meter in het kwadraat. Bij 70 kg en ${n(1.75, 2)} m is dat 70 ÷ (${n(1.75, 2)} × ${n(1.75, 2)}) = ${n(70 / (1.75 * 1.75))}.`,
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Body mass index: hoe je gewicht zich verhoudt tot je lengte." },
      { termino: "WHO", definicion: "De Wereldgezondheidsorganisatie, die de BMI-categorieën voor volwassenen vaststelt." },
    ],
  };
};
