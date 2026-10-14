import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  const urenPerJaar = 40 * 52;
  return {
    h1: "Uurloon berekenen",
    title: tituloQueEntre(`Uurloon berekenen in ${ctx.nombrePais}`, "Uurloon berekenen"),
    description: "Reken je salaris om naar uurloon, dagloon, weekloon, maandsalaris of jaarsalaris, met je echte uren en betaalde weken.",
    intro: [
      "Hoeveel verdien je eigenlijk per uur? En wat is een uurloon per jaar? Vul een bedrag in, kies de periode en je ziet meteen alle andere.",
      "Handig om vacatures te vergelijken, overuren te prijzen of te zien wat je tijd waard is.",
    ],
    comoSeCalcula: [
      "Eerst wordt alles omgerekend naar een bedrag per jaar.",
      "Per uur = per jaar ÷ (uren per week × betaalde weken).",
      "Per dag = per jaar ÷ (werkdagen per week × betaalde weken). Per week = per jaar ÷ betaalde weken.",
      "Per maand = per jaar ÷ 12. Per halve maand = per jaar ÷ 24.",
    ],
    ejemplo: [
      `Een jaarsalaris van ${m(anual)} bij 40 uur per week is ${m(anual / urenPerJaar)} per uur en ${m(anual / 12)} per maand.`,
      `Een fulltime baan van ${m(hora)} per uur komt neer op ${m(hora * urenPerJaar)} per jaar.`,
    ],
    faq: [
      {
        pregunta: "Hoeveel werkuren heeft een jaar?",
        respuesta: `Bij 40 uur per week en 52 betaalde weken zijn dat ${formatearNumero(ctx, urenPerJaar)} uur. Werk je 36 uur, dan zijn het er ${formatearNumero(ctx, 36 * 52)}.`,
      },
      {
        pregunta: "Waarom is weekloon keer 4 niet je maandsalaris?",
        respuesta: `Omdat een maand gemiddeld ${formatearNumero(ctx, 52 / 12, 2)} weken heeft, geen 4. Van week naar maand reken je dus met keer 52 en gedeeld door 12.`,
      },
      {
        pregunta: "Zitten vakantiegeld en belastingen erin?",
        respuesta: "Nee. Deze rekenhulp rekent hetzelfde bedrag om naar andere periodes. Krijg je vakantiegeld of een bonus, tel die dan apart mee als je aanbiedingen vergelijkt.",
      },
    ],
    glosario: [
      { termino: "Brutoloon", definicion: "Je loon voordat belastingen en premies eraf gaan." },
      { termino: "Fulltime", definicion: "Een volledige werkweek, meestal 36 tot 40 uur." },
    ],
  };
};
