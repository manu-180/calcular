import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Dele utgifter",
    title: tituloQueEntre(
      `Dele utgifter: hvem skylder hvem | ${ctx.nombrePais}`,
      `Dele utgifter | ${ctx.nombrePais}`,
      "Dele utgifter",
    ),
    description: "Del en felles utgift mellom opptil 8 personer. Du ser hver persons andel og hvem som skal betale hvem, med så få betalinger som mulig.",
    intro: [
      "Bruk den til en tur, en middag, en fest eller en felles hytte der alle har betalt ulikt.",
      "Fyll inn hva hver person har lagt ut. Du får hver andel og betalingene som gjør at alle blir skuls.",
    ],
    comoSeCalcula: [
      "Andel = samlede utlegg ÷ antall personer.",
      "Den som har betalt mindre enn sin andel, skylder mellomlegget. Den som har betalt mer, får tilbake.",
      "Betalingene går fra den som skylder mest, til den som har mest til gode, så ingen trenger å gjøre unødvendige overføringer.",
    ],
    ejemplo: [
      `Ingrid betalte ${m(a)}, Lars betalte ${m(b)} og Sofie betalte ingenting. Totalen er ${m(a + b)}, så hver andel blir ${m(cuota)}.`,
      `Sofie betaler ${m(cuota)} til Ingrid, og Lars betaler ${m(cuota - b)} til Ingrid.`,
    ],
    faq: [
      {
        pregunta: "Hvordan deler jeg regningen når alle har betalt ulikt?",
        respuesta: "Legg sammen alt, del på antall personer og sammenlign med hva hver enkelt har betalt. Forskjellen er det personen skylder eller skal få tilbake.",
      },
      {
        pregunta: "Hva gjør jeg hvis noen ikke har betalt noe?",
        respuesta: "Fyll inn 0 for den personen, så blir hen med i delingen. Lar du feltet stå tomt, blir personen ikke regnet med.",
      },
      {
        pregunta: "Hvorfor blir det færre betalinger enn personer?",
        respuesta: "Gjelden slås sammen. Den som skylder mest, betaler den som har lagt ut mest, og så videre. Det trengs aldri flere betalinger enn antall personer minus én.",
      },
    ],
    glosario: [
      { termino: "Andel", definicion: "Det hver person skal betale av den samlede utgiften." },
      { termino: "Saldo", definicion: "Forskjellen mellom det noen har betalt, og personens andel." },
    ],
  };
};
