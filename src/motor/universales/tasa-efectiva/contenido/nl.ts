import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Effectieve rente berekenen",
    title: tituloQueEntre(`Effectieve rente berekenen in ${ctx.nombrePais}`, "Effectieve rente berekenen"),
    description: "Reken een nominale jaarrente om naar een effectieve jaarrente en terug, met rentebijschrijving per maand, kwartaal, halfjaar of dag.",
    intro: [
      "Twee aanbiedingen met dezelfde rente kunnen toch verschillend uitpakken. Het verschil zit in hoe vaak de rente wordt berekend of uitbetaald.",
      "De effectieve jaarrente zet alles op één lijn: het is wat je in een jaar echt betaalt of ontvangt. Kies welke rente je hebt en je ziet de andere.",
    ],
    comoSeCalcula: [
      "Effectieve rente = (1 + nominale rente ÷ m) tot de macht m, min 1. Hier is m het aantal keer per jaar dat de rente wordt bijgeschreven: 12 per maand, 4 per kwartaal.",
      "Nominale rente = m × ((1 + effectieve rente) tot de macht 1 ÷ m, min 1).",
      "De rente per periode is de nominale rente gedeeld door m.",
    ],
    ejemplo: [
      `Een nominale rente van 12% met maandelijkse bijschrijving is een effectieve rente van ${p(aEfectiva(12, 12))}.`,
      `Een effectieve rente van 10% is een nominale rente van ${p(aNominal(10, 12))} als de rente elke maand wordt bijgeschreven.`,
    ],
    faq: [
      {
        pregunta: "Wat is het verschil tussen nominale en effectieve rente?",
        respuesta:
          "De nominale rente is de jaarrente zonder rente op rente. De effectieve rente telt die rente op rente wel mee. Daarom is de effectieve rente altijd gelijk aan of hoger dan de nominale.",
      },
      {
        pregunta: "Welke rente gebruik je om aanbiedingen te vergelijken?",
        respuesta:
          "Bij sparen de effectieve rente, want die laat zien wat je echt ontvangt. Bij een lening vergelijk je de effectieve rente en ook de totale kosten, met alle kosten erbij.",
      },
      {
        pregunta: "Waarom wordt de effectieve rente hoger als de rente vaker wordt bijgeschreven?",
        respuesta:
          "De rente komt eerder bij het saldo en levert dan zelf ook rente op. Wordt de rente één keer per jaar bijgeschreven, dan zijn nominale en effectieve rente gelijk.",
      },
    ],
    glosario: [
      { termino: "Nominale rente", definicion: "De rente per jaar, zonder rente op rente." },
      { termino: "Effectieve rente", definicion: "De rente per jaar met rente op rente erbij." },
      { termino: "Rentebijschrijving", definicion: "Het moment waarop de rente bij het saldo wordt opgeteld." },
    ],
  };
};
