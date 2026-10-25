import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mensual = montoEjemplo(ctx, 4000);
  const hora = montoEjemplo(ctx, 20);
  const horasSemana = 37.5;
  const horasAnio = horasSemana * 52;
  const horasMes = horasAnio / 12;
  const t = formatearCifra(ctx, horasSemana);
  return {
    h1: "Timelønn til månedslønn og omvendt",
    title: tituloQueEntre(
      `Timelønn til månedslønn: regn om lønnen din | ${ctx.nombrePais}`,
      `Timelønn til månedslønn | ${ctx.nombrePais}`,
      "Timelønn til månedslønn",
    ),
    description: "Regn om lønnen mellom timelønn, dagslønn, ukelønn, månedslønn og årslønn, med dine egne arbeidstimer og betalte uker.",
    intro: [
      "Hva blir månedslønnen din per time? Hva gir en timelønn i måneden eller i året? Fyll inn et beløp og velg periode, så ser du alle de andre.",
      "Bruk den til å sammenligne jobbtilbud, regne på overtid eller se hva tiden din er verdt.",
    ],
    comoSeCalcula: [
      "Først regnes alt om til årslønn.",
      "Timelønn = årslønn ÷ (timer per uke × betalte uker).",
      "Dagslønn = årslønn ÷ (dager per uke × betalte uker). Ukelønn = årslønn ÷ betalte uker.",
      "Månedslønn = årslønn ÷ 12. Lønn per halvmåned = årslønn ÷ 24.",
    ],
    ejemplo: [
      `En månedslønn på ${m(mensual)} med ${t} timer i uken tilsvarer ${m((mensual * 12) / horasAnio)} i timen og ${m(mensual * 12)} i året.`,
      `En timelønn på ${m(hora)} i full stilling gir ${m(hora * horasMes)} i måneden og ${m(hora * horasAnio)} i året.`,
    ],
    faq: [
      {
        pregunta: "Hvor mange arbeidstimer er det i et år?",
        respuesta: `Med ${t} timer i uken og 52 betalte uker blir det ${formatearNumero(ctx, horasAnio)} timer, eller ${formatearNumero(ctx, horasMes, 2)} timer i måneden.`,
      },
      {
        pregunta: "Hvordan regner jeg om timelønn til månedslønn?",
        respuesta: `Gang timelønnen med antall timer per uke og med 52, og del på 12. I full stilling med ${t} timer er det det samme som å gange timelønnen med ${formatearNumero(ctx, horasMes, 2)}.`,
      },
      {
        pregunta: "Hvorfor blir ikke ukelønnen ganger 4 lik månedslønnen?",
        respuesta: `Fordi en måned i snitt har ${formatearNumero(ctx, 52 / 12, 2)} uker, ikke 4. For å gå fra ukelønn til månedslønn ganger du med 52 og deler på 12.`,
      },
      {
        pregunta: "Er skatt eller tillegg regnet med?",
        respuesta: "Nei. Kalkulatoren regner om den samme lønnen før skatt mellom perioder. Har du tillegg eller bonus, legg dem til hver for seg når du sammenligner tilbud.",
      },
    ],
    glosario: [
      { termino: "Lønn før skatt", definicion: "Lønnen før skatt og andre trekk. Kalles også bruttolønn." },
      { termino: "Full stilling", definicion: `Full arbeidstid, her regnet som ${t} timer i uken.` },
    ],
  };
};
