import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Budsjettkalkulator med 50/30/20-regelen",
    title: tituloQueEntre(
      `Budsjett 50/30/20: fordel lønnen etter skatt | ${ctx.nombrePais}`,
      `Budsjett 50/30/20 | ${ctx.nombrePais}`,
      "Budsjett 50/30/20",
    ),
    description: "Fordel lønnen etter skatt med 50/30/20-regelen. Se hvor mye som går til nødvendige utgifter, kos og sparing, og juster andelene etter behov.",
    intro: [
      "50/30/20-regelen er en enkel måte å planlegge måneden på. Halvparten går til det nødvendige, 30 % til det du liker, og 20 % til sparing.",
      "Fyll inn lønnen etter skatt, så ser du hvor mye som går til hver del. Ser situasjonen din annerledes ut, for eksempel med høy husleie, justerer du prosentsatsene.",
    ],
    comoSeCalcula: [
      "Nødvendige utgifter = inntekt × 50 %.",
      "Kos og annet = inntekt × 30 %.",
      "Sparing = inntekt × 20 %. De tre prosentsatsene må bli 100 % til sammen.",
    ],
    ejemplo: [
      `Med ${m(ingreso)} i måneden går ${m(ingreso * 0.5)} til nødvendige utgifter, ${m(ingreso * 0.3)} til kos og ${m(ingreso * 0.2)} til sparing.`,
      `På ett år blir de 20 prosentene til ${m(ingreso * 0.2 * 12)} i sparing.`,
    ],
    faq: [
      {
        pregunta: "Hva regnes som nødvendig, og hva er kos?",
        respuesta:
          "Nødvendige utgifter er regninger du må betale, som bolig, mat, strøm, transport, helse og minstebeløpene på lån. Kos er det du kan kutte ned på hvis det blir nødvendig.",
      },
      {
        pregunta: "Hva gjør jeg hvis de nødvendige utgiftene er mer enn 50 %?",
        respuesta: "Det er vanlig, særlig med høy husleie. Prøv 60/20/20 eller 70/20/10, men unngå å sette sparingen ned til null.",
      },
      {
        pregunta: "Regnes nedbetaling av gjeld som sparing?",
        respuesta: "Minstebeløpene hører til de nødvendige utgiftene. Alt du betaler ekstra for å bli gjeldfri raskere, regnes som sparing, fordi det styrker økonomien din på samme måte.",
      },
    ],
    glosario: [
      { termino: "Lønn etter skatt", definicion: "Det du får utbetalt etter skatt og trekk, også kalt nettolønn." },
      { termino: "50/30/20-regelen", definicion: "En måte å fordele inntekten mellom nødvendige utgifter, kos og sparing." },
    ],
  };
};
