import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Dela kostnader",
    title: tituloQueEntre(
      `Dela kostnader: vem är skyldig vem | ${ctx.nombrePais}`,
      `Dela kostnader | ${ctx.nombrePais}`,
      "Dela kostnader",
    ),
    description: "Dela en gemensam kostnad mellan upp till 8 personer. Du ser varje persons andel och vem som ska betala vem, med så få betalningar som möjligt.",
    intro: [
      "Använd den för en resa, en middag, en fest eller en gemensam stuga där alla har betalat olika mycket.",
      "Fyll i vad varje person har lagt ut. Du får varje andel och de betalningar som gör att alla blir kvitt.",
    ],
    comoSeCalcula: [
      "Andel = totalt utlägg ÷ antal personer.",
      "Den som har betalat mindre än sin andel är skyldig mellanskillnaden. Den som har betalat mer får tillbaka.",
      "Betalningarna går från den största skulden till den största fordran, så ingen behöver göra onödiga överföringar.",
    ],
    ejemplo: [
      `Anna betalade ${m(a)}, Erik betalade ${m(b)} och Sara betalade inget. Totalen är ${m(a + b)}, så varje andel blir ${m(cuota)}.`,
      `Sara betalar ${m(cuota)} till Anna och Erik betalar ${m(cuota - b)} till Anna.`,
    ],
    faq: [
      {
        pregunta: "Hur delar jag notan när alla har betalat olika mycket?",
        respuesta: "Lägg ihop allt, dela med antalet personer och jämför med vad var och en har betalat. Skillnaden är vad personen är skyldig eller ska få tillbaka.",
      },
      {
        pregunta: "Vad gör jag om någon inte har betalat något?",
        respuesta: "Fyll i 0 för den personen så räknas hen med i delningen. Lämnar du rutan tom räknas personen inte med.",
      },
      {
        pregunta: "Varför blir det färre betalningar än personer?",
        respuesta: "Skulderna slås ihop. Den som är skyldig mest betalar den som har lagt ut mest, och så vidare. Det behövs aldrig fler betalningar än antalet personer minus en.",
      },
    ],
    glosario: [
      { termino: "Andel", definicion: "Det som varje person ska betala av den totala kostnaden." },
      { termino: "Saldo", definicion: "Skillnaden mellan vad någon har betalat och personens andel." },
    ],
  };
};
