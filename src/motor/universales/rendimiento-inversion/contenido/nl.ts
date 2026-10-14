import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Rendement berekenen",
    title: tituloQueEntre(`Rendement berekenen in ${ctx.nombrePais}: ROI en CAGR`, `Rendement berekenen in ${ctx.nombrePais}`, "Rendement berekenen: ROI en CAGR"),
    description: "Bereken het totale rendement (ROI) en het rendement per jaar (CAGR) van een belegging, met je inleg, de waarde nu en het aantal jaar.",
    intro: [
      "50% winst klinkt mooi, maar over 2 jaar is dat iets heel anders dan over 10 jaar. Om beleggingen te vergelijken heb je het rendement per jaar nodig.",
      "Vul in wat je hebt ingelegd, wat het nu waard is en hoeveel jaar er voorbij is. Je ziet het totale rendement en het gemiddelde rendement per jaar.",
    ],
    comoSeCalcula: [
      "ROI = (eindwaarde + ontvangen inkomsten − inleg) ÷ inleg × 100.",
      "CAGR = ((eindwaarde + ontvangen inkomsten) ÷ inleg) tot de macht (1 ÷ aantal jaar), min 1.",
      "De CAGR is het rendement per jaar met rente op rente: het rendement dat hetzelfde oplevert als het elk jaar terugkomt.",
    ],
    ejemplo: [
      `Leg je ${m(inicial)} in en eindig je met ${m(final)}, dan is je winst ${m(final - inicial)}. Dat is een ROI van ${p(roi(inicial, final))}.`,
      `Duurde dat 5 jaar, dan is het rendement per jaar ${p(cagr(inicial, final, 5))}. Duurde het 2 jaar, dan is het ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Wat is het verschil tussen ROI en CAGR?",
        respuesta: "ROI is de totale winst op je inleg, hoe lang het ook duurde. CAGR verdeelt die winst per jaar, zodat je beleggingen van verschillende duur kunt vergelijken.",
      },
      {
        pregunta: "Waarom is het rendement per jaar niet gewoon het totaal gedeeld door het aantal jaar?",
        respuesta: `Omdat de winst van elk jaar bij je vermogen komt en zelf ook rendement oplevert. 50% winst over 5 jaar is ${p(cagr(1, 1.5, 5))} per jaar met rente op rente, geen 10%.`,
      },
      {
        pregunta: "Hoe tel je ontvangen dividend of rente mee?",
        respuesta: "Heb je het opgenomen, vul het dan in bij tussentijds ontvangen inkomsten. Heb je het opnieuw belegd, dan zit het al in de eindwaarde.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on investment: de totale winst als percentage van je inleg." },
      { termino: "CAGR", definicion: "Compound annual growth rate: het gemiddelde rendement per jaar, met rente op rente." },
    ],
  };
};
