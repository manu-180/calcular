import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Tipskalkulator",
    title: tituloQueEntre(
      `Tipskalkulator: regn ut tips og del regningen | ${ctx.nombrePais}`,
      `Tipskalkulator | ${ctx.nombrePais}`,
      "Tipskalkulator",
    ),
    description: "Regn ut tipset, totalbeløpet og hva hver enkelt betaler når dere deler regningen. Du kan runde av hver andel oppover til et rundt beløp.",
    intro: [
      "Fyll inn beløpet på regningen, hvor mange prosent du vil gi i tips og hvor mange som betaler. Du ser tipset, totalen og hver andel.",
      "Vil du ha runde beløp, rundes hver andel av oppover, og det som blir til overs, går til tips.",
    ],
    comoSeCalcula: [
      "Tips = beløpet på regningen × tipsprosent ÷ 100.",
      "Totalt = beløpet på regningen + tips.",
      "Hver andel er totalen delt på antall personer.",
    ],
    ejemplo: [
      `På en regning på ${m(cuenta)} blir 10 % i tips ${m(propina)}, og totalen blir ${m(cuenta + propina)}.`,
      `Deler dere på 3 personer, betaler hver ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Hvor mye tips bør jeg gi?",
        respuesta: `Det kommer an på skikken der du er. Sjekk hva som er vanlig i ${ctx.nombrePais}, og om serviceavgift allerede er tatt med på regningen. Mange steder er tips frivillig, og det holder å runde opp.`,
      },
      {
        pregunta: "Skal tipset regnes av beløpet før eller etter mva?",
        respuesta: "De fleste regner av totalen som står på regningen. Vil du regne av beløpet uten mva, fyller du inn det i stedet.",
      },
      {
        pregunta: "Hvordan regner jeg raskt ut 10 % i tips?",
        respuesta: `Del beløpet på regningen på 10. På en regning på ${n(450)} blir det ${n(450 / 10)}.`,
      },
    ],
    glosario: [
      { termino: "Tips", definicion: "Et ekstra beløp du gir for servicen, i tillegg til prisen." },
      { termino: "Serviceavgift", definicion: "En avgift stedet allerede har lagt til på regningen for servicen." },
    ],
  };
};
