import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Del udgifter",
    title: tituloQueEntre(
      `Del udgifter: hvem skylder hvem | ${ctx.nombrePais}`,
      `Del udgifter | ${ctx.nombrePais}`,
      "Del udgifter",
    ),
    description: "Del en fælles udgift mellem op til 8 personer. Du ser hver persons andel, og hvem der skal betale hvem, med så få betalinger som muligt.",
    intro: [
      "Brug den til en rejse, en middag, en fest eller et fælles sommerhus, hvor alle har betalt forskellige beløb.",
      "Skriv, hvad hver person har lagt ud. Du får hver andel og de betalinger, der gør, at alle er kvit.",
    ],
    comoSeCalcula: [
      "Andel = samlede udlæg ÷ antal personer.",
      "Den, der har betalt mindre end sin andel, skylder forskellen. Den, der har betalt mere, får penge tilbage.",
      "Betalingerne går fra den største gæld til det største tilgodehavende, så ingen skal lave unødvendige overførsler.",
    ],
    ejemplo: [
      `Anne betalte ${m(a)}, Mads betalte ${m(b)}, og Sofie betalte ingenting. I alt er det ${m(a + b)}, så hver andel bliver ${m(cuota)}.`,
      `Sofie betaler ${m(cuota)} til Anne, og Mads betaler ${m(cuota - b)} til Anne.`,
    ],
    faq: [
      {
        pregunta: "Hvordan deler vi regningen, når alle har betalt forskelligt?",
        respuesta: "Læg det hele sammen, del med antallet af personer, og sammenlign med det, hver især har betalt. Forskellen er det, personen skylder eller skal have tilbage.",
      },
      {
        pregunta: "Hvad gør jeg, hvis nogen ikke har betalt noget?",
        respuesta: "Skriv 0 ud for personen, så tæller vedkommende med i delingen. Lader du feltet stå tomt, tæller personen ikke med.",
      },
      {
        pregunta: "Hvorfor bliver der færre betalinger end personer?",
        respuesta: "Gælden samles. Den, der skylder mest, betaler den, der har lagt mest ud, og så videre. Der skal aldrig flere betalinger til end antallet af personer minus én.",
      },
    ],
    glosario: [
      { termino: "Andel", definicion: "Det, hver person skal betale af den samlede udgift." },
      { termino: "Saldo", definicion: "Forskellen mellem det, en person har betalt, og personens andel." },
    ],
  };
};
