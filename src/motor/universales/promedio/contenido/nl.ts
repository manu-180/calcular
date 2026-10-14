import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const gewogen = (7 * 20 + 8 * 30 + 9 * 50) / (20 + 30 + 50);
  const gewoon = (7 + 8 + 9) / 3;
  return {
    h1: "Gewogen gemiddelde berekenen",
    title: tituloQueEntre(`Gewogen gemiddelde berekenen in ${ctx.nombrePais}`, "Gewogen gemiddelde berekenen", "Gewogen gemiddelde"),
    description: "Bereken je gemiddelde cijfer, gewoon of gewogen, met maximaal 10 cijfers en de weging van elk: een percentage, studiepunten of hoe vaak het telt.",
    intro: [
      "Vul elk cijfer in en hoe zwaar het telt. Je ziet het gewogen gemiddelde en het gewone gemiddelde ernaast.",
      "Handig voor je rapport, je studie of elk gemiddelde waarin het ene getal zwaarder telt dan het andere.",
    ],
    comoSeCalcula: [
      "Gewoon gemiddelde = som van de cijfers ÷ aantal cijfers.",
      "Gewogen gemiddelde = som van (cijfer × weging) ÷ som van de wegingen.",
      "De wegingen hoeven samen geen 100 te zijn: je deelt altijd door hun totaal.",
    ],
    ejemplo: [
      `Heb je een 7 met weging 20%, een 8 met weging 30% en een 9 met weging 50%, dan is je gewogen gemiddelde ${n(gewogen)}.`,
      `Het gewone gemiddelde van die drie cijfers is ${n(gewoon)}. De 9 telt zwaarder en trekt het gewogen gemiddelde omhoog.`,
    ],
    faq: [
      {
        pregunta: "Hoe bereken je een gewogen gemiddelde?",
        respuesta: "Vermenigvuldig elk cijfer met zijn weging, tel alles op en deel door de som van de wegingen.",
      },
      {
        pregunta: "Wat als de wegingen samen geen 100% zijn?",
        respuesta: "Geen probleem. Telt het ene vak 6 studiepunten en het andere 4, vul dan 6 en 4 in. De som deelt door het totaal van de wegingen.",
      },
      {
        pregunta: "Wat is het verschil tussen een gewoon en een gewogen gemiddelde?",
        respuesta: "Bij een gewoon gemiddelde telt elk cijfer even zwaar. Bij een gewogen gemiddelde telt elk cijfer mee volgens zijn weging.",
      },
      {
        pregunta: "Hoe tel je een cijfer dat twee keer meetelt?",
        respuesta: "Geef het weging 2 en de andere cijfers weging 1. Dan telt het precies dubbel.",
      },
    ],
    glosario: [
      { termino: "Weging", definicion: "Hoe zwaar een cijfer meetelt in het eindgemiddelde." },
      { termino: "Gewogen gemiddelde", definicion: "Een gemiddelde waarin elk cijfer met zijn weging wordt vermenigvuldigd." },
    ],
  };
};
