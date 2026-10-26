import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const cuanto =
    ctx.pais === "DK"
      ? "Det er helt frivilligt. I Danmark er betjeningen regnet med i prisen, så drikkepenge er en ekstra tak for god service. Mange runder bare op."
      : `Det afhænger af skikken. Tjek, hvad der er almindeligt i ${ctx.nombrePais}, og om der allerede står et servicegebyr på regningen. Mange steder er det nok at runde op.`;
  return {
    h1: "Beregn drikkepenge",
    title: tituloQueEntre(
      `Drikkepenge: beregn drikkepenge og del regningen | ${ctx.nombrePais}`,
      `Beregn drikkepenge | ${ctx.nombrePais}`,
      "Beregn drikkepenge",
    ),
    description: "Beregn drikkepenge, det samlede beløb og hvad hver person betaler, når I deler regningen. Du kan runde hver andel op til et rundt beløb.",
    intro: [
      "Skriv regningens beløb, hvor mange procent du vil give i drikkepenge, og hvor mange der betaler. Du ser drikkepengene, det samlede beløb og hver andel.",
      "Vil du have runde beløb, rundes hver andel op, og det, der bliver tilovers, går til drikkepenge.",
    ],
    comoSeCalcula: [
      "Drikkepenge = regningens beløb × procentsats ÷ 100.",
      "I alt = regningens beløb + drikkepenge.",
      "Hver andel er det samlede beløb delt med antallet af personer.",
    ],
    ejemplo: [
      `På en regning på ${m(cuenta)} giver 10 % i drikkepenge ${m(propina)}, og det samlede beløb bliver ${m(cuenta + propina)}.`,
      `Deler I på 3 personer, betaler hver ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Hvor mange drikkepenge skal jeg give?",
        respuesta: cuanto,
      },
      {
        pregunta: "Skal drikkepenge regnes af beløbet før eller efter moms?",
        respuesta: "De fleste regner af det samlede beløb, der står på regningen. Vil du regne af beløbet uden moms, skriver du det i stedet.",
      },
      {
        pregunta: "Hvordan regner jeg hurtigt 10 % i drikkepenge ud?",
        respuesta: `Del regningens beløb med 10. På en regning på ${n(450)} giver det ${n(450 / 10)}.`,
      },
    ],
    glosario: [
      { termino: "Drikkepenge", definicion: "Et ekstra beløb, du giver for betjeningen, ud over prisen." },
      { termino: "Servicegebyr", definicion: "Et gebyr for betjeningen, som stedet allerede har lagt på regningen." },
    ],
  };
};
