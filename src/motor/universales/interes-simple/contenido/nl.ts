import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Enkelvoudige rente berekenen",
    title: tituloQueEntre(`Enkelvoudige rente berekenen in ${ctx.nombrePais}`, "Enkelvoudige rente berekenen", "Enkelvoudige rente"),
    description: "Bereken enkelvoudige rente over een hoofdsom tegen een jaarrente, over dagen, maanden of jaren. Kies een jaar van 365 of 360 dagen en zie het totaal.",
    intro: [
      "Enkelvoudige rente reken je altijd over de oorspronkelijke hoofdsom. Tijdens de looptijd komt de rente niet bij het saldo.",
      "Je gebruikt het bij korte deposito's, leningen tussen mensen en heel wat huiswerkopgaven.",
    ],
    comoSeCalcula: [
      "Rente = hoofdsom × rente per jaar × looptijd in jaren.",
      "Bij maanden deel je door 12. Bij dagen deel je door 365 of 360, afhankelijk van het jaar dat de bank gebruikt.",
      "Totaal = hoofdsom + rente.",
    ],
    ejemplo: [
      `${m(capital)} tegen 10% per jaar levert in 6 maanden ${m(capital * 0.1 * 0.5)} rente op.`,
      `Dezelfde hoofdsom levert in 90 dagen ${m((capital * 0.1 * 90) / 365)} op met een jaar van 365 dagen en ${m((capital * 0.1 * 90) / 360)} met een jaar van 360 dagen.`,
    ],
    faq: [
      {
        pregunta: "Wat is de formule voor enkelvoudige rente?",
        respuesta: `R = H × r × t. H is de hoofdsom, r de jaarrente als decimaal getal (10% is ${formatearNumero(ctx, 0.1, 2)}) en t de looptijd in jaren.`,
      },
      {
        pregunta: "Wat is het verschil met rente op rente?",
        respuesta: "Enkelvoudige rente reken je altijd over dezelfde hoofdsom. Bij rente op rente komt de rente bij het saldo en levert die zelf ook rente op.",
      },
      {
        pregunta: "Waarom rekenen sommige banken met 360 dagen?",
        respuesta: "Dat is een afspraak in het bankwezen die het rekenen makkelijker maakt. Met 360 dagen valt de rente net iets hoger uit. Vraag na welke je bank gebruikt.",
      },
    ],
    glosario: [
      { termino: "Hoofdsom", definicion: "Het geld dat je uitleent of belegt." },
      { termino: "Bankjaar", definicion: "Een jaar van 360 dagen, met maanden van 30 dagen." },
    ],
  };
};
