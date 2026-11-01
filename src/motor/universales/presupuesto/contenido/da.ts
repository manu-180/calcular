import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Budgetberegner med 50/30/20-reglen",
    title: tituloQueEntre(
      `Budget 50/30/20: fordel din løn efter skat | ${ctx.nombrePais}`,
      `Budget 50/30/20 | ${ctx.nombrePais}`,
      "Budget 50/30/20",
    ),
    description: "Fordel din løn efter skat med 50/30/20-reglen. Se, hvor meget der går til nødvendige udgifter, fornøjelser og opsparing, og ret andelene efter behov.",
    intro: [
      "50/30/20-reglen er en enkel måde at planlægge måneden på. Halvdelen går til det nødvendige, 30 % til det, du godt kan lide, og 20 % til opsparing.",
      "Skriv din løn efter skat, så ser du, hvor meget der går til hver del. Ser din situation anderledes ud, fx med høj husleje, så ret procentsatserne.",
    ],
    comoSeCalcula: [
      "Nødvendige udgifter = indkomst × 50 %.",
      "Fornøjelser og andet = indkomst × 30 %.",
      "Opsparing = indkomst × 20 %. De tre procentsatser skal give 100 % tilsammen.",
    ],
    ejemplo: [
      `Med ${m(ingreso)} om måneden går ${m(ingreso * 0.5)} til nødvendige udgifter, ${m(ingreso * 0.3)} til fornøjelser og ${m(ingreso * 0.2)} til opsparing.`,
      `På et år bliver de 20 procent til ${m(ingreso * 0.2 * 12)} i opsparing.`,
    ],
    faq: [
      {
        pregunta: "Hvad tæller som nødvendigt, og hvad er fornøjelser?",
        respuesta:
          "Nødvendige udgifter er regninger, du skal betale, som bolig, mad, el, transport, sundhed og minimumsbetalingerne på lån. Fornøjelser er det, du kan skære ned på, hvis det bliver nødvendigt.",
      },
      {
        pregunta: "Hvad gør jeg, hvis de nødvendige udgifter er mere end 50 %?",
        respuesta: "Det er almindeligt, især med høj husleje. Prøv 60/20/20 eller 70/20/10, men undgå at sætte opsparingen ned til nul.",
      },
      {
        pregunta: "Tæller afdrag på gæld som opsparing?",
        respuesta: "Minimumsbetalingerne hører til de nødvendige udgifter. Alt, hvad du betaler ekstra for at blive gældfri hurtigere, tæller som opsparing, fordi det forbedrer din økonomi på samme måde.",
      },
    ],
    glosario: [
      { termino: "Løn efter skat", definicion: "Det, du får udbetalt efter skat og fradrag, også kaldet nettoløn." },
      { termino: "50/30/20-reglen", definicion: "En måde at fordele indkomsten mellem nødvendige udgifter, fornøjelser og opsparing." },
    ],
  };
};
