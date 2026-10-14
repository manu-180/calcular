import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Btw berekenen in ${ctx.nombrePais}`,
    title: tituloQueEntre(`Btw berekenen (${tasa}) in ${ctx.nombrePais}`, `Btw (${tasa}) in ${ctx.nombrePais}`, `Btw berekenen (${tasa})`),
    description: `Tel ${tasa} btw op bij een prijs of haal het eruit, in één stap. Je ziet de prijs exclusief btw, de btw zelf en het totaal, tot op de cent.`,
    intro: [
      `Het algemene btw-tarief dat deze rekenhulp voor ${ctx.nombrePais} gebruikt, is ${tasa}.`,
      "Kies of je btw wilt optellen bij een prijs exclusief btw of eruit wilt halen bij een prijs inclusief btw. Vul daarna het bedrag in.",
    ],
    comoSeCalcula: [
      "Btw optellen: btw = prijs exclusief btw × tarief ÷ 100. Totaal = prijs exclusief btw + btw.",
      "Btw eruit halen: prijs exclusief btw = prijs inclusief btw ÷ (1 + tarief ÷ 100). De btw is het verschil.",
      "Geldt voor een product een verlaagd tarief, vul dat dan in bij “Ander btw-tarief”.",
    ],
    ejemplo: [
      `Om btw op te tellen bij ${precio}, vermenigvuldig je het bedrag met ${tasa} en tel je de uitkomst bij de prijs op.`,
      `Om te zien hoeveel btw er in ${precio} inclusief btw zit, deel je het bedrag door 1 plus het tarief en trek je dat af.`,
    ],
    faq: [
      {
        pregunta: "Hoe haal je de btw van een prijs af?",
        respuesta: "Deel de prijs door 1 plus het tarief als decimaal getal. Wat overblijft is de prijs exclusief btw. Het verschil is de btw.",
      },
      {
        pregunta: "Waarom kun je het percentage niet gewoon van het totaal aftrekken?",
        respuesta: "Omdat de btw berekend is over de lagere prijs exclusief btw. Trek je het percentage van het totaal af, dan haal je er te veel af.",
      },
      {
        pregunta: `Geldt ${tasa} voor alles?`,
        respuesta: "Niet altijd. Voor sommige producten en diensten, zoals eten of medicijnen, geldt een verlaagd tarief of geen btw. Gebruik dan “Ander btw-tarief”.",
      },
    ],
    glosario: [
      { termino: "Btw", definicion: "Belasting over de toegevoegde waarde. Die komt bovenop de prijs van producten en diensten." },
      { termino: "Exclusief btw", definicion: "De prijs voordat de btw erbij komt. Vaak afgekort als excl. btw." },
    ],
  };
};
