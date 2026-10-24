import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Regn om nominell rente til effektiv rente",
    title: tituloQueEntre(
      `Effektiv rente: regn om fra nominell rente | ${ctx.nombrePais}`,
      `Effektiv rente | ${ctx.nombrePais}`,
      "Effektiv rente",
    ),
    description: "Regn om nominell rente per år til effektiv rente og tilbake, med renter som legges til hver måned, hvert kvartal, hvert halvår eller hver dag.",
    intro: [
      "To tilbud med samme rente kan koste ulikt. Forskjellen ligger i hvor ofte renten legges til.",
      "Den effektive renten gjør tilbudene sammenlignbare. Den viser hva du faktisk betaler eller får på ett år. Velg hvilken rente du har, så regner vi ut den andre.",
    ],
    comoSeCalcula: [
      "Effektiv rente = (1 + nominell rente ÷ m) opphøyd i m, minus 1. Her er m antall ganger renten legges til i året, 12 når det skjer månedlig og 4 når det skjer kvartalsvis.",
      "Nominell rente = m × ((1 + effektiv rente) opphøyd i 1 ÷ m, minus 1).",
      "Renten per periode er den nominelle renten delt på m.",
    ],
    ejemplo: [
      `En nominell rente på 12 % som legges til hver måned, gir en effektiv rente på ${p(aEfectiva(12, 12))}.`,
      `En effektiv rente på 10 % tilsvarer en nominell rente på ${p(aNominal(10, 12))} når renten legges til hver måned.`,
    ],
    faq: [
      {
        pregunta: "Hva er forskjellen på nominell og effektiv rente?",
        respuesta:
          "Den nominelle renten er renten per år før rentes rente er regnet med. Den effektive renten tar hensyn til at rentene også gir renter. Derfor er den effektive renten alltid like høy som eller høyere enn den nominelle.",
      },
      {
        pregunta: "Hvilken rente skal jeg sammenligne lån på?",
        respuesta:
          "Den effektive renten. I tilbud fra banker og långivere er også etableringsgebyr og andre faste kostnader regnet inn i den effektive renten, så den kan bli høyere enn det du ser her. Sammenlign også totalkostnaden.",
      },
      {
        pregunta: "Hvorfor blir den effektive renten høyere når renten legges til oftere?",
        respuesta:
          "Renten legges til tidligere og begynner selv å gi renter. Legges renten til bare én gang i året, er nominell og effektiv rente like store.",
      },
    ],
    glosario: [
      { termino: "Nominell rente", definicion: "Renten per år uten virkningen av rentes rente." },
      { termino: "Effektiv rente", definicion: "Renten per år når rentes rente er regnet med." },
      { termino: "Rentes rente", definicion: "At rentene legges til beløpet og selv gir renter i neste periode." },
    ],
  };
};
