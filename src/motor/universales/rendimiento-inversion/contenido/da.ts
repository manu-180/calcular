import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Afkastberegner (ROI og CAGR)",
    title: tituloQueEntre(
      `Afkastberegner: ROI og årligt afkast | ${ctx.nombrePais}`,
      `Afkastberegner | ${ctx.nombrePais}`,
      "Afkastberegner",
    ),
    description: "Beregn det samlede afkast (ROI) og det årlige afkast (CAGR) af en investering ud fra indskuddet, værdien i dag og antal år.",
    intro: [
      "En gevinst på 50 % lyder godt, men den betyder ikke det samme over 2 år som over 10. For at sammenligne investeringer skal du bruge afkastet pr. år.",
      "Skriv, hvad du investerede, hvad det er værd i dag, og hvor mange år der er gået. Du ser det samlede afkast og det årlige afkast med renters rente.",
    ],
    comoSeCalcula: [
      "ROI = (slutværdi + udbetalinger − investeret beløb) ÷ investeret beløb × 100.",
      "CAGR = ((slutværdi + udbetalinger) ÷ investeret beløb) opløftet i (1 ÷ antal år), minus 1.",
      "CAGR er den gennemsnitlige årlige vækst med renters rente, altså det tempo, der giver samme resultat, hvis det gentages hvert år.",
    ],
    ejemplo: [
      `Investerer du ${m(inicial)} og ender med ${m(final)}, er gevinsten ${m(final - inicial)}. Det giver en ROI på ${p(roi(inicial, final))}.`,
      `Tog det 5 år, er det årlige afkast ${p(cagr(inicial, final, 5))}. Tog det 2 år, er det ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Hvad er forskellen på ROI og CAGR?",
        respuesta: "ROI er den samlede gevinst på det, du investerede, uanset hvor lang tid det tog. CAGR fordeler den pr. år, så du kan sammenligne investeringer med forskellig løbetid.",
      },
      {
        pregunta: "Hvorfor er det årlige afkast ikke bare det samlede afkast delt med antal år?",
        respuesta: `Fordi hvert års gevinst lægges til kapitalen og også vokser. En gevinst på 50 % over 5 år svarer til ${p(cagr(1, 1.5, 5))} om året med renters rente, ikke ${formatearCifra(ctx, 50 / 5)} %.`,
      },
      {
        pregunta: "Hvordan regner jeg udbytte eller renter med, som jeg har fået?",
        respuesta: "Skriv dem under udbetalinger, hvis du tog pengene ud. Har du geninvesteret dem, er de allerede med i slutværdien.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on investment, den samlede gevinst i procent af det, du satte ind." },
      { termino: "CAGR", definicion: "Compound annual growth rate, det gennemsnitlige årlige afkast med renters rente." },
    ],
  };
};
