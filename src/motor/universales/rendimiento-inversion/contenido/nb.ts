import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Beregn avkastning (ROI og CAGR)",
    title: tituloQueEntre(
      `Beregn avkastning: ROI og årlig avkastning | ${ctx.nombrePais}`,
      `Beregn avkastning | ${ctx.nombrePais}`,
      "Beregn avkastning",
    ),
    description: "Regn ut samlet avkastning (ROI) og årlig avkastning (CAGR) på en investering ut fra innskuddet, verdien i dag og antall år.",
    intro: [
      "En gevinst på 50 % høres bra ut, men den betyr ikke det samme over 2 år som over 10. For å sammenligne investeringer trenger du avkastningen per år.",
      "Fyll inn hva du investerte, hva det er verdt i dag og hvor mange år som har gått. Du ser samlet avkastning og årlig avkastning med renters rente.",
    ],
    comoSeCalcula: [
      "ROI = (sluttverdi + utbetalinger − investert beløp) ÷ investert beløp × 100.",
      "CAGR = ((sluttverdi + utbetalinger) ÷ investert beløp) opphøyd i (1 ÷ antall år), minus 1.",
      "CAGR er den gjennomsnittlige årlige veksten med renters rente, altså tempoet som gir samme resultat hvis det gjentas hvert år.",
    ],
    ejemplo: [
      `Investerer du ${m(inicial)} og ender med ${m(final)}, er gevinsten ${m(final - inicial)}. Det gir en ROI på ${p(roi(inicial, final))}.`,
      `Tok det 5 år, er den årlige avkastningen ${p(cagr(inicial, final, 5))}. Tok det 2 år, er den ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Hva er forskjellen på ROI og CAGR?",
        respuesta: "ROI er den samlede gevinsten på det du investerte, uansett hvor lang tid det tok. CAGR fordeler den per år, så du kan sammenligne investeringer med ulik varighet.",
      },
      {
        pregunta: "Hvorfor er ikke den årlige avkastningen bare den samlede delt på antall år?",
        respuesta: `Fordi gevinsten hvert år legges til kapitalen og også vokser. En gevinst på 50 % over 5 år tilsvarer ${p(cagr(1, 1.5, 5))} i året med renters rente, ikke ${formatearCifra(ctx, 50 / 5)} %.`,
      },
      {
        pregunta: "Hvordan regner jeg med utbytte eller renter jeg har fått?",
        respuesta: "Før dem opp under utbetalinger hvis du tok ut pengene. Har du investert dem på nytt, er de allerede med i sluttverdien.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on investment, den samlede gevinsten i prosent av det du satte inn." },
      { termino: "CAGR", definicion: "Compound annual growth rate, den gjennomsnittlige årlige avkastningen med renters rente." },
    ],
  };
};
