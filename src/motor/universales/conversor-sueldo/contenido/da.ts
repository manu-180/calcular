import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mensual = montoEjemplo(ctx, 4000);
  const hora = montoEjemplo(ctx, 20);
  const horasAnio = 37 * 52;
  const horasMes = horasAnio / 12;
  return {
    h1: "Timeløn til månedsløn og omvendt",
    title: tituloQueEntre(
      `Timeløn til månedsløn: regn din løn om | ${ctx.nombrePais}`,
      `Timeløn til månedsløn | ${ctx.nombrePais}`,
      "Timeløn til månedsløn",
    ),
    description: "Regn lønnen om mellem timeløn, dagsløn, ugeløn, månedsløn og årsløn, med dine egne arbejdstimer og betalte uger.",
    intro: [
      "Hvad er din månedsløn i timen? Hvad giver en timeløn om måneden eller på et år? Skriv et beløb, vælg periode, så ser du alle de andre.",
      "Brug den til at sammenligne jobtilbud, regne på overarbejde eller se, hvad din tid er værd.",
    ],
    comoSeCalcula: [
      "Først regnes alt om til en årsløn.",
      "Timeløn = årsløn ÷ (timer om ugen × betalte uger).",
      "Dagsløn = årsløn ÷ (dage om ugen × betalte uger). Ugeløn = årsløn ÷ betalte uger.",
      "Månedsløn = årsløn ÷ 12. Løn pr. halve måned = årsløn ÷ 24.",
    ],
    ejemplo: [
      `En månedsløn på ${m(mensual)} ved 37 timer om ugen svarer til ${m((mensual * 12) / horasAnio)} i timen og ${m(mensual * 12)} om året.`,
      `En timeløn på ${m(hora)} på fuld tid giver ${m(hora * horasMes)} om måneden og ${m(hora * horasAnio)} om året.`,
    ],
    faq: [
      {
        pregunta: "Hvor mange arbejdstimer er der på et år?",
        respuesta: `Med 37 timer om ugen og 52 betalte uger giver det ${formatearNumero(ctx, horasAnio)} timer, eller ${formatearNumero(ctx, horasMes, 2)} timer om måneden.`,
      },
      {
        pregunta: "Hvordan regner jeg timeløn om til månedsløn?",
        respuesta: `Gang timelønnen med antal timer om ugen og med 52, og del med 12. På fuld tid med 37 timer er det det samme som at gange timelønnen med ${formatearNumero(ctx, horasMes, 2)}.`,
      },
      {
        pregunta: "Hvorfor giver ugelønnen gange 4 ikke månedslønnen?",
        respuesta: `Fordi en måned i gennemsnit har ${formatearNumero(ctx, 52 / 12, 2)} uger, ikke 4. For at gå fra ugeløn til månedsløn ganger du med 52 og deler med 12.`,
      },
      {
        pregunta: "Er skat eller tillæg regnet med?",
        respuesta: "Nej. Beregneren regner den samme løn før skat om mellem perioder. Har du tillæg eller bonus, så læg dem til hver for sig, når du sammenligner tilbud.",
      },
    ],
    glosario: [
      { termino: "Løn før skat", definicion: "Lønnen, før skat og andre fradrag er trukket fra. Kaldes også bruttoløn." },
      { termino: "Fuld tid", definicion: "Fuld arbejdstid, her regnet som 37 timer om ugen." },
    ],
  };
};
