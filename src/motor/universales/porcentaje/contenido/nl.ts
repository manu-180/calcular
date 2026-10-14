import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  return {
    h1: "Procenten berekenen",
    title: tituloQueEntre(`Procenten berekenen in ${ctx.nombrePais}`, "Procenten berekenen"),
    description: "Reken een percentage van een getal uit, zie hoeveel procent het ene getal van het andere is, of tel een percentage erbij of eraf.",
    intro: [
      "Kies wat je wilt weten, vul de twee getallen in en je hebt meteen het antwoord.",
      "Je rekent er de vier procentsommen van elke dag mee uit: een deel, een aandeel, een stijging en een daling.",
    ],
    comoSeCalcula: [
      "X% van Y = X × Y ÷ 100.",
      "X als percentage van Y = X ÷ Y × 100.",
      "Y plus X% = Y × (1 + X ÷ 100). Y min X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15% van 200 is ${n((15 * 200) / 100)}.`,
      `30 is ${n((30 / 120) * 100)}% van 120.`,
      `Een prijs van ${m(precio)} die 10% stijgt, wordt ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Hoe reken je een percentage van een getal uit?",
        respuesta: `Vermenigvuldig het getal met het percentage en deel door 100. 20% van 350 is 350 × 20 ÷ 100 = ${n((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Hoe bereken je hoeveel procent iets is?",
        respuesta: `Deel het deel door het geheel en vermenigvuldig met 100. Heb je 45 van de 60 vragen goed, dan is dat 45 ÷ 60 × 100 = ${n((45 / 60) * 100)}%.`,
      },
      {
        pregunta: "Hoe tel je een percentage bij een prijs op?",
        respuesta: `Vermenigvuldig de prijs met 1 plus het percentage als decimaal getal. Voor 10% erbij vermenigvuldig je met ${n(1.1, 2)}.`,
      },
      {
        pregunta: "Ben je na 10% erbij en 10% eraf weer bij het begin?",
        respuesta: `Nee. 100 plus 10% is 110, en 110 min 10% is ${n(110 * 0.9)}. De daling gaat namelijk van een groter getal af.`,
      },
    ],
    glosario: [
      { termino: "Procent", definicion: "Een deel van honderd. 25 procent is 25 van elke 100." },
      { termino: "Basis", definicion: "Het getal waarvan je het percentage neemt (Y in deze rekenhulp)." },
    ],
  };
};
