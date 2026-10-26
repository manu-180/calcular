import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Regn nominel rente om til effektiv rente",
    title: tituloQueEntre(
      `Effektiv rente: regn om fra nominel rente | ${ctx.nombrePais}`,
      `Effektiv rente | ${ctx.nombrePais}`,
      "Effektiv rente",
    ),
    description: "Regn nominel årlig rente om til effektiv årlig rente og tilbage, med rentetilskrivning hver måned, hvert kvartal, hvert halve år eller hver dag.",
    intro: [
      "To tilbud med samme rente kan koste forskelligt. Forskellen ligger i, hvor tit renten tilskrives.",
      "Den effektive årlige rente gør tilbuddene sammenlignelige. Den viser, hvad du faktisk betaler eller får på et år. Vælg, hvilken rente du har, så regner vi den anden ud.",
    ],
    comoSeCalcula: [
      "Effektiv rente = (1 + nominel rente ÷ m) opløftet i m, minus 1. Her er m antal rentetilskrivninger om året, 12 ved månedlig og 4 ved kvartalsvis.",
      "Nominel rente = m × ((1 + effektiv rente) opløftet i 1 ÷ m, minus 1).",
      "Renten pr. periode er den nominelle rente delt med m.",
    ],
    ejemplo: [
      `En nominel rente på 12 % med rentetilskrivning hver måned svarer til en effektiv rente på ${p(aEfectiva(12, 12))}.`,
      `En effektiv rente på 10 % svarer til en nominel rente på ${p(aNominal(10, 12))}, når renten tilskrives hver måned.`,
    ],
    faq: [
      {
        pregunta: "Hvad er forskellen på nominel og effektiv rente?",
        respuesta:
          "Den nominelle rente er den årlige rente, før renters rente er regnet med. Den effektive rente tager højde for, at renterne også giver renter. Derfor er den effektive rente altid lige så høj som eller højere end den nominelle.",
      },
      {
        pregunta: "Hvilken rente skal jeg sammenligne lån på?",
        respuesta:
          "Den effektive rente, eller endnu bedre ÅOP. I ÅOP indgår også oprettelsesgebyrer og andre faste omkostninger, så den kan blive højere end det, du ser her. Sammenlign også de samlede omkostninger.",
      },
      {
        pregunta: "Hvorfor bliver den effektive rente højere, når renten tilskrives oftere?",
        respuesta:
          "Renten lægges til tidligere og begynder selv at give renter. Tilskrives renten kun én gang om året, er den nominelle og den effektive rente lige store.",
      },
    ],
    glosario: [
      { termino: "Nominel rente", definicion: "Den årlige rente uden effekten af renters rente." },
      { termino: "Effektiv rente", definicion: "Den årlige rente, når renters rente er regnet med." },
      { termino: "Rentetilskrivning", definicion: "Hvor tit renten lægges til gælden eller saldoen." },
    ],
  };
};
